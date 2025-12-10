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
};

export type Location = {
  slug: string;          // usato da /coworking/[slug]
  city: City;
  name: string;
  address: string;
  description: string;
  image: string;
  tags: string[];
  spaces: LocationSpace[];

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
      },
      {
        type: "Ufficio privato",
        label: "Ufficio 2–3 persone",
        capacity: "Team ridotti",
      },
      {
        type: "Sala riunioni",
        label: "Sala riunioni “Laguna”",
        capacity: "Fino a 10 persone",
      },
    ],
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
      },
      {
        type: "Ufficio privato",
        label: "Ufficio 4–6 persone",
        capacity: "Project team",
      },
      {
        type: "Sala riunioni",
        label: "Sala riunioni “Scala”",
        capacity: "Fino a 12 persone",
      },
    ],
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
      },
      {
        type: "Ufficio privato",
        label: "Ufficio 3–4 persone",
        capacity: "Team tecnici",
      },
      {
        type: "Sala riunioni",
        label: "Sala riunioni “Fori”",
        capacity: "Fino a 14 persone",
      },
    ],
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
      },
      {
        type: "Ufficio privato",
        label: "Ufficio 2–3 persone",
        capacity: "Focus room",
      },
      {
        type: "Sala riunioni",
        label: "Sala riunioni “Partenope”",
        capacity: "Fino a 8 persone",
      },
    ],
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
