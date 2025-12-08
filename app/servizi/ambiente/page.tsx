// app/servizi/ambiente/page.tsx
"use client";

import type React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AlertTriangle,
  Factory,
  Leaf,
  FileSearch,
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Building2,
  Calendar,
  Wallet,
} from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";

import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { GRANTS, type Grant } from "../finanziamenti/_data";

/* ========= Utils ========= */

type AmbienteCase = {
  slug: string;
  title: string;
  location: string;
  client: string;
};

const AMBIENTE_CASES: AmbienteCase[] = [
  {
    slug: "ambiente-via",
    title: "Screening VIA per ampliamento produttivo",
    location: "Venezia (VE)",
    client: "Manifattura locale",
  },
  {
    slug: "ambiente-bonifica-sito",
    title: "Piano operativo di bonifica sito industriale",
    location: "Vicenza (VI)",
    client: "Azienda Chimica",
  },
];

const cover = (slug: string) => `/portfolio/${slug}/gallery-01.jpg`;

// Filtra solo i bandi relativi all'ambiente
const AMBIENTE_GRANTS: Grant[] = GRANTS.filter((g) => {
  const anyG = g as any;

  const byArea =
    Array.isArray(anyG.areas) &&
    anyG.areas.some(
      (a: string) => a.toLowerCase() === "ambiente".toLowerCase()
    );

  const byLegacy =
    anyG.ambito === "Ambiente" ||
    anyG.settore === "Ambiente" ||
    (Array.isArray(anyG.tags) &&
      anyG.tags.some((t: string) => t.toLowerCase().includes("ambiente")));

  return byArea || byLegacy;
});

function fmtDate(iso?: string) {
  if (!iso) return "A sportello";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString("it-IT");
}

/* ========= SmartImage ========= */

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

/* ========= Header (solo titolo, come Acqua) ========= */

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-4">
      <h2 className="section-title">{title}</h2>
    </div>
  );
}

/* ========= Page ========= */

