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
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const data = contactSchema.parse(body)

    // Log the submission for now
    console.log('[Contact Form Submission]', {
      timestamp: new Date().toISOString(),
      ...data,
    })

    // TODO: Wire email service here — e.g. Resend or Nodemailer:
    //
    // import { Resend } from 'resend'
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'website@bdbuildcon.com',
    //   to: 'business@bdbuildcon.com',
    //   replyTo: data.email,
    //   subject: `New Enquiry: ${data.subject}`,
    //   text: `
    //     Name: ${data.name}
    //     Email: ${data.email}
    //     Phone: ${data.phone ?? 'N/A'}
    //     Company: ${data.company ?? 'N/A'}
    //     Sector: ${data.sector ?? 'N/A'}
    //     Project Type: ${data.projectType ?? 'N/A'}
    //     Subject: ${data.subject}
    //
    //     Message:
    //     ${data.message}
    //   `,
    // })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: err.errors }, { status: 400 })
    }
    console.error('[Contact API Error]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
