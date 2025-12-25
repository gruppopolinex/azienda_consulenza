// app/api/finanziamenti/alert/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type Payload = {
  azienda?: unknown;
  settore?: unknown;
  email?: unknown;
  telefono?: unknown;
  messaggio?: unknown;
  regioniInteresse?: unknown;
  areeInteresse?: unknown;
};

function asString(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
}

function asStringArray(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(asString).filter(Boolean);
  if (typeof v === "string" && v.trim()) return [v.trim()];
  return [];
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email non configurata." },
        { status: 500 }
      );
    }

    // ✅ aggiornato secondo il tuo schema env
    const to = process.env.GRANT_ALERT_TO;
    const from = process.env.GRANT_ALERT_FROM;

    if (!to || !from) {
      return NextResponse.json(
        { error: "Destinatario o mittente non configurati." },
        { status: 500 }
      );
    }

    const body = (await req.json()) as Payload;

    const azienda = asString(body?.azienda);
    const settore = asString(body?.settore);
    const email = asString(body?.email);
    const telefono = asString(body?.telefono);
    const messaggio = asString(body?.messaggio);

    const regioniInteresse = asStringArray(body?.regioniInteresse);
    const areeInteresse = asStringArray(body?.areeInteresse);

    if (!azienda || !email) {
      return NextResponse.json(
        { error: "Compila i campi obbligatori." },
        { status: 400 }
      );
    }

    const resend = new Resend(apiKey);

    const html = `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height:1.5;">
        <h2 style="margin:0 0 12px;">Richiesta alert bandi / finanziamenti</h2>

        <p><strong>Azienda:</strong> ${escapeHtml(azienda)}</p>
        <p><strong>Settore:</strong> ${escapeHtml(settore || "-")}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Telefono:</strong> ${escapeHtml(telefono || "-")}</p>

        <p><strong>Regioni di interesse:</strong><br />
          ${
            regioniInteresse.length
              ? escapeHtml(regioniInteresse.join(", "))
              : "-"
          }
        </p>

        <p><strong>Aree di interesse:</strong><br />
          ${areeInteresse.length ? escapeHtml(areeInteresse.join(", ")) : "-"}
        </p>

        <p><strong>Nota:</strong><br />
          ${escapeHtml(messaggio || "-")}
        </p>

        <hr style="margin:16px 0; border:none; border-top:1px solid #e5e7eb;" />
        <p style="font-size:12px;color:#64748b;margin:0;">
          Inviato dal form /finanziamenti
        </p>
      </div>
    `;

    const { error } = await resend.emails.send({
      from,
      to,
      subject: `Alert bandi – ${azienda}`,
      replyTo: email,
      html,
    });

    if (error) {
      return NextResponse.json(
        { error: "Errore nell’invio email." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Richiesta non valida." },
      { status: 400 }
    );
  }
}
