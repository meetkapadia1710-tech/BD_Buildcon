'use client'

import { useState } from 'react'
import { PageTitleBand } from '@/components/layout/PageTitleBand'
import { SlideIn } from '@/components/motion/SlideIn'
import { StaggerReveal } from '@/components/motion/StaggerReveal'
import { MagneticButton } from '@/components/motion/MagneticButton'
import { contactInfo } from '@/content/links'
import { submitEnquiry } from '@/lib/submitEnquiry'
import { TrussArtifact } from '@/components/ui/BlueprintArtifacts'

const infoCards = [
  {
    title: 'Registered Office',
    icon: (
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    ),
    body: <p className="text-[15px] leading-[1.7] text-body m-0">{contactInfo.address}</p>,
  },
  {
    title: 'Phone',
    icon: (
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    ),
    body: (
      <div className="flex flex-col gap-[8px]">
        <a
          href="tel:+919879100355"
          className="inline-block py-[10px] -my-[10px] text-[15px] text-teal font-semibold hover:text-teal/80 transition-colors"
        >
          +91 98791 00355
        </a>
        <a
          href="tel:+912642262355"
          className="inline-block py-[10px] -my-[10px] text-[15px] text-teal font-semibold hover:text-teal/80 transition-colors"
        >
          +91 264 226 2355
        </a>
      </div>
    ),
  },
  {
    title: 'Email',
    icon: (
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    ),
    body: (
      <div className="flex flex-col gap-[8px]">
        <a
          href="mailto:business@bdbuildcon.com"
          className="inline-block py-[10px] -my-[10px] text-[15px] text-teal font-semibold hover:text-teal/80 transition-colors"
        >
          business@bdbuildcon.com
        </a>
        <a
          href="mailto:info@bdbuildcon.com"
          className="inline-block py-[10px] -my-[10px] text-[15px] text-teal font-semibold hover:text-teal/80 transition-colors"
        >
          info@bdbuildcon.com
        </a>
      </div>
    ),
  },
  {
    title: 'Office Hours',
    icon: <path d="M12 2a10 10 0 100 20 10 10 0 000-20z M12 6v6l4 2" />,
    body: (
      <p className="text-[15px] leading-[1.7] text-body m-0">
        Monday – Saturday
        <br />
        9:00 AM – 6:00 PM IST
      </p>
    ),
  },
]

