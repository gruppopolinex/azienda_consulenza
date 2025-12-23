// app/servizi/gestionali/page.tsx
"use client";

import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { Building2, Factory, Sprout, Check, ArrowRight } from "lucide-react";

import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

import { GESTIONALI, type Gestionale, type Sector } from "./_data";

const formatPrice = (price: number) =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(price);

/* ==================== PAGINA GESTIONALI ==================== */

export default function GestionaliPage() {
  const products = GESTIONALI;

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
              <GestionaleCard key={g.slug} gestionale={g} />
            ))}
          </div>

          {/* CTA FINALE IN STILE ALTRE PAGINE */}
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
  if (sector === "Azienda di consulenza") return <Building2 className="h-4 w-4" />;
  if (sector === "Azienda produttiva") return <Factory className="h-4 w-4" />;
  return <Sprout className="h-4 w-4" />;
}

function GestionaleCard({ gestionale }: { gestionale: Gestionale }) {
  const monthly = formatPrice(gestionale.monthlyPrice);
  const oneOff = formatPrice(gestionale.oneOffPrice);

  return (
    <Link
      href={`/servizi/gestionali/${gestionale.slug}`}
      aria-label={`Apri ${gestionale.name}`}
      className="block h-full rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm transition hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
    >
      <article className="flex h-full flex-col">
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

          {/* rimosso il cerchio/tag in alto a destra */}
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

        {/* Prezzi (mensile a sinistra, licenza a destra) */}
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
          <div>
            <p className="text-[11px] text-slate-500">Prezzo mensile</p>
            <p className="text-base font-semibold text-slate-900">
              {monthly}
              <span className="ml-1 text-xs font-normal text-slate-500">
                /mese
              </span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-slate-500">Licenza</p>
            <p className="text-sm font-semibold text-slate-900">
              {oneOff}
              <span className="ml-1 text-[11px] font-normal text-slate-500">
                una tantum
              </span>
            </p>
          </div>
        </div>

        <p className="mt-3 text-[11px] text-slate-500">
          {gestionale.usersIncluded} utenti inclusi nel piano base.
        </p>
      </article>
    </Link>
  );
}
