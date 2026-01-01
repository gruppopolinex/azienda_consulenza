// app/servizi/editoria/_data.ts

export type Area =
  | "Acqua"
  | "Ambiente"
  | "Energia"
  | "Agricoltura"
  | "Sicurezza"
  | "Edilizia e Infrastrutture"
  | "Finanza e Contabilità";

/**
 * Varianti acquistabili lato e-commerce.
 * - pdf: download
 * - print: cartaceo (spedizione)
 */
export type BookVariant = "pdf" | "print";

/**
 * Manteniamo Format per descrivere il prodotto "editoriale" (come lo presenti a catalogo),
 * ma la scelta checkout sarà sulle varianti (pdf/print).
 */
export type Format = "Cartaceo" | "PDF" | "Cartaceo + PDF";

// Autore
export type Author = {
  name: string;
  role: string;
  photo?: string; // es. "/editoria/authors/nome-cognome.jpg"
  email?: string;
  phone?: string;
  linkedin?: string;
};

export type Book = {
  slug: string;
  title: string;
  subtitle?: string;
  area: Area;
  description: string;

  /** Prezzi (EUR) */
  pdfPrice: number;
  /**
   * Prezzo cartaceo ALL-INCLUSIVE (stampa + spedizione IT + tuo margine).
   * Se assente: cartaceo non disponibile.
   */
  printPrice?: number;

  /** Descrizione editoriale "di catalogo" */
  format: Format;

  pages: number;
  year: number;
  cover: string; // es. "/editoria/covers/<slug>.jpg"
  badge?: string;
  authors?: Author[];
  previewUrl?: string; // estratto PDF (es. "/editoria/preview/<slug>.pdf")

  /**
   * PDF COMPLETO (quello acquistato per il download).
   * Nota: NON in /public.
   * Esempi:
   * - filesystem server: /private_pdfs/<slug>.pdf
   * - storage privato (S3/R2/Supabase): "books/<slug>.pdf"
   */
  pdfFile: string;

  /**
   * Price ID Stripe per acquistare:
   * - PDF (digitale)
   * - Cartaceo (ALL-INCLUSIVE)
   */
  stripePriceIdPdf: string;
  stripePriceIdPrint?: string;

  /**
   * ✅ Printful (opzionale)
   * Se vuoi che il webhook crei ordini Printful in automatico, devi mappare
   * la variante cartacea del libro a una sync_variant_id Printful.
   *
   * Se mancante, il cartaceo può comunque essere venduto (prezzo all-inclusive),
   * ma NON verrà creato nessun ordine Printful automaticamente.
   */
  printfulSyncVariantId?: number;
};

export const AREAS: Area[] = [
  "Acqua",
  "Ambiente",
  "Energia",
  "Agricoltura",
  "Sicurezza",
  "Edilizia e Infrastrutture",
  "Finanza e Contabilità",
];

/**
 * ✅ Markup scelto per il cartaceo rispetto al PDF.
 * Motivo (pratico): su Printful i costi per libri/print-on-demand + spedizione IT
 * “mangiano” facilmente 30–40%+ del prezzo finale; con un +70% sul PDF
 * hai più margine e riduci rischio (resi/assistenza/varianza spedizioni).
 */
const PRINT_MARKUP_MULTIPLIER = 1.7;

function roundPriceEUR(x: number) {
  // arrotonda a 2 decimali
  return Math.round(x * 100) / 100;
}

function computePrintPrice(pdfPrice: number) {
  return roundPriceEUR(pdfPrice * PRINT_MARKUP_MULTIPLIER);
}

/**
 * Helper utili al frontend:
 * - cartaceo disponibile se esistono sia prezzo che priceId
 * - ritorna prezzo/priceId per una variante
 */
export function isPrintAvailable(book: Book) {
  return Boolean(book.printPrice && book.stripePriceIdPrint);
}

export function getBookPrice(book: Book, variant: BookVariant) {
  return variant === "print" && isPrintAvailable(book)
    ? book.printPrice!
    : book.pdfPrice;
}

