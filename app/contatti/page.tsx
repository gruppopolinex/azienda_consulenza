"use client";

import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Building2,
  Clock,
  Send,
} from "lucide-react";

/* Layout */
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function ContattiPage() {
  const ADDRESS = "Via Esempio 123, 35100 Padova (PD)";
  const PHONE = "+39 000 000 0000";
  const EMAIL = "info@polinex.it";
  const PEC = "polinex@pec.it";
  const PIVA = "P.IVA / CF 00000000000";

  const mapsEmbed =
    "https://www.google.com/maps/embed?pb=!1m18!2m3!1d0!2d11.878!3d45.407!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0:0x0!2zNDUuNDA3LCAxMS44Nzg!5e0!3m2!1sit!2sit!4v0000000000";

  return (
    <>
      <Nav />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
        {/* Intro: logo + titolo + sottotitolo, come pagine servizi */}
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

          <h1 className="section-title">Parliamo del tuo progetto</h1>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Raccontaci contesto, vincoli e obiettivi. Ti rispondiamo entro{" "}
            <strong>1 giorno lavorativo</strong> per definire insieme i
            prossimi step tecnici e autorizzativi.
          </p>
        </section>

        {/* Contenuto */}
        <section className="pb-20 mt-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.15fr)] lg:items-stretch">
            {/* Colonna sinistra ● Info + Mappa (allineata in basso alla card destra) */}
            <div className="flex flex-col gap-8 h-full">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
                  Sede operativa & riferimenti
                </h2>

                <div className="mt-6 space-y-5 text-sm text-slate-700">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-emerald-600" />
                    <div>
                      <div className="font-medium">Indirizzo</div>
                      <p className="mt-0.5">{ADDRESS}</p>
                      {/* Link "Apri in Google Maps" rimosso */}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-5 w-5 text-emerald-600" />
                    <div>
                      <div className="font-medium">Telefono</div>
                      <a
                        href={`tel:${PHONE.replace(/\s+/g, "")}`}
                        className="mt-0.5 block hover:text-emerald-700"
                      >
                        {PHONE}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-5 w-5 text-emerald-600" />
                    <div>
                      <div className="font-medium">Email</div>
                      <a
                        href={`mailto:${EMAIL}`}
                        className="mt-0.5 block hover:text-emerald-700"
                      >
                        {EMAIL}
                      </a>
                      <p className="mt-1 text-xs text-slate-500">
                        PEC:{" "}
                        <a
                          href={`mailto:${PEC}`}
                          className="underline underline-offset-2 hover:text-emerald-700"
                        >
                          {PEC}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Building2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                    <div>
                      <div className="font-medium">Dati societari</div>
                      <p className="mt-0.5 text-xs text-slate-600">{PIVA}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-5 w-5 text-emerald-600" />
                    <div>
                      <div className="font-medium">Orari</div>
                      <p className="mt-0.5 text-sm text-slate-600">
                        Lun–Ven: 9:00–13:00 / 14:00–18:00
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mappa Google – base allineata alla card destra */}
              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 flex-1">
                <iframe
                  src={mapsEmbed}
                  className="w-full h-full"
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Colonna destra ● Form */}
            <div className="h-full">
              <div className="h-full rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col">
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
                  Inviaci una richiesta
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Alcune informazioni ci aiutano a capire subito se parliamo di{" "}
                  <strong>permessi</strong>, <strong>progetti</strong>,{" "}
                  <strong>cantieri</strong> o{" "}
                  <strong>bandi/finanziamenti</strong>.
                </p>

                <form className="mt-6 space-y-4 flex-1">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Nome e cognome *" type="text" required />
                    <Field label="Azienda / Ente" type="text" />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Email *" type="email" required />
                    <Field label="Telefono" type="tel" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Ambito di interesse
                    </label>
                    <select className="input mt-1" defaultValue="">
                      <option value="" disabled>
                        Seleziona un&apos;area
                      </option>
                      <option>Acqua</option>
                      <option>Ambiente</option>
                      <option>Energia</option>
                      <option>Agricoltura</option>
                      <option>Sicurezza</option>
                      <option>Edilizia e Infrastrutture</option>
                      <option>Bandi e Finanziamenti</option>
                      <option>Altro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Messaggio *
                    </label>
                    <textarea
                      rows={5}
                      required
                      className="input mt-1"
                      placeholder="Descrivi il progetto, il contesto o la richiesta…"
                    />
                  </div>

                  <p className="text-xs text-slate-500">
                    I tuoi dati saranno usati esclusivamente per poterti
                    ricontattare in merito alla richiesta.
                  </p>

                  <button
                    type="submit"
                    className="btn-primary mt-3 inline-flex items-center gap-2"
                  >
                    Invia richiesta
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Utility CSS: titoli, input, bottoni */}
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
    </>
  );
}

function Field({
  label,
  type,
  required,
}: {
  label: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input type={type} required={required} className="input mt-1" />
    </div>
  );
}
