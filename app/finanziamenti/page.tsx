// app/finanziamenti/page.tsx
"use client";

import { useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  Building2,
  Wallet,
  MapPin,
  Search,
  Send,
  Building,
  Mail,
  Phone,
  Briefcase,
  ChevronDown,
} from "lucide-react";

import {
  GRANTS,
  type Grant,
  type Status,
  ALL_AREAS,
  type Area,
  ALL_REGIONI,
  type Regione,
} from "./_data";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

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

/* ===================== Filtri (stile Portfolio) ===================== */

const STATUS_FILTERS = ["Tutti", "Aperti", "In programma", "Chiusi"] as const;
type StatusFilter = (typeof STATUS_FILTERS)[number];

type RegionFilter = "Tutte" | Regione;

// ✅ Tutte le regioni italiane (per il FORM)
const ITALIAN_REGIONS = [
  "Abruzzo",
  "Basilicata",
  "Calabria",
  "Campania",
  "Emilia-Romagna",
  "Friuli-Venezia Giulia",
  "Lazio",
  "Liguria",
  "Lombardia",
  "Marche",
  "Molise",
  "Piemonte",
  "Puglia",
  "Sardegna",
  "Sicilia",
  "Toscana",
  "Trentino-Alto Adige",
  "Umbria",
  "Valle d'Aosta",
  "Veneto",
] as const;

/* ===================== Componenti: MultiSelect a tendina ===================== */

