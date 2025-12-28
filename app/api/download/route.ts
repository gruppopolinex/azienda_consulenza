// app/api/download/route.ts
import Stripe from "stripe";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { BOOKS } from "@/app/servizi/editoria/_data";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");
    const slug = searchParams.get("slug");

    if (!sessionId || !slug) {
      return NextResponse.json({ error: "Parametri mancanti" }, { status: 400 });
    }

    const book = BOOKS.find((b) => b.slug === slug);
    if (!book?.pdfFile) {
      return NextResponse.json({ error: "PDF non disponibile" }, { status: 404 });
    }

    // ✅ verifica pagamento su Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const paid = session.payment_status === "paid";
    const slugOk = session.metadata?.slug === slug;

    if (!paid || !slugOk) {
      return NextResponse.json({ error: "Pagamento non valido" }, { status: 403 });
    }

    // ✅ opzionale MVP: link valido solo per 24 ore (riduce abuso se condividono URL)
    const createdMs = (session.created ?? 0) * 1000;
    const maxAgeMs = 24 * 60 * 60 * 1000;
    if (createdMs > 0 && Date.now() - createdMs > maxAgeMs) {
      return NextResponse.json({ error: "Link scaduto" }, { status: 403 });
    }

    // ✅ compatibile con pdfFile = "books/<slug>.pdf"
    const filePath = path.join(process.cwd(), "private_pdfs", book.pdfFile);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "File non trovato sul server" },
        { status: 404 }
      );
    }

    const stat = fs.statSync(filePath);
    const file = fs.readFileSync(filePath);

    return new NextResponse(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${book.slug}.pdf"`,
        "Cache-Control": "no-store",
        "Content-Length": String(stat.size),
        // hardening base
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    console.error("DOWNLOAD ERROR:", err);
    return NextResponse.json(
      { error: "Errore durante il download" },
      { status: 500 }
    );
  }
}
