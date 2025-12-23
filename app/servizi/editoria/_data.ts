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
  photo?: string;
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
  cover: string;
  badge?: string;
  authors?: Author[]; // <-- autori opzionali
  previewUrl?: string; // <-- estratto PDF (es. in /public/pdf-preview/)
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
    slug: "acqua-gestione-risorsa-idrica",
    title: "Gestione della risorsa idrica",
    subtitle: "Progettazione, monitoraggio e concessioni",
    area: "Acqua",
    description:
      "Linee guida operative per gestori idrici, enti e studi tecnici: dalla progettazione di reti e impianti alle pratiche di concessione e monitoraggio.",
    price: 69,
    format: "Cartaceo + PDF",
    pages: 256,
    year: 2024,
    cover: "/editoria/acqua-gestione-risorsa-idrica.jpg",
    badge: "Novità",
    previewUrl: "/pdf-preview/acqua-gestione-risorsa-idrica.pdf",
    authors: [
      {
        name: "Ing. Marco Rossi",
        role: "Ingegnere Idraulico",
        photo: "/authors/marco-rossi.jpg",
        email: "marco.rossi@example.com",
        linkedin: "https://linkedin.com/in/marco-rossi",
      },
    ],
  },
  {
    slug: "acqua-monitoraggi-pozzi",
    title: "Monitoraggi di pozzi e falde",
    subtitle: "Metodologie, campionamenti e reporting",
    area: "Acqua",
    description:
      "Manuale tecnico per impostare piani di monitoraggio di falda, campionamenti, catene di custodia e reportistica a norma.",
    price: 49,
    format: "PDF",
    pages: 168,
    year: 2023,
    cover: "/editoria/acqua-monitoraggi-pozzi.jpg",
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
    cover: "/editoria/ambiente-via-vas.jpg",
    badge: "Best seller",
    previewUrl: "/pdf-preview/ambiente-via-vas.pdf",
    authors: [
      {
        name: "Dott.ssa Laura Bianchi",
        role: "Esperta VIA/VAS",
        photo: "/authors/laura-bianchi.jpg",
        linkedin: "https://linkedin.com/in/laura-bianchi",
      },
      {
        name: "Ing. Paolo Verdi",
        role: "Coordinatore tecnico VIA",
        photo: "/authors/paolo-verdi.jpg",
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
    cover: "/editoria/energia-audit-diagnosi.jpg",
    previewUrl: "/pdf-preview/energia-audit-diagnosi.pdf",
    authors: [
      {
        name: "Ing. Riccardo Conti",
        role: "Esperto in gestione dell’Energia",
        photo: "/authors/riccardo-conti.jpg",
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
    cover: "/editoria/energia-comunita-energetiche.jpg",
  },

  // Finanza e Contabilità
  {
    slug: "finanza-progetti-pubblici",
    title: "Finanza agevolata per progetti tecnici",
    subtitle: "PSR, PNRR, fondi regionali",
    area: "Finanza e Contabilità",
    description:
      "Un metodo per integrare bandi e contributi pubblici in progetti di acqua, ambiente, energia e agricoltura.",
    price: 68,
    format: "Cartaceo + PDF",
    pages: 260,
    year: 2023,
    cover: "/editoria/finanza-progetti-pubblici.jpg",
    badge: "Consigliato",
    previewUrl: "/pdf-preview/finanza-progetti-pubblici.pdf",
    authors: [
      {
        name: "Dott. Andrea De Luca",
        role: "Project Manager PNRR",
        photo: "/authors/andrea-deluca.jpg",
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
    cover: "/editoria/finanza-rendicontazione.jpg",
  },
];
