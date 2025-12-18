// app/coworking/[locationslug]/[spaceslug]/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Mail,
  Calendar,
  Clock,
  Users,
  Building2,
  BadgeCheck,
} from "lucide-react";

import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import { LOCATIONS, type Location, type LocationSpace } from "../../_data";

/* ================== UTILS ================== */

function formatEuro(n?: number) {
  return typeof n === "number" ? `€ ${n}` : "—";
}

function formatItalianDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

/* ================== PAGE ================== */

export default function CoworkingSpacePage() {
  const params = useParams<{ locationslug: string; spaceslug: string }>();
  const router = useRouter();

  const location = useMemo<Location | undefined>(
    () => LOCATIONS.find((l) => l.slug === params.locationslug),
    [params.locationslug]
  );

  const space = useMemo<LocationSpace | undefined>(() => {
    return location?.spaces.find((s) => s.slug === params.spaceslug);
  }, [location, params.spaceslug]);

  // Fallback se non trovata
  if (!location || !space) {
    return (
      <div className="min-h-screen flex flex-col bg-white text-slate-900">
        <Nav />
        <main className="flex-1 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
            <h1 className="text-2xl font-semibold">Spazio non trovato</h1>
            <p className="mt-3 text-sm text-slate-600">
              Lo spazio richiesto non è disponibile o non esiste.
            </p>
            <Link
              href="/coworking"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-white font-medium hover:bg-emerald-700"
            >
              Torna al coworking
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const images = space.images ?? [];
  const hasImages = images.length > 0;

  // carosello
  const [imgIndex, setImgIndex] = useState(0);

  // booking mode / pricing
  const bookingMode = (space as any).bookingMode ?? "request";
  const pricing = (space as any).pricing ?? {};
  const minHourlyPrice =
    typeof space.minHourlyPrice === "number" ? space.minHourlyPrice : undefined;

  // booking availability (per-spazio se presente, altrimenti per-sede)
  const bookingDays =
    (space as any).booking?.days ?? (location as any).booking?.days ?? [];
  const bookingSlots =
    (space as any).booking?.timeSlots ??
    (location as any).booking?.timeSlots ??
    [];

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<string>("");

  const slotLabel =
    bookingSlots.find((x: any) => x.id === selectedTimeSlotId)?.label ?? "";

  const canSubmit = Boolean(selectedDate && selectedTimeSlotId);

  // link al contatto (richiesta locazione/visita)
  const requestHref = `/contatti?location=${encodeURIComponent(
    location.slug
  )}&space=${encodeURIComponent(space.slug)}`;

  // CTA booking online (placeholder pronto per Stripe / checkout reale)
  const checkoutHref = canSubmit
    ? `/checkout?location=${encodeURIComponent(
        location.slug
      )}&space=${encodeURIComponent(space.slug)}&date=${encodeURIComponent(
        selectedDate
      )}&slot=${encodeURIComponent(selectedTimeSlotId)}`
    : "#";

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Nav />

      <main className="flex-1">
        {/* HEADER MINIMALE */}
        <section className="border-b border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <button
              type="button"
              onClick={() => router.push(`/coworking/${location.slug}`)}
              className="inline-flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="h-3 w-3" />
              Torna alla sede
            </button>

            <h1 className="section-title mt-3">{space.label}</h1>

            <p className="mt-2 text-sm text-slate-600 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-700" />
              <span className="font-medium text-slate-800">{location.name}</span>
              <span className="text-slate-400">·</span>
              <span>{location.city}</span>
            </p>

            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 px-3 py-1 font-medium">
                <Building2 className="h-3.5 w-3.5 mr-1" />
                {space.type}
              </span>
              <span className="inline-flex items-center rounded-full bg-white text-slate-700 border border-slate-200 px-3 py-1 font-medium">
                <Users className="h-3.5 w-3.5 mr-1" />
                {space.capacity}
              </span>
              {bookingMode !== "request" && (
                <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-800 border border-blue-100 px-3 py-1 font-medium">
                  <BadgeCheck className="h-3.5 w-3.5 mr-1" />
                  Prenotabile online
                </span>
              )}
              {bookingMode !== "hourly" && (
                <span className="inline-flex items-center rounded-full bg-purple-50 text-purple-800 border border-purple-100 px-3 py-1 font-medium">
                  <BadgeCheck className="h-3.5 w-3.5 mr-1" />
                  Utilizzo continuativo
                </span>
              )}
            </div>
          </div>
        </section>

        {/* BLOCCO SIMMETRICO: CAROSELLO SX + BOOKING DX (stessa altezza) */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
            {/* SX: CAROSELLO */}
            <article className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm h-full">
              <div className="relative w-full h-full min-h-[320px] sm:min-h-[380px] lg:min-h-[420px] overflow-hidden rounded-2xl bg-slate-100">
                {hasImages ? (
                  <>
                    <Image
                      src={images[imgIndex]}
                      alt={space.label}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 560px, 100vw"
                      priority
                    />

                    {images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setImgIndex((prev) =>
                              prev === 0 ? images.length - 1 : prev - 1
                            )
                          }
                          className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/40 hover:bg-black/60"
                          aria-label="Foto precedente"
                        >
                          <ChevronLeft className="h-5 w-5 text-white" />
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setImgIndex((prev) =>
                              prev === images.length - 1 ? 0 : prev + 1
                            )
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/40 hover:bg-black/60"
                          aria-label="Foto successiva"
                        >
                          <ChevronRight className="h-5 w-5 text-white" />
                        </button>

                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {images.slice(0, 8).map((_, i) => (
                            <span
                              key={i}
                              className={`h-1.5 w-1.5 rounded-full ${
                                i === imgIndex ? "bg-white" : "bg-white/50"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-sm text-slate-500">
                    Nessuna foto disponibile
                  </div>
                )}
              </div>
            </article>

            {/* DX: BOOKING / RICHIESTA */}
            <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm h-full flex flex-col">
              <div className="flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                      Prenotazione & richieste
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                      Scegli la modalità più adatta: prenotazione a ore o
                      richiesta per periodi più lunghi.
                    </p>
                  </div>
                </div>

                {/* prezzi sintetici */}
                <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-slate-600">Da</span>
                    <span className="font-semibold text-slate-900">
                      {typeof minHourlyPrice === "number"
                        ? `€ ${minHourlyPrice} / ora`
                        : pricing.hourly
                        ? `${formatEuro(pricing.hourly)} / ora`
                        : "Su richiesta"}
                    </span>
                  </div>
                  {(pricing.daily || pricing.monthlyFrom) && (
                    <div className="mt-2 text-xs text-slate-600 space-y-1">
                      {pricing.daily && (
                        <div className="flex items-center justify-between">
                          <span>Giornaliero</span>
                          <span className="font-medium text-slate-800">
                            {formatEuro(pricing.daily)}
                          </span>
                        </div>
                      )}
                      {pricing.monthlyFrom && (
                        <div className="flex items-center justify-between">
                          <span>Mensile (da)</span>
                          <span className="font-medium text-slate-800">
                            {formatEuro(pricing.monthlyFrom)}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* === A) BOOKING ONLINE (hourly/both) === */}
                {(bookingMode === "hourly" || bookingMode === "both") && (
                  <div className="mt-5 rounded-2xl border border-slate-200 p-4">
                    <p className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-emerald-700" />
                      Prenota a ore (online)
                    </p>
                    <p className="mt-1 text-[11px] text-slate-600">
                      Seleziona un giorno e una fascia oraria. Pagamento online
                      (checkout).
                    </p>

                    {/* giorni */}
                    <div className="mt-4">
                      <p className="text-[11px] font-medium text-slate-500 mb-2">
                        Giorno
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {bookingDays.length > 0 ? (
                          bookingDays.slice(0, 6).map((d: any) => {
                            const disabled = d.available === false;
                            const active = selectedDate === d.date;
                            return (
                              <button
                                key={d.date}
                                type="button"
                                disabled={disabled}
                                onClick={() => {
                                  setSelectedDate(d.date);
                                  setSelectedTimeSlotId("");
                                }}
                                className={`inline-flex items-center justify-center rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                                  disabled
                                    ? "border-slate-200 bg-white/60 text-slate-400 cursor-not-allowed"
                                    : active
                                    ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                                    : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
                                }`}
                              >
                                {formatItalianDate(d.date)}
                              </button>
                            );
                          })
                        ) : (
                          <p className="text-[11px] text-slate-500 col-span-2">
                            Date non presenti nei dati.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* fasce */}
                    <div className="mt-4">
                      <p className="text-[11px] font-medium text-slate-500 mb-2">
                        Fascia oraria
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        {bookingSlots.length > 0 ? (
                          bookingSlots.map((slot: any) => {
                            const disabled =
                              slot.available === false || !selectedDate;
                            const active = selectedTimeSlotId === slot.id;
                            return (
                              <button
                                key={slot.id}
                                type="button"
                                disabled={disabled}
                                onClick={() => setSelectedTimeSlotId(slot.id)}
                                className={`inline-flex items-center justify-between rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                                  disabled
                                    ? "border-slate-200 bg-white/60 text-slate-400 cursor-not-allowed"
                                    : active
                                    ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                                    : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
                                }`}
                              >
                                <span className="inline-flex items-center gap-2">
                                  <Clock className="h-3.5 w-3.5" />
                                  {slot.label}
                                </span>
                                {slot.available === false && (
                                  <span className="text-[10px] opacity-70">
                                    non disp.
                                  </span>
                                )}
                              </button>
                            );
                          })
                        ) : (
                          <p className="text-[11px] text-slate-500">
                            Fasce orarie non presenti nei dati.
                          </p>
                        )}
                      </div>

                      {!selectedDate && bookingSlots.length > 0 && (
                        <p className="mt-2 text-[11px] text-slate-500">
                          Seleziona prima un giorno.
                        </p>
                      )}
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <p className="text-[11px] text-slate-600">
                        {canSubmit
                          ? `Selezionato: ${formatItalianDate(
                              selectedDate
                            )} · ${slotLabel}`
                          : "Completa la selezione per procedere al pagamento."}
                      </p>

                      <Link
                        href={checkoutHref}
                        className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-xs font-semibold transition ${
                          canSubmit
                            ? "bg-emerald-600 text-white hover:bg-emerald-700"
                            : "bg-slate-200 text-slate-500 pointer-events-none"
                        }`}
                      >
                        Vai al checkout
                      </Link>
                    </div>
                  </div>
                )}

                {/* === B) RICHIESTA CONTINUATIVA (request/both) === */}
                {(bookingMode === "request" || bookingMode === "both") && (
                  <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                      <Mail className="h-4 w-4 text-slate-700" />
                      Utilizzo continuativo (richiesta)
                    </p>
                    <p className="mt-1 text-[11px] text-slate-600">
                      Per periodi più lunghi organizziamo visita, preventivo e
                      contratto.
                    </p>

                    <Link
                      href={requestHref}
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-100"
                    >
                      Invia richiesta
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                )}
              </div>

              {/* footer del box (sempre visibile) */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <p className="text-[11px] text-slate-500">
                  Nota: disponibilità e prezzi possono variare. Conferma finale
                  tramite prenotazione online o contatto.
                </p>
              </div>
            </article>

            {/* SOTTO: CARATTERISTICHE (stessa larghezza del blocco sopra: span 2 colonne) */}
            <article className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
              <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                Caratteristiche dello spazio
              </h2>

              {space.description ? (
                <p className="mt-2 text-sm text-slate-600 max-w-3xl">
                  {space.description}
                </p>
              ) : (
                <p className="mt-2 text-sm text-slate-600 max-w-3xl">
                  Informazioni e dotazioni principali dello spazio.
                </p>
              )}

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {(space.features ?? []).length > 0 ? (
                  space.features!.map((f) => (
                    <div
                      key={f}
                      className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800"
                    >
                      {f}
                    </div>
                  ))
                ) : (
                  <div className="sm:col-span-2 lg:col-span-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-600">
                    Nessuna caratteristica inserita nei dati per questo spazio.
                  </div>
                )}
              </div>

              {/* mini “info” coerente */}
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
                <p className="text-xs font-semibold text-slate-900">
                  Suggerimento
                </p>
                <p className="mt-1 text-[11px] text-slate-600">
                  Se ti serve un allestimento specifico (workshop, training,
                  riunioni ibride), indicacelo nella richiesta: ti proponiamo la
                  configurazione migliore.
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* CTA FINALE (coerente) */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-20">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10 text-center">
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
              Vuoi usare questo spazio?
            </h3>
            <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
              Prenota a ore direttamente online oppure inviaci una richiesta per
              utilizzi continuativi e visite in sede.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              {bookingMode !== "request" ? (
                <button
                  type="button"
                  onClick={() => {
                    // scroll al box booking
                    const el = document.querySelector("#booking-box");
                    el?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-white font-medium hover:bg-emerald-700"
                >
                  Prenota a ore
                </button>
              ) : null}

              <Link
                href={requestHref}
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-slate-800 font-medium hover:bg-slate-100"
              >
                Invia richiesta
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        .section-title {
          font-size: clamp(1.6rem, 2.6vw, 2.4rem);
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid #cbd5e1;
          padding: 0.55rem 0.8rem;
          font-size: 0.875rem;
          background: white;
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
