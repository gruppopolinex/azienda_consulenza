"use client";

import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  ChevronLeft,
  ChevronRight as ArrowRight,
  MapPin,
  Building2,
  ArrowUpRight,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";

// Import Nav & Footer (cartella /app/components)
import Nav from "./components/Nav";
import Footer from "./components/Footer";

/* ==================== HOME (Polinex srl) ==================== */
export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* NAVBAR */}
      <Nav />

      {/* ============ HERO ============ */}
      <section className="relative">
        <div className="absolute inset-0">
          <video
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            aria-label="Polinex srl - consulenza tecnica e ambientale"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
            <source src="/hero-video.MP4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/25 to-transparent pointer-events-none" />
        </div>

        <div className="relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="py-2 sm:py-5">
              <div className="max-w-4xl mx-auto text-white text-center">
                <div className="flex justify-center mb-0">
                  <div className="relative w-40 h-16 sm:w-160 sm:h-70">
                    <Image
                      src="/logo_bianco.png"
                      alt="Polinex srl"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>

                <h1 className="hero-title">
                  Ingegneria e Consulenza Civile e Ambientale
                </h1>
                <p className="hero-subtitle mt-4">
                  Dalla diagnosi alla realizzazione: progetti, autorizzazioni e
                  gestione operativa con un unico referente.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                  <Link href="/contatti" className="btn-hero">
                    Richiedi una consulenza{" "}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link href="#servizi" className="btn-hero-secondary">
                    Esplora i servizi
                  </Link>
                </div>

                <div className="mt-6 text-xs text-white/80">
                  Polinex srl — P.IVA / CF (inserisci) • Sede legale (inserisci)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ TRUST STRIP (KPI) ============ */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <KPI value="200+" label="Progetti gestiti" />
            <KPI value=">70%" label="Autorizzazioni al 1° invio" />
            <KPI value="6 mesi" label="Iter medio sbloccato" />
          </div>
        </div>
      </section>

      {/* ============ SERVIZI (6 aree + sezione Bandi) ============ */}
      <section id="servizi" className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8">
            <div className="h-full rounded-[24px] bg-[radial-gradient(80%_60%_at_50%_-10%,rgba(16,185,129,0.10),rgba(255,255,255,0))]" />
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-8 pb-10">
          <SectionHeader
            title="Sei Aree di Competenza, un Unico Referente Tecnico"
            subtitle="Analisi, progettazione, autorizzazioni, sicurezza, finanziamenti e supporto operativo."
          />

          <ServicesMosaicCompact />
        </div>
      </section>

      {/* ============ COWORKING / FORMAZIONE / EDITORIA / GESTIONALI ============ */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          <SectionHeader
            title="Coworking, Formazione, Editoria e Gestionali dedicati"
            subtitle="Spazi di lavoro, corsi pratici, manuali tecnici e software verticali per studenti, tecnici e aziende."
          />
          <KnowledgeProductsGrid />
        </div>
      </section>

      {/* ============ CASI STUDIO ============ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <SectionHeader
          title="Progetti e Casi Studio"
          subtitle="Una selezione rappresentativa dei nostri interventi. Filtra per area di competenza."
        />
        <StudiesWithFilter />
      </section>

      {/* ============ PARTNER (loghi cliccabili) ============ */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          <SectionHeader
            title="Partner e Collaborazioni"
            subtitle="Collaboriamo con realtà tecniche certificate e laboratori accreditati."
          />

          <PartnersGrid
            partners={[
              {
                name: "ARIBO srl",
                href: "https://www.aribo.it/",
                logo: "/partners/aribo.jpg",
                alt: "Logo ARIBO srl",
              },
              {
                name: "Geolavori srl",
                href: "https://www.geolavori.it/",
                logo: "/partners/geolavori.jpg",
                alt: "Logo Geolavori srl",
              },
              {
                name: "Agrolab srl",
                href: "https://www.agrolab.com/",
                logo: "/partners/agrolab.jpg",
                alt: "Logo Agrolab srl",
              },
              {
                name: "Siram Veolia spa",
                href: "https://www.siram.veolia.it/",
                logo: "/partners/siram-veolia.jpg",
                alt: "Logo Siram Veolia",
              },
            ]}
          />
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10">
          <SectionHeader
            title="Parliamo del tuo progetto"
            subtitle="Ti rispondiamo entro 1 giorno lavorativo."
          />
          <div className="mt-4 flex justify-center">
            <Link
              href="/contatti"
              className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-white font-medium hover:bg-emerald-700"
            >
              Contatta il team
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

      {/* ============ STILI GLOBALI ============ */}
      <style jsx global>{`
        .hero-title {
          font-size: clamp(2.5rem, 5.5vw, 4.25rem);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.01em;
          text-shadow: 0 10px 30px rgba(0, 0, 0, 0.35),
            0 2px 8px rgba(0, 0, 0, 0.5);
        }
        .hero-subtitle {
          font-size: clamp(1.05rem, 1.5vw, 1.25rem);
          color: rgba(255, 255, 255, 0.95);
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
        }
        .btn-hero {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border-radius: 9999px;
          padding: 0.85rem 1.6rem;
          font-weight: 600;
          color: #fff;
          background: #0b6e4f;
          transition: background-color 0.2s;
          box-shadow: 0 14px 36px rgba(0, 0, 0, 0.25);
        }
        .btn-hero:hover {
          background: #095d43;
        }
        .btn-hero-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          border-radius: 9999px;
          padding: 0.82rem 1.55rem;
          font-weight: 600;
          color: #fff;
          border: 2px solid #fff;
          background: transparent;
          transition: background-color 0.2s;
          backdrop-filter: saturate(130%) blur(1px);
        }
        .btn-hero-secondary:hover {
          background: rgba(255, 255, 255, 0.12);
        }
        .section-title {
          font-size: clamp(1.5rem, 2.4vw, 2.5rem);
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .section-sub {
          margin-top: 0.5rem;
          color: #5b6573;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

/* ==================== TIPI & DATI ==================== */
type Category =
  | "Acqua"
  | "Ambiente"
  | "Energia"
  | "Agricoltura"
  | "Sicurezza"
  | "Edilizia e Infrastrutture"
  | "Bandi e Finanziamenti";

type Study = {
  slug: string;
  title: string;
  category: Category;
  location: string;
  client: string;
};

const STUDIES: Study[] = [
  {
    slug: "acqua-monitoraggi",
    title: "Monitoraggi idrici multi-pozzo",
    category: "Acqua",
    location: "Padova (PD)",
    client: "Consorzio di Bonifica",
  },
  {
    slug: "acqua-potabilizzazione",
    title: "Adeguamento impianto di potabilizzazione",
    category: "Acqua",
    location: "Treviso (TV)",
    client: "Gestore Idrico",
  },
  {
    slug: "ambiente-via",
    title: "Screening ambientale per ampliamento produttivo (VIA)",
    category: "Ambiente",
    location: "Venezia (VE)",
    client: "Manifattura locale",
  },
  {
    slug: "energia-audit",
    title: "Audit energetico ISO 50001",
    category: "Energia",
    location: "Vicenza (VI)",
    client: "Azienda Metalmeccanica",
  },
  {
    slug: "agricoltura-nitrati",
    title: "Piano di gestione nitrati in ZVN",
    category: "Agricoltura",
    location: "Rovigo (RO)",
    client: "Azienda Agricola",
  },
  {
    slug: "sicurezza-cantieri",
    title: "Coordinamento sicurezza in cantiere (CSP/CSE)",
    category: "Sicurezza",
    location: "Mestre (VE)",
    client: "Impresa edile",
  },
  {
    slug: "edilizia-riqualificazione",
    title: "Riqualificazione strutturale con adeguamento sismico",
    category: "Edilizia e Infrastrutture",
    location: "Verona (VR)",
    client: "Proprietà immobiliare",
  },
  {
    slug: "bandi-psr",
    title: "PSR e PNRR: domanda finanziamento per efficienza impianti",
    category: "Bandi e Finanziamenti",
    location: "Padova (PD)",
    client: "PMI Agroalimentare",
  },
];

const FILTERS = [
  "Tutti",
  "Acqua",
  "Ambiente",
  "Energia",
  "Agricoltura",
  "Sicurezza",
  "Edilizia e Infrastrutture",
  "Bandi e Finanziamenti",
] as const;
type Filter = (typeof FILTERS)[number];

const cover = (slug: string) => `/portfolio/${slug}/gallery-01.jpg`;

/* ==================== COMPONENTI ==================== */

function KPI({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="mt-1 text-[12px] uppercase tracking-widest text-slate-500">
        {label}
      </div>
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: React.ReactNode;
}) {
  return (
    <div className="mb-4 text-center">
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-sub">{subtitle}</p>}
    </div>
  );
}

/* ========= SmartImage: prova .jpg, se errore tenta .JPG ========= */
function SmartImage({
  srcJpg,
  alt,
  fill,
  className,
  sizes,
  priority,
}: {
  srcJpg: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [src, setSrc] = useState(srcJpg);
  const triedUpper = useRef(false);

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => {
        if (!triedUpper.current) {
          triedUpper.current = true;
          setSrc(srcJpg.replace(/\.jpg$/i, ".JPG"));
        }
      }}
    />
  );
}

/* ========== PARTNERS GRID (loghi cliccabili .jpg) ========== */
function PartnersGrid({
  partners,
}: {
  partners: { name: string; href: string; logo: string; alt: string }[];
}) {
  return (
    <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
      {partners.map((p) => (
        <a
          key={p.name}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-sm transition"
          aria-label={p.name}
        >
          <div className="relative h-10 sm:h-12 w-40">
            <Image
              src={p.logo}
              alt={p.alt}
              fill
              className="object-contain opacity-80 transition group-hover:opacity-100 grayscale group-hover:grayscale-0"
              sizes="160px"
            />
          </div>
        </a>
      ))}
    </div>
  );
}

/* ========= COWORKING / FORMAZIONE / EDITORIA / GESTIONALI ========= */
function KnowledgeProductsGrid() {
  const items = [
    {
      title: "Coworking",
      slug: "/servizi/coworking",
      img: "/meta/coworking.jpg",
      desc: "Spazi di lavoro, uffici e sale riunioni prenotabili nelle sedi Polinex.",
    },
    {
      title: "Formazione",
      slug: "/servizi/formazione",
      img: "/meta/formazione.jpg",
      desc: "Corsi intensivi e percorsi on-demand per studenti STEM, tecnici e aziende.",
    },
    {
      title: "Editoria",
      slug: "/servizi/editoria",
      img: "/meta/editoria.jpg",
      desc: "Manuali e casi studio per acqua, ambiente, energia, agricoltura e sicurezza.",
    },
    {
      title: "Gestionali",
      slug: "/servizi/gestionali",
      img: "/meta/gestionali.jpg",
      desc: "Software verticali per studi tecnici, aziende produttive e aziende agricole.",
    },
  ] as const;

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 md:gap-6">
      {items.map((item) => (
        <Link
          key={item.slug}
          href={item.slug}
          className="group block focus:outline-none"
          aria-label={item.title}
        >
          <FlippableCard
            title={item.title}
            img={item.img}
            desc={item.desc}
            heightClass="h-[190px]"
          />
        </Link>
      ))}
    </div>
  );
}

/* ==================== SERVIZI: 6 voci Polinex + sezione FINANZA (VIDEO + CTA) ==================== */
function ServicesMosaicCompact() {
  const services = [
    {
      title: "Acqua",
      slug: "consulenza/acqua",
      img: "/services/acqua.jpg",
      desc: "Monitoraggi, concessioni, reti idriche, potabilizzazione.",
    },
    {
      title: "Ambiente",
      slug: "consulenza/ambiente",
      img: "/services/ambiente.jpg",
      desc: "VIA/VAS, autorizzazioni ambientali, bonifiche e rifiuti.",
    },
    {
      title: "Energia",
      slug: "consulenza/energia",
      img: "/services/energia.jpg",
      desc: "Audit energetici, diagnosi, comunità energetiche, FER.",
    },
    {
      title: "Agricoltura",
      slug: "consulenza/agricoltura",
      img: "/services/agricoltura.jpg",
      desc: "Piani nitrati, utilizzo reflui, pratiche agevolative.",
    },
    {
      title: "Sicurezza",
      slug: "consulenza/sicurezza",
      img: "/services/sicurezza.jpg",
      desc: "CSP/CSE, PSC, POS, DVR, formazione e cantieri complessi.",
    },
    {
      title: "Edilizia e Infrastrutture",
      slug: "consulenza/edilizia",
      img: "/services/edilizia.jpg",
      desc: "Permessi di costruire, computi metrici, due diligence e cantierizzazione.",
    },
  ] as const;

  return (
    <div className="mt-6 space-y-6">
      {/* Griglia 3x2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {services.map((s) => (
          <ServiceTileCompact
            key={s.slug}
            title={s.title}
            slug={s.slug}
            img={s.img}
            desc={s.desc}
          />
        ))}
      </div>

      {/* Titolo sezione (COME PRIMA) */}
      <div className="pt-4">
        <SectionHeader
          title="Finanza agevolata integrata al progetto"
          subtitle="Trasformiamo i tuoi progetti in investimenti sostenibili, unendo competenze tecniche e accesso ai bandi."
        />
      </div>

      {/* NUOVO LAYOUT: pulito, bilanciato, niente “vuoto” */}
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
          {/* SINISTRA: video “incorniciato” con cover */}
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="p-6 sm:p-7">
              <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                Che cos’è la finanza agevolata?
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                Un video breve per capire come funziona e quando conviene.
              </p>
            </div>

            <div className="px-6 sm:px-7 pb-7">
              <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200">
                {/* Sostituisci VIDEO_ID con l’ID reale */}
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/VIDEO_ID?rel=0"
                  title="Che cos’è la finanza agevolata"
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          {/* DESTRA: CTA super semplice */}
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-800">
                Finanza agevolata
              </div>

              <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 leading-tight">
                Scopri i bandi e i finanziamenti che fanno al caso tuo
              </h3>

              <p className="mt-3 text-sm text-slate-600 max-w-prose">
                Ti aiutiamo a capire se il tuo progetto è finanziabile e quali
                opportunità sono realmente applicabili.
              </p>
            </div>

            <div className="mt-6">
              <Link
                href="/finanziamenti"
                className="inline-flex w-full items-center justify-center rounded-2xl bg-emerald-600 px-5 py-3 text-white font-semibold hover:bg-emerald-700 transition"
              >
                Scopri bandi e finanziamenti
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
              <p className="mt-3 text-[11px] text-slate-500 text-center">
                Link a:{" "}
                <span className="font-medium">app/finanziamenti/page.tsx</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===== CARD FLIPPABILE RIUSABILE (desktop flip, mobile come ora) ===== */
function FlippableCard({
  title,
  img,
  desc,
  heightClass,
}: {
  title: string;
  img: string;
  desc: string;
  heightClass?: string;
}) {
  const bulletize = (text: string) => {
    const bySemicolon = text
      .split(";")
      .map((s) => s.trim())
      .filter(Boolean);
    if (bySemicolon.length >= 2) return bySemicolon;

    const byDot = text
      .split(".")
      .map((s) => s.trim())
      .filter(Boolean);
    if (byDot.length >= 2) return byDot;

    return [text.trim()].filter(Boolean);
  };

  const bullets = bulletize(desc);

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg hover:scale-[1.015] will-change-transform focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 ${
        heightClass ?? "h-[210px] lg:h-[230px]"
      }`}
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative h-full w-full transition-transform duration-500 md:group-hover:rotate-y-180"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONTE */}
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility:
              "hidden" as React.CSSProperties["backfaceVisibility"],
          }}
        >
          <SmartImage
            srcJpg={img}
            alt={title}
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 520px, (min-width: 640px) 50vw, 90vw"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="bg-gradient-to-t from-black/85 via-black/70 to-transparent px-4 py-3">
              <h3 className="text-white font-extrabold tracking-wide text-base md:text-lg uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)]">
                {title}
              </h3>
              <p className="mt-1 text-white/90 text-xs md:text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)] md:hidden">
                {desc}
              </p>
            </div>
          </div>
        </div>

        {/* RETRO (desktop) */}
        <div
          className="absolute inset-0 rounded-xl hidden md:flex"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="absolute inset-0 bg-white" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/logo_grigio.png"
              alt="Polinex"
              width={560}
              height={260}
              className="object-contain opacity-25"
              priority={false}
            />
          </div>

          <div className="relative w-full h-full flex items-center justify-center p-6">
            <div className="w-full max-w-[420px] text-center">
              <h4 className="text-slate-900 font-extrabold tracking-wide text-base md:text-lg uppercase">
                {title}
              </h4>

              <ul className="mt-3 space-y-2 text-sm md:text-[15px] text-black">
                {bullets.map((b, i) => (
                  <li key={`${title}-${i}`} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-black" />
                    <span className="text-left">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceTileCompact({
  title,
  slug,
  img,
  desc,
}: {
  title: string;
  slug: string;
  img: string;
  desc: string;
}) {
  return (
    <Link
      href={`/${slug}`}
      className="group block focus:outline-none"
      aria-label={title}
    >
      <FlippableCard title={title} img={img} desc={desc} />
    </Link>
  );
}

/* ========== Filtro + Slider a card per Casi Studio ========== */
function StudiesWithFilter() {
  const [filter, setFilter] = useState<Filter>("Tutti");
  const filtered = useMemo(
    () =>
      filter === "Tutti"
        ? STUDIES
        : STUDIES.filter((s) => s.category === filter),
    [filter]
  );

  return (
    <div className="mt-6">
      <div className="flex flex-wrap items-center justify-center gap-3">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-5 py-2 text-sm border transition ${
              filter === f
                ? "border-emerald-600 text-emerald-700 bg-emerald-50"
                : "border-slate-300 text-slate-700 hover:bg-slate-50"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <StudiesCarousel items={filtered} />
    </div>
  );
}

function StudiesCarousel({ items }: { items: Study[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanLeft(scrollLeft > 0);
    setCanRight(scrollLeft + clientWidth < scrollWidth - 1);
  }, []);

  useEffect(() => {
    update();
    const el = ref.current;
    if (!el) return;
    const onScroll = () => update();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [update, items.length]);

  const scrollByDir = (dir: "left" | "right") => {
    const el = ref.current;
    if (!el) return;
    const delta = el.clientWidth * 0.9 * (dir === "left" ? -1 : 1);
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className="relative mt-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white via-white/70 to-transparent hidden md:block" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white via-white/70 to-transparent hidden md:block" />

      <div className="hidden md:flex flex-col items-center justify-center absolute left-3 top-1/2 -translate-y-1/2 z-10 space-y-1">
        <button
          aria-label="Scorri a sinistra"
          onClick={() => scrollByDir("left")}
          disabled={!canLeft}
          className={`rounded-full p-3 lg:p-3.5 shadow-lg border border-emerald-700/40 transition 
            ${
              canLeft
                ? "bg-emerald-600 text-white hover:bg-emerald-700 hover:scale-105"
                : "bg-slate-200 text-slate-400 cursor-not-allowed opacity-60"
            }`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-[11px] text-slate-500 font-medium">Indietro</span>
      </div>

      <div className="hidden md:flex flex-col items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 z-10 space-y-1">
        <button
          aria-label="Scorri a destra"
          onClick={() => scrollByDir("right")}
          disabled={!canRight}
          className={`rounded-full p-3 lg:p-3.5 shadow-lg border border-emerald-700/40 transition 
            ${
              canRight
                ? "bg-emerald-600 text-white hover:bg-emerald-700 hover:scale-105"
                : "bg-slate-200 text-slate-400 cursor-not-allowed opacity-60"
            }`}
        >
          <ArrowRight className="h-5 w-5" />
        </button>
        <span className="text-[11px] text-slate-500 font-medium">Avanti</span>
      </div>

      <div
        ref={ref}
        className="scrollbar-hide overflow-x-auto snap-x snap-mandatory"
      >
        <div className="flex gap-5 pr-4">
          {items.map((s) => (
            <StudyCard key={s.slug} study={s} />
          ))}
        </div>
      </div>
    </div>
  );
}

function StudyCard({ study }: { study: Study }) {
  const router = useRouter();
  const mapsHref = `https://www.google.com/maps?q=${encodeURIComponent(
    study.location
  )}`;

  return (
    <div className="snap-start shrink-0 w-[320px] sm:w-[360px] md:w-[400px] rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-sm transition">
      <div className="relative aspect-[16/9] bg-slate-100">
        <SmartImage
          srcJpg={cover(study.slug)}
          alt={study.title}
          fill
          sizes="(min-width: 1024px) 400px, 90vw"
          className="object-cover"
        />
      </div>

      <div className="p-5">
        <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 px-2.5 py-1 text-[11px] font-medium">
          {study.category}
        </span>

        <h3 className="mt-2 font-semibold text-lg">{study.title}</h3>

        <div className="mt-2 flex items-center gap-2 text-sm text-slate-700">
          <MapPin className="h-4 w-4 text-slate-500" />
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-slate-900"
          >
            {study.location}
          </a>
        </div>

        <div className="mt-1 flex items-center gap-2 text-sm text-slate-700">
          <Building2 className="h-4 w-4 text-slate-500" />
          <span>{study.client}</span>
        </div>

        <div className="mt-4">
          <button
            onClick={() => router.push(`/portfolio/${study.slug}`)}
            className="inline-flex items-center rounded-xl border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
          >
            Approfondisci <ChevronRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
