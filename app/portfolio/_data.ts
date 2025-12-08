// app/portfolio/_data.ts

export type Category =
  | "Acqua"
  | "Ambiente"
  | "Energia"
  | "Agricoltura"
  | "Sicurezza"
  | "Bandi e Finanziamenti"
  | "Edilizia e Infrastrutture"
  | "Gestionali";

export type Project = {
  slug: string; // corrisponde a /public/portfolio/<slug>
  title: string;
  category: Category;
  location: string;
  client: string;
  summary?: string;
  /**
   * Numero totale di immagini presenti nella cartella del progetto,
   * nominate come:
   *   /public/portfolio/<slug>/gallery-01.(jpg|JPG|jpeg|png)
   *   /public/portfolio/<slug>/gallery-02.(jpg|JPG|jpeg|png)
   *   ...
   */
  imagesCount: number;
};

export const PROJECTS: Project[] = [
  // --- ACQUA ---
  {
    slug: "acqua-monitoraggi",
    title: "Monitoraggi idrici multi-pozzo",
    category: "Acqua",
    location: "Padova (PD)",
    client: "Consorzio di Bonifica",
    imagesCount: 3,
  },
  {
    slug: "acqua-potabilizzazione",
    title: "Adeguamento impianto di potabilizzazione",
    category: "Acqua",
    location: "Treviso (TV)",
    client: "Gestore Idrico",
    imagesCount: 3,
  },

  // --- AMBIENTE ---
  {
    slug: "ambiente-via",
    title: "Screening VIA per ampliamento produttivo",
    category: "Ambiente",
    location: "Venezia (VE)",
    client: "Manifattura locale",
    imagesCount: 3,
  },
  {
    slug: "ambiente-bonifica-sito",
    title: "Piano operativo di bonifica sito industriale",
    category: "Ambiente",
    location: "Vicenza (VI)",
    client: "Azienda Chimica",
    imagesCount: 3,
  },

  // --- ENERGIA ---
  {
    slug: "energia-audit-iso50001",
    title: "Audit energetico secondo ISO 50001",
    category: "Energia",
    location: "Vicenza (VI)",
    client: "Azienda Metalmeccanica",
    imagesCount: 3,
  },
  {
    slug: "energia-cer",
    title: "Studio di fattibilità CER per area produttiva",
    category: "Energia",
    location: "Padova (PD)",
    client: "Consorzio Imprese",
    imagesCount: 3,
  },

  // --- AGRICOLTURA ---
  {
    slug: "agricoltura-nitrati",
    title: "Piano gestione nitrati in ZVN",
    category: "Agricoltura",
    location: "Rovigo (RO)",
    client: "Azienda Agricola",
    imagesCount: 3,
  },
  {
    slug: "agricoltura-reflui",
    title: "Utilizzo agronomico reflui — adeguamento piani",
    category: "Agricoltura",
    location: "Verona (VR)",
    client: "Cooperativa Agricola",
    imagesCount: 3,
  },

  // --- SICUREZZA ---
  {
    slug: "sicurezza-cantieri",
    title: "CSP/CSE complesso edilizio multipiano",
    category: "Sicurezza",
    location: "Mestre (VE)",
    client: "Impresa Edile",
    imagesCount: 3,
  },
  {
    slug: "sicurezza-impianti",
    title: "DVR e procedure per impianto trattamento",
    category: "Sicurezza",
    location: "Treviso (TV)",
    client: "Gestore Impianto",
    imagesCount: 3,
  },

  // --- BANDI E FINANZIAMENTI ---
  {
    slug: "bandi-psr",
    title: "Domanda PSR — efficienza irrigua",
    category: "Bandi e Finanziamenti",
    location: "Padova (PD)",
    client: "PMI Agroalimentare",
    imagesCount: 3,
  },
  {
    slug: "bandi-pnrr",
    title: "PNRR: efficientamento linee produttive",
    category: "Bandi e Finanziamenti",
    location: "Venezia (VE)",
    client: "PMI Manifatturiera",
    imagesCount: 3,
  },

  // --- EDILIZIA E INFRASTRUTTURE ---
  {
    slug: "edilizia-permesso-costruire",
    title: "Permesso di costruire per nuovo edificio produttivo",
    category: "Edilizia e Infrastrutture",
    location: "Vicenza (VI)",
    client: "Impresa Edile",
    imagesCount: 3,
  },
  {
    slug: "edilizia-riqualificazione-strutturale",
    title: "Riqualificazione strutturale e sismica complesso esistente",
    category: "Edilizia e Infrastrutture",
    location: "Padova (PD)",
    client: "Soggetto Privato",
    imagesCount: 3,
  },

  // --- GESTIONALI ---
  {
    slug: "gestionale-crm-bandi",
    title: "Implementazione CRM interno per gestione bandi",
    category: "Gestionali",
    location: "Padova (PD)",
    client: "Polinex (uso interno)",
    imagesCount: 3,
  },
  {
    slug: "gestionale-reportistica-kpi",
    title: "Sistema di reportistica KPI tecnico-amministrativi",
    category: "Gestionali",
    location: "Treviso (TV)",
    client: "Multi-utility locale",
    imagesCount: 3,
  },
];
