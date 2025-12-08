// app/servizi/finanziamenti/_data.ts

export type Status = "Aperti" | "Chiusi" | "In programma";

export type Area =
  | "Acqua"
  | "Ambiente"
  | "Energia"
  | "Agricoltura"
  | "Sicurezza"
  | "Edilizia e Infrastrutture"
  | "Bandi e Finanziamenti";

// usato per il filtro per area nella pagina lista
export const ALL_AREAS: Area[] = [
  "Acqua",
  "Ambiente",
  "Energia",
  "Agricoltura",
  "Sicurezza",
  "Edilizia e Infrastrutture",
  "Bandi e Finanziamenti",
];

export type Grant = {
  slug: string;
  title: string;
  stato: Status;
  ente: string;
  beneficiari: string;
  contributo: string;
  scadenza?: string;      // es. "2026-03-03"
  territorio?: string;
  teaser?: string;        // descrizione breve per la card
  description?: string;   // descrizione estesa per la pagina dettaglio
  pdfHref?: string;       // link al PDF in /public/finanziamenti/
  youtubeId?: string;     // ID del video YouTube
  officialUrl?: string;   // link al sito ufficiale
  areas?: Area[];         // settori di riferimento (Acqua, Ambiente, …)
};

export const GRANTS: Grant[] = [
  {
    slug: "mase-fotovoltaico-fer-sud",
    title: "MASE – Bando Fotovoltaico FER Sud",
    stato: "Aperti",
    ente: "MASE",
    beneficiari: "Imprese",
    contributo: "Fondo perduto",
    scadenza: "2026-03-03",
    territorio: "Mezzogiorno",
    teaser:
      "Incentivo per impianti fotovoltaici nel Mezzogiorno con focus sull’autoproduzione energetica.",
    description:
      "Contributi a fondo perduto per la realizzazione di impianti fotovoltaici nel Sud Italia, con particolare attenzione alla riduzione dei consumi energetici e alla sostenibilità delle imprese.",
    pdfHref: "/finanziamenti/mase-fotovoltaico-fer-sud.pdf",
    youtubeId: "dQw4w9WgXcQ",
    officialUrl: "https://www.mase.gov.it/",
    areas: ["Energia", "Bandi e Finanziamenti"],
  },
  {
    slug: "regione-veneto-efficienza-energetica-pmi",
    title: "Regione Veneto – Efficienza energetica per PMI",
    stato: "Aperti",
    ente: "Regione Veneto",
    beneficiari: "PMI",
    contributo: "Contributo 30–50%",
    scadenza: "2025-12-15",
    territorio: "Veneto",
    teaser:
      "Contributi per interventi di efficientamento energetico degli stabilimenti produttivi.",
    description:
      "Agevolazioni per PMI venete che realizzano interventi di riduzione dei consumi energetici, ammodernamento impianti e sistemi di monitoraggio dell’energia.",
    pdfHref: "/finanziamenti/regione-veneto-efficienza-energetica-pmi.pdf",
    youtubeId: "dQw4w9WgXcQ",
    officialUrl: "https://www.regione.veneto.it/",
    areas: ["Energia", "Bandi e Finanziamenti"],
  },
  {
    slug: "isi-inail-2025",
    title: "ISI INAIL 2025 – Sicurezza sul lavoro",
    stato: "In programma",
    ente: "INAIL",
    beneficiari: "Imprese",
    contributo: "Fondo perduto 40–65%",
    territorio: "Italia",
    teaser:
      "Contributi per migliorare salute e sicurezza nei luoghi di lavoro. Click day atteso nel 2025.",
    description:
      "Finanziamenti a fondo perduto per progetti di miglioramento dei livelli di sicurezza e salute nei luoghi di lavoro. L’edizione 2025 prevede nuove linee di intervento e click-day nel primo trimestre.",
    pdfHref: "/finanziamenti/isi-inail-2025.pdf",
    youtubeId: "dQw4w9WgXcQ",
    officialUrl: "https://www.inail.it/",
    areas: ["Sicurezza", "Bandi e Finanziamenti"],
  },
];

// helper per pagina [slug]
export const getGrantBySlug = (slug: string) =>
  GRANTS.find((g) => g.slug === slug);
