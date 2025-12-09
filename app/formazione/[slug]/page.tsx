// app/formazione/[slug]/page.tsx
"use client";

import type React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  GraduationCap,
  ArrowLeft,
  Clock,
  Users,
  PlayCircle,
  Check,
  Tag,
  Info,
  CalendarDays,
  Phone,
  Mail,
  Linkedin,
} from "lucide-react";

import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

// Importo tipi e dati da _data.ts
import type { Course, Teacher } from "../_data";
import { COURSES, TEACHERS } from "../_data";

/* ===== Helper prezzo (stile altre pagine) ===== */
const formatPrice = (price: number) =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(price);

/* ============ Mappa slug → URL embed YouTube ============ */
/**
 * Sostituisci "VIDEO_ID" con gli ID reali dei tuoi video YouTube.
 */
const COURSE_VIDEOS: Record<string, string> = {
  "acqua-progettazione-reti-idriche":
    "https://www.youtube.com/embed/VIDEO_ID",
  "acqua-monitoraggi-campi-pozzi":
    "https://www.youtube.com/embed/VIDEO_ID",
  "ambiente-via-vas-laboratorio":
    "https://www.youtube.com/embed/VIDEO_ID",
  "ambiente-bonifiche-rifiuti":
    "https://www.youtube.com/embed/VIDEO_ID",
  "energia-audit-iso50001": "https://www.youtube.com/embed/VIDEO_ID",
  "energia-comunita-energetiche":
    "https://www.youtube.com/embed/VIDEO_ID",
  "agricoltura-piani-nitrati-pratico":
    "https://www.youtube.com/embed/VIDEO_ID",
  "agricoltura-gestione-idrica-aziende":
    "https://www.youtube.com/embed/VIDEO_ID",
  "sicurezza-cantieri-csp-cse":
    "https://www.youtube.com/embed/VIDEO_ID",
  "sicurezza-dvr-e-valutazioni":
    "https://www.youtube.com/embed/VIDEO_ID",
  "edilizia-riqualificazione-sismica-corso":
    "https://www.youtube.com/embed/VIDEO_ID",
  "edilizia-permessi-iter-pratico":
    "https://www.youtube.com/embed/VIDEO_ID",
  "finanza-agevolata-progetti-tecnici":
    "https://www.youtube.com/embed/VIDEO_ID",
  "finanza-rendicontazione-bandi":
    "https://www.youtube.com/embed/VIDEO_ID",
};

/* ==================== PAGINA DETTAGLIO CORSO ==================== */

