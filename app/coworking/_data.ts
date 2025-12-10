// app/coworking/_data.ts

export type City = "Venezia" | "Milano" | "Roma" | "Napoli";

export type SpaceType =
  | "Postazione coworking"
  | "Ufficio privato"
  | "Sala riunioni";

export type Space = {
  type: SpaceType;
  label: string;
  capacity: string;
};

export type Location = {
  slug: string; // usato nella pagina dinamica /coworking/[slug]
  city: City;
  name: string;
  address: string;
  image: string;
  description: string;
  tags: string[];
  spaces: Space[];
};

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
  },
];
