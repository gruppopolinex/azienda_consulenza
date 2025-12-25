// app/finanziamenti/[slug]/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  ExternalLink,
  FileDown,
  MapPin,
  Wallet,
  Youtube,
  Send,
  Building,
  Mail,
  Phone,
  Briefcase,
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

  // Form CTA (lead sul bando)
  const [submitting, setSubmitting] = useState(false);
  const [okMsg, setOkMsg] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);

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
              l&apos;indirizzo sia corretto oppure torna all&apos;elenco completo
              dei bandi e finanziamenti.
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

      <main className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12 flex-1">
        {/* Top: back + breadcrumb (minimal) */}
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => router.push("/finanziamenti")}
            className="inline-flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 w-fit"
          >
            <ArrowLeft className="h-3 w-3" />
            <span>Torna ai bandi</span>
          </button>

          <nav className="text-xs sm:text-sm text-slate-600 sm:text-right">
            <Link className="hover:underline" href="/finanziamenti">
              Bandi e Finanziamenti
            </Link>{" "}
            <span className="mx-1">/</span>
            <span className="text-slate-900">{g.title}</span>
          </nav>
        </div>

        {/* Layout semplice: contenuto + aside (solo su desktop) */}
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] lg:items-start">
          {/* MAIN */}
          <div className="min-w-0">
            {/* Header */}
            <header>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900">
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
                <p className="mt-4 max-w-3xl text-slate-700 text-sm sm:text-base leading-relaxed">
                  {g.description || g.teaser}
                </p>
              )}
            </header>

            {/* Meta (pulita) */}
            <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
              <MetaLine
                icon={<Building2 className="h-4 w-4" />}
                label="Ente"
                value={g.ente}
              />
              <MetaLine
                icon={<Wallet className="h-4 w-4" />}
                label="Contributo"
                value={g.contributo}
              />
              <MetaLine label="Beneficiari" value={g.beneficiari} />
              <MetaLine
                icon={<Calendar className="h-4 w-4" />}
                label="Scadenza"
                value={fmtDate(g.scadenza)}
              />
              {g.territorio && (
                <MetaLine
                  icon={<MapPin className="h-4 w-4" />}
                  label="Territorio"
                  value={g.territorio}
                />
              )}
            </section>

            {/* Risorse */}
            <section className="mt-8">
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

                {!g.pdfHref && !g.officialUrl && (
                  <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                    Nessun documento o link disponibile.
                  </div>
                )}
              </div>
            </section>

            {/* Video */}
            {g.youtubeId && (
              <section className="mt-8">
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
              </section>
            )}

            <section className="mt-10">
              <Link
                href="/finanziamenti"
                className="inline-flex items-center gap-2 text-sm text-slate-700 hover:text-slate-900"
              >
                ← Torna ai bandi
              </Link>
            </section>
          </div>

          {/* ASIDE: CTA FORM (NON sticky, non si muove) */}
          <aside>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-base font-semibold text-slate-900">
                Vuoi partecipare a questo bando?
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                Compila i dati della tua società: un consulente ti contatterà a
                breve per una valutazione preliminare.
              </p>

              <form
                className="mt-4 space-y-3"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setOkMsg(null);
                  setErrMsg(null);
                  setSubmitting(true);

                  const form = e.currentTarget;
                  const fd = new FormData(form);

                  const payload = {
                    grantSlug: g.slug,
                    grantTitle: g.title,
                    azienda: fd.get("azienda"),
                    settore: fd.get("settore"),
                    email: fd.get("email"),
                    telefono: fd.get("telefono"),
                    messaggio: fd.get("messaggio"),
                  };

                  const res = await fetch("/api/finanziamenti/richiesta", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                  });

                  const data = await res.json().catch(() => null);
                  setSubmitting(false);

                  if (res.ok) {
                    form.reset();
                    setOkMsg("Richiesta inviata! Ti contattiamo a breve.");
                  } else {
                    setErrMsg(data?.error ?? "Errore nell’invio. Riprova.");
                  }
                }}
              >
                <Field
                  icon={<Building className="h-4 w-4" />}
                  label="Ragione sociale *"
                  name="azienda"
                  type="text"
                  required
                  placeholder="Es. Azienda S.r.l."
                />

                <Field
                  icon={<Briefcase className="h-4 w-4" />}
                  label="Settore"
                  name="settore"
                  type="text"
                  required={false}
                  placeholder="Es. manifatturiero, agricolo…"
                />

                <Field
                  icon={<Mail className="h-4 w-4" />}
                  label="Email *"
                  name="email"
                  type="email"
                  required
                  placeholder="nome@azienda.it"
                />

                <Field
                  icon={<Phone className="h-4 w-4" />}
                  label="Telefono"
                  name="telefono"
                  type="tel"
                  required={false}
                  placeholder="+39…"
                />

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Nota (facoltativa)
                  </label>
                  <textarea
                    name="messaggio"
                    rows={3}
                    className="input mt-1"
                    placeholder="Es. investimento previsto, tempi, dubbi su requisiti…"
                  />
                </div>

                <div className="pt-1 flex items-start gap-2">
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
                    Acconsento al trattamento dei dati ai sensi del Regolamento
                    (UE) 2016/679 ai fini di essere ricontattato in merito a
                    questo bando.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-white font-medium hover:bg-emerald-700 disabled:opacity-60"
                >
                  Invia richiesta <Send className="h-4 w-4" />
                </button>

                {/* spazio riservato per evitare “saltini” quando appare ok/errore */}
                <div className="min-h-[52px]">
                  {okMsg && (
                    <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2">
                      {okMsg}
                    </p>
                  )}
                  {errMsg && (
                    <p className="text-sm text-rose-700 bg-rose-50 border border-rose-100 rounded-xl px-3 py-2">
                      {errMsg}
                    </p>
                  )}
                </div>

                <p className="text-[11px] text-slate-500">
                  Useremo i tuoi contatti solo per gestire la richiesta su questo
                  bando.
                </p>
              </form>
            </div>
          </aside>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
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
      `}</style>
    </div>
  );
}

/* ===== UI minimal ===== */

function MetaLine({
  icon,
  label,
  value,
}: {
  icon?: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2">
      {icon ? <span className="mt-0.5 text-slate-500">{icon}</span> : null}
      <div className="min-w-0">
        <span className="font-semibold text-slate-800">{label}:</span>{" "}
        <span className="text-slate-700 break-words">{value}</span>
      </div>
    </div>
  );
}

function Field({
  icon,
  label,
  name,
  type,
  required,
  placeholder,
}: {
  icon?: React.ReactNode;
  label: string;
  name: string;
  type: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}
        <input
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={`input mt-1 ${icon ? "pl-9" : ""}`}
        />
      </div>
    </div>
  );
}
