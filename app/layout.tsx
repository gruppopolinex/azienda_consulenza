// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 🔹 NIENTE più Script qui, lo gestiamo nel componente client Cookiebot
import Cookiebot from "./components/Cookiebot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Polinex — Consulenza Tecnica per Acqua, Ambiente, Energia e Sicurezza",
  description:
    "Polinex offre consulenza tecnica professionale per imprese e pubbliche amministrazioni nelle aree acqua, ambiente, energia, edilizia, sicurezza e finanziamenti.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <head>{/* Meta, title ecc. sono gestiti da `metadata` */}</head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Cookiebot viene caricato lato client, dopo l'hydration */}
        <Cookiebot />
        {children}
      </body>
    </html>
  );
}
