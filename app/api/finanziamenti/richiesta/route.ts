// app/api/finanziamenti/richiesta/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type Payload = {
  grantSlug?: unknown;
  grantTitle?: unknown;
  azienda?: unknown;
  settore?: unknown;
  email?: unknown;
  telefono?: unknown;
  messaggio?: unknown;
};

function asString(v: unknown) {
  return typeof v === "string" ? v.trim() : "";
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
        { error: "Email non configurata (RESEND_API_KEY)." },
        { status: 500 }
      );
    }

    // ✅ aggiornato secondo il tuo schema env (richiesta = risposta consulente)
    const to = process.env.GRANT_REQUEST_TO;
    const from = process.env.GRANT_REQUEST_FROM;

    if (!to) {
      return NextResponse.json(
        { error: "Destinatario non configurato (GRANT_REQUEST_TO)." },
        { status: 500 }
      );
    }
    if (!from) {
      return NextResponse.json(
        { error: "Mittente non configurato (GRANT_REQUEST_FROM)." },
        { status: 500 }
      );
    }

    const body = (await req.json()) as Payload;

    const grantSlug = asString(body.grantSlug);
    const grantTitle = asString(body.grantTitle);

    const azienda = asString(body.azienda);
    const settore = asString(body.settore);
    const email = asString(body.email);
    const telefono = asString(body.telefono);
    const messaggio = asString(body.messaggio);

    if (!azienda) {
      return NextResponse.json(
        { error: "Inserisci la ragione sociale." },
        { status: 400 }
      );
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: "Inserisci un’email valida." },
        { status: 400 }
      );
    }

    const subject = `Richiesta bando: ${grantTitle || grantSlug || "Dettaglio"}`;

    const html = `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height:1.5;">
        <h2 style="margin:0 0 12px;">Richiesta su bando/finanziamento</h2>

        <table style="border-collapse: collapse; width:100%; max-width:720px;">
          <tr>
            <td style="padding:6px 0; width:170px;"><strong>Bando</strong></td>
            <td style="padding:6px 0;">${escapeHtml(grantTitle || "-")}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;"><strong>Slug</strong></td>
            <td style="padding:6px 0;">${escapeHtml(grantSlug || "-")}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;"><strong>Azienda</strong></td>
            <td style="padding:6px 0;">${escapeHtml(azienda)}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;"><strong>Settore</strong></td>
            <td style="padding:6px 0;">${escapeHtml(settore || "-")}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;"><strong>Email</strong></td>
            <td style="padding:6px 0;">${escapeHtml(email)}</td>
          </tr>
          <tr>
            <td style="padding:6px 0;"><strong>Telefono</strong></td>
            <td style="padding:6px 0;">${escapeHtml(telefono || "-")}</td>
          </tr>
          <tr>
            <td style="padding:6px 0; vertical-align:top;"><strong>Nota</strong></td>
            <td style="padding:6px 0; white-space:pre-wrap;">${escapeHtml(messaggio || "-")}</td>
          </tr>
        </table>

        <hr style="margin:16px 0; border:none; border-top:1px solid #e5e7eb;" />
        <p style="margin:0; font-size:12px; color:#64748b;">
          Inviato dal form: /finanziamenti/${escapeHtml(grantSlug || "")}
        </p>
      </div>
    `;

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      replyTo: email, // ✅ il consulente risponde direttamente al lead
      html,
    });

    if (error) {
      return NextResponse.json(
        { error: "Errore nell’invio email. Riprova." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Richiesta non valida. Riprova." },
      { status: 400 }
    );
  }
}
