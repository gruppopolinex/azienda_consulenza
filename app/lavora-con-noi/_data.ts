// app/lavora-con-noi/_data.ts

export type Job = {
  slug: string;
  title: string;
  location: string;
  level: string;
  areas: string[];
  contract: string;
  availability: string;
  intro: string;
  activities: string[];
  requirements: string[];
  plus?: string[];
  whatWeOffer: string[];
};

export const JOBS: Job[] = [
  {
    slug: "ingegnere-consulente-ambientale",
    title: "Ingegnere Ambientale / Consulente Ambientale",
    location: "Padova (PD) – Ibrido",
    level: "Junior / Middle / Senior",
    areas: ["Ambiente", "Acqua", "Sicurezza"],
    contract: "Tempo pieno o collaborazione P.IVA",
    availability: "Inserimento da concordare",
    intro:
      "La risorsa si occuperà di consulenza tecnica ambientale e gestione di pratiche autorizzative, studi e progetti nei settori acqua e ambiente.",
    activities: [
      "Studi e analisi ambientali e idrauliche.",
      "Predisposizione di relazioni tecniche e documentazione autorizzativa (VIA, VAS, AUA, scarichi, concessioni).",
      "Interfaccia con enti, gestori e clienti.",
      "Supporto a sopralluoghi e incontri tecnici.",
    ],
    requirements: [
      "Laurea in Ingegneria Ambientale o discipline affini.",
      "Conoscenza della normativa ambientale.",
      "Capacità di gestione documentale e delle scadenze.",
      "Buone capacità relazionali e di lavoro in team.",
    ],
    plus: [
      "Esperienza su procedimenti autorizzativi ambientali.",
      "Conoscenza di strumenti GIS o modellazione tecnica.",
    ],
    whatWeOffer: [
      "Inserimento in team multidisciplinare.",
      "Crescita professionale su progetti complessi.",
      "Flessibilità organizzativa e possibilità di lavoro ibrido.",
    ],
  },

  {
    slug: "ingegnere-consulente-energetico",
    title: "Ingegnere Energetico / Consulente Energia",
    location: "Padova (PD) – Ibrido",
    level: "Junior / Middle / Senior",
    areas: ["Energia", "Efficienza energetica"],
    contract: "Tempo pieno o collaborazione P.IVA",
    availability: "Inserimento da concordare",
    intro:
      "La figura sarà coinvolta in attività di consulenza energetica, diagnosi, progettazione e supporto a interventi di efficientamento.",
    activities: [
      "Diagnosi energetiche e studi di fattibilità.",
      "Supporto a progetti di efficientamento e fonti rinnovabili.",
      "Redazione di relazioni tecniche e documentazione incentivante.",
      "Interazione con clienti e partner tecnici.",
    ],
    requirements: [
      "Laurea in Ingegneria Energetica o affine.",
      "Conoscenza dei principali strumenti di analisi energetica.",
      "Interesse per la transizione energetica.",
    ],
    plus: [
      "Esperienza su incentivi e meccanismi di supporto (conto termico, detrazioni, ecc.).",
    ],
    whatWeOffer: [
      "Progetti legati a innovazione e sostenibilità.",
      "Formazione continua e crescita tecnica.",
      "Ambiente dinamico e multidisciplinare.",
    ],
  },

  {
    slug: "ingegnere-consulente-sicurezza-hse",
    title: "Ingegnere della Sicurezza / Consulente HSE",
    location: "Nord Italia / Trasferte",
    level: "Middle / Senior",
    areas: ["Sicurezza", "Cantieri", "HSE"],
    contract: "Tempo pieno o collaborazione P.IVA",
    availability: "Inserimento flessibile",
    intro:
      "La risorsa si occuperà di consulenza in materia di salute e sicurezza sul lavoro per aziende e cantieri.",
    activities: [
      "Redazione DVR, POS, PSC e documentazione HSE.",
      "Attività di CSP/CSE e sopralluoghi in cantiere.",
      "Supporto ai datori di lavoro e alle imprese.",
      "Attività formative in ambito sicurezza.",
    ],
    requirements: [
      "Esperienza in ambito sicurezza sul lavoro.",
      "Ottima conoscenza del D.Lgs. 81/08.",
      "Disponibilità a trasferte.",
    ],
    plus: [
      "Abilitazioni CSP/CSE.",
      "Qualifica RSPP.",
    ],
    whatWeOffer: [
      "Coinvolgimento in progetti strutturati.",
      "Autonomia operativa e supporto del team.",
      "Collaborazioni di lungo periodo.",
    ],
  },

  {
    slug: "ingegnere-civile",
    title: "Ingegnere Civile",
    location: "Padova (PD)",
    level: "Junior / Middle",
    areas: ["Edilizia", "Infrastrutture"],
    contract: "Tempo pieno o collaborazione",
    availability: "Inserimento da concordare",
    intro:
      "La figura sarà coinvolta in attività di progettazione civile e infrastrutturale.",
    activities: [
      "Progettazione preliminare, definitiva ed esecutiva.",
      "Redazione di elaborati grafici e relazioni tecniche.",
      "Supporto alla direzione lavori.",
    ],
    requirements: [
      "Laurea in Ingegneria Civile.",
      "Buona conoscenza degli strumenti di progettazione.",
    ],
    whatWeOffer: [
      "Progetti diversificati e multidisciplinari.",
      "Crescita tecnica e professionale.",
    ],
  },

  {
    slug: "consulente-agrario",
    title: "Consulente Agrario",
    location: "Padova (PD) / Territorio",
    level: "Middle / Senior",
    areas: ["Agricoltura", "Ambiente"],
    contract: "Collaborazione P.IVA",
    availability: "Inserimento da concordare",
    intro:
      "Supporto tecnico e consulenziale per aziende agricole e progetti in ambito rurale e ambientale.",
    activities: [
      "Consulenza tecnica alle aziende agricole.",
      "Supporto a pratiche e progetti di sviluppo rurale.",
      "Affiancamento su bandi e finanziamenti agricoli.",
    ],
    requirements: [
      "Titolo in ambito agrario o forestale.",
      "Conoscenza del settore agricolo e normativo.",
    ],
    whatWeOffer: [
      "Collaborazioni su progetti strutturati.",
      "Integrazione in team multidisciplinare.",
    ],
  },

  {
    slug: "esperto-bandi-finanziamenti",
    title: "Esperto in Bandi e Finanziamenti",
    location: "Padova (PD)",
    level: "Junior / Middle",
    areas: ["Bandi e finanziamenti"],
    contract: "Tempo pieno o collaborazione",
    availability: "Inserimento entro 3 mesi",
    intro:
      "La risorsa supporterà imprese ed enti nella ricerca e gestione di bandi e contributi.",
    activities: [
      "Scouting bandi regionali, nazionali ed europei.",
      "Predisposizione e gestione delle domande.",
      "Supporto alla rendicontazione dei progetti.",
    ],
    requirements: [
      "Laurea in ambito economico, gestionale o tecnico.",
      "Ottima capacità organizzativa.",
    ],
    plus: [
      "Esperienza in finanza agevolata o PNRR.",
    ],
    whatWeOffer: [
      "Formazione continua.",
      "Percorso di crescita professionale.",
    ],
  },

  {
    slug: "ingegnere-informatico",
    title: "Ingegnere Informatico",
    location: "Padova (PD) – Ibrido",
    level: "Junior / Middle",
    areas: ["Software", "Digitalizzazione"],
    contract: "Tempo pieno",
    availability: "Inserimento da concordare",
    intro:
      "Svilupperai e supporterai soluzioni software e gestionali aziendali.",
    activities: [
      "Sviluppo e manutenzione applicativi.",
      "Supporto tecnico interno ed esterno.",
      "Analisi funzionale e miglioramento processi.",
    ],
    requirements: [
      "Laurea in Ingegneria Informatica o Informatica.",
      "Conoscenza di sviluppo software e database.",
    ],
    whatWeOffer: [
      "Progetti digitali innovativi.",
      "Ambiente tecnico e collaborativo.",
    ],
  },

  {
    slug: "consulente-legale",
    title: "Consulente Legale",
    location: "Collaborazione",
    level: "Senior",
    areas: ["Legale", "Normativa"],
    contract: "Collaborazione P.IVA",
    availability: "Da concordare",
    intro:
      "Consulenza legale a supporto delle attività tecniche e progettuali.",
    activities: [
      "Supporto normativo e contrattuale.",
      "Pareri legali su progetti e bandi.",
    ],
    requirements: [
      "Laurea in Giurisprudenza.",
      "Esperienza in ambito tecnico-amministrativo.",
    ],
    whatWeOffer: [
      "Collaborazioni continuative.",
      "Coinvolgimento in progetti complessi.",
    ],
  },

  {
    slug: "consulente-immobiliare",
    title: "Consulente Immobiliare",
    location: "Padova (PD) / Territorio",
    level: "Middle / Senior",
    areas: ["Immobiliare", "Edilizia"],
    contract: "Collaborazione",
    availability: "Da concordare",
    intro:
      "Supporto tecnico-consulenziale in operazioni e progetti immobiliari.",
    activities: [
      "Analisi tecnico-economica immobiliare.",
      "Supporto a valutazioni e pratiche.",
    ],
    requirements: [
      "Esperienza nel settore immobiliare.",
      "Conoscenza delle normative edilizie.",
    ],
    whatWeOffer: [
      "Collaborazioni su progetti qualificati.",
      "Integrazione con team tecnico e legale.",
    ],
  },
];
