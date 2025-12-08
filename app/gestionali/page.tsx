// app/gestionali/page.tsx
"use client";

import type React from "react";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Server,
  Building2,
  Factory,
  Sprout,
  SlidersHorizontal,
  Check,
  CreditCard,
  ArrowRight,
} from "lucide-react";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

/* ==================== TIPI & DATI ==================== */

type Sector = "Azienda di consulenza" | "Azienda produttiva" | "Azienda agricola";
type Billing = "mensile" | "una_tantum";

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
    short: "Per studi tecnici, consulenti HSE, ingegneri e società di servizi.",
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
  const [billing, setBilling] = useState<Billing>("mensile");

  const products = useMemo(() => GESTIONALI, []);

  const handleAddToCart = (g: Gestionale) => {
    // Qui collegherai il carrello globale (context/Zustand ecc.)
    // Esempio futuro:
    // addItem({ type: "gestionale", slug: g.slug, name: g.name, plan: billing, price: billing === "mensile" ? g.monthlyPrice : g.oneOffPrice });
    console.log("Aggiungi gestionale al carrello:", g.slug, "billing:", billing);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Nav />

      <main className="flex-1">
        {/* HERO / INTRO */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <h1 className="section-title flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <Server className="h-5 w-5" />
                  </span>
                  <span>Gestionali aziendali — Polinex srl</span>
                </h1>
                <p className="section-sub mt-4">
                  Tre gestionali verticali pensati per{" "}
                  <strong>aziende di consulenza</strong>,{" "}
                  <strong>aziende produttive</strong> e{" "}
                  <strong>aziende agricole</strong>, con la possibilità di
                  sviluppare soluzioni su misura integrate con i tuoi processi.
                </p>
                <p className="mt-3 text-sm text-slate-600">
                  Non sono software generici: sono strumenti operativi
                  costruiti a partire da progetti reali su acqua, ambiente,
                  energia, agricoltura e sicurezza. Puoi attivarli in{" "}
                  <strong>abbonamento mensile</strong> oppure{" "}
                  <strong>acquisto una tantum</strong>, in funzione di come
                  preferisci investire nel tuo sistema informativo.
                </p>
              </div>

              {/* Switch piano / billing */}
              <div className="rounded-2xl border border-emerald-100 bg-white px-4 py-4 sm:px-5 sm:py-5 shadow-sm max-w-sm">
                <p className="text-sm font-medium text-emerald-900 flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-emerald-600" />
                  Modalità di attivazione
                </p>
                <p className="mt-1 text-xs text-slate-600">
                  Scegli se vedere i prezzi in abbonamento mensile oppure come
                  licenza una tantum (setup completo).
                </p>

                <div className="mt-4 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 p-1 text-xs font-medium">
                  <button
                    type="button"
                    onClick={() => setBilling("mensile")}
                    className={[
                      "flex-1 rounded-full px-3 py-1.5 transition",
                      billing === "mensile"
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "text-slate-700",
                    ].join(" ")}
                  >
                    Mensile
                  </button>
                  <button
                    type="button"
                    onClick={() => setBilling("una_tantum")}
                    className={[
                      "flex-1 rounded-full px-3 py-1.5 transition",
                      billing === "una_tantum"
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "text-slate-700",
                    ].join(" ")}
                  >
                    Tutto subito
                  </button>
                </div>

                <p className="mt-2 text-[11px] text-slate-500">
                  I prezzi indicativi non includono eventuali integrazioni
                  specifiche (es. interfacce con altri software, personalizzazioni
                  spinte di reportistica).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* LISTA GESTIONALI */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid gap-6 lg:grid-cols-3">
            {products.map((g) => (
              <GestionaleCard
                key={g.slug}
                gestionale={g}
                billing={billing}
                onAddToCart={() => handleAddToCart(g)}
              />
            ))}
          </div>

          {/* CTA GESTIONALE SU MISURA */}
          <section className="mt-12">
            <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 via-emerald-50/60 to-white p-6 sm:p-8 lg:p-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="section-title text-base sm:text-xl">
                  Non ti rivedi in questi tre prodotti?
                </h2>
                <p className="mt-2 text-sm text-slate-700">
                  Possiamo progettare un <strong>gestionale su misura</strong>{" "}
                  partendo dai tuoi processi reali: autorizzazioni, monitoraggi,
                  bandi, manutenzioni, sicurezza, finanza agevolata.
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  Il progetto parte da un&apos;analisi tecnica congiunta:
                  flussi, anagrafiche, documenti, ruoli. Da lì definiamo
                  insieme un perimetro realistico e un{" "}
                  <strong>piano di rilascio per step</strong> (MVP, estensioni,
                  integrazioni).
                </p>
              </div>

              <div className="flex flex-col gap-2 sm:items-end">
                <Link
                  href="/contatti"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  Parla con il team
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="text-[11px] text-slate-500 max-w-xs sm:text-right">
                  Ideale per gruppi, multi-sito, consorzi, enti o aziende con
                  processi già strutturati che vogliono unire dati e
                  documentazione in un unico cruscotto.
                </p>
              </div>
            </div>
          </section>

          {/* NOTA BILLING */}
          <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-2">
                <CreditCard className="h-4 w-4 mt-0.5 text-emerald-600" />
                <p>
                  <strong>Abbonamento mensile</strong>: ideale se vuoi partire
                  in modo rapido, con un investimento iniziale contenuto. Include
                  aggiornamenti e supporto secondo il piano contrattuale.
                  <br />
                  <strong>Acquisto tutto subito</strong>: adatto a chi preferisce
                  capitalizzare il gestionale come investimento, con canone di
                  manutenzione minimo.
                </p>
              </div>
              <p className="text-xs text-slate-500 sm:text-right">
                I prezzi indicati sono di riferimento e verranno confermati in
                fase di offerta sulla base del numero di utenti, eventuali
                moduli aggiuntivi e personalizzazioni richieste.
              </p>
            </div>
          </section>
        </section>
      </main>

      <Footer />

      {/* Stili globali per i titoli, coerenti con Home / Formazione / Editoria */}
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
  billing,
  onAddToCart,
}: {
  gestionale: Gestionale;
  billing: Billing;
  onAddToCart: () => void;
}) {
  const price =
    billing === "mensile"
      ? formatPrice(gestionale.monthlyPrice)
      : formatPrice(gestionale.oneOffPrice);

  const billingLabel =
    billing === "mensile" ? "/mese" : " una tantum";

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

      <p className="mt-3 text-xs text-slate-700">
        {gestionale.description}
      </p>

      <ul className="mt-3 space-y-1.5 text-xs text-slate-700">
        {gestionale.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check className="mt-0.5 h-3.5 w-3.5 text-emerald-600" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          <p className="text-[11px] text-slate-500">
            {billing === "mensile" ? "Abbonamento mensile da" : "Licenza una tantum da"}
          </p>
          <p className="text-xl font-semibold text-slate-900">
            {price}
            <span className="ml-1 text-xs font-normal text-slate-500">
              {billingLabel}
            </span>
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
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
            <span>
              {billing === "mensile" ? "Attiva abbonamento" : "Acquista licenza"}
            </span>
          </button>
        </div>
      </div>
    </article>
  );
}