export default function AmbientePage() {
  return (
    <>
      <Nav />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
        {/* LOGO + SOLO TITOLO */}
        <section className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-0">
            <div className="relative w-40 h-16 sm:w-56 sm:h-24">
              <Image
                src="/logo.png"
                alt="Polinex"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <h1 className="section-title">Aree di intervento in ambito ambiente</h1>
        </section>

        {/* MACRO AREE DI INTERVENTO */}
        <section className="mt-2 sm:mt-4">
          <div className="grid gap-6 md:grid-cols-2 items-stretch">
            {/* Bonifiche e siti contaminati */}
            <MacroAreaCard
              icon={<AlertTriangle className="h-6 w-6 text-emerald-300" />}
              title="Bonifiche e siti contaminati"
              img="/services/ambiente-bonifiche.jpg"
              bullets={[
                "Indagini preliminari e di dettaglio (ARPA/ARSS)",
                "Analisi di rischio sito-specifica e modello concettuale",
                "Progetti di bonifica e messa in sicurezza (MISO/MISP)",
                "Piani di monitoraggio, gestione terre e rifiuti da scavo",
              ]}
            />

            {/* Rifiuti e sottoprodotti */}
            <MacroAreaCard
              icon={<Factory className="h-6 w-6 text-emerald-300" />}
              title="Rifiuti, sottoprodotti e terre/rocce"
              img="/services/ambiente-rifiuti.jpg"
              bullets={[
                "Classificazione rifiuti e codici EER",
                "Gestione depositi temporanei, registri e MUD",
                "Piani di gestione terre e rocce da scavo",
                "Supporto su sottoprodotti ed end of waste",
              ]}
            />

            {/* Studi previsionali, VIA, valutazioni */}
            <MacroAreaCard
              icon={<Leaf className="h-6 w-6 text-emerald-300" />}
              title="Studi previsionali e VIA"
              img="/services/ambiente-studi.jpg"
              bullets={[
                "Screening VIA/VAS e studi di impatto ambientale",
                "Valutazioni su aria, rumore, traffico, suolo e acque",
                "Piani di monitoraggio ambientale (PMA)",
                "Rapporti tecnici per conferenze dei servizi",
              ]}
            />

            {/* Permitting & due diligence */}
            <MacroAreaCard
              icon={<FileSearch className="h-6 w-6 text-emerald-300" />}
              title="Permitting e due diligence ambientale"
              img="/services/ambiente-permitting.jpg"
              bullets={[
                "AUA, AIA e autorizzazioni settoriali, nuove e rinnovi",
                "Due diligence ambientali per acquisizioni e M&A",
                "Verifica conformità normativa di impianti e siti",
                "Piani di adeguamento e roadmap di intervento",
              ]}
            />
          </div>
        </section>

        {/* APPROCCIO DI LAVORO */}
        <section className="mt-10">
          <SectionHeader title="Come lavoriamo sui progetti ambientali" />

          <div className="mt-4 grid gap-6 md:grid-cols-3">
            <StepCard
              step="1"
              title="Inquadramento e analisi"
              text="Raccolta documentazione, sopralluoghi, analisi di conformità e gap rispetto alla normativa vigente."
            />
            <StepCard
              step="2"
              title="Progetto + permitting"
              text="Redazione elaborati tecnici, studi previsionali e pratiche autorizzative. Supporto in conferenze di servizi e integrazioni."
            />
            <StepCard
              step="3"
              title="Esecuzione e monitoraggi"
              text="Assistenza in cantiere, gestione rifiuti/terre, monitoraggi ambientali e reportistica per enti e stakeholder."
            />
          </div>
        </section>

        {/* BANDI / FINANZA AGEVOLATA PER L'AMBIENTE */}
        <section className="mt-10">
          <SectionHeader title="Bandi e finanziamenti per interventi ambientali" />
          <AmbienteGrantsCarousel items={AMBIENTE_GRANTS} />

          {/* CTA finale sezione bandi */}
          <div className="mt-6 text-center">
            <Link
              href="/servizi/finanziamenti"
              className="inline-flex items-center rounded-full border border-emerald-600 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
            >
              Vedi tutti i bandi e i finanziamenti
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* CASI STUDIO AMBIENTE */}
        <section className="mt-10">
          <SectionHeader title="Progetti e casi studio in ambito ambiente" />
          <AmbienteCasesCarousel items={AMBIENTE_CASES} />

          {/* CTA finale sezione portfolio */}
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

        {/* CTA FINALE */}
        <section className="mt-10 sm:mt-10 mb-4">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10 text-center">
            <h2 className="section-title text-[clamp(1.5rem,2.4vw,2.1rem)]">
              Hai un progetto con ricadute ambientali?
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Possiamo supportarti su bonifiche, rifiuti, studi previsionali e
              autorizzazioni. Raccontaci il contesto, ti rispondiamo in tempi
              brevi.
            </p>
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

      {/* Stili globali allineati alla home / acqua */}
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

/* ===================== COMPONENTI ===================== */

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
          <h3 className="font-semibold text-base sm:text-lg text-white">
            {title}
          </h3>
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

/* ====== Carosello casi studio ambiente ====== */

function AmbienteCasesCarousel({ items }: { items: AmbienteCase[] }) {
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

      <div
        ref={ref}
        className="scrollbar-hide overflow-x-auto snap-x snap-mandatory"
      >
        <div className="flex gap-5 pr-4">
          {items.map((c) => (
            <AmbienteCaseCard key={c.slug} c={c} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AmbienteCaseCard({ c }: { c: AmbienteCase }) {
  return (
    <article className="snap-start shrink-0 w-[320px] sm:w-[360px] md:w-[400px] rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-sm transition">
      <div className="relative aspect-[16/9] bg-slate-100">
        <SmartImage
          srcJpg={cover(c.slug)}
          alt={c.title}
          fill
          sizes="(min-width: 1024px) 400px, 90vw"
          className="object-cover"
        />
      </div>

      <div className="p-5">
        <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 px-2.5 py-1 text-[11px] font-medium">
          Ambiente
        </span>

        <h3 className="mt-2 font-semibold text-lg">{c.title}</h3>

        <div className="mt-2 flex items-center gap-2 text-sm text-slate-700">
          <MapPin className="h-4 w-4 text-slate-500" />
          <span>{c.location}</span>
        </div>

        <div className="mt-1 flex items-center gap-2 text-sm text-slate-700">
          <Building2 className="h-4 w-4 text-slate-500" />
          <span>{c.client}</span>
        </div>

        <div className="mt-4">
          <Link
            href={`/portfolio/${c.slug}`}
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

/* ====== Carosello bandi ambiente ====== */

function AmbienteGrantsCarousel({ items }: { items: Grant[] }) {
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

  const scrollBy = (dir: "left" | "right") => {
    const el = ref.current;
    if (!el) return;
    const delta = el.clientWidth * 0.9 * (dir === "left" ? -1 : 1);
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  if (!items.length) {
    return (
      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
        Stiamo selezionando i bandi più rilevanti per l&apos;ambito ambientale.
        Nel frattempo puoi consultare l&apos;elenco completo nella pagina Bandi
        e Finanziamenti.
      </div>
    );
  }

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

      <div
        ref={ref}
        className="scrollbar-hide overflow-x-auto snap-x snap-mandatory"
      >
        <div className="flex gap-5 pr-4">
          {items.map((g) => (
            <GrantCard key={g.slug} g={g} />
          ))}
        </div>
      </div>
    </div>
  );
}

function GrantCard({ g }: { g: Grant }) {
  return (
    <Link
      href={`/servizi/finanziamenti/${g.slug}`}
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
          {g.territorio && (
            <GrantMeta label="Territorio" value={g.territorio} />
          )}
        </div>

        {g.teaser && (
          <p className="mt-3 text-sm text-slate-600 line-clamp-3">{g.teaser}</p>
        )}

        <div className="mt-4 flex items-center justify-between">
          <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 px-3 py-1 text-[11px] font-semibold">
            Bando per interventi ambientali
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