export default function CourseDetailPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();

  const slugParam = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const course: Course | undefined = COURSES.find(
    (c) => c.slug === slugParam
  );

  // Docenti collegati a questo corso (se presenti in _data.ts)
  const courseTeachers: Teacher[] =
    TEACHERS?.filter((t) => t.courses?.includes(course?.slug ?? "")) ?? [];

  // Fallback se il corso non esiste
  if (!course) {
    return (
      <div className="min-h-screen bg-white text-slate-900 flex flex-col">
        <Nav />
        <main className="flex-1 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
          <button
            type="button"
            onClick={() => router.push("/formazione")}
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Torna al catalogo corsi
          </button>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
            <h1 className="section-title">Corso non trovato</h1>
            <p className="mt-3 text-sm text-slate-600">
              Il corso che stai cercando non è stato trovato o non è più
              disponibile a catalogo.
            </p>
            <Link
              href="/formazione"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Vai al catalogo corsi
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const related = COURSES.filter(
    (c) => c.area === course.area && c.slug !== course.slug
  ).slice(0, 3);

  const handleAddToCart = () => {
    // Qui potrai collegare il carrello globale (context/Zustand, ecc.)
    console.log("Aggiungi corso al carrello:", course.slug);
  };

  const videoUrl = COURSE_VIDEOS[course.slug];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Nav />

      <main className="flex-1">
        {/* BREADCRUMB + HERO COMPATTO (stile altre pagine) */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => router.push("/formazione")}
                className="inline-flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 w-fit"
              >
                <ArrowLeft className="h-3 w-3" />
                <span>Torna al catalogo corsi</span>
              </button>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-3xl">
                  <h1 className="section-title flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <GraduationCap className="h-5 w-5" />
                    </span>
                    <span>{course.title}</span>
                  </h1>
                  {course.subtitle && (
                    <p className="mt-2 text-sm font-medium text-emerald-700">
                      {course.subtitle}
                    </p>
                  )}
                  <p className="mt-3 text-sm text-slate-600">
                    Area:{" "}
                    <span className="font-medium text-slate-800">
                      {course.area}
                    </span>
                    {" · "}
                    Livello:{" "}
                    <span className="font-medium text-slate-800">
                      {course.level}
                    </span>
                    {" · "}
                    Modalità:{" "}
                    <span className="font-medium text-slate-800">
                      {course.mode}
                    </span>
                    {" · "}
                    Durata:{" "}
                    <span className="font-medium text-slate-800">
                      {course.hours} ore
                    </span>
                  </p>
                  {course.nextEdition && (
                    <p className="mt-1 text-xs text-slate-500 flex items-center gap-1.5">
                      <CalendarDays className="h-3.5 w-3.5 text-slate-500" />
                      Prossima edizione:{" "}
                      <span className="font-medium text-slate-800">
                        {course.nextEdition}
                      </span>
                    </p>
                  )}
                </div>

                <div className="flex flex-col items-start sm:items-end gap-2">
                  {course.badge && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold text-emerald-800">
                      <Tag className="h-3 w-3" />
                      {course.badge}
                    </span>
                  )}
                  <p className="text-xs text-slate-500">
                    Codice corso:{" "}
                    <span className="font-mono text-slate-700">
                      {course.slug}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENUTO PRINCIPALE */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          {/* GRID 2x2:
              Riga 1: Video | Iscrizione (stessa altezza)
              Riga 2: Panoramica+Cosa imparerai+A chi è rivolto | Programma (stessa altezza)
          */}
          <div className="grid gap-8 lg:grid-cols-2 lg:auto-rows-[1fr]">
            {/* RIGA 1 - COLONNA SINISTRA: VIDEO */}
            <div className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl bg-slate-900">
                  {videoUrl ? (
                    <iframe
                      src={videoUrl}
                      title={`Video presentazione corso ${course.title}`}
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

                  {/* Badge overlay sopra il video */}
                  <div className="pointer-events-none absolute left-3 top-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
                      <GraduationCap className="h-3.5 w-3.5" />
                      {course.area}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
                      <Clock className="h-3.5 w-3.5" />
                      {course.hours} ore
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
                      <Users className="h-3.5 w-3.5" />
                      Livello {course.level}
                    </span>
                  </div>
                  <div className="pointer-events-none absolute right-3 bottom-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] text-white backdrop-blur">
                    <PlayCircle className="h-3.5 w-3.5" />
                    {course.mode}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGA 1 - COLONNA DESTRA: ISCRIZIONE (stessa altezza del video) */}
            <aside className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-sm">
                <p className="text-xs text-slate-500">Quota di iscrizione</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">
                  {formatPrice(course.price)}
                </p>

                <p className="mt-2 text-xs text-slate-600">
                  Il prezzo si intende{" "}
                  <strong>IVA esclusa</strong> e comprende materiali didattici
                  digitali e attestato di partecipazione rilasciato da Polinex
                  srl.
                </p>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  Iscriviti al corso
                </button>

                <p className="mt-3 text-[11px] text-slate-500">
                  Potrai completare l&apos;iscrizione, scegliere modalità di
                  pagamento e inserire i dati di fatturazione all&apos;interno
                  del carrello.
                </p>

                {/* CTA Finanza agevolata / contributi */}
                <div className="mt-auto pt-4 border-t border-dashed border-slate-200">
                  <p className="text-[11px] text-slate-600">
                    Vuoi valutare{" "}
                    <strong>bandi o contributi per finanziare il corso</strong>{" "}
                    (es. PSR, PNRR, fondi regionali)?
                  </p>
                  <Link
                    href="/contatti"
                    className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-emerald-50 px-4 py-2 text-[12px] font-semibold text-emerald-800 border border-emerald-100 hover:bg-emerald-100"
                  >
                    Parla con il team Finanza agevolata
                  </Link>
                </div>
              </div>
            </aside>

            {/* RIGA 2 - COLONNA SINISTRA:
                Panoramica + Cosa imparerai + A chi è rivolto / Requisiti */}
            <div className="space-y-6">
              {/* Panoramica del corso */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <Info className="h-4 w-4 text-slate-500" />
                  Panoramica del corso
                </h2>
                <p className="mt-2 text-sm text-slate-700">
                  {course.description}
                </p>
              </div>

              {/* Cosa imparerai */}
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 sm:p-5">
                <h3 className="text-sm font-semibold text-emerald-900">
                  Cosa imparerai
                </h3>
                <ul className="mt-3 grid gap-2 text-xs text-emerald-900 sm:grid-cols-2">
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 text-emerald-600" />
                    <span>
                      Inquadrare correttamente un caso reale nell&apos;ambito{" "}
                      <strong>{course.area.toLowerCase()}</strong>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 text-emerald-600" />
                    <span>
                      Applicare metodi e strumenti operativi utilizzati da
                      consulenti e studi tecnici.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 text-emerald-600" />
                    <span>
                      Leggere e interpretare correttamente la normativa di
                      riferimento.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3.5 w-3.5 text-emerald-600" />
                    <span>
                      Strutturare documentazione tecnica e report spendibili in
                      progetti reali.
                    </span>
                  </li>
                </ul>
              </div>

              {/* A chi è rivolto & requisiti */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 grid gap-5 sm:grid-cols-2">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    A chi è rivolto
                  </h3>
                  <ul className="mt-3 space-y-2 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 text-emerald-600" />
                      <span>
                        Studenti di ingegneria e materie STEM che vogliono
                        vedere come si lavora su casi reali.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 text-emerald-600" />
                      <span>
                        Professionisti (ingegneri, architetti, tecnici, HSE,
                        consulenti) che operano in ambito{" "}
                        {course.area.toLowerCase()}.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 text-emerald-600" />
                      <span>
                        Realtà aziendali che vogliono aggiornare il proprio
                        team su normative e prassi operative.
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    Requisiti consigliati
                  </h3>
                  <ul className="mt-3 space-y-2 text-xs text-slate-700">
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 text-emerald-600" />
                      <span>
                        Basi tecniche coerenti con l&apos;area di riferimento
                        (esami universitari o esperienza sul campo).
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 text-emerald-600" />
                      <span>
                        Familiarità con documenti tecnici (relazioni, elaborati,
                        planimetrie, schede di calcolo).
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 text-emerald-600" />
                      <span>
                        Per corsi online: connessione stabile e possibilità di
                        utilizzare microfono e webcam nelle sessioni live.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* RIGA 2 - COLONNA DESTRA: PROGRAMMA (altezza = colonna sinistra) */}
            <div className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                <h3 className="text-sm font-semibold text-slate-900">
                  Programma indicativo
                </h3>
                <ol className="mt-3 space-y-2 text-xs text-slate-700 flex-1">
                  <li>
                    <span className="font-semibold">Modulo 1 ·</span> Contesto
                    normativo e inquadramento del problema tecnico.
                  </li>
                  <li>
                    <span className="font-semibold">Modulo 2 ·</span> Metodi di
                    analisi e raccolta dati (rilievi, monitoraggi, schede).
                  </li>
                  <li>
                    <span className="font-semibold">Modulo 3 ·</span> Strumenti
                    di calcolo e criteri progettuali.
                  </li>
                  <li>
                    <span className="font-semibold">Modulo 4 ·</span> Iter
                    autorizzativi, documentazione e interfaccia con enti.
                  </li>
                  <li>
                    <span className="font-semibold">Modulo 5 ·</span> Casi studio
                    reali e discussione critica degli elaborati.
                  </li>
                </ol>
                <p className="mt-3 text-[11px] text-slate-500">
                  Il programma dettagliato, con calendario e orari delle lezioni
                  live, ti verrà inviato dopo l&apos;iscrizione e prima
                  dell&apos;avvio del corso.
                </p>
              </div>
            </div>
          </div>

          {/* DOCENTI – mostrata solo se esistono docenti per questo corso */}
          {courseTeachers.length > 0 && (
            <section className="mt-12 border-t border-slate-200 pt-8">
              <h2 className="section-title text-base sm:text-lg mb-2">
                Docenti del corso
              </h2>
              <p className="text-sm text-slate-600 mb-6 max-w-2xl">
                Un team di professionisti che lavora ogni giorno su progetti,
                autorizzazioni e cantieri nell&apos;area{" "}
                <strong>{course.area.toLowerCase()}</strong>, disponibile anche
                per chiarire dubbi prima dell&apos;iscrizione.
              </p>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {courseTeachers.map((teacher) => (
                  <article
                    key={teacher.id}
                    className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm flex flex-col"
                  >
                    <div className="relative h-44 bg-slate-100">
                      <Image
                        src={teacher.image}
                        alt={teacher.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-sm font-semibold text-slate-900">
                        {teacher.name}
                      </h3>
                      <p className="mt-1 text-xs text-emerald-700 font-medium">
                        {teacher.role}
                      </p>

                      {/* CTA contatto: icone telefono / email / LinkedIn */}
                      <div className="mt-3 flex items-center gap-3 text-slate-500">
                        {teacher.phone && (
                          <a
                            href={`tel:${teacher.phone.replace(/\s+/g, "")}`}
                            className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-slate-200 hover:border-emerald-500 hover:text-emerald-700 transition"
                            aria-label={`Chiama ${teacher.name}`}
                          >
                            <Phone className="h-4 w-4" />
                          </a>
                        )}
                        {teacher.email && (
                          <a
                            href={`mailto:${teacher.email}`}
                            className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-slate-200 hover:border-emerald-500 hover:text-emerald-700 transition"
                            aria-label={`Scrivi a ${teacher.name}`}
                          >
                            <Mail className="h-4 w-4" />
                          </a>
                        )}
                        {teacher.linkedin && (
                          <a
                            href={teacher.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-slate-200 hover:border-emerald-500 hover:text-emerald-700 transition"
                            aria-label={`Profilo LinkedIn di ${teacher.name}`}
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                        )}
                      </div>

                      <p className="mt-3 text-[11px] text-slate-500">
                        Puoi contattare i docenti per chiarire dubbi su
                        prerequisiti, casi trattati e opportunità applicative
                        del corso nel tuo contesto.
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Corsi correlati (stile cards compatte) */}
          {related.length > 0 && (
            <section className="mt-12 border-t border-slate-200 pt-8">
              <h2 className="text-sm font-semibold text-slate-900">
                Altri corsi nell’area {course.area.toLowerCase()}
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/formazione/${r.slug}`}
                    className="group rounded-2xl border border-slate-200 bg-white p-3 text-xs text-slate-700 hover:border-emerald-400 hover:shadow-sm"
                  >
                    <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg bg-slate-100">
                      <Image
                        src={r.cover}
                        alt={r.title}
                        fill
                        className="object-cover group-hover:scale-[1.03] transition-transform"
                        sizes="(min-width: 1024px) 220px, 60vw"
                      />
                    </div>
                    <p className="mt-2 text-[11px] uppercase tracking-wide text-emerald-700 font-semibold">
                      {r.area}
                    </p>
                    <p className="mt-1 font-semibold text-slate-900 line-clamp-2">
                      {r.title}
                    </p>
                    {r.subtitle && (
                      <p className="mt-1 text-[11px] text-slate-600 line-clamp-2">
                        {r.subtitle}
                      </p>
                    )}
                    <p className="mt-2 font-semibold text-slate-900">
                      {formatPrice(r.price)}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </section>
      </main>

      <Footer />

      {/* Stili globali per titoli, uniformi al resto del sito */}
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
