// app/chi-siamo/_data.ts

export type TeamMember = {
  name: string;
  role: string;
  image: string;      // path immagine profilo (in /public)
  phone?: string;
  email?: string;
  linkedin?: string;
  cvPdf?: string;     // path CV PDF (in /public)
};

export const TEAM: TeamMember[] = [
  {
    name: "Luigi Bianchi",
    role: "CEO / Ingegnere Civile",
    image: "/chi-siamo/foto-profilo/luigi.jpg",
    phone: "+39 342 3396219",
    email: "luigi.bianchi@polinex.it",
    linkedin: "https://www.linkedin.com/in/luigi-bianchi",
    cvPdf: "/chi-siamo/cv/luigi-bianchi.pdf",
  },
  {
    name: "Giulia Verdi",
    role: "Ingegnere Energetico",
    image: "/chi-siamo/foto-profilo/giulia.jpg",
    phone: "+39 333 1111111",
    email: "giulia.verdi@polinex.it",
    linkedin: "https://www.linkedin.com/in/giulia-verdi",
    cvPdf: "/chi-siamo/cv/giulia-verdi.pdf",
  },
  {
    name: "Luca Bianchi",
    role: "Ingegnere Informatico",
    image: "/chi-siamo/foto-profilo/luca.jpg",
    phone: "+39 333 2222222",
    email: "luca.bianchi@polinex.it",
    linkedin: "https://www.linkedin.com/in/luca-bianchi",
    cvPdf: "/chi-siamo/cv/luca-bianchi.pdf",
  },
];
