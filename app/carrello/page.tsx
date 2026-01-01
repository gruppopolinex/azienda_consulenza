// app/carrello/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, CreditCard, Truck } from "lucide-react";

import Nav from "../components/Nav";
import Footer from "../components/Footer";

import {
  getCart,
  getTotal,
  getCount,
  setQty,
  removeItem,
  clearCart,
  CART_EVENT,
  CART_KEY,
  type CartItem,
} from "@/app/lib/cart";

function formatEUR(value: number) {
  return new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(value);
}

// ✅ sezione Home con le 4 card (coworking/formazione/editoria/gestionali)
const PRODUCTS_ANCHOR = "/#prodotti";

function isPurchasable(item: CartItem) {
  return typeof item.stripePriceId === "string" && item.stripePriceId.trim().length > 0;
}

// ✅ label user-friendly per i tipi che ci interessano (book_pdf / book_print)
function getTypeLabel(type: CartItem["type"]) {
  switch (type) {
    case "book_pdf":
      return "PDF (download)";
    case "book_print":
      return "Cartaceo (spedizione)";
    default:
      // fallback: lascia il tipo raw per gli altri prodotti
      return String(type);
  }
}

function isShippable(item: CartItem) {
  // In futuro potresti usare item.metadata.requiresShipping === true
  // ma per ora ci basta la convenzione type === "book_print"
  return item.type === "book_print";
}

function normQty(q: unknown) {
  const n = Number(q);
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.floor(n));
}

