// app/lib/cart/types.ts

export type CartItemType =
  | "book_pdf"
  | "book_print"
  | "course"
  | "service"
  | "other";

export type CartItem = {
  id: string; // ID univoco (es: "book:slug:pdf" | "book:slug:print" | "course:slug")
  type: CartItemType; // categoria

  title: string; // nome mostrato nel carrello
  price: number; // prezzo (per UI, EUR)
  quantity: number; // quantità (di solito 1)

  image?: string; // cover/immagine
  href?: string; // link al dettaglio (es: /servizi/editoria/... o /servizi/formazione/...)

  // ✅ per Stripe checkout: opzionale perché alcuni item “informativi” potrebbero non essere acquistabili
  stripePriceId?: string; // price_...

  // ✅ metadata più flessibile (compatibile con editoria: slug/area/variant)
  metadata?: {
    slug?: string;
    area?: string;
    variant?: "pdf" | "print";
    [k: string]: string | number | boolean | null | undefined;
  };
};
