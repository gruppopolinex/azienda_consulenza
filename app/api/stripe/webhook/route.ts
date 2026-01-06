// app/api/stripe/webhook/route.ts
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { BOOKS, type BookVariant } from "@/app/servizi/editoria/_data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * ✅ STRIPE WEBHOOK (Next.js App Router) — STEP A (EMAIL AUTOMATICHE)
 *
 * ENV richieste:
 * - STRIPE_SECRET_KEY
 * - STRIPE_WEBHOOK_SECRET
 *
 * ENV richieste per EMAIL (Resend):
 * - RESEND_API_KEY
 * - ORDERS_FROM              (es. "Polinex <onboarding@resend.dev>" in test)
 * - ORDERS_BCC (opzionale)   (es. "info@polinex.it") per copia interna
 * - NEXT_PUBLIC_SITE_URL     (consigliato: per link download / link pagina success)
 *
 * (fallback dal tuo .env):
 * - CONTACT_FROM / CONTACT_TO
 *
 * ENV opzionale (Printful, NON necessario per Step A):
 * - PRINTFUL_API_KEY
 *
 * Eventi Stripe consigliati:
 * - checkout.session.completed
 * - checkout.session.async_payment_succeeded (opzionale)
 *
 * Cosa fa:
 * - Verifica firma webhook
 * - Quando una Checkout Session risulta pagata:
 *   - invia email di conferma al cliente (PDF / Cartaceo / mix)
 *   - opzionale: copia interna (BCC)
 *   - opzionale: crea ordine Printful se PRINTFUL_API_KEY e mapping presenti
 */

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/* =========================
   ENV helpers
========================= */

function getWebhookSecret() {
  const s = process.env.STRIPE_WEBHOOK_SECRET;
  return typeof s === "string" && s.trim().length > 0 ? s.trim() : "";
}

function getPrintfulApiKey() {
  const s = process.env.PRINTFUL_API_KEY;
  return typeof s === "string" && s.trim().length > 0 ? s.trim() : "";
}

function getResendApiKey() {
  const s = process.env.RESEND_API_KEY;
  return typeof s === "string" && s.trim().length > 0 ? s.trim() : "";
}

function getOrdersFrom() {
  const a = process.env.ORDERS_FROM;
  if (typeof a === "string" && a.trim()) return a.trim();

  const b = process.env.CONTACT_FROM;
  if (typeof b === "string" && b.trim()) return b.trim();

  // fallback “dev safe” (no domain verification needed)
  return "Polinex <onboarding@resend.dev>";
}

function getOrdersBcc() {
  const a = process.env.ORDERS_BCC;
  if (typeof a === "string" && a.trim()) return a.trim();

  const b = process.env.CONTACT_TO;
  if (typeof b === "string" && b.trim()) return b.trim();

  return "";
}

function getBaseUrl() {
  const a = process.env.NEXT_PUBLIC_SITE_URL;
  if (typeof a === "string" && a.trim()) return a.replace(/\/$/, "");

  const b = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";
  return b.replace(/\/$/, "");
}

/* =========================
   Utils
========================= */

function normQty(q: unknown) {
  const n = Number(q);
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.floor(n));
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

/* =========================
   Resend (email)
========================= */

async function resendSendEmail(args: {
  to: string;
  subject: string;
  html: string;
  bcc?: string;
  replyTo?: string;
}) {
  const apiKey = getResendApiKey();
  if (!apiKey) throw new Error("RESEND_API_KEY mancante");

  const from = getOrdersFrom();

  const payload: any = {
    from,
    to: args.to,
    subject: args.subject,
    html: args.html,
  };

  // Resend accetta string o array: qui usiamo array per coerenza
  if (args.bcc && args.bcc.trim()) payload.bcc = [args.bcc.trim()];
  if (args.replyTo && args.replyTo.trim()) payload.reply_to = args.replyTo.trim();

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const data = (await res.json().catch(() => ({}))) as any;

  if (!res.ok) {
    const msg = data?.message || data?.error || `Errore Resend (${res.status})`;
    throw new Error(msg);
  }

  return data;
}

