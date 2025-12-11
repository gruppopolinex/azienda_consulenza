// app/components/Cookiebot.tsx
"use client";

import Script from "next/script";

export default function Cookiebot() {
  return (
    <Script
      id="cookiebot-loader"
      src="https://consent.cookiebot.com/uc.js"
      data-cbid="f63fe291-4351-4739-a3bd-de762b102ba9" // il tuo ID
      data-blockingmode="auto"
      strategy="afterInteractive" // carica dopo l'hydration
    />
  );
}
