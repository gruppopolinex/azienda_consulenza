// app/portfolio/page.tsx
"use client";

import type React from "react";
import { useMemo, useState, useCallback } from "react";
import { MapPin, Building2, ChevronRight, ChevronLeft, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Layout
import Nav from "../components/Nav";
import Footer from "../components/Footer";

// Dati portfolio
import { PROJECTS, type Project, type Category } from "./_data";

/* ===================== Helper ===================== */

const pad2 = (n: number) => n.toString().padStart(2, "0");

/** Restituisce la BASE della cover (senza estensione). */
const coverBaseOf = (p: Project) => `/portfolio/${p.slug}/gallery-01`;

/** Elenco completo delle immagini come BASI senza estensione:
 *  /portfolio/<slug>/gallery-01, /gallery-02, ...
 *  L'estensione verrà risolta a runtime (.jpg -> .JPG -> .jpeg -> .png)
 */
const allImageBasesOf = (p: Project) => {
  const base = `/portfolio/${p.slug}`;
  const count = Math.max(1, p.imagesCount);
  const urls = Array.from({ length: count }, (_, i) => {
    const n = pad2(i + 1);
    return `${base}/gallery-${n}`;
  });

  const coverBase = coverBaseOf(p);
  const rest = urls.filter((u) => u !== coverBase);
  return [coverBase, ...rest];
};

/* ===================== Filtri ===================== */

const FILTERS = [
  "Tutti",
  "Acqua",
  "Ambiente",
  "Energia",
  "Agricoltura",
  "Sicurezza",
  "Bandi e Finanziamenti",
  "Edilizia e Infrastrutture",
  "Gestionali",
] as const;

type Filter = (typeof FILTERS)[number];

/* ===================== Pagina ===================== */

export default function PortfolioPage() {
  const [filter, setFilter] = useState<Filter>("Tutti");
  const [query, setQuery] = useState<string>("");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();

    return PROJECTS.filter((p) => {
      const categoryMatch =
        filter === "Tutti" ? true : p.category === (filter as Category);

      const text = `${p.title} ${p.client} ${p.location} ${p.category}`.toLowerCase();
      const queryMatch = q.length === 0 ? true : text.includes(q);

      return categoryMatch && queryMatch;
    });
  }, [filter, query]);

  return (
    <>
      <Nav />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
        {/* HERO - Logo + titolo + sottotitolo (stile Lavora con noi) */}
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

          <h1 className="section-title">Portfolio progetti</h1>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Una selezione di interventi seguiti da Polinex su{" "}
            <strong>acqua</strong>, <strong>ambiente</strong>,{" "}
            <strong>energia</strong>, <strong>agricoltura</strong>,{" "}
            <strong>sicurezza</strong>,{" "}
            <strong>edilizia e infrastrutture</strong>,{" "}
            <strong>bandi e finanziamenti</strong> e{" "}
            <strong>soluzioni gestionali</strong>.
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Filtra per area di competenza e cerca per parola chiave (titolo,
            cliente o località).
          </p>

          {/* Toolbar filtri: tendina a sinistra, ricerca a destra */}
          <div className="mt-6 grid gap-3 sm:grid-cols-[minmax(0,240px)_minmax(0,1fr)] items-center">
            {/* Filtro a tendina */}
            <div className="text-left">
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Area di competenza
              </label>
              <select
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                value={filter}
                onChange={(e) => setFilter(e.target.value as Filter)}
              >
                {FILTERS.map((f) => (
                  <option key={f} value={f}>
                    {f === "Tutti" ? "Tutti i progetti" : f}
                  </option>
                ))}
              </select>
            </div>

            {/* Ricerca */}
            <div className="text-left">
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Cerca
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cerca per titolo, cliente o località…"
                  className="w-full rounded-xl border border-slate-300 bg-white pl-9 pr-3 py-2 text-sm text-slate-700 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Grid progetti */}
        <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}

          {list.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-600">
              Nessun progetto trovato con i filtri selezionati.
            </div>
          )}
        </section>

        {/* CTA finale */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20 mt-14">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10 text-center">
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
              Vuoi discutere un progetto simile?
            </h3>
            <p className="mt-3 text-slate-600">
              Raccontaci contesto, vincoli e obiettivi. Ti rispondiamo entro{" "}
              <strong>1 giorno lavorativo</strong> per capire se possiamo
              affiancarti.
            </p>
            <Link
              href="/contatti"
              className="mt-6 inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-white font-medium hover:bg-emerald-700"
            >
              Contatta il team
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      {/* Stili globali per il titolo, coerenti con Lavora con noi / Formazione */}
      <style jsx global>{`
        .section-title {
          font-size: clamp(1.5rem, 2.4vw, 2.5rem);
          font-weight: 600;
          letter-spacing: -0.01em;
        }
      `}</style>
    </>
  );
}