export default function ContactPage() {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    setSending(true)
    setSent(false)
    setError(null)

    const result = await submitEnquiry(form)
    setSending(false)
    if (result.ok) {
      setSent(true)
      form.reset()
    } else {
      setError(result.error ?? 'Something went wrong. Please try again.')
    }
  }

  return (
    <>
      <PageTitleBand
        title="Contact Us"
        breadcrumbs={[{ label: 'Contact' }]}
        description="Tell us about your project. We respond within one business day."
      />

      <section aria-label="Contact" className="relative overflow-hidden bg-white py-[96px]">
        {/* Blueprint artifact — TrussArtifact bottom-right behind the info cards */}
        <TrussArtifact className="pointer-events-none absolute -bottom-4 -right-8 w-[300px] h-auto text-teal/[0.09] hidden lg:block" />
        <div className="relative z-10 max-w-container mx-auto px-gutter grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-[56px] items-start">
          {/* Info panel */}
          <StaggerReveal direction="left" className="flex flex-col gap-[20px]" stagger={0.08}>
            {infoCards.map((card) => (
              <div
                key={card.title}
                className="group bg-surface border border-hairline rounded-card p-[28px] flex gap-[18px] transition-all duration-300 hover:border-teal/40 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
              >
                <span className="shrink-0 w-[44px] h-[44px] rounded-full bg-teal/10 flex items-center justify-center text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    {card.icon}
                  </svg>
                </span>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-[17px] text-ink mb-[10px] mt-[8px]">{card.title}</h3>
                  {card.body}
                </div>
              </div>
            ))}
          </StaggerReveal>

          {/* Form */}
          <SlideIn from="right">
            <form
              onSubmit={handleSubmit}
              className="bg-white border border-hairline rounded-card shadow-[0_1px_4px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.06)] p-[36px] flex flex-col gap-[20px]"
            >
              <h2 className="font-display font-bold text-[24px] text-ink m-0 mb-[4px]">Send an Enquiry</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                <div>
                  <label
                    htmlFor="c-name"
                    className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-ink mb-[8px]"
                  >
                    Name <span className="text-[#E23A2E]">*</span>
                  </label>
                  <input
                    id="c-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your full name"
                    className="w-full bg-surface border border-hairline rounded-[8px] px-[16px] py-[12px] font-body text-[16px] text-ink focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="c-email"
                    className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-ink mb-[8px]"
                  >
                    Email <span className="text-[#E23A2E]">*</span>
                  </label>
                  <input
                    id="c-email"
                    name="email"
                    type="email"
                    required
                    placeholder="your.email@example.com"
                    className="w-full bg-surface border border-hairline rounded-[8px] px-[16px] py-[12px] font-body text-[16px] text-ink focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                <div>
                  <label
                    htmlFor="c-company"
                    className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-ink mb-[8px]"
                  >
                    Company
                  </label>
                  <input
                    id="c-company"
                    name="company"
                    type="text"
                    placeholder="Your company name"
                    className="w-full bg-surface border border-hairline rounded-[8px] px-[16px] py-[12px] font-body text-[16px] text-ink focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="c-phone"
                    className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-ink mb-[8px]"
                  >
                    Phone
                  </label>
                  <input
                    id="c-phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 XXX XXX XXXX"
                    className="w-full bg-surface border border-hairline rounded-[8px] px-[16px] py-[12px] font-body text-[16px] text-ink focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
                <div>
                  <label
                    htmlFor="c-sector"
                    className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-ink mb-[8px]"
                  >
                    Sector
                  </label>
                  <select
                    id="c-sector"
                    name="sector"
                    className="w-full bg-surface border border-hairline rounded-[8px] px-[16px] py-[12px] font-body text-[16px] text-ink appearance-auto focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                  >
                    <option>Select sector</option>
                    <option>Chemicals</option>
                    <option>Pharma</option>
                    <option>Petroleum</option>
                    <option>Fertiliser</option>
                    <option>Glass</option>
                    <option>Tyre</option>
                    <option>Food Processing</option>
                    <option>Residential</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="c-type"
                    className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-ink mb-[8px]"
                  >
                    Project Type
                  </label>
                  <select
                    id="c-type"
                    name="projectType"
                    className="w-full bg-surface border border-hairline rounded-[8px] px-[16px] py-[12px] font-body text-[16px] text-ink appearance-auto focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                  >
                    <option>Select type</option>
                    <option>Greenfield Plant</option>
                    <option>Plant Expansion</option>
                    <option>PEB Structure</option>
                    <option>Piping &amp; Mechanical</option>
                    <option>Civil Works</option>
                    <option>Roads &amp; Earthwork</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="c-message"
                  className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-ink mb-[8px]"
                >
                  Message <span className="text-[#E23A2E]">*</span>
                </label>
                <textarea
                  id="c-message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Brief project description — scope, location, timeline..."
                  className="w-full bg-surface border border-hairline rounded-[8px] px-[16px] py-[12px] font-body text-[16px] text-ink resize-y focus:border-teal focus:ring-4 focus:ring-teal/10 outline-none transition-all"
                ></textarea>
              </div>

              <div className="flex flex-col gap-[10px]">
                <div className="flex items-center gap-[16px]">
                  <MagneticButton
                    as="button"
                    type="submit"
                    disabled={sending}
                    strength={0.3}
                    className="bg-teal text-white border-none cursor-pointer font-body text-[13px] font-semibold uppercase tracking-[0.1em] px-[36px] py-[15px] rounded-full transition-colors hover:bg-teal/90 disabled:opacity-70"
                  >
                    {sending ? 'Sending...' : 'Send Enquiry'}
                  </MagneticButton>

                  {sent && (
                    <span className="text-[14px] text-[#0C7A88] font-medium">
                      ✓ Enquiry sent — we&apos;ll get back to you shortly.
                    </span>
                  )}
                </div>
                {error && <span className="text-[14px] text-[#E23A2E] font-medium">{error}</span>}
              </div>
            </form>
          </SlideIn>
        </div>
      </section>

      {/* Map */}
      <section aria-label="Map" className="bg-surface border-t border-hairline">
        <div className="relative h-[380px] w-full">
          <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent(contactInfo.address)}&output=embed`}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="BD Buildcon LLP — Millenium Arcade, Bharuch"
          />
          <a
            href="https://maps.google.com/?q=Millenium+Arcade+Bharuch"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-[16px] left-[16px] font-body text-[13px] text-body bg-white border border-hairline rounded-[8px] px-[16px] py-[13px] shadow-[0_2px_10px_rgba(0,0,0,0.08)] hover:border-teal transition-colors"
          >
            📍 Open in Google Maps
          </a>
        </div>
      </section>
    </>
  )
}
