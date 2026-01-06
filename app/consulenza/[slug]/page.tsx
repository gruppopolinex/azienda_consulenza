// app/consulenza/[slug]/page.tsx
"use client";

import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { use, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Droplets,
  Waves,
  Factory,
  Leaf,
  AlertTriangle,
  FileSearch,
  Building2,
  Hammer,
  FileText,
  ClipboardList,
  Zap,
  ThermometerSun,
  Wind,
  ShieldCheck,
  HardHat,
  Flame,
  Users,
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Wallet,
  GraduationCap,
  BookOpen,
} from "lucide-react";

import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

import { getConsulenzaAreaBySlug, type ConsulenzaIconKey } from "../_data";

// ✅ Bandi & finanziamenti (SOURCE DATA)
import { GRANTS, type Grant, type Area as GrantsArea } from "../../finanziamenti/_data";

// Formazione
import { COURSES, type Course } from "../../servizi/formazione/_data";

// Editoria
import { BOOKS, type Book } from "../../servizi/editoria/_data";

// ✅ Portfolio / progetti (SOURCE: app/portfolio/_data.ts)
import { PROJECTS, type Project } from "../../portfolio/_data";

/* ===================== ICON MAP ===================== */

const ICONS: Record<ConsulenzaIconKey, React.ComponentType<{ className?: string }>> = {
  Droplets,
  Waves,
  Factory,
  Leaf,
  AlertTriangle,
  FileSearch,
  Building2,
  Hammer,
  FileText,
  ClipboardList,
  Zap,
  ThermometerSun,
  Wind,
  ShieldCheck,
  HardHat,
  Flame,
  Users,
};

/* ===================== TYPES ===================== */

type PortfolioItem = {
  slug: string;
  title: string;
  location: string;
  client: string;
};

/**
 * ✅ Le tue gallery sono PNG.
 * Usiamo gallery-01.png come prima scelta, e fallback su jpg/JPG/jpeg.
 */
function coverCandidates(slug: string) {
  const base = `/portfolio/${slug}/gallery-01`;
  return [`${base}.png`, `${base}.jpg`, `${base}.JPG`, `${base}.jpeg`];
}

function fmtDate(iso?: string) {
  if (!iso) return "A sportello";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString("it-IT");
}

/* ===================== TYPE-GUARDS ===================== */

/**
 * GRANTS.aree è tipizzato con un'unione (Area) nel file finanziamenti/_data.
 * Qui convertiamo areaConfig.area (string) in modo type-safe.
 */
function isGrantsArea(v: unknown): v is GrantsArea {
  if (typeof v !== "string") return false;
  // check runtime sulla lista attuale (robusto anche se Area cambia)
  return GRANTS.some((g) => (g.aree ?? []).includes(v as GrantsArea));
}

/* ===================== SMART IMAGE (multi-fallback) ===================== */

function SmartImage({
  srcCandidates,
  alt,
  fill,
  className,
  sizes,
  priority,
}: {
  srcCandidates: string[];
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const [idx, setIdx] = useState(0);
  const src = srcCandidates[Math.min(idx, srcCandidates.length - 1)];

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setIdx((v) => (v < srcCandidates.length - 1 ? v + 1 : v))}
    />
  );
}

/* ===================== SHARED UI ===================== */

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-4">
      <h2 className="section-title">{title}</h2>
    </div>
  );
}

