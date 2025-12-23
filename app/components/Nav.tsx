"use client";

import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ShoppingCart } from "lucide-react";

export default function Nav() {
  const pathname = usePathname();

  // Drawer mobile
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const btnRef = useRef<HTMLButtonElement | null>(null);

  // Dropdown "Consulenza" (desktop)
  const [consulenzaOpen, setConsulenzaOpen] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Dropdown "Servizi" (desktop)
  const [serviziOpen, setServiziOpen] = useState(false);
  const hoverTimerServizi = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Dropdown "Consulenza" (mobile, collassabile)
  const [consulenzaMobileOpen, setConsulenzaMobileOpen] = useState(false);

  // Dropdown "Servizi" (mobile, collassabile)
  const [serviziMobileOpen, setServiziMobileOpen] = useState(false);

  // Chiudi tutto su cambio rotta
  useEffect(() => {
    setOpen(false);
    setConsulenzaOpen(false);
    setServiziOpen(false);
    setConsulenzaMobileOpen(false);
    setServiziMobileOpen(false);
  }, [pathname]);

  // Chiudi con ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setConsulenzaOpen(false);
        setServiziOpen(false);
        setConsulenzaMobileOpen(false);
        setServiziMobileOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    pathname === href ? "text-slate-900 font-semibold" : "text-slate-700";

  const consulenzaIsActive = pathname?.startsWith("/consulenza");
  const serviziIsActive = pathname?.startsWith("/servizi");

  // Sottomenu CONSULENZA (app/consulenza/*)
  const consulenzaItems = [
    { href: "/consulenza/acqua", label: "Acqua" },
    { href: "/consulenza/ambiente", label: "Ambiente" },
    { href: "/consulenza/energia", label: "Energia" },
    { href: "/consulenza/agricoltura", label: "Agricoltura" },
    { href: "/consulenza/sicurezza", label: "Sicurezza" },
    { href: "/consulenza/edilizia", label: "Edilizia e Infrastrutture" },
    { href: "/finanziamenti", label: "Bandi e Finanziamenti" },
  ] as const;

  // Sottomenu SERVIZI (app/servizi/*)
  const serviziItems = [
    { href: "/servizi/formazione", label: "Formazione" },
    { href: "/servizi/gestionali", label: "Gestionali" },
    { href: "/servizi/coworking", label: "Coworking" },
    { href: "/servizi/editoria", label: "Editoria" },
  ] as const;

  // Voci top-level richieste
  const topLinks: { href: string; label: string; isDropdown?: boolean }[] = [
    { href: "/", label: "Home" },
    { href: "/consulenza", label: "Consulenza", isDropdown: true },
    { href: "/servizi", label: "Servizi", isDropdown: true },
    { href: "/finanziamenti", label: "Bandi e Finanziamenti" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/chi-siamo", label: "Chi siamo" },
    { href: "/lavora-con-noi", label: "Lavora con noi" },
    { href: "/contatti", label: "Contatti" },
  ];

  // JSON-LD per SiteNavigationElement
  const ldNav = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: [
      "Home",
      "Consulenza",
      ...consulenzaItems.map((s) => s.label),
      "Servizi",
      ...serviziItems.map((s) => s.label),
      "Bandi e Finanziamenti",
      "Portfolio",
      "Chi siamo",
      "Lavora con noi",
      "Contatti",
      "Carrello",
    ],
    url: [
      "/",
      "/consulenza",
      ...consulenzaItems.map((s) => s.href),
      "/servizi",
      ...serviziItems.map((s) => s.href),
      "/finanziamenti",
      "/portfolio",
      "/chi-siamo",
      "/lavora-con-noi",
      "/contatti",
      "/carrello",
    ],
  };

  // Helpers hover-intent (desktop)
  const openConsulenza = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setConsulenzaOpen(true);
  };
  const closeConsulenza = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setConsulenzaOpen(false), 120);
  };

  const openServizi = () => {
    if (hoverTimerServizi.current) clearTimeout(hoverTimerServizi.current);
    setServiziOpen(true);
  };
  const closeServizi = () => {
    if (hoverTimerServizi.current) clearTimeout(hoverTimerServizi.current);
    hoverTimerServizi.current = setTimeout(() => setServiziOpen(false), 120);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      {/* JSON-LD */}
      <Script id="ld-sitenav" type="application/ld+json">
        {JSON.stringify(ldNav)}
      </Script>

      {/* Altezza navbar 64px */}
      <div className="mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8 flex items-center">
        {/* DESKTOP: nav centrata + carrello a destra */}
        <div className="hidden md:flex items-center w-full">
          {/* Spacer sinistro */}
          <div className="flex-1" />

          {/* Navigazione desktop centrata */}
          <nav
            className="flex justify-center"
            aria-label="Navigazione principale"
          >
            <ul className="flex items-center gap-6 lg:gap-8 text-sm">
              {/* Home */}
              <li>
                <Link
                  className={`nav-link inline-flex items-center h-16 ${isActive(
                    "/"
                  )}`}
                  href="/"
                  aria-current={pathname === "/" ? "page" : undefined}
                >
                  Home
                </Link>
              </li>

              {/* Dropdown Consulenza */}
              <li
                className="relative"
                onMouseEnter={openConsulenza}
                onMouseLeave={closeConsulenza}
              >
                <button
                  type="button"
                  className={`nav-link inline-flex items-center h-16 ${
                    consulenzaIsActive
                      ? "text-slate-900 font-semibold"
                      : "text-slate-700"
                  }`}
                  aria-haspopup="menu"
                  aria-expanded={consulenzaOpen}
                  aria-controls="menu-consulenza"
                  onFocus={openConsulenza}
                  onBlur={closeConsulenza}
                >
                  Consulenza
                  <svg
                    className={`ml-1 h-3 w-3 transition-transform ${
                      consulenzaOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.19l3.71-2.96a.75.75 0 111.04 1.08l-4.24 3.38a.75.75 0 01-.94 0L5.21 8.31a.75.75 0 01.02-1.1z" />
                  </svg>
                </button>

                <div
                  id="menu-consulenza"
                  role="menu"
                  aria-label="Sottomenu Consulenza"
                  className={`
                    absolute left-0 top-full mt-1 w-[380px]
                    rounded-xl border border-slate-200 bg-white shadow-lg
                    ring-1 ring-black/5 overflow-hidden
                    ${
                      consulenzaOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-1 pointer-events-none"
                    }
                    transition transform duration-150
                  `}
                >
                  <div className="px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Aree
                  </div>
                  <ul className="pb-2">
                    {consulenzaItems.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          role="menuitem"
                          className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              {/* Dropdown Servizi */}
              <li
                className="relative"
                onMouseEnter={openServizi}
                onMouseLeave={closeServizi}
              >
                <button
                  type="button"
                  className={`nav-link inline-flex items-center h-16 ${
                    serviziIsActive
                      ? "text-slate-900 font-semibold"
                      : "text-slate-700"
                  }`}
                  aria-haspopup="menu"
                  aria-expanded={serviziOpen}
                  aria-controls="menu-servizi"
                  onFocus={openServizi}
                  onBlur={closeServizi}
                >
                  Servizi
                  <svg
                    className={`ml-1 h-3 w-3 transition-transform ${
                      serviziOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.19l3.71-2.96a.75.75 0 111.04 1.08l-4.24 3.38a.75.75 0 01-.94 0L5.21 8.31a.75.75 0 01.02-1.1z" />
                  </svg>
                </button>

                <div
                  id="menu-servizi"
                  role="menu"
                  aria-label="Sottomenu Servizi"
                  className={`
                    absolute left-0 top-full mt-1 w-[320px]
                    rounded-xl border border-slate-200 bg-white shadow-lg
                    ring-1 ring-black/5 overflow-hidden
                    ${
                      serviziOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-1 pointer-events-none"
                    }
                    transition transform duration-150
                  `}
                >
                  <div className="px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                    Servizi
                  </div>
                  <ul className="pb-2">
                    {serviziItems.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          role="menuitem"
                          className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              {/* Altre voci top-level */}
              {topLinks
                .filter((l) => !l.isDropdown && l.label !== "Home")
                .map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      className={`nav-link inline-flex items-center h-16 ${isActive(
                        href
                      )}`}
                      href={href}
                      aria-current={pathname === href ? "page" : undefined}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          {/* Carrello a destra */}
          <div className="flex-1 flex justify-end">
            <Link
              href="/carrello"
              aria-label="Vai al carrello"
              className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              <ShoppingCart className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* MOBILE: carrello + hamburger (come prima) */}
        <div className="md:hidden flex items-center justify-between w-full">
          <div />
          <div className="flex items-center gap-2">
            <Link
              href="/carrello"
              aria-label="Vai al carrello"
              className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-slate-300 text-slate-700 active:scale-[0.98] bg-white"
            >
              <ShoppingCart className="h-4 w-4" />
            </Link>

            <button
              ref={btnRef}
              className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-slate-300 text-slate-700 active:scale-[0.98] bg-white"
              aria-label={open ? "Chiudi menu" : "Apri menu"}
              aria-expanded={open}
              aria-controls={menuId}
              onClick={() => setOpen((v) => !v)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                className="text-slate-700"
                aria-hidden="true"
              >
                {open ? (
                  <path
                    d="M6 6l12 12M6 18L18 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M4 6h16M4 12h16M4 18h16"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay + Drawer mobile */}
      <div
        className={`md:hidden fixed inset-0 z-40 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        {/* Overlay */}
        <button
          type="button"
          aria-label="Chiudi menu"
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/30 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Sheet */}
        <div
          id={menuId}
          className={`
            absolute right-0 top-0 h-full w-[88%] max-w-sm
            bg-white shadow-2xl border-l border-slate-200
            transition-transform duration-200
            ${open ? "translate-x-0" : "translate-x-full"}
          `}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          {/* Header sheet */}
          <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200 bg-white">
            <span className="text-sm font-semibold text-slate-900">Menu</span>
            <button
              type="button"
              aria-label="Chiudi menu"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-slate-300 text-slate-700 active:scale-[0.98] bg-white"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                className="text-slate-700"
                aria-hidden="true"
              >
                <path
                  d="M6 6l12 12M6 18L18 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <nav className="px-4 py-4" aria-label="Navigazione mobile">
            <ul className="flex flex-col text-sm">
              {/* Home */}
              <li>
                <Link
                  className={`flex items-center justify-between rounded-xl px-3 py-3 hover:bg-slate-50 ${isActive(
                    "/"
                  )}`}
                  href="/"
                  aria-current={pathname === "/" ? "page" : undefined}
                >
                  Home
                </Link>
              </li>

              {/* Consulenza mobile */}
              <li className="mt-1">
                <button
                  className={`w-full flex items-center justify-between rounded-xl px-3 py-3 hover:bg-slate-50 ${
                    consulenzaIsActive
                      ? "text-slate-900 font-semibold"
                      : "text-slate-700"
                  }`}
                  aria-expanded={consulenzaMobileOpen}
                  aria-controls="mobile-consulenza"
                  onClick={() => setConsulenzaMobileOpen((v) => !v)}
                >
                  <span>Consulenza</span>
                  <svg
                    className={`ml-2 h-4 w-4 transition-transform ${
                      consulenzaMobileOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.19l3.71-2.96a.75.75 0 111.04 1.08l-4.24 3.38a.75.75 0 01-.94 0L5.21 8.31a.75.75 0 01.02-1.1z" />
                  </svg>
                </button>

                <div
                  id="mobile-consulenza"
                  className={`grid transition-[grid-template-rows,opacity] duration-200 ${
                    consulenzaMobileOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50/60 p-2">
                      <p className="px-2 pt-1 pb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        Aree
                      </p>
                      <ul className="flex flex-col">
                        {consulenzaItems.map((s) => (
                          <li key={s.href}>
                            <Link
                              className="block rounded-lg px-2.5 py-2 text-slate-700 hover:bg-white hover:text-emerald-700"
                              href={s.href}
                            >
                              {s.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>

              {/* Servizi mobile */}
              <li className="mt-1">
                <button
                  className={`w-full flex items-center justify-between rounded-xl px-3 py-3 hover:bg-slate-50 ${
                    serviziIsActive
                      ? "text-slate-900 font-semibold"
                      : "text-slate-700"
                  }`}
                  aria-expanded={serviziMobileOpen}
                  aria-controls="mobile-servizi"
                  onClick={() => setServiziMobileOpen((v) => !v)}
                >
                  <span>Servizi</span>
                  <svg
                    className={`ml-2 h-4 w-4 transition-transform ${
                      serviziMobileOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.19l3.71-2.96a.75.75 0 111.04 1.08l-4.24 3.38a.75.75 0 01-.94 0L5.21 8.31a.75.75 0 01.02-1.1z" />
                  </svg>
                </button>

                <div
                  id="mobile-servizi"
                  className={`grid transition-[grid-template-rows,opacity] duration-200 ${
                    serviziMobileOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50/60 p-2">
                      <p className="px-2 pt-1 pb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        Servizi
                      </p>
                      <ul className="flex flex-col">
                        {serviziItems.map((s) => (
                          <li key={s.href}>
                            <Link
                              className="block rounded-lg px-2.5 py-2 text-slate-700 hover:bg-white hover:text-emerald-700"
                              href={s.href}
                            >
                              {s.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </li>

              {/* Divider */}
              <li className="my-3 border-t border-slate-200" />

              {/* Altre voci */}
              {topLinks
                .filter((l) => l.label !== "Home" && !l.isDropdown)
                .map(({ href, label }) => (
                  <li key={href} className="mt-1">
                    <Link
                      className={`flex items-center justify-between rounded-xl px-3 py-3 hover:bg-slate-50 ${isActive(
                        href
                      )}`}
                      href={href}
                      aria-current={pathname === href ? "page" : undefined}
                    >
                      {label}
                    </Link>
                  </li>
                ))}

              {/* Carrello */}
              <li className="mt-1">
                <Link
                  className={`flex items-center justify-between rounded-xl px-3 py-3 hover:bg-slate-50 ${isActive(
                    "/carrello"
                  )}`}
                  href="/carrello"
                  aria-current={pathname === "/carrello" ? "page" : undefined}
                >
                  Carrello
                </Link>
              </li>
            </ul>
          </nav>

          {/* Footer sheet */}
          <div className="mt-auto px-4 pb-4">
            <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-600">
              <span className="font-semibold text-slate-900">Tip:</span> Tocca
              fuori dal pannello per chiudere.
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
