'use client'

import { useState } from 'react'
import Image from 'next/image'

export type PillarItem = {
  title: string
  photo: string
  photoAlt: string
  badge?: string
  body?: string
  /** Optional "typical contractor" comparison line (Why Us pillars). */
  them?: string
}

type Props = {
  items: PillarItem[]
}

/**
 * Interactive rail + detail explorer — click a title on the left rail to swap
 * the photo/copy panel on the right. Shared by the Safety Protocols and Why
 * Us Standard sections.
 */
export function PillarExplorer({ items }: Props) {
  const [active, setActive] = useState(0)
  const current = items[active]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-[32px] lg:gap-[48px] items-stretch">
      {/* Rail */}
      <div className="flex flex-col justify-between h-full border-t border-hairline">
        {items.map((item, i) => {
          const isActive = i === active
          return (
            <button
              key={item.title}
              onClick={() => setActive(i)}
              aria-pressed={isActive}
              className={`flex items-center gap-[18px] w-full text-left px-[16px] sm:px-[20px] py-[16px] sm:py-[18px] flex-1 border-b border-hairline transition-colors duration-[250ms] ${
                isActive ? 'bg-dark-bg text-white' : 'bg-transparent text-ink hover:bg-surface'
              }`}
            >
              <span
                className={`font-display font-[800] text-[14px] tracking-[0.1em] w-[30px] shrink-0 ${
                  isActive ? 'text-[#5BD6E2]' : 'text-teal'
                }`}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-display font-bold text-[16px] sm:text-[18px] text-left flex-1">{item.title}</span>
              <svg
                className={`w-[18px] h-[18px] shrink-0 transition-all duration-[250ms] ${
                  isActive ? 'text-[#5BD6E2] translate-x-0' : 'text-border -translate-x-1'
                }`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          )
        })}
      </div>

      {/* Detail panel — Full photo display */}
      <div className="relative rounded-card overflow-hidden bg-dark-bg min-h-[360px] sm:min-h-[420px] lg:h-full lg:min-h-[440px] shadow-lg border border-white/[0.08]">
        <Image
          key={current.photo}
          src={current.photo}
          alt={current.photoAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 65vw"
          className="object-cover transition-all duration-700"
          priority
        />
        {/* Soft bottom gradient overlay for title */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(13,20,24,0.85) 0%, rgba(13,20,24,0.2) 40%, transparent 70%)',
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 p-[24px] sm:p-[36px] flex flex-col gap-[10px] z-10">
          <div className="font-display font-[800] text-[13px] text-[#5BD6E2] tracking-[0.2em]">
            {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </div>
          <h3 className="font-display font-[800] text-[24px] sm:text-[32px] leading-[1.15] tracking-[-0.01em] text-white m-0">
            {current.title}
          </h3>
          {current.badge && (
            <div className="inline-flex items-center gap-[8px] w-fit bg-teal/20 backdrop-blur-md border border-[rgba(91,214,226,0.4)] text-[#5BD6E2] text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.1em] px-[12px] py-[6px] rounded-pill mt-[4px]">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6L9 17l-5-5" />
              </svg>
              {current.badge}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
