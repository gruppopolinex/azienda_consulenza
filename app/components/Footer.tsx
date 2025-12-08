"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ChevronRight } from "lucide-react";

// Tipizza l’oggetto globale Cookiebot per evitare ts-ignore
declare global {
  interface Window {
    Cookiebot?: {
      show?: () => void;
      showDeclaration?: () => void;
    };
  }
}

export default function Footer() {
  const year = new Date().getFullYear();

  // ====== DATI AZIENDALI — POLINEX SRL ======
  const orgName = "Polinex srl";
  const slogan =
    "Soluzioni integrate per acqua, energia e ambiente."; // TODO: metti payoff reale

  const streetAddress = "Via Esempio 123";
  const addressLocality = "Città";
  const addressRegion = "XX";
  const addressText = `${streetAddress}, ${addressLocality} (${addressRegion})`;
  const mapsHref =
    "https://www.google.com/maps?q=" + encodeURIComponent(addressText);

  const phone = "+39 000 0000000";
  const phoneHref = "tel:+390000000000";
  const email = "info@polinex.it";
  const emailHref = "mailto:" + email;

  const amministrazionePhone = "+39 000 0000001";
  const amministrazioneEmail = "amministrazione@polinex.it";
  const amministrazionePEC = "polinex.amministrazione@pec.it";

  const operativoPhone = "+39 000 0000002";
  const operativoEmail = "operativo@polinex.it";
  const operativoPEC = "polinex.operativo@pec.it";

  const serviceItems = [
    { href: "/servizi/acqua", label: "Acqua" },
    { href: "/servizi/ambiente", label: "Ambiente" },
    { href: "/servizi/energia", label: "Energia" },
    { href: "/servizi/agricoltura", label: "Agricoltura" },
    { href: "/servizi/sicurezza", label: "Sicurezza" },
    { href: "/servizi/edilizia", label: "Edilizia e Infrastrutture" },
    { href: "/servizi/finanziamenti", label: "Bandi e Finanziamenti" },
  ];

  // Aggiunti Formazione, Editoria, Gestionali prima di Portfolio
  const footerLinks = [
    { href: "/formazione", label: "Formazione" },
    { href: "/editoria", label: "Editoria" },
    { href: "/gestionali", label: "Gestionali" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/chi-siamo", label: "Chi siamo" },
    { href: "/lavora-con-noi", label: "Lavora con noi" },
    { href: "/contatti", label: "Contatti" },
    { href: "/trasparenza", label: "Trasparenza" },
  ];

  const handleCookiePreferences = () => {
    if (window.Cookiebot?.show) window.Cookiebot.show();
  };

  const handleCookieDeclaration = () => {
    if (window.Cookiebot?.showDeclaration)
      window.Cookiebot.showDeclaration();
  };

  return (
    <footer className="bg-slate-950 text-slate-100 text-sm">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Colonna sinistra */}
          <div className="space-y-4">
            <Link href="/">
              <Image
                src="/logo_bianco.png"
                alt={`${orgName} logo`}
                width={160}
                height={48}
                className="h-auto w-40 translate-x-3"
                priority
              />
            </Link>

            <p className="max-w-xs text-slate-300">{slogan}</p>

            <div className="mt-4 space-y-2 text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4" />
                <Link
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-200"
                >
                  {addressText}
                </Link>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a href={phoneHref} className="hover:text-slate-200">
                  {phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href={emailHref} className="hover:text-slate-200">
                  {email}
                </a>
              </p>
            </div>
          </div>

          {/* Colonna centrale */}
          <div className="space-y-6">
            <div>
              <h3 className="text-base font-semibold">Contatti</h3>

              <div className="mt-4 space-y-4 text-slate-300">
                <div>
                  <p className="font-medium">Amministrazione</p>
                  <p className="text-slate-400">
                    Tel:{" "}
                    <a
                      href={`tel:${amministrazionePhone}`}
                      className="hover:text-slate-200"
                    >
                      {amministrazionePhone}
                    </a>
                    <br />
                    Email:{" "}
                    <a
                      href={`mailto:${amministrazioneEmail}`}
                      className="hover:text-slate-200"
                    >
                      {amministrazioneEmail}
                    </a>
                    <br />
                    PEC:{" "}
                    <a
                      href={`mailto:${amministrazionePEC}`}
                      className="hover:text-slate-200"
                    >
                      {amministrazionePEC}
                    </a>
                  </p>
                </div>

                <div>
                  <p className="font-medium">Operativo</p>
                  <p className="text-slate-400">
                    Tel:{" "}
                    <a
                      href={`tel:${operativoPhone}`}
                      className="hover:text-slate-200"
                    >
                      {operativoPhone}
                    </a>
                    <br />
                    Email:{" "}
                    <a
                      href={`mailto:${operativoEmail}`}
                      className="hover:text-slate-200"
                    >
                      {operativoEmail}
                    </a>
                    <br />
                    PEC:{" "}
                    <a
                      href={`mailto:${operativoPEC}`}
                      className="hover:text-slate-200"
                    >
                      {operativoPEC}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/contatti"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
            >
              Contattaci
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Colonna destra */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Link</h3>

            <nav className="space-y-2">
              {/* Servizi principali */}
              {serviceItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block hover:text-emerald-400"
                >
                  {item.label}
                </Link>
              ))}

              {/* Altri link nav */}
              <div className="mt-4 space-y-2">
                {footerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block hover:text-emerald-400"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <hr className="my-4 border-slate-700" />

              {/* Legal + Cookiebot */}
              <Link href="/privacy" className="block hover:text-emerald-400">
                Privacy
              </Link>

              <button
                type="button"
                onClick={handleCookiePreferences}
                className="block w-fit text-left underline underline-offset-2 hover:text-emerald-400"
              >
                Preferenze cookie
              </button>

              <button
                type="button"
                onClick={handleCookieDeclaration}
                className="block w-fit text-left underline underline-offset-2 hover:text-emerald-400"
              >
                Cookie (dichiarazione)
              </button>

              <Link
                href="/note-legali"
                className="block hover:text-emerald-400"
              >
                Note legali
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 text-xs text-slate-500">
          © {year} {orgName}. Tutti i diritti riservati.
        </div>
      </div>
    </footer>
  );
}
