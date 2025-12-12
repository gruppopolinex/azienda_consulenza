// app/lavora-con-noi/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Briefcase,
  GraduationCap,
  Clock,
  MapPin,
  Send,
  Filter,
  ChevronRight,
} from "lucide-react";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

import { JOBS } from "./_data";

/* ========= Utils per filtri ========= */

type ContractFilter =
  | "Tutti"
  | "Stage"
  | "Apprendistato"
  | "Determinato"
  | "Indeterminato"
  | "Partita IVA";

const CONTRACT_FILTER_OPTIONS: ContractFilter[] = [
  "Tutti",
  "Stage",
  "Apprendistato",
  "Determinato",
  "Indeterminato",
  "Partita IVA",
];

function getCityFromLocation(location: string): string {
  // Es. "Padova (PD)" -> "Padova"
  const beforeBracket = location.split("(")[0];
  return beforeBracket.split("–")[0].split("-")[0].trim();
}

function getContractCategory(contract: string): ContractFilter | "Altro" {
  const v = contract.toLowerCase();
  if (v.includes("stage")) return "Stage";
  if (v.includes("apprendistato")) return "Apprendistato";
  if (v.includes("determinato")) return "Determinato";
  if (v.includes("indeterminato")) return "Indeterminato";
  if (v.includes("p.iva") || v.includes("partita iva") || v.includes("piva"))
    return "Partita IVA";
  return "Altro";
}

/* ========= Pagina ========= */

