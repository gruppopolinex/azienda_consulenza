// app/formazione/_data.ts

export type Area =
  | "Acqua"
  | "Ambiente"
  | "Energia"
  | "Agricoltura"
  | "Sicurezza"
  | "Edilizia e Infrastrutture"
  | "Finanza e Contabilità";

export type Level = "Base" | "Intermedio" | "Avanzato";
export type Mode = "Online live" | "On demand" | "In presenza" | "Blended";

export type Course = {
  slug: string;
  title: string;
  subtitle?: string;
  area: Area;
  description: string;
  price: number;
  hours: number;
  level: Level;
  mode: Mode;
  nextEdition?: string;
  badge?: string;
  cover: string;
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

export const COURSES: Course[] = [
  // Acqua
  {
    slug: "acqua-progettazione-reti-idriche",
    title: "Progettazione reti idriche e acquedotti",
    subtitle: "Dal dimensionamento alle perdite di carico",
    area: "Acqua",
    description:
      "Un percorso operativo per studenti di ingegneria e tecnici che vogliono progettare reti idriche, acquedotti e sistemi di distribuzione con criteri professionali.",
    price: 290,
    hours: 16,
    level: "Intermedio",
    mode: "Online live",
    nextEdition: "Aprile 2025",
    badge: "Live class",
    cover: "/formazione/acqua-progettazione-reti-idriche.jpg",
  },
  {
    slug: "acqua-monitoraggi-campi-pozzi",
    title: "Monitoraggi di campi pozzi e falde",
    subtitle: "Strumentazione, piezometri e data analysis",
    area: "Acqua",
    description:
      "Dalla progettazione del piano di monitoraggio alla lettura critica dei dati piezometrici e chimici, con casi studio reali.",
    price: 190,
    hours: 10,
    level: "Base",
    mode: "On demand",
    nextEdition: "Sempre disponibile",
    cover: "/formazione/acqua-monitoraggi-campi-pozzi.jpg",
  },

  // Ambiente
  {
    slug: "ambiente-via-vas-laboratorio",
    title: "Laboratorio pratico VIA/VAS",
    subtitle: "Dallo screening allo studio di impatto",
    area: "Ambiente",
    description:
      "Simulazione completa di un procedimento VIA/VAS: lettura norme, impostazione dello studio, scrittura delle sezioni chiave e gestione delle osservazioni.",
    price: 360,
    hours: 20,
    level: "Avanzato",
    mode: "Blended",
    nextEdition: "Maggio 2025",
    badge: "Intensivo",
    cover: "/formazione/ambiente-via-vas-laboratorio.jpg",
  },
  {
    slug: "ambiente-bonifiche-rifiuti",
    title: "Bonifiche siti contaminati e rifiuti",
    subtitle: "EER, caratterizzazione e progetti di bonifica",
    area: "Ambiente",
    description:
      "Per chi lavora o vuole lavorare su siti contaminati: iter normativi, piani di caratterizzazione, classificazione rifiuti e gestione terre e rocce da scavo.",
    price: 320,
    hours: 18,
    level: "Intermedio",
    mode: "Online live",
    cover: "/formazione/ambiente-bonifiche-rifiuti.jpg",
  },

  // Energia
  {
    slug: "energia-audit-iso50001",
    title: "Audit energetici e diagnosi ISO 50001",
    subtitle: "Strumenti, KPI e casi studio",
    area: "Energia",
    description:
      "Corso pratico per impostare e condurre diagnosi energetiche in ambito industriale e terziario, con esempi di report e fogli di calcolo.",
    price: 330,
    hours: 16,
    level: "Intermedio",
    mode: "Online live",
    nextEdition: "Giugno 2025",
    badge: "Per tecnici energy",
    cover: "/formazione/energia-audit-iso50001.jpg",
  },
  {
    slug: "energia-comunita-energetiche",
    title: "Comunità energetiche rinnovabili (CER)",
    subtitle: "Modelli tecnici ed economici",
    area: "Energia",
    description:
      "Panoramica completa su configurazioni, iter autorizzativi e simulazioni economiche per la progettazione di CER sostenibili.",
    price: 210,
    hours: 12,
    level: "Base",
    mode: "On demand",
    cover: "/formazione/energia-comunita-energetiche.jpg",
  },

  // Agricoltura
  {
    slug: "agricoltura-piani-nitrati-pratico",
    title: "Piani nitrati in ZVN: corso pratico",
    subtitle: "Calcoli, limiti, documentazione",
    area: "Agricoltura",
    description:
      "Per periti agrari, agronomi e tecnici che gestiscono reflui e piani nitrati: casi di calcolo, errori tipici e modulistica.",
    price: 180,
    hours: 8,
    level: "Base",
    mode: "Online live",
    cover: "/formazione/agricoltura-piani-nitrati-pratico.jpg",
  },
  {
    slug: "agricoltura-gestione-idrica-aziende",
    title: "Gestione idrica in aziende agricole",
    subtitle: "Invasi, irrigazione, riuso acque",
    area: "Agricoltura",
    description:
      "Approccio integrato alla risorsa idrica in agricoltura, con focus su invasi, reti irrigue e riutilizzo di acque depurate.",
    price: 220,
    hours: 12,
    level: "Intermedio",
    mode: "Blended",
    cover: "/formazione/agricoltura-gestione-idrica-aziende.jpg",
  },

  // Sicurezza
  {
    slug: "sicurezza-cantieri-csp-cse",
    title: "CSP/CSE in cantieri complessi",
    subtitle: "Dal PSC alla gestione interferenze",
    area: "Sicurezza",
    description:
      "Per coordinatori della sicurezza e tecnici HSE: lettura critica del PSC, gestione delle varianti in corso d’opera e casi reali.",
    price: 350,
    hours: 20,
    level: "Avanzato",
    mode: "In presenza",
    nextEdition: "Padova · Luglio 2025",
    badge: "In aula",
    cover: "/formazione/sicurezza-cantieri-csp-cse.jpg",
  },
  {
    slug: "sicurezza-dvr-e-valutazioni",
    title: "DVR e valutazioni specifiche",
    subtitle: "Rumore, vibrazioni, agenti chimici",
    area: "Sicurezza",
    description:
      "Come strutturare DVR solidi e aggiornati, integrare valutazioni specifiche e comunicare il rischio a RSPP e lavoratori.",
    price: 240,
    hours: 14,
    level: "Intermedio",
    mode: "On demand",
    cover: "/formazione/sicurezza-dvr-e-valutazioni.jpg",
  },

  // Edilizia e Infrastrutture
  {
    slug: "edilizia-riqualificazione-sismica-corso",
    title: "Riqualificazione strutturale e sismica",
    subtitle: "Dalla verifica al cantiere",
    area: "Edilizia e Infrastrutture",
    description:
      "Per ingegneri e architetti che si occupano di riqualificazioni: criteri di scelta degli interventi, iter autorizzativi e cantierizzazione.",
    price: 390,
    hours: 22,
    level: "Avanzato",
    mode: "Blended",
    badge: "Per progettisti",
    cover: "/formazione/edilizia-riqualificazione-sismica-corso.jpg",
  },
  {
    slug: "edilizia-permessi-iter-pratico",
    title: "Permessi e iter edilizi",
    subtitle: "SCIA, CILA, PdC e varianti",
    area: "Edilizia e Infrastrutture",
    description:
      "Schemi decisionali, casi tipo e modulistica per districarsi tra titoli abilitativi e comunicazioni.",
    price: 210,
    hours: 10,
    level: "Base",
    mode: "Online live",
    cover: "/formazione/edilizia-permessi-iter-pratico.jpg",
  },

  // Finanza e Contabilità
  {
    slug: "finanza-agevolata-progetti-tecnici",
    title: "Finanza agevolata per progetti tecnici",
    subtitle: "PSR, PNRR, bandi regionali",
    area: "Finanza e Contabilità",
    description:
      "Per consulenti e tecnici che vogliono integrare bandi e contributi nelle proprie progettazioni.",
    price: 260,
    hours: 14,
    level: "Intermedio",
    mode: "Online live",
    badge: "Per tecnici & PM",
    cover: "/formazione/finanza-agevolata-progetti-tecnici.jpg",
  },
  {
    slug: "finanza-rendicontazione-bandi",
    title: "Rendicontazione di bandi e contributi",
    subtitle: "SAL, verifiche, documenti di spesa",
    area: "Finanza e Contabilità",
    description:
      "Un corso operativo su SAL, verifiche documentali e preparazione della documentazione per i controlli.",
    price: 190,
    hours: 9,
    level: "Base",
    mode: "On demand",
    cover: "/formazione/finanza-rendicontazione-bandi.jpg",
  },
];