function MultiSelectDropdown({
  label,
  name,
  options,
  value,
  onChange,
  placeholder = "Seleziona…",
}: {
  label: string;
  name: string;
  options: readonly string[];
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);

  const toggle = (v: string) => {
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
  };

  const clear = () => onChange([]);

  const summary =
    value.length === 0
      ? placeholder
      : value.length === 1
      ? value[0]
      : `${value.length} selezionate`;

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-slate-700">{label}</label>

      {/* Hidden inputs per invio form */}
      {value.map((v) => (
        <input key={v} type="hidden" name={name} value={v} />
      ))}

      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 inline-flex items-center justify-between"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={value.length === 0 ? "text-slate-400" : ""}>
          {summary}
        </span>
        <ChevronDown className="h-4 w-4 text-slate-400" />
      </button>

      {open && (
        <div
          className="absolute z-20 mt-2 w-full rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
          role="listbox"
        >
          <div className="max-h-64 overflow-auto p-2">
            {options.map((opt) => {
              const checked = value.includes(opt);
              return (
                <label
                  key={opt}
                  className="flex items-center gap-2 rounded-xl px-2 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggle(opt)}
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="min-w-0">{opt}</span>
                </label>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-2 border-t border-slate-100 px-3 py-2 bg-slate-50">
            <button
              type="button"
              onClick={clear}
              className="text-xs text-slate-600 hover:underline"
              disabled={value.length === 0}
            >
              Pulisci
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-xs font-semibold text-emerald-700 hover:underline"
            >
              Chiudi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===================== Pagina ===================== */
export default function FinanziamentiPage() {
  const [status, setStatus] = useState<StatusFilter>("Aperti");
  const [query, setQuery] = useState("");

  // ✅ filtro aree come tendina (stesso stile di stato/regione)
  const [area, setArea] = useState<Area | "Tutte">("Tutte");
  const [region, setRegion] = useState<RegionFilter>("Tutte");

  // Form CTA (lead bandi)
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadOk, setLeadOk] = useState<string | null>(null);
  const [leadErr, setLeadErr] = useState<string | null>(null);

  // ✅ Multi-select nel FORM
  const [leadRegions, setLeadRegions] = useState<string[]>([]);
  const [leadAreas, setLeadAreas] = useState<string[]>([]);

  // ✅ regioni effettivamente presenti nei dati (solo bandi che hanno regioni valorizzate)
  const regionOptions = useMemo(() => {
    const set = new Set<Regione>();
    GRANTS.forEach((g) => {
      g.regioni?.forEach((r) => set.add(r));
    });
    return ALL_REGIONI.filter((r) => set.has(r));
  }, []);

  const list = useMemo(() => {
    let arr: Grant[] = [...GRANTS];

    // Filtro per stato
    if (status !== "Tutti") {
      arr = arr.filter((g) => g.stato === status);
    }

    // ✅ Filtro per area (singola selezione da tendina)
    if (area !== "Tutte") {
      arr = arr.filter((g) => g.aree?.includes(area) ?? false);
    }

    // Filtro per regione (strutturato su g.regioni)
    if (region !== "Tutte") {
      arr = arr.filter((g) => g.regioni?.includes(region) ?? false);
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
  }, [status, query, area, region]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <Nav />

      <main className="flex-grow mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
        {/* Header */}
        <header className="text-center max-w-3xl mx-auto">
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

          <h1 className="section-title">Bandi e Finanziamenti</h1>

          <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
            Selezione di opportunità per imprese, PA e realtà agricole. Filtra
            per stato, area tecnica e regione e cerca per nome, ente o
            beneficiari.
          </p>

          {/* Toolbar filtri (stile Portfolio): tendine + ricerca */}
          <div className="mt-6 grid gap-3 sm:grid-cols-[minmax(0,200px)_minmax(0,260px)_minmax(0,260px)_minmax(0,1fr)] items-end">
            {/* Stato */}
            <div className="text-left">
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Stato
              </label>
              <select
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                value={status}
                onChange={(e) => setStatus(e.target.value as StatusFilter)}
              >
                {STATUS_FILTERS.map((s) => (
                  <option key={s} value={s}>
                    {s === "Tutti" ? "Tutti gli stati" : s}
                  </option>
                ))}
              </select>
            </div>

            {/* Area (in mezzo, stesso stile) */}
            <div className="text-left">
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Area di competenza
              </label>
              <select
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                value={area}
                onChange={(e) => setArea(e.target.value as Area | "Tutte")}
              >
                <option value="Tutte">Tutte le aree</option>
                {ALL_AREAS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>

            {/* Regione (solo quelle presenti nei dati) */}
            <div className="text-left">
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Regione
              </label>
              <select
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                value={region}
                onChange={(e) => setRegion(e.target.value as RegionFilter)}
              >
                <option value="Tutte">Tutte</option>
                {regionOptions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            {/* Ricerca */}
            <div className="text-left">
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Cerca
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="search"
                  placeholder="Cerca bandi (nome, ente, beneficiari)…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white pl-9 pr-3 py-2 text-sm text-slate-700 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  aria-label="Cerca bandi"
                />
              </div>
            </div>
          </div>
        </header>

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

        {/* CTA finale con FORM */}
        <section className="mt-14">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10 shadow-sm">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
                Non hai trovato il bando che fa al caso tuo?
              </h3>
              <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
                Compila il form con i dati della tua società: ti contatteremo
                quando escono opportunità coerenti con il tuo profilo e le aree
                di interesse.
              </p>
            </div>

            <form
              className="mt-8 mx-auto max-w-3xl space-y-4"
              onSubmit={async (e) => {
                e.preventDefault();
                setLeadOk(null);
                setLeadErr(null);
                setLeadSubmitting(true);

                const form = e.currentTarget;
                const fd = new FormData(form);

                const payload = {
                  azienda: fd.get("azienda"),
                  settore: fd.get("settore"),
                  email: fd.get("email"),
                  telefono: fd.get("telefono"),
                  messaggio: fd.get("messaggio"),

                  // ✅ multi-select: prendiamo dagli hidden inputs creati dal componente
                  regioniInteresse: fd.getAll("regioniInteresse"),
                  areeInteresse: fd.getAll("areeInteresse"),
                };

                const res = await fetch("/api/finanziamenti/alert", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(payload),
                });

                const data = await res.json().catch(() => null);

                setLeadSubmitting(false);

                if (res.ok) {
                  form.reset();
                  setLeadRegions([]);
                  setLeadAreas([]);
                  setLeadOk(
                    "Richiesta inviata! Ti contatteremo quando troveremo bandi in linea."
                  );
                } else {
                  setLeadErr(data?.error ?? "Errore nell’invio. Riprova.");
                }
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
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
                  placeholder="Es. manifatturiero, agricolo, servizi…"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* ✅ Regione multi-select a tendina */}
                <MultiSelectDropdown
                  label="Regioni di interesse (facoltativo)"
                  name="regioniInteresse"
                  options={ITALIAN_REGIONS}
                  value={leadRegions}
                  onChange={setLeadRegions}
                  placeholder="Seleziona una o più regioni…"
                />

                <Field
                  icon={<Mail className="h-4 w-4" />}
                  label="Email *"
                  name="email"
                  type="email"
                  required
                  placeholder="nome@azienda.it"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  icon={<Phone className="h-4 w-4" />}
                  label="Telefono"
                  name="telefono"
                  type="tel"
                  required={false}
                  placeholder="+39…"
                />

                {/* ✅ Aree multi-select a tendina */}
                <MultiSelectDropdown
                  label="Aree di interesse (facoltativo)"
                  name="areeInteresse"
                  options={ALL_AREAS}
                  value={leadAreas}
                  onChange={setLeadAreas}
                  placeholder="Seleziona una o più aree…"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Nota / esigenze (facoltativo)
                </label>
                <textarea
                  name="messaggio"
                  rows={4}
                  className="input mt-1"
                  placeholder="Es. investimento previsto, tipologia progetto, scadenze, requisiti…"
                />
              </div>

              <div className="pt-2 flex items-start gap-2">
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
                  (UE) 2016/679 ai fini esclusivi di essere ricontattato per
                  opportunità di bandi/finanziamenti.
                </label>
              </div>

              <div className="mt-4 flex flex-col items-center gap-3">
                <button
                  type="submit"
                  disabled={leadSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-white font-medium hover:bg-emerald-700 disabled:opacity-60"
                >
                  Inviami opportunità in linea
                  <Send className="h-4 w-4" />
                </button>

                {leadOk && (
                  <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-2">
                    {leadOk}
                  </p>
                )}
                {leadErr && (
                  <p className="text-sm text-rose-700 bg-rose-50 border border-rose-100 rounded-xl px-4 py-2">
                    {leadErr}
                  </p>
                )}

                <p className="text-[11px] text-slate-500 text-center max-w-2xl">
                  Non inviamo spam: useremo i tuoi contatti solo per segnalarti
                  bandi coerenti con le informazioni fornite.
                </p>
              </div>

              <div className="pt-4 text-center">
                <Link
                  href="/contatti"
                  className="inline-flex items-center text-sm text-emerald-700 hover:underline"
                >
                  Preferisci parlarne subito? Contattaci{" "}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </form>
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

/* ===================== Componenti ===================== */

function Field({
  icon,
  label,
  name,
  type,
  required,
  placeholder,
}: {
  icon?: ReactNode;
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

function GrantRow({ g }: { g: Grant }) {
  return (
    <Link
      href={`/finanziamenti/${g.slug}`}
      className="group rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
      aria-label={`Vai al dettaglio del bando: ${g.title}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="min-w-0 flex-1">
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-emerald-700">
            {g.title}
          </h3>

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

          {Array.isArray(g.aree) && g.aree.length > 0 && (
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

          {g.teaser && <p className="mt-2 text-sm text-slate-600">{g.teaser}</p>}
        </div>

        <div className="flex flex-row sm:flex-col items-center justify-between gap-3 sm:items-end">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${statusClasses(
              g.stato as Status
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
  icon?: ReactNode;
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
