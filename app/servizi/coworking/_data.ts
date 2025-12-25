// app/servizi/coworking/_data.ts

/* ==================== TIPI BASE ==================== */

export type City =
  | "Venezia"
  | "Roma"
  | "Napoli"
  | "Milano"
  | "Torino"
  | "Padova"
  | "Verona"
  | "Firenze"
  | "Bari"
  | "Genova"
  | "Bologna"
  | "Ferrara"
  | "Vicenza";

export type SpaceType =
  | "Postazione coworking"
  | "Ufficio privato"
  | "Sala riunioni";

export type BookingMode = "hourly" | "request" | "both";

/* ==================== BOOKING ==================== */

export type BookingDay = {
  date: string; // YYYY-MM-DD
  available: boolean;
};

export type BookingTimeSlot = {
  id: string;
  label: string;
  available: boolean;
};

export type BookingConfig = {
  days: BookingDay[];
  timeSlots: BookingTimeSlot[];
};

/* ==================== SPAZI ==================== */

export type SpacePricing = {
  hourly?: number;
  daily?: number;
  monthlyFrom?: number;
};

export type LocationSpace = {
  slug: string; // /servizi/coworking/[locationslug]/[spaceslug]
  type: SpaceType;
  label: string;
  capacity: string;

  bookingMode: BookingMode;

  /** Etichetta prezzo (fallback UI) */
  price?: string;

  /** Prezzi strutturati */
  pricing?: SpacePricing;

  /** Usato nella card della sede */
  minHourlyPrice?: number;

  images: string[];

  description?: string;
  features?: string[];

  /** Booking specifico (override sede) */
  booking?: BookingConfig;
};

/* ==================== CLIENTI ==================== */

export type RegularClient = {
  name: string;
  logoSrc: string;
  href?: string;
};

/* ==================== CTA ==================== */

export type LocationCTA = {
  title: string;
  description: string;
  buttonLabel: string;
  href: string;
};

/* ==================== SEDE ==================== */

export type Location = {
  slug: string;
  city: City;
  name: string;
  address: string;
  description: string;
  image: string;
  tags: string[];

  spaces: LocationSpace[];

  booking: BookingConfig;

  videoUrl?: string;
  mapUrl?: string;
  services?: string[];
  phone?: string;
  email?: string;

  regularClients?: RegularClient[];
  cta?: LocationCTA;
};

/* ==================== COSTANTI ==================== */

export const CITIES: City[] = [
  "Venezia",
  "Roma",
  "Napoli",
  "Milano",
  "Torino",
  "Padova",
  "Verona",
  "Firenze",
  "Bari",
  "Genova",
  "Bologna",
  "Ferrara",
  "Vicenza",
];

export const SPACE_TYPES: SpaceType[] = [
  "Postazione coworking",
  "Ufficio privato",
  "Sala riunioni",
];

/* ==================== HELPERS ==================== */

/** Booking “base” riutilizzabile (override possibile su spazio o sede). */
const BASE_TIME_SLOTS: BookingTimeSlot[] = [
  { id: "morning", label: "09:00–13:00", available: true },
  { id: "afternoon", label: "14:00–18:00", available: true },
  { id: "full-day", label: "09:00–18:00", available: true },
];

/** Giorni demo (puoi sostituire con dati reali). */
const BASE_DAYS: BookingDay[] = [
  { date: "2025-01-15", available: true },
  { date: "2025-01-16", available: false },
  { date: "2025-01-17", available: true },
  { date: "2025-01-18", available: true },
  { date: "2025-01-19", available: true },
];

