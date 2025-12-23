// app/servizi/gestionali/_data.ts

export type Sector =
  | "Azienda di consulenza"
  | "Azienda produttiva"
  | "Azienda agricola";

export type Billing = "mensile" | "una_tantum";

export type Gestionale = {
  slug: string;
  name: string;
  sector: Sector;
  short: string;
  description: string;
  monthlyPrice: number;
  oneOffPrice: number;
  usersIncluded: number;
  tag?: string;
  features: string[];
  videoUrl?: string;

  /**
   * Dominio del gestionale (senza protocollo), es: "polinex-studio.it"
   * Verrà usato per costruire il link "Accedi o registrati"
   */
  appDomain: string;

  /**
   * Path di login/registrazione sul dominio del gestionale,
   * es: "/", "/login", "/auth", "/signup"
   */
  appAuthPath?: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

/**
 * Lista dei gestionali disponibili
 */
export const GESTIONALI: Gestionale[] = [
  {
    slug: "gestionale-azienda-consulenza",
    name: "Polinex Studio",
    sector: "Azienda di consulenza",
    short: "Per studi tecnici, consulenti HSE, ingegneri e società di servizi.",
    description:
      "Gestione commesse, pratiche autorizzative, scadenze e documentazione tecnica in un unico ambiente, pensato per studi di ingegneria e consulenza ambientale.",
    monthlyPrice: 79,
    oneOffPrice: 2200,
    usersIncluded: 5,
    tag: "Per studi tecnici",
    features: [
      "Gestione commesse e stati di avanzamento",
      "Anagrafiche clienti, siti e impianti",
      "Scadenziario autorizzazioni e adempimenti",
      "Gestione documentale con versioning",
      "Reportistica export Excel/PDF",
    ],
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_STUDIO",
    appDomain: "polinex-studio.it",
    appAuthPath: "/", // es. pagina principale di login/registrazione
  },
  {
    slug: "gestionale-azienda-produttiva",
    name: "Polinex Industry",
    sector: "Azienda produttiva",
    short: "Per aziende manifatturiere e impianti produttivi con esigenze HSE.",
    description:
      "Un gestionale pensato per imprese produttive che devono integrare ambiente, rifiuti, energia e sicurezza in un unico cruscotto operativo.",
    monthlyPrice: 129,
    oneOffPrice: 3400,
    usersIncluded: 10,
    tag: "Plant & HSE",
    features: [
      "Registro rifiuti, emissioni e scarichi",
      "Monitoraggi ambientali e KPI energetici",
      "Gestione DPI, formazione e visite mediche",
      "Gestione manutenzioni e check-list impianti",
      "Dashboard per direzione e HSE manager",
    ],
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_INDUSTRY",
    appDomain: "polinex-industry.it",
    appAuthPath: "/", // es. pagina principale di login/registrazione
  },
  {
    slug: "gestionale-azienda-agricola",
    name: "Polinex Agro",
    sector: "Azienda agricola",
    short: "Per aziende agricole e zootecniche orientate a bandi e conformità.",
    description:
      "Gestione piani nitrati, reflui, appezzamenti, pratiche PSR/PNRR e scadenze documentali in un ambiente unico, condivisibile con consulenti e tecnici.",
    monthlyPrice: 59,
    oneOffPrice: 1800,
    usersIncluded: 3,
    tag: "Zootecnia & PSR",
    features: [
      "Gestione appezzamenti, colture e capi",
      "Piani nitrati e distribuzione reflui",
      "Archivio documenti PSR/PNRR",
      "Scadenze controlli e adempimenti",
      "Accesso condiviso con consulenti",
    ],
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_AGRO",
    appDomain: "polinex-agro.it",
    appAuthPath: "/", // es. pagina principale di login/registrazione
  },
];

/**
 * FAQ generiche per i gestionali
 */
export const BASE_FAQ: FAQItem[] = [
  {
    question: "Quanto tempo serve per andare in produzione?",
    answer:
      "Per la maggior parte dei casi, con un set minimo di dati e utenze, si riesce ad andare in produzione in 2–4 settimane. Per progetti più articolati definiamo un piano di rilascio per step.",
  },
  {
    question: "Cosa cambia tra abbonamento mensile e acquisto tutto subito?",
    answer:
      "Con l’abbonamento mensile hai un investimento iniziale ridotto e un canone ricorrente che include aggiornamenti e supporto secondo contratto. Con l’acquisto tutto subito capitalizzi il gestionale come investimento, mantenendo eventualmente un canone di manutenzione minimo.",
  },
  {
    question: "Possiamo integrare il gestionale con altri software?",
    answer:
      "Sì. Possiamo interfacciare il gestionale con ERP, CRM, software di manutenzione o sistemi di monitoraggio già presenti, tramite API o scambio dati strutturato. Le integrazioni vengono valutate caso per caso.",
  },
  {
    question: "Come funziona la formazione agli utenti?",
    answer:
      "Prevediamo una formazione operativa direttamente sui vostri casi reali: sessioni online o in presenza per gli utenti chiave e, se necessario, materiali video/guide per l’onboarding del resto del personale.",
  },
];
