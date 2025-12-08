// app/editoria/page.tsx
"use client";

import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { BookOpen, ShoppingCart, Filter, Tag, Check } from "lucide-react";
// se usi già il contesto carrello, puoi importare qui:
// import { useCart } from "../components/cart/CartContext";

// Import Nav & Footer (cartella /app/components)
import Nav from "../components/Nav";
import Footer from "../components/Footer";

/* ==================== TIPI & DATI ==================== */

export type Area =
  | "Acqua"
  | "Ambiente"
  | "Energia"
  | "Agricoltura"
  | "Sicurezza"
  | "Edilizia e Infrastrutture"
  | "Finanza e Contabilità";

export type Format = "Cartaceo" | "PDF" | "Cartaceo + PDF";

export type Book = {
  slug: string;
  title: string;
  subtitle?: string;
  area: Area;
  description: string;
  price: number;
  format: Format;
  pages: number;
  year: number;
  cover: string;
  badge?: string;
};

export const AREAS: Area[] = [
  "Acqua",
  "Ambiente",
  "Energia",
  "Agricoltura",
  "Sicurezza",
  "Edilizia e Infrastrutture",
  "Finanza e Contabilità",
];

const AREA_FILTERS = ["Tutte", ...AREAS] as const;
type AreaFilter = (typeof AREA_FILTERS)[number];