const baseBooking = (opts?: {
  dayIndexes?: number[]; // quali giorni includere da BASE_DAYS
  slotIds?: Array<BookingTimeSlot["id"]>;
}): BookingConfig => {
  const days =
    opts?.dayIndexes?.length
      ? opts.dayIndexes.map((i) => BASE_DAYS[i]).filter(Boolean)
      : BASE_DAYS.slice(0, 3);

  const timeSlots =
    opts?.slotIds?.length
      ? BASE_TIME_SLOTS.filter((s) => opts.slotIds!.includes(s.id))
      : [
          BASE_TIME_SLOTS[0], // morning
          BASE_TIME_SLOTS[1], // afternoon
        ];

  return { days, timeSlots };
};

const defaultCTA: LocationCTA = {
  title: "Vuoi maggiori informazioni su questa sede?",
  description:
    "Contattaci per verificare disponibilità, organizzare una visita o ricevere un preventivo.",
  buttonLabel: "Contattaci",
  href: "/contatti",
};

/* ==================== DATI ==================== */

export const LOCATIONS: Location[] = [
  /* ======================================================
     VENEZIA
  ====================================================== */
  {
    slug: "venezia",
    city: "Venezia",
    name: "Polinex – Venezia",
    address: "Fondamenta Esempio 12, 30100 Venezia (VE)",
    image: "/coworking/venezia/hero.jpg",
    description:
      "Spazio affacciato sull’acqua, ideale per incontri con clienti e giornate di lavoro concentrate.",
    tags: ["Vicinanza stazione", "Sala riunioni", "Spazio eventi"],

    spaces: [
      {
        slug: "open-space-vista-canale",
        type: "Postazione coworking",
        label: "Open space vista canale",
        capacity: "Fino a 8 postazioni",
        bookingMode: "hourly",
        price: "Da € 15 / ora",
        minHourlyPrice: 15,
        pricing: { hourly: 15 },
        images: [
          "/coworking/venezia/open-space/1.jpg",
          "/coworking/venezia/open-space/2.jpg",
          "/coworking/venezia/open-space/3.jpg",
        ],
        features: ["Wi-Fi", "Coffee corner", "Luce naturale"],
      },
      {
        slug: "ufficio-privato-2-3",
        type: "Ufficio privato",
        label: "Ufficio 2–3 persone",
        capacity: "Team ridotti",
        bookingMode: "both",
        price: "Da € 25 / ora · locazione su richiesta",
        minHourlyPrice: 25,
        pricing: { hourly: 25, monthlyFrom: 850 },
        images: [
          "/coworking/venezia/ufficio-privato/1.jpg",
          "/coworking/venezia/ufficio-privato/2.jpg",
        ],
      },
      {
        slug: "sala-riunioni-laguna",
        type: "Sala riunioni",
        label: "Sala riunioni “Laguna”",
        capacity: "Fino a 10 persone",
        bookingMode: "hourly",
        price: "€ 35 / ora",
        minHourlyPrice: 35,
        pricing: { hourly: 35 },
        images: [
          "/coworking/venezia/sala-laguna/1.jpg",
          "/coworking/venezia/sala-laguna/2.jpg",
        ],
      },
    ],

    booking: baseBooking({
      dayIndexes: [0, 1, 2],
      slotIds: ["morning", "afternoon"],
    }),

    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_VENEZIA",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Fondamenta+Esempio+12,+Venezia",
    phone: "+39 041 0000000",
    email: "venezia@polinex.it",

    services: ["Reception", "Supporto meeting", "Wi-Fi fibra"],

    regularClients: [
      { name: "Cliente A", logoSrc: "/clients/cliente-a.svg" },
      {
        name: "Cliente B",
        logoSrc: "/clients/cliente-b.svg",
        href: "https://cliente-b.it",
      },
    ],

    cta: defaultCTA,
  },

  /* ======================================================
     ROMA
  ====================================================== */
  {
    slug: "roma",
    city: "Roma",
    name: "Polinex – Roma",
    address: "Via Progetti 88, 00100 Roma (RM)",
    image: "/coworking/roma/hero.jpg",
    description: "Spazio dedicato a incontri istituzionali e tavoli tecnici.",
    tags: ["PA", "Workshop", "Terrazza"],

    spaces: [
      {
        slug: "sala-fori",
        type: "Sala riunioni",
        label: "Sala riunioni “Fori”",
        capacity: "Fino a 14 persone",
        bookingMode: "hourly",
        minHourlyPrice: 45,
        pricing: { hourly: 45 },
        images: [
          "/coworking/roma/sala-fori/1.jpg",
          "/coworking/roma/sala-fori/2.jpg",
        ],
      },
      {
        slug: "coworking-centrale",
        type: "Postazione coworking",
        label: "Coworking centrale",
        capacity: "Fino a 12 postazioni",
        bookingMode: "hourly",
        minHourlyPrice: 17,
        pricing: { hourly: 17 },
        images: [
          "/coworking/roma/coworking-centrale/1.jpg",
          "/coworking/roma/coworking-centrale/2.jpg",
        ],
      },
    ],

    booking: baseBooking({
      dayIndexes: [3, 2, 0],
      slotIds: ["morning", "full-day"],
    }),

    email: "roma@polinex.it",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Via+Progetti+88,+Roma",
    services: ["Reception", "Sale meeting", "Wi-Fi fibra"],
    cta: defaultCTA,
  },

  /* ======================================================
     NAPOLI
  ====================================================== */
  {
    slug: "napoli",
    city: "Napoli",
    name: "Polinex – Napoli",
    address: "Via Mare 7, 80100 Napoli (NA)",
    image: "/coworking/napoli/hero.jpg",
    description:
      "Ambiente informale per riunioni, formazione e lavoro in team.",
    tags: ["Vista mare", "Formazione"],

    spaces: [
      {
        slug: "coworking-panoramico",
        type: "Postazione coworking",
        label: "Coworking panoramico",
        capacity: "Fino a 12 postazioni",
        bookingMode: "hourly",
        minHourlyPrice: 14,
        pricing: { hourly: 14 },
        images: [
          "/coworking/napoli/coworking-panoramico/1.jpg",
          "/coworking/napoli/coworking-panoramico/2.jpg",
        ],
      },
      {
        slug: "sala-partenope",
        type: "Sala riunioni",
        label: "Sala riunioni “Partenope”",
        capacity: "Fino a 10 persone",
        bookingMode: "hourly",
        minHourlyPrice: 32,
        pricing: { hourly: 32 },
        images: [
          "/coworking/napoli/sala-partenope/1.jpg",
          "/coworking/napoli/sala-partenope/2.jpg",
        ],
      },
    ],

    booking: baseBooking({
      dayIndexes: [4, 3, 2],
      slotIds: ["afternoon", "full-day"],
    }),

    email: "napoli@polinex.it",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Via+Mare+7,+Napoli",
    services: ["Area relax", "Supporto eventi", "Wi-Fi fibra"],
    cta: defaultCTA,
  },

  /* ======================================================
     MILANO
  ====================================================== */
  {
    slug: "milano",
    city: "Milano",
    name: "Polinex – Milano",
    address: "Via Innovazione 45, 20100 Milano (MI)",
    image: "/coworking/milano/hero.jpg",
    description:
      "Hub per incontri con clienti corporate e sessioni di lavoro su progetti complessi.",
    tags: ["Metro", "Spazi modulari", "Fibra dedicata"],

    spaces: [
      {
        slug: "coworking-open",
        type: "Postazione coworking",
        label: "Area coworking open",
        capacity: "Fino a 16 postazioni",
        bookingMode: "hourly",
        minHourlyPrice: 18,
        pricing: { hourly: 18 },
        images: [
          "/coworking/milano/coworking-open/1.jpg",
          "/coworking/milano/coworking-open/2.jpg",
        ],
      },
      {
        slug: "ufficio-team",
        type: "Ufficio privato",
        label: "Ufficio 4–6 persone",
        capacity: "Project team",
        bookingMode: "request",
        price: "Locazione su richiesta",
        pricing: { monthlyFrom: 1400 },
        images: [
          "/coworking/milano/ufficio-team/1.jpg",
          "/coworking/milano/ufficio-team/2.jpg",
        ],
      },
      {
        slug: "sala-board",
        type: "Sala riunioni",
        label: "Sala board",
        capacity: "Fino a 12 persone",
        bookingMode: "hourly",
        minHourlyPrice: 40,
        pricing: { hourly: 40 },
        images: [
          "/coworking/milano/sala-board/1.jpg",
          "/coworking/milano/sala-board/2.jpg",
        ],
      },
    ],

    booking: baseBooking({ dayIndexes: [1, 2, 3], slotIds: ["full-day"] }),

    email: "milano@polinex.it",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Via+Innovazione+45,+Milano",
    services: ["Reception", "Fibra dedicata", "Supporto IT"],
    cta: defaultCTA,
  },

  /* ======================================================
     TORINO
  ====================================================== */
  {
    slug: "torino",
    city: "Torino",
    name: "Polinex – Torino",
    address: "Corso Esempio 21, 10100 Torino (TO)",
    image: "/coworking/torino/hero.jpg",
    description:
      "Spazi funzionali per team e consulenti, in un’area ben collegata.",
    tags: ["Ben collegato", "Team room", "Silenzioso"],

    spaces: [
      {
        slug: "coworking-light",
        type: "Postazione coworking",
        label: "Coworking light",
        capacity: "Fino a 10 postazioni",
        bookingMode: "hourly",
        minHourlyPrice: 13,
        pricing: { hourly: 13 },
        images: [
          "/coworking/torino/coworking-light/1.jpg",
          "/coworking/torino/coworking-light/2.jpg",
        ],
      },
      {
        slug: "ufficio-privato-3-4",
        type: "Ufficio privato",
        label: "Ufficio 3–4 persone",
        capacity: "Team piccoli",
        bookingMode: "both",
        minHourlyPrice: 22,
        pricing: { hourly: 22, monthlyFrom: 980 },
        images: [
          "/coworking/torino/ufficio-privato/1.jpg",
          "/coworking/torino/ufficio-privato/2.jpg",
        ],
      },
    ],

    booking: baseBooking({
      dayIndexes: [2, 3, 4],
      slotIds: ["morning", "afternoon"],
    }),

    email: "torino@polinex.it",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Corso+Esempio+21,+Torino",
    services: ["Reception", "Phone booth", "Wi-Fi fibra"],
    cta: defaultCTA,
  },

  /* ======================================================
     PADOVA
  ====================================================== */
  {
    slug: "padova",
    city: "Padova",
    name: "Polinex – Padova",
    address: "Via Università 10, 35100 Padova (PD)",
    image: "/coworking/padova/hero.jpg",
    description: "Sede ideale per studio, ricerca e lavoro concentrato.",
    tags: ["Università", "Quiet zone", "Meeting"],

    spaces: [
      {
        slug: "open-space-studio",
        type: "Postazione coworking",
        label: "Open space studio",
        capacity: "Fino a 14 postazioni",
        bookingMode: "hourly",
        minHourlyPrice: 12,
        pricing: { hourly: 12 },
        images: [
          "/coworking/padova/open-space/1.jpg",
          "/coworking/padova/open-space/2.jpg",
        ],
      },
      {
        slug: "sala-galileo",
        type: "Sala riunioni",
        label: "Sala riunioni “Galileo”",
        capacity: "Fino a 8 persone",
        bookingMode: "hourly",
        minHourlyPrice: 28,
        pricing: { hourly: 28 },
        images: [
          "/coworking/padova/sala-galileo/1.jpg",
          "/coworking/padova/sala-galileo/2.jpg",
        ],
      },
    ],

    booking: baseBooking({
      dayIndexes: [0, 2, 4],
      slotIds: ["morning", "full-day"],
    }),

    email: "padova@polinex.it",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Via+Universit%C3%A0+10,+Padova",
    services: ["Quiet zone", "Stampante", "Wi-Fi fibra"],
    cta: defaultCTA,
  },

  /* ======================================================
     VERONA
  ====================================================== */
  {
    slug: "verona",
    city: "Verona",
    name: "Polinex – Verona",
    address: "Via Arena 3, 37100 Verona (VR)",
    image: "/coworking/verona/hero.jpg",
    description:
      "Spazio accogliente per incontri e giornate operative in centro.",
    tags: ["Centro", "Riunioni", "Accogliente"],

    spaces: [
      {
        slug: "coworking-centro",
        type: "Postazione coworking",
        label: "Coworking in centro",
        capacity: "Fino a 10 postazioni",
        bookingMode: "hourly",
        minHourlyPrice: 13,
        pricing: { hourly: 13 },
        images: [
          "/coworking/verona/coworking-centro/1.jpg",
          "/coworking/verona/coworking-centro/2.jpg",
        ],
      },
      {
        slug: "sala-scaligera",
        type: "Sala riunioni",
        label: "Sala riunioni “Scaligera”",
        capacity: "Fino a 10 persone",
        bookingMode: "hourly",
        minHourlyPrice: 30,
        pricing: { hourly: 30 },
        images: [
          "/coworking/verona/sala-scaligera/1.jpg",
          "/coworking/verona/sala-scaligera/2.jpg",
        ],
      },
    ],

    booking: baseBooking({
      dayIndexes: [1, 3, 4],
      slotIds: ["afternoon", "full-day"],
    }),

    email: "verona@polinex.it",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Via+Arena+3,+Verona",
    services: ["Reception", "Coffee corner", "Wi-Fi fibra"],
    cta: defaultCTA,
  },

  /* ======================================================
     FIRENZE
  ====================================================== */
  {
    slug: "firenze",
    city: "Firenze",
    name: "Polinex – Firenze",
    address: "Via Rinascimento 9, 50100 Firenze (FI)",
    image: "/coworking/firenze/hero.jpg",
    description:
      "Spazio curato per creativi, consulenti e meeting con clienti.",
    tags: ["Creatività", "Workshop", "Luce naturale"],

    spaces: [
      {
        slug: "open-space-atelier",
        type: "Postazione coworking",
        label: "Open space “Atelier”",
        capacity: "Fino a 12 postazioni",
        bookingMode: "hourly",
        minHourlyPrice: 14,
        pricing: { hourly: 14 },
        images: [
          "/coworking/firenze/open-space/1.jpg",
          "/coworking/firenze/open-space/2.jpg",
        ],
      },
      {
        slug: "ufficio-privato-2",
        type: "Ufficio privato",
        label: "Ufficio 2 persone",
        capacity: "Coppie/partner",
        bookingMode: "both",
        minHourlyPrice: 24,
        pricing: { hourly: 24, monthlyFrom: 920 },
        images: [
          "/coworking/firenze/ufficio-privato/1.jpg",
          "/coworking/firenze/ufficio-privato/2.jpg",
        ],
      },
    ],

    booking: baseBooking({
      dayIndexes: [0, 3, 4],
      slotIds: ["morning", "afternoon"],
    }),

    email: "firenze@polinex.it",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Via+Rinascimento+9,+Firenze",
    services: ["Eventi", "Supporto workshop", "Wi-Fi fibra"],
    cta: defaultCTA,
  },

  /* ======================================================
     BARI
  ====================================================== */
  {
    slug: "bari",
    city: "Bari",
    name: "Polinex – Bari",
    address: "Via Levante 18, 70100 Bari (BA)",
    image: "/coworking/bari/hero.jpg",
    description: "Sede luminosa per lavoro in team e riunioni operative.",
    tags: ["Spazi ampi", "Meeting", "Facile parcheggio"],

    spaces: [
      {
        slug: "coworking-sud",
        type: "Postazione coworking",
        label: "Coworking “Sud”",
        capacity: "Fino a 14 postazioni",
        bookingMode: "hourly",
        minHourlyPrice: 12,
        pricing: { hourly: 12 },
        images: [
          "/coworking/bari/coworking-sud/1.jpg",
          "/coworking/bari/coworking-sud/2.jpg",
        ],
      },
      {
        slug: "sala-adriatico",
        type: "Sala riunioni",
        label: "Sala riunioni “Adriatico”",
        capacity: "Fino a 12 persone",
        bookingMode: "hourly",
        minHourlyPrice: 29,
        pricing: { hourly: 29 },
        images: [
          "/coworking/bari/sala-adriatico/1.jpg",
          "/coworking/bari/sala-adriatico/2.jpg",
        ],
      },
    ],

    booking: baseBooking({ dayIndexes: [2, 3, 1], slotIds: ["full-day"] }),

    email: "bari@polinex.it",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Via+Levante+18,+Bari",
    services: ["Reception", "Sale meeting", "Wi-Fi fibra"],
    cta: defaultCTA,
  },

  /* ======================================================
     GENOVA
  ====================================================== */
  {
    slug: "genova",
    city: "Genova",
    name: "Polinex – Genova",
    address: "Via Porto 5, 16100 Genova (GE)",
    image: "/coworking/genova/hero.jpg",
    description:
      "Ambiente pratico per professionisti e riunioni vicino al porto.",
    tags: ["Porto", "Business", "Riunioni"],

    spaces: [
      {
        slug: "coworking-porta",
        type: "Postazione coworking",
        label: "Coworking “Porta”",
        capacity: "Fino a 10 postazioni",
        bookingMode: "hourly",
        minHourlyPrice: 13,
        pricing: { hourly: 13 },
        images: [
          "/coworking/genova/coworking-porta/1.jpg",
          "/coworking/genova/coworking-porta/2.jpg",
        ],
      },
      {
        slug: "ufficio-privato-4",
        type: "Ufficio privato",
        label: "Ufficio 4 persone",
        capacity: "Team",
        bookingMode: "request",
        price: "Locazione su richiesta",
        pricing: { monthlyFrom: 1100 },
        images: [
          "/coworking/genova/ufficio-privato/1.jpg",
          "/coworking/genova/ufficio-privato/2.jpg",
        ],
      },
    ],

    booking: baseBooking({
      dayIndexes: [0, 1, 2],
      slotIds: ["morning", "afternoon"],
    }),

    email: "genova@polinex.it",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Via+Porto+5,+Genova",
    services: ["Reception", "Area relax", "Wi-Fi fibra"],
    cta: defaultCTA,
  },

  /* ======================================================
     BOLOGNA
  ====================================================== */
  {
    slug: "bologna",
    city: "Bologna",
    name: "Polinex – Bologna",
    address: "Via Portici 27, 40100 Bologna (BO)",
    image: "/coworking/bologna/hero.jpg",
    description: "Sede comoda per workshop, formazione e lavoro in gruppo.",
    tags: ["Workshop", "Formazione", "Centrale"],

    spaces: [
      {
        slug: "coworking-portici",
        type: "Postazione coworking",
        label: "Coworking ai portici",
        capacity: "Fino a 16 postazioni",
        bookingMode: "hourly",
        minHourlyPrice: 14,
        pricing: { hourly: 14 },
        images: [
          "/coworking/bologna/coworking-portici/1.jpg",
          "/coworking/bologna/coworking-portici/2.jpg",
        ],
      },
      {
        slug: "sala-due-torri",
        type: "Sala riunioni",
        label: "Sala riunioni “Due Torri”",
        capacity: "Fino a 14 persone",
        bookingMode: "hourly",
        minHourlyPrice: 34,
        pricing: { hourly: 34 },
        images: [
          "/coworking/bologna/sala-due-torri/1.jpg",
          "/coworking/bologna/sala-due-torri/2.jpg",
        ],
      },
    ],

    booking: baseBooking({
      dayIndexes: [3, 2, 1],
      slotIds: ["morning", "full-day"],
    }),

    email: "bologna@polinex.it",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Via+Portici+27,+Bologna",
    services: ["Reception", "Aule formazione", "Wi-Fi fibra"],
    cta: defaultCTA,
  },

  /* ======================================================
     FERRARA
  ====================================================== */
  {
    slug: "ferrara",
    city: "Ferrara",
    name: "Polinex – Ferrara",
    address: "Via Castello 2, 44100 Ferrara (FE)",
    image: "/coworking/ferrara/hero.jpg",
    description: "Sede raccolta e tranquilla per consulenti e piccoli team.",
    tags: ["Tranquillo", "Centro", "Meeting"],

    spaces: [
      {
        slug: "coworking-castello",
        type: "Postazione coworking",
        label: "Coworking “Castello”",
        capacity: "Fino a 8 postazioni",
        bookingMode: "hourly",
        minHourlyPrice: 11,
        pricing: { hourly: 11 },
        images: [
          "/coworking/ferrara/coworking-castello/1.jpg",
          "/coworking/ferrara/coworking-castello/2.jpg",
        ],
      },
      {
        slug: "sala-este",
        type: "Sala riunioni",
        label: "Sala riunioni “Este”",
        capacity: "Fino a 8 persone",
        bookingMode: "hourly",
        minHourlyPrice: 26,
        pricing: { hourly: 26 },
        images: [
          "/coworking/ferrara/sala-este/1.jpg",
          "/coworking/ferrara/sala-este/2.jpg",
        ],
      },
    ],

    booking: baseBooking({
      dayIndexes: [0, 2, 3],
      slotIds: ["afternoon", "full-day"],
    }),

    email: "ferrara@polinex.it",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Via+Castello+2,+Ferrara",
    services: ["Coffee corner", "Stampante", "Wi-Fi fibra"],
    cta: defaultCTA,
  },

  /* ======================================================
     VICENZA
  ====================================================== */
  {
    slug: "vicenza",
    city: "Vicenza",
    name: "Polinex – Vicenza",
    address: "Via Palladio 6, 36100 Vicenza (VI)",
    image: "/coworking/vicenza/hero.jpg",
    description:
      "Spazio elegante per meeting e giornate operative ben organizzate.",
    tags: ["Elegante", "Meeting", "Business"],

    spaces: [
      {
        slug: "coworking-palladio",
        type: "Postazione coworking",
        label: "Coworking “Palladio”",
        capacity: "Fino a 10 postazioni",
        bookingMode: "hourly",
        minHourlyPrice: 12,
        pricing: { hourly: 12 },
        images: [
          "/coworking/vicenza/coworking-palladio/1.jpg",
          "/coworking/vicenza/coworking-palladio/2.jpg",
        ],
      },
      {
        slug: "ufficio-privato-2",
        type: "Ufficio privato",
        label: "Ufficio 2 persone",
        capacity: "Duo",
        bookingMode: "both",
        minHourlyPrice: 21,
        pricing: { hourly: 21, monthlyFrom: 780 },
        images: [
          "/coworking/vicenza/ufficio-privato/1.jpg",
          "/coworking/vicenza/ufficio-privato/2.jpg",
        ],
      },
    ],

    booking: baseBooking({
      dayIndexes: [1, 2, 4],
      slotIds: ["morning", "afternoon"],
    }),

    email: "vicenza@polinex.it",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Via+Palladio+6,+Vicenza",
    services: ["Reception", "Phone booth", "Wi-Fi fibra"],
    cta: defaultCTA,
  },
];
