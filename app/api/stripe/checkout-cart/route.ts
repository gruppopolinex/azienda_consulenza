// app/api/stripe/checkout-cart/route.ts
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { BOOKS } from "@/app/servizi/editoria/_data";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type CartCheckoutItem = {
  stripePriceId: string;
  quantity: number;
};

// ✅ dal FE (carrello) passiamo se esistono prodotti che richiedono spedizione
type Body = {
  items?: CartCheckoutItem[];
  hasShippable?: boolean;

  // opzionali: se vuoi riusare questa route anche per altri flussi
  source?: string; // es. "editoria" | "formazione"
  successPath?: string; // default: /carrello/success
  cancelPath?: string; // default: /carrello
};

function getBaseUrl() {
  const a = process.env.NEXT_PUBLIC_SITE_URL;
  if (typeof a === "string" && a.trim()) return a.replace(/\/$/, "");

  const b = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";
  return b.replace(/\/$/, "");
}

function normQty(q: unknown) {
  const n = Number(q);
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.floor(n));
}

function normPriceId(x: unknown) {
  return typeof x === "string" && x.trim().length > 0 ? x.trim() : undefined;
}

// ✅ best-effort: capiamo se un priceId è "cartaceo" confrontandolo con _data.ts
function buildPrintPriceIdSet(): Set<string> {
  const s = new Set<string>();
  for (const b of BOOKS as any[]) {
    const pid = (b as any).stripePriceIdPrint;
    if (typeof pid === "string" && pid.trim().length > 0) s.add(pid.trim());
  }
  return s;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;

    if (!body?.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: "Carrello vuoto o items mancanti" },
        { status: 400 }
      );
    }

    // ✅ valida & normalizza
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = body.items
      .map((x) => ({
        price: normPriceId(x?.stripePriceId),
        quantity: normQty(x?.quantity),
      }))
      .filter(
        (x): x is { price: string; quantity: number } =>
          typeof x.price === "string" && x.price.length > 0
      )
      .map((x) => ({ price: x.price, quantity: x.quantity }));

    if (lineItems.length === 0) {
      return NextResponse.json(
        { error: "Nessun item acquistabile (stripePriceId mancanti)" },
        { status: 400 }
      );
    }

    const baseUrl = getBaseUrl();
    if (!baseUrl) {
      return NextResponse.json(
        {
          error: "NEXT_PUBLIC_SITE_URL mancante (o VERCEL_URL non disponibile)",
        },
        { status: 500 }
      );
    }

    // ✅ decidiamo se serve indirizzo:
    // - priorità al flag FE (hasShippable)
    // - fallback: inferenza dal priceId confrontando stripePriceIdPrint in _data.ts
    let requiresShipping = Boolean(body.hasShippable);

    if (!requiresShipping) {
      const printPriceIds = buildPrintPriceIdSet();
      requiresShipping = lineItems.some((li) => {
        const priceId = typeof li.price === "string" ? li.price : undefined;
        return !!priceId && printPriceIds.has(priceId);
      });
    }

    const successPath =
      typeof body.successPath === "string" && body.successPath.trim()
        ? body.successPath.trim()
        : "/carrello/success";

    const cancelPath =
      typeof body.cancelPath === "string" && body.cancelPath.trim()
        ? body.cancelPath.trim()
        : "/carrello";

    const source =
      typeof body.source === "string" && body.source.trim()
        ? body.source.trim()
        : "editoria";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,

      // ✅ crea sempre un Customer e raccoglie email (utile per email + fattura)
      customer_creation: "always",

      // ✅ flusso centralizzato
      success_url: `${baseUrl}${successPath}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}${cancelPath}`,

      // ✅ Fattura/ricevuta automatica Stripe (vale anche per carrello)
      invoice_creation: { enabled: true },

      // ✅ se c'è almeno un cartaceo: chiedi indirizzo in Stripe Checkout (solo Italia)
      ...(requiresShipping
        ? {
            shipping_address_collection: {
              allowed_countries: ["IT"] as const,
            },
          }
        : {}),

      metadata: {
        kind: "cart",
        source,
        itemsCount: String(lineItems.length),
        requiresShipping: requiresShipping ? "1" : "0",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout-cart error:", err);
    return NextResponse.json(
      { error: "Errore creazione checkout carrello" },
      { status: 500 }
    );
  }
}
