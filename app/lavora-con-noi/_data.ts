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
    slug: "project-engineer-acqua-ambiente",
    title: "Project engineer – Acqua / Ambiente",
    location: "Padova (PD) – Ibrido",
    level: "2–5 anni di esperienza",
    areas: ["Acqua", "Ambiente"],
    contract: "Tempo pieno / Tempo indeterminato (da valutare)",
    availability: "Inserimento entro 3–6 mesi",
    intro:
      "Ti occuperai di studi, progettazione e permitting su acqua e ambiente, affiancando il team senior nei rapporti con enti, gestori e clienti.",
    activities: [
      "Supporto a studi idraulici, idrogeologici e ambientali.",
      "Predisposizione di elaborati tecnici e relazioni per concessioni, scarichi, VIA/VAS, AUA.",
      "Raccolta dati, gestione documentale e interfaccia con enti e gestori.",
      "Affiancamento in sopralluoghi, incontri tecnici e conferenze di servizi.",
    ],
    requirements: [
      "Laurea in ingegneria, scienze ambientali o affini.",
      "2–5 anni di esperienza in studi tecnici, società di ingegneria o PA.",
      "Buona conoscenza della normativa su acqua/ambiente o forte motivazione a specializzarsi.",
      "Capacità di gestione ordinata di scadenze e documentazione.",
    ],
    plus: [
      "Esperienza pregressa su concessioni idriche, scarichi, VIA/VAS o bonifiche.",
      "Conoscenza base di software GIS o modellazione idraulica/idrogeologica.",
    ],
    whatWeOffer: [
      "Inserimento in team tecnico con affiancamento strutturato.",
      "Possibilità di crescita su gestione autonoma di progetti e rapporti con i clienti.",
      "Ambiente di lavoro informale ma molto organizzato su scadenze e priorità.",
    ],
  },
  {
    slug: "junior-consultant-bandi-finanziamenti",
    title: "Junior consultant – Bandi e Finanziamenti",
    location: "Padova (PD)",
    level: "Neolaureato/a o 1–2 anni",
    areas: ["Bandi e finanziamenti"],
    contract: "Tempo pieno / Stage finalizzato all’assunzione",
    availability: "Inserimento entro 3 mesi",
    intro:
      "Supporterai lo scouting di bandi, la predisposizione delle domande e la rendicontazione di progetti per imprese ed enti.",
    activities: [
      "Analisi di bandi nazionali e regionali.",
      "Raccolta documenti e predisposizione di allegati tecnici ed economici.",
      "Supporto alla compilazione di portali e piattaforme per la richiesta dei contributi.",
      "Monitoraggio scadenze, aggiornamento CRM interno e reportistica.",
    ],
    requirements: [
      "Laurea in ambito economico, gestionale o tecnico.",
      "Attitudine al lavoro ordinato su scadenze e documenti.",
      "Buona capacità di scrittura e sintesi.",
      "Uso avanzato di Excel/Sheets.",
    ],
    plus: [
      "Esperienza (anche breve) su bandi, finanza agevolata o progetti UE/nazionali.",
      "Conoscenza base di contabilità o controllo di gestione.",
    ],
    whatWeOffer: [
      "Formazione continua su strumenti e normativa di settore.",
      "Percorso di crescita verso gestione autonoma di bandi e clienti.",
      "Team giovane, supporto costante e metodo di lavoro strutturato.",
    ],
  },
  {
    slug: "tecnico-sicurezza-rspp-cantieri",
    title: "Tecnico sicurezza cantieri / RSPP",
    location: "Nord-Est / trasferte",
    level: "Esperienza in cantieri e DVR",
    areas: ["Sicurezza", "Cantieri"],
    contract: "Tempo pieno, collaborazione o P.IVA da valutare",
    availability: "Inserimento flessibile in base alla disponibilità",
    intro:
      "Seguirai aspetti di sicurezza in cantieri e impianti, tra DVR, PSC, CSP/CSE e piani di emergenza.",
    activities: [
      "Sopralluoghi in cantieri e impianti produttivi.",
      "Redazione DVR, POS, PSC e piani di emergenza.",
      "Affiancamento come CSP/CSE in opere edili e impiantistiche.",
      "Formazione operativa e supporto ai datori di lavoro nelle misure di prevenzione.",
    ],
    requirements: [
      "Esperienza concreta su sicurezza nei cantieri e/o RSPP.",
      "Conoscenza della normativa su salute e sicurezza sul lavoro.",
      "Disponibilità a spostamenti nel Nord-Est.",
      "Capacità di relazione con imprese, tecnici e coordinatori.",
    ],
    plus: [
      "Abilitazione CSP/CSE.",
      "Qualifica RSPP per alcuni ATECO.",
    ],
    whatWeOffer: [
      "Coinvolgimento in progetti complessi e di medio-lungo periodo.",
      "Possibilità di collaborazione flessibile o inserimento strutturato.",
      "Supporto di un team tecnico multidisciplinare (acqua, ambiente, energia, edilizia).",
    ],
  },
];
