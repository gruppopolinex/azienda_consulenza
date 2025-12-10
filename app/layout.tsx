import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Polinex — Consulenza Tecnica per Acqua, Ambiente, Energia e Sicurezza",
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
      <head>
        {/* Cookiebot: blocco cookie preventivo GDPR */}
        <Script
          id="cookiebot-loader"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="f63fe291-4351-4739-a3bd-de762b102ba9"
          data-blockingmode="auto"
          strategy="beforeInteractive"
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