export function getStripePriceId(book: Book, variant: BookVariant) {
  return variant === "print" && isPrintAvailable(book)
    ? book.stripePriceIdPrint!
    : book.stripePriceIdPdf;
}

/**
 * (Facoltativo) helper per UI:
 * etichetta prezzo breve, tipo "PDF" / "Cartaceo"
 */
export function getVariantLabel(variant: BookVariant) {
  return variant === "print" ? "Cartaceo" : "PDF";
}

/**
 * (Facoltativo) helper backend:
 * vero se la variante print è "ordinabile via Printful"
 */
export function isPrintfulEnabled(book: Book) {
  return Boolean(isPrintAvailable(book) && book.printfulSyncVariantId);
}

export const BOOKS: Book[] = [
  // =========================
  // Acqua
  // =========================
  {
    slug: "ingegneria-sistemi-fognari",
    title: "Ingegneria dei Sistemi Fognari",
    subtitle: "Principi teorici e criteri di dimensionamento con esercizi svolti",
    area: "Acqua",
    description:
      "Manuale tecnico per liberi professionisti e studenti di ingegneria civile-idraulica.",

    pdfPrice: 25,
    printPrice: computePrintPrice(25),

    format: "Cartaceo + PDF",
    pages: 256,
    year: 2026,
    cover: "/editoria/covers/ingegneria-sistemi-fognari.jpg",
    badge: "Novità",
    previewUrl: "/editoria/preview/ingegneria-sistemi-fognari.pdf",
    pdfFile: "books/ingegneria-sistemi-fognari.pdf",

    stripePriceIdPdf: "price_1SjHxh0J6S97fNguHnYSA6zl",
    stripePriceIdPrint: "price_1Sk9WJ0J6S97fNgujwF4ORKh",

    // ✅ se vuoi Printful, imposta l'ID qui (numero)
    printfulSyncVariantId: undefined,

    authors: [
      {
        name: "Ing. Andrea Granara",
        role: "Ingegnere Idraulico",
        photo: "/editoria/authors/andrea-granara.jpg",
        email: "andrea.granara@polinex.com",
        linkedin: "https://linkedin.com/in/andrea-granara",
      },
    ],
  },
  {
    slug: "ingegneria-sistemi-acquedottistici",
    title: "Ingegneria dei Sistemi Acquedottistici",
    subtitle: "Principi teorici e criteri di dimensionamento con esercizi svolti",
    area: "Acqua",
    description:
      "Manuale tecnico per liberi professionisti e studenti di ingegneria civile-idraulica.",

    pdfPrice: 25,
    printPrice: computePrintPrice(25),

    format: "PDF",
    pages: 168,
    year: 2026,
    cover: "/editoria/covers/ingegneria-sistemi-acquedottistici.jpg",
    previewUrl: "/editoria/preview/ingegneria-sistemi-acquedottistici.pdf",
    pdfFile: "books/ingegneria-sistemi-acquedottistici.pdf",

    stripePriceIdPdf: "price_1Sk3Ts0J6S97fNgutW8xdnj0",
    stripePriceIdPrint: "price_1Sk9yU0J6S97fNgujye6LSEM",

    printfulSyncVariantId: undefined,

    authors: [
      {
        name: "Ing. Andrea Granara",
        role: "Ingegnere Idraulico",
        photo: "/editoria/authors/andrea-granara.jpg",
        email: "andrea.granara@polinex.com",
        linkedin: "https://linkedin.com/in/andrea-granara",
      },
    ],
  },
  {
    slug: "ingegneria-serbatoi",
    title: "Ingegneria dei Serbatoi",
    subtitle: "Principi teorici e criteri di dimensionamento con esercizi svolti",
    area: "Acqua",
    description:
      "Manuale tecnico per liberi professionisti e studenti di ingegneria civile-idraulica.",

    pdfPrice: 25,
    printPrice: computePrintPrice(25),

    format: "PDF",
    pages: 168,
    year: 2026,
    cover: "/editoria/covers/ingegneria-serbatoi.jpg",
    previewUrl: "/editoria/preview/ingegneria-serbatoi.pdf",
    pdfFile: "books/ingegneria-serbatoi.pdf",

    stripePriceIdPdf: "price_1Sk3Z60J6S97fNguYZbO0v9A",
    stripePriceIdPrint: "price_1Sk9zu0J6S97fNgueJmMSTLZ",

    printfulSyncVariantId: undefined,

    authors: [
      {
        name: "Ing. Andrea Granara",
        role: "Ingegnere Idraulico",
        photo: "/editoria/authors/andrea-granara.jpg",
        email: "andrea.granara@polinex.com",
        linkedin: "https://linkedin.com/in/andrea-granara",
      },
    ],
  },
  {
    slug: "ingegneria-fluviale",
    title: "Ingegneria Fluviale",
    subtitle: "Principi teorici e criteri di dimensionamento con esercizi svolti",
    area: "Acqua",
    description:
      "Manuale tecnico per liberi professionisti e studenti di ingegneria civile-idraulica.",

    pdfPrice: 25,
    printPrice: computePrintPrice(25),

    format: "PDF",
    pages: 168,
    year: 2026,
    cover: "/editoria/covers/ingegneria-fluviale.jpg",
    previewUrl: "/editoria/preview/ingegneria-fluviale.pdf",
    pdfFile: "books/ingegneria-fluviale.pdf",

    stripePriceIdPdf: "price_1Sk3ca0J6S97fNguBYBYcDwA",
    stripePriceIdPrint: "price_1SkA130J6S97fNguedj4EAVE",

    printfulSyncVariantId: undefined,

    authors: [
      {
        name: "Ing. Andrea Granara",
        role: "Ingegnere Idraulico",
        photo: "/editoria/authors/andrea-granara.jpg",
        email: "andrea.granara@polinex.com",
        linkedin: "https://linkedin.com/in/andrea-granara",
      },
    ],
  },

  // =========================
  // Ambiente
  // =========================
  {
    slug: "bonifica-siti-contaminati",
    title: "Bonifica di Siti Contaminati",
    subtitle: "Caratterizzazione ambientale e analisi di rischio sito-specifica",
    area: "Ambiente",
    description:
      "Un percorso operativo per la gestione completa dei procedimenti di Bonifica con particolare riferimento all'articolo 242-ter D.Lgs. 152/06 che disciplina gli interventi realizzabili nei siti oggetto di procedimento di bonifica.",

    pdfPrice: 30,
    printPrice: computePrintPrice(30),

    format: "Cartaceo + PDF",
    pages: 320,
    year: 2026,
    cover: "/editoria/covers/bonifica-siti-contaminati.jpg",
    badge: "Best seller",
    previewUrl: "/editoria/preview/bonifica-siti-contaminati.pdf",
    pdfFile: "books/bonifica-siti-contaminati.pdf",

    stripePriceIdPdf: "price_1SkA6x0J6S97fNgulPVbU0cc",
    stripePriceIdPrint: "price_1SkA8X0J6S97fNgunEOajCov",

    printfulSyncVariantId: undefined,

    authors: [
      {
        name: "Dott.ssa Laura Bianchi",
        role: "Esperta VIA/VAS",
        photo: "/editoria/authors/laura-bianchi.jpg",
        linkedin: "https://linkedin.com/in/laura-bianchi",
      },
      {
        name: "Ing. Paolo Verdi",
        role: "Coordinatore tecnico VIA",
        photo: "/editoria/authors/paolo-verdi.jpg",
      },
    ],
  },

  // =========================
  // Energia
  // =========================
  {
    slug: "diagnosi-energetica-edifici",
    title: "Diagnosi Energetica degli Edifici",
    subtitle: "Principi teorici e casi applicativi",
    area: "Energia",
    description:
      "Metodologie, KPI e casi studio per diagnosi energetiche efficaci in ambito civile.",

    pdfPrice: 27,
    printPrice: computePrintPrice(27),

    format: "Cartaceo + PDF",
    pages: 240,
    year: 2026,
    cover: "/editoria/covers/diagnosi-energetica-edifici.jpg",
    previewUrl: "/editoria/preview/diagnosi-energetica-edifici.pdf",
    pdfFile: "books/diagnosi-energetica-edifici.pdf",

    stripePriceIdPdf: "price_1SkADx0J6S97fNguQNTYiiNE",
    stripePriceIdPrint: "price_1SkAHN0J6S97fNguAaM4Ceb8",

    printfulSyncVariantId: undefined,

    authors: [
      {
        name: "Ing. Riccardo Conti",
        role: "Esperto in gestione dell’Energia",
        photo: "/editoria/authors/riccardo-conti.jpg",
      },
    ],
  },
  {
    slug: "comunita-energetiche-rinnovabili",
    title: "Comunità energetiche rinnovabili",
    subtitle: "Modelli, iter autorizzativi e business plan",
    area: "Energia",
    description:
      "Guida completa alle CER: inquadramento normativo, modelli organizzativi e simulazioni economiche.",

    pdfPrice: 23,
    printPrice: computePrintPrice(23),

    format: "PDF",
    pages: 180,
    year: 2026,
    cover: "/editoria/covers/comunita-energetiche-rinnovabili.jpg",
    previewUrl: "/editoria/preview/comunita-energetiche-rinnovabili.pdf",
    pdfFile: "books/comunita-energetiche-rinnovabili.pdf",

    stripePriceIdPdf: "price_1SkAKw0J6S97fNgu5Y1Q1bHe",
    stripePriceIdPrint: "price_1SkAME0J6S97fNguF7KZoBgu",

    printfulSyncVariantId: undefined,
  },

  // =========================
  // Finanza e Contabilità
  // =========================
  {
    slug: "contabilita-aziende-agricole",
    title: "Contabilità delle Aziende Agricole",
    subtitle: "Principi teorici con esercizi svolti",
    area: "Finanza e Contabilità",
    description:
      "Manuale tecnico per imprenditori agricoli, consulenti e studenti di agraria.",

    pdfPrice: 30,
    printPrice: computePrintPrice(30),

    format: "Cartaceo + PDF",
    pages: 260,
    year: 2026,
    cover: "/editoria/covers/contabilita-aziende-agricole.jpg",
    badge: "Consigliato",
    previewUrl: "/editoria/preview/contabilita-aziende-agricole.pdf",
    pdfFile: "books/contabilita-aziende-agricole.pdf",

    stripePriceIdPdf: "price_1Sk3ie0J6S97fNgulxGmeyPq",
    stripePriceIdPrint: "price_1SkANq0J6S97fNguRDYPyQ2e",

    printfulSyncVariantId: undefined,

    authors: [
      {
        name: "Dott. Andrea De Luca",
        role: "Project Manager PNRR",
        photo: "/editoria/authors/andrea-deluca.jpg",
      },
    ],
  },
  {
    slug: "contabilita-finanza-aziendale",
    title: "Contabilità e Finanza Aziendale",
    subtitle: "Riduree i costi e automatizzare i processi è la chiave per il successo.",
    area: "Finanza e Contabilità",
    description:
      "Check-list e format per gestire correttamente la fase di rendicontazione di bandi e contributi.",

    pdfPrice: 17,
    printPrice: computePrintPrice(17),

    format: "PDF",
    pages: 160,
    year: 2026,
    cover: "/editoria/covers/contabilita-finanza-aziendale.jpg",
    previewUrl: "/editoria/preview/contabilita-finanza-aziendale.pdf",
    pdfFile: "books/contabilita-finanza-aziendale.pdf",

    stripePriceIdPdf: "price_1SkARi0J6S97fNguWd2gAqQz",
    stripePriceIdPrint: "price_1SkATc0J6S97fNguNrMa4vfm",

    printfulSyncVariantId: undefined,
  },
];
