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
        if (i < exts.length - 1) {
          setI(i + 1);
        }
      }}
    />
  );
}

/* ===================== Pagina dettaglio ===================== */

export default function PortfolioDetailPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();

  const slugParam = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const project = PROJECTS.find((p) => p.slug === slugParam);

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

  const galleryBases = useMemo(() => allImageBasesOf(project), [project.slug, project.imagesCount]);

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

        {/* CONTENUTO PRINCIPALE: GALLERY + DESCRIZIONE GENERICA */}
        <section className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)] lg:items-start">
          {/* Colonna sinistra: gallery grande */}
          <div className="space-y-4">
            <Gallery images={galleryBases} alt={project.title} />

            {/* Blocco "In breve" solo se summary esiste; altrimenti testo generico */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
              <h2 className="text-sm sm:text-base font-semibold tracking-tight text-slate-900">
                In breve
              </h2>
              <p className="mt-3 text-sm text-slate-700">
                {project.summary
                  ? project.summary
                  : "Progetto seguito dal team Polinex dall’analisi iniziale fino alla gestione operativa, con coordinamento tra committente, enti e soggetti tecnici coinvolti."}
              </p>
            </div>

            {/* Blocco "Ambito di intervento" – testo generico legato alla categoria */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
              <h2 className="text-sm sm:text-base font-semibold tracking-tight text-slate-900">
                Ambito di intervento
              </h2>
              <p className="mt-3 text-sm text-slate-700">
                Il progetto rientra nell’area{" "}
                <strong>{project.category}</strong> e ha richiesto un lavoro di
                coordinamento tra aspetti tecnici, normativi e autorizzativi,
                con attenzione a tempi, vincoli e comunicazione verso tutti gli
                stakeholder coinvolti.
              </p>
            </div>
          </div>

          {/* Colonna destra: info sintetiche + CTA contatto */}
          <aside className="space-y-4 lg:space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm text-sm text-slate-700">
              <h3 className="text-sm sm:text-base font-semibold tracking-tight text-slate-900">
                Dati sintetici
              </h3>
              <dl className="mt-3 space-y-2">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-slate-500">
                    Area
                  </dt>
                  <dd className="font-medium text-slate-900">
                    {project.category}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-slate-500">
                    Committente
                  </dt>
                  <dd>{project.client}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-slate-500">
                    Località
                  </dt>
                  <dd>{project.location}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-slate-500">
                    Codice progetto
                  </dt>
                  <dd className="font-mono text-xs bg-slate-50 inline-block px-2 py-1 rounded-full border border-slate-200">
                    {project.slug}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 sm:p-5 text-sm text-emerald-900 space-y-3">
              <h3 className="text-sm sm:text-base font-semibold">
                Vuoi valutare un progetto simile?
              </h3>
              <p>
                Se il tuo contesto è vicino a questo caso studio, possiamo
                analizzare insieme vincoli, iter autorizzativi e possibili
                alternative progettuali.
              </p>
              <Link
                href="/contatti"
                className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Contatta il team
              </Link>
              <p className="text-[11px] text-emerald-900/80">
                Ti rispondiamo entro un giorno lavorativo con un primo feedback
                su fattibilità e prossimi step.
              </p>
            </div>
          </aside>
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
  const onTouchStart = (e: React.TouchEvent) =>
    setTouchStartX(e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const threshold = 40;
    if (dx > threshold) goPrev();
    if (dx < -threshold) goNext();
    setTouchStartX(null);
  };

  return (
    <div className="space-y-3">
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

      {/* Thumbnails */}
      {valid.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {valid.map((base, i) => (
            <button
              key={base}
              type="button"
              onClick={() => setIdx(i)}
              className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border ${
                i === idx
                  ? "border-emerald-500 ring-2 ring-emerald-200"
                  : "border-slate-200"
              }`}
            >
              <ImageWithExtFallback
                base={base}
                alt={`${alt} – anteprima ${i + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
