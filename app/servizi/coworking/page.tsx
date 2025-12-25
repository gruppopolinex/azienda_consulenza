// app/servizi/coworking/page.tsx
"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Building2,
  Users,
  Wifi,
  Coffee,
  Monitor,
  Laptop,
  ChevronRight,
  Filter as FilterIcon,
  Search,
} from "lucide-react";

import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

// Dati centralizzati in _data.ts
import {
  LOCATIONS,
  SPACE_TYPES,
  type City,
  type SpaceType,
  type Location,
} from "./_data";

/* ========== Pagina ========== */

export default function CoworkingPage() {
  const [selectedCity, setSelectedCity] = useState<City | "Tutte">("Tutte");
  const [spaceType, setSpaceType] = useState<SpaceType | "Qualsiasi">(
    "Qualsiasi"
  );
  const [search, setSearch] = useState("");

  // ✅ Città derivate dai dati: se aggiungi una sede/città in _data.ts,
  // automaticamente comparirà nel filtro.
  const availableCities = useMemo(() => {
    const set = new Set<City>();
    for (const loc of LOCATIONS) set.add(loc.city);
    return Array.from(set).sort((a, b) => a.localeCompare(b, "it"));
  }, []);

  const filteredLocations = useMemo(() => {
    const q = search.trim().toLowerCase();

    return LOCATIONS.filter((loc) => {
      const byCity = selectedCity === "Tutte" ? true : loc.city === selectedCity;

      const bySpaceType =
        spaceType === "Qualsiasi"
          ? true
          : (loc.spaces ?? []).some((s) => s.type === spaceType);

      const bySearch = !q
        ? true
        : [
            loc.name,
            loc.city,
            loc.address,
            loc.description,
            ...(loc.tags ?? []),
            ...(loc.spaces ?? []).map((s) => `${s.type} ${s.label} ${s.capacity ?? ""}`),
          ]
            .join(" ")
            .toLowerCase()
            .includes(q);

      return byCity && bySpaceType && bySearch;
    });
  }, [selectedCity, spaceType, search]);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Nav />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* HERO */}
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

          <h1 className="section-title">Spazi di lavoro & coworking</h1>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Uffici, postazioni coworking e sale riunioni nelle sedi Polinex.
            Scegli la sede e apri la relativa scheda per{" "}
            <strong>
              vedere i dettagli e inviare una richiesta di prenotazione
            </strong>
            .
          </p>

          {/* ✅ Filtri + ricerca (stile Finanziamenti/Editoria) */}
          <div className="mt-6 grid gap-3 sm:grid-cols-[minmax(0,260px)_minmax(0,260px)_minmax(0,1fr)] items-end">
            {/* Città */}
            <div className="text-left">
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Sede
              </label>
              <select
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                value={selectedCity}
                onChange={(e) =>
                  setSelectedCity(e.target.value as City | "Tutte")
                }
              >
                <option value="Tutte">Tutte le sedi</option>
                {availableCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Tipologia */}
            <div className="text-left">
              <label className="block text-xs font-medium text-slate-600 mb-1">
                Tipologia di spazio
              </label>
              <select
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                value={spaceType}
                onChange={(e) =>
                  setSpaceType(
                    (e.target.value as SpaceType | "Qualsiasi") || "Qualsiasi"
                  )
                }
              >
                <option value="Qualsiasi">Qualsiasi tipologia</option>
                {SPACE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Cerca sedi (nome, indirizzo, tag, spazi)…"
                  className="w-full rounded-xl border border-slate-300 bg-white pl-9 pr-3 py-2 text-sm text-slate-700 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  aria-label="Cerca sedi coworking"
                />
              </div>
            </div>
          </div>
        </section>

        {/* SEDI */}
        <section className="mt-10 sm:mt-12">
          {/* Pill informazioni rapide */}
          <div className="flex flex-wrap gap-2 mb-4 text-xs sm:text-sm">
            <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1">
              <Wifi className="h-3.5 w-3.5 mr-1" />
              Fibra e Wi-Fi ad alta affidabilità
            </span>
            <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1">
              <Coffee className="h-3.5 w-3.5 mr-1" />
              Coffee corner & area relax
            </span>
            <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1">
              <Monitor className="h-3.5 w-3.5 mr-1" />
              Monitor, schermi e dotazioni meeting
            </span>
          </div>

          {/* Riga info filtri */}
          <div className="mb-6 flex items-center gap-2 text-sm text-slate-700">
            <FilterIcon className="h-4 w-4 text-slate-500" />
            <span>
              {selectedCity === "Tutte" ? "Tutte le sedi" : selectedCity} •{" "}
              {spaceType === "Qualsiasi" ? "Tutte le tipologie" : spaceType} •{" "}
              <strong>{filteredLocations.length}</strong>{" "}
              {filteredLocations.length === 1 ? "sede" : "sedi"}
            </span>
          </div>

          {/* Grid sedi */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredLocations.map((loc) => (
              <LocationCard key={loc.slug} location={loc} />
            ))}

            {filteredLocations.length === 0 && (
              <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-600">
                Nessuno spazio trovato per i filtri selezionati. Prova a
                modificare sede, tipologia o testo di ricerca.
              </div>
            )}
          </div>
        </section>

        {/* CTA FINALE */}
        <section className="mx-auto max-w-7xl pb-20 mt-10">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10 text-center">
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
              Vuoi vedere gli spazi dal vivo o organizzare un evento?
            </h3>
            <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
              Dalla scheda di ogni sede puoi inviare una{" "}
              <strong>richiesta di prenotazione</strong>. Possiamo anche
              organizzare una visita o progettare insieme{" "}
              <strong>riunioni, workshop o periodi di lavoro</strong> del tuo
              team.
            </p>
            <Link
              href="/contatti"
              className="mt-6 inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-white font-medium hover:bg-emerald-700"
            >
              Contattaci per maggiori informazioni
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      {/* Stili globali */}
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

/* ========== Componenti di supporto ========== */

function LocationCard({ location }: { location: Location }) {
  return (
    <Link
      href={`/servizi/coworking/${location.slug}`}
      aria-label={`Apri la scheda di ${location.name}`}
      className="block rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
    >
      <article className="flex flex-col">
        <div className="relative h-40 bg-slate-100">
          <Image
            src={location.image}
            alt={location.name}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform"
          />
          <div className="absolute left-3 top-3 inline-flex items-center rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
            <MapPin className="h-3.5 w-3.5 mr-1" />
            {location.city}
          </div>
        </div>

        <div className="p-4 sm:p-5 flex-1 flex flex-col">
          <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
            {location.name}
          </h3>
          <p className="mt-1 text-xs text-slate-600">{location.address}</p>
          <p className="mt-2 text-sm text-slate-600">{location.description}</p>

          {/* Tag features */}
          {location.tags?.length ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {location.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-slate-50 px-2 py-0.5 text-[11px] text-slate-700 border border-slate-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          {/* Tipi di spazi */}
          {location.spaces?.length ? (
            <div className="mt-4 space-y-2">
              {location.spaces.map((s) => (
                <div
                  key={`${location.slug}-${s.label}`}
                  className="flex items-center justify-between gap-2 rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                      {s.type === "Sala riunioni" && (
                        <Users className="h-3.5 w-3.5 text-slate-500" />
                      )}
                      {s.type === "Postazione coworking" && (
                        <Laptop className="h-3.5 w-3.5 text-slate-500" />
                      )}
                      {s.type === "Ufficio privato" && (
                        <Building2 className="h-3.5 w-3.5 text-slate-500" />
                      )}
                      <span>{s.label}</span>
                    </p>
                    {s.capacity && (
                      <p className="text-[11px] text-slate-500">{s.capacity}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </article>
    </Link>
  );
}
