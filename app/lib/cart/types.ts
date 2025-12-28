export type CartItemType = "book_pdf" | "course" | "service";

export type CartItem = {
  id: string;                 // ID univoco (es: "book:slug" o "course:slug")
  type: CartItemType;         // categoria
  title: string;              // nome mostrato nel carrello
  price: number;              // prezzo (per UI)
  quantity: number;           // quantità (di solito 1)
  image?: string;             // cover/immagine
  href?: string;              // link al dettaglio (es: /servizi/editoria/...)
  stripePriceId: string;      // price_... (per checkout)
  metadata?: Record<string, string>; // opzionale: slug, area, ecc.
};
