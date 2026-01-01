// app/api/download/route.ts
import Stripe from "stripe";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { BOOKS } from "@/app/servizi/editoria/_data";

export const runtime = "nodejs";

// ✅ Stripe inizializzato SENZA apiVersion (evita problemi build)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

function safeFileName(name: string) {
  // evita caratteri strani nel filename
  return name.replace(/[^a-zA-Z0-9._-]+/g, "-");
}

function isValidSlug(slug: string) {
  // hardening: evita traversal e slug strani
  return /^[a-z0-9-]+$/i.test(slug);
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");
    const slug = searchParams.get("slug");

    if (!sessionId || !slug) {
      return NextResponse.json({ error: "Parametri mancanti" }, { status: 400 });
    }

    if (!isValidSlug(slug)) {
      return NextResponse.json({ error: "Slug non valido" }, { status: 400 });
    }

    const book = BOOKS.find((b) => b.slug === slug);
    if (!book?.pdfFile) {
      return NextResponse.json({ error: "PDF non disponibile" }, { status: 404 });
    }

    // ✅ verifica pagamento su Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Pagamento non valido" }, { status: 403 });
    }

    // ✅ opzionale MVP: link valido solo per 24 ore
    const createdMs = (session.created ?? 0) * 1000;
    const maxAgeMs = 24 * 60 * 60 * 1000;
    if (createdMs > 0 && Date.now() - createdMs > maxAgeMs) {
      return NextResponse.json({ error: "Link scaduto" }, { status: 403 });
    }

    /**
     * ✅ Autorizzazione download:
     * - checkout "single": ci aspettiamo metadata.slug
     * - checkout "cart": ricostruiamo dagli items (line_items) e verifichiamo che tra i priceId ci sia quello del PDF del libro
     *
     * Importante:
     * - il download è ammesso SOLO se è stato acquistato il PDF (variant pdf / book_pdf).
     * - se l'utente ha acquistato solo il cartaceo, qui deve prendere 403.
     */
    const meta = session.metadata ?? {};
    const metaSlug = typeof meta.slug === "string" ? meta.slug : undefined;
    const metaVariant = meta.variant === "print" || meta.variant === "pdf" ? meta.variant : undefined;

    // priceId PDF (supporto vecchio e nuovo schema dati)
    const pdfPriceId: string | undefined =
      (book as any).stripePriceIdPdf ??
      (book as any).stripePriceId ??
      undefined;

    if (!pdfPriceId || typeof pdfPriceId !== "string" || pdfPriceId.length === 0) {
      return NextResponse.json(
        { error: "Download non configurato (stripePriceIdPdf mancante)" },
        { status: 500 }
      );
    }

    // 1) Caso checkout singolo: metadata.slug + (opzionale) metadata.variant
    let allowed = false;

    if (metaSlug === slug) {
      // Se il backend ha scritto la variante, blocchiamo esplicitamente il print-only
      if (metaVariant === "print") {
        allowed = false;
      } else {
        // pdf o variante assente => consentiamo (compat)
        allowed = true;
      }
    }

    // 2) Caso checkout carrello: controlliamo i line items
    if (!allowed) {
      const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {
        limit: 100,
      });

      const purchasedPriceIds = new Set(
        lineItems.data
          .map((li) => li.price?.id)
          .filter((x): x is string => typeof x === "string" && x.length > 0)
      );

      // ✅ consentiamo download SOLO se è stato acquistato il PDF (priceId PDF)
      allowed = purchasedPriceIds.has(pdfPriceId);
    }

    if (!allowed) {
      return NextResponse.json(
        { error: "Download non autorizzato per questo acquisto" },
        { status: 403 }
      );
    }

    // ✅ path: private_pdfs/<book.pdfFile> (es: "books/slug.pdf")
    const filePath = path.join(process.cwd(), "private_pdfs", book.pdfFile);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: "File non trovato sul server" },
        { status: 404 }
      );
    }

    const stat = fs.statSync(filePath);
    const file = fs.readFileSync(filePath);

    const downloadName = safeFileName(`${book.slug}.pdf`);

    return new NextResponse(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${downloadName}"`,
        "Cache-Control": "no-store",
        "Content-Length": String(stat.size),

        // hardening base
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err) {
    console.error("DOWNLOAD ERROR:", err);
    return NextResponse.json({ error: "Errore durante il download" }, { status: 500 });
  }
}
