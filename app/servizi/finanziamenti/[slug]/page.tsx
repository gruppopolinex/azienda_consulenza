// app/servizi/finanziamenti/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Calendar,
  ExternalLink,
  FileDown,
  MapPin,
  Wallet,
  Youtube,
} from "lucide-react";
import type { ReactNode } from "react";

import { getGrantBySlug, type Status } from "../_data";

// Layout (client components)
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";

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

/* ===== SEO ===== */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const g = getGrantBySlug(params.slug);
  if (!g) return {};

  const title = `${g.title} — Bandi e Finanziamenti | Polinex srl`;
  const description = (g.description || g.teaser || "").slice(0, 160);

  return {
    title,
    description,
    alternates: { canonical: `/servizi/finanziamenti/${g.slug}` },
    openGraph: { title, description },
  };
}

/* ===== Pagina dettaglio ===== */
export default async function GrantPage({
  params,
}: {
  params: { slug: string };
}) {
  const g = getGrantBySlug(params.slug);

  if (!g) {
    notFound();
  }

  return (
    <>
      <Nav />

      <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
        {/* breadcrumb */}
        <nav className="text-sm text-slate-600">
          <Link className="hover:underline" href="/">
            Home
          </Link>{" "}
          <span className="mx-1">/</span>
          <Link className="hover:underline" href="/servizi/finanziamenti">
            Bandi e Finanziamenti
          </Link>{" "}
          <span className="mx-1">/</span>
          <span className="text-slate-900">{g.title}</span>
        </nav>

        {/* header */}
        <header className="mt-3">
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
            <p className="mt-3 max-w-3xl text-slate-700">
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
        <section className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h2 className="text-lg font-medium">Documenti e risorse</h2>
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
                    <span className="font-medium">
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
                    <span className="font-medium">
                      Vai alla pagina ufficiale del bando
                    </span>
                  </span>
                  <ArrowRight className="h-5 w-5 text-slate-500" />
                </a>
              )}
            </div>

            {g.youtubeId && (
              <div className="mt-8">
                <h3 className="text-base font-medium">Video pillola</h3>
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
              <h3 className="text-base font-semibold">Ti serve assistenza?</h3>
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

        {/* back link */}
        <section className="mt-10">
          <Link
            href="/servizi/finanziamenti"
            className="inline-flex items-center gap-2 text-sm text-slate-700 hover:text-slate-900"
          >
            ← Torna ai bandi
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}

/* ===== tiny UI ===== */
function Meta({
  icon,
  label,
  value,
}: {
  icon?: ReactNode;
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
        <div className="text-slate-800">{value}</div>
      </div>
    </div>
  );
}
