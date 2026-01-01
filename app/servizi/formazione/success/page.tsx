// app/servizi/formazione/success/page.tsx
import { Suspense } from "react";
import SuccessClient from "./SuccessClient";

export const dynamic = "force-dynamic"; // ✅ evita prerender/SSG su questa pagina

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-2xl px-4 py-12">
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <span>Pagamento completato</span> <span aria-hidden>✅</span>
          </h1>
          <p className="mt-3 text-slate-600">
            Sto preparando i dettagli dell’ordine…
          </p>
        </div>
      }
    >
      <SuccessClient />
    </Suspense>
  );
}
