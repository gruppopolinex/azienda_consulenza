// app/coworking/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Building2,
  Users,
  Wifi,
  Coffee,
  Monitor,
  Calendar,
  Clock,
  Laptop,
  PhoneCall,
  ChevronRight,
} from "lucide-react";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

/* ========== Tipi & dati ========== */

type City = "Venezia" | "Milano" | "Roma" | "Napoli";

type SpaceType = "Postazione coworking" | "Ufficio privato" | "Sala riunioni";

type Location = {
  id: City;
  name: string;
  address: string;
  description: string;
  image: string;
  tags: string[];
  spaces: {
    type: SpaceType;
    label: string;
    capacity: string;
  }[];
};

const LOCATIONS: Location[] = [
  {
    id: "Venezia",
    name: "Polinex – Venezia",
    address: "Fondamenta Esempio 12, 30100 Venezia (VE)",
    image: "/coworking/venezia.jpg",
    description:
      "Spazio affacciato sull’acqua, ideale per incontri con clienti e giornate di lavoro concentrate.",
    tags: ["Vicinanza stazione", "Sala riunioni 10 pax", "Spazio eventi"],
    spaces: [
      {
        type: "Postazione coworking",
        label: "Open space vista canale",
        capacity: "Fino a 8 postazioni",
      },
      {
        type: "Ufficio privato",
        label: "Ufficio 2–3 persone",
        capacity: "Team ridotti",
      },
      {
        type: "Sala riunioni",
        label: "Sala riunioni “Laguna”",
        capacity: "Fino a 10 persone",
      },
    ],
  },
  {
    id: "Milano",
    name: "Polinex – Milano",
    address: "Via Innovazione 45, 20100 Milano (MI)",
    image: "/coworking/milano.jpg",
    description:
      "Hub per incontri con clienti corporate e sessioni di lavoro su progetti complessi.",
    tags: ["Linea metro", "Spazi modulari", "Fiber-ready"],
    spaces: [
      {
        type: "Postazione coworking",
        label: "Area coworking open",
        capacity: "Fino a 16 postazioni",
      },
      {
        type: "Ufficio privato",
        label: "Ufficio 4–6 persone",
        capacity: "Project team",
      },
      {
        type: "Sala riunioni",
        label: "Sala riunioni “Scala”",
        capacity: "Fino a 12 persone",
      },
    ],
  },
  {
    id: "Roma",
    name: "Polinex – Roma",
    address: "Via Progetti 88, 00100 Roma (RM)",
    image: "/coworking/roma.jpg",
    description:
      "Spazio pensato per tavoli tecnici, incontri con PA e sessioni di progettazione condivisa.",
    tags: ["Vicino istituzioni", "Sala workshop", "Terrazza"],
    spaces: [
      {
        type: "Postazione coworking",
        label: "Open space centrale",
        capacity: "Fino a 10 postazioni",
      },
      {
        type: "Ufficio privato",
        label: "Ufficio 3–4 persone",
        capacity: "Team tecnici",
      },
      {
        type: "Sala riunioni",
        label: "Sala riunioni “Fori”",
        capacity: "Fino a 14 persone",
      },
    ],
  },
  {
    id: "Napoli",
    name: "Polinex – Napoli",
    address: "Via Mare 7, 80100 Napoli (NA)",
    image: "/coworking/napoli.jpg",
    description:
      "Ambiente luminoso e informale per riunioni, formazione e giornate di lavoro in team.",
    tags: ["Vista mare", "Spazio formazione", "Accesso parcheggio"],
    spaces: [
      {
        type: "Postazione coworking",
        label: "Zona coworking panoramica",
        capacity: "Fino a 12 postazioni",
      },
      {
        type: "Ufficio privato",
        label: "Ufficio 2–3 persone",
        capacity: "Focus room",
      },
      {
        type: "Sala riunioni",
        label: "Sala riunioni “Partenope”",
        capacity: "Fino a 8 persone",
      },
    ],
  },
];

const SPACE_TYPES: SpaceType[] = [
  "Postazione coworking",
  "Ufficio privato",
  "Sala riunioni",
];

