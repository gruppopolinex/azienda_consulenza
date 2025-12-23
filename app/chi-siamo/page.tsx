// app/chi-siamo/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Users, Phone, Mail, Linkedin, ChevronRight } from "lucide-react";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function ChiSiamoPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Nav />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
        {/* ================= HERO ================= */}
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

          <h1 className="section-title">Scopri chi siamo</h1>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Tecnici e consulenti che trasformano idee in progetti autorizzati,
            finanziati e realizzati sul territorio.
          </p>
        </section>

        {/* ================= MISSIONE ================= */}
        <section className="mt-10 sm:mt-12 mb-24 grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Video aziendale */}
          <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-md bg-black">
            <iframe
              src="https://www.youtube.com/embed/VIDEO_ID"
              className="absolute inset-0 w-full h-full"
              allowFullScreen
            />
          </div>

          {/* Testo mission centrato verticalmente e orizzontalmente */}
          <div className="flex h-full items-center justify-center text-center">
            <div className="space-y-5 max-w-md">
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
                Una missione chiara
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Mettiamo insieme progettazione tecnica, iter autorizzativi e
                finanza agevolata per seguire l’intero ciclo di vita di un
                progetto: dall’idea iniziale al cantiere, fino alla gestione
                operativa.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Lavoriamo al fianco di imprese, PA, gestori e consorzi irrigui su
                interventi che hanno un impatto concreto su acqua, ambiente,
                energia, agricoltura, sicurezza ed edilizia.
              </p>
            </div>
          </div>
        </section>

        {/* ================= TEAM ================= */}
        <section className="mb-7">
          <h2 className="text-center text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 mb-7">
            Un team in crescita
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((person) => (
              <article
                key={person.name}
                className="rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm group"
              >
                {/* Riquadro foto PIÙ ALTO */}
                <div className="relative h-72 sm:h-80 bg-slate-100">
                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-slate-900">
                    {person.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    {person.role}
                  </p>

                  {/* Icone contatto */}
                  <div className="mt-3 flex items-center gap-3 text-slate-500">
                    {person.phone && (
                      <a
                        href={`tel:${person.phone.replace(/\s+/g, "")}`}
                        className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-slate-200 hover:border-emerald-500 hover:text-emerald-700 transition"
                        aria-label={`Chiama ${person.name}`}
                      >
                        <Phone className="h-4 w-4" />
                      </a>
                    )}
                    {person.email && (
                      <a
                        href={`mailto:${person.email}`}
                        className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-slate-200 hover:border-emerald-500 hover:text-emerald-700 transition"
                        aria-label={`Scrivi a ${person.name}`}
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    )}
                    {person.linkedin && (
                      <a
                        href={person.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center h-8 w-8 rounded-full border border-slate-200 hover:border-emerald-500 hover:text-emerald-700 transition"
                        aria-label={`Profilo LinkedIn di ${person.name}`}
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="mx-auto max-w-7xl pb-20 mt-4">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10 text-center">
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
              Ti piacerebbe lavorare con noi?
            </h3>
            <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
              Siamo sempre interessati a profili tecnici e consulenziali che
              vogliono crescere su progetti reali, autorizzazioni e cantieri.
            </p>
            <Link
              href="/lavora-con-noi"
              className="mt-6 inline-flex items-center rounded-xl bg-emerald-600 px-5 py-3 text-white font-medium hover:bg-emerald-700"
            >
              Vai alla sezione “Lavora con noi”
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      {/* Global styles */}
      <style jsx global>{`
        .section-title {
          font-size: clamp(1.5rem, 2.4vw, 2.5rem);
          font-weight: 600;
          letter-spacing: -0.01em;
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

/* ================= DATI TEAM ================= */

type TeamMember = {
  name: string;
  role: string;
  image: string;
  phone?: string;
  email?: string;
  linkedin?: string;
};

const TEAM: TeamMember[] = [
  {
    name: "Luigi Bianchi",
    role: "CEO / Ingegnere Civile",
    image: "/team/luigi.jpg",
    phone: "+39 342 3396219",
    email: "luigi.bianchi@polinex.it",
    linkedin: "https://www.linkedin.com/in/luigi-bianchi",
  },
  {
    name: "Giulia Verdi",
    role: "Ingegnere Energetico",
    image: "/team/giulia.jpg",
    phone: "+39 333 1111111",
    email: "giulia.verdi@polinex.it",
    linkedin: "https://www.linkedin.com/in/giulia-verdi",
  },
  {
    name: "Luca Bianchi",
    role: "Ingegnere Informatico",
    image: "/team/luca.jpg",
    phone: "+39 333 2222222",
    email: "luca.bianchi@polinex.it",
    linkedin: "https://www.linkedin.com/in/luca-bianchi",
  },
];