/* =========================
   Purchases mapping (Stripe line_items -> libri + varianti)
========================= */

type Purchased = {
  slug: string;
  title: string;
  variant: BookVariant; // "pdf" | "print"
  qty: number;
};

function buildPriceMap() {
  // priceId -> {slug,title,variant}
  const m = new Map<string, { slug: string; title: string; variant: BookVariant }>();

  for (const b of BOOKS as any[]) {
    const slug = String(b.slug);
    const title = String(b.title ?? b.slug);

    const pdfPid =
      typeof b.stripePriceIdPdf === "string" && b.stripePriceIdPdf.trim()
        ? b.stripePriceIdPdf.trim()
        : typeof b.stripePriceId === "string" && b.stripePriceId.trim()
          ? b.stripePriceId.trim()
          : "";

    const printPid =
      typeof b.stripePriceIdPrint === "string" && b.stripePriceIdPrint.trim()
        ? b.stripePriceIdPrint.trim()
        : "";

    if (pdfPid) m.set(pdfPid, { slug, title, variant: "pdf" });
    if (printPid) m.set(printPid, { slug, title, variant: "print" });
  }

  return m;
}

async function getPurchasedItemsFromSession(sessionId: string): Promise<Purchased[]> {
  const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 100 });
  const data = lineItems.data ?? [];
  if (data.length === 0) return [];

  const priceMap = buildPriceMap();

  const acc = new Map<string, Purchased>(); // key: slug:variant
  for (const li of data) {
    const priceId = li.price?.id;
    if (!priceId) continue;

    const mapped = priceMap.get(priceId);
    if (!mapped) continue;

    const key = `${mapped.slug}:${mapped.variant}`;
    const add = normQty(li.quantity);

    const prev = acc.get(key);
    if (!prev) {
      acc.set(key, { slug: mapped.slug, title: mapped.title, variant: mapped.variant, qty: add });
    } else {
      prev.qty += add;
      acc.set(key, prev);
    }
  }

  return Array.from(acc.values());
}

/* =========================
   Invoice / receipt links (best-effort)
========================= */

async function getInvoiceLinks(session: Stripe.Checkout.Session) {
  // Best effort:
  // - invoice.hosted_invoice_url / invoice_pdf (se session.invoice presente)
  // - altrimenti receipt_url dal PaymentIntent latest_charge
  let hostedInvoiceUrl: string | undefined;
  let invoicePdfUrl: string | undefined;
  let receiptUrl: string | undefined;

  const invoiceId = typeof session.invoice === "string" ? session.invoice : undefined;
  if (invoiceId) {
    try {
      const inv = await stripe.invoices.retrieve(invoiceId);
      hostedInvoiceUrl = inv.hosted_invoice_url ?? undefined;
      invoicePdfUrl = inv.invoice_pdf ?? undefined;
    } catch {
      // ignore
    }
  }

  const piId = typeof session.payment_intent === "string" ? session.payment_intent : undefined;
  if (piId && !receiptUrl) {
    try {
      const pi = await stripe.paymentIntents.retrieve(piId, { expand: ["latest_charge"] });
      const ch: any = (pi as any).latest_charge;
      receiptUrl = typeof ch?.receipt_url === "string" ? ch.receipt_url : undefined;
    } catch {
      // ignore
    }
  }

  return { hostedInvoiceUrl, invoicePdfUrl, receiptUrl };
}

/* =========================
   Email templates
========================= */