/* ========== Pagina ========== */

export default function CoworkingPage() {
  const [selectedCity, setSelectedCity] = useState<City | "Tutte">("Tutte");
  const [spaceType, setSpaceType] = useState<SpaceType | "Qualsiasi">(
    "Qualsiasi"
  );

  const handlePrefill = (city: City, type?: SpaceType) => {
    setSelectedCity(city);
    if (type) setSpaceType(type);
  };

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
            Uffici, postazioni coworking e sale riunioni nelle sedi Polinex di{" "}
            <strong>Venezia</strong>, <strong>Milano</strong>,{" "}
            <strong>Roma</strong> e <strong>Napoli</strong>. Prenota lo spazio
            che ti serve con pochi dati, in stile booking/airbnb.
          </p>
        </section>

        {/* SEDI & INTRO PRENOTAZIONE */}
        <section className="mt-10 sm:mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-start">
          {/* Colonna sinistra – sedi / cards */}
          <div>
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

            <div className="flex flex-wrap gap-2 mb-4">
              <FilterPill
                active={selectedCity === "Tutte"}
                label="Tutte le sedi"
                onClick={() => setSelectedCity("Tutte")}
              />
              {(["Venezia", "Milano", "Roma", "Napoli"] as City[]).map(
                (city) => (
                  <FilterPill
                    key={city}
                    active={selectedCity === city}
                    label={city}
                    onClick={() => setSelectedCity(city)}
                  />
                )
              )}
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {LOCATIONS.filter((loc) =>
                selectedCity === "Tutte" ? true : loc.id === selectedCity
              ).map((loc) => (
                <LocationCard
                  key={loc.id}
                  location={loc}
                  onPrefill={handlePrefill}
                />
              ))}
            </div>
          </div>

          {/* Colonna destra – modulo prenotazione */}
          <div className="lg:sticky lg:top-24">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
                Prenota uno spazio
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Compila il form con{" "}
                <strong>sede, date e tipo di spazio</strong>. Ti rispondiamo
                entro 1 giorno lavorativo con conferma e dettagli.
              </p>

              <form className="mt-6 space-y-4">
                {/* Sede + tipo spazio */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Sede *
                    </label>
                    <select
                      className="input mt-1"
                      required
                      value={selectedCity}
                      onChange={(e) =>
                        setSelectedCity(
                          (e.target.value as City | "Tutte") || "Tutte"
                        )
                      }
                    >
                      <option value="Tutte" disabled>
                        Seleziona una sede
                      </option>
                      {(["Venezia", "Milano", "Roma", "Napoli"] as City[]).map(
                        (city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Tipo di spazio *
                    </label>
                    <select
                      className="input mt-1"
                      required
                      value={spaceType}
                      onChange={(e) =>
                        setSpaceType(
                          (e.target.value as SpaceType | "Qualsiasi") ||
                            "Qualsiasi"
                        )
                      }
                    >
                      <option value="Qualsiasi">
                        Qualsiasi tipologia disponibile
                      </option>
                      {SPACE_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Date + orario indicativo */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Data (arrivo) *
                    </label>
                    <div className="relative mt-1">
                      <input type="date" className="input pr-9" required />
                      <Calendar className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Fascia oraria
                    </label>
                    <div className="relative mt-1">
                      <input
                        type="text"
                        className="input pr-9"
                        placeholder="Es. 9:00–13:00"
                      />
                      <Clock className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
                    </div>
                  </div>
                </div>

                {/* Persone + durata */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      N. persone *
                    </label>
                    <input
                      type="number"
                      min={1}
                      className="input mt-1"
                      required
                      placeholder="Es. 4"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Durata
                    </label>
                    <select className="input mt-1" defaultValue="Mezza giornata">
                      <option>Mezza giornata</option>
                      <option>Giornata intera</option>
                      <option>Più giorni / periodo</option>
                    </select>
                  </div>
                </div>

                {/* Contatti */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Nome e cognome *
                    </label>
                    <input
                      type="text"
                      className="input mt-1"
                      required
                      placeholder="Nome e cognome"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Email *
                    </label>
                    <input
                      type="email"
                      className="input mt-1"
                      required
                      placeholder="nome@azienda.it"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Telefono
                  </label>
                  <input
                    type="tel"
                    className="input mt-1"
                    placeholder="+39 ..."
                  />
                </div>

                {/* Note */}
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Note o esigenze specifiche
                  </label>
                  <textarea
                    rows={4}
                    className="input mt-1"
                    placeholder="Es. necessità di videoconferenza, disposizione tavolo, esigenze di riservatezza…"
                  />
                </div>

                {/* Privacy */}
                <div className="flex items-start gap-2 pt-1">
                  <input
                    id="privacy"
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    required
                  />
                  <label
                    htmlFor="privacy"
                    className="text-xs text-slate-600 leading-snug"
                  >
                    Acconsento al trattamento dei dati ai sensi del Regolamento
                    (UE) 2016/679 ai fini della gestione della richiesta di
                    prenotazione.
                  </label>
                </div>

                <button
                  type="submit"
                  className="btn-primary mt-3 inline-flex items-center gap-2 w-full justify-center"
                >
                  Invia richiesta di prenotazione
                  <Laptop className="h-4 w-4" />
                </button>

                <p className="mt-3 text-[11px] text-slate-500">
                  La richiesta non è una prenotazione automatica. Verifichiamo
                  disponibilità e ti ricontattiamo con una proposta di dettaglio
                  (spazi, orari, condizioni economiche).
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* CTA FINALE – stile Trasparenza/Portfolio */}
        <section className="mx-auto max-w-7xl px-0 sm:px-0 lg:px-0 pb-20 mt-6">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10 text-center">
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
              Vuoi vedere gli spazi dal vivo o organizzare un evento?
            </h3>
            <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
              Possiamo organizzare una visita in sede oppure progettare insieme
              l’utilizzo degli spazi per{" "}
              <strong>riunioni, workshop, formazione o periodi di lavoro</strong>{" "}
              del tuo team.
            </p>
            <Link
              href="/contatti"
              className="mt-6 inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-white font-medium hover:bg-emerald-700"
            >
              Contattaci per maggiori informazioni
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
            <p className="mt-3 text-xs text-slate-500 flex items-center justify-center gap-1">
              <PhoneCall className="h-3.5 w-3.5" />
              In alternativa puoi scriverci o chiamarci direttamente dalla
              pagina{" "}
              <Link
                href="/contatti"
                className="underline underline-offset-2"
              >
                Contatti
              </Link>
              .
            </p>
          </div>
        </section>
      </main>

      <Footer />

      {/* Stili globali coerenti con le altre pagine */}
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
    </div>
  );
}

/* ========== Componenti di supporto ========== */

function FilterPill({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs sm:text-sm border transition ${
        active
          ? "border-emerald-600 bg-emerald-50 text-emerald-700"
          : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
      }`}
    >
      {label}
    </button>
  );
}

function LocationCard({
  location,
  onPrefill,
}: {
  location: Location;
  onPrefill: (city: City, type?: SpaceType) => void;
}) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition group">
      <div className="relative h-40 bg-slate-100">
        <Image
          src={location.image}
          alt={location.name}
          fill
          className="object-cover group-hover:scale-[1.02] transition-transform"
        />
        <div className="absolute left-3 top-3 inline-flex items-center rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          {location.id}
        </div>
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="font-semibold text-slate-900 text-sm sm:text-base">
          {location.name}
        </h3>
        <p className="mt-1 text-xs text-slate-600">{location.address}</p>
        <p className="mt-2 text-sm text-slate-600">{location.description}</p>

        {/* Tag features */}
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

        {/* Tipi di spazi */}
        <div className="mt-4 space-y-2">
          {location.spaces.map((s) => (
            <div
              key={s.label}
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
                <p className="text-[11px] text-slate-500">{s.capacity}</p>
              </div>
              <button
                type="button"
                onClick={() => onPrefill(location.id, s.type)}
                className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800"
              >
                Prenota qui
              </button>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
