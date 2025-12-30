// app/servizi/editoria/_data.ts

export type Area =
  | "Acqua"
  | "Ambiente"
  | "Energia"
  | "Agricoltura"
  | "Sicurezza"
  | "Edilizia e Infrastrutture"
  | "Finanza e Contabilità";

export type Format = "Cartaceo" | "PDF" | "Cartaceo + PDF";

// Nuovo tipo autore
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
  price: number;
  format: Format;
  pages: number;
  year: number;
  cover: string; // es. "/editoria/covers/<slug>.jpg"
  badge?: string;
  authors?: Author[]; // <-- autori opzionali
  previewUrl?: string; // <-- estratto PDF (es. "/editoria/preview/<slug>.pdf")

  /**
   * PDF COMPLETO (quello acquistato tramite Stripe)
   * Nota: questo NON deve stare in /public. Esempio di gestione:
   * - file in /private_pdfs/<slug>.pdf (filesystem server)
   * - oppure key su storage privato (S3/R2/Supabase) es. "books/<slug>.pdf"
   */
  pdfFile: string;

  /**
   * Price ID Stripe per acquistare questo volume (PDF).
   * Inserisci qui i tuoi price_xxx reali.
   */
  stripePriceId: string;
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

export const BOOKS: Book[] = [
  // Acqua
  {
    slug: "ingegneria-sistemi-fognari",
    title: "Ingegneria dei Sistemi Fognari",
    subtitle: "Principi teorici e criteri di dimensionamento con esercizi svolti",
    area: "Acqua",
    description:
      "Manuale tecnico per liberi professionisti e studenti di ingegneria civile-idraulica.",
    price: 25,
    format: "Cartaceo + PDF",
    pages: 256,
    year: 2026,
    cover: "/editoria/covers/ingegneria-sistemi-fognari.jpg",
    badge: "Novità",
    previewUrl: "/editoria/preview/ingegneria-sistemi-fognari.pdf",
    pdfFile: "books/ingegneria-sistemi-fognari.pdf",
    stripePriceId: "price_1SjHxh0J6S97fNguHnYSA6zl",
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
    price: 25,
    format: "PDF",
    pages: 168,
    year: 2026,
    cover: "/editoria/covers/ingegneria-sistemi-acquedottistici.jpg",
    previewUrl: "/editoria/preview/ingegneria-sistemi-acquedottistici.pdf",
    pdfFile: "books/ingegneria-sistemi-acquedottistici.pdf",
    stripePriceId: "price_1Sk3Ts0J6S97fNgutW8xdnj0",
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
    price: 25,
    format: "PDF",
    pages: 168,
    year: 2026,
    cover: "/editoria/covers/ingegneria-serbatoi.jpg",
    previewUrl: "/editoria/preview/ingegneria-serbatoi.pdf",
    pdfFile: "books/ingegneria-serbatoi.pdf",
    stripePriceId: "price_1Sk3Z60J6S97fNguYZbO0v9A",
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
    price: 25,
    format: "PDF",
    pages: 168,
    year: 2026,
    cover: "/editoria/covers/ingegneria-fluviale.jpg",
    previewUrl: "/editoria/preview/ingegneria-fluviale.pdf",
    pdfFile: "books/ingegneria-fluviale.pdf",
    stripePriceId: "price_1Sk3ca0J6S97fNguBYBYcDwA",
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

  // Ambiente
  {
    slug: "ambiente-via-vas",
    title: "VIA e VAS in pratica",
    subtitle: "Dalla fattibilità allo studio d’impatto",
    area: "Ambiente",
    description:
      "Un percorso operativo per la gestione completa dei procedimenti di Valutazione di Impatto Ambientale e Strategica.",
    price: 79,
    format: "Cartaceo + PDF",
    pages: 320,
    year: 2024,
    cover: "/editoria/covers/ambiente-via-vas.jpg",
    badge: "Best seller",
    previewUrl: "/editoria/preview/ambiente-via-vas.pdf",
    pdfFile: "books/ambiente-via-vas.pdf",
    stripePriceId: "price_REPLACE_ambiente_via_vas",
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

  // Energia
  {
    slug: "energia-audit-diagnosi",
    title: "Audit energetici e diagnosi",
    subtitle: "ISO 50001 e casi studio applicativi",
    area: "Energia",
    description:
      "Metodologie, KPI e casi studio per diagnosi energetiche efficaci in ambito industriale e terziario.",
    price: 65,
    format: "Cartaceo + PDF",
    pages: 240,
    year: 2023,
    cover: "/editoria/covers/energia-audit-diagnosi.jpg",
    previewUrl: "/editoria/preview/energia-audit-diagnosi.pdf",
    pdfFile: "books/energia-audit-diagnosi.pdf",
    stripePriceId: "price_REPLACE_energia_audit_diagnosi",
    authors: [
      {
        name: "Ing. Riccardo Conti",
        role: "Esperto in gestione dell’Energia",
        photo: "/editoria/authors/riccardo-conti.jpg",
      },
    ],
  },
  {
    slug: "energia-comunita-energetiche",
    title: "Comunità energetiche rinnovabili",
    subtitle: "Modelli, iter autorizzativi e business plan",
    area: "Energia",
    description:
      "Guida completa alle CER: inquadramento normativo, modelli organizzativi e simulazioni economiche.",
    price: 55,
    format: "PDF",
    pages: 180,
    year: 2024,
    cover: "/editoria/covers/energia-comunita-energetiche.jpg",
    pdfFile: "books/energia-comunita-energetiche.pdf",
    stripePriceId: "price_REPLACE_energia_comunita_energetiche",
  },

  // Finanza e Contabilità
  {
    slug: "contabilita-aziende-agricole",
    title: "Contabilità delle Aziende Agricole",
    subtitle: "Principi teorici con esercizi svolti",
    area: "Finanza e Contabilità",
    description:
      "Manuale tecnico per imprenditori agricoli, consulenti e studenti di agraria.",
    price: 68,
    format: "Cartaceo + PDF",
    pages: 260,
    year: 2026,
    cover: "/editoria/covers/contabilita-aziende-agricole.jpg",
    badge: "Consigliato",
    previewUrl: "/editoria/preview/contabilita-aziende-agricole.pdf",
    pdfFile: "books/contabilita-aziende-agricole.pdf",
    stripePriceId: "price_1Sk3ie0J6S97fNgulxGmeyPq",
    authors: [
      {
        name: "Dott. Andrea De Luca",
        role: "Project Manager PNRR",
        photo: "/editoria/authors/andrea-deluca.jpg",
      },
    ],
  },
  {
    slug: "finanza-rendicontazione",
    title: "Rendicontazione e controlli",
    subtitle: "SAL, verifiche e documentazione di spesa",
    area: "Finanza e Contabilità",
    description:
      "Check-list e format per gestire correttamente la fase di rendicontazione di bandi e contributi.",
    price: 47,
    format: "PDF",
    pages: 160,
    year: 2022,
    cover: "/editoria/covers/finanza-rendicontazione.jpg",
    pdfFile: "books/finanza-rendicontazione.pdf",
    stripePriceId: "price_REPLACE_finanza_rendicontazione",
  },
];
