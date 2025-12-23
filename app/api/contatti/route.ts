// app/api/contatti/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs"; // Resend usa Node runtime (non Edge)

const resend = new Resend(process.env.RESEND_API_KEY);

// Piccola utility per evitare header injection e stringhe "strane"
function cleanOneLine(input: unknown, max = 200) {
  return String(input ?? "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, max);
}

function cleanText(input: unknown, max = 5000) {
  return String(input ?? "")
    .replace(/\u0000/g, "")
    .trim()
    .slice(0, max);
}

function isEmailLike(email: string) {
  // semplice e robusto (non perfetto, ma sufficiente lato form)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { ok: false, error: "RESEND_API_KEY mancante nelle variabili d'ambiente." },
        { status: 500 }
      );
    }

    const to = process.env.CONTACT_TO || process.env.CONTACT_EMAIL;
    const from = process.env.CONTACT_FROM;

    if (!to) {
      return NextResponse.json(
        { ok: false, error: "CONTACT_TO (email destinataria) mancante nelle variabili d'ambiente." },
        { status: 500 }
      );
    }
    if (!from) {
      return NextResponse.json(
        { ok: false, error: "CONTACT_FROM (mittente) mancante nelle variabili d'ambiente." },
        { status: 500 }
      );
    }

    // Supporta JSON (fetch) e FormData (se un domani cambi implementazione)
    const contentType = req.headers.get("content-type") || "";
    let payload: any = {};

    if (contentType.includes("application/json")) {
      payload = await req.json();
    } else if (contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")) {
      const fd = await req.formData();
      payload = Object.fromEntries(fd.entries());
    } else {
      // Proviamo comunque JSON come fallback
      try {
        payload = await req.json();
      } catch {
        payload = {};
      }
    }

    // Campi (adatta i name se nel form usi chiavi diverse)
    const nome = cleanOneLine(payload.nome ?? payload.name, 120);
    const azienda = cleanOneLine(payload.azienda ?? payload.company, 160);
    const email = cleanOneLine(payload.email, 160);
    const telefono = cleanOneLine(payload.telefono ?? payload.phone, 80);
    const ambito = cleanOneLine(payload.ambito ?? payload.area, 80);
    const messaggio = cleanText(payload.messaggio ?? payload.message, 5000);

    // Honeypot opzionale (se lo aggiungi nel form: <input name="website" ... />)
    const honeypot = cleanOneLine(payload.website ?? "", 80);
    if (honeypot) {
      // Finge successo per non dare feedback agli spammer
      return NextResponse.json({ ok: true });
    }

    // Validazione minima
    if (!nome || !email || !messaggio) {
      return NextResponse.json(
        { ok: false, error: "Compila Nome, Email e Messaggio." },
        { status: 400 }
      );
    }
    if (!isEmailLike(email)) {
      return NextResponse.json(
        { ok: false, error: "Email non valida." },
        { status: 400 }
      );
    }

    const subject = `Nuova richiesta contatti — ${nome}${azienda ? ` (${azienda})` : ""}`;

    const text = [
      `Nome: ${nome}`,
      `Azienda/Ente: ${azienda || "-"}`,
      `Email: ${email}`,
      `Telefono: ${telefono || "-"}`,
      `Ambito: ${ambito || "-"}`,
      ``,
      `Messaggio:`,
      messaggio,
      ``,
      `---`,
      `Fonte: /contatti`,
      `User-Agent: ${cleanText(req.headers.get("user-agent") || "-", 300)}`,
    ].join("\n");

    const html = `
      <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height:1.5">
        <h2>Nuova richiesta contatti</h2>
        <p><strong>Nome:</strong> ${escapeHtml(nome)}</p>
        <p><strong>Azienda/Ente:</strong> ${escapeHtml(azienda || "-")}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Telefono:</strong> ${escapeHtml(telefono || "-")}</p>
        <p><strong>Ambito:</strong> ${escapeHtml(ambito || "-")}</p>
        <hr />
        <p><strong>Messaggio:</strong></p>
        <pre style="white-space:pre-wrap; background:#f8fafc; padding:12px; border-radius:10px; border:1px solid #e2e8f0">${escapeHtml(
          messaggio
        )}</pre>
        <hr />
        <p style="color:#64748b; font-size:12px">Fonte: /contatti<br/>User-Agent: ${escapeHtml(
          cleanText(req.headers.get("user-agent") || "-", 300)
        )}</p>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      text,
      html,
      replyTo: email, // così rispondi direttamente al cliente
    });

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message ?? "Errore invio email." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Errore inatteso." },
      { status: 500 }
    );
  }
}

// Escape HTML semplice
function escapeHtml(str: string) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
