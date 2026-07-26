'use client'

import { useState } from 'react'
import type { FAQ } from '@/content/faqs'
import { SlideIn } from '@/components/motion/SlideIn'

type Props = {
  faqs: FAQ[]
  heading?: string
  subheading?: string
  className?: string
}

export function FAQSection({
  faqs,
  heading = 'Frequently Asked Questions',
  subheading = 'Direct answers about our operations, capabilities, and project execution.',
  className = 'bg-surface py-[72px] lg:py-[110px] border-t border-hairline',
}: Props) {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>(() => {
    // Open first FAQ by default for accessibility & immediate visibility
    const initial: Record<string, boolean> = {}
    if (faqs && faqs.length > 0) initial[faqs[0].id] = true
    return initial
  })

  const toggle = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  if (!faqs || faqs.length === 0) return null

  return (
    <section aria-label="Frequently Asked Questions" className={className}>
      <div className="max-w-container mx-auto px-gutter">
        <SlideIn from="bottom">
          <div className="max-w-[720px] mb-12 lg:mb-16">
            <span className="block text-[13px] font-semibold uppercase tracking-[0.14em] text-teal mb-3">FAQ</span>
            <h2 className="font-display font-[800] text-[32px] sm:text-[40px] lg:text-[48px] tracking-[-0.02em] leading-[1.1] text-ink mb-4">
              {heading}
            </h2>
            {subheading && <p className="text-[16px] sm:text-[17px] leading-[1.65] text-body m-0">{subheading}</p>}
          </div>
        </SlideIn>

        <SlideIn from="bottom" delay={0.1}>
          <div className="max-w-[900px] divide-y divide-hairline border-y border-hairline">
            {faqs.map((faq) => {
              const isOpen = Boolean(openIds[faq.id])
              return (
                <div key={faq.id} className="py-6 sm:py-7 group">
                  <h3>
                    <button
                      type="button"
                      onClick={() => toggle(faq.id)}
                      className="w-full text-left flex items-center justify-between gap-4 font-display font-bold text-[18px] sm:text-[21px] leading-[1.35] text-ink hover:text-teal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 rounded-lg"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                    >
                      <span>{faq.question}</span>
                      <span className="shrink-0 w-8 h-8 rounded-full bg-white border border-hairline flex items-center justify-center text-ink group-hover:border-teal group-hover:text-teal transition-all duration-300">
                        <svg
                          className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-answer-${faq.id}`}
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100 mt-3 sm:mt-4' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-[15px] sm:text-[16px] leading-[1.7] text-body m-0 max-w-[780px]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </SlideIn>
      </div>
    </section>
  )
}
