// app/api/print/order/route.ts
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { BOOKS } from "@/app/servizi/editoria/_data";

export const runtime = "nodejs";

/**
 * Crea (o recupera) un ordine Printful per gli articoli cartacei
 * acquistati in una Checkout Session Stripe.
 *
 * ✅ Flusso consigliato:
 * - dopo il pagamento (success page) chiami POST /api/print/order con session_id
 * - il backend verifica che:
 *   1) la sessione è "paid"
 *   2) ci sono line_items che matchano stripePriceIdPrint dei libri
 *   3) esiste un indirizzo di spedizione (Stripe Checkout)
 * - poi crea un ordine Printful con external_id = stripe_<session_id> (idempotenza)
 *
 * Requisiti env:
 * - STRIPE_SECRET_KEY
 * - PRINTFUL_API_KEY
 *
 * Requisiti dati (in _data.ts) per ogni libro cartaceo:
 * - stripePriceIdPrint
 * - printfulSyncVariantId: number
 */

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/* =========================
   Types
========================= */

type PrintfulRecipient = {
  name: string;
  address1: string;
  address2?: string;
  city: string;
  state_code?: string;
  zip: string;
  country_code: string; // "IT"
  email?: string;
  phone?: string;
};

type PrintfulOrderItem = {
  sync_variant_id: number;
  quantity: number;
  name?: string;
  retail_price?: string; // opzionale (stringa tipo "29.00")
};

type PrintfulOrderCreateBody = {
  external_id: string;
  recipient: PrintfulRecipient;
  items: PrintfulOrderItem[];
  confirm: boolean;
};

/* =========================
   Helpers
========================= */

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function getPrintfulApiKey() {
  const key = process.env.PRINTFUL_API_KEY;
  return typeof key === "string" && key.trim().length > 0 ? key.trim() : "";
}

function normQty(q: unknown) {
  const n = Number(q);
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.floor(n));
}

function pickShippingRecipient(session: Stripe.Checkout.Session): PrintfulRecipient | null {
  const ship = session.shipping_details;
  const cust = session.customer_details;

  if (!ship?.address) return null;

  const name = ship.name ?? cust?.name ?? "Cliente";
  const email = cust?.email ?? undefined;
  const phone = ship.phone ?? cust?.phone ?? undefined;

  const address1 = ship.address.line1 ?? "";
  const address2 = ship.address.line2 ?? undefined;
  const city = ship.address.city ?? "";
  const state_code = ship.address.state ?? undefined;
  const zip = ship.address.postal_code ?? "";
  const country_code = ship.address.country ?? "";

  if (!address1 || !city || !zip || !country_code) return null;

  return {
    name,
    address1,
    address2,
    city,
    state_code,
    zip,
    country_code,
    email,
    phone,
  };
}

async function printfulFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const apiKey = getPrintfulApiKey();
  if (!apiKey) throw new Error("PRINTFUL_API_KEY mancante");

  const res = await fetch(`https://api.printful.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  const data = (await res.json().catch(() => ({}))) as any;

  if (!res.ok) {
    const msg =
      data?.error?.message ||
      data?.error ||
      data?.message ||
      data?.result ||
      `Errore Printful (${res.status})`;
    throw new Error(msg);
  }

  return data as T;
}

/**
 * Idempotenza: recupera ordine già creato tramite external_id
 */
async function findPrintfulOrderByExternalId(externalId: string) {
  type R = { result?: { id: number; external_id?: string; status?: string }[] };
  const out = await printfulFetch<R>(`/orders?external_id=${encodeURIComponent(externalId)}`, {
    method: "GET",
  });
  const first = Array.isArray(out.result) ? out.result[0] : undefined;
  return first ?? null;
}

/**
 * Mappa stripePriceIdPrint -> {syncVariantId,title}
 * (solo se printfulSyncVariantId è presente)
 */
function buildPriceToPrintMap() {
  const m = new Map<string, { syncVariantId: number; title: string }>();

  for (const b of BOOKS as any[]) {
    const pricePrint =
      typeof b.stripePriceIdPrint === "string" && b.stripePriceIdPrint.trim()
        ? b.stripePriceIdPrint.trim()
        : undefined;

    const syncVariantId =
      typeof b.printfulSyncVariantId === "number" && Number.isFinite(b.printfulSyncVariantId)
        ? b.printfulSyncVariantId
        : undefined;

    if (pricePrint && syncVariantId) {
      m.set(pricePrint, { syncVariantId, title: String(b.title ?? b.slug) });
    }
  }

  return m;
}

/* =========================
   Handler
========================= */

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as { session_id?: string };
    const sessionId = typeof body?.session_id === "string" ? body.session_id.trim() : "";

    if (!sessionId) {
      return jsonError("session_id mancante", 400);
    }

    // Env Printful
    if (!getPrintfulApiKey()) {
      return jsonError("PRINTFUL_API_KEY mancante", 500);
    }

    // 1) Recupera sessione Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return jsonError("Pagamento non valido", 403);
    }

    // 2) Destinatario spedizione (Stripe Checkout)
    const recipient = pickShippingRecipient(session);
    if (!recipient) {
      return jsonError("Indirizzo di spedizione mancante nella sessione Stripe", 400);
    }

    // Italia only (coerente con il checkout)
    if (recipient.country_code !== "IT") {
      return jsonError("Spedizione consentita solo in Italia (IT)", 400);
    }

    // 3) Leggi line items Stripe
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 100 });
    const items = lineItems.data ?? [];

    if (items.length === 0) {
      return jsonError("Nessun articolo nella sessione", 404);
    }

    // 4) Mappa priceId -> sync_variant_id Printful
    const priceToPrint = buildPriceToPrintMap();

    // 5) Costruisci righe Printful SOLO per cartaceo mappato
    const printfulItems: PrintfulOrderItem[] = [];

    for (const li of items) {
      const priceId = li.price?.id;
      if (!priceId) continue;

      const mapped = priceToPrint.get(priceId);
      if (!mapped) continue;

      printfulItems.push({
        sync_variant_id: mapped.syncVariantId,
        quantity: normQty(li.quantity),
        name: mapped.title,
        // retail_price: opzionale: se vuoi forzarlo dal totale riga
        // retail_price:
        //   typeof li.amount_total === "number"
        //     ? (li.amount_total / 100 / normQty(li.quantity)).toFixed(2)
        //     : undefined,
      });
    }

    if (printfulItems.length === 0) {
      return jsonError(
        "Nessun articolo cartaceo trovato (manca mapping stripePriceIdPrint -> printfulSyncVariantId)",
        400
      );
    }

    // 6) Idempotenza via external_id
    const externalId = `stripe_${sessionId}`;

    const existing = await findPrintfulOrderByExternalId(externalId).catch(() => null);
    if (existing) {
      return NextResponse.json({
        ok: true,
        created: false,
        printful: {
          id: existing.id,
          external_id: existing.external_id,
          status: existing.status,
        },
      });
    }

    // 7) Crea ordine Printful
    const payload: PrintfulOrderCreateBody = {
      external_id: externalId,
      recipient,
      items: printfulItems,
      confirm: true, // ✅ true = invia in fulfillment; metti false se vuoi solo creare bozza
    };

    type CreateResp = { result?: { id: number; status: string; external_id?: string } };

    const created = await printfulFetch<CreateResp>("/orders", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return NextResponse.json({
      ok: true,
      created: true,
      printful: created.result ?? created,
    });
  } catch (err) {
    console.error("PRINT ORDER ERROR:", err);
    const msg = err instanceof Error ? err.message : "Errore creazione ordine di stampa";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
