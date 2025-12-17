// app/coworking/[slug]/page.tsx
"use client";

import { useMemo, useState } from "react";
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
  Laptop,
  Phone,
  Mail,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Filter as FilterIcon,
  Calendar,
  Clock,
} from "lucide-react";

import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

// Dati centralizzati
import {
  LOCATIONS,
  type Location,
  type SpaceType,
  type LocationSpace,
} from "../_data";

/* ==================== UTILITY ==================== */

function formatItalianDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-");
  return `${day}/${month}/${year}`;
}

/* ==================== PAGINA ==================== */

export default function CoworkingDetailPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();

  const slugParam = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const space: Location | undefined = useMemo(
    () => LOCATIONS.find((s) => s.slug === slugParam),
    [slugParam]
  );

  // filtro card spazi
  const [spaceTypeFilter, setSpaceTypeFilter] = useState<SpaceType | "Tutti">(
    "Tutti"
  );

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

  const availableTypes = Array.from(
    new Set(space.spaces.map((s) => s.type))
  ) as SpaceType[];

  const filteredSpaces =
    spaceTypeFilter === "Tutti"
      ? space.spaces
      : space.spaces.filter((s) => s.type === spaceTypeFilter);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Nav />

      <main className="flex-1">
        {/* HERO (lasciata come prima) */}
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

        {/* BLOCCO MINIMALE: video sx, descrizione + mappa dx */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
            {/* sinistra: video (o immagine se manca) */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 h-full">
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
                    sizes="(min-width: 1024px) 560px, 100vw"
                  />
                )}
              </div>
            </div>

            {/* destra: descrizione (1/2) + mappa (1/2) */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 h-full flex flex-col">
              <div className="flex-1 min-h-0">
                <p className="text-sm text-slate-700 leading-relaxed">
                  {space.description}
                </p>

                {space.services && space.services.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-600">
                    {space.services.slice(0, 6).map((srv) => (
                      <span
                        key={srv}
                        className="inline-flex items-center rounded-full bg-slate-50 border border-slate-200 px-2 py-0.5"
                      >
                        {srv}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100">
                {space.mapUrl ? (
                  <Link
                    href={space.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-xl border border-slate-200 bg-slate-50 p-4 hover:bg-slate-100 transition"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-900 flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-emerald-700" />
                          Apri su Google Maps
                        </p>
                        <p className="mt-1 text-[11px] text-slate-600 truncate">
                          {space.address}
                        </p>
                      </div>
                      <ExternalLink className="h-4 w-4 text-slate-500" />
                    </div>
                  </Link>
                ) : (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-semibold text-slate-900">
                      Mappa non disponibile
                    </p>
                    <p className="mt-1 text-[11px] text-slate-600">
                      Link Google Maps non presente nei dati.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* SPAZI: filtro + card con carosello + prezzo + booking inline */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pb-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                Spazi disponibili
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Filtra e prenota selezionando giorno e fascia oraria.
              </p>
            </div>

            <div className="max-w-xs w-full">
              <label className="block text-xs font-medium text-slate-500 mb-2">
                Filtra per tipologia
              </label>
              <div className="relative">
                <select
                  className="input pr-9"
                  value={spaceTypeFilter}
                  onChange={(e) =>
                    setSpaceTypeFilter(e.target.value as SpaceType | "Tutti")
                  }
                >
                  <option value="Tutti">Tutti gli spazi</option>
                  {availableTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <FilterIcon className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-400" />
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSpaces.map((s) => (
              <SpaceCard key={s.label} location={space} spaceItem={s} />
            ))}

            {filteredSpaces.length === 0 && (
              <div className="col-span-full rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-600">
                Nessuno spazio trovato per il filtro selezionato.
              </div>
            )}
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
          background: white;
        }
        .input:focus {
          border-color: #059669;
          outline: none;
          box-shadow: 0 0 0 1px #059669;
        }
        .btn-primary {
          background: #059669;
          color: white;
          padding: 0.65rem 1rem;
          border-radius: 0.9rem;
          font-weight: 700;
          font-size: 0.875rem;
        }
        .btn-primary:hover {
          background: #047857;
        }
      `}</style>
    </div>
  );
}

/* ==================== COMPONENTI ==================== */

function SpaceIcon({ type }: { type: SpaceType }) {
  if (type === "Sala riunioni") return <Users className="h-4 w-4 text-slate-500" />;
  if (type === "Postazione coworking") return <Laptop className="h-4 w-4 text-slate-500" />;
  return <Building2 className="h-4 w-4 text-slate-500" />;
}

function SpaceCard({
  location,
  spaceItem,
}: {
  location: Location;
  spaceItem: LocationSpace;
}) {
  const images = spaceItem.images ?? [];
  const hasImages = images.length > 0;

  // carosello interno
  const [imgIndex, setImgIndex] = useState(0);

  // booking inline (apri/chiudi)
  const [openBooking, setOpenBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<string>("");

  // dati booking: per-spazio se esiste, altrimenti per-sede
  const bookingDays =
    (spaceItem as any).booking?.days ?? (location as any).booking?.days ?? [];
  const bookingSlots =
    (spaceItem as any).booking?.timeSlots ??
    (location as any).booking?.timeSlots ??
    [];

  const slotLabel =
    bookingSlots.find((x: any) => x.id === selectedTimeSlotId)?.label ?? "";

  const priceLabel =
    (spaceItem as any).price ??
    (spaceItem as any).priceLabel ??
    (spaceItem as any).pricing ??
    "Su richiesta";

  const canSubmit = Boolean(selectedDate && selectedTimeSlotId);

  const mailtoHref = useMemo(() => {
    const to = location.email || "";
    const subject = `Richiesta prenotazione – ${location.name} – ${spaceItem.label}`;
    const bodyLines = [
      `Sede: ${location.name} (${location.city})`,
      `Spazio: ${spaceItem.label} (${spaceItem.type})`,
      `Data: ${selectedDate ? formatItalianDate(selectedDate) : "-"}`,
      `Fascia oraria: ${selectedTimeSlotId ? slotLabel : "-"}`,
      `Persone/Capienza: ${spaceItem.capacity ?? "-"}`,
      ``,
      `Messaggio:`,
    ];
    const body = bodyLines.join("\n");
    return to
      ? `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
          body
        )}`
      : `/contatti?city=${encodeURIComponent(location.city)}&space=${encodeURIComponent(
          spaceItem.label
        )}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.email, location.city, location.name, spaceItem.label, spaceItem.type, spaceItem.capacity, selectedDate, selectedTimeSlotId, slotLabel]);

  return (
    <article className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      {/* media */}
      <div className="relative h-44 bg-slate-100">
        {hasImages ? (
          <>
            <Image
              src={images[imgIndex]}
              alt={spaceItem.label}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 320px, 100vw"
            />

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/40 hover:bg-black/60"
                  aria-label="Foto precedente"
                >
                  <ChevronLeft className="h-5 w-5 text-white" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/40 hover:bg-black/60"
                  aria-label="Foto successiva"
                >
                  <ChevronRight className="h-5 w-5 text-white" />
                </button>

                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {images.slice(0, 6).map((_, i) => (
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
          <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-500">
            Nessuna foto disponibile
          </div>
        )}

        <div className="absolute left-3 top-3 inline-flex items-center rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
          <SpaceIcon type={spaceItem.type} />
          <span className="ml-1">{spaceItem.type}</span>
        </div>
      </div>

      {/* content */}
      <div className="p-4 sm:p-5">
        <h3 className="text-sm font-semibold text-slate-900">{spaceItem.label}</h3>
        {spaceItem.capacity && (
          <p className="mt-1 text-[11px] text-slate-500">{spaceItem.capacity}</p>
        )}

        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-slate-900">
            {typeof priceLabel === "string" ? priceLabel : "Su richiesta"}
          </p>
          <button
            type="button"
            onClick={() => setOpenBooking((v) => !v)}
            className="btn-primary"
          >
            Prenota
          </button>
        </div>

        {/* booking inline */}
        {openBooking && (
          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-semibold text-slate-900 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-slate-600" />
              Seleziona giorno e fascia oraria
            </p>

            {/* giorni */}
            <div className="mt-3">
              <p className="text-[11px] font-medium text-slate-600 mb-2">
                Giorno
              </p>
              <div className="grid grid-cols-2 gap-2">
                {bookingDays.length > 0 ? (
                  bookingDays.slice(0, 8).map((d: any) => {
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
                        className={`inline-flex items-center justify-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                          disabled
                            ? "border-slate-200 bg-white/60 text-slate-400 cursor-not-allowed"
                            : active
                            ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                            : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50"
                        }`}
                      >
                        <Calendar className="h-3.5 w-3.5" />
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
              <p className="text-[11px] font-medium text-slate-600 mb-2">
                Fascia oraria
              </p>
              <div className="grid grid-cols-1 gap-2">
                {bookingSlots.length > 0 ? (
                  bookingSlots.map((slot: any) => {
                    const disabled = slot.available === false || !selectedDate;
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
                          <span className="text-[10px] opacity-70">non disp.</span>
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
                  ? `Selezionato: ${formatItalianDate(selectedDate)} · ${slotLabel}`
                  : "Completa la selezione per inviare la richiesta."}
              </p>

              <Link
                href={mailtoHref}
                className={`inline-flex items-center justify-center rounded-xl px-4 py-2 text-xs font-semibold transition ${
                  canSubmit
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-slate-200 text-slate-500 pointer-events-none"
                }`}
              >
                Invia richiesta
              </Link>
            </div>

            {!location.email && (
              <p className="mt-2 text-[11px] text-slate-500">
                Email sede non presente nei dati: invio tramite pagina contatti.
              </p>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