function MacroAreaCard({
  icon,
  title,
  img,
  bullets,
}: {
  icon: React.ReactNode;
  title: string;
  img: string;
  bullets: string[];
}) {
  return (
    <article
      className="group relative overflow-hidden rounded-3xl border border-black/30 text-white shadow transition hover:shadow-lg"
      style={{
        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9), rgba(0,0,0,0.55), rgba(0,0,0,0.25)), url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="p-5 sm:p-6 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-emerald-300">
          {icon}
          <h3 className="font-semibold text-base sm:text-lg text-white">{title}</h3>
        </div>

        <ul className="space-y-1.5 text-[13px] sm:text-sm text-white/95">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function StepCard({
  step,
  title,
  text,
}: {
  step: string;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-xs font-semibold text-white">
          {step}
        </div>
        <h3 className="font-semibold text-slate-900">{title}</h3>
      </div>
      <p className="mt-3 text-sm text-slate-600">{text}</p>
    </article>
  );
}

/* ===================== GENERIC CAROUSEL SHELL ===================== */

function HorizontalCarousel({ children }: { children: React.ReactNode }) {
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
  }, [update, children]);

  const scrollBy = (dir: "left" | "right") => {
    const el = ref.current;
    if (!el) return;
    const delta = el.clientWidth * 0.9 * (dir === "left" ? -1 : 1);
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <div className="relative mt-6">
      <button
        aria-label="Indietro"
        onClick={() => scrollBy("left")}
        disabled={!canLeft}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white p-2 shadow-sm border border-slate-200 disabled:opacity-40"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        aria-label="Avanti"
        onClick={() => scrollBy("right")}
        disabled={!canRight}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white p-2 shadow-sm border border-slate-200 disabled:opacity-40"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div ref={ref} className="scrollbar-hide overflow-x-auto snap-x snap-mandatory">
        <div className="flex gap-5 pr-4">{children}</div>
      </div>
    </div>
  );
}

/* ===================== CARDS ===================== */

