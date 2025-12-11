// app/coworking/_data.ts

export type City = "Venezia" | "Milano" | "Roma" | "Napoli";

export type SpaceType =
  | "Postazione coworking"
  | "Ufficio privato"
  | "Sala riunioni";

export type LocationSpace = {
  type: SpaceType;
  label: string;
  capacity: string;
  /**
   * Percorsi immagini per il carosello "Guarda foto" di ogni tipologia di spazio.
   * (Sostituisci i path con quelli reali presenti nel tuo progetto)
   */
  images: string[];
};

export type BookingDay = {
  /** Data in formato ISO (YYYY-MM-DD) */
  date: string;
  /** true = prenotabile, false = non disponibile (sfumata) */
  available: boolean;
};

export type BookingTimeSlot = {
  /** ID interno per il time-slot */
  id: string;
  /** Etichetta mostrata all’utente, es. "09:00–13:00" */
  label: string;
  /** true = prenotabile, false = non disponibile (sfumato) */
  available: boolean;
};

export type BookingConfig = {
  days: BookingDay[];
  timeSlots: BookingTimeSlot[];
};

export type Location = {
  slug: string; // usato da /coworking/[slug]
  city: City;
  name: string;
  address: string;
  description: string;
  image: string;
  tags: string[];
  spaces: LocationSpace[];

  /** Configurazione disponibilità stile Booking (date e fasce orarie) */
  booking: BookingConfig;

  // Campi opzionali (usati nella pagina slug)
  videoUrl?: string;
  mapUrl?: string;
  services?: string[];
  phone?: string;
  email?: string;
};

export const CITIES: City[] = ["Venezia", "Milano", "Roma", "Napoli"];

export const SPACE_TYPES: SpaceType[] = [
  "Postazione coworking",
  "Ufficio privato",
  "Sala riunioni",
];

