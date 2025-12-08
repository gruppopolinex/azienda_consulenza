// app/formazione/page.tsx
"use client";

import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import {
  GraduationCap,
  Filter,
  Check,
  Tag,
  Clock,
  Users,
  PlayCircle,
  ShoppingCart,
} from "lucide-react";

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

export type Level = "Base" | "Intermedio" | "Avanzato";
export type Mode = "Online live" | "On demand" | "In presenza" | "Blended";

export type Course = {
  slug: string;
  title: string;
  subtitle?: string;
  area: Area;
  description: string;
  price: number;
  hours: number;
  level: Level;
  mode: Mode;
  nextEdition?: string;
  badge?: string;
  cover: string;
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

export const COURSES: Course[] = [
  // Acqua
  {
    slug: "acqua-progettazione-reti-idriche",
    title: "Progettazione reti idriche e acquedotti",
    subtitle: "Dal dimensionamento alle perdite di carico",
    area: "Acqua",
    description:
      "Un percorso operativo per studenti di ingegneria e tecnici che vogliono progettare reti idriche, acquedotti e sistemi di distribuzione con criteri professionali.",
    price: 290,
    hours: 16,
    level: "Intermedio",
    mode: "Online live",
    nextEdition: "Aprile 2025",
    badge: "Live class",
    cover: "/formazione/acqua-progettazione-reti-idriche.jpg",
  },
  {
    slug: "acqua-monitoraggi-campi-pozzi",
    title: "Monitoraggi di campi pozzi e falde",
    subtitle: "Strumentazione, piezometri e data analysis",
    area: "Acqua",
    description:
      "Dalla progettazione del piano di monitoraggio alla lettura critica dei dati piezometrici e chimici, con casi studio reali.",
    price: 190,
    hours: 10,
    level: "Base",
    mode: "On demand",
    nextEdition: "Sempre disponibile",
    cover: "/formazione/acqua-monitoraggi-campi-pozzi.jpg",
  },

  // Ambiente
  {
    slug: "ambiente-via-vas-laboratorio",
    title: "Laboratorio pratico VIA/VAS",
    subtitle: "Dallo screening allo studio di impatto",
    area: "Ambiente",
    description:
      "Simulazione completa di un procedimento VIA/VAS: lettura norme, impostazione dello studio, scrittura delle sezioni chiave e gestione delle osservazioni.",
    price: 360,
    hours: 20,
    level: "Avanzato",
    mode: "Blended",
    nextEdition: "Maggio 2025",
    badge: "Intensivo",
    cover: "/formazione/ambiente-via-vas-laboratorio.jpg",
  },
  {
    slug: "ambiente-bonifiche-rifiuti",
    title: "Bonifiche siti contaminati e rifiuti",
    subtitle: "EER, caratterizzazione e progetti di bonifica",
    area: "Ambiente",
    description:
      "Per chi lavora o vuole lavorare su siti contaminati: iter normativi, piani di caratterizzazione, classificazione rifiuti e gestione terre e rocce da scavo.",
    price: 320,
    hours: 18,
    level: "Intermedio",
    mode: "Online live",
    cover: "/formazione/ambiente-bonifiche-rifiuti.jpg",
  },

  // Energia
  {
    slug: "energia-audit-iso50001",
    title: "Audit energetici e diagnosi ISO 50001",
    subtitle: "Strumenti, KPI e casi studio",
    area: "Energia",
    description:
      "Corso pratico per impostare e condurre diagnosi energetiche in ambito industriale e terziario, con esempi di report e fogli di calcolo.",
    price: 330,
    hours: 16,
    level: "Intermedio",
    mode: "Online live",
    nextEdition: "Giugno 2025",
    badge: "Per tecnici energy",
    cover: "/formazione/energia-audit-iso50001.jpg",
  },
  {
    slug: "energia-comunita-energetiche",
    title: "Comunità energetiche rinnovabili (CER)",
    subtitle: "Modelli tecnici ed economici",
    area: "Energia",
    description:
      "Panoramica completa su configurazioni, iter autorizzativi e simulazioni economiche per la progettazione di CER sostenibili.",
    price: 210,
    hours: 12,
    level: "Base",
    mode: "On demand",
    cover: "/formazione/energia-comunita-energetiche.jpg",
  },

  // Agricoltura
  {
    slug: "agricoltura-piani-nitrati-pratico",
    title: "Piani nitrati in ZVN: corso pratico",
    subtitle: "Calcoli, limiti, documentazione",
    area: "Agricoltura",
    description:
      "Per periti agrari, agronomi e tecnici che gestiscono reflui e piani nitrati: casi di calcolo, errori tipici e modulistica.",
    price: 180,
    hours: 8,
    level: "Base",
    mode: "Online live",
    cover: "/formazione/agricoltura-piani-nitrati-pratico.jpg",
  },
  {
    slug: "agricoltura-gestione-idrica-aziende",
    title: "Gestione idrica in aziende agricole",
    subtitle: "Invasi, irrigazione, riuso acque",
    area: "Agricoltura",
    description:
      "Approccio integrato alla risorsa idrica in agricoltura, con focus su invasi, reti irrigue e riutilizzo di acque depurate.",
    price: 220,
    hours: 12,
    level: "Intermedio",
    mode: "Blended",
    cover: "/formazione/agricoltura-gestione-idrica-aziende.jpg",
  },

  // Sicurezza
  {
    slug: "sicurezza-cantieri-csp-cse",
    title: "CSP/CSE in cantieri complessi",
    subtitle: "Dal PSC alla gestione interferenze",
    area: "Sicurezza",
    description:
      "Per coordinatori della sicurezza e tecnici HSE: lettura critica del PSC, gestione delle varianti in corso d’opera e casi reali.",
    price: 350,
    hours: 20,
    level: "Avanzato",
    mode: "In presenza",
    nextEdition: "Padova · Luglio 2025",
    badge: "In aula",
    cover: "/formazione/sicurezza-cantieri-csp-cse.jpg",
  },
  {
    slug: "sicurezza-dvr-e-valutazioni",
    title: "DVR e valutazioni specifiche",
    subtitle: "Rumore, vibrazioni, agenti chimici",
    area: "Sicurezza",
    description:
      "Come strutturare DVR solidi e aggiornati, integrare valutazioni specifiche e comunicare il rischio a RSPP e lavoratori.",
    price: 240,
    hours: 14,
    level: "Intermedio",
    mode: "On demand",
    cover: "/formazione/sicurezza-dvr-e-valutazioni.jpg",
  },

  // Edilizia e Infrastrutture
  {
    slug: "edilizia-riqualificazione-sismica-corso",
    title: "Riqualificazione strutturale e sismica",
    subtitle: "Dalla verifica al cantiere",
    area: "Edilizia e Infrastrutture",
    description:
      "Per ingegneri e architetti che si occupano di riqualificazioni: criteri di scelta degli interventi, iter autorizzativi e cantierizzazione.",
    price: 390,
    hours: 22,
    level: "Avanzato",
    mode: "Blended",
    badge: "Per progettisti",
    cover: "/formazione/edilizia-riqualificazione-sismica-corso.jpg",
  },
  {
    slug: "edilizia-permessi-iter-pratico",
    title: "Permessi e iter edilizi",
    subtitle: "SCIA, CILA, PdC e varianti",
    area: "Edilizia e Infrastrutture",
    description:
      "Schemi decisionali, casi tipo e modulistica per districarsi tra titoli abilitativi e comunicazioni.",
    price: 210,
    hours: 10,
    level: "Base",
    mode: "Online live",
    cover: "/formazione/edilizia-permessi-iter-pratico.jpg",
  },

  // Finanza e Contabilità
  {
    slug: "finanza-agevolata-progetti-tecnici",
    title: "Finanza agevolata per progetti tecnici",
    subtitle: "PSR, PNRR, bandi regionali",
    area: "Finanza e Contabilità",
    description:
      "Per consulenti e tecnici che vogliono integrare bandi e contributi nelle proprie progettazioni.",
    price: 260,
    hours: 14,
    level: "Intermedio",
    mode: "Online live",
    badge: "Per tecnici & PM",
    cover: "/formazione/finanza-agevolata-progetti-tecnici.jpg",
  },
  {
    slug: "finanza-rendicontazione-bandi",
    title: "Rendicontazione di bandi e contributi",
    subtitle: "SAL, verifiche, documenti di spesa",
    area: "Finanza e Contabilità",
    description:
      "Un corso operativo su SAL, verifiche documentali e preparazione della documentazione per i controlli.",
    price: 190,
    hours: 9,
    level: "Base",
    mode: "On demand",
    cover: "/formazione/finanza-rendicontazione-bandi.jpg",
  },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(price);

/* ==================== PAGINA FORMAZIONE ==================== */

export default function FormazionePage() {
  const [areaFilter, setAreaFilter] = useState<AreaFilter>("Tutte");
  const [search, setSearch] = useState("");

  // se usi un contesto carrello:
  // const { addItem } = useCart();

  const filteredCourses = useMemo(() => {
    return COURSES.filter((course) => {
      const byArea =
        areaFilter === "Tutte" ? true : course.area === areaFilter;
      const query = search.trim().toLowerCase();
      const bySearch = !query
        ? true
        : [
            course.title,
            course.subtitle ?? "",
            course.area,
            course.description,
            course.mode,
            course.level,
          ]
            .join(" ")
            .toLowerCase()
            .includes(query);

      return byArea && bySearch;
    });
  }, [areaFilter, search]);

  const totalCourses = filteredCourses.length;

  const handleAddToCart = (course: Course) => {
    // Qui collegherai il carrello globale (context/Zustand ecc.)
    // Esempio:
    // addItem({ slug: course.slug, title: course.title, price: course.price, type: "course" });
    console.log("Aggiungi corso al carrello:", course.slug);
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
                    <GraduationCap className="h-5 w-5" />
                  </span>
                  <span>Formazione tecnica — Polinex srl</span>
                </h1>
                <p className="section-sub mt-4">
                  Percorsi formativi per{" "}
                  <strong>studenti di ingegneria e materie STEM</strong>,{" "}
                  <strong>consulenti, ingegneri, architetti e tecnici</strong>{" "}
                  che lavorano su acqua, ambiente, energia, agricoltura,
                  sicurezza ed edilizia, con un focus sulla{" "}
                  <strong>finanza dei progetti</strong>.
                </p>
                <p className="mt-3 text-sm text-slate-600">
                  Corsi pratici, casi studio reali e docenti che lavorano
                  quotidianamente su progetti, autorizzazioni e cantieri. Uno
                  stile didattico operativo, pensato per portare rapidamente le
                  competenze sul campo.
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-white px-4 py-4 sm:px-5 sm:py-5 shadow-sm max-w-sm">
                <p className="text-sm font-medium text-emerald-900">
                  Filtra per area di competenza
                </p>
                <p className="mt-1 text-xs text-slate-600">
                  Puoi combinare il filtro per area con la ricerca per titolo o
                  parole chiave (es. &quot;CER&quot;, &quot;VIA&quot;,
                  &quot;PSC&quot;...).
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

        {/* FILTRI & GRID CORSI */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          {/* Barra filtri "tipo piattaforma corsi" */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <Filter className="h-4 w-4 text-slate-500" />
              <span>
                {areaFilter === "Tutte" ? "Tutte le aree" : areaFilter} •{" "}
                <strong>{totalCourses}</strong>{" "}
                {totalCourses === 1 ? "corso disponibile" : "corsi disponibili"}
              </span>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <div className="relative w-full sm:w-72">
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

          {/* Grid corsi */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.slug}
                course={course}
                onAddToCart={() => handleAddToCart(course)}
              />
            ))}

            {filteredCourses.length === 0 && (
              <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-600">
                Nessun corso trovato per i filtri selezionati. Prova a modificare
                area o testo di ricerca.
              </div>
            )}
          </div>

          {/* Nota logistica / modalità di erogazione */}
          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-2">
                <Check className="h-4 w-4 mt-0.5 text-emerald-600" />
                <p>
                  Dopo l&apos;aggiunta al carrello potrai completare
                  l&apos;iscrizione e ricevere tutte le informazioni su accessi
                  alla piattaforma, calendario e materiali didattici.
                </p>
              </div>
              <p className="text-xs text-slate-500 sm:text-right">
                Per percorsi aziendali su misura o per attivare una classe
                dedicata puoi contattarci direttamente dalla pagina{" "}
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

      {/* Stili globali per i titoli, coerenti con Home / Lavora con noi / Editoria */}
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

function CourseCard({
  course,
  onAddToCart,
}: {
  course: Course;
  onAddToCart: () => void;
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm transition hover:shadow-md">
      {/* Parte cliccabile: apre /formazione/[slug] */}
      <Link
        href={`/formazione/${course.slug}`}
        className="group flex-1 flex flex-col focus:outline-none"
        aria-label={`Dettaglio corso: ${course.title}`}
      >
        <div className="relative aspect-[16/9] bg-slate-100">
          <Image
            src={course.cover}
            alt={course.title}
            fill
            sizes="(min-width: 1024px) 320px, 50vw"
            className="object-cover group-hover:scale-[1.02] transition-transform"
          />
          <div className="absolute left-3 top-3 flex flex-col gap-1">
            <span className="inline-flex rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
              {course.area}
            </span>
            {course.badge && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/90 px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm">
                <Tag className="h-3 w-3" />
                {course.badge}
              </span>
            )}
          </div>
          <div className="absolute right-3 bottom-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] text-white backdrop-blur">
            <PlayCircle className="h-3.5 w-3.5" />
            <span>{course.mode}</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <header>
            <h3 className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">
              {course.title}
            </h3>
            {course.subtitle && (
              <p className="mt-1 text-xs font-medium text-emerald-700">
                {course.subtitle}
              </p>
            )}
          </header>

          <p className="mt-2 line-clamp-3 text-xs text-slate-600">
            {course.description}
          </p>

          <dl className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-slate-500" />
              <div>
                <dt className="font-medium text-slate-600">Durata</dt>
                <dd>{course.hours} ore</dd>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-slate-500" />
              <div>
                <dt className="font-medium text-slate-600">Livello</dt>
                <dd>{course.level}</dd>
              </div>
            </div>
            <div>
              <dt className="font-medium text-slate-600">Modalità</dt>
              <dd>{course.mode}</dd>
            </div>
            {course.nextEdition && (
              <div>
                <dt className="font-medium text-slate-600">Prossima edizione</dt>
                <dd>{course.nextEdition}</dd>
              </div>
            )}
          </dl>

          <div className="mt-3 text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1">
              <Check className="h-3 w-3 text-emerald-600" />
              <span>
                Pensato per studenti, professionisti e tecnici che vogliono casi
                reali, non solo teoria.
              </span>
            </span>
          </div>
        </div>
      </Link>

      {/* Riga inferiore: prezzo + bottone carrello (fuori dal Link) */}
      <div className="flex items-center justify-between gap-3 px-4 pb-4 pt-0">
        <div>
          <p className="text-xs text-slate-500">Quota di iscrizione</p>
          <p className="text-lg font-semibold text-slate-900">
            {formatPrice(course.price)}
          </p>
        </div>

        <button
          type="button"
          onClick={onAddToCart}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          aria-label={`Aggiungi al carrello: ${course.title}`}
        >
          <ShoppingCart className="h-4 w-4" />
          <span>Iscriviti</span>
        </button>
      </div>
    </article>
  );
}