function PortfolioCard({ p, chip }: { p: PortfolioItem; chip: string }) {
  return (
    <article className="snap-start shrink-0 w-[320px] sm:w-[360px] md:w-[400px] rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-sm transition">
      <div className="relative aspect-[16/9] bg-slate-100">
        <SmartImage
          srcCandidates={coverCandidates(p.slug)}
          alt={p.title}
          fill
          sizes="(min-width: 1024px) 400px, 90vw"
          className="object-cover"
        />
      </div>

      <div className="p-5">
        <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 px-2.5 py-1 text-[11px] font-medium">
          {chip}
        </span>

        <h3 className="mt-2 font-semibold text-lg">{p.title}</h3>

        <div className="mt-2 flex items-center gap-2 text-sm text-slate-700">
          <MapPin className="h-4 w-4 text-slate-500" />
          <span>{p.location}</span>
        </div>

        <div className="mt-1 flex items-center gap-2 text-sm text-slate-700">
          <Building2 className="h-4 w-4 text-slate-500" />
          <span>{p.client}</span>
        </div>

        <div className="mt-4">
          <Link
            href={`/portfolio/${p.slug}`}
            className="inline-flex items-center rounded-xl border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50 text-sm"
          >
            Approfondisci
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function GrantCard({ g, chipText }: { g: Grant; chipText: string }) {
  return (
    <Link
      href={`/finanziamenti/${g.slug}`}
      className="snap-start shrink-0 w-[320px] sm:w-[360px] md:w-[420px] rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition group"
      aria-label={`Vai al dettaglio del bando: ${g.title}`}
    >
      <div className="flex flex-col h-full">
        <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-emerald-700">
          {g.title}
        </h3>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-slate-800">
          <GrantMeta
            icon={<Building2 className="h-4 w-4" />}
            label="Ente"
            value={g.ente}
          />
          <GrantMeta
            icon={<Wallet className="h-4 w-4" />}
            label="Contributo"
            value={g.contributo}
          />
          <GrantMeta label="Beneficiari" value={g.beneficiari} />
          <GrantMeta
            icon={<Calendar className="h-4 w-4" />}
            label="Scadenza"
            value={fmtDate(g.scadenza)}
          />
          {g.territorio && <GrantMeta label="Territorio" value={g.territorio} />}
        </div>

        {g.teaser && <p className="mt-3 text-sm text-slate-600 line-clamp-3">{g.teaser}</p>}

        <div className="mt-4 flex items-center justify-between">
          <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 px-3 py-1 text-[11px] font-semibold">
            {chipText}
          </span>
          <ArrowRight className="h-5 w-5 text-emerald-600 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition" />
        </div>
      </div>
    </Link>
  );
}

function GrantMeta({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="inline-flex items-center gap-1.5">
      {icon}
      <span className="font-semibold">{label}:</span>
      <span className="text-slate-800">{value}</span>
    </div>
  );
}

function CourseCard({ c, tag }: { c: Course; tag: string }) {
  return (
    <Link
      href={`/servizi/formazione/${c.slug}`}
      className="snap-start shrink-0 w-[320px] sm:w-[360px] md:w-[420px] rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition group"
    >
      <div className="p-5 flex flex-col h-full">
        <div className="inline-flex items-center gap-2 text-emerald-700 text-xs font-semibold">
          <GraduationCap className="h-4 w-4" />
          <span>{tag}</span>
        </div>

        <h3 className="mt-2 text-lg font-semibold text-slate-900 group-hover:text-emerald-700">
          {c.title}
        </h3>

        {c.subtitle && <p className="mt-1 text-sm text-emerald-700">{c.subtitle}</p>}

        <p className="mt-2 text-sm text-slate-600 line-clamp-3">{c.description}</p>

        <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-600">
          <span>
            Durata: <strong>{c.hours} ore</strong>
          </span>
          <span>
            Livello: <strong>{c.level}</strong>
          </span>
          <span>
            Modalità: <strong>{c.mode}</strong>
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 px-3 py-1 text-[11px] font-semibold">
            Corso pratico
          </span>
          <ArrowRight className="h-5 w-5 text-emerald-600 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition" />
        </div>
      </div>
    </Link>
  );
}

function BookCard({ b, tag }: { b: Book; tag: string }) {
  return (
    <Link
      href={`/servizi/editoria/${b.slug}`}
      className="snap-start shrink-0 w-[320px] sm:w-[360px] md:w-[420px] rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition group"
    >
      <div className="relative h-40 bg-slate-100">
        <Image
          src={b.cover}
          alt={b.title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 420px, 90vw"
        />
      </div>

      <div className="p-5 flex flex-col h-full">
        <div className="inline-flex items-center gap-2 text-slate-700 text-xs font-semibold">
          <BookOpen className="h-4 w-4" />
          <span>{tag}</span>
        </div>

        <h3 className="mt-2 text-lg font-semibold text-slate-900 group-hover:text-emerald-700">
          {b.title}
        </h3>

        {b.subtitle && <p className="mt-1 text-sm text-emerald-700">{b.subtitle}</p>}

        <p className="mt-2 text-sm text-slate-600 line-clamp-3">{b.description}</p>

        <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-600">
          <span>
            Formato: <strong>{b.format}</strong>
          </span>
          <span>
            Pagine: <strong>{b.pages}</strong>
          </span>
          <span>
            Anno: <strong>{b.year}</strong>
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ===================== PAGE ===================== */

export default function ConsulenzaSlugPage({
  params,
}: {
  // ✅ Next 16: params è Promise in client component
  params: Promise<{ slug: string }>;
}) {
  const router = useRouter();

  // ✅ unwrap params
  const { slug } = use(params);

  const areaConfig = useMemo(() => getConsulenzaAreaBySlug(slug), [slug]);

  // fallback client-side: se slug inesistente, rimando a /consulenza
  useEffect(() => {
    if (!areaConfig) router.replace("/consulenza");
  }, [areaConfig, router]);

  const grants = useMemo(() => {
    if (!areaConfig) return [];

    // ✅ area type-safe per GRANTS.aree (Area)
    const area: GrantsArea | null = isGrantsArea(areaConfig.area) ? areaConfig.area : null;
    if (!area) return [];

    return GRANTS.filter((g) => (g.aree ?? []).includes(area));
  }, [areaConfig]);

  const courses = useMemo(() => {
    if (!areaConfig) return [];
    return COURSES.filter((c) => c.area === areaConfig.area);
  }, [areaConfig]);

  const books = useMemo(() => {
    if (!areaConfig) return [];
    return BOOKS.filter((b) => b.area === areaConfig.area);
  }, [areaConfig]);

  // ✅ Portfolio: dati da PROJECTS
  const portfolio = useMemo<PortfolioItem[]>(() => {
    if (!areaConfig) return [];
    return PROJECTS.filter((p: Project) => p.category === areaConfig.area).map((p: Project) => ({
      slug: p.slug,
      title: p.title,
      location: p.location,
      client: p.client,
    }));
  }, [areaConfig]);

  if (!areaConfig) return null;

  const hasGrants = grants.length > 0;
  const hasCourses = courses.length > 0;
  const hasBooks = books.length > 0;
  const hasPortfolio = portfolio.length > 0;

  return (
    <>
      <Nav />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
        {/* LOGO + SOLO TITOLO */}
        <section className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-0">
            <div className="relative w-40 h-16 sm:w-56 sm:h-24">
              <Image src="/logo.png" alt="Polinex" fill className="object-contain" />
            </div>
          </div>

          <h1 className="section-title">{areaConfig.h1}</h1>
        </section>

        {/* MACRO AREE DI INTERVENTO */}
        <section className="mt-2 sm:mt-4">
          <div className="grid gap-6 md:grid-cols-2 items-stretch">
            {areaConfig.macroCards.map((c) => {
              const Icon = ICONS[c.icon];
              return (
                <MacroAreaCard
                  key={c.title}
                  icon={<Icon className="h-6 w-6 text-emerald-300" />}
                  title={c.title}
                  img={c.img}
                  bullets={c.bullets}
                />
              );
            })}
          </div>
        </section>

        {/* APPROCCIO DI LAVORO */}
        <section className="mt-10">
          <SectionHeader title={areaConfig.stepsTitle} />
          <div className="mt-4 grid gap-6 md:grid-cols-3">
            {areaConfig.steps.map((s) => (
              <StepCard key={s.step} step={s.step} title={s.title} text={s.text} />
            ))}
          </div>
        </section>

        {/* BANDI */}
        {hasGrants && (
          <section className="mt-10">
            <SectionHeader title={areaConfig.grantsTitle} />
            <HorizontalCarousel>
              {grants.map((g) => (
                <GrantCard
                  key={g.slug}
                  g={g}
                  chipText={`Bando per interventi in ambito ${areaConfig.slug}`}
                />
              ))}
            </HorizontalCarousel>

            <div className="mt-6 text-center">
              <Link
                href="/finanziamenti"
                className="inline-flex items-center rounded-full border border-emerald-600 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
              >
                Vedi tutti i bandi e i finanziamenti
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </section>
        )}

        {/* FORMAZIONE */}
        {hasCourses && (
          <section className="mt-10">
            <SectionHeader title={areaConfig.coursesTitle} />
            <HorizontalCarousel>
              {courses.map((c) => (
                <CourseCard key={c.slug} c={c} tag={`Formazione area ${areaConfig.slug}`} />
              ))}
            </HorizontalCarousel>

            <div className="mt-6 text-center">
              <Link
                href="/servizi/formazione"
                className="inline-flex items-center rounded-full border border-emerald-600 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
              >
                Vedi tutti i corsi di formazione
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </section>
        )}

        {/* EDITORIA */}
        {hasBooks && (
          <section className="mt-10">
            <SectionHeader title={areaConfig.booksTitle} />
            <HorizontalCarousel>
              {books.map((b) => (
                <BookCard key={b.slug} b={b} tag={`Manuale area ${areaConfig.slug}`} />
              ))}
            </HorizontalCarousel>

            <div className="mt-6 text-center">
              <Link
                href="/servizi/editoria"
                className="inline-flex items-center rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                Vedi tutte le pubblicazioni
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </section>
        )}

        {/* PORTFOLIO */}
        {hasPortfolio && (
          <section className="mt-10">
            <SectionHeader title={areaConfig.portfolioTitle} />
            <HorizontalCarousel>
              {portfolio.map((p) => (
                <PortfolioCard key={p.slug} p={p} chip={areaConfig.portfolioChip} />
              ))}
            </HorizontalCarousel>

            <div className="mt-6 text-center">
              <Link
                href="/portfolio"
                className="inline-flex items-center rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                Vedi tutto il portfolio
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </section>
        )}

        {/* CTA FINALE */}
        <section className="mt-10 sm:mt-10 mb-4">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10 text-center">
            <h2 className="section-title text-[clamp(1.5rem,2.4vw,2.1rem)]">
              {areaConfig.ctaTitle}
            </h2>

            {areaConfig.ctaText && (
              <p className="mt-3 text-slate-600 max-w-3xl mx-auto">{areaConfig.ctaText}</p>
            )}

            <Link
              href="/contatti"
              className="mt-6 inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-white font-medium hover:bg-emerald-700"
            >
              Contatta il team
              <ArrowRight className="ml-2 h-4 w-4" />
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
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
