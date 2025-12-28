// app/servizi/editoria/success/SuccessClient.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { clearCart } from "@/app/lib/cart";

export default function SuccessClient() {
  const searchParams = useSearchParams();

  const sessionId = searchParams.get("session_id");
  const slug = searchParams.get("slug");

  // ✅ svuota carrello una sola volta
  useEffect(() => {
    clearCart();
  }, []);

  const canDownload = Boolean(sessionId && slug);

  const [downloading, setDownloading] = useState(false);

  const downloadUrl = useMemo(() => {
    if (!sessionId || !slug) return "";
    return `/api/download?session_id=${encodeURIComponent(
      sessionId
    )}&slug=${encodeURIComponent(slug)}`;
  }, [sessionId, slug]);

  const handleDownload = () => {
    if (!downloadUrl) return;
    setDownloading(true);
    window.location.href = downloadUrl;
    // non serve rimettere false: navighi verso download
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="text-2xl font-semibold flex items-center gap-2">
        <span>Pagamento completato</span>
        <span aria-hidden>✅</span>
      </h1>

      <p className="mt-2 text-slate-600">
        Il pagamento è andato a buon fine. Ora puoi scaricare il PDF acquistato.
      </p>

      <button
        type="button"
        onClick={handleDownload}
        disabled={!canDownload || downloading}
        className="mt-6 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-disabled={!canDownload || downloading}
      >
        {downloading ? "Download…" : "Scarica PDF"}
      </button>

      {!canDownload && (
        <p className="mt-3 text-xs text-red-600">
          Dati di download non disponibili. Torna al catalogo e riprova.
        </p>
      )}

      <div className="mt-6 flex gap-4 text-sm">
        {slug && (
          <Link
            href={`/servizi/editoria/${slug}`}
            className="underline underline-offset-2 hover:text-slate-900"
          >
            Torna al libro
          </Link>
        )}
        <Link
          href="/servizi/editoria"
          className="underline underline-offset-2 hover:text-slate-900"
        >
          Vai al catalogo
        </Link>
      </div>
    </div>
  );
}
