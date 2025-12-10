// app/coworking/[slug]/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  Building2,
  MapPin,
  ArrowLeft,
  Users,
  Wifi,
  Coffee,
  Monitor,
  Calendar,
  Clock,
  Laptop,
  PhoneCall,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";

import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

// Dati centralizzati
import {
  LOCATIONS,
  type Location,
  type SpaceType,
} from "../_data";

/* ==================== PAGINA DETTAGLIO COWORKING ==================== */

export default function CoworkingDetailPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();

  const slugParam = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const space: Location | undefined = LOCATIONS.find(
    (s) => s.slug === slugParam
  );

  // Stato per precompilare il form (tipo di spazio)
  const [selectedSpaceType, setSelectedSpaceType] =
    useState<SpaceType | "">("");

  const handlePrefillSpace = (type: SpaceType) => {
    setSelectedSpaceType(type);
    // scroll morbido al form
    const el = document.getElementById("booking-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Fallback se la sede non esiste
  if (!space) {
    return (
      <div className="min-h-screen bg-white text-slate-900 flex flex-col">
        <Nav />
        <main className="flex-1 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
          <button
            type="button"
            onClick={() => router.push("/coworking")}
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Torna alla lista spazi
          </button>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
            <h1 className="section-title">Spazio non trovato</h1>
            <p className="mt-3 text-sm text-slate-600">
              La sede che stai cercando non è stata trovata o non è più
              disponibile a catalogo.
            </p>
            <Link
              href="/coworking"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              Vai agli spazi di coworking
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Nav />

      <main className="flex-1">
        {/* HERO stile editoria: breadcrumb + card info sede */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => router.push("/coworking")}
                className="inline-flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 w-fit"
              >
                <ArrowLeft className="h-3 w-3" />
                <span>Torna agli spazi di coworking</span>
              </button>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-2xl">
                  <h1 className="section-title flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <Building2 className="h-5 w-5" />
                    </span>
                    <span>{space.name}</span>
                  </h1>
                  <p className="mt-2 text-sm font-medium text-emerald-700 flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 text-emerald-600" />
                    <span>{space.address}</span>
                  </p>
                  <p className="mt-3 text-sm text-slate-600">
                    Città:{" "}
                    <span className="font-medium text-slate-800">
                      {space.city}
                    </span>
                    {" · "}
                    Spazi disponibili:{" "}
                    <span className="font-medium text-slate-800">
                      {space.spaces.length}
                    </span>
                  </p>
                </div>

                <div className="flex flex-col items-start sm:items-end gap-2">
                  {space.tags && space.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 justify-end">
                      {space.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-800 border border-emerald-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {(space.phone || space.email) && (
                    <p className="text-xs text-slate-500 flex flex-wrap gap-2 justify-end">
                      {space.phone && (
                        <span className="inline-flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          <a
                            href={`tel:${space.phone}`}
                            className="hover:text-slate-800"
                          >
                            {space.phone}
                          </a>
                        </span>
                      )}
                      {space.email && (
                        <span className="inline-flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          <a
                            href={`mailto:${space.email}`}
                            className="hover:text-slate-800"
                          >
                            {space.email}
                          </a>
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BLOCCO PRINCIPALE: colonna media + colonna form */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:items-start">
            {/* COLONNA SINISTRA: media + panoramica + spazi disponibili */}
            <div className="space-y-6">
              {/* Media: video YT se presente, altrimenti immagine grande */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-xl bg-slate-900">
                  {space.videoUrl ? (
                    <iframe
                      src={space.videoUrl}
                      title={`Video presentazione spazio ${space.name}`}
                      className="absolute inset-0 h-full w-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                    />
                  ) : (
                    <Image
                      src={space.image}
                      alt={space.name}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 640px, 100vw"
                    />
                  )}
                </div>
              </div>

              {/* Panoramica */}
              <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
                <h2 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <Monitor className="h-4 w-4 text-slate-500" />
                  Panoramica dello spazio
                </h2>
                <p className="mt-2 text-sm text-slate-700">
                  {space.description}
                </p>

                {space.services && space.services.length > 0 && (
                  <div className="mt-3 grid gap-2 text-xs text-slate-700 sm:grid-cols-2">
                    {space.services.map((srv) => (
                      <div
                        key={srv}
                        className="inline-flex items-start gap-2"
                      >
                        <span className="mt-0.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        <span>{srv}</span>
                      </div>
                    ))}
                  </div>
                )}

                {space.mapUrl && (
                  <div className="mt-4 pt-3 border-t border-slate-200">
                    <Link
                      href={space.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Apri la sede su Google Maps
                    </Link>
                  </div>
                )}
              </div>

              {/* Spazi prenotabili (schede) */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                  <Users className="h-4 w-4 text-slate-500" />
                  Tipologie di spazi disponibili
                </h3>
                <div className="mt-3 space-y-3">
                  {space.spaces.map((s) => (
                    <div
                      key={s.label}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2.5"
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
                        <p className="text-[11px] text-slate-500">
                          {s.capacity}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handlePrefillSpace(s.type)}
                        className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800"
                      >
                        Usa per la richiesta
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-500">
                  <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5">
                    <Wifi className="h-3 w-3 mr-1" />
                    Fibra / Wi-Fi ad alta affidabilità
                  </span>
                  <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5">
                    <Coffee className="h-3 w-3 mr-1" />
                    Coffee corner & area relax
                  </span>
                  <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5">
                    <Monitor className="h-3 w-3 mr-1" />
                    Schermi e dotazioni per meeting ibridi
                  </span>
                </div>
              </div>
            </div>

            {/* COLONNA DESTRA: form di prenotazione dedicato alla sede */}
            <aside
              id="booking-form"
              className="lg:sticky lg:top-24 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm"
            >
              <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
                Invia una richiesta per questa sede
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                Compila il form con{" "}
                <strong>data, orari e tipologia di spazio</strong>. Ti
                ricontattiamo entro 1 giorno lavorativo con conferma e
                disponibilità.
              </p>

              <form className="mt-6 space-y-4">
                {/* Sede (bloccata) + tipo spazio */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Sede
                    </label>
                    <input
                      type="text"
                      className="input mt-1 bg-slate-50"
                      value={space.name}
                      disabled
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Tipo di spazio *
                    </label>
                    <select
                      className="input mt-1"
                      required
                      value={selectedSpaceType || ""}
                      onChange={(e) =>
                        setSelectedSpaceType(e.target.value as SpaceType | "")
                      }
                    >
                      <option value="" disabled>
                        Seleziona il tipo di spazio
                      </option>
                      {space.spaces.map((s) => (
                        <option key={s.label} value={s.type}>
                          {s.type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Date + fascia oraria */}
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
                    <select
                      className="input mt-1"
                      defaultValue="Mezza giornata"
                    >
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
                  disponibilità per questa sede e ti ricontattiamo con una
                  proposta di dettaglio (spazi, orari, condizioni economiche).
                </p>
              </form>

              <div className="mt-4 pt-4 border-t border-slate-200 text-[11px] text-slate-500 flex items-start gap-2">
                <PhoneCall className="mt-0.5 h-3.5 w-3.5" />
                <p>
                  Se preferisci, puoi anche contattarci direttamente dalla
                  pagina{" "}
                  <Link
                    href="/contatti"
                    className="underline underline-offset-2"
                  >
                    Contatti
                  </Link>{" "}
                  indicando <strong>sede {space.city}</strong>, data e
                  tipologia di spazio.
                </p>
              </div>
            </aside>
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
