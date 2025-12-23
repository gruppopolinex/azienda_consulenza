// app/servizi/gestionali/[slug]/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  Building2,
  Factory,
  Sprout,
  Check,
  CreditCard,
  SlidersHorizontal,
  Info,
  HelpCircle,
  PlayCircle,
} from "lucide-react";

import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";

import {
  GESTIONALI,
  BASE_FAQ,
  type Gestionale,
  type Sector,
  type Billing,
  type FAQItem,
} from "../_data";

/* ==================== UTILITY ==================== */

const formatPrice = (price: number) =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(price);

/* ==================== ICONA PER SETTORE ==================== */

function SectorIcon({ sector }: { sector: Sector }) {
  if (sector === "Azienda di consulenza") {
    return <Building2 className="h-4 w-4" />;
  }
  if (sector === "Azienda produttiva") {
    return <Factory className="h-4 w-4" />;
  }
  return <Sprout className="h-4 w-4" />;
}

/* ==================== PAGINA DETTAGLIO GESTIONALE ==================== */

export default function GestionaleDetailPage() {
  const params = useParams<{ slug: string | string[] }>();
  const router = useRouter();

  const rawSlug = params?.slug;
  const slugParam = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

  const gestionale: Gestionale | undefined = GESTIONALI.find(
    (g) => g.slug === slugParam
  );

  const [billing, setBilling] = useState<Billing>("mensile");

  // Se non trovato
  if (!gestionale) {
    return (
      <div className="min-h-screen bg-white text-slate-900 flex flex-col">
        <Nav />
        <main className="flex-1 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
          <button
            type="button"
            onClick={() => router.push("/servizi/gestionali")}
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Torna alla pagina Gestionali
          </button>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
            <h1 className="section-title">Gestionale non trovato</h1>
            <p className="mt-3 text-sm text-slate-600">
              Il gestionale che stai cercando non è stato trovato o non è più
              disponibile a catalogo.
            </p>
            <Link
              href="/servizi/gestionali"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Vai alla pagina Gestionali
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const price =
    billing === "mensile"
      ? formatPrice(gestionale.monthlyPrice)
      : formatPrice(gestionale.oneOffPrice);

  const billingLabel = billing === "mensile" ? "/mese" : " una tantum";

  const faqs: FAQItem[] = BASE_FAQ.map((f) => ({ ...f }));

  const appUrl = `https://${gestionale.appDomain}${gestionale.appAuthPath ?? ""}`;

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Nav />

      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
        {/* Back link in alto */}
        <button
          type="button"
          onClick={() => router.push("/servizi/gestionali")}
          className="mt-2 inline-flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-3 w-3" />
          <span>Torna alla pagina Gestionali</span>
        </button>

        {/* HERO con logo + titolo */}
        <section className="mt-4 text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-0">
            <div className="relative w-32 h-12 sm:w-44 sm:h-16">
              <Image
                src="/logo.png"
                alt="Polinex srl"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <h1 className="section-title flex items-center justify-center gap-2">
            <span>{gestionale.name}</span>
          </h1>

          <p className="mt-3 text-xs sm:text-sm text-slate-600 flex items-center justify-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-800">
              <SectorIcon sector={gestionale.sector} />
              {gestionale.sector}
            </span>
            {gestionale.tag && (
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 border border-emerald-100">
                {gestionale.tag}
              </span>
            )}
          </p>

          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            {gestionale.short}
          </p>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            {gestionale.description}
          </p>
        </section>

        {/* CONTENUTO PRINCIPALE */}
        <section className="mt-10 sm:mt-12 pb-16">
          <div className="space-y-6">
            {/* TOP: VIDEO + BOX ABBONAMENTO */}
            <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
              {/* Video */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 flex flex-col h-full">
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl bg-slate-900">
                  {gestionale.videoUrl ? (
                    <iframe
                      src={gestionale.videoUrl}
                      title={`Video presentazione gestionale ${gestionale.name}`}
                      className="absolute inset-0 h-full w-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-slate-200">
                      <span>Video di presentazione non ancora disponibile.</span>
                    </div>
                  )}

                  <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
                    <PlayCircle className="h-3.5 w-3.5" />
                    Demo gestionale
                  </div>
                </div>
              </div>

              {/* Box abbonamento / accesso */}
              <aside className="rounded-2xl border border-emerald-100 bg-white p-4 sm:p-5 shadow-sm flex flex-col h-full">
                <p className="text-sm font-medium text-emerald-900 flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-emerald-600" />
                  Modalità di utilizzo
                </p>
                <p className="mt-1 text-xs text-slate-600">
                  Puoi utilizzare il gestionale in{" "}
                  <strong>abbonamento mensile</strong> oppure{" "}
                  <strong>licenza una tantum</strong>. L&apos;attivazione e la
                  gestione degli account avviene su un{" "}
                  <strong>dominio dedicato</strong> al gestionale.
                </p>

                <div className="mt-4 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 p-1 text-xs font-medium w-full">
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

                <div className="mt-4">
                  <p className="text-[11px] text-slate-500">
                    Indicazione di budget a partire da:
                  </p>
                  <p className="text-2xl font-semibold text-slate-900">
                    {price}
                    <span className="ml-1 text-xs font-normal text-slate-500">
                      {billingLabel}
                    </span>
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    {gestionale.usersIncluded} utenti inclusi nel piano base.
                    Ulteriori utenti, moduli o integrazioni vengono quotati a
                    parte in fase di progetto.
                  </p>
                </div>

                <a
                  href={appUrl}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  <CreditCard className="h-4 w-4" />
                  Accedi o registrati al gestionale
                </a>

                <p className="mt-3 text-[11px] text-slate-500">
                  Verrai reindirizzato su{" "}
                  <span className="font-semibold">{gestionale.appDomain}</span>,
                  il dominio dedicato al gestionale, per completare l&apos;
                  accesso o creare un nuovo account.
                </p>
              </aside>
            </div>

            {/* Moduli */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
              <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <Info className="h-4 w-4 text-slate-500" />
                Moduli e funzionalità principali
              </h2>
              <ul className="mt-3 space-y-2 text-xs text-slate-700">
                {gestionale.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 text-emerald-600" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[11px] text-slate-500">
                Ulteriori moduli (integrazioni, flussi approvativi avanzati,
                report personalizzati) possono essere aggiunti in fase di
                progetto, partendo dai vostri processi reali.
              </p>
            </div>

            {/* FAQ */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-slate-500" />
                Domande frequenti
              </h3>
              <div className="mt-3 space-y-3 text-xs text-slate-700">
                {faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2"
                  >
                    <p className="font-semibold text-slate-900">
                      {faq.question}
                    </p>
                    <p className="mt-1 text-slate-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINALE */}
        <section className="mt-12 sm:mt-16 pb-12">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10 text-center">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
              Vuoi un gestionale su misura?
            </h2>

            <p className="mt-3 text-sm text-slate-600 max-w-2xl mx-auto">
              Possiamo usare <strong>{gestionale.name}</strong> come base per un{" "}
              <strong>gestionale personalizzato</strong> integrato con i tuoi
              processi: ambiente, energia, sicurezza, agricoltura, finanza
              agevolata o workflow interni aziendali. Costruiamo insieme un{" "}
              <strong>percorso di progetto realistico</strong> con rilasci per
              step.
            </p>

            <div className="mt-6 flex justify-center">
              <Link
                href={`/contatti?prodotto=${encodeURIComponent(
                  gestionale.name
                )}&tipo=su-misura`}
                className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-white font-medium hover:bg-emerald-700"
              >
                Parla con il team
              </Link>
            </div>

            <p className="mt-3 text-[11px] text-slate-500 max-w-xl mx-auto">
              Ideale per realtà multi-sito, gruppi, enti o aziende con processi
              complessi che vogliono unire dati e documentazione in un unico
              ecosistema.
            </p>
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
