// app/servizi/coworking/[locationslug]/page.tsx
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
  Laptop,
  Phone,
  Mail,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";

import {
  LOCATIONS,
  type Location,
  type SpaceType,
  type LocationSpace,
} from "../_data";

/* ==================== UTILS ==================== */

function extractMinHourlyPrice(spaceItem: any): number | null {
  if (typeof spaceItem?.minHourlyPrice === "number") return spaceItem.minHourlyPrice;

  if (typeof spaceItem?.pricing?.minHourly === "number") return spaceItem.pricing.minHourly;

  if (typeof spaceItem?.priceHourlyFrom === "number") return spaceItem.priceHourlyFrom;

  const str = spaceItem?.price || spaceItem?.priceLabel || "";
  const m = String(str).replace(",", ".").match(/(\d+(\.\d+)?)/);
  return m?.[1] ? Number(m[1]) : null;
}

function formatEuro(n: number) {
  return n.toFixed(0);
}

/* ==================== PAGINA ==================== */

export default function CoworkingLocationPage() {
  const params = useParams<{ locationslug: string }>();
  const router = useRouter();

  const locationSlug = Array.isArray(params.locationslug)
    ? params.locationslug[0]
    : params.locationslug;

  const location: Location | undefined = useMemo(
    () => LOCATIONS.find((l) => l.slug === locationSlug),
    [locationSlug]
  );

  const [spaceTypeFilter, setSpaceTypeFilter] = useState<SpaceType | "Tutti">("Tutti");

  if (!location) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Nav />
        <main className="flex-1 mx-auto max-w-3xl px-4 py-16">
          <button
            onClick={() => router.push("/servizi/coworking")}
            className="inline-flex items-center gap-2 text-sm text-slate-600 mb-6 hover:text-slate-900 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Torna agli spazi
          </button>

          <div className="rounded-3xl border bg-slate-50 p-10 text-center">
            <h1 className="section-title">Sede non trovata</h1>
            <p className="mt-3 text-sm text-slate-600">
              La sede richiesta non è disponibile.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const availableTypes = Array.from(new Set((location.spaces ?? []).map((s) => s.type))) as SpaceType[];

  const filteredSpaces =
    spaceTypeFilter === "Tutti"
      ? location.spaces
      : location.spaces.filter((s) => s.type === spaceTypeFilter);

  const regularClients = (location as any).regularClients ?? [];
  const showRegularClients = Array.isArray(regularClients) && regularClients.length > 0;

  const cta =
    (location as any).cta ?? {
      title: "Vuoi avere maggiori informazioni su questa sede?",
      description: "Contattaci per disponibilità, visite o preventivi personalizzati.",
      buttonLabel: "Contattaci",
      href: "/contatti",
    };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Nav />

      <main className="flex-1">
        {/* HERO */}
        <section className="border-b bg-gradient-to-b from-slate-50 to-white">
          <div className="mx-auto max-w-6xl px-4 py-8">
            <button
              onClick={() => router.push("/servizi/coworking")}
              className="inline-flex items-center gap-2 text-xs text-slate-600 mb-5 hover:text-slate-900 transition"
            >
              <ArrowLeft className="h-3 w-3" />
              Torna alle sedi
            </button>

            <div className="flex flex-col gap-3">
              <h1 className="section-title flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 border border-emerald-200">
                  <Building2 className="h-5 w-5" />
                </span>
                {location.name}
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                <p className="text-sm text-emerald-700 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {location.address}
                </p>

                {(location.phone || location.email) && (
                  <div className="mt-2 sm:mt-0 flex gap-4 text-xs text-slate-600">
                    {location.phone && (
                      <a
                        href={`tel:${location.phone}`}
                        className="flex items-center gap-1 hover:text-slate-900 transition"
                      >
                        <Phone className="h-3 w-3" />
                        {location.phone}
                      </a>
                    )}
                    {location.email && (
                      <a
                        href={`mailto:${location.email}`}
                        className="flex items-center gap-1 hover:text-slate-900 transition"
                      >
                        <Mail className="h-3 w-3" />
                        {location.email}
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* HOW IT WORKS */}
              <div className="mt-2 rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
                <h2 className="text-sm font-semibold text-slate-900">
                  Come funziona la prenotazione
                </h2>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Seleziona qui sotto lo spazio che ti interessa e apri la scheda dedicata. Puoi{" "}
                  <strong>prenotare a ore</strong> e completare il{" "}
                  <strong>pagamento online in modo sicuro</strong>, oppure{" "}
                  <strong>inviare una richiesta</strong> per{" "}
                  <strong>locazioni continuative</strong> (uffici o utilizzi ricorrenti),
                  così da ricevere una proposta personalizzata.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DESCRIZIONE + MAPPA */}
        <section className="mx-auto max-w-6xl px-4 py-10 grid lg:grid-cols-2 gap-6">
          <div className="relative overflow-hidden rounded-3xl border bg-slate-100 shadow-sm">
            <Image
              src={location.image}
              alt={location.name}
              width={900}
              height={520}
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/35 to-transparent" />
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col">
            <p className="text-sm text-slate-700 leading-relaxed flex-1">
              {location.description}
            </p>

            {(location as any).mapUrl && (
              <Link
                href={(location as any).mapUrl}
                target="_blank"
                className="mt-5 inline-flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 hover:bg-slate-100 transition"
              >
                <span className="text-xs font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-emerald-700" />
                  Apri su Google Maps
                </span>
                <ExternalLink className="h-4 w-4 text-slate-600" />
              </Link>
            )}
          </div>
        </section>

        {/* SPAZI */}
        <section className="mx-auto max-w-6xl px-4 pb-12">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6">
            <div>
              <h2 className="text-lg font-semibold">Spazi disponibili</h2>
              <p className="mt-1 text-sm text-slate-600">
                Filtra per tipologia per trovare più velocemente lo spazio giusto.
              </p>
            </div>

            <div className="max-w-xs w-full">
              <label className="block text-xs font-medium text-slate-500 mb-2">
                Tipologia spazio
              </label>
              <select
                className="input"
                value={spaceTypeFilter}
                onChange={(e) => setSpaceTypeFilter(e.target.value as SpaceType | "Tutti")}
              >
                <option value="Tutti">Tutti</option>
                {availableTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredSpaces.map((s) => (
              <SpaceCard key={s.slug} location={location} spaceItem={s} />
            ))}
          </div>

          {filteredSpaces.length === 0 && (
            <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-600">
              Nessuno spazio trovato per i filtri selezionati.
            </div>
          )}
        </section>

        {/* CLIENTI (solo se presenti in _data) */}
        {showRegularClients && (
          <section className="mx-auto max-w-6xl px-4 pb-12">
            <h2 className="text-lg font-semibold">Clienti abituali</h2>
            <p className="mt-1 text-sm text-slate-600">
              Realtà che utilizzano frequentemente questa sede.
            </p>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {regularClients.map((c: any) => (
                <div
                  key={c.name}
                  className="rounded-2xl border border-slate-200 bg-white p-4 flex items-center justify-center shadow-sm"
                >
                  <Image
                    src={c.logoSrc}
                    alt={c.name}
                    width={120}
                    height={40}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-8 sm:p-10 text-center shadow-sm">
            <h3 className="text-2xl font-semibold">{cta.title}</h3>
            <p className="mt-3 text-slate-600">{cta.description}</p>
            <Link
              href={cta.href}
              className="mt-6 inline-flex items-center rounded-2xl bg-emerald-600 px-5 py-3 text-white font-medium hover:bg-emerald-700 transition"
            >
              {cta.buttonLabel}
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      {/* Stili globali */}
      <style jsx global>{`
        .section-title {
          font-size: clamp(1.55rem, 2.4vw, 2.6rem);
          font-weight: 650;
          letter-spacing: -0.02em;
        }
        .input {
          width: 100%;
          border-radius: 1rem;
          border: 1px solid #cbd5e1;
          padding: 0.6rem 0.9rem;
          font-size: 0.875rem;
          background: white;
        }
        .input:focus {
          border-color: #059669;
          outline: none;
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.18);
        }
      `}</style>
    </div>
  );
}

/* ==================== COMPONENTI ==================== */

function SpaceIcon({ type }: { type: SpaceType }) {
  if (type === "Sala riunioni") return <Users className="h-4 w-4 text-slate-200" />;
  if (type === "Postazione coworking") return <Laptop className="h-4 w-4 text-slate-200" />;
  return <Building2 className="h-4 w-4 text-slate-200" />;
}

function SpaceCard({
  location,
  spaceItem,
}: {
  location: Location;
  spaceItem: LocationSpace;
}) {
  const images = spaceItem.images ?? [];
  const [imgIndex, setImgIndex] = useState(0);

  const min = extractMinHourlyPrice(spaceItem);
  const minLabel =
    typeof min === "number" ? `da ${formatEuro(min)} €/ora` : "Prezzo su richiesta";

  return (
    <article className="rounded-[2rem] border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="relative h-44 bg-slate-100">
        {images.length > 0 && (
          <Image src={images[imgIndex]} alt={spaceItem.label} fill className="object-cover" />
        )}

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => setImgIndex((i) => (i === 0 ? images.length - 1 : i - 1))}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/45 hover:bg-black/55 transition rounded-full p-2"
              aria-label="Immagine precedente"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>
            <button
              type="button"
              onClick={() => setImgIndex((i) => (i === images.length - 1 ? 0 : i + 1))}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/45 hover:bg-black/55 transition rounded-full p-2"
              aria-label="Immagine successiva"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </button>
          </>
        )}

        <div className="absolute top-3 left-3 bg-black/55 px-2.5 py-1 rounded-full text-xs text-white flex items-center gap-1.5 backdrop-blur">
          <SpaceIcon type={spaceItem.type} />
          {spaceItem.type}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-semibold">{spaceItem.label}</h3>
        {spaceItem.capacity && <p className="mt-1 text-xs text-slate-500">{spaceItem.capacity}</p>}

        <div className="mt-4 flex justify-between items-center gap-3">
          <span className="font-semibold text-slate-900">{minLabel}</span>
          <Link
            href={`/servizi/coworking/${location.slug}/${spaceItem.slug}`}
            className="inline-flex items-center gap-1 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm hover:bg-slate-50 transition"
          >
            Approfondisci
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
