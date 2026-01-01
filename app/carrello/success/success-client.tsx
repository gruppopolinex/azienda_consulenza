// app/carrello/success/success-client.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Download, Truck, AlertTriangle } from "lucide-react";
import { clearCart } from "@/app/lib/cart";

type PurchasedItem = {
  slug: string;
  title?: string;
  variant?: "pdf" | "print";
  type?: "book_pdf" | "book_print" | string;
  // opzionale se in futuro lo aggiungi nel backend:
  // quantity?: number;
};

function isPrintable(item: PurchasedItem) {
  return item.variant === "print" || item.type === "book_print";
}

function isDownloadable(item: PurchasedItem) {
  // se non è esplicitamente cartaceo, lo consideriamo scaricabile (fallback)
  return item.variant === "pdf" || item.type === "book_pdf" || !isPrintable(item);
}

function getItemLabel(item: PurchasedItem) {
  if (isPrintable(item)) return "Cartaceo";
  return "PDF";
}

export default function SuccessClient() {
  const sp = useSearchParams();
  const sessionId = sp.get("session_id");

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [items, setItems] = useState<PurchasedItem[]>([]);

  // ✅ svuota carrello una sola volta
  useEffect(() => {
    clearCart();
  }, []);

  useEffect(() => {
    const run = async () => {
      if (!sessionId) {
        setErr("session_id mancante.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `/api/purchases?session_id=${encodeURIComponent(sessionId)}`,
          { cache: "no-store" }
        );

        const data: { items?: PurchasedItem[]; error?: string } = await res.json();

        if (!res.ok || !data.items || data.items.length === 0) {
          setErr(data.error ?? "Nessun acquisto trovato per questa sessione.");
          setLoading(false);
          return;
        }

        setItems(data.items);
        setLoading(false);
      } catch {
        setErr("Errore di rete nel recupero acquisti.");
        setLoading(false);
      }
    };

    run();
  }, [sessionId]);

  const hasPrint = useMemo(() => items.some(isPrintable), [items]);
  const downloadableItems = useMemo(() => items.filter(isDownloadable), [items]);

  // ✅ per ora: 1 download “principale” (prima voce scaricabile)
  const primaryDownload = downloadableItems[0];

  const canDownload = useMemo(
    () => Boolean(sessionId && primaryDownload?.slug && primaryDownload.slug !== "unknown"),
    [sessionId, primaryDownload?.slug]
  );

  const downloadHref =
    canDownload && primaryDownload
      ? `/api/download?session_id=${encodeURIComponent(
          sessionId!
        )}&slug=${encodeURIComponent(primaryDownload.slug)}`
      : "#";

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-semibold flex items-center gap-2">
        <span>Pagamento completato</span> <span aria-hidden>✅</span>
      </h1>

      {loading ? (
        <p className="mt-3 text-slate-600">Sto preparando i dettagli dell’ordine…</p>
      ) : err ? (
        <>
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 mt-0.5" />
              <p className="min-w-0">{err}</p>
            </div>
          </div>

          <div className="mt-6 flex gap-4 text-sm">
            <Link href="/" className="underline underline-offset-2 hover:text-slate-900">
              Vai alla home
            </Link>
            <Link href="/carrello" className="underline underline-offset-2 hover:text-slate-900">
              Torna al carrello
            </Link>
          </div>
        </>
      ) : (
        <>
          <p className="mt-3 text-slate-600">
            Il pagamento è andato a buon fine.
            {hasPrint ? (
              <>
                {" "}
                Se hai acquistato anche la versione <strong>cartacea</strong>, riceverai
                aggiornamenti sulla spedizione via email.
              </>
            ) : null}
          </p>

          {/* ✅ Download se c’è almeno un PDF */}
          {downloadableItems.length > 0 ? (
            <>
              <div className="mt-6">
                <a
                  href={downloadHref}
                  className={[
                    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition",
                    canDownload ? "bg-emerald-600 hover:bg-emerald-700" : "bg-slate-400 cursor-not-allowed",
                  ].join(" ")}
                  aria-disabled={!canDownload}
                  onClick={(e) => {
                    if (!canDownload) e.preventDefault();
                  }}
                >
                  <Download className="h-4 w-4" />
                  Scarica PDF
                </a>

                {!canDownload && (
                  <p className="mt-2 text-[11px] text-slate-500">
                    Se non vedi il download, è possibile che l’articolo non sia stato riconosciuto
                    (mapping priceId→slug) oppure che non sia un PDF.
                  </p>
                )}

                {/* ✅ elenco acquisti */}
                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Riepilogo acquisto
                  </p>

                  <ul className="mt-2 space-y-2 text-sm text-slate-700">
                    {items.map((it, idx) => (
                      <li
                        key={`${it.slug}:${idx}`}
                        className="flex items-center justify-between gap-3"
                      >
                        <span className="min-w-0 truncate">{it.title ?? it.slug}</span>

                        <span
                          className={[
                            "shrink-0 text-[11px] font-semibold rounded-full px-2 py-0.5",
                            isPrintable(it)
                              ? "bg-amber-50 text-amber-800 ring-1 ring-amber-100"
                              : "bg-slate-100 text-slate-700",
                          ].join(" ")}
                        >
                          {getItemLabel(it)}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {hasPrint && (
                    <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-[12px] text-amber-900">
                      <div className="flex items-start gap-2">
                        <Truck className="h-4 w-4 mt-0.5" />
                        <div>
                          <p className="font-semibold">Spedizione</p>
                          <p className="mt-1">
                            Per i cartacei la spedizione viene gestita separatamente: ti aggiorniamo
                            via email sugli step successivi.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <p className="mt-3 text-[11px] text-slate-500">
                    Nota: se hai acquistato più PDF, in questa versione viene mostrato un solo
                    download. Nel prossimo step possiamo abilitarli tutti.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
              Hai acquistato solo articoli <strong>cartacei</strong>. Non ci sono file da scaricare.
            </div>
          )}

          <div className="mt-8 flex gap-4 text-sm">
            <Link href="/" className="underline underline-offset-2 hover:text-slate-900">
              Vai alla home
            </Link>
            <Link href="/carrello" className="underline underline-offset-2 hover:text-slate-900">
              Torna al carrello
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
