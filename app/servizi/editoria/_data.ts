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
    slug: "acqua-gestione-risorsa-idrica",
    title: "Gestione della risorsa idrica",
    subtitle: "Progettazione, monitoraggio e concessioni",
    area: "Acqua",
    description:
      "Linee guida operative per gestori idrici, enti e studi tecnici: dalla progettazione di reti e impianti alle pratiche di concessione e monitoraggio.",
    price: 20,
    format: "Cartaceo + PDF",
    pages: 256,
    year: 2024,
    cover: "/editoria/covers/acqua-gestione-risorsa-idrica.jpg",
    badge: "Novità",
    previewUrl: "/editoria/preview/acqua-gestione-risorsa-idrica.pdf",
    pdfFile: "books/acqua-gestione-risorsa-idrica.pdf",
    stripePriceId: "price_1SjHxh0J6S97fNguHnYSA6zl",
    authors: [
      {
        name: "Ing. Marco Rossi",
        role: "Ingegnere Idraulico",
        photo: "/editoria/authors/marco-rossi.jpg",
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
    cover: "/editoria/covers/acqua-monitoraggi-pozzi.jpg",
    pdfFile: "books/acqua-monitoraggi-pozzi.pdf",
    stripePriceId: "price_REPLACE_acqua_monitoraggi_pozzi",
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
    cover: "/editoria/covers/finanza-progetti-pubblici.jpg",
    badge: "Consigliato",
    previewUrl: "/editoria/preview/finanza-progetti-pubblici.pdf",
    pdfFile: "books/finanza-progetti-pubblici.pdf",
    stripePriceId: "price_REPLACE_finanza_progetti_pubblici",
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
