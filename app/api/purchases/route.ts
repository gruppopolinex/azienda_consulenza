// app/api/purchases/route.ts
import Stripe from "stripe";
import { NextResponse } from "next/server";
import { BOOKS } from "@/app/servizi/editoria/_data";

export const runtime = "nodejs";

// ✅ Stripe inizializzato SENZA apiVersion (evita errori build Vercel)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type Variant = "pdf" | "print";
type ItemType = "book_pdf" | "book_print";

type PurchasedItem = {
  slug: string;
  title?: string;
  variant: Variant;
  type: ItemType;
  quantity: number;
  stripePriceId?: string;
};

function normalizeVariant(v: unknown): Variant | undefined {
  if (v === "pdf" || v === "print") return v;
  return undefined;
}

function normStr(x: unknown) {
  return typeof x === "string" && x.trim().length > 0 ? x.trim() : undefined;
}

function normQty(q: unknown) {
  const n = Number(q);
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.floor(n));
}

/**
 * Mappa priceId -> info articolo (slug/variant/type) usando BOOKS.
 * Supporta:
 * - stripePriceIdPdf
 * - stripePriceIdPrint
 * - fallback legacy stripePriceId (assunto PDF)
 */
function buildPriceToItemMap() {
  const priceToItem = new Map<
    string,
    { slug: string; title?: string; variant: Variant; type: ItemType }
  >();

  for (const b of BOOKS as any[]) {
    const slug = String(b.slug);
    const title = typeof b.title === "string" ? b.title : undefined;

    const pdfPriceId = normStr((b as any).stripePriceIdPdf) ?? normStr((b as any).stripePriceId);
    const printPriceId = normStr((b as any).stripePriceIdPrint);

    if (pdfPriceId) {
      priceToItem.set(pdfPriceId, {
        slug,
        title,
        variant: "pdf",
        type: "book_pdf",
      });
    }

    if (printPriceId) {
      priceToItem.set(printPriceId, {
        slug,
        title,
        variant: "print",
        type: "book_print",
      });
    }
  }

  return priceToItem;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json({ error: "session_id mancante" }, { status: 400 });
    }

    // ✅ recupero sessione (non affidarti solo ai metadata: nel carrello non ci sono per item)
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Pagamento non valido" }, { status: 403 });
    }

    const priceToItem = buildPriceToItemMap();

    // ✅ Leggiamo SEMPRE i line items (funziona per acquisto singolo e carrello)
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 100 });

    if (!lineItems?.data || lineItems.data.length === 0) {
      return NextResponse.json(
        { error: "Nessun articolo trovato per questa sessione." },
        { status: 404 }
      );
    }

    // ✅ ricostruzione items con aggregazione per slug+variant (così qty si somma)
    const acc = new Map<string, PurchasedItem>(); // key = slug:variant

    for (const li of lineItems.data) {
      const priceId = normStr((li as any).price?.id);
      const qty = normQty((li as any).quantity);

      // fallback title (Stripe line item description)
      const fallbackTitle = normStr((li as any).description) ?? "Articolo acquistato";

      if (!priceId) {
        // Item senza priceId: lo registriamo come unknown (raro)
        const key = `unknown:pdf`;
        const prev = acc.get(key);
        if (prev) {
          prev.quantity += qty;
          acc.set(key, prev);
        } else {
          acc.set(key, {
            slug: "unknown",
            title: fallbackTitle,
            variant: "pdf",
            type: "book_pdf",
            quantity: qty,
          });
        }
        continue;
      }

      const mapped = priceToItem.get(priceId);

      if (!mapped) {
        // priceId non riconosciuto in BOOKS => fallback "unknown"
        const key = `unknown:pdf`;
        const prev = acc.get(key);
        if (prev) {
          prev.quantity += qty;
          acc.set(key, prev);
        } else {
          acc.set(key, {
            slug: "unknown",
            title: fallbackTitle,
            variant: "pdf",
            type: "book_pdf",
            quantity: qty,
            stripePriceId: priceId,
          });
        }
        continue;
      }

      const key = `${mapped.slug}:${mapped.variant}`;
      const prev = acc.get(key);
      if (prev) {
        prev.quantity += qty;
        acc.set(key, prev);
      } else {
        acc.set(key, {
          slug: mapped.slug,
          title: mapped.title ?? fallbackTitle,
          variant: mapped.variant,
          type: mapped.type,
          quantity: qty,
          stripePriceId: priceId,
        });
      }
    }

    const items = Array.from(acc.values());

    // ✅ Caso “legacy”: se per qualche motivo non hai priceId nei line items ma hai metadata.slug
    // (non dovrebbe succedere, ma teniamo un paracadute)
    if (items.length === 0) {
      const metaSlug = normStr(session.metadata?.slug);
      if (metaSlug) {
        const book = BOOKS.find((b) => b.slug === metaSlug);
        const variant: Variant = normalizeVariant(session.metadata?.variant) ?? "pdf";
        return NextResponse.json({
          items: [
            {
              slug: metaSlug,
              title: book?.title ?? metaSlug,
              variant,
              type: variant === "print" ? ("book_print" as const) : ("book_pdf" as const),
              quantity: 1,
            },
          ],
        });
      }

      return NextResponse.json(
        { error: "Impossibile ricostruire gli acquisti (items vuoti)." },
        { status: 404 }
      );
    }

    return NextResponse.json({ items });
  } catch (e) {
    console.error("PURCHASES ERROR:", e);
    return NextResponse.json({ error: "Errore recupero acquisti" }, { status: 500 });
  }
}
