'use client'

import Link from 'next/link'
import { FadeRise, FadeRiseItem } from '@/components/motion/FadeRise'

export default function ThankYouPage() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center bg-surface px-6">
      <FadeRise className="max-w-xl text-center">
        {/* Checkmark icon */}
        <FadeRiseItem>
          <div className="mx-auto w-20 h-20 rounded-full bg-teal/10 flex items-center justify-center mb-8">
            <svg
              className="w-10 h-10 text-teal"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </FadeRiseItem>

        <FadeRiseItem delay={0.05}>
          <h1 className="font-display text-headline-lg text-ink mb-4">
            Thank you for reaching out!
          </h1>
        </FadeRiseItem>

        <FadeRiseItem delay={0.1}>
          <p className="font-body text-body-lg text-body mb-4 leading-relaxed">
            We have received your enquiry and our team will get back to you within one business day.
          </p>
        </FadeRiseItem>

        <FadeRiseItem delay={0.15}>
          <p className="font-body text-body-md text-body mb-10">
            In the meantime, you can browse our portfolio to see the quality and scale of projects we
            have delivered for clients across India.
          </p>
        </FadeRiseItem>

        <FadeRiseItem delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/projects" className="btn-primary text-sm">
              View Our Projects
            </Link>
            <Link href="/" className="btn-ghost text-sm">
              Return Home
            </Link>
          </div>
        </FadeRiseItem>
      </FadeRise>
    </section>
  )
}
