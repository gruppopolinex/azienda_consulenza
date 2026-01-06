// app/consulenza/_data.ts

export type ConsulenzaIconKey =
  | "Droplets"
  | "Waves"
  | "Factory"
  | "Leaf"
  | "AlertTriangle"
  | "FileSearch"
  | "Building2"
  | "Hammer"
  | "FileText"
  | "ClipboardList"
  | "Zap"
  | "ThermometerSun"
  | "Wind"
  | "ShieldCheck"
  | "HardHat"
  | "Flame"
  | "Users";

export type MacroCard = {
  icon: ConsulenzaIconKey;
  title: string;
  img: string;
  bullets: string[];
};

export type Step = {
  step: string;
  title: string;
  text: string;
};

export type ConsulenzaArea = {
  slug: string;

  /** Nome area usato per filtri (GRANTS.aree, COURSES.area, BOOKS.area, PROJECTS.category) */
  area: string;

  /** H1 della pagina */
  h1: string;

  /** Macro cards (4 blocchi) */
  macroCards: MacroCard[];

  /** Sezione "Come lavoriamo..." */
  stepsTitle: string;
  steps: Step[];

  /** Titoli sezioni (se esistono items) */
  grantsTitle: string;
  coursesTitle: string;
  booksTitle: string;
  portfolioTitle: string;

  /** Label chip nelle card portfolio */
  portfolioChip: string;

  /** CTA finale */
  ctaTitle: string;
  ctaText?: string;
};

