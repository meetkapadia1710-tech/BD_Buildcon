'use client'

import { useState } from 'react'
import Image from 'next/image'

export type PillarItem = {
  title: string
  badge: string
  body: string
  photo: string
  photoAlt: string
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
    <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-[32px] lg:gap-[56px] items-stretch">
      {/* Rail */}
      <div className="flex flex-col border-t border-hairline">
        {items.map((item, i) => {
          const isActive = i === active
          return (
            <button
              key={item.title}
              onClick={() => setActive(i)}
              aria-pressed={isActive}
              className={`flex items-center gap-[18px] w-full text-left px-[16px] sm:px-[20px] py-[20px] sm:py-[24px] border-b border-hairline transition-colors duration-[250ms] ${
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
              <span className="font-display font-bold text-[17px] sm:text-[19px] text-left flex-1">{item.title}</span>
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

      {/* Detail panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 rounded-card overflow-hidden bg-dark-bg min-h-[420px] lg:min-h-[480px]">
        <div className="relative overflow-hidden min-h-[220px]">
          <Image
            key={current.photo}
            src={current.photo}
            alt={current.photoAlt}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, transparent 55%, rgba(13,20,24,0.85))' }}
          />
        </div>
        <div className="p-[32px] sm:p-[44px] flex flex-col justify-center gap-[20px] sm:gap-[24px]">
          <div className="font-display font-[800] text-[15px] text-white/35 tracking-[0.2em]">
            {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </div>
          <h3 className="font-display font-[800] text-[26px] sm:text-[32px] leading-[1.15] tracking-[-0.01em] text-white m-0">
            {current.title}
          </h3>
          <p className="text-[15px] sm:text-[16px] leading-[1.75] text-white/72 m-0">{current.body}</p>
          <div className="inline-flex items-center gap-[8px] w-fit border border-[rgba(91,214,226,0.4)] text-[#5BD6E2] text-[12px] font-semibold uppercase tracking-[0.1em] px-[14px] py-[8px] rounded-pill">
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
          {current.them && (
            <div className="flex items-start gap-[12px] border-t border-dashed border-white/[0.18] pt-[20px]">
              <span className="shrink-0 w-[20px] h-[20px] rounded-full bg-[rgba(226,58,46,0.18)] flex items-center justify-center mt-[1px]">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#E23A2E"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </span>
              <p className="text-[13px] sm:text-[14px] leading-[1.6] text-white/45 m-0">
                <span className="block font-semibold text-white/60 uppercase text-[11px] tracking-[0.1em] mb-[4px]">
                  Typical contractor
                </span>
                {current.them}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