/* ===================== Componenti ===================== */

function ProjectCard({ p }: { p: Project }) {
  const mapsHref = `https://www.google.com/maps?q=${encodeURIComponent(
    p.location
  )}`;

  // Galleria: basi delle immagini (senza estensione)
  const galleryBases = useMemo(() => allImageBasesOf(p), [p.slug, p.imagesCount]);

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-sm transition">
      {/* Cover con piccolo carousel */}
      <ImageCarousel images={galleryBases} alt={p.title} />

      {/* Contenuto */}
      <div className="p-5">
        {/* Badge categoria */}
        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
          {p.category}
        </span>

        {/* Titolo */}
        <h3 className="mt-2 font-medium text-slate-900">{p.title}</h3>

        {/* Località → Google Maps */}
        <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
          <MapPin className="h-4 w-4 text-slate-500" />
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-slate-800"
          >
            {p.location}
          </a>
        </div>

        {/* Committente */}
        <div className="mt-1 flex items-center gap-2 text-sm text-slate-600">
          <Building2 className="h-4 w-4 text-slate-500" />
          <span>{p.client}</span>
        </div>

        {/* Approfondisci */}
        <div className="mt-4">
          <Link
            href={`/portfolio/${p.slug}`}
            className="inline-flex items-center rounded-xl border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            Approfondisci
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ========== Image con fallback estensione (.jpg -> .JPG -> .jpeg -> .png) ========== */

function ImageWithExtFallback({
  base,
  alt,
  exts = [".jpg", ".JPG", ".jpeg", ".png"],
  ...rest
}: {
  base: string; // es. "/portfolio/acqua-monitoraggi/gallery-01" (senza estensione)
  alt: string;
  exts?: string[];
} & Omit<React.ComponentProps<typeof Image>, "src" | "alt">) {
  const [i, setI] = useState(0);
  const src = `${base}${exts[i]}`;

  return (
    <Image
      {...rest}
      alt={alt}
      src={src}
      onError={() => {
        if (i < exts.length - 1) {
          setI(i + 1);
        }
      }}
    />
  );
}

/* ===================== Carousel minimale con frecce + swipe ===================== */

function ImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  // "images" qui sono BASI senza estensione
  const valid = images.filter(Boolean);
  const [idx, setIdx] = useState(0);

  const count = valid.length || 1;
  const canNavigate = count > 1;

  const goPrev = useCallback(() => {
    if (!canNavigate) return;
    setIdx((i) => (i - 1 + count) % count);
  }, [canNavigate, count]);

  const goNext = useCallback(() => {
    if (!canNavigate) return;
    setIdx((i) => (i + 1) % count);
  }, [canNavigate, count]);

  // Swipe touch
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) =>
    setTouchStartX(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const threshold = 40; // px
    if (dx > threshold) goPrev();
    if (dx < -threshold) goNext();
    setTouchStartX(null);
  };

  return (
    <div
      className="relative aspect-[4/3] bg-slate-100 overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slide corrente (usa fallback estensioni) */}
      <ImageWithExtFallback
        key={valid[idx] ?? images[0]}
        base={valid[idx] ?? images[0]}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 33vw, 100vw"
        className="object-cover"
        priority={false}
      />

      {/* Frecce */}
      <button
        type="button"
        onClick={goPrev}
        disabled={!canNavigate}
        aria-label="Immagine precedente"
        className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full border bg-white/80 backdrop-blur px-2 py-2 hover:bg-white disabled:opacity-50"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={goNext}
        disabled={!canNavigate}
        aria-label="Immagine successiva"
        className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-full border bg-white/80 backdrop-blur px-2 py-2 hover:bg-white disabled:opacity-50"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      {canNavigate && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/70 rounded-full px-2 py-1">
          {valid.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Vai alla slide ${i + 1}`}
              className={`h-2 w-2 rounded-full ${
                i === idx ? "bg-slate-800" : "bg-slate-400"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
