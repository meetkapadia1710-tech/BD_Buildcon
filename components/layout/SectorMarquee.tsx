'use client'

import { useEffect, useRef, useState } from 'react'

const sectors = [
  'Chemicals',
  'Pharma',
  'Petroleum',
  'Fertiliser',
  'Glass',
  'Tyre',
  'Food Processing',
  'Industrial Gases',
  'Insulation',
  'Adhesives',
  'Natural Fibres',
  'Infrastructure',
  'Residential',
]

export function SectorMarquee() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="Sectors we serve"
      className="bg-surface border-b border-hairline py-[12px] sm:py-[16px] overflow-hidden transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(10px)',
      }}
    >
      <div className="flex w-max animate-marquee">
        <div className="flex">
          {sectors.map((s, i) => (
            <span
              key={i}
              className="flex items-center text-[10px] sm:text-[12.5px] font-semibold uppercase tracking-[0.12em] text-body px-[12px] sm:px-[20px]"
            >
              {s}
              <span className="text-teal text-[14px] sm:text-[16px] ml-[24px] sm:ml-[40px]" aria-hidden="true">
                ·
              </span>
            </span>
          ))}
        </div>
        <div className="flex" aria-hidden="true">
          {sectors.map((s, i) => (
            <span
              key={i}
              className="flex items-center text-[10px] sm:text-[12.5px] font-semibold uppercase tracking-[0.12em] text-body px-[12px] sm:px-[20px]"
            >
              {s}
              <span className="text-teal text-[14px] sm:text-[16px] ml-[24px] sm:ml-[40px]" aria-hidden="true">
                ·
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
