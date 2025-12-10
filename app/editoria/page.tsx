// app/editoria/page.tsx
"use client";

import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { BookOpen, ShoppingCart, Filter, Tag, Check } from "lucide-react";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

// dati centralizzati in _data.ts
import {
  BOOKS,
  AREAS,
  type Book,
  type Area,
} from "./_data";

/* ==================== UTILS ==================== */

const AREA_FILTERS = ["Tutte", ...AREAS] as const;
type AreaFilter = (typeof AREA_FILTERS)[number];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(price);

/* ==================== PAGINA EDITORIA ==================== */

export default function EditoriaPage() {
  const [areaFilter, setAreaFilter] = useState<AreaFilter>("Tutte");
  const [search, setSearch] = useState("");

  const filteredBooks = useMemo(() => {
    return BOOKS.filter((book) => {
      const byArea =
        areaFilter === "Tutte" ? true : book.area === areaFilter;
      const query = search.trim().toLowerCase();
      const bySearch = !query
        ? true
        : [book.title, book.subtitle ?? "", book.area, book.description]
            .join(" ")
            .toLowerCase()
            .includes(query);

      return byArea && bySearch;
    });
  }, [areaFilter, search]);

  const totalBooks = filteredBooks.length;

  const handleAddToCart = (book: Book) => {
    console.log("Aggiungi al carrello:", book.slug);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Nav />

      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
        {/* HERO con logo + titolo, come le altre pagine */}
        <section className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-0">
            <div className="relative w-40 h-16 sm:w-56 sm:h-24">
              <Image
                src="/logo.png"
                alt="Polinex srl"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <h1 className="section-title mt-1 flex items-center justify-center gap-2">
            <span>Editoria tecnica</span>
            <BookOpen className="h-6 w-6 text-emerald-700 hidden sm:inline" />
          </h1>

          <p className="mt-4 text-slate-600 leading-relaxed">
            Manuali, linee guida e casi studio pensati per chi lavora ogni
            giorno su{" "}
            <strong>
              acqua, ambiente, energia, agricoltura, sicurezza, edilizia e
              infrastrutture
            </strong>{" "}
            e sugli aspetti di{" "}
            <strong>finanza e contabilità dei progetti</strong>.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Ogni volume è concepito come uno strumento operativo: schemi,
            check-list, esempi reali e riferimenti normativi essenziali.
          </p>
        </section>

        {/* Card filtro area in stile "box" sotto l'hero */}
        <section className="mt-8 sm:mt-10">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-2xl border border-emerald-100 bg-white px-4 py-4 sm:px-5 sm:py-5 shadow-sm">
              <p className="text-sm font-medium text-emerald-900 flex items-center gap-2">
                Filtra per area di competenza
              </p>
              <p className="mt-1 text-xs text-slate-600">
                Puoi combinare il filtro per area con la ricerca per titolo o
                parole chiave.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {AREA_FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setAreaFilter(f)}
                    className={`rounded-full border px-3 py-1 text-xs sm:text-[13px] transition ${
                      areaFilter === f
                        ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                        : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {f === "Tutte" ? "Tutte le aree" : f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FILTRI & GRID LIBRI */}
        <section className="mx-auto max-w-6xl py-10">
          {/* Barra filtri "tipo e-commerce" */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <Filter className="h-4 w-4 text-slate-500" />
              <span>
                {areaFilter === "Tutte" ? "Tutte le aree" : areaFilter} •{" "}
                <strong>{totalBooks}</strong>{" "}
                {totalBooks === 1 ? "titolo" : "titoli"} disponibili
              </span>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <div className="relative w-full sm:w-64">
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cerca per titolo, area, parole chiave..."
                  className="w-full rounded-full border border-slate-300 bg-white px-4 py-2 text-sm pr-8 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
                  🔍
                </span>
              </div>
            </div>
          </div>

          {/* Grid libri */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.slug}
                book={book}
                onAddToCart={() => handleAddToCart(book)}
              />
            ))}

            {filteredBooks.length === 0 && (
              <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-600">
                Nessun titolo trovato per i filtri selezionati. Prova a
                modificare area o testo di ricerca.
              </div>
            )}
          </div>

          {/* Nota logistica */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-0.5 text-emerald-600" />
                <p>
                  Le informazioni su{" "}
                  <strong>spedizione, tempi di consegna</strong> e{" "}
                  <strong>fatturazione</strong> vengono mostrate nel carrello
                  prima del completamento dell’ordine.
                </p>
              </div>
              <p className="text-xs text-slate-500 sm:text-right">
                Per volumi in grandi quantità o personalizzazioni aziendali
                puoi contattarci direttamente dalla pagina{" "}
                <Link
                  href="/contatti"
                  className="underline underline-offset-2 hover:text-slate-800"
                >
                  Contatti
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* CTA finale in stile Trasparenza / Portfolio */}
        <section className="mx-auto max-w-6xl pb-20">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10 text-center">
            <h3 className="section-title text-xl sm:text-2xl">
              Non trovi il volume che cerchi?
            </h3>
            <p className="mt-3 text-sm text-slate-600 max-w-2xl mx-auto">
              Possiamo valutare insieme{" "}
              <strong>nuove uscite</strong>, tirature dedicate o{" "}
              <strong>materiali formativi su misura</strong> per la tua azienda
              o il tuo ente.
            </p>
            <Link
              href="/contatti"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Parla con il team
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      {/* Stili globali per i titoli, coerenti con Home / Lavora con noi */}
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

function BookCard({
  book,
  onAddToCart,
}: {
  book: Book;
  onAddToCart: () => void;
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm transition hover:shadow-md">
      {/* Parte cliccabile: apre /editoria/[slug] */}
      <Link
        href={`/editoria/${book.slug}`}
        className="group flex-1 flex flex-col focus:outline-none"
        aria-label={`Dettaglio libro: ${book.title}`}
      >
        <div className="relative aspect-[3/4] bg-slate-100">
          <Image
            src={book.cover}
            alt={book.title}
            fill
            sizes="(min-width: 1024px) 320px, 50vw"
            className="object-cover group-hover:scale-[1.02] transition-transform"
          />
          <div className="absolute left-3 top-3 flex flex-col gap-1">
            <span className="inline-flex rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
              {book.area}
            </span>
            {book.badge && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
                <Tag className="h-3 w-3" />
                {book.badge}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <header>
            <h3 className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
              {book.title}
            </h3>
            {book.subtitle && (
              <p className="mt-1 text-xs font-medium text-emerald-700">
                {book.subtitle}
              </p>
            )}
          </header>

          <p className="mt-2 line-clamp-3 text-xs text-slate-600">
            {book.description}
          </p>

          <dl className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-500">
            <div>
              <dt className="font-medium text-slate-600">Formato</dt>
              <dd>{book.format}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-600">Anno</dt>
              <dd>{book.year}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-600">Pagine</dt>
              <dd>{book.pages}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-600">Area</dt>
              <dd>{book.area}</dd>
            </div>
          </dl>

          <div className="mt-3 text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1">
              <Check className="h-3 w-3 text-emerald-600" />
              <span>Contenuti aggiornati alle normative più recenti.</span>
            </span>
          </div>
        </div>
      </Link>

      {/* Riga inferiore: prezzo + bottone carrello (non dentro il Link) */}
      <div className="flex items-center justify-between gap-3 px-4 pb-4 pt-0">
        <div>
          <p className="text-xs text-slate-500">Prezzo</p>
          <p className="text-lg font-semibold text-slate-900">
            {formatPrice(book.price)}
          </p>
        </div>

        <button
          type="button"
          onClick={onAddToCart}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          aria-label={`Aggiungi al carrello: ${book.title}`}
        >
          <ShoppingCart className="h-4 w-4" />
          <span>Aggiungi al carrello</span>
        </button>
      </div>
    </article>
  );
}
