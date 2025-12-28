// app/servizi/editoria/success/page.tsx
"use client";

import { useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Download, ArrowLeft } from "lucide-react";

import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import { clearCart } from "@/app/lib/cart";

const PRODUCTS_ANCHOR = "/#prodotti"; // se aggiungi id="prodotti" nella Home (vedi nota sotto)

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id") ?? "";
  const slug = searchParams.get("slug") ?? "";

  // ✅ svuota carrello una sola volta all'arrivo su success
  useEffect(() => {
    clearCart();
  }, []);

  const downloadUrl = useMemo(() => {
    if (!sessionId || !slug) return "";
    return `/api/download?session_id=${encodeURIComponent(
      sessionId
    )}&slug=${encodeURIComponent(slug)}`;
  }, [sessionId, slug]);

  const canDownload = Boolean(downloadUrl);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Nav />

      <main className="flex-1 mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10 text-center">
          <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <CheckCircle className="h-6 w-6" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold">
            Pagamento completato
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            Il pagamento è andato a buon fine. Ora puoi scaricare il PDF acquistato.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={downloadUrl || "#"}
              onClick={(e) => {
                if (!canDownload) e.preventDefault();
              }}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${
                canDownload
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-emerald-600/50 cursor-not-allowed"
              }`}
              aria-disabled={!canDownload}
            >
              <Download className="h-4 w-4" />
              Scarica PDF
            </a>

            <Link
              href={PRODUCTS_ANCHOR}
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-white"
            >
              Scopri i servizi
            </Link>
          </div>

          {!canDownload && (
            <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 text-left">
              Dati di download non disponibili (manca <code>session_id</code> o{" "}
              <code>slug</code>).<br />
              Torna alla Home e riprova l’acquisto.
            </div>
          )}

          <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            {/* link al libro SOLO se hai slug; se lo slug non esiste più, questo porterebbe 404 */}
            {slug && (
              <Link
                href={`/servizi/editoria/${slug}`}
                className="inline-flex items-center gap-2 underline underline-offset-2 hover:text-slate-900"
              >
                <ArrowLeft className="h-4 w-4" />
                Torna al dettaglio
              </Link>
            )}

            <Link
              href="/"
              className="underline underline-offset-2 hover:text-slate-900"
            >
              Vai alla Home
            </Link>

            <Link
              href="/contatti"
              className="underline underline-offset-2 hover:text-slate-900"
            >
              Hai bisogno di aiuto?
            </Link>
          </div>

          <p className="mt-5 text-[11px] text-slate-500">
            Consiglio: il download si apre in una nuova scheda per non perdere questa pagina.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
