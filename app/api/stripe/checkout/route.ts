// app/api/stripe/checkout/route.ts
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { BOOKS } from "@/app/servizi/editoria/_data";

export const runtime = "nodejs";

// ✅ Stripe inizializzato SENZA apiVersion (evita errori build Vercel)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

/**
 * Determina la base URL del sito
 * - priorità a NEXT_PUBLIC_SITE_URL
 * - fallback su VERCEL_URL
 */
function getBaseUrl() {
  const a = process.env.NEXT_PUBLIC_SITE_URL;
  if (a) return a.replace(/\/$/, "");

  const b = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";

  return b.replace(/\/$/, "");
}

export async function POST(req: Request) {
  try {
    const { slug } = (await req.json()) as { slug?: string };

    if (!slug) {
      return NextResponse.json(
        { error: "Slug mancante" },
        { status: 400 }
      );
    }

    const book = BOOKS.find((b) => b.slug === slug);

    if (!book || !book.stripePriceId) {
      return NextResponse.json(
        { error: "Libro non acquistabile (stripePriceId mancante)" },
        { status: 400 }
      );
    }

    const baseUrl = getBaseUrl();
    if (!baseUrl) {
      return NextResponse.json(
        {
          error:
            "NEXT_PUBLIC_SITE_URL mancante (o VERCEL_URL non disponibile)",
        },
        { status: 500 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      line_items: [
        {
          price: book.stripePriceId,
          quantity: 1,
        },
      ],

      // ✅ flusso centralizzato
      success_url: `${baseUrl}/carrello/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/carrello`,

      metadata: {
        kind: "single",
        slug: book.slug,
        source: "editoria",
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
