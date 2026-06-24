import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(2),
  message: z.string().min(10),
  // Home enquiry form extras
  company: z.string().optional(),
  sector: z.string().optional(),
  projectType: z.string().optional(),
  // Honeypot — must stay empty (bots fill it).
  website: z.string().optional(),
})

type Lead = z.infer<typeof contactSchema>

/**
 * Delivers a validated lead. Works end-to-end today (logs the lead); going live
 * is a one-line change — set RESEND_API_KEY in the environment and uncomment the
 * Resend block below (`npm install resend`).
 */
async function sendLead(data: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    console.warn(
      '[Contact] No RESEND_API_KEY set — lead logged but NOT emailed. ' +
        'Add RESEND_API_KEY to .env.local to deliver leads.',
    )
    console.log('[Contact Form Submission]', { timestamp: new Date().toISOString(), ...data })
    return
  }

  // import { Resend } from 'resend'
  // const resend = new Resend(apiKey)
  // await resend.emails.send({
  //   from: 'website@bdbuildcon.com',
  //   to: 'business@bdbuildcon.com',
  //   replyTo: data.email,
  //   subject: `New Enquiry: ${data.subject}`,
  //   text: [
  //     `Name: ${data.name}`,
  //     `Email: ${data.email}`,
  //     `Phone: ${data.phone ?? 'N/A'}`,
  //     `Company: ${data.company ?? 'N/A'}`,
  //     `Sector: ${data.sector ?? 'N/A'}`,
  //     `Project Type: ${data.projectType ?? 'N/A'}`,
  //     `Subject: ${data.subject}`,
  //     '',
  //     data.message,
  //   ].join('\n'),
  // })
}

// Simple in-memory rate limiter: max 5 submissions per IP per minute.
// For multi-instance deployments replace with an external store (e.g. Upstash Redis).
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const LIMIT = 5
const WINDOW_MS = 60_000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  if (entry.count >= LIMIT) return true
  entry.count++
  return false
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  try {
    const data = contactSchema.parse(body)

    // Honeypot tripped → silently accept so the bot thinks it succeeded.
    if (data.website && data.website.trim() !== '') {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    await sendLead(data)

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: err.errors }, { status: 400 })
    }
    console.error('[Contact API Error]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
