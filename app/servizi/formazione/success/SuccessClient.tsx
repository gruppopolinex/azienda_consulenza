// app/servizi/formazione/success/SuccessClient.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { clearCart } from "@/app/lib/cart";
import { AlertTriangle } from "lucide-react";

type PurchasedItem = {
  slug: string;
  title?: string;
  // formazione può avere tipi diversi in futuro, intanto teniamo compatibile
  variant?: "pdf" | "print";
  type?: string;
};

export default function SuccessClient() {
  const sp = useSearchParams();
  const sessionId = sp.get("session_id");

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  // se in futuro /api/purchases restituisce anche corsi, li mostriamo
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

        if (!res.ok) {
          setErr(data.error ?? "Errore nel recupero dei dettagli dell’ordine.");
          setLoading(false);
          return;
        }

        // In formazione può capitare che /api/purchases non ritorni niente (se non implementato per corsi):
        setItems(Array.isArray(data.items) ? data.items : []);
        setLoading(false);
      } catch {
        setErr("Errore di rete nel recupero acquisti.");
        setLoading(false);
      }
    };

    run();
  }, [sessionId]);

  const hasItems = useMemo(() => items.length > 0, [items]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-semibold flex items-center gap-2">
        <span>Pagamento completato</span>
        <span aria-hidden>✅</span>
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
            <Link
              href="/servizi/formazione"
              className="underline underline-offset-2 hover:text-slate-900"
            >
              Vai al catalogo
            </Link>
          </div>
        </>
      ) : (
        <>
          <p className="mt-3 text-slate-600">
            Il pagamento è andato a buon fine. Riceverai una email di conferma con i dettagli
            dell’iscrizione (accessi, calendario e materiali).
          </p>

          {hasItems ? (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
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
                    <span className="shrink-0 text-[11px] font-semibold rounded-full bg-slate-100 px-2 py-0.5 text-slate-700">
                      {it.type ?? "Corso"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              Ordine confermato. Se non vedi il riepilogo qui, è normale: per i corsi possiamo
              collegare la risposta di <code>/api/purchases</code> anche ai prodotti “formazione”.
            </div>
          )}

          <div className="mt-8 flex gap-4 text-sm">
            <Link
              href="/servizi/formazione"
              className="underline underline-offset-2 hover:text-slate-900"
            >
              Vai al catalogo
            </Link>
            <Link href="/" className="underline underline-offset-2 hover:text-slate-900">
              Vai alla home
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
