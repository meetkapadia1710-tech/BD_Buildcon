'use client'

import { useState } from 'react'
import { SlideIn } from '@/components/motion/SlideIn'
import { MagneticButton } from '@/components/motion/MagneticButton'
import { submitEnquiry } from '@/lib/submitEnquiry'

export function EnquiryForm() {
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
              <option>Institutional</option>
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
          />
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
  )
}
