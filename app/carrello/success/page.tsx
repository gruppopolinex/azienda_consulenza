// app/carrello/success/page.tsx
import { Suspense } from "react";
import SuccessClient from "./success-client";

export default function CarrelloSuccessPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-2xl px-4 py-12">Caricamento…</div>}>
      <SuccessClient />
    </Suspense>
  );
}
