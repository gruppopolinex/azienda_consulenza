// app/portfolio/[slug]/page.tsx
"use client";

import type React from "react";
import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Building2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

import { PROJECTS, type Project } from "../_data";

/* ===================== Helper immagini ===================== */

const pad2 = (n: number) => n.toString().padStart(2, "0");

const coverBaseOf = (p: Project) => `/portfolio/${p.slug}/gallery-01`;

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

/* ========== Image con fallback estensione (.jpg -> .JPG -> .jpeg -> .png) ========== */

function ImageWithExtFallback({
  base,
  alt,
  exts = [".jpg", ".JPG", ".jpeg", ".png"],
  ...rest
}: {
  base: string;
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
        if (i < exts.length - 1) setI(i + 1);
      }}
    />
  );
}

/* ===================== Pagina dettaglio ===================== */

export default function PortfolioDetailPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();

  const slugParam = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const project: Project | undefined = PROJECTS.find((p) => p.slug === slugParam);

  // Se il progetto non esiste → pagina 404 custom
  if (!project) {
    return (
      <div className="min-h-screen bg-white text-slate-900 flex flex-col">
        <Nav />
        <main className="flex-1 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
          <button
            type="button"
            onClick={() => router.push("/portfolio")}
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Torna al portfolio
          </button>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
            <h1 className="section-title">Progetto non trovato</h1>
            <p className="mt-3 text-sm text-slate-600">
              Il caso studio che stai cercando non è disponibile o potrebbe
              essere stato rimosso.
            </p>
            <Link
              href="/portfolio"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Vai al portfolio
            </Link>
          </div>
        </main>
        <Footer />

        <style jsx global>{`
          .section-title {
            font-size: clamp(1.5rem, 2.4vw, 2.5rem);
            font-weight: 600;
            letter-spacing: -0.01em;
          }
        `}</style>
      </div>
    );
  }

  const galleryBases = useMemo(
    () => allImageBasesOf(project),
    [project.slug, project.imagesCount]
  );

  // Tutti i dati arrivano da app/portfolio/_data.ts
  const overview =
    project.overview ??
    project.summary ??
    "Intervento seguito dal team Polinex: analisi iniziale, coordinamento tecnico-amministrativo e gestione delle attività fino alla consegna.";

  const activities = project.activities ?? [];

  const ctaTitle = project.ctaTitle ?? "Vuoi valutare un progetto simile?";
  const ctaText =
    project.ctaText ??
    "Se il tuo contesto è vicino a questo caso studio, possiamo analizzare insieme vincoli, iter autorizzativi e possibili alternative progettuali.";

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Nav />

      <main className="flex-1 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* BREADCRUMB / TORNA AL PORTFOLIO */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => router.push("/portfolio")}
            className="inline-flex items-center text-sm text-slate-600 hover:text-emerald-700"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Torna al portfolio
          </button>
        </div>

        {/* HEADER PROGETTO */}
        <header className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-700">
            Caso studio
          </p>
          <h1 className="mt-2 section-title">{project.title}</h1>

          <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-700">
            <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 px-2.5 py-0.5 text-[11px] font-medium">
              {project.category}
            </span>

            <span className="inline-flex items-center gap-1">
              <MapPin className="h-4 w-4 text-slate-500" />
              {project.location}
            </span>

            <span className="inline-flex items-center gap-1">
              <Building2 className="h-4 w-4 text-slate-500" />
              {project.client}
            </span>
          </div>

          {project.summary && (
            <p className="mt-4 text-sm sm:text-base text-slate-700 leading-relaxed">
              {project.summary}
            </p>
          )}
        </header>

        {/* CONTENUTO PRINCIPALE: CAROSELLO + RIQUADRO DESCRIZIONE (stessa altezza) */}
        <section className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)] lg:items-stretch">
          {/* Colonna sinistra: carosello (senza thumbnails) */}
          <div>
            <Gallery images={galleryBases} alt={project.title} />
          </div>

          {/* Colonna destra: riquadro descrizione alto quanto il carosello */}
          <aside className="h-full">
            <div className="h-full rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm flex flex-col">
              <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
                Descrizione intervento
              </h2>

              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                {overview}
              </p>

              <div className="mt-5">
                <h3 className="text-sm sm:text-base font-semibold tracking-tight text-slate-900">
                  Attività svolte
                </h3>

                {activities.length > 0 ? (
                  <ol className="mt-3 list-decimal pl-5 space-y-1.5 text-sm text-slate-700">
                    {activities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                ) : (
                  <p className="mt-3 text-sm text-slate-600">
                    Attività non ancora valorizzate in{" "}
                    <code className="mx-1 rounded bg-slate-50 px-1.5 py-0.5 border border-slate-200 text-[12px]">
                      app/portfolio/_data.ts
                    </code>
                    .
                  </p>
                )}
              </div>
            </div>
          </aside>
        </section>

        {/* CTA finale (come pagina "Chi siamo", fuori dal riquadro descrizione) */}
        <section className="mx-auto max-w-7xl pb-20 mt-10">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10 text-center">
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
              {ctaTitle}
            </h3>
            <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
              {ctaText}
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

      <style jsx global>{`
        .section-title {
          font-size: clamp(1.5rem, 2.4vw, 2.5rem);
          font-weight: 600;
          letter-spacing: -0.01em;
        }
      `}</style>
    </div>
  );
}

/* ===================== Componenti supporto ===================== */

function Gallery({ images, alt }: { images: string[]; alt: string }) {
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
  const onTouchStart = (e: React.TouchEvent) => setTouchStartX(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const threshold = 40;
    if (dx > threshold) goPrev();
    if (dx < -threshold) goNext();
    setTouchStartX(null);
  };

  return (
    <div>
      {/* Slide principale */}
      <div
        className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <ImageWithExtFallback
          key={valid[idx] ?? images[0]}
          base={valid[idx] ?? images[0]}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
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
    </div>
  );
}
