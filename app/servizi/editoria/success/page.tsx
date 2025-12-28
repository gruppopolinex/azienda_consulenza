// app/servizi/editoria/success/page.tsx
import { Suspense } from "react";
import SuccessClient from "./SuccessClient";

export const dynamic = "force-dynamic"; // evita prerender/SSG su questa pagina

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-2xl px-4 py-12">
          <h1 className="text-2xl font-semibold">Pagamento completato ✅</h1>
          <p className="mt-2 text-slate-600">Caricamento…</p>
        </div>
      }
    >
      <SuccessClient />
    </Suspense>
  );
}
