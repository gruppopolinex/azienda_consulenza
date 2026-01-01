// app/api/stripe/checkout/route.ts
import Stripe from "stripe";
import { NextResponse } from "next/server";
import {
  BOOKS,
  getStripePriceId,
  type BookVariant,
} from "@/app/servizi/editoria/_data";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/**
 * Determina la base URL del sito
 * - priorità a NEXT_PUBLIC_SITE_URL
 * - fallback su VERCEL_URL
 */
function getBaseUrl() {
  const a = process.env.NEXT_PUBLIC_SITE_URL;
  if (typeof a === "string" && a.trim()) return a.replace(/\/$/, "");

  const b = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";
  return b.replace(/\/$/, "");
}

function normalizeVariant(v: unknown): BookVariant {
  return v === "print" ? "print" : "pdf";
}

function normPriceId(x: unknown) {
  return typeof x === "string" && x.trim().length > 0 ? x.trim() : undefined;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      slug?: string;
      variant?: BookVariant;
      stripePriceId?: string; // facoltativo dal FE (scelta variante)
      source?: string; // opzionale (es. "editoria" | "formazione")
      successPath?: string; // opzionale override (default: /carrello/success)
      cancelPath?: string; // opzionale override (default: /carrello)
    };

    const slug = typeof body.slug === "string" ? body.slug.trim() : "";
    if (!slug) {
      return NextResponse.json({ error: "Slug mancante" }, { status: 400 });
    }

    const variant = normalizeVariant(body.variant);

    const book = BOOKS.find((b) => b.slug === slug);
    if (!book) {
      return NextResponse.json({ error: "Libro non trovato" }, { status: 404 });
    }

    // ✅ scegliamo il priceId:
    // - priorità al priceId passato dal FE (diretto)
    // - fallback: calcolato da _data.ts (getStripePriceId)
    const stripePriceId =
      normPriceId(body.stripePriceId) ??
      normPriceId(getStripePriceId(book, variant));

    if (!stripePriceId) {
      return NextResponse.json(
        {
          error:
            variant === "print"
              ? "Libro non acquistabile in cartaceo (stripePriceIdPrint mancante)"
              : "Libro non acquistabile (stripePriceIdPdf mancante)",
        },
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

    const isPrint = variant === "print";

    // ✅ rotte (di default usiamo flusso centralizzato del carrello)
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

      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],

      // ✅ crea sempre un Customer e raccoglie email (utile per email + fattura)
      customer_creation: "always",

      // ✅ flusso centralizzato (success gestisce PDF e cartaceo)
      success_url: `${baseUrl}${successPath}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}${cancelPath}`,

      // ✅ Fattura/ricevuta automatica Stripe (serve per hosted_invoice_url / invoice_pdf)
      invoice_creation: { enabled: true },

      // ✅ se cartaceo, chiedi indirizzo in checkout Stripe (solo Italia)
      ...(isPrint
        ? {
            shipping_address_collection: {
              allowed_countries: ["IT"] as const,
            },
          }
        : {}),

      metadata: {
        kind: "single",
        source, // "editoria" o altro
        slug: book.slug,
        variant, // "pdf" | "print"
        // opzionale debug:
        // stripePriceId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Errore creazione checkout" },
      { status: 500 }
    );
  }
}
