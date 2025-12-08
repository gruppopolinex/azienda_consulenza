// app/trasparenza/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  FileText,
  Download,
  ShieldCheck,
  CheckCircle2,
  ClipboardList,
  ChevronRight,
} from "lucide-react";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function TrasparenzaPage() {
  return (
    <>
      <Nav />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
        {/* HERO / TITOLO CON LOGO */}
        <header className="text-center max-w-4xl mx-auto">
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

          <h1 className="section-title">Trasparenza</h1>
          <p className="mt-4 text-slate-600 leading-relaxed">
            In questa sezione trovi i principali dati societari, la documentazione
            economico-amministrativa scaricabile e le informazioni sui sistemi
            di gestione e certificazioni adottati da Polinex srl.
          </p>
        </header>

        {/* SEZIONE 1 – DATI SOCIETARI & DOCUMENTI ECONOMICI */}
        <section className="mt-20">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Dati societari & documentazione economica
          </h2>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl">
            Rendiamo disponibili i principali dati di identificazione societaria e
            la documentazione economico-finanziaria rilevante, in ottica di
            chiarezza verso clienti, fornitori, partner e pubbliche amministrazioni.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* Card dati societari */}
            <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
                <Building2 className="h-4 w-4" />
                Dati societari
              </div>

              <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-700">
                <div>
                  <dt className="font-semibold">Ragione sociale</dt>
                  <dd className="mt-0.5">Polinex srl</dd>
                </div>
                <div>
                  <dt className="font-semibold">Forma giuridica</dt>
                  <dd className="mt-0.5">Società a responsabilità limitata</dd>
                </div>
                <div>
                  <dt className="font-semibold">Sede legale</dt>
                  <dd className="mt-0.5">
                    Via Esempio 123, 35100 Padova (PD), Italia
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">Sede operativa</dt>
                  <dd className="mt-0.5">
                    Via Esempio 123, 35100 Padova (PD), Italia
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold">P.IVA / C.F.</dt>
                  <dd className="mt-0.5">01234567890</dd>
                </div>
                <div>
                  <dt className="font-semibold">Iscrizione CCIAA</dt>
                  <dd className="mt-0.5">CCIAA Padova – REA PD-000000</dd>
                </div>
                <div>
                  <dt className="font-semibold">Capitale sociale</dt>
                  <dd className="mt-0.5">€ 10.000,00 i.v.</dd>
                </div>
                <div>
                  <dt className="font-semibold">PEC</dt>
                  <dd className="mt-0.5 break-all">polinex@pec.it</dd>
                </div>
              </dl>
            </article>

            {/* Card documenti scaricabili */}
            <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-3 py-1 text-xs font-medium">
                <FileText className="h-4 w-4" />
                Documentazione scaricabile
              </div>

              <p className="mt-4 text-sm text-slate-600">
                Di seguito una selezione dei principali documenti economico-amministrativi.
                Le versioni aggiornate possono essere richieste, ove non già disponibili,
                tramite l&apos;apposita sezione contatti.
              </p>

              <ul className="mt-6 space-y-3 text-sm">
                <DocumentLink
                  label="Bilancio d’esercizio (conto economico e stato patrimoniale)"
                  year="2023"
                  href="/docs/bilancio-2023.pdf"
                />
                <DocumentLink
                  label="Nota integrativa al bilancio"
                  year="2023"
                  href="/docs/nota-integrativa-2023.pdf"
                />
                <DocumentLink
                  label="Visura camerale aggiornata"
                  href="/docs/visura-camerale.pdf"
                />
                <DocumentLink
                  label="Atto costitutivo e Statuto"
                  href="/docs/atto-costitutivo-statuto.pdf"
                />
              </ul>

              <p className="mt-4 text-xs text-slate-500">
                I file indicati sono esempi: sostituisci i percorsi con i PDF
                effettivamente disponibili nella tua documentazione interna.
              </p>
            </article>
          </div>
        </section>

        {/* SEZIONE 2 – CERTIFICAZIONI E SISTEMI DI GESTIONE */}
        <section className="mt-24">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
            Certificazioni & sistemi di gestione
          </h2>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl">
            La gestione dei progetti e dei cantieri si basa su procedure strutturate,
            in linea con le norme tecniche applicabili e con le migliori pratiche di
            settore. Di seguito una sintesi degli standard di riferimento e delle
            eventuali certificazioni formali.
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* Qualità */}
            <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
              <ShieldCheck className="h-6 w-6 text-emerald-600" />
              <h3 className="mt-4 font-semibold text-slate-900">
                Sistema di Gestione Qualità
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Processi tecnici e organizzativi orientati alla tracciabilità,
                alla gestione delle non conformità e al miglioramento continuo.
              </p>
              <ul className="mt-4 space-y-1 text-sm text-slate-700">
                <li>• Procedure interne per la validazione dei deliverable tecnici</li>
                <li>• Tracciabilità revisioni e versioni dei documenti</li>
                <li>• Riesami periodici dei progetti complessi</li>
              </ul>
              <p className="mt-3 text-xs text-slate-500">
                Eventuale certificazione ISO 9001 potrà essere indicata qui una
                volta formalizzata.
              </p>
            </article>

            {/* Sicurezza / HSE */}
            <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
              <ClipboardList className="h-6 w-6 text-emerald-600" />
              <h3 className="mt-4 font-semibold text-slate-900">
                Sicurezza sul lavoro & Cantieri
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Organizzazione della sicurezza conforme al D.Lgs. 81/08, con
                particolare attenzione a cantieri e attività ad elevata complessità.
              </p>
              <ul className="mt-4 space-y-1 text-sm text-slate-700">
                <li>• Ruoli CSP/CSE per cantieri temporanei e mobili</li>
                <li>• Redazione PSC, POS e DVR di competenza</li>
                <li>• Coordinamento con imprese esecutrici e committenti</li>
              </ul>
              <p className="mt-3 text-xs text-slate-500">
                L&apos;eventuale adozione di un Sistema di Gestione Salute e Sicurezza
                (ISO 45001) può essere documentata in questa sezione.
              </p>
            </article>

            {/* Ambiente / Energia / Altro */}
            <article className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
              <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              <h3 className="mt-4 font-semibold text-slate-900">
                Ambiente, energia & altri standard
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Gestione dei progetti con riferimento alle normative ambientali
                e agli standard di settore su energia ed emissioni.
              </p>
              <ul className="mt-4 space-y-1 text-sm text-slate-700">
                <li>• Inquadramento rispetto a VIA, VAS, AUA/AIA</li>
                <li>• Audit energetici e monitoraggi prestazionali</li>
                <li>• Supporto alla committenza su bandi e requisiti ambientali</li>
              </ul>
              <p className="mt-3 text-xs text-slate-500">
                Eventuali certificazioni ISO 14001 / 50001 potranno essere
                riportate qui, con link agli attestati.
              </p>
            </article>
          </div>
        </section>

        {/* CTA FINALE → CONTATTI (stile pagina Portfolio) */}
        <section className="mx-auto max-w-7xl px-0 sm:px-0 lg:px-0 pb-20 mt-16">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10 text-center">
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
              Hai bisogno di documenti aggiuntivi?
            </h3>
            <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
              Per versioni aggiornate di bilanci, visure, attestati di certificazione
              o altre informazioni di trasparenza, puoi inviarci una richiesta
              dalla pagina contatti.
            </p>
            <Link
              href="/contatti"
              className="mt-6 inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-white font-medium hover:bg-emerald-700"
            >
              Contatta il team
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
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
      `}</style>
    </>
  );
}

/* ========== COMPONENTI DI SUPPORTO ========== */

function DocumentLink({
  label,
  href,
  year,
}: {
  label: string;
  href: string;
  year?: string;
}) {
  return (
    <li className="flex items-start justify-between gap-3">
      <div>
        <div className="font-medium text-slate-800">{label}</div>
        {year && (
          <div className="text-xs text-slate-500 mt-0.5">
            Ultimo esercizio disponibile: {year}
          </div>
        )}
      </div>
      <Link
        href={href}
        className="inline-flex items-center gap-1 rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50"
      >
        <Download className="h-3 w-3" />
        PDF
      </Link>
    </li>
  );
}
