'use client'

import { useState } from 'react'
import type { Testimonial } from '@/content/testimonials'

type Props = {
  quotes: Testimonial[]
}

/**
 * Big-quote testimonial carousel — prev/next arrows plus dot navigation.
 */
export function QuoteCarousel({ quotes }: Props) {
  const [active, setActive] = useState(0)
  const current = quotes[active]
  const next = () => setActive((i) => (i + 1) % quotes.length)
  const prev = () => setActive((i) => (i - 1 + quotes.length) % quotes.length)
  const bigQuote = current.quote.length <= 220

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] lg:grid-rows-[auto_1fr] gap-[32px] lg:gap-x-[72px] lg:gap-y-0 items-start">
      <div className="order-1 lg:col-start-1 lg:row-start-1">
        <span className="block text-[13px] font-semibold uppercase tracking-[0.14em] text-teal mb-[14px]">
          In their words
        </span>
        <h2 className="font-display font-[800] text-[34px] sm:text-[44px] tracking-[-0.02em] leading-[1.1] text-ink mb-[20px]">
          Clients put it on letterhead.
        </h2>
        <p className="text-[15.5px] leading-[1.7] text-body mb-0 lg:mb-[32px]">
          Every quote below comes from a written recommendation letter held on file.
        </p>
      </div>

      <div className="order-3 flex justify-center gap-[10px] lg:order-none lg:col-start-1 lg:row-start-2 lg:justify-start">
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] flex items-center justify-center rounded-full bg-white border border-border hover:bg-teal hover:border-teal transition-colors duration-200 group"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-ink group-hover:text-white"
            aria-hidden="true"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={next}
          aria-label="Next testimonial"
          className="w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] flex items-center justify-center rounded-full bg-white border border-border hover:bg-teal hover:border-teal transition-colors duration-200 group"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-ink group-hover:text-white"
            aria-hidden="true"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 relative bg-white border border-hairline rounded-card p-[24px] sm:p-[56px] sm:pl-[60px] shadow-[0_4px_16px_rgba(0,0,0,0.04)] min-h-0 sm:min-h-[340px] flex flex-col justify-between gap-[20px] sm:gap-[32px]">
        <svg
          width="44"
          height="32"
          viewBox="0 0 28 20"
          fill="#16A8B8"
          className="opacity-[0.25] shrink-0 w-[32px] h-[23px] sm:w-[44px] sm:h-[32px]"
          aria-hidden="true"
        >
          <path d="M0 20V12.4C0 5.9 3.6 1.6 10 0l1.6 3.2C7.4 4.6 5.4 7 5.2 10H11v10H0zm17 0V12.4C17 5.9 20.6 1.6 27 0l1 3.2c-4.2 1.4-6.2 3.8-6.4 6.8H27v10H17z" />
        </svg>
        <blockquote
          className={`font-display font-semibold leading-[1.45] tracking-[-0.01em] text-ink m-0 ${
            bigQuote ? 'text-[17px] sm:text-[26px]' : 'text-[15.5px] sm:text-[22px]'
          }`}
        >
          {current.quote}
        </blockquote>
        <div className="flex items-center justify-between gap-[16px] sm:gap-[24px] border-t border-hairline pt-[18px] sm:pt-[24px]">
          <div>
            <p className="font-display font-bold text-[15px] sm:text-[16px] text-ink m-0">{current.name}</p>
            <p className="text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.08em] text-teal mt-[4px] mb-0">
              {current.companyShort}
            </p>
          </div>
          <div className="flex gap-[7px] shrink-0">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-[9px] rounded-pill border-none cursor-pointer transition-all duration-300 ${
                  i === active ? 'w-[26px] bg-teal' : 'w-[9px] bg-border'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
