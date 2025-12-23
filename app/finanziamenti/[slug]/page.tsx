// app/finanziamenti/[slug]/page.tsx
"use client";

import type React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  Building2,
  Calendar,
  ExternalLink,
  FileDown,
  MapPin,
  Wallet,
  Youtube,
} from "lucide-react";

import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

import { getGrantBySlug, type Status, type Grant } from "../_data";

/* ===== Utils ===== */
function fmtDate(iso?: string) {
  if (!iso) return "A sportello";
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString("it-IT");
}

function statusBadgeClass(s: Status) {
  switch (s) {
    case "Aperti":
      return "text-emerald-700 bg-emerald-50 ring-emerald-100";
    case "In programma":
      return "text-amber-800 bg-amber-50 ring-amber-100";
    case "Chiusi":
    default:
      return "text-slate-700 bg-slate-100 ring-slate-200";
  }
}

/* ===== Pagina dettaglio bando (client) ===== */
export default function GrantPage() {
  const params = useParams<{ slug: string | string[] }>();
  const router = useRouter();

  const rawSlug = params?.slug;
  const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

  const grant: Grant | undefined = slug ? getGrantBySlug(slug) : undefined;

  // Se non trovo il bando → messaggio pulito, niente 404 di Next
  if (!grant) {
    return (
      <div className="min-h-screen flex flex-col bg-white text-slate-900">
        <Nav />
        <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
          <button
            type="button"
            onClick={() => router.push("/finanziamenti")}
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Torna ai bandi
          </button>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
            <h1 className="text-2xl font-semibold text-slate-900">
              Bando non trovato
            </h1>
            <p className="mt-3 text-sm text-slate-600">
              Il bando che stai cercando non è stato trovato. Verifica che
              l&apos;indirizzo sia corretto oppure torna all&apos;elenco
              completo dei bandi e finanziamenti.
            </p>
            <Link
              href="/finanziamenti"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Vai all&apos;elenco bandi
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const g = grant;

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Nav />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 flex-1">
        {/* breadcrumb + back */}
        <div className="flex flex-col gap-3 mb-4">
          <button
            type="button"
            onClick={() => router.push("/finanziamenti")}
            className="inline-flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 w-fit"
          >
            <ArrowLeft className="h-3 w-3" />
            <span>Torna ai bandi</span>
          </button>

          <nav className="text-xs sm:text-sm text-slate-600">
            <Link className="hover:underline" href="/">
              Home
            </Link>{" "}
            <span className="mx-1">/</span>
            <Link className="hover:underline" href="/finanziamenti">
              Bandi e Finanziamenti
            </Link>{" "}
            <span className="mx-1">/</span>
            <span className="text-slate-900">{g.title}</span>
          </nav>
        </div>

        {/* header */}
        <header className="mt-1">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              {g.title}
            </h1>
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${statusBadgeClass(
                g.stato
              )}`}
            >
              {g.stato}
            </span>
          </div>

          {/* Aree di riferimento */}
          {Array.isArray(g.aree) && g.aree.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {g.aree.map((area) => (
                <span
                  key={area}
                  className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700"
                >
                  {area}
                </span>
              ))}
            </div>
          )}

          {(g.description || g.teaser) && (
            <p className="mt-3 max-w-3xl text-slate-700 text-sm sm:text-base">
              {g.description || g.teaser}
            </p>
          )}
        </header>

        {/* meta principali */}
        <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
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
        </section>

        {/* contenuti + sidebar CTA */}
        <section className="mt-8 grid md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Documenti e risorse
              </h2>
              <div className="mt-3 grid gap-3">
                {g.pdfHref && (
                  <a
                    href={g.pdfHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:shadow-md"
                  >
                    <span className="inline-flex items-center gap-2">
                      <FileDown className="h-5 w-5 text-slate-600" />
                      <span className="font-medium text-sm">
                        Scarica scheda tecnica (PDF)
                      </span>
                    </span>
                    <ArrowRight className="h-5 w-5 text-slate-500" />
                  </a>
                )}

                {g.officialUrl && (
                  <a
                    href={g.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:shadow-md"
                  >
                    <span className="inline-flex items-center gap-2">
                      <ExternalLink className="h-5 w-5 text-slate-600" />
                      <span className="font-medium text-sm">
                        Vai alla pagina ufficiale del bando
                      </span>
                    </span>
                    <ArrowRight className="h-5 w-5 text-slate-500" />
                  </a>
                )}
              </div>
            </div>

            {g.youtubeId && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-slate-900">
                  Video pillola
                </h3>
                <div
                  className="mt-3 relative w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm"
                  style={{ aspectRatio: "16/9" }}
                >
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${g.youtubeId}`}
                    title={`YouTube: ${g.title}`}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <p className="mt-2 inline-flex items-center gap-1 text-xs text-slate-500">
                  <Youtube className="h-3.5 w-3.5" /> Spieghiamo il bando in
                  pochi minuti.
                </p>
              </div>
            )}
          </div>

          {/* Sidebar CTA */}
          <aside className="md:col-span-1">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-base font-semibold text-slate-900">
                Ti serve assistenza?
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Supporto su <strong>ammissibilità</strong>,{" "}
                <strong>domanda</strong>, <strong>piano spese</strong> e{" "}
                <strong>rendicontazione</strong>.
              </p>
              <Link
                href="/contatti"
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-white font-medium hover:bg-emerald-700"
              >
                Parla con un consulente
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </aside>
        </section>

        {/* back link in fondo */}
        <section className="mt-10">
          <Link
            href="/finanziamenti"
            className="inline-flex items-center gap-2 text-sm text-slate-700 hover:text-slate-900"
          >
            ← Torna ai bandi
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* ===== tiny UI ===== */
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
    <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
      {icon}
      <div>
        <div className="text-[11px] uppercase tracking-widest text-slate-500">
          {label}
        </div>
        <div className="text-slate-800 text-sm">{value}</div>
      </div>
    </div>
  );
}
