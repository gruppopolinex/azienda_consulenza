"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Building2, Clock, Send } from "lucide-react";

/* Layout */
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function ContattiPage() {
  const ADDRESS = "Piazzale Roma, Venezia";
  const PHONE = "+39 000 000 0000";
  const EMAIL = "info@polinex.it";
  const PEC = "polinex@pec.it";
  const PIVA = "P.IVA / CF 00000000000";

  const mapsEmbed =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.2817137792016!2d12.3093150762663!3d45.43825297107219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477eb1c7e9f9b7d1%3A0x7dcbcf4b66fdb1f7!2sPiazzale%20Roma%2C%2030121%20Venezia%20VE!5e0!3m2!1sit!2sit!4v1700000000000";

  return (
    <>
      <Nav />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
        {/* Intro */}
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
            <strong>1 giorno lavorativo</strong>.
          </p>
        </section>

        {/* Contenuto */}
        <section className="pb-16 mt-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1.15fr)] lg:items-stretch">
            {/* Colonna sinistra */}
            <div className="flex flex-col gap-8 h-full">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
                  Sede operativa & riferimenti
                </h2>

                <div className="mt-6 space-y-5 text-sm text-slate-700">
                  <InfoRow icon={<MapPin />} label="Indirizzo" value={ADDRESS} />
                  <InfoRow
                    icon={<Phone />}
                    label="Telefono"
                    value={
                      <a
                        href={`tel:${PHONE.replace(/\s+/g, "")}`}
                        className="hover:text-emerald-700"
                      >
                        {PHONE}
                      </a>
                    }
                  />
                  <InfoRow
                    icon={<Mail />}
                    label="Email"
                    value={
                      <>
                        <a
                          href={`mailto:${EMAIL}`}
                          className="hover:text-emerald-700"
                        >
                          {EMAIL}
                        </a>
                        <div className="text-xs text-slate-500">
                          PEC:{" "}
                          <a
                            href={`mailto:${PEC}`}
                            className="underline hover:text-emerald-700"
                          >
                            {PEC}
                          </a>
                        </div>
                      </>
                    }
                  />
                  <InfoRow
                    icon={<Building2 />}
                    label="Dati societari"
                    value={PIVA}
                  />
                  <InfoRow
                    icon={<Clock />}
                    label="Orari"
                    value="Lun–Ven: 9:00–13:00 / 14:00–18:00"
                  />
                </div>
              </div>

              <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 flex-1">
                <iframe
                  src={mapsEmbed}
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Colonna destra – FORM */}
            <div className="h-full">
              <div className="h-full rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col">
                <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-900">
                  Inviaci una richiesta
                </h2>

                <form
                  className="mt-6 space-y-4 flex-1 flex flex-col"
                  onSubmit={async (e) => {
                    e.preventDefault();

                    const form = e.currentTarget;
                    const fd = new FormData(form);

                    const payload = {
                      nome: fd.get("nome"),
                      azienda: fd.get("azienda"),
                      email: fd.get("email"),
                      telefono: fd.get("telefono"),
                      ambito: fd.get("ambito"),
                      messaggio: fd.get("messaggio"),
                    };

                    const res = await fetch("/api/contatti", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(payload),
                    });

                    const data = await res.json().catch(() => null);

                    if (res.ok) {
                      form.reset();
                      alert(
                        "Richiesta inviata! Ti risponderemo entro 1 giorno lavorativo."
                      );
                    } else {
                      alert(data?.error ?? "Errore nell’invio. Riprova.");
                    }
                  }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Nome e cognome *"
                      name="nome"
                      type="text"
                      required
                    />
                    <Field label="Azienda / Ente" name="azienda" type="text" />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Email *"
                      name="email"
                      type="email"
                      required
                    />
                    <Field label="Telefono" name="telefono" type="tel" />
                  </div>

                  <select name="ambito" className="input">
                    <option value="">Seleziona un’area</option>
                    <option>Acqua</option>
                    <option>Ambiente</option>
                    <option>Energia</option>
                    <option>Agricoltura</option>
                    <option>Sicurezza</option>
                    <option>Edilizia e Infrastrutture</option>
                    <option>Bandi e Finanziamenti</option>
                    <option>Formazione</option>
                    <option>Editoria</option>
                    <option>Gestionali</option>
                    <option>Coworking</option>
                    <option>Altro</option>
                  </select>

                  <textarea
                    name="messaggio"
                    rows={5}
                    required
                    className="input"
                    placeholder="Descrivi il progetto, il contesto o la richiesta…"
                  />

                  <div className="mt-3 flex justify-center">
                    <button
                      type="submit"
                      className="btn-primary inline-flex items-center gap-2"
                    >
                      Invia richiesta <Send className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* CTA finale – Coworking */}
        <section className="mx-auto max-w-7xl pb-20">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10 text-center">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
              Vuoi vedere da vicino le nostre sedi?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
              Esplora gli spazi di coworking, gli uffici e le sale riunioni
              disponibili nelle sedi Polinex.
            </p>
            <div className="mt-6">
              <Link
                href="/coworking"
                className="inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-sm sm:text-base font-medium text-white hover:bg-emerald-700"
              >
                Scopri le nostre sedi e gli spazi di lavoro
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style jsx global>{`
        .section-title {
          font-size: clamp(1.5rem, 2.4vw, 2.5rem);
          font-weight: 600;
        }
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid #cbd5e1;
          padding: 0.55rem 0.8rem;
          font-size: 0.875rem;
        }
        .btn-primary {
          background: #059669;
          color: white;
          padding: 0.65rem 1.4rem;
          border-radius: 999px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}

/* Componenti helper */

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string;
  name: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="input mt-1"
      />
    </div>
  );
}

function InfoRow({ icon, label, value }: any) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 h-5 w-5 text-emerald-600">{icon}</span>
      <div>
        <div className="font-medium">{label}</div>
        <div className="mt-0.5">{value}</div>
      </div>
    </div>
  );
}
