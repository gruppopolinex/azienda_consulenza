// app/gestionali/page.tsx
"use client";

import type React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  Factory,
  Sprout,
  Check,
  CreditCard,
  ArrowRight,
} from "lucide-react";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

/* ==================== TIPI & DATI ==================== */

type Sector =
  | "Azienda di consulenza"
  | "Azienda produttiva"
  | "Azienda agricola";

type Gestionale = {
  slug: string;
  name: string;
  sector: Sector;
  short: string;
  description: string;
  monthlyPrice: number;
  oneOffPrice: number;
  usersIncluded: number;
  tag?: string;
  features: string[];
};

const GESTIONALI: Gestionale[] = [
  {
    slug: "gestionale-azienda-consulenza",
    name: "Polinex Studio",
    sector: "Azienda di consulenza",
    short:
      "Per studi tecnici, consulenti HSE, ingegneri e società di servizi.",
    description:
      "Gestione commesse, pratiche autorizzative, scadenze e documentazione tecnica in un unico ambiente, pensato per studi di ingegneria e consulenza ambientale.",
    monthlyPrice: 79,
    oneOffPrice: 2200,
    usersIncluded: 5,
    tag: "Per studi tecnici",
    features: [
      "Gestione commesse e stati di avanzamento",
      "Anagrafiche clienti, siti e impianti",
      "Scadenziario autorizzazioni e adempimenti",
      "Gestione documentale con versioning",
      "Reportistica export Excel/PDF",
    ],
  },
  {
    slug: "gestionale-azienda-produttiva",
    name: "Polinex Industry",
    sector: "Azienda produttiva",
    short: "Per aziende manifatturiere e impianti produttivi con esigenze HSE.",
    description:
      "Un gestionale pensato per imprese produttive che devono integrare ambiente, rifiuti, energia e sicurezza in un unico cruscotto operativo.",
    monthlyPrice: 129,
    oneOffPrice: 3400,
    usersIncluded: 10,
    tag: "Plant & HSE",
    features: [
      "Registro rifiuti, emissioni e scarichi",
      "Monitoraggi ambientali e KPI energetici",
      "Gestione DPI, formazione e visite mediche",
      "Gestione manutenzioni e check-list impianti",
      "Dashboard per direzione e HSE manager",
    ],
  },
  {
    slug: "gestionale-azienda-agricola",
    name: "Polinex Agro",
    sector: "Azienda agricola",
    short: "Per aziende agricole e zootecniche orientate a bandi e conformità.",
    description:
      "Gestione piani nitrati, reflui, appezzamenti, pratiche PSR/PNRR e scadenze documentali in un ambiente unico, condivisibile con consulenti e tecnici.",
    monthlyPrice: 59,
    oneOffPrice: 1800,
    usersIncluded: 3,
    tag: "Zootecnia & PSR",
    features: [
      "Gestione appezzamenti, colture e capi",
      "Piani nitrati e distribuzione reflui",
      "Archivio documenti PSR/PNRR",
      "Scadenze controlli e adempimenti",
      "Accesso condiviso con consulenti",
    ],
  },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(price);

/* ==================== PAGINA GESTIONALI ==================== */

export default function GestionaliPage() {
  const products = GESTIONALI;

  const handleAddToCart = (g: Gestionale) => {
    // Qui collegherai il carrello globale (context/Zustand ecc.)
    console.log("Aggiungi gestionale al carrello:", g.slug);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Nav />

      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
        {/* HERO IN STILE ALTRE PAGINE (logo + titolo + sottotitolo centrati) */}
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

          <h1 className="section-title">Gestionali aziendali dedicati</h1>
          <p className="section-sub mt-4">
            Tre soluzioni verticali pensate per{" "}
            <strong>aziende di consulenza</strong>,{" "}
            <strong>aziende produttive</strong> e{" "}
            <strong>aziende agricole</strong>, con la possibilità di sviluppare
            anche <strong>gestionali su misura</strong> integrati con i tuoi
            processi.
          </p>
          <p className="mt-3 text-sm text-slate-600">
            Non sono software generici: nascono da progetti reali su acqua,
            ambiente, energia, agricoltura e sicurezza. Ogni gestionale può
            essere attivato in <strong>abbonamento mensile</strong> o come{" "}
            <strong>licenza una tantum</strong>, in base a come vuoi
            strutturare l&apos;investimento.
          </p>
        </section>

        {/* GRID GESTIONALI */}
        <section className="mt-10 sm:mt-12 pb-16 sm:pb-20">
          <div className="grid gap-6 lg:grid-cols-3">
            {products.map((g) => (
              <GestionaleCard
                key={g.slug}
                gestionale={g}
                onAddToCart={() => handleAddToCart(g)}
              />
            ))}
          </div>

          {/* CTA FINALE IN STILE ALTRE PAGINE (portfolio / trasparenza) */}
          <section className="mt-12">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10 text-center">
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
                Non ti rivedi in questi prodotti?
              </h2>
              <p className="mt-3 text-sm text-slate-600 max-w-2xl mx-auto">
                Possiamo progettare un <strong>gestionale su misura</strong>{" "}
                partendo dai tuoi processi reali: autorizzazioni, monitoraggi,
                bandi, manutenzioni, sicurezza, finanza agevolata. Definiamo
                insieme un perimetro realistico e un{" "}
                <strong>piano di rilascio per step</strong>.
              </p>

              <div className="mt-6 flex justify-center">
                <Link
                  href="/contatti"
                  className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-white font-medium hover:bg-emerald-700"
                >
                  Parla con il team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              <p className="mt-3 text-[11px] text-slate-500 max-w-xl mx-auto">
                Ideale per gruppi, multi-sito, consorzi, enti o aziende con
                processi già strutturati che vogliono unire dati e
                documentazione in un unico cruscotto.
              </p>
            </div>
          </section>
        </section>
      </main>

      <Footer />

      {/* Stili globali per i titoli, coerenti con le altre pagine */}
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

function SectorIcon({ sector }: { sector: Sector }) {
  if (sector === "Azienda di consulenza") {
    return <Building2 className="h-4 w-4" />;
  }
  if (sector === "Azienda produttiva") {
    return <Factory className="h-4 w-4" />;
  }
  return <Sprout className="h-4 w-4" />;
}

function GestionaleCard({
  gestionale,
  onAddToCart,
}: {
  gestionale: Gestionale;
  onAddToCart: () => void;
}) {
  const monthly = formatPrice(gestionale.monthlyPrice);
  const oneOff = formatPrice(gestionale.oneOffPrice);

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm transition hover:shadow-md">
      <header className="flex items-start justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-800">
            <SectorIcon sector={gestionale.sector} />
            <span>{gestionale.sector}</span>
          </div>
          <h2 className="mt-2 text-sm font-semibold text-slate-900">
            {gestionale.name}
          </h2>
          <p className="mt-1 text-xs text-slate-600">{gestionale.short}</p>
        </div>
        {gestionale.tag && (
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 border border-emerald-100">
            {gestionale.tag}
          </span>
        )}
      </header>

      <p className="mt-3 text-xs text-slate-700">{gestionale.description}</p>

      <ul className="mt-3 space-y-1.5 text-xs text-slate-700">
        {gestionale.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check className="mt-0.5 h-3.5 w-3.5 text-emerald-600" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-end justify-between gap-3">
        <div className="space-y-1">
          <div>
            <p className="text-[11px] text-slate-500">
              Abbonamento mensile da
            </p>
            <p className="text-lg font-semibold text-slate-900">
              {monthly}
              <span className="ml-1 text-xs font-normal text-slate-500">
                /mese
              </span>
            </p>
          </div>
          <div>
            <p className="mt-2 text-[11px] text-slate-500">
              Oppure licenza una tantum da
            </p>
            <p className="text-sm font-semibold text-slate-900">
              {oneOff}
              <span className="ml-1 text-[11px] font-normal text-slate-500">
                una tantum
              </span>
            </p>
          </div>
          <p className="mt-2 text-[11px] text-slate-500">
            {gestionale.usersIncluded} utenti inclusi nel piano base.
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
          {/* Link dettaglio prodotto (slug lo implementerai dopo) */}
          <Link
            href={`/gestionali/${gestionale.slug}`}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-700 hover:text-emerald-700"
          >
            Dettagli prodotto
            <ArrowRight className="h-3 w-3" />
          </Link>

          <button
            type="button"
            onClick={onAddToCart}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            aria-label={`Aggiungi al carrello: ${gestionale.name}`}
          >
            <CreditCard className="h-4 w-4" />
            <span>Richiedi attivazione</span>
          </button>
        </div>
      </div>
    </article>
  );
}
