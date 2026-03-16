// ---------------------------------------------------------------------------
// POST /api/contact — Skinmap form submission handler
// Accepts all 5 contact form types, routes each to the right inbox via Resend.
// ---------------------------------------------------------------------------

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

// ── Routing config ────────────────────────────────────────────────────────────

const FROM = process.env.EMAIL_FROM ?? 'Skinmap <noreply@mail.skinmap.com>';

const ROUTES: Record<string, string> = {
  physician_demo: process.env.EMAIL_DEMO_INBOX ?? 'demo@skinmap.com',
  partnership:    process.env.EMAIL_PARTNERSHIPS_INBOX ?? 'partnerships@skinmap.com',
  investor:       process.env.EMAIL_INVESTORS_INBOX ?? 'investors@skinmap.com',
  patient:        process.env.EMAIL_GENERAL_INBOX ?? 'hello@skinmap.com',
  press:          process.env.EMAIL_PRESS_INBOX ?? 'press@skinmap.com',
};

// ── Payload schema ────────────────────────────────────────────────────────────

const baseSchema = z.object({
  type: z.enum(['physician_demo', 'partnership', 'investor', 'patient', 'press']),
});

const physicianDemoSchema = baseSchema.extend({
  type: z.literal('physician_demo'),
  name: z.string().min(1),
  specialty: z.string().min(1),
  practice: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().optional(),
});

const partnershipSchema = baseSchema.extend({
  type: z.literal('partnership'),
  name: z.string().min(1),
  organization: z.string().min(1),
  role: z.string().min(1),
  email: z.string().email(),
  message: z.string().optional(),
});

const investorSchema = baseSchema.extend({
  type: z.literal('investor'),
  name: z.string().min(1),
  firm: z.string().min(1),
  email: z.string().email(),
  message: z.string().optional(),
});

const patientSchema = baseSchema.extend({
  type: z.literal('patient'),
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

const pressSchema = baseSchema.extend({
  type: z.literal('press'),
  name: z.string().min(1),
  publication: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

const payloadSchema = z.discriminatedUnion('type', [
  physicianDemoSchema,
  partnershipSchema,
  investorSchema,
  patientSchema,
  pressSchema,
]);

// ── Email templates ───────────────────────────────────────────────────────────

function buildSubject(data: z.infer<typeof payloadSchema>): string {
  switch (data.type) {
    case 'physician_demo':
      return `Demo request — ${data.name} (${data.specialty}, ${data.practice})`;
    case 'partnership':
      return `Partnership inquiry — ${data.name} at ${data.organization}`;
    case 'investor':
      return `Investor inquiry — ${data.name} at ${data.firm}`;
    case 'patient':
      return `Patient inquiry — ${data.subject}`;
    case 'press':
      return `Press inquiry — ${data.name} (${data.publication})`;
  }
}

function buildHtml(data: z.infer<typeof payloadSchema>): string {
  const rows = Object.entries(data)
    .filter(([k]) => k !== 'type')
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;font-weight:600;color:#374151;white-space:nowrap">${k}</td>` +
        `<td style="padding:6px 12px;color:#111827">${v ?? '—'}</td></tr>`,
    )
    .join('');

  return `
    <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#0D0B28;padding:20px 32px;border-radius:8px 8px 0 0">
        <span style="color:#00CA5A;font-weight:800;font-size:18px">Skinmap</span>
        <span style="color:#9CA3AF;font-size:14px;margin-left:12px">form submission</span>
      </div>
      <table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #E5E7EB">
        ${rows}
      </table>
      <p style="color:#6B7280;font-size:12px;padding:12px 0">
        Sent via skinmap.com contact form · ${new Date().toUTCString()}
      </p>
    </div>
  `;
}

// ── Handler ───────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // Reject if Resend isn't configured (misconfigured deploy)
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY not set');
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
  }
  const resend = new Resend(apiKey);

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload', issues: parsed.error.issues }, { status: 422 });
  }

  const data = parsed.data;
  const to = ROUTES[data.type];

  try {
    await resend.emails.send({
      from: FROM,
      to,
      replyTo: data.email,
      subject: buildSubject(data),
      html: buildHtml(data),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] Resend error', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