export const CONSULENZA_AREAS: ConsulenzaArea[] = [
  {
    slug: "acqua",
    area: "Acqua",
    h1: "Aree di intervento in ambito acqua",
    macroCards: [
      {
        icon: "Droplets",
        title: "Derivazioni, concessioni e pozzi",
        img: "/services/acqua-derivazioni.jpg",
        bullets: [
          "Studi idrogeologici e bilanci idrici",
          "Pratiche di concessione per acque superficiali e sotterranee",
          "Regolarizzazione e progettazione di nuovi pozzi",
          "Piani di monitoraggio piezometrico e qualitativo",
        ],
      },
      {
        icon: "Waves",
        title: "Acquedotti, reti e potabilizzazione",
        img: "/services/acqua-reti.jpg",
        bullets: [
          "Analisi dello stato delle reti idriche e distrettualizzazione",
          "Progettazione e adeguamento di impianti di sollevamento",
          "Supporto su potabilizzazione e qualità dell’acqua",
          "Verifica perdite, pressioni, portate e continuità di servizio",
        ],
      },
      {
        icon: "Factory",
        title: "Scarichi e acque reflue",
        img: "/services/acqua-scarichi.jpg",
        bullets: [
          "Classificazione reflui civili e industriali",
          "Autorizzazioni allo scarico (AUA, specifiche, rinnovi)",
          "Progettazione o adeguamento di impianti di trattamento",
          "Piani di controllo e monitoraggi in continuo",
        ],
      },
      {
        icon: "Leaf",
        title: "Irrigazione e difesa del suolo",
        img: "/services/acqua-irrigazione.jpg",
        bullets: [
          "Progettazione e verifica di sistemi irrigui aziendali e consortili",
          "Canali, scolmatori e piccoli invasi a servizio dell’agricoltura",
          "Valutazioni su erosione, drenaggi e ruscellamento",
          "Supporto tecnico per consorzi di bonifica e aziende agricole",
        ],
      },
    ],
    stepsTitle: "Come lavoriamo sui progetti legati all’acqua",
    steps: [
      {
        step: "1",
        title: "Analisi e inquadramento idrico",
        text: "Raccolta dati esistenti, sopralluoghi, analisi dei fabbisogni, screening normativo e prime ipotesi tecnico-economiche.",
      },
      {
        step: "2",
        title: "Progetto + iter autorizzativi",
        text: "Progettazione, calcoli e relazioni tecniche, gestione delle conferenze di servizi, pratiche per concessioni, scarichi e autorizzazioni.",
      },
      {
        step: "3",
        title: "Cantiere, monitoraggi e gestione",
        text: "Assistenza in fase esecutiva, piani di monitoraggio, lettura dei dati e reportistica per enti, gestori e finanziatori.",
      },
    ],
    grantsTitle: "Bandi e finanziamenti per interventi idrici",
    coursesTitle: "Formazione tecnica sull’acqua",
    booksTitle: "Manuali e pubblicazioni sull’acqua",
    portfolioTitle: "Progetti e casi studio in ambito acqua",
    portfolioChip: "Acqua",
    ctaTitle: "Hai un progetto legato all’acqua?",
  },

  {
    slug: "agricoltura",
    area: "Agricoltura",
    h1: "Aree di intervento in ambito agricoltura",
    macroCards: [
      {
        icon: "Leaf",
        title: "Piani aziendali e investimenti agricoli",
        img: "/services/agricoltura-piani.jpg",
        bullets: [
          "Piani aziendali per investimenti agricoli e zootecnici",
          "Supporto a PSR, bandi regionali e nazionali",
          "Analisi tecnico-economiche degli interventi",
          "Coordinamento tra progettazione tecnica e domande di contributo",
        ],
      },
      {
        icon: "Droplets",
        title: "Irrigazione, invasi e gestione acqua in agricoltura",
        img: "/services/agricoltura-irrigazione.jpg",
        bullets: [
          "Progettazione e verifica di reti irrigue aziendali e consortili",
          "Invasi aziendali e piccoli bacini per uso irriguo",
          "Bilanci idrici e piani di gestione delle risorse",
          "Integrazione tra irrigazione, derivazioni e concessioni",
        ],
      },
      {
        icon: "Factory",
        title: "Reflui zootecnici e fertilizzazione",
        img: "/services/agricoltura-reflui.jpg",
        bullets: [
          "Piani di utilizzazione agronomica dei reflui",
          "Gestione effluenti zootecnici e digestato",
          "Verifica conformità normativa nitrati e vulnerabilità",
          "Monitoraggi e report per controlli e finanziatori",
        ],
      },
      {
        icon: "Leaf",
        title: "Progetti di filiera e energia in ambito agricolo",
        img: "/services/agricoltura-filiere.jpg",
        bullets: [
          "Progetti di filiera corta e cooperazione tra aziende",
          "Impianti FER in ambito agricolo (FV, biogas, agrisolare…)",
          "Studi di fattibilità tecnico-economica",
          "Integrazione con bandi, CER e incentivi energetici",
        ],
      },
    ],
    stepsTitle: "Come lavoriamo sui progetti agricoli",
    steps: [
      {
        step: "1",
        title: "Inquadramento aziendale e territoriale",
        text: "Analisi dell’azienda, dei vincoli territoriali e delle opportunità legate a bandi, acqua, suolo ed energia.",
      },
      {
        step: "2",
        title: "Progetto tecnico + pratiche",
        text: "Progettazione di interventi irrigui, strutturali o energetici e gestione coordinata delle pratiche autorizzative e di contributo.",
      },
      {
        step: "3",
        title: "Cantiere, controlli e monitoraggi",
        text: "Affiancamento in fase realizzativa, predisposizione documentazione per controlli, monitoraggi e rendicontazione.",
      },
    ],
    grantsTitle: "Bandi e finanziamenti per l’agricoltura",
    coursesTitle: "Formazione tecnica in ambito agricoltura",
    booksTitle: "Manuali e pubblicazioni in ambito agricoltura",
    portfolioTitle: "Progetti e casi studio in ambito agricoltura",
    portfolioChip: "Agricoltura",
    ctaTitle: "Hai un progetto in ambito agricolo?",
    ctaText:
      "Possiamo supportarti su irrigazione, reflui, energia in ambito agricolo e bandi. Raccontaci il contesto, ti rispondiamo in tempi brevi.",
  },

  {
    slug: "ambiente",
    area: "Ambiente",
    h1: "Aree di intervento in ambito ambiente",
    macroCards: [
      {
        icon: "AlertTriangle",
        title: "Bonifiche e siti contaminati",
        img: "/services/ambiente-bonifiche.jpg",
        bullets: [
          "Indagini preliminari e di dettaglio (ARPA/ARSS)",
          "Analisi di rischio sito-specifica e modello concettuale",
          "Progetti di bonifica e messa in sicurezza (MISO/MISP)",
          "Piani di monitoraggio, gestione terre e rifiuti da scavo",
        ],
      },
      {
        icon: "Factory",
        title: "Rifiuti, sottoprodotti e terre/rocce",
        img: "/services/ambiente-rifiuti.jpg",
        bullets: [
          "Classificazione rifiuti e codici EER",
          "Gestione depositi temporanei, registri e MUD",
          "Piani di gestione terre e rocce da scavo",
          "Supporto su sottoprodotti ed end of waste",
        ],
      },
      {
        icon: "Leaf",
        title: "Studi previsionali e VIA",
        img: "/services/ambiente-studi.jpg",
        bullets: [
          "Screening VIA/VAS e studi di impatto ambientale",
          "Valutazioni su aria, rumore, traffico, suolo e acque",
          "Piani di monitoraggio ambientale (PMA)",
          "Rapporti tecnici per conferenze dei servizi",
        ],
      },
      {
        icon: "FileSearch",
        title: "Permitting e due diligence ambientale",
        img: "/services/ambiente-permitting.jpg",
        bullets: [
          "AUA, AIA e autorizzazioni settoriali, nuove e rinnovi",
          "Due diligence ambientali per acquisizioni e M&A",
          "Verifica conformità normativa di impianti e siti",
          "Piani di adeguamento e roadmap di intervento",
        ],
      },
    ],
    stepsTitle: "Come lavoriamo sui progetti ambientali",
    steps: [
      {
        step: "1",
        title: "Inquadramento e analisi",
        text: "Raccolta documentazione, sopralluoghi, analisi di conformità e gap rispetto alla normativa vigente.",
      },
      {
        step: "2",
        title: "Progetto + permitting",
        text: "Redazione elaborati tecnici, studi previsionali e pratiche autorizzative. Supporto in conferenze di servizi e integrazioni.",
      },
      {
        step: "3",
        title: "Esecuzione e monitoraggi",
        text: "Assistenza in cantiere, gestione rifiuti/terre, monitoraggi ambientali e reportistica per enti e stakeholder.",
      },
    ],
    grantsTitle: "Bandi e finanziamenti per interventi ambientali",
    coursesTitle: "Formazione tecnica in ambito ambiente",
    booksTitle: "Manuali e pubblicazioni in ambito ambiente",
    portfolioTitle: "Progetti e casi studio in ambito ambiente",
    portfolioChip: "Ambiente",
    ctaTitle: "Hai un progetto con ricadute ambientali?",
    ctaText:
      "Possiamo supportarti su bonifiche, rifiuti, studi previsionali e autorizzazioni. Raccontaci il contesto, ti rispondiamo in tempi brevi.",
  },

  {
    slug: "edilizia",
    area: "Edilizia e Infrastrutture",
    h1: "Aree di intervento in ambito edilizia e infrastrutture",
    macroCards: [
      {
        icon: "FileText",
        title: "Pratiche edilizie e titoli abilitativi",
        img: "/services/edilizia-permessi.jpg",
        bullets: [
          "Permessi di costruire, SCIA e CILA",
          "Pratiche per ristrutturazioni, ampliamenti e cambi d’uso",
          "Sanatorie edilizie e regolarizzazioni",
          "Coordinamento con uffici tecnici comunali e enti coinvolti",
        ],
      },
      {
        icon: "ClipboardList",
        title: "Direzione lavori e contabilità di cantiere",
        img: "/services/edilizia-direzione-lavori.jpg",
        bullets: [
          "Direzione lavori architettonica e/o impiantistica",
          "Contabilità di cantiere, SAL e certificati di pagamento",
          "Gestione varianti in corso d’opera",
          "Coordinamento imprese, fornitori e controlli di qualità",
        ],
      },
      {
        icon: "Building2",
        title: "Infrastrutture e opere civili",
        img: "/services/edilizia-infrastrutture.jpg",
        bullets: [
          "Edifici produttivi, direzionali e opere civili",
          "Interfaccia con progettisti strutturali e impiantistici",
          "Supporto a gare d’appalto e capitolati tecnici",
          "Piani di manutenzione e gestione post-intervento",
        ],
      },
      {
        icon: "Hammer",
        title: "Due diligence e verifiche tecnico-amministrative",
        img: "/services/edilizia-sanatorie.jpg",
        bullets: [
          "Due diligence tecnico-amministrative su immobili e aree",
          "Verifica conformità urbanistico-edilizia e catastale",
          "Piani di regolarizzazione e sanatorie mirate",
          "Supporto a compravendite e investimenti immobiliari",
        ],
      },
    ],
    stepsTitle: "Come lavoriamo su progetti edilizi e infrastrutturali",
    steps: [
      {
        step: "1",
        title: "Inquadramento e verifica",
        text: "Analisi del contesto, verifica vincoli, stato legittimo e fattibilità tecnico-amministrativa dell’intervento.",
      },
      {
        step: "2",
        title: "Pratiche, progetto e autorizzazioni",
        text: "Redazione pratiche edilizie, progetto di dettaglio, gestione iter autorizzativi e pareri degli enti.",
      },
      {
        step: "3",
        title: "Cantiere, DL e chiusura lavori",
        text: "Direzione lavori, contabilità, varianti, collaudi e pratiche di fine lavori fino all’agibilità.",
      },
    ],
    grantsTitle: "Bandi e finanziamenti per edilizia e infrastrutture",
    coursesTitle: "Formazione tecnica per edilizia e infrastrutture",
    booksTitle: "Manuali e pubblicazioni per edilizia e infrastrutture",
    portfolioTitle: "Progetti e casi studio in ambito edilizia",
    portfolioChip: "Edilizia e Infrastrutture",
    ctaTitle: "Hai un intervento edilizio o infrastrutturale da avviare?",
    ctaText:
      "Possiamo affiancarti su pratiche edilizie, permessi di costruire, direzione lavori e contabilità. Raccontaci il progetto, ti rispondiamo in tempi brevi.",
  },

  {
    slug: "energia",
    area: "Energia",
    h1: "Aree di intervento in ambito energia",
    macroCards: [
      {
        icon: "Zap",
        title: "Diagnosi energetiche e audit",
        img: "/services/energia-diagnosi.jpg",
        bullets: [
          "Diagnosi energetiche per imprese e PA",
          "Audit secondo ISO 50001 e D.Lgs. 102/2014",
          "Analisi baseline, KPI e profili di carico",
          "Roadmap di interventi con priorità e ROI",
        ],
      },
      {
        icon: "ThermometerSun",
        title: "Relazioni ex Legge 10 e APE",
        img: "/services/energia-legge10.jpg",
        bullets: [
          "Relazioni ex Legge 10 per nuove costruzioni e ristrutturazioni",
          "Verifica requisiti minimi e trasmittanze",
          "Attestati di Prestazione Energetica (APE)",
          "Supporto in fasi di progettazione e collaudo",
        ],
      },
      {
        icon: "Wind",
        title: "Progettazione HVAC e impianti",
        img: "/services/energia-hvac.jpg",
        bullets: [
          "Progettazione impianti climatizzazione, ventilazione e recupero calore",
          "Sistemi ibridi, pompe di calore e integrazione con FER",
          "Ottimizzazione regolazioni ed automazioni",
          "Verifiche in opera e bilanci termici",
        ],
      },
      {
        icon: "Factory",
        title: "Impianti FER, autorizzazioni e incentivi",
        img: "/services/energia-fer.jpg",
        bullets: [
          "Studi di fattibilità per impianti FER (FV, solare termico, biomasse…)",
          "Iter autorizzativo per impianti e connessioni",
          "Conto termico, certificati bianchi e altri incentivi",
          "Integrazione con bandi e finanza agevolata",
        ],
      },
    ],
    stepsTitle: "Come lavoriamo sui progetti energetici",
    steps: [
      {
        step: "1",
        title: "Analisi e diagnosi",
        text: "Raccolta dati di consumo, rilievi in campo, modellazioni e diagnosi energetiche per definire baseline e fabbisogni.",
      },
      {
        step: "2",
        title: "Progetto, Legge 10 e APE",
        text: "Sviluppo progetto impiantistico, relazioni ex Legge 10, APE, verifiche di conformità e documenti per autorizzazioni/incentivi.",
      },
      {
        step: "3",
        title: "Cantiere e monitoraggio",
        text: "Affiancamento in cantiere, fine lavori, collaudi e monitoraggio post-intervento con KPI energetici dedicati.",
      },
    ],
    grantsTitle: "Bandi e finanziamenti per interventi energetici",
    coursesTitle: "Formazione tecnica in ambito energia",
    booksTitle: "Manuali e pubblicazioni in ambito energia",
    portfolioTitle: "Progetti e casi studio in ambito energia",
    portfolioChip: "Energia",
    ctaTitle: "Vuoi ridurre i consumi energetici?",
    ctaText:
      "Dalle diagnosi ai progetti HVAC, fino a incentivi e bandi: raccontaci il contesto, ti proponiamo un percorso concreto e sostenibile.",
  },

  {
    slug: "sicurezza",
    area: "Sicurezza",
    h1: "Aree di intervento in ambito sicurezza",
    macroCards: [
      {
        icon: "HardHat",
        title: "Cantieri, CSP/CSE e PSC",
        img: "/services/sicurezza-cantieri.jpg",
        bullets: [
          "Coordinamento della sicurezza in fase di progettazione (CSP)",
          "Coordinamento in fase di esecuzione (CSE)",
          "Piani di Sicurezza e Coordinamento (PSC) e fascicolo dell’opera",
          "Gestione interferenze, riunioni di coordinamento e verbali",
        ],
      },
      {
        icon: "ShieldCheck",
        title: "Sicurezza sul lavoro & RSPP",
        img: "/services/sicurezza-lavoro.jpg",
        bullets: [
          "Incarico RSPP esterno per PMI e realtà complesse",
          "Redazione e aggiornamento DVR e valutazioni specifiche (rumore, ATEX, chimico, MMC, VDT…)",
          "Piani di miglioramento, procedure e istruzioni operative",
          "Audit interni e supporto in caso di ispezioni",
        ],
      },
      {
        icon: "Flame",
        title: "Antincendio e gestione emergenze",
        img: "/services/sicurezza-antincendio.jpg",
        bullets: [
          "Valutazione del rischio incendio e piani di emergenza ed evacuazione",
          "Progetti antincendio e pratiche VV.F. (SCIA, rinnovi…)",
          "Simulazioni di esodo, layout vie di fuga e presidi antincendio",
          "Formazione e prove di evacuazione con reportistica dedicata",
        ],
      },
      {
        icon: "Users",
        title: "Sicurezza per eventi e luoghi di pubblico spettacolo",
        img: "/services/sicurezza-eventi.jpg",
        bullets: [
          "Piani di sicurezza per eventi, concerti e manifestazioni",
          "Layout aree, percorsi, uscite e presidi sanitari",
          "Coordinamento con enti locali, commissioni di vigilanza, forze dell’ordine",
          "Gestione documentale con fornitori e allestitori",
        ],
      },
    ],
    stepsTitle: "Come lavoriamo sui progetti di sicurezza",
    steps: [
      {
        step: "1",
        title: "Analisi e sopralluoghi",
        text: "Sopralluoghi, interviste, raccolta documenti e rilievo delle condizioni reali di lavoro o dell’evento.",
      },
      {
        step: "2",
        title: "Piani, DVR e coordinamento",
        text: "Redazione DVR, PSC, piani di emergenza, procedure, con coordinamento tra datori di lavoro, imprese e fornitori.",
      },
      {
        step: "3",
        title: "Attuazione, audit e aggiornamenti",
        text: "Affiancamento nella messa in pratica delle misure, audit periodici, formazione e aggiornamento continuo dei documenti.",
      },
    ],
    grantsTitle: "Bandi e finanziamenti per la sicurezza",
    coursesTitle: "Formazione tecnica in ambito sicurezza",
    booksTitle: "Manuali e pubblicazioni in ambito sicurezza",
    portfolioTitle: "Progetti e casi studio in ambito sicurezza",
    portfolioChip: "Sicurezza",
    ctaTitle: "Vuoi rafforzare la sicurezza in azienda o in cantiere?",
    ctaText:
      "Possiamo affiancarti come CSP/CSE, RSPP o consulenti per antincendio, eventi e audit. Raccontaci il tuo contesto, ti rispondiamo in tempi brevi.",
  },
];

export function getConsulenzaAreaBySlug(slug: string) {
  return CONSULENZA_AREAS.find((a) => a.slug === slug);
}
