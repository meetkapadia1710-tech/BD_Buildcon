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

/**
 * Compact, low-emphasis FAQ block — deliberately quiet so a reader can skip past it.
 *
 * SEO contract (do not break):
 *  - Every answer stays in the server-rendered DOM at all times. Collapsed rows are
 *    hidden with `grid-rows-[0fr]` + `overflow-hidden`, NOT unmounted. Swapping this
 *    for `{isOpen && <p>…</p>}` would strip the answer text out of the crawled HTML.
 *  - Questions stay real <h3> headings inside the page's heading outline.
 *  - The FAQPage structured data is emitted separately, by each page's faqJsonLd()
 *    <script> tag, so it is unaffected by anything in this component.
 */
export function FAQSection({
  faqs,
  heading = 'Common questions',
  // Off by default — this block is meant to be visually cheap. Pass a string to opt in.
  subheading = '',
  className = 'bg-surface py-[44px] lg:py-[60px] border-t border-hairline',
}: Props) {
  // All collapsed by default; the section should cost ~one screen-inch until asked for.
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({})

  const toggle = (id: string) => {
    setOpenIds((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  if (!faqs || faqs.length === 0) return null

  return (
    <section aria-label="Frequently Asked Questions" className={className}>
      <div className="max-w-container mx-auto px-gutter">
        <SlideIn from="bottom">
          <div className="max-w-[820px] mb-5 lg:mb-6">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-teal mb-2">FAQ</span>
            <h2 className="font-display font-bold text-[20px] sm:text-[24px] tracking-[-0.01em] leading-[1.2] text-ink m-0">
              {heading}
            </h2>
            {subheading && <p className="mt-2 text-[14.5px] leading-[1.6] text-body m-0">{subheading}</p>}
          </div>
        </SlideIn>

        <SlideIn from="bottom" delay={0.1}>
          <div className="max-w-[820px] divide-y divide-hairline border-y border-hairline">
            {faqs.map((faq) => {
              const isOpen = Boolean(openIds[faq.id])
              return (
                <div key={faq.id}>
                  <h3 className="m-0">
                    <button
                      type="button"
                      onClick={() => toggle(faq.id)}
                      className="w-full text-left flex items-start justify-between gap-4 py-[13px] sm:py-[15px] font-body font-semibold text-[14.5px] sm:text-[15.5px] leading-[1.45] text-ink hover:text-teal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 rounded"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                    >
                      <span>{faq.question}</span>
                      <svg
                        className={`shrink-0 mt-[3px] w-[15px] h-[15px] text-body transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </h3>
                  {/* Stays mounted while collapsed — see the SEO contract above. */}
                  <div
                    id={`faq-answer-${faq.id}`}
                    className={`grid transition-all duration-300 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100 pb-[15px]' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-[14.5px] leading-[1.65] text-body m-0 max-w-[720px] pr-8">{faq.answer}</p>
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
