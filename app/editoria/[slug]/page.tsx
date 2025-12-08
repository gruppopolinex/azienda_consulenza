// app/editoria/[slug]/page.tsx
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
} from "lucide-react";

import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

/* ==================== TIPI & DATI (stessi della lista) ==================== */

type Area =
  | "Acqua"
  | "Ambiente"
  | "Energia"
  | "Agricoltura"
  | "Sicurezza"
  | "Edilizia e Infrastrutture"
  | "Finanza e Contabilità";

type Format = "Cartaceo" | "PDF" | "Cartaceo + PDF";

type Book = {
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

const BOOKS: Book[] = [
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
  const book = BOOKS.find((b) => b.slug === slugParam);

  // Gestione libro non trovato (fallback soft, non 404 "hard")
  if (!book) {
    return (
      <div className="min-h-screen bg-white text-slate-900 flex flex-col">
        <Nav />
        <main className="flex-1 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
          <button
            type="button"
            onClick={() => router.push("/editoria")}
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
              href="/editoria"
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

  const related = BOOKS.filter(
    (b) => b.area === book.area && b.slug !== book.slug
  ).slice(0, 3);

  const handleAddToCart = () => {
    // Qui poi collegherai il vero carrello (context, ecc.)
    console.log("Aggiungi al carrello:", book.slug);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Nav />

      <main className="flex-1">
        {/* BREADCRUMB + HERO COMPATTO */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => router.push("/editoria")}
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
                    <span className="font-medium text-slate-800">
                      {book.area}
                    </span>
                    {" · "}
                    Formato:{" "}
                    <span className="font-medium text-slate-800">
                      {book.format}
                    </span>
                    {" · "}
                    {book.year}
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
                    <span className="font-mono text-slate-700">
                      {book.slug}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENUTO PRINCIPALE: COVER + INFO + CTA */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            {/* Colonna sinistra: cover + descrizione + contenuti */}
            <div className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
                {/* Cover */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 flex items-center justify-center">
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

                {/* Descrizione principale */}
                <div className="space-y-4">
                  <div>
                    <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-slate-500" />
                      Panoramica del volume
                    </h2>
                    <p className="mt-2 text-sm text-slate-700">
                      {book.description}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 text-xs text-emerald-900 space-y-2">
                    <p className="font-semibold text-[13px]">
                      A chi è rivolto
                    </p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>
                        Tecnici e consulenti che operano in ambito{" "}
                        <strong>{book.area.toLowerCase()}</strong>.
                      </li>
                      <li>
                        Uffici tecnici di enti pubblici e realtà industriali.
                      </li>
                      <li>
                        Professionisti che seguono iter autorizzativi e
                        rendicontazioni.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Dettagli tecnici */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
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
                    <dt className="font-medium text-slate-600">
                      Anno di pubblicazione
                    </dt>
                    <dd>{book.year}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-slate-600">
                      Aggiornamento normativo
                    </dt>
                    <dd>Allineato alle principali norme in vigore alla data.</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-slate-600">
                      Utilizzo consigliato
                    </dt>
                    <dd>
                      Come manuale operativo di riferimento per casi concreti e
                      iter autorizzativi.
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Cosa trovi all'interno (testo generico ma utile) */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                <h3 className="text-sm font-semibold text-slate-900">
                  Cosa trovi all’interno
                </h3>
                <ul className="mt-3 grid gap-2 text-xs text-slate-700 sm:grid-cols-2">
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 text-emerald-600" />
                    <span>Schema logico dei procedimenti e delle fasi di lavoro.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 text-emerald-600" />
                    <span>Check-list e tabelle di sintesi pronte all’uso.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 text-emerald-600" />
                    <span>Casi studio e esempi di documentazione.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 text-emerald-600" />
                    <span>
                      Riferimenti normativi essenziali, senza appesantire la
                      lettura.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Colonna destra: box acquisto */}
            <aside className="space-y-4 md:space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
                <p className="text-xs text-slate-500">Prezzo</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">
                  {formatPrice(book.price)}
                </p>

                <p className="mt-2 text-xs text-slate-600">
                  Il prezzo si intende{" "}
                  <strong>IVA esclusa</strong>. Dettagli su spese di spedizione
                  e fatturazione sono mostrati nel carrello, prima del
                  pagamento.
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
                  Per ordini multipli o personalizzazioni aziendali, puoi
                  contattarci direttamente dalla pagina{" "}
                  <Link
                    href="/contatti"
                    className="underline underline-offset-2 hover:text-slate-800"
                  >
                    Contatti
                  </Link>
                  .
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-xs text-emerald-900 space-y-2">
                <p className="font-semibold text-[13px]">
                  Formato {book.format}
                </p>
                {book.format === "PDF" && (
                  <p>
                    Riceverai un link per il download in formato PDF, utilizzabile
                    su PC, tablet e dispositivi mobili.
                  </p>
                )}
                {book.format === "Cartaceo" && (
                  <p>
                    Volume rilegato in formato pratico da studio. Spedizione
                    tramite corriere. Dettagli nel carrello.
                  </p>
                )}
                {book.format === "Cartaceo + PDF" && (
                  <p>
                    Comprende sia il volume cartaceo sia la versione PDF per una
                    consultazione immediata.
                  </p>
                )}
              </div>
            </aside>
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
                    href={`/editoria/${r.slug}`}
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
