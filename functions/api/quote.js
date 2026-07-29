// Cloudflare Pages Function — handles the "Teklif Talep Formu" / "Quote Request
// Form" submission on the contact section of both language pages.
//
// On a valid POST it sends two emails via the Resend API:
//   1. a notification to the office, with the submitted details and any
//      uploaded documents attached
//   2. an auto-reply to the visitor confirming their request was received,
//      in whichever language they submitted from
//
// Required environment variables (set in Cloudflare Pages → Settings →
// Environment variables — never committed to the repo, see .env.example):
//   RESEND_API_KEY     — API key from resend.dev
//   QUOTE_NOTIFY_EMAIL  — where the office notification is sent. While testing
//                         before sekreterburo.com is verified in Resend, this
//                         is set to a personal test inbox rather than
//                         info@sekreterburo.com.
// Optional:
//   RESEND_FROM_EMAIL   — sender address. Defaults to Resend's shared sandbox
//                         sender, which only works for testing; once
//                         sekreterburo.com is verified in Resend, set this to
//                         something like "Sekreter Büro <info@sekreterburo.com>".

const TEXT = {
  tr: {
    subject: (name) => `Yeni Teklif Talebi — ${name}`,
    replySubject: 'Talebiniz Alındı — Sekreter Büro',
    replyBody: (name) => `
      <p>Merhaba ${escapeHtml(name)},</p>
      <p>Tercüme talebiniz tarafımıza ulaştı. Uzman ekibimiz belgelerinizi/mesajınızı inceleyerek en kısa sürede size dönüş yapacaktır.</p>
      <p>Sekreter Büro Tercüme ve Tic. Ltd. Şti.</p>
    `,
  },
  en: {
    subject: (name) => `New Quote Request — ${name}`,
    replySubject: 'Your Request Has Been Received — Sekreter Büro',
    replyBody: (name) => `
      <p>Hello ${escapeHtml(name)},</p>
      <p>Your translation request has reached us. Our team will review your documents/message and get back to you shortly.</p>
      <p>Sekreter Büro Tercüme ve Tic. Ltd. Şti.</p>
    `,
  },
};

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

async function fileToAttachment(file) {
  const buffer = new Uint8Array(await file.arrayBuffer());
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < buffer.length; i += chunkSize) {
    binary += String.fromCharCode.apply(null, buffer.subarray(i, i + chunkSize));
  }
  return { filename: file.name, content: btoa(binary) };
}

async function sendEmail(apiKey, payload) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Resend request failed (${res.status}): ${detail}`);
  }
}

export async function onRequestPost({ request, env }) {
  if (!env.RESEND_API_KEY || !env.QUOTE_NOTIFY_EMAIL) {
    return Response.json({ ok: false, error: 'Form backend is not configured yet.' }, { status: 500 });
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ ok: false, error: 'Invalid submission.' }, { status: 400 });
  }

  const lang = form.get('lang') === 'en' ? 'en' : 'tr';
  const fullName = (form.get('full_name') || '').toString().trim();
  const email = (form.get('email') || '').toString().trim();
  const message = (form.get('message') || '').toString().trim();
  const sourceLang = (form.get('source_lang') || '').toString().trim();
  const targetLang = (form.get('target_lang') || '').toString().trim();
  const serviceType = (form.get('service_type') || '').toString().trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!fullName || !message || !emailPattern.test(email)) {
    return Response.json({ ok: false, error: 'Missing or invalid required fields.' }, { status: 400 });
  }

  const files = form.getAll('documents').filter((f) => f instanceof File && f.size > 0);
  const totalBytes = files.reduce((sum, f) => sum + f.size, 0);
  const MAX_UPLOAD_BYTES = 15 * 1024 * 1024;
  if (totalBytes > MAX_UPLOAD_BYTES) {
    return Response.json({ ok: false, error: 'Attachments too large.' }, { status: 413 });
  }

  const fromAddress = env.RESEND_FROM_EMAIL || 'Sekreter Büro Website <onboarding@resend.dev>';
  const t = TEXT[lang];

  try {
    const attachments = await Promise.all(files.map(fileToAttachment));

    const detailRows = [
      ['Ad Soyad / Name', fullName],
      ['E-posta / Email', email],
      ['Kaynak Dil / Source', sourceLang],
      ['Hedef Dil / Target', targetLang],
      ['Hizmet Türü / Service', serviceType],
    ].filter(([, value]) => value);

    const detailHtml = detailRows
      .map(([label, value]) => `<tr><td style="padding:4px 12px 4px 0;color:#8C8474;">${escapeHtml(label)}</td><td>${escapeHtml(value)}</td></tr>`)
      .join('');

    await sendEmail(env.RESEND_API_KEY, {
      from: fromAddress,
      to: env.QUOTE_NOTIFY_EMAIL,
      reply_to: email,
      subject: t.subject(fullName),
      html: `
        <table>${detailHtml}</table>
        <p style="margin-top:16px;white-space:pre-wrap;">${escapeHtml(message)}</p>
      `,
      attachments: attachments.length ? attachments : undefined,
    });

    await sendEmail(env.RESEND_API_KEY, {
      from: fromAddress,
      to: email,
      subject: t.replySubject,
      html: t.replyBody(fullName),
    });

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ ok: false, error: String(err) }, { status: 502 });
  }
}