function buildCustomerEmailHtml(args: {
  customerName?: string;
  customerEmail?: string;
  sessionId: string;
  purchased: Purchased[];
  hostedInvoiceUrl?: string;
  invoicePdfUrl?: string;
  receiptUrl?: string;
}) {
  const baseUrl = getBaseUrl();
  const successUrl =
    baseUrl && args.sessionId
      ? `${baseUrl}/carrello/success?session_id=${encodeURIComponent(args.sessionId)}`
      : "";

  const hasPdf = args.purchased.some((p) => p.variant === "pdf");
  const hasPrint = args.purchased.some((p) => p.variant === "print");

  const downloads =
    hasPdf && baseUrl
      ? args.purchased
          .filter((p) => p.variant === "pdf")
          .map((p) => ({
            title: p.title,
            qty: p.qty,
            url: `${baseUrl}/api/download?session_id=${encodeURIComponent(
              args.sessionId
            )}&slug=${encodeURIComponent(p.slug)}`,
          }))
      : [];

  const rows = args.purchased
    .map((p) => {
      const label = p.variant === "print" ? "Cartaceo (spedizione)" : "PDF (download)";
      return `<tr>
        <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">
          <div style="font-weight:600;color:#0f172a;">${escapeHtml(p.title)}</div>
          <div style="font-size:12px;color:#64748b;">${escapeHtml(label)} · Qtà ${p.qty}</div>
        </td>
      </tr>`;
    })
    .join("");

  const docLinks = [
    args.hostedInvoiceUrl
      ? `<a href="${args.hostedInvoiceUrl}" target="_blank" rel="noopener noreferrer" style="color:#0f766e;text-decoration:underline;">Apri fattura online</a>`
      : "",
    args.invoicePdfUrl
      ? `<a href="${args.invoicePdfUrl}" target="_blank" rel="noopener noreferrer" style="color:#0f766e;text-decoration:underline;">Scarica fattura PDF</a>`
      : "",
    args.receiptUrl
      ? `<a href="${args.receiptUrl}" target="_blank" rel="noopener noreferrer" style="color:#0f766e;text-decoration:underline;">Apri ricevuta pagamento</a>`
      : "",
  ].filter(Boolean);

  const docsBlock =
    docLinks.length > 0
      ? `<p style="margin:12px 0 0;font-size:14px;color:#334155;">
          <strong>Documenti:</strong> ${docLinks.join(" · ")}
        </p>`
      : `<p style="margin:12px 0 0;font-size:14px;color:#334155;">
          <strong>Documenti:</strong> riceverai anche l’email di Stripe con ricevuta/fattura (se abilitate).
        </p>`;

  const downloadsBlock =
    downloads.length > 0
      ? `<div style="margin:16px 0;padding:14px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;">
          <div style="font-size:13px;font-weight:700;color:#0f172a;margin-bottom:8px;">Download PDF</div>
          ${downloads
            .map(
              (d) => `<div style="margin:6px 0;font-size:14px;">
                <a href="${d.url}" style="color:#0f766e;text-decoration:underline;">${escapeHtml(
                  d.title
                )}</a>
                <span style="color:#64748b;font-size:12px;">(Qtà ${d.qty})</span>
              </div>`
            )
            .join("")}
          <div style="margin-top:10px;font-size:12px;color:#64748b;">
            Se un link risultasse scaduto, riapri la pagina di conferma ordine.
          </div>
        </div>`
      : baseUrl
        ? ""
        : `<div style="margin:16px 0;padding:14px;border:1px solid #e2e8f0;border-radius:12px;background:#f8fafc;">
            <div style="font-size:13px;font-weight:700;color:#0f172a;margin-bottom:6px;">Download PDF</div>
            <div style="font-size:13px;color:#334155;">
              I link di download non sono disponibili perché <code>NEXT_PUBLIC_SITE_URL</code> non è configurata.
            </div>
          </div>`;

  const shippingBlock = hasPrint
    ? `<div style="margin:16px 0;padding:14px;border:1px solid #fde68a;border-radius:12px;background:#fffbeb;">
        <div style="font-size:13px;font-weight:700;color:#92400e;margin-bottom:6px;">Spedizione (Italia)</div>
        <div style="font-size:14px;color:#7c2d12;">
          Stiamo preparando la spedizione del cartaceo. Riceverai aggiornamenti quando l’ordine verrà evaso.
        </div>
      </div>`
    : "";

  const hello = args.customerName ? `Ciao ${escapeHtml(args.customerName)},` : "Ciao,";

  const title =
    hasPdf && hasPrint
      ? "Conferma ordine (PDF + Cartaceo)"
      : hasPrint
        ? "Conferma ordine (Cartaceo)"
        : "Conferma ordine (PDF)";

  return `<!doctype html>
<html>
  <body style="margin:0;background:#ffffff;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;">
    <div style="max-width:640px;margin:0 auto;padding:24px;">
      <div style="padding:18px;border:1px solid #e2e8f0;border-radius:16px;">
        <div style="font-size:18px;font-weight:800;color:#0f172a;">${escapeHtml(title)}</div>
        <p style="margin:12px 0 0;font-size:14px;color:#334155;">${hello} il pagamento è andato a buon fine ✅</p>
        ${docsBlock}
        ${shippingBlock}
        ${downloadsBlock}

        <div style="margin-top:16px;">
          <div style="font-size:13px;font-weight:700;color:#0f172a;margin-bottom:8px;">Riepilogo acquisto</div>
          <table style="width:100%;border-collapse:collapse;">${rows}</table>
        </div>

        ${
          successUrl
            ? `<p style="margin:16px 0 0;font-size:14px;color:#334155;">
                Pagina conferma ordine: <a href="${successUrl}" style="color:#0f766e;text-decoration:underline;">apri qui</a>
              </p>`
            : ""
        }

        <p style="margin:18px 0 0;font-size:12px;color:#64748b;">
          Se hai bisogno di assistenza rispondi a questa email.
        </p>
      </div>

      <p style="margin:14px 0 0;font-size:11px;color:#94a3b8;">
        Polinex · Email automatica di conferma ordine
      </p>
    </div>
  </body>
</html>`;
}

