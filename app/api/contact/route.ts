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

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

/**
 * Delivers a validated lead to Web3Forms, which emails it to the address that owns
 * the access key. Set WEB3FORMS_ACCESS_KEY in .env.local (and in the host's env vars
 * for production) — get the key from https://web3forms.com by entering the inbox
 * address you want leads delivered to.
 *
 * The key is deliberately read server-side rather than embedded in the client bundle:
 * submissions stay behind this route's rate limiting and honeypot check.
 *
 * With no key set, the lead is logged instead of sent, so local dev still works.
 */
async function sendLead(data: Lead): Promise<void> {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY

  if (!accessKey) {
    console.warn(
      '[Contact] No WEB3FORMS_ACCESS_KEY set — lead logged but NOT emailed. ' +
        'Add WEB3FORMS_ACCESS_KEY to .env.local to deliver leads.',
    )
    console.log('[Contact Form Submission]', { timestamp: new Date().toISOString(), ...data })
    return
  }

  const res = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `New Enquiry: ${data.subject}`,
      from_name: 'BD Buildcon Website',
      // Web3Forms uses `email` as the reply-to for the notification it sends.
      name: data.name,
      email: data.email,
      phone: data.phone ?? 'N/A',
      company: data.company ?? 'N/A',
      sector: data.sector ?? 'N/A',
      project_type: data.projectType ?? 'N/A',
      message: data.message,
    }),
  })

  // Web3Forms answers 200 with {success:false, message} for a bad/disabled key,
  // so the status code alone is not enough to call this delivered.
  const result = (await res.json().catch(() => null)) as { success?: boolean; message?: string } | null

  if (!res.ok || !result?.success) {
    throw new Error(`Web3Forms rejected the submission (${res.status}): ${result?.message ?? 'unknown error'}`)
  }
}

// Simple in-memory rate limiter: max 5 submissions per IP per minute.
// For multi-instance deployments replace with an external store (e.g. Upstash Redis).
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const LIMIT = 5
const WINDOW_MS = 60_000

// Entries are only ever rewritten for IPs that come back, so a long-running instance
// would otherwise retain one entry per IP that ever submitted. Sweep expired entries
// so the map stays proportional to *active* traffic rather than all traffic ever seen.
// forEach rather than for..of: the tsconfig target predates downlevel Map iteration.
// Deleting during a Map forEach is well-defined — removed keys are simply not revisited.
function sweepExpired(now: number): void {
  rateLimitMap.forEach((entry, key) => {
    if (now > entry.resetAt) rateLimitMap.delete(key)
  })
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()

  if (rateLimitMap.size > 1000) sweepExpired(now)

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
