// app/servizi/finanziamenti/page.tsx
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Calendar,
  Building2,
  Wallet,
  MapPin,
  Filter,
  Tag,
} from "lucide-react";

import {
  GRANTS,
  type Grant,
  type Status,
  ALL_AREAS,
  type Area,
} from "./_data";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

/* ===================== Utils ===================== */
function fmtDate(iso?: string) {
  if (!iso) return "A sportello";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString("it-IT");
}
function statusClasses(s: Status) {
  switch (s) {
    case "Aperti":
      return "text-emerald-700 bg-emerald-50 ring-emerald-100";
    case "In programma":
      return "text-amber-700 bg-amber-50 ring-amber-100";
    case "Chiusi":
    default:
      return "text-slate-700 bg-slate-100 ring-slate-200";
  }
}

/* ===================== Pagina ===================== */
export default function FinanziamentiPage() {
  const [status, setStatus] = useState<Status | "Tutti">("Aperti");
  const [query, setQuery] = useState("");
  const [selectedAreas, setSelectedAreas] = useState<Area[]>([]);

  const toggleArea = (area: Area) => {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  const resetAreas = () => setSelectedAreas([]);

  const list = useMemo(() => {
    let arr: Grant[] = [...GRANTS];

    // Filtro per stato
    if (status !== "Tutti") {
      arr = arr.filter((g) => g.stato === status);
    }

    // Filtro per aree (multi-selezione)
    if (selectedAreas.length > 0) {
      arr = arr.filter((g) => g.aree.some((a) => selectedAreas.includes(a)));
    }

    // Filtro testuale
    if (query.trim()) {
      const q = query.toLowerCase();
      arr = arr.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.ente.toLowerCase().includes(q) ||
          g.beneficiari.toLowerCase().includes(q) ||
          (g.territorio || "").toLowerCase().includes(q)
      );
    }

    // Ordina per scadenza (più vicina prima), poi alfabetico
    return arr.sort((a, b) => {
      const da = a.scadenza ? +new Date(a.scadenza) : Infinity;
      const db = b.scadenza ? +new Date(b.scadenza) : Infinity;
      if (da !== db) return da - db;
      return a.title.localeCompare(b.title);
    });
  }, [status, query, selectedAreas]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Nav />

      {/* 👇 stessa distanza dalla nav delle altre pagine: py-2 / sm:py-3 */}
      <main className="flex-grow mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
        {/* Header con logo + titolo come le altre pagine servizi */}
        <header className="text-center max-w-3xl mx-auto">
          <div className="flex justify-center mb-0">
            {/* 👇 stesso blocco logo usato in /servizi/acqua ecc. */}
            <div className="relative w-40 h-16 sm:w-56 sm:h-24">
              <Image
                src="/logo.png"
                alt="Polinex"
                fill
                className="object-contain"
              />
            </div>
          </div>

          <h1 className="section-title">Bandi e Finanziamenti</h1>

          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Selezione di opportunità per imprese, PA e realtà agricole.
            Filtra per stato, area tecnica e cerca per nome, ente o beneficiari.
          </p>
        </header>

        {/* Filtri */}
        <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-5">
          {/* Stato + ricerca */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Tabs stato */}
            <div className="flex flex-wrap items-center gap-2">
              {(["Aperti", "In programma", "Chiusi"] as Status[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={[
                    "rounded-full px-4 py-2 text-sm border transition",
                    status === s
                      ? "border-emerald-600 text-emerald-700 bg-emerald-50"
                      : "border-slate-300 text-slate-700 hover:bg-slate-50",
                  ].join(" ")}
                >
                  {s}
                </button>
              ))}
              <button
                onClick={() => setStatus("Tutti")}
                className={[
                  "rounded-full px-4 py-2 text-sm border transition",
                  status === "Tutti"
                    ? "border-slate-900 text-slate-900 bg-slate-100"
                    : "border-slate-300 text-slate-700 hover:bg-slate-50",
                ].join(" ")}
              >
                Tutti
              </button>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-80">
              <input
                type="search"
                placeholder="Cerca bandi (nome, ente, beneficiari)…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3 py-2 pl-9 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                aria-label="Cerca bandi"
              />
              <Filter className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
            </div>
          </div>

          {/* Filtri per area (multi-select) */}
          <div className="border-t border-slate-100 pt-4">
            <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
              <Tag className="h-4 w-4 text-slate-500" />
              <span>Aree tecniche</span>
              {selectedAreas.length > 0 && (
                <button
                  type="button"
                  onClick={resetAreas}
                  className="ml-2 text-xs text-emerald-700 hover:underline"
                >
                  Pulisci selezione
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {ALL_AREAS.map((area) => {
                const active = selectedAreas.includes(area);
                return (
                  <button
                    key={area}
                    type="button"
                    onClick={() => toggleArea(area)}
                    className={[
                      "rounded-full px-3 py-1.5 text-xs sm:text-sm border transition",
                      active
                        ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                        : "border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100",
                    ].join(" ")}
                  >
                    {area}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Lista bandi */}
        <section className="mt-8 grid grid-cols-1 gap-4">
          {list.map((g) => (
            <GrantRow key={g.slug} g={g} />
          ))}

          {!list.length && (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-slate-600">
              Nessun bando trovato con i filtri attuali.
            </div>
          )}
        </section>

        {/* CTA finale */}
        <section className="mt-14">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center shadow-sm">
            <h3 className="text-2xl font-semibold tracking-tight">
              Hai trovato un bando interessante?
            </h3>
            <p className="mt-3 text-slate-600">
              Polinex ti supporta in <strong>scouting</strong>,{" "}
              <strong>domanda</strong>, <strong>piano spese</strong> e{" "}
              <strong>rendicontazione</strong>.
            </p>
            <Link
              href="/contatti"
              className="mt-6 inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-white font-medium hover:bg-emerald-700"
            >
              Richiedi una valutazione preliminare{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      {/* stessa definizione section-title usata nelle altre pagine */}
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

/* ===================== Componenti ===================== */
function GrantRow({ g }: { g: Grant }) {
  return (
    <Link
      href={`/servizi/finanziamenti/${g.slug}`}
      className="group rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
      aria-label={`Vai al dettaglio del bando: ${g.title}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="min-w-0 flex-1">
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-emerald-700">
            {g.title}
          </h3>

          {/* Meta principali */}
          <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-[15px] text-slate-800">
            <Meta
              icon={<Building2 className="h-4 w-4" />}
              label="Ente"
              value={g.ente}
            />
            <Meta
              icon={<Wallet className="h-4 w-4" />}
              label="Contributo"
              value={g.contributo}
            />
            <Meta label="Beneficiari" value={g.beneficiari} />
            <Meta
              icon={<Calendar className="h-4 w-4" />}
              label="Scadenza"
              value={fmtDate(g.scadenza)}
            />
            {g.territorio && (
              <Meta
                icon={<MapPin className="h-4 w-4" />}
                label="Territorio"
                value={g.territorio}
              />
            )}
          </div>

          {/* Aree di intervento */}
          {g.aree?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {g.aree.map((area) => (
                <span
                  key={area}
                  className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 px-2.5 py-0.5 text-[11px] font-medium"
                >
                  {area}
                </span>
              ))}
            </div>
          )}

          {g.teaser && (
            <p className="mt-2 text-sm text-slate-600">{g.teaser}</p>
          )}
        </div>

        <div className="flex flex-row sm:flex-col items-center justify-between gap-3 sm:items-end">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${statusClasses(
              g.stato
            )}`}
          >
            {g.stato}
          </span>
          <ArrowRight className="h-5 w-5 text-emerald-600 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition" />
        </div>
      </div>
    </Link>
  );
}

function Meta({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="inline-flex items-center gap-2">
      {icon}
      <span className="font-semibold">{label}:</span>
      <span className="text-slate-800">{value}</span>
    </div>
  );
}
