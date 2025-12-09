// app/gestionali/[slug]/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Server,
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

import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

/* ==================== TIPI & DATI LOCALI ==================== */

type Sector =
  | "Azienda di consulenza"
  | "Azienda produttiva"
  | "Azienda agricola";

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
  videoUrl?: string; // URL embed YouTube
};

type FAQItem = {
  question: string;
  answer: string;
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
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_STUDIO",
  },
  {
    slug: "gestionale-azienda-produttiva",
    name: "Polinex Industry",
    sector: "Azienda produttiva",
    short:
      "Per aziende manifatturiere e impianti produttivi con esigenze HSE.",
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
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_INDUSTRY",
  },
  {
    slug: "gestionale-azienda-agricola",
    name: "Polinex Agro",
    sector: "Azienda agricola",
    short:
      "Per aziende agricole e zootecniche orientate a bandi e conformità.",
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
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_AGRO",
  },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(price);

/* FAQ generiche */

const BASE_FAQ: FAQItem[] = [
  {
    question: "Quanto tempo serve per andare in produzione?",
    answer:
      "Per la maggior parte dei casi, con un set minimo di dati e utenze, si riesce ad andare in produzione in 2–4 settimane. Per progetti più articolati definiamo un piano di rilascio per step.",
  },
  {
    question:
      "Cosa cambia tra abbonamento mensile e acquisto tutto subito?",
    answer:
      "Con l’abbonamento mensile hai un investimento iniziale ridotto e un canone ricorrente che include aggiornamenti e supporto secondo contratto. Con l’acquisto tutto subito capitalizzi il gestionale come investimento, mantenendo eventualmente un canone di manutenzione minimo.",
  },
  {
    question: "Possiamo integrare il gestionale con altri software?",
    answer:
      "Sì. Possiamo interfacciare il gestionale con ERP, CRM, software di manutenzione o sistemi di monitoraggio già presenti, tramite API o scambio dati strutturato. Le integrazioni vengono valutate caso per caso.",
  },
  {
    question: "Come funziona la formazione agli utenti?",
    answer:
      "Prevediamo una formazione operativa direttamente sui vostri casi reali: sessioni online o in presenza per gli utenti chiave e, se necessario, materiali video/guide per l’onboarding del resto del personale.",
  },
];

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
  const params = useParams<{ slug: string }>();
  const router = useRouter();

  const slugParam = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const gestionale = GESTIONALI.find((g) => g.slug === slugParam);

  const [billing, setBilling] = useState<Billing>("mensile");

  // Se non trovato
  if (!gestionale) {
    return (
      <div className="min-h-screen bg-white text-slate-900 flex flex-col">
        <Nav />
        <main className="flex-1 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
          <button
            type="button"
            onClick={() => router.push("/gestionali")}
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
              href="/gestionali"
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

  const handleAddToCart = () => {
    console.log("Aggiungi gestionale al carrello:", gestionale.slug, billing);
  };

  const faqs: FAQItem[] = BASE_FAQ.map((f) => ({ ...f }));

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Nav />

      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
        {/* Back link in alto, come nelle altre pagine di dettaglio */}
        <button
          type="button"
          onClick={() => router.push("/gestionali")}
          className="mt-2 inline-flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="h-3 w-3" />
          <span>Torna alla pagina Gestionali</span>
        </button>

        {/* HERO con logo + titolo centrato, in linea con le altre pagine */}
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

        {/* CONTENUTO PRINCIPALE: video + moduli + FAQ + box attivazione */}
        <section className="mt-10 sm:mt-12 pb-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            {/* COLONNA SINISTRA: video + funzionalità + FAQ */}
            <div className="space-y-6">
              {/* Video YouTube */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
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
                      <span>
                        Video di presentazione non ancora disponibile.
                      </span>
                    </div>
                  )}

                  <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
                    <PlayCircle className="h-3.5 w-3.5" />
                    Demo gestionale
                  </div>
                </div>
              </div>

              {/* Moduli / Funzionalità */}
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
                  progetto.
                </p>
              </div>

              {/* Cosa risolve / Avvio progetto */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Cosa risolve in pratica
                  </h3>
                  <ul className="mt-3 space-y-2 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 text-emerald-600" />
                      <span>
                        Riduce file sparsi, cartelle disordinate e fogli Excel
                        scollegati.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 text-emerald-600" />
                      <span>
                        Tiene sotto controllo{" "}
                        <strong>scadenze</strong>, autorizzazioni, monitoraggi
                        e adempimenti.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 text-emerald-600" />
                      <span>
                        Allinea direzione, tecnici e consulenti su un{" "}
                        <strong>unico cruscotto</strong>.
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Come avviene l&apos;avvio
                  </h3>
                  <ul className="mt-3 space-y-2 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 text-emerald-600" />
                      <span>
                        Raccolta dei flussi e dei documenti che già usate
                        (Excel, modelli, report).
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 text-emerald-600" />
                      <span>
                        Configurazione <strong>ambiente pilota</strong> con
                        utenti chiave e primi dataset.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 text-emerald-600" />
                      <span>
                        Avvio in produzione e formazione operativa sul vostro
                        caso reale.
                      </span>
                    </li>
                  </ul>
                </div>
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

            {/* COLONNA DESTRA: box attivazione + CTA su misura */}
            <aside className="space-y-4 lg:space-y-6">
              {/* Box attivazione con toggle mensile / una tantum */}
              <div className="rounded-2xl border border-emerald-100 bg-white p-4 sm:p-5 shadow-sm">
                <p className="text-sm font-medium text-emerald-900 flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-emerald-600" />
                  Modalità di attivazione
                </p>
                <p className="mt-1 text-xs text-slate-600">
                  Puoi attivare il gestionale in{" "}
                  <strong>abbonamento mensile</strong> oppure{" "}
                  <strong>acquisto una tantum</strong>. Se hai dubbi sul modello
                  più adatto, possiamo valutarlo insieme.
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
                    Quota a partire da:
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
                    parte.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  <CreditCard className="h-4 w-4" />
                  {billing === "mensile"
                    ? "Attiva in abbonamento"
                    : "Acquista licenza"}
                </button>

                <p className="mt-3 text-[11px] text-slate-500">
                  Nel carrello potrai completare i dettagli: metodo di
                  pagamento, dati di fatturazione, eventuali note per il
                  progetto.
                </p>
              </div>

              {/* CTA gestionale su misura */}
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 text-xs text-emerald-900 space-y-2">
                <p className="font-semibold text-[13px]">
                  Vuoi un gestionale su misura?
                </p>
                <p>
                  Possiamo usare questo gestionale come base per un{" "}
                  <strong>progetto custom</strong>: campi dedicati, report
                  su misura, integrazioni con ERP, CRM o software esistenti.
                </p>
                <p>
                  Scrivici dalla pagina{" "}
                  <Link
                    href="/contatti"
                    className="underline underline-offset-2 font-semibold"
                  >
                    Contatti
                  </Link>{" "}
                  indicando numero di utenti, sedi, processi coinvolti e
                  tempistiche desiderate.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />

      {/* Stili globali per titoli, coerenti con le altre pagine */}
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