/* =========================
   Printful (opzionale)
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
};

type PrintfulOrderCreateBody = {
  external_id: string;
  recipient: PrintfulRecipient;
  items: PrintfulOrderItem[];
  confirm: boolean;
};

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

async function findPrintfulOrderByExternalId(externalId: string) {
  type R = { result?: { id: number; external_id?: string; status?: string }[] };
  const out = await printfulFetch<R>(`/orders?external_id=${encodeURIComponent(externalId)}`, {
    method: "GET",
  });

  const first = Array.isArray(out.result) ? out.result[0] : undefined;
  return first ?? null;
}

/**
 * ⚠️ Nota TypeScript:
 * in alcune versioni dei types di Stripe, `shipping_details` può non essere presente su `Checkout.Session`.
 * In runtime però esiste. Usiamo accesso “safe” via `any`.
 */
function pickShippingRecipient(session: Stripe.Checkout.Session): PrintfulRecipient | null {
  const ship = (session as any)?.shipping_details as
    | {
        name?: string | null;
        phone?: string | null;
        address?: {
          line1?: string | null;
          line2?: string | null;
          city?: string | null;
          state?: string | null;
          postal_code?: string | null;
          country?: string | null;
        } | null;
      }
    | undefined;

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

  return { name, address1, address2, city, state_code, zip, country_code, email, phone };
}

function buildPriceToPrintMap(): Map<string, { syncVariantId: number; title: string }> {
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
      m.set(pricePrint, { syncVariantId, title: b.title ?? b.slug });
    }
  }

  return m;
}

async function createPrintfulOrderForSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    return { ok: false, reason: "not_paid" as const };
  }

  const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 100 });
  const data = lineItems.data ?? [];
  if (data.length === 0) {
    return { ok: false, reason: "no_items" as const };
  }

  const priceToPrint = buildPriceToPrintMap();

  const items: PrintfulOrderItem[] = [];
  for (const li of data) {
    const priceId = li.price?.id;
    if (!priceId) continue;

    const mapped = priceToPrint.get(priceId);
    if (!mapped) continue;

    items.push({
      sync_variant_id: mapped.syncVariantId,
      quantity: normQty(li.quantity),
      name: mapped.title,
    });
  }

  if (items.length === 0) {
    return { ok: true, created: false, skipped: "no_print_items" as const };
  }

  const recipient = pickShippingRecipient(session);
  if (!recipient) {
    return { ok: false, reason: "missing_shipping" as const };
  }

  if (recipient.country_code !== "IT") {
    return { ok: false, reason: "country_not_allowed" as const };
  }

  const externalId = `stripe_${sessionId}`;

  const existing = await findPrintfulOrderByExternalId(externalId).catch(() => null);
  if (existing) {
    return {
      ok: true,
      created: false,
      printful: { id: existing.id, status: existing.status, external_id: existing.external_id },
    };
  }

  const payload: PrintfulOrderCreateBody = {
    external_id: externalId,
    recipient,
    items,
    confirm: true,
  };

  type CreateResp = { result?: { id: number; status: string; external_id?: string } };

  const created = await printfulFetch<CreateResp>("/orders", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return { ok: true, created: true, printful: created.result ?? created };
}

