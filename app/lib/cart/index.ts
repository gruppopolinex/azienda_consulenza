// app/lib/cart/index.ts
"use client";

export type CartItemType = "book_pdf" | "course" | "service" | "other";

export type CartItem = {
  id: string; // es: "book:acqua-gestione-risorsa-idrica" | "course:abc"
  type: CartItemType;

  title: string;
  price: number; // EUR (numero, es: 69)
  quantity: number;

  image?: string;
  href?: string;

  // per Stripe checkout (quando farai checkout multi-prodotto)
  stripePriceId?: string;

  metadata?: Record<string, string | number | boolean | null>;
};

export const CART_KEY = "polinex_cart_v1";
export const CART_EVENT = "polinex_cart_updated";

/* =======================
   Helpers
======================= */

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function emitCartUpdated() {
  // aggiorna UI nella stessa tab (lo "storage" event non scatta nella stessa finestra)
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CART_EVENT));
}

function normalizeQty(qty: unknown): number {
  const n = Number(qty);
  if (!Number.isFinite(n)) return 1;
  return Math.max(1, Math.floor(n));
}

function normalizePrice(price: unknown): number {
  const n = Number(price);
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, n);
}

function normalizeType(t: unknown): CartItemType {
  const v = String(t ?? "").toLowerCase();
  if (v === "book_pdf" || v === "course" || v === "service" || v === "other")
    return v;
  return "other";
}

function normalizeCart(items: unknown): CartItem[] {
  if (!Array.isArray(items)) return [];

  const out: CartItem[] = [];

  for (const raw of items) {
    if (!raw || typeof raw !== "object") continue;

    const x = raw as any;

    const id = String(x.id ?? "").trim();
    const title = String(x.title ?? "").trim();
    if (!id || !title) continue;

    const item: CartItem = {
      id,
      type: normalizeType(x.type),
      title,
      price: normalizePrice(x.price),
      quantity: normalizeQty(x.quantity),
      image: typeof x.image === "string" ? x.image : undefined,
      href: typeof x.href === "string" ? x.href : undefined,
      stripePriceId:
        typeof x.stripePriceId === "string" ? x.stripePriceId : undefined,
      metadata:
        x.metadata && typeof x.metadata === "object"
          ? (x.metadata as Record<string, string | number | boolean | null>)
          : undefined,
    };

    out.push(item);
  }

  return out;
}

/* =======================
   API
======================= */

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  const raw = safeParse<unknown>(localStorage.getItem(CART_KEY), []);
  return normalizeCart(raw);
}

export function setCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  const normalized = normalizeCart(items);
  localStorage.setItem(CART_KEY, JSON.stringify(normalized));
  emitCartUpdated();
}

export function clearCart() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CART_KEY);
  emitCartUpdated();
}

/**
 * Aggiunge un item al carrello.
 * Se esiste già (stesso id) incrementa la quantità.
 * Se vuoi "sovrascrivere" i dati, passa { merge: "replace" }.
 */
export function addItem(
  item: CartItem,
  opts?: { merge?: "replace" | "keep_existing" }
) {
  if (!item?.id) return;

  const incoming: CartItem = {
    ...item,
    id: String(item.id).trim(),
    type: normalizeType(item.type),
    title: String(item.title ?? "").trim(),
    price: normalizePrice(item.price),
    quantity: normalizeQty(item.quantity),
    image: item.image ? String(item.image) : undefined,
    href: item.href ? String(item.href) : undefined,
    stripePriceId: item.stripePriceId ? String(item.stripePriceId) : undefined,
    metadata:
      item.metadata && typeof item.metadata === "object"
        ? item.metadata
        : undefined,
  };

  if (!incoming.id || !incoming.title) return;

  const cart = getCart();
  const existing = cart.find((x) => x.id === incoming.id);

  if (existing) {
    existing.quantity += incoming.quantity;

    const merge = opts?.merge ?? "replace";
    if (merge === "replace") {
      // mantiene quantità aggiornata ma aggiorna i campi descrittivi
      existing.type = incoming.type;
      existing.title = incoming.title || existing.title;
      existing.price = incoming.price;
      existing.image = incoming.image ?? existing.image;
      existing.href = incoming.href ?? existing.href;
      existing.stripePriceId = incoming.stripePriceId ?? existing.stripePriceId;
      existing.metadata = incoming.metadata ?? existing.metadata;
    }
  } else {
    cart.push(incoming);
  }

  setCart(cart);
}

export function removeItem(id: string) {
  const key = String(id ?? "").trim();
  if (!key) return;
  setCart(getCart().filter((x) => x.id !== key));
}

export function setQty(id: string, quantity: number) {
  const key = String(id ?? "").trim();
  if (!key) return;

  const q = Math.max(0, Math.floor(Number(quantity) || 0));
  if (q === 0) {
    removeItem(key);
    return;
  }

  const cart = getCart();
  const item = cart.find((x) => x.id === key);
  if (!item) return;

  item.quantity = q;
  setCart(cart);
}

export function incQty(id: string, delta = 1) {
  const key = String(id ?? "").trim();
  if (!key) return;
  const d = Math.floor(Number(delta) || 0);
  if (d === 0) return;

  const cart = getCart();
  const item = cart.find((x) => x.id === key);
  if (!item) return;

  const next = (item.quantity ?? 0) + d;
  if (next <= 0) {
    setCart(cart.filter((x) => x.id !== key));
    return;
  }

  item.quantity = next;
  setCart(cart);
}

export function getCount(): number {
  return getCart().reduce((sum, x) => sum + (Number(x.quantity) || 0), 0);
}

export function getTotal(): number {
  return getCart().reduce(
    (sum, x) => sum + normalizePrice(x.price) * (Number(x.quantity) || 0),
    0
  );
}
