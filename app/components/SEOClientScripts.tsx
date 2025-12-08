// components/SEOClientScripts.tsx
"use client";

import Script from "next/script";
import type { JSX } from "react"; // 👈 aggiunta

const SITE_NAME = "EFABRIS Ingegneria";

export default function SEOClientScripts(): JSX.Element { // 👈 ora il tipo esiste
  return (
    <>
      {/* Cookiebot */}
      {/* ...tutto il tuo contenuto attuale rimane invariato... */}
    </>
  );
}
