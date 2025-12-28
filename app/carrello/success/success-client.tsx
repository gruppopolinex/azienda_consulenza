// app/carrello/success/success-client.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { clearCart } from "@/app/lib/cart";

type PurchasedItem = { slug: string; title?: string };

export default function SuccessClient() {
  const sp = useSearchParams();
  const sessionId = sp.get("session_id");

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [items, setItems] = useState<PurchasedItem[]>([]);

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

  const primary = items[0];
  const canDownload = useMemo(() => Boolean(sessionId && primary?.slug), [sessionId, primary?.slug]);

  const downloadHref =
    canDownload && primary
      ? `/api/download?session_id=${encodeURIComponent(sessionId!)}&slug=${encodeURIComponent(primary.slug)}`
      : "#";

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-semibold flex items-center gap-2">
        <span>Pagamento completato</span> <span aria-hidden>✅</span>
      </h1>

      {loading ? (
        <p className="mt-3 text-slate-600">Sto preparando il download…</p>
      ) : err ? (
        <>
          <p className="mt-3 text-red-700">{err}</p>
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
            Il pagamento è andato a buon fine. Ora puoi scaricare il PDF acquistato.
          </p>

          <div className="mt-6">
            <a
              href={downloadHref}
              className={`inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${
                canDownload ? "bg-emerald-600 hover:bg-emerald-700" : "bg-slate-400 cursor-not-allowed"
              }`}
              aria-disabled={!canDownload}
              onClick={(e) => {
                if (!canDownload) e.preventDefault();
              }}
            >
              Scarica PDF
            </a>
          </div>

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
