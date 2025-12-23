// app/servizi/editoria/[slug]/page.tsx
"use client";

import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  BookOpen,
  ShoppingCart,
  ArrowLeft,
  Check,
  Tag,
  FileText,
  ExternalLink,
  Phone,
  Mail,
  Linkedin,
} from "lucide-react";

import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";

// Import dati centralizzati
import { BOOKS, type Book, type Author } from "../_data";

/* ===== Helper prezzo (stile altre pagine) ===== */
const formatPrice = (price: number) =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(price);

/* ==================== PAGINA DETTAGLIO LIBRO ==================== */

export default function BookDetailPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();

  const slugParam = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const book: Book | undefined = BOOKS.find((b) => b.slug === slugParam);

  // Gestione libro non trovato
  if (!book) {
    return (
      <div className="min-h-screen bg-white text-slate-900 flex flex-col">
        <Nav />
        <main className="flex-1 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
          <button
            type="button"
            onClick={() => router.push("/servizi/editoria")}
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Torna al catalogo editoria
          </button>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
            <h1 className="section-title">Titolo non trovato</h1>
            <p className="mt-3 text-sm text-slate-600">
              Il volume che stai cercando non è stato trovato o non è più
              disponibile a catalogo.
            </p>
            <Link
              href="/servizi/editoria"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Vai al catalogo
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const related = BOOKS.filter((b) => b.area === book.area && b.slug !== book.slug).slice(
    0,
    3
  );

  const hasAuthors = book.authors && book.authors.length > 0;

  const handleAddToCart = () => {
    // Qui poi collegherai il vero carrello (context, ecc.)
    console.log("Aggiungi al carrello:", book.slug);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Nav />

      <main className="flex-1">
        {/* HERO / BREADCRUMB */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => router.push("/servizi/editoria")}
                className="inline-flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 w-fit"
              >
                <ArrowLeft className="h-3 w-3" />
                <span>Torna al catalogo editoria</span>
              </button>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-2xl">
                  <h1 className="section-title flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <BookOpen className="h-5 w-5" />
                    </span>
                    <span>{book.title}</span>
                  </h1>
                  {book.subtitle && (
                    <p className="mt-2 text-sm font-medium text-emerald-700">
                      {book.subtitle}
                    </p>
                  )}
                  <p className="mt-3 text-sm text-slate-600">
                    Area:{" "}
                    <span className="font-medium text-slate-800">{book.area}</span>
                    {" · "}
                    Formato:{" "}
                    <span className="font-medium text-slate-800">{book.format}</span>
                    {" · "}
                    <span className="font-medium text-slate-800">{book.year}</span>
                  </p>
                </div>

                <div className="flex flex-col items-start sm:items-end gap-2">
                  {book.badge && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold text-emerald-800">
                      <Tag className="h-3 w-3" />
                      {book.badge}
                    </span>
                  )}
                  <p className="text-xs text-slate-500">
                    Codice interno:{" "}
                    <span className="font-mono text-slate-700">{book.slug}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BLOCCO 3 COLONNE ALLINEATE (cover / panoramica / acquisto) */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid gap-6 lg:grid-cols-3 items-stretch">
            {/* Colonna 1: COVER */}
            <div className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-3 flex items-center justify-center">
              <div className="relative w-full max-w-xs aspect-[3/4] overflow-hidden rounded-xl bg-slate-100">
                <Image
                  src={book.cover}
                  alt={book.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 280px, 60vw"
                />
              </div>
            </div>

            {/* Colonna 2: PANORAMICA + ESTRATTO PDF */}
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 flex flex-col">
              <div>
                <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-slate-500" />
                  Panoramica del volume
                </h2>
                <p className="mt-2 text-sm text-slate-700">{book.description}</p>
              </div>

              {book.previewUrl && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <p className="text-xs text-slate-600 mb-2">
                    Vuoi farti un&apos;idea dei contenuti?
                  </p>
                  <Link
                    href={book.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-800 hover:border-emerald-500 hover:text-emerald-700"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Apri un estratto in PDF</span>
                  </Link>
                  <p className="mt-2 text-[11px] text-slate-500">
                    L&apos;estratto include indice, introduzione e alcune pagine di
                    esempio.
                  </p>
                </div>
              )}
            </div>

            {/* Colonna 3: ACQUISTO */}
            <aside className="h-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm flex flex-col">
              <div>
                <p className="text-xs text-slate-500">Prezzo</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">
                  {formatPrice(book.price)}
                </p>

                <p className="mt-2 text-xs text-slate-600">
                  Il prezzo si intende <strong>IVA esclusa</strong>. Dettagli su
                  spese di spedizione e fatturazione sono mostrati nel carrello, prima
                  del pagamento.
                </p>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Aggiungi al carrello
                </button>

                <p className="mt-3 text-[11px] text-slate-500">
                  Per ordini multipli o personalizzazioni aziendali, puoi contattarci
                  direttamente dalla pagina{" "}
                  <Link
                    href="/contatti"
                    className="underline underline-offset-2 hover:text-slate-800"
                  >
                    Contatti
                  </Link>
                  .
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-xs text-slate-600 mb-2">
                  Vuoi finanziare l&apos;acquisto del volume attraverso{" "}
                  <strong>finanza agevolata</strong> o progetti formativi?
                </p>
                <Link
                  href="/contatti"
                  className="inline-flex w-full items-center justify-center rounded-full border border-emerald-600 px-4 py-2 text-xs font-semibold text-emerald-700 hover:bg-emerald-50"
                >
                  Parla con il team finanza agevolata
                </Link>
              </div>
            </aside>
          </div>

          {/* SECONDO BLOCCO: DETTAGLI TECNICI + AUTORI */}
          <div className="mt-8 grid gap-6 lg:grid-cols-3 items-start">
            {/* Dettagli tecnici: larga quanto le prime due colonne */}
            <div
              className={
                hasAuthors
                  ? "lg:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5"
                  : "lg:col-span-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5"
              }
            >
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-600" />
                Dettagli tecnici
              </h3>
              <dl className="mt-3 grid gap-3 text-xs text-slate-700 sm:grid-cols-2">
                <div>
                  <dt className="font-medium text-slate-600">Area</dt>
                  <dd>{book.area}</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-600">Formato</dt>
                  <dd>{book.format}</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-600">Numero pagine</dt>
                  <dd>{book.pages}</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-600">Anno di pubblicazione</dt>
                  <dd>{book.year}</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-600">Aggiornamento normativo</dt>
                  <dd>Allineato alle principali norme in vigore alla data.</dd>
                </div>
                <div>
                  <dt className="font-medium text-slate-600">Utilizzo consigliato</dt>
                  <dd>
                    Come manuale operativo di riferimento per casi concreti e iter
                    autorizzativi.
                  </dd>
                </div>
              </dl>
            </div>

            {/* Colonna destra: Autori (solo se esistono in _data) */}
            {hasAuthors && (
              <div className="lg:col-span-1 space-y-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Autore / Autori
                </p>
                <div className="space-y-4">
                  {book.authors!.map((author) => (
                    <AuthorCard key={author.name} author={author} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Libri correlati per area */}
          {related.length > 0 && (
            <section className="mt-12 border-t border-slate-200 pt-8">
              <h2 className="text-sm font-semibold text-slate-900">
                Altri titoli nell’area {book.area.toLowerCase()}
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/servizi/editoria/${r.slug}`}
                    className="group rounded-2xl border border-slate-200 bg-white p-3 text-xs text-slate-700 hover:border-emerald-400 hover:shadow-sm"
                  >
                    <div className="relative w-full aspect-[3/4] overflow-hidden rounded-lg bg-slate-100">
                      <Image
                        src={r.cover}
                        alt={r.title}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform"
                        sizes="(min-width: 1024px) 180px, 40vw"
                      />
                    </div>
                    <p className="mt-2 text-[11px] uppercase tracking-wide text-emerald-700 font-semibold">
                      {r.area}
                    </p>
                    <p className="mt-1 font-semibold text-slate-900 line-clamp-2">
                      {r.title}
                    </p>
                    {r.subtitle && (
                      <p className="mt-1 text-[11px] text-slate-600 line-clamp-2">
                        {r.subtitle}
                      </p>
                    )}
                    <p className="mt-2 font-semibold text-slate-900">
                      {formatPrice(r.price)}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </section>
      </main>

      <Footer />

      {/* Stili globali per titoli, uniformi al resto del sito */}
      <style jsx global>{`
        .section-title {
          font-size: clamp(1.5rem, 2.4vw, 2.5rem);
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .section-sub {
          margin-top: 0.5rem;
          color: #5b6573;
        }
      `}</style>
    </div>
  );
}

/* ==================== COMPONENTI UI ==================== */

function AuthorCard({ author }: { author: Author }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 flex gap-3 sm:gap-4">
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-slate-100 flex items-center justify-center text-[11px] font-semibold text-slate-500">
        {author.photo ? (
          <Image
            src={author.photo}
            alt={author.name}
            fill
            className="object-cover"
            sizes="56px"
          />
        ) : (
          <span>
            {author.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 3)
              .toUpperCase()}
          </span>
        )}
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-slate-900">{author.name}</p>
        <p className="text-[11px] text-emerald-700 font-medium">{author.role}</p>

        <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
          {author.phone && (
            <Link
              href={`tel:${author.phone}`}
              className="inline-flex items-center gap-1 hover:text-slate-800"
            >
              <Phone className="h-3 w-3" />
              <span>Telefono</span>
            </Link>
          )}
          {author.email && (
            <Link
              href={`mailto:${author.email}`}
              className="inline-flex items-center gap-1 hover:text-slate-800"
            >
              <Mail className="h-3 w-3" />
              <span>Email</span>
            </Link>
          )}
          {author.linkedin && (
            <Link
              href={author.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-slate-800"
            >
              <Linkedin className="h-3 w-3" />
              <span>LinkedIn</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