export default function LavoraConNoiPage() {
  const ADDRESS = "Via Esempio 123, 35100 Padova (PD)";

  // Filtri posizioni aperte
  const [sectorFilter, setSectorFilter] = useState<string>("Tutti");
  const [cityFilter, setCityFilter] = useState<string>("Tutte");
  const [contractFilter, setContractFilter] = useState<ContractFilter>("Tutti");

  // Settori derivati dai dati (job.areas o job.area)
  const sectors = useMemo(() => {
    const set = new Set<string>();
    JOBS.forEach((job) => {
      const areas: string[] =
        (job as any).areas ??
        ((job as any).area ? [(job as any).area as string] : []);
      areas.forEach((a) => {
        if (a) set.add(a);
      });
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  // Città derivate da location
  const cities = useMemo(() => {
    const set = new Set<string>();
    JOBS.forEach((job) => {
      if (job.location) set.add(getCityFromLocation(job.location));
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  const filteredJobs = useMemo(() => {
    return JOBS.filter((job) => {
      const anyJob = job as any;

      // Settore
      const areas: string[] =
        anyJob.areas ?? (anyJob.area ? [anyJob.area as string] : []);
      const sectorMatch =
        sectorFilter === "Tutti" ||
        areas.some((a: string) => a === sectorFilter);

      // Città
      const city = getCityFromLocation(job.location);
      const cityMatch = cityFilter === "Tutte" || city === cityFilter;

      // Tipo contratto (categoria)
      const category = getContractCategory(job.contract ?? "");
      const contractMatch =
        contractFilter === "Tutti" || category === contractFilter;

      return sectorMatch && cityMatch && contractMatch;
    });
  }, [sectorFilter, cityFilter, contractFilter]);

  const handleSpontaneousSubmit: React.FormEventHandler<HTMLFormElement> = (
    e
  ) => {
    e.preventDefault();
    // Qui potrai agganciare la logica reale (API / servizio esterno)
    console.log("Spontaneous application submitted");
  };

  return (
    <>
      <Nav />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
        {/* HERO - Logo + titolo + sottotitolo */}
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

          <h1 className="section-title">Lavora con noi</h1>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Cerchiamo persone curiose, precise e abituate a lavorare a contatto
            con <strong>imprese</strong>, <strong>PA</strong> e{" "}
            <strong>territorio</strong>. Se ti occupi di progettazione,
            permitting o gestione di cantieri, raccontaci chi sei: puoi inviare
            una <strong>candidatura spontanea</strong> e, se lo desideri,
            approfondire le posizioni aperte.
          </p>
        </section>

        {/* Perché lavorare con noi */}
        <section className="mt-10 sm:mt-12">
          <div className="grid gap-6 md:grid-cols-3">
            <ValueCard
              icon={<Briefcase className="h-5 w-5 text-emerald-600" />}
              title="Progetti concreti"
              text="Impatto diretto su clienti e territorio in ambito tecnico e autorizzativo."
            />
            <ValueCard
              icon={<GraduationCap className="h-5 w-5 text-emerald-600" />}
              title="Crescita tecnica"
              text="Formazione continua, supporto da senior e responsabilità graduale."
            />
            <ValueCard
              icon={<Clock className="h-5 w-5 text-emerald-600" />}
              title="Organizzazione & flessibilità"
              text="Attenzione al benessere e all’equilibrio lavoro-vita."
            />
          </div>
        </section>

        {/* Posizioni aperte + candidatura spontanea */}
        <section className="mt-12 sm:mt-14 pb-16 sm:pb-20">
          {/* ✅ IMPORTANTISSIMO: items-stretch + min-h-0 per permettere lo “shrink” */}
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)] lg:items-stretch">
            {/* Sinistra: posizioni aperte (stessa altezza della card destra) */}
            <div className="h-full min-h-0">
              {/* ✅ h-full + min-h-0 + flex-col: non deve “spingere” la riga */}
              <div className="h-full min-h-0 rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
                      Posizioni aperte
                    </h2>
                    <p className="mt-1 text-sm text-slate-600 max-w-xl">
                      Clicca sulla posizione per leggere i dettagli e inviare la
                      candidatura. Usa i filtri per settore, città e tipo di
                      contratto.
                    </p>
                  </div>
                  <Filter className="hidden sm:block h-5 w-5 text-slate-400 mt-1" />
                </div>

                {/* Filtri posizioni */}
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Settore
                    </label>
                    <select
                      className="input text-xs"
                      value={sectorFilter}
                      onChange={(e) => setSectorFilter(e.target.value)}
                    >
                      <option value="Tutti">Tutti i settori</option>
                      {sectors.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Città
                    </label>
                    <select
                      className="input text-xs"
                      value={cityFilter}
                      onChange={(e) => setCityFilter(e.target.value)}
                    >
                      <option value="Tutte">Tutte le città</option>
                      {cities.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">
                      Tipo di contratto
                    </label>
                    <select
                      className="input text-xs"
                      value={contractFilter}
                      onChange={(e) =>
                        setContractFilter(e.target.value as ContractFilter)
                      }
                    >
                      {CONTRACT_FILTER_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt === "Tutti" ? "Tutti i contratti" : opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* ✅ “Carosello verticale”: scroll SOLO qui.
                    ✅ min-h-0 è fondamentale per farlo funzionare davvero. */}
                <div className="mt-4 flex-1 min-h-0 overflow-y-auto pr-1 space-y-3">
                  {filteredJobs.length === 0 && (
                    <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
                      Nessuna posizione trovata con i filtri selezionati. Prova a
                      modificare settore, città o tipo di contratto.
                    </div>
                  )}

                  {filteredJobs.map((job) => (
                    <JobCard
                      key={job.slug}
                      slug={job.slug}
                      title={job.title}
                      location={job.location}
                      level={job.level}
                      focus={job.intro}
                      contract={job.contract}
                    />
                  ))}
                </div>

                <p className="mt-3 text-[11px] text-slate-500">
                  Se non trovi una posizione in linea con il tuo profilo, puoi
                  comunque inviare una <strong>candidatura spontanea</strong>{" "}
                  tramite il modulo qui a fianco.
                </p>
              </div>
            </div>

            {/* Destra: form candidatura spontanea (altezza naturale, tutto dentro, NO scroll interno) */}
            <div className="h-full min-h-0">
              {/* ✅ h-full per “agganciare” lo stretch della grid */}
              <div className="h-full rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col">
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
                  Candidatura spontanea
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Compila il form per inviare una{" "}
                  <strong>candidatura spontanea</strong>. Indica l&apos;area
                  tecnica in cui ti riconosci, le esperienze principali e allega
                  il tuo <strong>CV in formato PDF</strong>.
                </p>

                <form className="mt-6 space-y-4" onSubmit={handleSpontaneousSubmit}>
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
                      Area / ruolo di interesse *
                    </label>
                    <input
                      name="area"
                      type="text"
                      required
                      className="input mt-1"
                      placeholder="Es. Project engineer acqua, consulente bandi, tecnico sicurezza…"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Breve presentazione *
                    </label>
                    <textarea
                      name="presentazione"
                      rows={5}
                      required
                      className="input mt-1"
                      placeholder="Raccontaci il tuo percorso, le esperienze più rilevanti e cosa ti piacerebbe seguire in Polinex…"
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
                      valutazione della candidatura.
                    </label>
                  </div>

                  <div className="mt-4">
                    <button
                      type="submit"
                      className="btn-primary inline-flex w-full items-center justify-center gap-2"
                    >
                      Invia candidatura spontanea
                      <Send className="h-4 w-4" />
                    </button>

                    <p className="mt-3 text-[11px] text-slate-500">
                      I dati inviati saranno utilizzati solo per la selezione e
                      potranno essere considerati anche per future opportunità
                      coerenti con il tuo profilo.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Riga indirizzo / nota finale */}
          <div className="mt-10 flex flex-wrap items-center gap-3 text-xs text-slate-500">
            <MapPin className="h-4 w-4 text-slate-400" />
            <span>Sede principale: {ADDRESS}</span>
            <span className="hidden sm:inline">•</span>
            <span>
              Possibili attività in presenza, in smart working e presso clienti
              / cantieri, in funzione del ruolo.
            </span>
          </div>

          {/* CTA finale: sedi / coworking (stile come pagina "Chi siamo") */}
          <section className="mx-auto max-w-7xl pb-20 mt-10">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10 text-center">
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
                Vuoi vedere dove lavoriamo?
              </h3>
              <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
                Scopri le nostre sedi e gli spazi in cui lavoriamo ogni giorno,
                tra ufficio, incontri con i clienti e momenti di collaborazione.
              </p>
              <Link
                href="/coworking"
                className="mt-6 inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-white font-medium hover:bg-emerald-700"
              >
                Vedi le nostre sedi
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </section>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        .section-title {
          font-size: clamp(1.5rem, 2.4vw, 2.5rem);
          font-weight: 600;
          letter-spacing: -0.01em;
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
    </>
  );
}

/* ========= Componenti di supporto ========= */

type FieldProps = {
  label: string;
  name: string;
  type: string;
  required?: boolean;
};

function Field({ label, name, type, required }: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <input name={name} type={type} required={required} className="input mt-1" />
    </div>
  );
}

type ValueCardProps = {
  icon: React.ReactNode;
  title: string;
  text: string;
};

function ValueCard({ icon, title, text }: ValueCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-50">
          {icon}
        </div>
        <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
          {title}
        </h3>
      </div>
      <p className="mt-3 text-sm text-slate-600">{text}</p>
    </article>
  );
}

type JobCardProps = {
  slug: string;
  title: string;
  location: string;
  level: string;
  focus: string;
  contract?: string;
};

function JobCard({
  slug,
  title,
  location,
  level,
  focus,
  contract,
}: JobCardProps) {
  const city = getCityFromLocation(location);
  const contractLabel = contract ? getContractCategory(contract) : undefined;

  return (
    <Link
      href={`/lavora-con-noi/${slug}`}
      className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition group"
      aria-label={`Dettaglio posizione: ${title}`}
    >
      <h3 className="text-sm sm:text-base font-semibold tracking-tight text-slate-900 group-hover:text-emerald-700">
        {title}
      </h3>
      <div className="mt-1 flex flex-wrap gap-2 text-[11px] text-slate-600">
        <span>{level}</span>
        <span>•</span>
        <span>{city}</span>
        {contractLabel && contractLabel !== "Altro" && (
          <>
            <span>•</span>
            <span>{contractLabel}</span>
          </>
        )}
      </div>
      <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2">
        {focus}
      </p>
      <span className="mt-3 inline-flex text-[11px] font-semibold text-emerald-700">
        Scopri di più →
      </span>
    </Link>
  );
}
