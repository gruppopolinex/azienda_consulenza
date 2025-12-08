"use client";

import Link from "next/link";
import Image from "next/image";
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

  // Dropdown "Servizi" (desktop)
  const [servicesOpen, setServicesOpen] = useState(false);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Dropdown "Servizi" (mobile, collassabile)
  const [servicesMobileOpen, setServicesMobileOpen] = useState(false);

  // Chiudi tutto su cambio rotta
  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
    setServicesMobileOpen(false);
  }, [pathname]);

  // Chiudi con ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setServicesOpen(false);
        setServicesMobileOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    pathname === href ? "text-slate-900 font-medium" : "text-slate-700";

  // Link top-level (escludo "Servizi" perché è dropdown)
  // NB: l’ordine qui è: Home, Portfolio, Chi siamo, Lavora con noi
  const topLinks: { href: string; label: string }[] = [
    { href: "/", label: "Home" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/chi-siamo", label: "Chi siamo" },
    { href: "/lavora-con-noi", label: "Lavora con noi" },
  ];

  // Voci del menu Servizi — POLINEX (aree)
  const serviceItems = [
    { href: "/servizi/acqua", label: "Acqua" },
    { href: "/servizi/ambiente", label: "Ambiente" },
    { href: "/servizi/energia", label: "Energia" },
    { href: "/servizi/agricoltura", label: "Agricoltura" },
    { href: "/servizi/sicurezza", label: "Sicurezza" },
    { href: "/servizi/edilizia", label: "Edilizia e Infrastrutture" },
    { href: "/servizi/finanziamenti", label: "Bandi e Finanziamenti" },
  ] as const;

  // JSON-LD per SiteNavigationElement (includo tutto)
  const ldNav = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: [
      "Home",
      "Servizi",
      ...serviceItems.map((s) => s.label),
      "Formazione",
      "Editoria",
      "Gestionali",
      "Portfolio",
      "Chi siamo",
      "Lavora con noi",
      "Contatti",
      "Trasparenza",
      "Carrello",
    ],
    url: [
      "/",
      "/servizi",
      ...serviceItems.map((s) => s.href),
      "/formazione",
      "/editoria",
      "/gestionali",
      "/portfolio",
      "/chi-siamo",
      "/lavora-con-noi",
      "/contatti",
      "/trasparenza",
      "/carrello",
    ],
  };

  // Helpers hover-intent per desktop
  const openServices = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setServicesOpen(true);
  };
  const closeServices = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setServicesOpen(false), 120);
  };

  // Active style per il trigger Servizi se siamo su /servizi o sottopagine
  const serviziIsActive =
    pathname === "/servizi" ||
    serviceItems.some((s) => pathname?.startsWith(s.href));

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      {/* JSON-LD */}
      <Script id="ld-sitenav" type="application/ld+json">
        {JSON.stringify(ldNav)}
      </Script>

      {/* Altezza navbar 64px */}
      <div className="mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center h-16"
          aria-label="Polinex srl – Home"
        >
          <div className="relative h-16 w-[256px] overflow-hidden">
            <Image
              src="/logo.png"
              alt="Polinex srl"
              fill
              priority
              className="object-contain"
            />
          </div>
        </Link>

        {/* Navigazione desktop */}
        <nav className="hidden md:block" aria-label="Navigazione principale">
          <ul className="flex items-center gap-6 lg:gap-8 text-sm">
            {/* Home (topLinks[0]) */}
            <li>
              <Link
                className={`nav-link inline-flex items-center h-16 ${isActive(
                  topLinks[0].href
                )}`}
                href={topLinks[0].href}
                aria-current={
                  pathname === topLinks[0].href ? "page" : undefined
                }
              >
                {topLinks[0].label}
              </Link>
            </li>

            {/* Dropdown Servizi */}
            <li
              className="relative"
              onMouseEnter={openServices}
              onMouseLeave={closeServices}
            >
              <button
                type="button"
                className={`nav-link inline-flex items-center h-16 ${
                  serviziIsActive
                    ? "text-slate-900 font-medium"
                    : "text-slate-700"
                }`}
                aria-haspopup="menu"
                aria-expanded={servicesOpen}
                aria-controls="menu-servizi"
                onFocus={openServices}
                onBlur={closeServices}
              >
                Servizi
                <svg
                  className={`ml-1 h-3 w-3 transition-transform ${
                    servicesOpen ? "rotate-180" : ""
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
                  absolute left-0 top-full mt-1 w-[360px]
                  rounded-xl border border-slate-200 bg-white shadow-lg
                  ring-1 ring-black/5 overflow-hidden
                  ${
                    servicesOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-1 pointer-events-none"
                  }
                  transition transform duration-150
                `}
              >
                <ul className="py-1">
                  {serviceItems.map((item) => (
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

            {/* Formazione */}
            <li>
              <Link
                className={`nav-link inline-flex items-center h-16 ${isActive(
                  "/formazione"
                )}`}
                href="/formazione"
                aria-current={pathname === "/formazione" ? "page" : undefined}
              >
                Formazione
              </Link>
            </li>

            {/* Editoria */}
            <li>
              <Link
                className={`nav-link inline-flex items-center h-16 ${isActive(
                  "/editoria"
                )}`}
                href="/editoria"
                aria-current={pathname === "/editoria" ? "page" : undefined}
              >
                Editoria
              </Link>
            </li>

            {/* Gestionali */}
            <li>
              <Link
                className={`nav-link inline-flex items-center h-16 ${isActive(
                  "/gestionali"
                )}`}
                href="/gestionali"
                aria-current={pathname === "/gestionali" ? "page" : undefined}
              >
                Gestionali
              </Link>
            </li>

            {/* Portfolio subito dopo i tre link (topLinks[1]) */}
            <li>
              <Link
                className={`nav-link inline-flex items-center h-16 ${isActive(
                  topLinks[1].href
                )}`}
                href={topLinks[1].href}
                aria-current={
                  pathname === topLinks[1].href ? "page" : undefined
                }
              >
                {topLinks[1].label}
              </Link>
            </li>

            {/* Chi siamo, Lavora con noi (topLinks[2:], nell’ordine desiderato) */}
            {topLinks.slice(2).map(({ href, label }) => (
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

            {/* Contatti (button) + Trasparenza (link) */}
            <li>
              <Link
                className="btn-ghost inline-flex items-center h-16"
                href="/contatti"
              >
                Contatti
              </Link>
            </li>
            <li>
              <Link
                className={`nav-link inline-flex items-center h-16 ${isActive(
                  "/trasparenza"
                )}`}
                href="/trasparenza"
                aria-current={
                  pathname === "/trasparenza" ? "page" : undefined
                }
              >
                Trasparenza
              </Link>
            </li>

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
            <li>
              <Link
                className={`nav-link ${isActive("/")}`}
                href="/"
                aria-current={pathname === "/" ? "page" : undefined}
              >
                Home
              </Link>
            </li>

            {/* Servizi mobile: collassabile */}
            <li>
              <button
                className="w-full text-left nav-link text-slate-700 inline-flex items-center justify-between py-2"
                aria-expanded={servicesMobileOpen}
                aria-controls="mobile-servizi"
                onClick={() => setServicesMobileOpen((v) => !v)}
              >
                <span>Servizi</span>
                <svg
                  className={`ml-2 h-3 w-3 transition-transform ${
                    servicesMobileOpen ? "rotate-180" : ""
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
                className={`overflow-hidden transition-[max-height,opacity] duration-200 ${
                  servicesMobileOpen
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-70"
                }`}
              >
                <ul className="pl-3 border-l border-slate-200 ml-2 mb-2">
                  {serviceItems.map((s) => (
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

            {/* Formazione mobile */}
            <li>
              <Link
                className={`nav-link ${isActive("/formazione")}`}
                href="/formazione"
                aria-current={pathname === "/formazione" ? "page" : undefined}
              >
                Formazione
              </Link>
            </li>

            {/* Editoria mobile */}
            <li>
              <Link
                className={`nav-link ${isActive("/editoria")}`}
                href="/editoria"
                aria-current={pathname === "/editoria" ? "page" : undefined}
              >
                Editoria
              </Link>
            </li>

            {/* Gestionali mobile */}
            <li>
              <Link
                className={`nav-link ${isActive("/gestionali")}`}
                href="/gestionali"
                aria-current={pathname === "/gestionali" ? "page" : undefined}
              >
                Gestionali
              </Link>
            </li>

            {/* Portfolio prima di Chi siamo anche su mobile */}
            <li>
              <Link
                className={`nav-link ${isActive("/portfolio")}`}
                href="/portfolio"
                aria-current={pathname === "/portfolio" ? "page" : undefined}
              >
                Portfolio
              </Link>
            </li>

            <li>
              <Link
                className={`nav-link ${isActive("/chi-siamo")}`}
                href="/chi-siamo"
                aria-current={pathname === "/chi-siamo" ? "page" : undefined}
              >
                Chi siamo
              </Link>
            </li>

            <li>
              <Link
                className={`nav-link ${isActive("/lavora-con-noi")}`}
                href="/lavora-con-noi"
                aria-current={
                  pathname === "/lavora-con-noi" ? "page" : undefined
                }
              >
                Lavora con noi
              </Link>
            </li>

            {/* Carrello mobile */}
            <li>
              <Link
                className={`nav-link ${isActive("/carrello")}`}
                href="/carrello"
                aria-current={pathname === "/carrello" ? "page" : undefined}
              >
                Carrello
              </Link>
            </li>

            <li>
              <Link className="btn-ghost" href="/contatti">
                Contatti
              </Link>
            </li>
            <li>
              <Link
                className={`nav-link ${isActive("/trasparenza")}`}
                href="/trasparenza"
                aria-current={
                  pathname === "/trasparenza" ? "page" : undefined
                }
              >
                Trasparenza
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
