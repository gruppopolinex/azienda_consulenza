// app/lavora-con-noi/[slug]/page.tsx
"use client";

import type React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  MapPin,
  Clock,
  Briefcase,
  GraduationCap,
  ArrowLeft,
  Check,
  Send,
  ChevronRight,
} from "lucide-react";

import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

import type { Job } from "../_data";
import { JOBS } from "../_data";

export default function JobDetailPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();

  const slugParam = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const job: Job | undefined = JOBS.find((j) => j.slug === slugParam);

  // Se la posizione non esiste → schermata 404 custom
  if (!job) {
    return (
      <div className="min-h-screen bg-white text-slate-900 flex flex-col">
        <Nav />
        <main className="flex-1 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
          <button
            type="button"
            onClick={() => router.push("/lavora-con-noi")}
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Torna alle posizioni aperte
          </button>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
            <h1 className="section-title">Posizione non trovata</h1>
            <p className="mt-3 text-sm text-slate-600">
              La posizione che stai cercando non è stata trovata o non è più
              disponibile. Puoi comunque inviarci una candidatura spontanea.
            </p>
            <Link
              href="/lavora-con-noi"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Vai a “Lavora con noi”
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

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // Qui potrai agganciare invio a backend / servizio esterno
    console.log("Application form submitted for job:", job.slug);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Nav />

      <main className="flex-1 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Back link */}
        <div className="mb-6">
          <button
            type="button"
            onClick={() => router.push("/lavora-con-noi")}
            className="inline-flex items-center text-sm text-slate-600 hover:text-emerald-700"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Torna a “Lavora con noi”
          </button>
        </div>

        {/* Header posizione */}
        <header className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-emerald-700">
            Posizione aperta
          </p>
          <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
            {job.title}
          </h1>

          <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-700">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-4 w-4 text-slate-500" />
              {job.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <GraduationCap className="h-4 w-4 text-slate-500" />
              {job.level}
            </span>
            <span className="inline-flex items-center gap-1">
              <Briefcase className="h-4 w-4 text-slate-500" />
              {job.contract}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-4 w-4 text-slate-500" />
              {job.availability}
            </span>
          </div>

          {job.areas?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {job.areas.map((area) => (
                <span
                  key={area}
                  className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 px-2.5 py-0.5 text-[11px] font-medium"
                >
                  {area}
                </span>
              ))}
            </div>
          )}

          <p className="mt-4 text-sm sm:text-base text-slate-700 leading-relaxed">
            {job.intro}
          </p>
        </header>

        {/* Contenuto principale: 2 colonne */}
        <section className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)] lg:items-stretch">
          {/* Colonna sinistra: dettagli ruolo */}
          <div className="space-y-8">
            <DetailSection title="Cosa farai">
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700">
                {job.activities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </DetailSection>

            <DetailSection title="Cosa cerchiamo">
              <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700">
                {job.requirements.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </DetailSection>

            {job.plus && job.plus.length > 0 && (
              <DetailSection title="Costituiscono un plus">
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700">
                  {job.plus.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </DetailSection>
            )}

            {job.whatWeOffer && job.whatWeOffer.length > 0 && (
              <DetailSection title="Cosa offriamo">
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-slate-700">
                  {job.whatWeOffer.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </DetailSection>
            )}

            <DetailSection title="Note sulla candidatura">
              <p className="text-sm text-slate-700">
                Compila il form accanto per candidarti direttamente a questa
                posizione, allegando il tuo <strong>CV in formato PDF</strong>.
                Se hai anche un portfolio o casi studio, puoi citarli nella
                presentazione o inserire link esterni.
              </p>
            </DetailSection>
          </div>

          {/* Colonna destra: form candidatura per questa posizione */}
          <aside className="lg:sticky lg:top-24 h-full">
            <div className="h-full rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm flex flex-col">
              <h2 className="text-base sm:text-lg font-semibold tracking-tight text-slate-900">
                Candidati per questa posizione
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Compila il form con i tuoi dati e allega il{" "}
                <strong>CV in PDF</strong>. La candidatura verrà associata alla
                posizione: <strong>{job.title}</strong>.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-5 space-y-4 flex-1 flex flex-col"
              >
                <div className="space-y-4">
                  {/* Posizione (read-only) */}
                  <div>
                    <label className="block text-xs font-medium text-slate-600">
                      Posizione
                    </label>
                    <input
                      type="text"
                      value={job.title}
                      readOnly
                      className="input mt-1 bg-slate-50 text-xs"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Nome *" name="nome" type="text" required />
                    <Field
                      label="Cognome *"
                      name="cognome"
                      type="text"
                      required
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Email *" name="email" type="email" required />
                    <Field
                      label="Telefono"
                      name="telefono"
                      type="tel"
                      required={false}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      CV (PDF, max 10 MB) *
                    </label>
                    <input
                      name="cv"
                      type="file"
                      accept=".pdf"
                      required
                      className="mt-1 block w-full text-sm text-slate-600 file:mr-3 file:rounded-full file:border-0 file:bg-emerald-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-emerald-700 hover:file:bg-emerald-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Breve presentazione
                    </label>
                    <textarea
                      name="presentazione"
                      rows={4}
                      className="input mt-1"
                      placeholder="Raccontaci il tuo percorso, le esperienze più rilevanti per questo ruolo e cosa ti piacerebbe seguire in Polinex…"
                    />
                  </div>

                  <div className="flex items-start gap-2 pt-2">
                    <input
                      id="privacy"
                      name="privacy"
                      type="checkbox"
                      required
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <label
                      htmlFor="privacy"
                      className="text-xs text-slate-600 leading-relaxed"
                    >
                      Acconsento al trattamento dei dati ai sensi del
                      Regolamento (UE) 2016/679 ai fini esclusivi della
                      valutazione della candidatura per la posizione indicata.
                    </label>
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="submit"
                    className="btn-primary inline-flex w-full items-center justify-center gap-2"
                  >
                    Invia candidatura
                    <Send className="h-4 w-4" />
                  </button>

                  <p className="mt-3 text-[11px] text-slate-500">
                    I dati inviati saranno trattati esclusivamente per la
                    valutazione della candidatura e conservati per il periodo
                    strettamente necessario alla selezione.
                  </p>
                </div>
              </form>
            </div>
          </aside>
        </section>

        {/* CTA finale (stile come pagina "Chi siamo") */}
        <section className="mx-auto max-w-7xl pb-20 mt-10">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10 text-center">
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
              Non è la posizione perfetta?
            </h3>
            <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
              Accettiamo anche candidature spontanee: raccontaci area di
              interesse, esperienze rilevanti e disponibilità. Valuteremo il tuo
              profilo anche al di fuori delle ricerche attive.
            </p>

            <Link
              href="/lavora-con-noi"
              className="mt-6 inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-white font-medium hover:bg-emerald-700"
            >
              Invia una candidatura spontanea
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      {/* Stili globali per titoli + input/bottoni */}
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
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid #cbd5e1;
          padding: 0.55rem 0.8rem;
          font-size: 0.875rem;
        }
        .input:focus {
          border-color: #059669;
          outline: none;
          box-shadow: 0 0 0 1px #059669;
        }
        .btn-primary {
          background: #059669;
          color: white;
          padding: 0.65rem 1.4rem;
          border-radius: 999px;
          font-weight: 600;
        }
        .btn-primary:hover {
          background: #047857;
        }
      `}</style>
    </div>
  );
}

/* ========== Componenti di supporto ========== */

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <h2 className="text-sm sm:text-base font-semibold tracking-tight text-slate-900 flex items-center gap-2">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50">
          <Check className="h-3.5 w-3.5 text-emerald-600" />
        </span>
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="input mt-1"
      />
    </div>
  );
}
