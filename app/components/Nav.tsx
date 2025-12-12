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
  const drawerRef = useRef<HTMLDivElement | null>(null);

  // Dropdown "Consulenza" (desktop)
  const [consulenzaOpen, setConsulenzaOpen] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Dropdown "Consulenza" (mobile, collassabile)
  const [consulenzaMobileOpen, setConsulenzaMobileOpen] = useState(false);

  // Chiudi tutto su cambio rotta
  useEffect(() => {
    setOpen(false);
    setConsulenzaOpen(false);
    setConsulenzaMobileOpen(false);
  }, [pathname]);

  // Chiudi con ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setConsulenzaOpen(false);
        setConsulenzaMobileOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    pathname === href ? "text-slate-900 font-medium" : "text-slate-700";

  // Voci del menu (top-level) richieste
  const topLinks: { href: string; label: string }[] = [
    { href: "/", label: "Home" }, // <-- aggiunta prima di Consulenza
    { href: "/consulenza", label: "Consulenza" }, // dropdown
    { href: "/formazione", label: "Formazione" },
    { href: "/editoria", label: "Editoria" },
    { href: "/gestionali", label: "Gestionali" },
    { href: "/coworking", label: "Coworking" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/chi-siamo", label: "Chi siamo" },
    { href: "/lavora-con-noi", label: "Lavora con noi" },
    { href: "/contatti", label: "Contatti" },
    { href: "/trasparenza", label: "Trasparenza" },
  ];

  // Sottomenu CONSULENZA
  const consulenzaItems = [
    { href: "/consulenza/acqua", label: "Acqua" },
    { href: "/consulenza/ambiente", label: "Ambiente" },
    { href: "/consulenza/energia", label: "Energia" },
    { href: "/consulenza/agricoltura", label: "Agricoltura" },
    { href: "/consulenza/sicurezza", label: "Sicurezza" },
    { href: "/consulenza/edilizia", label: "Edilizia e Infrastrutture" },
    { href: "/consulenza/finanziamenti", label: "Bandi e finanziamenti" },
  ] as const;

  // JSON-LD per SiteNavigationElement
  const ldNav = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: [
      "Home",
      "Consulenza",
      ...consulenzaItems.map((s) => s.label),
      "Formazione",
      "Editoria",
      "Gestionali",
      "Coworking",
      "Portfolio",
      "Chi siamo",
      "Lavora con noi",
      "Contatti",
      "Trasparenza",
      "Carrello",
    ],
    url: [
      "/",
      "/consulenza",
      ...consulenzaItems.map((s) => s.href),
      "/formazione",
      "/editoria",
      "/gestionali",
      "/coworking",
      "/portfolio",
      "/chi-siamo",
      "/lavora-con-noi",
      "/contatti",
      "/trasparenza",
      "/carrello",
    ],
  };

  // Helpers hover-intent per desktop
  const openConsulenza = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setConsulenzaOpen(true);
  };
  const closeConsulenza = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setConsulenzaOpen(false), 120);
  };

  const consulenzaIsActive = pathname?.startsWith("/consulenza");

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      {/* JSON-LD */}
      <Script id="ld-sitenav" type="application/ld+json">
        {JSON.stringify(ldNav)}
      </Script>

      {/* Altezza navbar 64px */}
      <div className="mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* (Logo rimosso) */}

        {/* Navigazione desktop */}
        <nav className="hidden md:block" aria-label="Navigazione principale">
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
                    ? "text-slate-900 font-medium"
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

            {/* Altre voci top-level (escluso Home e Consulenza) */}
            {topLinks
              .filter((l) => l.label !== "Home" && l.label !== "Consulenza")
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

            {/* Carrello (icona) */}
            <li>
              <Link
                href="/carrello"
                aria-label="Vai al carrello"
                className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                <ShoppingCart className="h-4 w-4" />
              </Link>
            </li>
          </ul>
        </nav>

        {/* Toggle mobile */}
        <button
          ref={btnRef}
          className="md:hidden inline-flex items-center gap-2 h-16 rounded-lg border border-slate-300 px-3 text-sm text-slate-700"
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="18"
            height="18"
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
          Menu
        </button>
      </div>

      {/* Drawer mobile */}
      <div
        ref={drawerRef}
        id={menuId}
        hidden={!open}
        className="md:hidden border-t border-slate-200 bg-white"
      >
        <nav
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3"
          aria-label="Navigazione mobile"
        >
          <ul className="flex flex-col gap-2 text-sm">
            {/* Home mobile */}
            <li>
              <Link
                className={`nav-link ${isActive("/")}`}
                href="/"
                aria-current={pathname === "/" ? "page" : undefined}
              >
                Home
              </Link>
            </li>

            {/* Consulenza mobile: collassabile */}
            <li>
              <button
                className="w-full text-left nav-link text-slate-700 inline-flex items-center justify-between py-2"
                aria-expanded={consulenzaMobileOpen}
                aria-controls="mobile-consulenza"
                onClick={() => setConsulenzaMobileOpen((v) => !v)}
              >
                <span>Consulenza</span>
                <svg
                  className={`ml-2 h-3 w-3 transition-transform ${
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
                className={`overflow-hidden transition-[max-height,opacity] duration-200 ${
                  consulenzaMobileOpen
                    ? "max-height-[999px] max-h-96 opacity-100"
                    : "max-h-0 opacity-70"
                }`}
              >
                <p className="mt-1 pl-2 ml-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Aree
                </p>
                <ul className="pl-3 border-l border-slate-200 ml-2 mb-2">
                  {consulenzaItems.map((s) => (
                    <li key={s.href}>
                      <Link
                        className="block py-2 text-slate-700 hover:text-emerald-700"
                        href={s.href}
                      >
                        {s.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            {/* Altre voci mobile (escluso Home e Consulenza) */}
            {topLinks
              .filter((l) => l.label !== "Home" && l.label !== "Consulenza")
              .map(({ href, label }) => (
                <li key={href}>
                  <Link
                    className={`nav-link ${isActive(href)}`}
                    href={href}
                    aria-current={pathname === href ? "page" : undefined}
                  >
                    {label}
                  </Link>
                </li>
              ))}

            {/* Carrello mobile (testo) */}
            <li>
              <Link
                className={`nav-link ${isActive("/carrello")}`}
                href="/carrello"
                aria-current={pathname === "/carrello" ? "page" : undefined}
              >
                Carrello
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
