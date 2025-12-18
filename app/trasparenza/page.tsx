// app/trasparenza/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import {
  Building2,
  FileText,
  Download,
  ChevronRight,
  TrendingUp,
  Wallet,
  Landmark,
  BadgeCheck,
  Leaf,
  Zap,
  HardHat,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { trasparenzaData } from "./_data";

export default function TrasparenzaPage() {
  // ----- Documenti: selezione anno -----
  const years = trasparenzaData.documents?.years ?? [];
  const defaultYear = years[0] ?? "";
  const [selectedYear, setSelectedYear] = useState<string>(defaultYear);

  const docsForYear = useMemo(() => {
    const byYear = (trasparenzaData.documents?.byYear?.[selectedYear] ??
      []) as Array<{ id: string; label: string; href: string; note?: string }>;
    const staticDocs = (trasparenzaData.documents?.static ??
      []) as Array<{ id: string; label: string; href: string; note?: string }>;
    return { byYear, staticDocs };
  }, [selectedYear]);

  // ----- Certificazioni: KPI sopra la card coerente (stessa colonna) -----
  const certKpis = trasparenzaData.sections.certifications.kpis ?? [];
  const certCards = trasparenzaData.sections.certifications.cards ?? [];

  // Ordine desiderato delle aree KPI (coerente con la tua UI)
  const orderedAreaIds = ["ambiente", "energia", "sicurezza", "audit"] as const;

  const orderedKpis = useMemo(() => {
    // se in _data.ts arrivano già in ordine perfetto, non cambia nulla.
    // altrimenti forziamo l’ordine coerente con le aree.
    const map = new Map(certKpis.map((k) => [k.id, k]));
    const forced = orderedAreaIds.map((id) => map.get(id)).filter(Boolean) as typeof certKpis;
    return forced.length ? forced : certKpis;
  }, [certKpis]);

  const certForKpi = useMemo(() => {
    /**
     * Data-driven consigliato:
     * - in _data.ts aggiungi a ogni cert: areaId: "ambiente" | "energia" | "sicurezza" | "audit"
     * - così il matching è perfetto e stabile.
     *
     * Fallback:
     * - se areaId non c’è ancora, abbiniamo per indice (0..3).
     */
    return orderedKpis.map((k, idx) => {
      const byArea = certCards.find((c: any) => c.areaId === k.id);
      return byArea ?? certCards[idx] ?? null;
    });
  }, [orderedKpis, certCards]);

  return (
    <>
      <Nav />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
        {/* HERO */}
        <header className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center mb-0">
            <div className="relative w-40 h-16 sm:w-56 sm:h-24">
              <Image
                src={trasparenzaData.hero.logoSrc}
                alt={trasparenzaData.hero.logoAlt}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <h1 className="section-title">{trasparenzaData.hero.title}</h1>
          <p className="mt-4 text-slate-600 leading-relaxed">
            {trasparenzaData.hero.subtitle}
          </p>
        </header>

        {/* SEZIONE 1 */}
        <section className="mt-20">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            {trasparenzaData.sections.company.title}
          </h2>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl">
            {trasparenzaData.sections.company.description}
          </p>

          {/* KPI FINANZIARI */}
          <KpiRow className="mt-6" kpis={trasparenzaData.sections.company.kpis} />

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* Dati societari */}
            <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
                <Building2 className="h-4 w-4" />
                {trasparenzaData.sections.company.cards.companyData.badge}
              </div>

              <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700">
                {trasparenzaData.sections.company.cards.companyData.fields.map((f) => (
                  <div key={f.key}>
                    <dt className="font-semibold">{f.label}</dt>
                    <dd className="mt-0.5 break-words">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </article>

            {/* Documenti */}
            <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-3 py-1 text-xs font-medium">
                <FileText className="h-4 w-4" />
                {trasparenzaData.sections.company.cards.documents.badge}
              </div>

              <p className="mt-4 text-sm text-slate-600">
                {trasparenzaData.sections.company.cards.documents.description}
              </p>

              {years.length > 0 && (
                <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <div className="text-sm font-medium text-slate-800">
                    {trasparenzaData.sections.company.cards.documents.yearPickerLabel}
                  </div>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="w-full sm:w-auto rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-200"
                    aria-label={trasparenzaData.sections.company.cards.documents.yearPickerLabel}
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                  <div className="text-xs text-slate-500">
                    {trasparenzaData.sections.company.cards.documents.yearPickerHelper}
                  </div>
                </div>
              )}

              <div className="mt-6 space-y-6">
                {years.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {trasparenzaData.sections.company.cards.documents.byYearTitle}{" "}
                      {selectedYear}
                    </div>
                    <ul className="mt-3 space-y-3 text-sm">
                      {docsForYear.byYear.map((doc) => (
                        <DocumentLink
                          key={`${selectedYear}-${doc.id}`}
                          label={doc.label}
                          href={doc.href}
                          year={selectedYear}
                          note={doc.note}
                        />
                      ))}
                    </ul>
                  </div>
                )}

                {docsForYear.staticDocs.length > 0 && (
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {trasparenzaData.sections.company.cards.documents.staticTitle}
                    </div>
                    <ul className="mt-3 space-y-3 text-sm">
                      {docsForYear.staticDocs.map((doc) => (
                        <DocumentLink
                          key={`static-${doc.id}`}
                          label={doc.label}
                          href={doc.href}
                          note={doc.note}
                        />
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {trasparenzaData.sections.company.cards.documents.footerNote && (
                <p className="mt-4 text-xs text-slate-500">
                  {trasparenzaData.sections.company.cards.documents.footerNote}
                </p>
              )}
            </article>
          </div>
        </section>

        {/* SEZIONE 2 – CERTIFICAZIONI */}
        <section className="mt-24">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            {trasparenzaData.sections.certifications.title}
          </h2>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl">
            {trasparenzaData.sections.certifications.description}
          </p>

          {/* ✅ Griglia: KPI sopra la sua card coerente */}
          <div className="mt-8 grid gap-6 lg:grid-cols-4">
            {orderedKpis.map((kpi, idx) => {
              const cert = certForKpi[idx];
              return (
                <div key={kpi.id} className="flex flex-col gap-4">
                  <KpiMiniCard kpi={kpi} />
                  {cert ? (
                    <CertificationCard cert={cert} />
                  ) : (
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                      <div className="text-sm font-semibold text-slate-900">
                        Certificazione non disponibile
                      </div>
                      <p className="mt-2 text-sm text-slate-600">
                        Aggiungi la card in <code>_data.ts</code> (sezione
                        certificazioni).
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-0 sm:px-0 lg:px-0 pb-20 mt-16">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10 text-center">
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
              {trasparenzaData.cta.title}
            </h3>
            <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
              {trasparenzaData.cta.description}
            </p>
            <Link
              href={trasparenzaData.cta.href}
              className="mt-6 inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-white font-medium hover:bg-emerald-700"
            >
              {trasparenzaData.cta.buttonLabel}
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
    </>
  );
}

/* ========== SUPPORT ========== */

function DocumentLink({
  label,
  href,
  year,
  note,
}: {
  label: string;
  href: string;
  year?: string;
  note?: string;
}) {
  return (
    <li className="flex items-start justify-between gap-3">
      <div>
        <div className="font-medium text-slate-800">{label}</div>
        {year && (
          <div className="text-xs text-slate-500 mt-0.5">
            {trasparenzaData.ui.documentYearPrefix} {year}
          </div>
        )}
        {note && <div className="text-xs text-slate-500 mt-0.5">{note}</div>}
      </div>
      <Link
        href={href}
        className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
      >
        <Download className="h-3 w-3" />
        PDF
      </Link>
    </li>
  );
}

function KpiRow({
  kpis,
  className = "",
}: {
  kpis: Array<{ id: string; label: string; value: string; helper?: string; icon?: string }>;
  className?: string;
}) {
  return (
    <div className={`${className} grid gap-3 sm:grid-cols-2 lg:grid-cols-4`}>
      {kpis.map((k) => (
        <KpiMiniCard key={k.id} kpi={k} />
      ))}
    </div>
  );
}

function KpiMiniCard({
  kpi,
}: {
  kpi: { id: string; label: string; value: string; helper?: string; icon?: string };
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {kpi.label}
          </div>
          <div className="mt-1 text-lg font-semibold text-slate-900">{kpi.value}</div>
          {kpi.helper && <div className="mt-1 text-xs text-slate-500">{kpi.helper}</div>}
        </div>
        <div className="shrink-0 rounded-xl border border-slate-200 bg-slate-50 p-2">
          <KpiIcon name={kpi.icon} />
        </div>
      </div>
    </div>
  );
}

function KpiIcon({ name }: { name?: string }) {
  const cls = "h-5 w-5 text-emerald-600";
  switch (name) {
    case "trendingUp":
      return <TrendingUp className={cls} />;
    case "wallet":
      return <Wallet className={cls} />;
    case "landmark":
      return <Landmark className={cls} />;
    case "badgeCheck":
      return <BadgeCheck className={cls} />;
    case "leaf":
      return <Leaf className={cls} />;
    case "zap":
      return <Zap className={cls} />;
    case "hardHat":
      return <HardHat className={cls} />;
    case "clipboardList":
      return <ClipboardList className={cls} />;
    default:
      return <BadgeCheck className={cls} />;
  }
}

function CertificationCard({
  cert,
}: {
  cert: any; // tip: se vuoi poi tipizziamo con i type del tuo _data.ts
}) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm flex flex-col">
      <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
        <ShieldCheck className="h-4 w-4" />
        {cert.standardLabel}
      </div>

      <h3 className="mt-4 font-semibold text-slate-900">{cert.title}</h3>
      <p className="mt-2 text-sm text-slate-600">{cert.description}</p>

      <ul className="mt-4 space-y-1 text-sm text-slate-700">
        {(cert.bullets ?? []).map((b: string, idx: number) => (
          <li key={`${cert.id}-b-${idx}`}>• {b}</li>
        ))}
      </ul>

      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="relative h-10 w-24">
          <Image src={cert.logoSrc} alt={cert.logoAlt} fill className="object-contain" />
        </div>

        <Link
          href={cert.pdfHref}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
        >
          <Download className="h-4 w-4" />
          {trasparenzaData.ui.downloadCertificateLabel}
        </Link>
      </div>
    </article>
  );
}
