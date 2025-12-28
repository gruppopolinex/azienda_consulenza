// app/api/purchases/route.ts
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { BOOKS } from "@/app/servizi/editoria/_data";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json({ error: "session_id mancante" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Pagamento non valido" }, { status: 403 });
    }

    const slug = session.metadata?.slug;
    if (!slug) {
      return NextResponse.json(
        { error: "Slug non presente nei metadata della sessione" },
        { status: 404 }
      );
    }

    const book = BOOKS.find((b) => b.slug === slug);

    return NextResponse.json({
      items: [{ slug, title: book?.title ?? slug }],
    });
  } catch (e) {
    console.error("PURCHASES ERROR:", e);
    return NextResponse.json({ error: "Errore recupero acquisti" }, { status: 500 });
  }
}