/* =========================
   Main handler
========================= */

async function handlePaidCheckoutSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    return { ok: true, skipped: "not_paid" as const };
  }

  const customerEmail = session.customer_details?.email ?? undefined;
  const customerName = session.customer_details?.name ?? undefined;

  const purchased = await getPurchasedItemsFromSession(sessionId);

  // Se non riusciamo a mappare gli item (priceId non in BOOKS), inviamo comunque una mail “generica”
  const safePurchased: Purchased[] =
    purchased.length > 0
      ? purchased
      : [
          {
            slug: "unknown",
            title: "Ordine Polinex",
            variant: "pdf" as BookVariant,
            qty: 1,
          },
        ];

  const docs = await getInvoiceLinks(session);

  // ✅ EMAIL cliente (non blocca mai il webhook)
  if (customerEmail) {
    const hasPrint = safePurchased.some((p) => p.variant === "print");
    const hasPdf = safePurchased.some((p) => p.variant === "pdf");

    const subject =
      hasPdf && hasPrint
        ? "Conferma ordine Polinex (PDF + Cartaceo)"
        : hasPrint
          ? "Conferma ordine Polinex (Cartaceo)"
          : "Conferma ordine Polinex (PDF)";

    const html = buildCustomerEmailHtml({
      customerName,
      customerEmail,
      sessionId,
      purchased: safePurchased,
      hostedInvoiceUrl: docs.hostedInvoiceUrl,
      invoicePdfUrl: docs.invoicePdfUrl,
      receiptUrl: docs.receiptUrl,
    });

    const bcc = getOrdersBcc();

    try {
      const out = await resendSendEmail({
        to: customerEmail,
        subject,
        html,
        bcc: bcc || undefined,
        replyTo: process.env.CONTACT_TO?.trim() || undefined,
      });
      console.log("RESEND OK:", { sessionId, to: customerEmail, id: out?.id ?? out?.data?.id });
    } catch (e) {
      // Importantissimo: non mandiamo 500 al webhook, altrimenti Stripe ritenta e ti “sporca” i log.
      console.error("RESEND ERROR:", e, { sessionId, to: customerEmail, from: getOrdersFrom() });
    }
  } else {
    console.warn("WEBHOOK: customer email mancante, salto invio email cliente.", { sessionId });
  }

  // ✅ Printful opzionale (rimane spento se PRINTFUL_API_KEY mancante)
  if (getPrintfulApiKey()) {
    try {
      const result = await createPrintfulOrderForSession(sessionId);
      if (!result.ok) console.warn("PRINTFUL ORDER SKIPPED/FAILED:", result);
      else if ((result as any).created) console.log("PRINTFUL ORDER CREATED:", result);
      else console.log("PRINTFUL ORDER NOT CREATED:", result);
    } catch (e) {
      console.error("PRINTFUL ERROR:", e, { sessionId });
    }
  }

  return { ok: true };
}

export async function POST(req: Request) {
  const secret = getWebhookSecret();
  if (!secret) {
    return NextResponse.json({ error: "STRIPE_WEBHOOK_SECRET mancante" }, { status: 500 });
  }

  const sig = req.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "stripe-signature mancante" }, { status: 400 });
  }

  // ✅ RAW body necessario per verificare la firma
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, secret);
  } catch (err) {
    console.error("WEBHOOK SIGNATURE ERROR:", err);
    return NextResponse.json({ error: "Firma webhook non valida" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object as Stripe.Checkout.Session;
        const sessionId = session?.id;
        if (!sessionId) break;

        await handlePaidCheckoutSession(sessionId);
        break;
      }

      default:
        break;
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error("WEBHOOK HANDLER ERROR:", err);
    const msg = err instanceof Error ? err.message : "Errore webhook";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
