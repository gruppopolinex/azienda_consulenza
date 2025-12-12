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

  /** Testo breve introduttivo per la pagina dettaglio (colonna destra) */
  overview?: string;

  /** Elenco attività (ordinate) per la pagina dettaglio (colonna destra) */
  activities?: string[];

  /** Personalizzazione CTA in pagina dettaglio (opzionale) */
  ctaTitle?: string;
  ctaText?: string;

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
    overview:
      "Supporto tecnico per la pianificazione e l’esecuzione di monitoraggi multi-pozzo, con gestione dati e coordinamento operativo.",
    activities: [
      "Definizione piano di monitoraggio e parametri di controllo.",
      "Coordinamento sopralluoghi e campionamenti.",
      "Raccolta, normalizzazione e archiviazione dati.",
      "Reportistica tecnica e condivisione risultati con il committente.",
    ],
    ctaTitle: "Vuoi valutare un progetto simile?",
    ctaText:
      "Possiamo supportarti nella definizione del piano di monitoraggio, nella gestione dati e negli adempimenti tecnici collegati.",
    imagesCount: 3,
  },
  {
    slug: "acqua-potabilizzazione",
    title: "Adeguamento impianto di potabilizzazione",
    category: "Acqua",
    location: "Treviso (TV)",
    client: "Gestore Idrico",
    overview:
      "Attività di supporto tecnico e documentale per l’adeguamento di un impianto di potabilizzazione, con verifica requisiti e iter autorizzativi.",
    activities: [
      "Analisi stato di fatto e requisiti prestazionali.",
      "Supporto a progettazione e scelta soluzioni impiantistiche.",
      "Predisposizione elaborati tecnici e documentazione.",
      "Interfaccia con enti/gestori per verifiche e allineamenti.",
    ],
    ctaTitle: "Vuoi valutare un progetto simile?",
    ctaText:
      "Analizziamo insieme criticità impiantistiche, tempi e documentazione necessaria per arrivare a un intervento cantierabile.",
    imagesCount: 3,
  },

  // --- AMBIENTE ---
  {
    slug: "ambiente-via",
    title: "Screening VIA per ampliamento produttivo",
    category: "Ambiente",
    location: "Venezia (VE)",
    client: "Manifattura locale",
    overview:
      "Gestione dello screening VIA per ampliamento produttivo: inquadramento ambientale, documentazione e coordinamento con gli stakeholder.",
    activities: [
      "Raccolta dati e inquadramento territoriale/ambientale.",
      "Redazione elaborati per screening VIA e allegati tecnici.",
      "Interfaccia con ente competente e supporto in integrazioni.",
      "Monitoraggio iter e scadenze procedimentali.",
    ],
    ctaTitle: "Vuoi valutare un progetto simile?",
    ctaText:
      "Ti aiutiamo a capire vincoli e percorso autorizzativo più efficace, riducendo rischi di stop o richieste integrative.",
    imagesCount: 3,
  },
  {
    slug: "ambiente-bonifica-sito",
    title: "Piano operativo di bonifica sito industriale",
    category: "Ambiente",
    location: "Vicenza (VI)",
    client: "Azienda Chimica",
    overview:
      "Predisposizione e gestione del piano operativo di bonifica con approccio tecnico-normativo e coordinamento documentale.",
    activities: [
      "Analisi documentale e definizione perimetro intervento.",
      "Impostazione strategia di bonifica e fasi operative.",
      "Redazione piano e relazioni tecniche.",
      "Supporto al confronto con enti e gestione integrazioni.",
    ],
    ctaTitle: "Vuoi valutare un progetto simile?",
    ctaText:
      "Possiamo affiancarti nella definizione del percorso tecnico e nelle interlocuzioni con gli enti fino all’approvazione.",
    imagesCount: 3,
  },

  // --- ENERGIA ---
  {
    slug: "energia-audit-iso50001",
    title: "Audit energetico secondo ISO 50001",
    category: "Energia",
    location: "Vicenza (VI)",
    client: "Azienda Metalmeccanica",
    overview:
      "Audit energetico con impostazione coerente a un sistema ISO 50001, con individuazione opportunità e priorità di intervento.",
    activities: [
      "Raccolta dati di consumo e profili energetici.",
      "Analisi utenze e individuazione sprechi/opportunità.",
      "Valutazione interventi e stima benefici.",
      "Report finale e supporto al piano di miglioramento.",
    ],
    ctaTitle: "Vuoi valutare un progetto simile?",
    ctaText:
      "Se vuoi ridurre consumi e definire un piano di interventi, possiamo partire da un audit chiaro e orientato alle decisioni.",
    imagesCount: 3,
  },
  {
    slug: "energia-cer",
    title: "Studio di fattibilità CER per area produttiva",
    category: "Energia",
    location: "Padova (PD)",
    client: "Consorzio Imprese",
    overview:
      "Studio di fattibilità per Comunità Energetica Rinnovabile (CER) con analisi consumi, produzione e scenari di configurazione.",
    activities: [
      "Raccolta dati di consumo/produzione e profili orari.",
      "Simulazione scenari CER e stima benefici.",
      "Impostazione iter e documentazione preliminare.",
      "Supporto alla roadmap operativa e coinvolgimento stakeholder.",
    ],
    ctaTitle: "Vuoi valutare un progetto simile?",
    ctaText:
      "Ti aiutiamo a capire se una CER è sostenibile e come impostare i passi successivi, tecnici e organizzativi.",
    imagesCount: 3,
  },

  // --- AGRICOLTURA ---
  {
    slug: "agricoltura-nitrati",
    title: "Piano gestione nitrati in ZVN",
    category: "Agricoltura",
    location: "Rovigo (RO)",
    client: "Azienda Agricola",
    overview:
      "Supporto tecnico per la gestione nitrati in ZVN: verifica adempimenti, coerenza agronomica e documentazione.",
    activities: [
      "Raccolta dati aziendali e inquadramento normativo.",
      "Impostazione piano di gestione e registrazioni.",
      "Supporto su adempimenti e scadenze.",
      "Affiancamento in eventuali controlli/integrazioni.",
    ],
    ctaTitle: "Vuoi valutare un progetto simile?",
    ctaText:
      "Possiamo aiutarti a impostare correttamente piani e registrazioni, riducendo rischi di non conformità.",
    imagesCount: 3,
  },
  {
    slug: "agricoltura-reflui",
    title: "Utilizzo agronomico reflui — adeguamento piani",
    category: "Agricoltura",
    location: "Verona (VR)",
    client: "Cooperativa Agricola",
    overview:
      "Adeguamento dei piani per l’utilizzo agronomico dei reflui: verifica requisiti, calcoli e aggiornamento documentale.",
    activities: [
      "Analisi piani esistenti e necessità di adeguamento.",
      "Aggiornamento calcoli, superfici e bilanci.",
      "Predisposizione documentazione e allegati.",
      "Supporto a comunicazioni verso enti competenti.",
    ],
    ctaTitle: "Vuoi valutare un progetto simile?",
    ctaText:
      "Se devi aggiornare piani e bilanci, possiamo gestire parte tecnica e documentale in modo ordinato e tracciabile.",
    imagesCount: 3,
  },

  // --- SICUREZZA ---
  {
    slug: "sicurezza-cantieri",
    title: "CSP/CSE complesso edilizio multipiano",
    category: "Sicurezza",
    location: "Mestre (VE)",
    client: "Impresa Edile",
    overview:
      "Attività di coordinamento sicurezza in fase progettuale ed esecutiva per un complesso edilizio multipiano.",
    activities: [
      "Redazione PSC e verifica interferenze.",
      "Sopralluoghi e verifiche in cantiere.",
      "Gestione verbali e coordinamento con imprese.",
      "Supporto a aggiornamenti e integrazioni documentali.",
    ],
    ctaTitle: "Vuoi valutare un progetto simile?",
    ctaText:
      "Possiamo supportarti come CSP/CSE o nella predisposizione della documentazione sicurezza per cantieri e opere complesse.",
    imagesCount: 3,
  },
  {
    slug: "sicurezza-impianti",
    title: "DVR e procedure per impianto trattamento",
    category: "Sicurezza",
    location: "Treviso (TV)",
    client: "Gestore Impianto",
    overview:
      "Redazione DVR e procedure operative per impianto di trattamento, con approccio pratico e orientato alla prevenzione.",
    activities: [
      "Sopralluoghi e analisi rischi.",
      "Redazione/aggiornamento DVR e procedure.",
      "Supporto a misure di prevenzione e formazione operativa.",
      "Allineamento documentale e gestione evidenze.",
    ],
    ctaTitle: "Vuoi valutare un progetto simile?",
    ctaText:
      "Ti aiutiamo a impostare DVR e procedure in modo chiaro e applicabile, con attenzione a ruoli e responsabilità.",
    imagesCount: 3,
  },

  // --- BANDI E FINANZIAMENTI ---
  {
    slug: "bandi-psr",
    title: "Domanda PSR — efficienza irrigua",
    category: "Bandi e Finanziamenti",
    location: "Padova (PD)",
    client: "PMI Agroalimentare",
    overview:
      "Gestione della domanda PSR: impostazione documentale, allegati tecnici e coordinamento con requisiti di misura.",
    activities: [
      "Scouting e verifica requisiti di accesso.",
      "Raccolta documenti e predisposizione allegati.",
      "Compilazione piattaforme e invio domanda.",
      "Supporto in integrazioni e rendicontazione (se prevista).",
    ],
    ctaTitle: "Vuoi valutare un progetto simile?",
    ctaText:
      "Possiamo verificare ammissibilità, impostare correttamente la domanda e ridurre il rischio di esclusioni o tagli.",
    imagesCount: 3,
  },
  {
    slug: "bandi-pnrr",
    title: "PNRR: efficientamento linee produttive",
    category: "Bandi e Finanziamenti",
    location: "Venezia (VE)",
    client: "PMI Manifatturiera",
    overview:
      "Supporto a finanza agevolata PNRR: definizione dossier, allegati tecnici e coordinamento dell’iter.",
    activities: [
      "Analisi misura e requisiti PNRR.",
      "Predisposizione dossier e documenti di progetto.",
      "Supporto a caricamento su portali e invio.",
      "Monitoraggio scadenze e supporto a integrazioni.",
    ],
    ctaTitle: "Vuoi valutare un progetto simile?",
    ctaText:
      "Possiamo affiancarti nella preparazione della pratica e nel coordinamento dei contenuti tecnici richiesti.",
    imagesCount: 3,
  },

  // --- EDILIZIA E INFRASTRUTTURE ---
  {
    slug: "edilizia-permesso-costruire",
    title: "Permesso di costruire per nuovo edificio produttivo",
    category: "Edilizia e Infrastrutture",
    location: "Vicenza (VI)",
    client: "Impresa Edile",
    overview:
      "Gestione dell’iter per permesso di costruire: inquadramento urbanistico e predisposizione elaborati e integrazioni.",
    activities: [
      "Verifica vincoli e inquadramento urbanistico.",
      "Supporto a predisposizione elaborati e relazioni.",
      "Interfaccia con uffici tecnici e gestione integrazioni.",
      "Coordinamento scadenze e conformità documentale.",
    ],
    ctaTitle: "Vuoi valutare un progetto simile?",
    ctaText:
      "Se devi avviare un iter edilizio, possiamo aiutarti a impostare documentazione e percorso autorizzativo.",
    imagesCount: 3,
  },
  {
    slug: "edilizia-riqualificazione-strutturale",
    title: "Riqualificazione strutturale e sismica complesso esistente",
    category: "Edilizia e Infrastrutture",
    location: "Padova (PD)",
    client: "Soggetto Privato",
    overview:
      "Supporto tecnico per riqualificazione strutturale e sismica: analisi, coordinamento e gestione elaborati.",
    activities: [
      "Rilievi e analisi preliminari.",
      "Impostazione interventi e fasi di progetto.",
      "Predisposizione relazioni tecniche e documenti.",
      "Coordinamento con figure specialistiche e cantiere.",
    ],
    ctaTitle: "Vuoi valutare un progetto simile?",
    ctaText:
      "Possiamo affiancarti nella definizione dell’intervento e nella gestione tecnica e documentale dei passaggi chiave.",
    imagesCount: 3,
  },

  // --- GESTIONALI ---
  {
    slug: "gestionale-crm-bandi",
    title: "Implementazione CRM interno per gestione bandi",
    category: "Gestionali",
    location: "Padova (PD)",
    client: "Polinex (uso interno)",
    overview:
      "Implementazione di un CRM interno per tracciare opportunità, scadenze e stato delle pratiche legate a bandi e finanziamenti.",
    activities: [
      "Analisi processo interno e requisiti.",
      "Configurazione pipeline, stati e campi.",
      "Impostazione report e dashboard operative.",
      "Formazione interna e miglioramenti iterativi.",
    ],
    ctaTitle: "Vuoi valutare un progetto simile?",
    ctaText:
      "Se vuoi digitalizzare processi e scadenze, possiamo progettare un gestionale su misura o integrare strumenti esistenti.",
    imagesCount: 3,
  },
  {
    slug: "gestionale-reportistica-kpi",
    title: "Sistema di reportistica KPI tecnico-amministrativi",
    category: "Gestionali",
    location: "Treviso (TV)",
    client: "Multi-utility locale",
    overview:
      "Realizzazione di un sistema di reportistica KPI per monitorare attività tecnico-amministrative e avanzamento pratiche.",
    activities: [
      "Definizione KPI e fonti dati.",
      "Impostazione modello dati e flussi.",
      "Dashboard e report periodici.",
      "Allineamento con stakeholder e miglioramenti.",
    ],
    ctaTitle: "Vuoi valutare un progetto simile?",
    ctaText:
      "Possiamo aiutarti a strutturare KPI e report utili alle decisioni, con dati affidabili e aggiornati.",
    imagesCount: 3,
  },
];