export default function CarrelloPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const sync = () => setItems(getCart());

  useEffect(() => {
    sync();
    setHydrated(true);

    const onStorage = (e: StorageEvent) => {
      if (e.key === CART_KEY) sync();
    };

    const onCartEvent = () => sync();

    window.addEventListener("storage", onStorage);
    window.addEventListener(CART_EVENT, onCartEvent as EventListener);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(CART_EVENT, onCartEvent as EventListener);
    };
  }, []);

  const count = useMemo(() => (hydrated ? getCount() : 0), [items, hydrated]);
  const total = useMemo(() => (hydrated ? getTotal() : 0), [items, hydrated]);

  // ✅ conta QUANTE QUANTITÀ sono acquistabili (non quante righe)
  const purchasableCount = useMemo(() => {
    if (!hydrated) return 0;
    return items
      .filter(isPurchasable)
      .reduce((sum, x) => sum + normQty(x.quantity), 0);
  }, [items, hydrated]);

  // ✅ almeno un prodotto richiede spedizione?
  const hasShippable = useMemo(() => {
    if (!hydrated) return false;
    return items.some((it) => isShippable(it));
  }, [items, hydrated]);

  const onChangeQty = (id: string, nextQty: number) => {
    setQty(id, normQty(nextQty));
    sync();
  };

  const onRemove = (id: string) => {
    removeItem(id);
    sync();
  };

  const onClear = () => {
    clearCart();
    sync();
  };

  const isEmpty = hydrated && items.length === 0;

  const goCheckout = async () => {
    if (!hydrated || items.length === 0 || checkingOut) return;

    setCheckoutError(null);

    // ✅ Prepariamo un payload più ricco per il backend:
    // - stripePriceId: per creare line_items
    // - quantity
    // - type/metadata: per sapere cosa consegnare dopo (pdf vs print)
    //
    // Nota: il tuo /api/stripe/checkout-cart attuale accetta solo stripePriceId+quantity.
    // Dovrai aggiornare anche quell’endpoint per leggere questi campi extra (non danno fastidio se li ignori,
    // ma servono per gestire “print” correttamente lato success/webhook).
    const purchasable = items
      .filter(isPurchasable)
      .map((x) => ({
        stripePriceId: x.stripePriceId!.trim(),
        quantity: normQty(x.quantity),
        type: x.type,
        id: x.id,
        title: x.title,
        href: x.href,
        metadata: x.metadata ?? {},
      }));

    if (purchasable.length === 0) {
      setCheckoutError(
        "Nessun articolo acquistabile online nel carrello (manca stripePriceId)."
      );
      return;
    }

    try {
      setCheckingOut(true);

      const res = await fetch("/api/stripe/checkout-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: purchasable,
          hasShippable,
        }),
      });

      const data: { url?: string; error?: string } = await res.json();

      if (!res.ok || !data.url) {
        setCheckoutError(data.error ?? "Errore checkout.");
        setCheckingOut(false);
        return;
      }

      window.location.href = data.url;
      setTimeout(() => setCheckingOut(false), 1500);
    } catch {
      setCheckoutError("Errore di rete durante il checkout.");
      setCheckingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Nav />

      <main className="flex-1 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold">Carrello</h1>
            <p className="mt-1 text-sm text-slate-600">
              {!hydrated
                ? "Caricamento…"
                : count === 0
                ? "Il carrello è vuoto."
                : `${count} ${count === 1 ? "articolo" : "articoli"} nel carrello.`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={PRODUCTS_ANCHOR}
              className="text-sm underline underline-offset-2 text-slate-700 hover:text-slate-900"
            >
              Continua lo shopping
            </Link>

            <button
              type="button"
              onClick={onClear}
              disabled={!hydrated || items.length === 0}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Svuota
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px] items-start">
          {/* Lista */}
          <section className="rounded-2xl border border-slate-200 bg-white">
            {!hydrated ? (
              <div className="p-6 text-sm text-slate-600">Caricamento…</div>
            ) : items.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-sm text-slate-600">
                  Non hai ancora aggiunto nulla al carrello.
                </p>

                <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href={PRODUCTS_ANCHOR}
                    className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                  >
                    Scopri i prodotti
                  </Link>

                  <Link
                    href="/"
                    className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Vai alla home
                  </Link>
                </div>

                <p className="mt-4 text-[11px] text-slate-500">
                  Puoi aggiungere manuali, corsi e altri prodotti dal sito e li
                  troverai qui.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-slate-200">
                {items.map((it) => {
                  const purch = isPurchasable(it);
                  const shippable = isShippable(it);

                  return (
                    <li key={it.id} className="p-4 sm:p-5 flex gap-4">
                      <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                        {it.image ? (
                          <Image
                            src={it.image}
                            alt={it.title}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        ) : (
                          <div className="h-full w-full flex items-center justify-center text-[10px] text-slate-500">
                            N/A
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            {it.href ? (
                              <Link
                                href={it.href}
                                className="font-semibold text-slate-900 hover:text-emerald-700 line-clamp-2"
                              >
                                {it.title}
                              </Link>
                            ) : (
                              <p className="font-semibold text-slate-900 line-clamp-2">
                                {it.title}
                              </p>
                            )}

                            <div className="mt-1 flex flex-wrap items-center gap-2">
                              {/* ✅ Etichetta leggibile */}
                              <p className="text-xs text-slate-500">
                                Formato: {getTypeLabel(it.type)}
                              </p>

                              {shippable && (
                                <span className="inline-flex items-center rounded-full bg-amber-50 text-amber-800 ring-1 ring-amber-100 px-2 py-0.5 text-[11px] font-semibold">
                                  Richiede spedizione
                                </span>
                              )}

                              {purch ? (
                                <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 px-2 py-0.5 text-[11px] font-semibold">
                                  Acquistabile online
                                </span>
                              ) : (
                                <span className="inline-flex items-center rounded-full bg-slate-100 text-slate-600 ring-1 ring-slate-200 px-2 py-0.5 text-[11px] font-semibold">
                                  Checkout non disponibile
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <p className="text-sm font-semibold text-slate-900">
                              {formatEUR(it.price)}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              {normQty(it.quantity)} × {formatEUR(it.price)}
                            </p>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <label className="text-xs text-slate-600">Qtà</label>
                            <input
                              type="number"
                              min={1}
                              value={normQty(it.quantity)}
                              onChange={(e) =>
                                onChangeQty(it.id, Number(e.target.value || 1))
                              }
                              className="w-20 rounded-xl border border-slate-300 px-3 py-2 text-sm focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => onRemove(it.id)}
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                          >
                            <Trash2 className="h-4 w-4" />
                            Rimuovi
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </section>

          {/* Riepilogo */}
          <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-sm font-semibold text-slate-900">
              Riepilogo ordine
            </h2>

            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-slate-600">Articoli</dt>
                <dd className="font-semibold text-slate-900">{count}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-slate-600">Totale</dt>
                <dd className="font-semibold text-slate-900">
                  {formatEUR(total)}
                </dd>
              </div>

              {hydrated && items.length > 0 && (
                <div className="flex items-center justify-between">
                  <dt className="text-slate-600">Acquistabili online</dt>
                  <dd className="font-semibold text-slate-900">
                    {purchasableCount}/{count}
                  </dd>
                </div>
              )}
            </dl>

            {/* ✅ Avviso spedizione */}
            {hasShippable && (
              <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-[12px] text-amber-900">
                <div className="flex items-start gap-2">
                  <Truck className="h-4 w-4 mt-0.5" />
                  <div>
                    <p className="font-semibold">Ordine con spedizione</p>
                    <p className="mt-1">
                      Questo carrello include articoli cartacei: al checkout ti
                      verrà richiesto l’indirizzo di consegna.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <p className="mt-4 text-[11px] text-slate-600">
              Il checkout online procede con gli articoli che hanno{" "}
              <span className="font-mono">stripePriceId</span>.
            </p>

            {checkoutError && (
              <div className="mt-3 rounded-xl border border-red-200 bg-red-50 p-3 text-[12px] text-red-800">
                {checkoutError}
              </div>
            )}

            <button
              type="button"
              onClick={goCheckout}
              disabled={!hydrated || items.length === 0 || checkingOut}
              className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CreditCard className="h-4 w-4" />
              {checkingOut ? "Apertura checkout…" : "Vai al checkout"}
            </button>

            {isEmpty && (
              <div className="mt-3 text-[11px] text-slate-500">
                Suggerimento: vai alla sezione{" "}
                <Link
                  href={PRODUCTS_ANCHOR}
                  className="underline underline-offset-2 hover:text-slate-800"
                >
                  Coworking / Formazione / Editoria / Gestionali
                </Link>{" "}
                e aggiungi ciò che ti interessa.
              </div>
            )}
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