export const BOOKS: Book[] = [
  // Acqua
  {
    slug: "acqua-gestione-risorsa-idrica",
    title: "Gestione della risorsa idrica",
    subtitle: "Progettazione, monitoraggio e concessioni",
    area: "Acqua",
    description:
      "Linee guida operative per gestori idrici, enti e studi tecnici: dalla progettazione di reti e impianti alle pratiche di concessione e monitoraggio.",
    price: 69,
    format: "Cartaceo + PDF",
    pages: 256,
    year: 2024,
    cover: "/editoria/acqua-gestione-risorsa-idrica.jpg",
    badge: "Novità",
  },
  {
    slug: "acqua-monitoraggi-pozzi",
    title: "Monitoraggi di pozzi e falde",
    subtitle: "Metodologie, campionamenti e reporting",
    area: "Acqua",
    description:
      "Manuale tecnico per impostare piani di monitoraggio di falda, campionamenti, catene di custodia e reportistica a norma.",
    price: 49,
    format: "PDF",
    pages: 168,
    year: 2023,
    cover: "/editoria/acqua-monitoraggi-pozzi.jpg",
  },

  // Ambiente
  {
    slug: "ambiente-via-vas",
    title: "VIA e VAS in pratica",
    subtitle: "Dalla fattibilità allo studio d’impatto",
    area: "Ambiente",
    description:
      "Un percorso operativo per la gestione completa dei procedimenti di Valutazione di Impatto Ambientale e Strategica.",
    price: 79,
    format: "Cartaceo + PDF",
    pages: 320,
    year: 2024,
    cover: "/editoria/ambiente-via-vas.jpg",
    badge: "Best seller",
  },
  {
    slug: "ambiente-bonifiche-rifiuti",
    title: "Bonifiche e rifiuti industriali",
    subtitle: "EER, campionamenti, piani di caratterizzazione",
    area: "Ambiente",
    description:
      "Strumenti pratici per classificare rifiuti, predisporre piani di caratterizzazione e gestire iter autorizzativi complessi.",
    price: 59,
    format: "Cartaceo",
    pages: 210,
    year: 2022,
    cover: "/editoria/ambiente-bonifiche-rifiuti.jpg",
  },

  // Energia
  {
    slug: "energia-audit-diagnosi",
    title: "Audit energetici e diagnosi",
    subtitle: "ISO 50001 e casi studio applicativi",
    area: "Energia",
    description:
      "Metodologie, KPI e casi studio per diagnosi energetiche efficaci in ambito industriale e terziario.",
    price: 65,
    format: "Cartaceo + PDF",
    pages: 240,
    year: 2023,
    cover: "/editoria/energia-audit-diagnosi.jpg",
  },
  {
    slug: "energia-comunita-energetiche",
    title: "Comunità energetiche rinnovabili",
    subtitle: "Modelli, iter autorizzativi e business plan",
    area: "Energia",
    description:
      "Guida completa alle CER: inquadramento normativo, modelli organizzativi e simulazioni economiche.",
    price: 55,
    format: "PDF",
    pages: 180,
    year: 2024,
    cover: "/editoria/energia-comunita-energetiche.jpg",
  },

  // Agricoltura
  {
    slug: "agricoltura-piani-nitrati",
    title: "Piani nitrati in ZVN",
    subtitle: "Gestione reflui e compatibilità ambientale",
    area: "Agricoltura",
    description:
      "Strumento operativo per aziende agricole e consulenti: calcoli, schemi e check-list pronti all’uso.",
    price: 45,
    format: "PDF",
    pages: 140,
    year: 2022,
    cover: "/editoria/agricoltura-piani-nitrati.jpg",
  },
  {
    slug: "agricoltura-gestione-idrica-aziende",
    title: "Gestione idrica in aziende agricole",
    subtitle: "Invasi, irrigazione, riuso acque",
    area: "Agricoltura",
    description:
      "Approccio integrato alla gestione dell’acqua in agricoltura, con esempi pratici e schemi progettuali.",
    price: 52,
    format: "Cartaceo",
    pages: 196,
    year: 2023,
    cover: "/editoria/agricoltura-gestione-idrica-aziende.jpg",
  },

  // Sicurezza
  {
    slug: "sicurezza-cantieri-csp-cse",
    title: "Cantieri complessi: CSP/CSE",
    subtitle: "Coordinamento, PSC e gestione interferenze",
    area: "Sicurezza",
    description:
      "Manuale operativo per coordinatori, imprese e committenti impegnati in cantieri multi-impresa.",
    price: 72,
    format: "Cartaceo + PDF",
    pages: 288,
    year: 2023,
    cover: "/editoria/sicurezza-cantieri-csp-cse.jpg",
  },
  {
    slug: "sicurezza-dvr-ambienti-lavoro",
    title: "DVR e valutazioni specifiche",
    subtitle: "Metodologie, matrici rischio e casi studio",
    area: "Sicurezza",
    description:
      "Strumenti e metodi per redigere DVR solidi e aggiornati, con esempi di valutazioni specifiche.",
    price: 58,
    format: "PDF",
    pages: 190,
    year: 2021,
    cover: "/editoria/sicurezza-dvr-ambienti-lavoro.jpg",
  },

  // Edilizia e Infrastrutture
  {
    slug: "edilizia-riqualificazione-sismica",
    title: "Riqualificazione strutturale e sismica",
    subtitle: "Iter autorizzativi, computi e cantierizzazione",
    area: "Edilizia e Infrastrutture",
    description:
      "Dall’analisi preliminare al cantiere: un riferimento per progettisti e imprese.",
    price: 82,
    format: "Cartaceo + PDF",
    pages: 340,
    year: 2024,
    cover: "/editoria/edilizia-riqualificazione-sismica.jpg",
    badge: "Edizione aggiornata",
  },
  {
    slug: "edilizia-permessi-iter",
    title: "Permessi e iter edilizi",
    subtitle: "Dal titolo abilitativo alla fine lavori",
    area: "Edilizia e Infrastrutture",
    description:
      "Schemi decisionali e casi pratici per districarsi tra permessi di costruire, SCIA e varianti.",
    price: 54,
    format: "Cartaceo",
    pages: 210,
    year: 2022,
    cover: "/editoria/edilizia-permessi-iter.jpg",
  },

  // Finanza e Contabilità
  {
    slug: "finanza-progetti-pubblici",
    title: "Finanza agevolata per progetti tecnici",
    subtitle: "PSR, PNRR, fondi regionali",
    area: "Finanza e Contabilità",
    description:
      "Un metodo per integrare bandi e contributi pubblici in progetti di acqua, ambiente, energia e agricoltura.",
    price: 68,
    format: "Cartaceo + PDF",
    pages: 260,
    year: 2023,
    cover: "/editoria/finanza-progetti-pubblici.jpg",
    badge: "Consigliato",
  },
  {
    slug: "finanza-rendicontazione",
    title: "Rendicontazione e controlli",
    subtitle: "SAL, verifiche e documentazione di spesa",
    area: "Finanza e Contabilità",
    description:
      "Check-list e format per gestire correttamente la fase di rendicontazione di bandi e contributi.",
    price: 47,
    format: "PDF",
    pages: 160,
    year: 2022,
    cover: "/editoria/finanza-rendicontazione.jpg",
  },
];

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

  // se usi il contesto:
  // const { addItem } = useCart();

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
    // Qui in futuro collegherai il carrello globale (es. contesto, Zustand, ecc.)
    // Esempio con contesto:
    // addItem({ slug: book.slug, title: book.title, price: book.price });
    console.log("Aggiungi al carrello:", book.slug);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      {/* NAVBAR */}
      <Nav />

      <main className="flex-1">
        {/* HERO / INTRO */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <h1 className="section-title flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <BookOpen className="h-5 w-5" />
                  </span>
                  <span>Editoria tecnica — Polinex srl</span>
                </h1>
                <p className="section-sub mt-4">
                  Manuali, linee guida e casi studio pensati per chi lavora
                  ogni giorno su{" "}
                  <strong>acqua, ambiente, energia, agricoltura, sicurezza</strong>{" "}
                  ed <strong>edilizia e infrastrutture</strong>, con una
                  sezione dedicata a <strong>finanza e contabilità</strong>{" "}
                  dei progetti.
                </p>
                <p className="mt-3 text-sm text-slate-600">
                  Ogni volume è concepito come uno strumento operativo: schemi,
                  check-list, esempi reali e riferimenti normativi essenziali.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-white px-4 py-4 sm:px-5 sm:py-5 shadow-sm max-w-sm">
                <p className="text-sm font-medium text-emerald-900">
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
          </div>
        </section>

        {/* FILTRI & GRID LIBRI */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
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
                  Le informazioni su <strong>spedizione, tempi di consegna</strong> e{" "}
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
      </main>

      {/* FOOTER */}
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
