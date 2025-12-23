import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

function cleanOneLine(input: unknown, max = 200) {
  return String(input ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);
}
function cleanText(input: unknown, max = 6000) {
  return String(input ?? "").trim().slice(0, max);
}
function isEmailLike(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.HR_TO;
    const from = process.env.HR_FROM;

    if (!apiKey) return NextResponse.json({ ok: false, error: "RESEND_API_KEY mancante." }, { status: 500 });
    if (!to) return NextResponse.json({ ok: false, error: "HR_TO mancante." }, { status: 500 });
    if (!from) return NextResponse.json({ ok: false, error: "HR_FROM mancante." }, { status: 500 });

    const resend = new Resend(apiKey);
    const fd = await req.formData();

    const jobSlug = cleanOneLine(fd.get("jobSlug"), 120);
    const jobTitle = cleanOneLine(fd.get("jobTitle"), 200);

    const nome = cleanOneLine(fd.get("nome"), 120);
    const cognome = cleanOneLine(fd.get("cognome"), 120);
    const email = cleanOneLine(fd.get("email"), 160);
    const telefono = cleanOneLine(fd.get("telefono"), 80);
    const messaggio = cleanText(fd.get("messaggio"), 6000);
    const privacy = fd.get("privacy");

    if (!jobSlug || !jobTitle) {
      return NextResponse.json({ ok: false, error: "Posizione non specificata." }, { status: 400 });
    }
    if (!nome || !cognome || !email || !messaggio) {
      return NextResponse.json({ ok: false, error: "Compila tutti i campi obbligatori." }, { status: 400 });
    }
    if (!isEmailLike(email)) {
      return NextResponse.json({ ok: false, error: "Email non valida." }, { status: 400 });
    }
    if (!privacy) {
      return NextResponse.json({ ok: false, error: "Devi accettare la privacy." }, { status: 400 });
    }

    const file = fd.get("cv");
    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, error: "CV mancante." }, { status: 400 });
    }
    if (file.type !== "application/pdf") {
      return NextResponse.json({ ok: false, error: "Il CV deve essere un PDF." }, { status: 400 });
    }
    const maxBytes = 10 * 1024 * 1024;
    if (file.size > maxBytes) {
      return NextResponse.json({ ok: false, error: "CV troppo grande (max 10 MB)." }, { status: 400 });
    }

    const base64 = Buffer.from(await file.arrayBuffer()).toString("base64");

    const subject = `Candidatura — ${jobTitle} (${jobSlug}) — ${nome} ${cognome}`;
    const text = [
      `CANDIDATURA POSIZIONE`,
      `Posizione: ${jobTitle}`,
      `Slug: ${jobSlug}`,
      ``,
      `Nome: ${nome}`,
      `Cognome: ${cognome}`,
      `Email: ${email}`,
      `Telefono: ${telefono || "-"}`,
      ``,
      `Messaggio:`,
      messaggio,
    ].join("\n");

    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      text,
      replyTo: email,
      attachments: [
        {
          filename: file.name || "cv.pdf",
          content: base64,
          contentType: "application/pdf",
        },
      ],
    });

    if (error) {
      return NextResponse.json({ ok: false, error: error.message ?? "Errore invio email." }, { status: 502 });
    }

    return NextResponse.json({ ok: true, id: data?.id ?? null });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "Errore inatteso." }, { status: 500 });
  }
}
