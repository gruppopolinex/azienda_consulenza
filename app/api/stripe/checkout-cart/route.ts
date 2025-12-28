// app/api/stripe/checkout-cart/route.ts
import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

type CartCheckoutItem = {
  stripePriceId: string;
  quantity: number;
};

function getBaseUrl() {
  const a = process.env.NEXT_PUBLIC_SITE_URL;
  if (a) return a.replace(/\/$/, "");
  const b = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";
  return b.replace(/\/$/, "");
}

function normQty(q: unknown) {
  const n = Number(q);
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.floor(n));
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { items?: CartCheckoutItem[] };

    if (!body?.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        { error: "Carrello vuoto o items mancanti" },
        { status: 400 }
      );
    }

    // valida & normalizza
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = body.items
      .filter((x) => x && typeof x.stripePriceId === "string" && x.stripePriceId.length > 0)
      .map((x) => ({
        price: x.stripePriceId,
        quantity: normQty(x.quantity),
      }));

    if (lineItems.length === 0) {
      return NextResponse.json(
        { error: "Nessun item acquistabile (stripePriceId mancanti)" },
        { status: 400 }
      );
    }

    const baseUrl = getBaseUrl();
    if (!baseUrl) {
      return NextResponse.json(
        { error: "NEXT_PUBLIC_SITE_URL mancante (o VERCEL_URL non disponibile)" },
        { status: 500 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,

      // ✅ globali
      success_url: `${baseUrl}/carrello/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/carrello`,

      metadata: {
        kind: "cart",
        itemsCount: String(lineItems.length),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json(
      { error: "Errore creazione checkout carrello" },
      { status: 500 }
    );
  }
}
