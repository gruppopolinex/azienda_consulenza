// app/servizi/editoria/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { BookOpen, ShoppingCart, Tag, Check, Search, Filter } from "lucide-react";

import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

// ✅ dati centralizzati in _data.ts (aggiornati con varianti)
import {
  BOOKS,
  AREAS,
  type Book,
  type BookVariant,
  isPrintAvailable,
  getBookPrice,
  getStripePriceId,
} from "./_data";

// ✅ carrello globale in lib
import { addItem } from "@/app/lib/cart";

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
  const [buyingKey, setBuyingKey] = useState<string | null>(null); // slug:variant

  const filteredBooks = useMemo(() => {
    return BOOKS.filter((book) => {
      const byArea = areaFilter === "Tutte" ? true : book.area === areaFilter;

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

  const handleAddToCart = (book: Book, variant: BookVariant) => {
    const price = getBookPrice(book, variant);
    const stripePriceId = getStripePriceId(book, variant);

    addItem({
      id: `book:${book.slug}:${variant}`, // ✅ righe distinte per variante
      type: variant === "print" ? "book_print" : "book_pdf",
      title: book.title,
      price,
      quantity: 1,
      image: book.cover,
      href: `/servizi/editoria/${book.slug}`,
      stripePriceId,
      metadata: {
        slug: book.slug,
        area: book.area,
        variant,
      },
    });
  };

  const handleBuyNow = async (book: Book, variant: BookVariant) => {
    const stripePriceId = getStripePriceId(book, variant);
    if (!stripePriceId) return;

    const key = `${book.slug}:${variant}`;

    try {
      setBuyingKey(key);

      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: book.slug,
          variant,
          stripePriceId, // ✅ scelto lato FE (pdf/print)
        }),
      });

      const data: { url?: string; error?: string } = await res.json();

      if (!res.ok || !data.url) {
        console.error(data.error ?? "Errore checkout");
        return;
      }

      window.location.href = data.url;
    } catch (e) {
      console.error("Errore checkout:", e);
    } finally {
      setBuyingKey(null);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Nav />

      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
        {/* HERO */}
        <section className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-0">
            <div className="relative w-40 h-16 sm:w-56 sm:h-24">
              <Image src="/logo.png" alt="Polinex srl" fill className="object-contain" />
            </div>
          </div>

          <h1 className="section-title mt-1 flex items-center justify-center gap-2">
            <span>Editoria tecnica</span>
            <BookOpen className="h-6 w-6 text-emerald-700 hidden sm:inline" />
          </h1>

          <p className="mt-4 text-slate-600 leading-relaxed">
            Manuali, linee guida e casi studio pensati per chi lavora ogni giorno su{" "}
            <strong>
              acqua, ambiente, energia, agricoltura, sicurezza, edilizia e infrastrutture
            </strong>{" "}
            e sugli aspetti di <strong>finanza e contabilità dei progetti</strong>.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Ogni volume è concepito come uno strumento operativo: schemi, check-list, esempi reali
            e riferimenti normativi essenziali.
          </p>

          {/* Toolbar filtri */}
          <div className="mt-6 grid gap-3 sm:grid-cols-[minmax(0,260px)_minmax(0,1fr)] items-end">
            {/* Area */}
            <div className="text-left">
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Area di competenza
              </label>
              <select
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value as AreaFilter)}
              >
                <option value="Tutte">Tutte le aree</option>
                {AREAS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>

            {/* Ricerca */}
            <div className="text-left">
              <label className="block text-xs font-medium text-slate-600 mb-1">Cerca</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cerca libri (titolo, area, parole chiave)…"
                  className="w-full rounded-xl border border-slate-300 bg-white pl-9 pr-3 py-2 text-sm text-slate-700 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  aria-label="Cerca libri"
                />
              </div>
            </div>
          </div>
        </section>

        {/* GRID LIBRI */}
        <section className="mx-auto max-w-6xl py-10">
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <Filter className="h-4 w-4 text-slate-500" />
            <span>
              {areaFilter === "Tutte" ? "Tutte le aree" : areaFilter} •{" "}
              <strong>{totalBooks}</strong> {totalBooks === 1 ? "titolo" : "titoli"} disponibili
            </span>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.slug}
                book={book}
                onAddToCart={(variant) => handleAddToCart(book, variant)}
                onBuyNow={(variant) => handleBuyNow(book, variant)}
                buyingKey={buyingKey}
              />
            ))}

            {filteredBooks.length === 0 && (
              <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-600">
                Nessun titolo trovato per i filtri selezionati. Prova a modificare area o testo di
                ricerca.
              </div>
            )}
          </div>
        </section>

        {/* CTA finale */}
        <section className="mx-auto max-w-6xl pb-20">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10 text-center">
            <h3 className="section-title text-xl sm:text-2xl">Non trovi il volume che cerchi?</h3>
            <p className="mt-3 text-sm text-slate-600 max-w-2xl mx-auto">
              Possiamo valutare insieme <strong>nuove uscite</strong>, tirature dedicate o{" "}
              <strong>materiali formativi su misura</strong> per la tua azienda o il tuo ente.
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
  onBuyNow,
  buyingKey,
}: {
  book: Book;
  onAddToCart: (variant: BookVariant) => void;
  onBuyNow: (variant: BookVariant) => void;
  buyingKey: string | null;
}) {
  const printAvailable = isPrintAvailable(book);

  const [variant, setVariant] = useState<BookVariant>("pdf");

  // ✅ se il libro cambia e il cartaceo non è disponibile, forza pdf
  useEffect(() => {
    if (!printAvailable) setVariant("pdf");
  }, [printAvailable, book.slug]);

  const displayedPrice = getBookPrice(book, variant);
  const isBuying = buyingKey === `${book.slug}:${variant}`;

  // ✅ STOP PROPAGATION: evita che click su bottoni/switch apra lo slug
  const stop = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm transition hover:shadow-md">
      {/* ✅ Link SOLO su cover + contenuto cliccabile.
          Tutto ciò che è "azioni" sta FUORI dal Link oppure stoppa l'evento */}
      <Link
        href={`/servizi/editoria/${book.slug}`}
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
              <p className="mt-1 text-xs font-medium text-emerald-700">{book.subtitle}</p>
            )}
          </header>

          <p className="mt-2 line-clamp-3 text-xs text-slate-600">{book.description}</p>

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

          {/* ✅ Selettore variante: NON deve navigare */}
          <div className="mt-4" onClick={stop} onMouseDown={stop}>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Formato acquisto
            </p>

            <div className="mt-2 inline-flex rounded-full border border-slate-200 bg-slate-50 p-1">
              <button
                type="button"
                onClick={(e) => {
                  stop(e);
                  setVariant("pdf");
                }}
                className={[
                  "rounded-full px-3 py-1.5 text-[11px] font-semibold transition",
                  variant === "pdf"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900",
                ].join(" ")}
                aria-pressed={variant === "pdf"}
              >
                PDF
              </button>

              <button
                type="button"
                onClick={(e) => {
                  stop(e);
                  setVariant("print");
                }}
                disabled={!printAvailable}
                className={[
                  "rounded-full px-3 py-1.5 text-[11px] font-semibold transition",
                  variant === "print"
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-600 hover:text-slate-900",
                  !printAvailable ? "opacity-50 cursor-not-allowed" : "",
                ].join(" ")}
                aria-pressed={variant === "print"}
                aria-disabled={!printAvailable}
                title={!printAvailable ? "Cartaceo: prossimamente" : "Cartaceo"}
              >
                Cartaceo
              </button>
            </div>

            <p className="mt-2 text-[11px] text-slate-500">
              {variant === "pdf"
                ? "Download immediato dopo il pagamento."
                : "Spedizione a domicilio (indirizzo richiesto al checkout)."}
            </p>
          </div>

          <div className="mt-3 text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1">
              <Check className="h-3 w-3 text-emerald-600" />
              <span>Contenuti aggiornati alle normative più recenti.</span>
            </span>
          </div>
        </div>
      </Link>

      {/* ✅ AZIONI FUORI DAL LINK -> non navigano mai */}
      <div className="flex items-center justify-between gap-3 px-4 pb-4 pt-0">
        <div>
          <p className="text-xs text-slate-500">Prezzo</p>
          <p className="text-lg font-semibold text-slate-900">{formatPrice(displayedPrice)}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToCart(variant);
            }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 shadow-sm hover:border-emerald-500 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            aria-label={`Aggiungi al carrello (${variant === "pdf" ? "PDF" : "Cartaceo"}): ${book.title}`}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Aggiungi</span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onBuyNow(variant);
            }}
            disabled={isBuying}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={`Acquista ora (${variant === "pdf" ? "PDF" : "Cartaceo"}): ${book.title}`}
          >
            <span>{isBuying ? "Apertura..." : "Acquista ora"}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