export const LOCATIONS: Location[] = [
  {
    slug: "venezia",
    city: "Venezia",
    name: "Polinex – Venezia",
    address: "Fondamenta Esempio 12, 30100 Venezia (VE)",
    image: "/coworking/venezia.jpg",
    description:
      "Spazio affacciato sull’acqua, ideale per incontri con clienti e giornate di lavoro concentrate.",
    tags: ["Vicinanza stazione", "Sala riunioni 10 pax", "Spazio eventi"],
    spaces: [
      {
        type: "Postazione coworking",
        label: "Open space vista canale",
        capacity: "Fino a 8 postazioni",
        images: [
          "/coworking/venezia/open-space-1.jpg",
          "/coworking/venezia/open-space-2.jpg",
          "/coworking/venezia/open-space-3.jpg",
        ],
      },
      {
        type: "Ufficio privato",
        label: "Ufficio 2–3 persone",
        capacity: "Team ridotti",
        images: [
          "/coworking/venezia/ufficio-privato-1.jpg",
          "/coworking/venezia/ufficio-privato-2.jpg",
        ],
      },
      {
        type: "Sala riunioni",
        label: "Sala riunioni “Laguna”",
        capacity: "Fino a 10 persone",
        images: [
          "/coworking/venezia/sala-laguna-1.jpg",
          "/coworking/venezia/sala-laguna-2.jpg",
        ],
      },
    ],
    booking: {
      // Esempio: alcune date disponibili / non disponibili
      days: [
        { date: "2025-01-15", available: true },
        { date: "2025-01-16", available: false },
        { date: "2025-01-17", available: true },
        { date: "2025-01-18", available: true },
        { date: "2025-01-19", available: false },
      ],
      // Fasce orarie in stile Booking (quelle non disponibili sono disabilitate)
      timeSlots: [
        { id: "morning", label: "09:00–13:00", available: true },
        { id: "afternoon", label: "14:00–18:00", available: true },
        { id: "full-day", label: "09:00–18:00", available: false },
      ],
    },
    // opzionali – li puoi cambiare con i tuoi dati reali
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_VENEZIA",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Fondamenta+Esempio+12,+Venezia",
    services: [
      "Accesso su prenotazione in orario ufficio",
      "Reception condivisa con lo staff Polinex",
      "Supporto base per videoconferenze",
    ],
    phone: "+39 041 0000000",
    email: "venezia@polinex.it",
  },
  {
    slug: "milano",
    city: "Milano",
    name: "Polinex – Milano",
    address: "Via Innovazione 45, 20100 Milano (MI)",
    image: "/coworking/milano.jpg",
    description:
      "Hub per incontri con clienti corporate e sessioni di lavoro su progetti complessi.",
    tags: ["Linea metro", "Spazi modulari", "Fiber-ready"],
    spaces: [
      {
        type: "Postazione coworking",
        label: "Area coworking open",
        capacity: "Fino a 16 postazioni",
        images: [
          "/coworking/milano/coworking-open-1.jpg",
          "/coworking/milano/coworking-open-2.jpg",
        ],
      },
      {
        type: "Ufficio privato",
        label: "Ufficio 4–6 persone",
        capacity: "Project team",
        images: [
          "/coworking/milano/ufficio-team-1.jpg",
          "/coworking/milano/ufficio-team-2.jpg",
        ],
      },
      {
        type: "Sala riunioni",
        label: "Sala riunioni “Scala”",
        capacity: "Fino a 12 persone",
        images: [
          "/coworking/milano/sala-scala-1.jpg",
          "/coworking/milano/sala-scala-2.jpg",
        ],
      },
    ],
    booking: {
      days: [
        { date: "2025-01-15", available: true },
        { date: "2025-01-16", available: true },
        { date: "2025-01-17", available: false },
        { date: "2025-01-18", available: true },
        { date: "2025-01-19", available: true },
      ],
      timeSlots: [
        { id: "morning", label: "09:00–13:00", available: true },
        { id: "afternoon", label: "14:00–18:00", available: false },
        { id: "evening", label: "18:00–21:00", available: true },
      ],
    },
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_MILANO",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Via+Innovazione+45,+Milano",
    services: [
      "Accesso facile con i principali mezzi pubblici",
      "Spazi modulabili per workshop e riunioni",
      "Connessione in fibra dedicata",
    ],
    phone: "+39 02 0000000",
    email: "milano@polinex.it",
  },
  {
    slug: "roma",
    city: "Roma",
    name: "Polinex – Roma",
    address: "Via Progetti 88, 00100 Roma (RM)",
    image: "/coworking/roma.jpg",
    description:
      "Spazio pensato per tavoli tecnici, incontri con PA e sessioni di progettazione condivisa.",
    tags: ["Vicino istituzioni", "Sala workshop", "Terrazza"],
    spaces: [
      {
        type: "Postazione coworking",
        label: "Open space centrale",
        capacity: "Fino a 10 postazioni",
        images: [
          "/coworking/roma/open-space-1.jpg",
          "/coworking/roma/open-space-2.jpg",
        ],
      },
      {
        type: "Ufficio privato",
        label: "Ufficio 3–4 persone",
        capacity: "Team tecnici",
        images: [
          "/coworking/roma/ufficio-tecnici-1.jpg",
          "/coworking/roma/ufficio-tecnici-2.jpg",
        ],
      },
      {
        type: "Sala riunioni",
        label: "Sala riunioni “Fori”",
        capacity: "Fino a 14 persone",
        images: [
          "/coworking/roma/sala-fori-1.jpg",
          "/coworking/roma/sala-fori-2.jpg",
        ],
      },
    ],
    booking: {
      days: [
        { date: "2025-01-15", available: true },
        { date: "2025-01-16", available: true },
        { date: "2025-01-17", available: true },
        { date: "2025-01-18", available: false },
        { date: "2025-01-19", available: true },
      ],
      timeSlots: [
        { id: "morning", label: "09:00–13:00", available: true },
        { id: "afternoon", label: "14:00–18:00", available: true },
        { id: "full-day", label: "09:00–18:00", available: true },
      ],
    },
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_ROMA",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Via+Progetti+88,+Roma",
    services: [
      "Spazio ideale per incontri con PA e enti",
      "Sala workshop attrezzata con schermi",
      "Terrazza utilizzabile per brevi pause",
    ],
    phone: "+39 06 0000000",
    email: "roma@polinex.it",
  },
  {
    slug: "napoli",
    city: "Napoli",
    name: "Polinex – Napoli",
    address: "Via Mare 7, 80100 Napoli (NA)",
    image: "/coworking/napoli.jpg",
    description:
      "Ambiente luminoso e informale per riunioni, formazione e giornate di lavoro in team.",
    tags: ["Vista mare", "Spazio formazione", "Accesso parcheggio"],
    spaces: [
      {
        type: "Postazione coworking",
        label: "Zona coworking panoramica",
        capacity: "Fino a 12 postazioni",
        images: [
          "/coworking/napoli/coworking-panoramico-1.jpg",
          "/coworking/napoli/coworking-panoramico-2.jpg",
        ],
      },
      {
        type: "Ufficio privato",
        label: "Ufficio 2–3 persone",
        capacity: "Focus room",
        images: [
          "/coworking/napoli/ufficio-focus-1.jpg",
          "/coworking/napoli/ufficio-focus-2.jpg",
        ],
      },
      {
        type: "Sala riunioni",
        label: "Sala riunioni “Partenope”",
        capacity: "Fino a 8 persone",
        images: [
          "/coworking/napoli/sala-partenope-1.jpg",
          "/coworking/napoli/sala-partenope-2.jpg",
        ],
      },
    ],
    booking: {
      days: [
        { date: "2025-01-15", available: false },
        { date: "2025-01-16", available: true },
        { date: "2025-01-17", available: true },
        { date: "2025-01-18", available: true },
        { date: "2025-01-19", available: false },
      ],
      timeSlots: [
        { id: "morning", label: "09:00–13:00", available: true },
        { id: "afternoon", label: "14:00–18:00", available: true },
        { id: "evening", label: "18:00–21:00", available: false },
      ],
    },
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_NAPOLI",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Via+Mare+7,+Napoli",
    services: [
      "Ambiente informale per riunioni di team",
      "Spazio formazione con setup flessibile",
      "Accesso comodo al parcheggio",
    ],
    phone: "+39 081 0000000",
    email: "napoli@polinex.it",
  },
];
