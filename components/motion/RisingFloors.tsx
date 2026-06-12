'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export interface StatFloor {
  value: number
  suffix: string
  label: string
  /** Visual bar height as a percentage (0-100). Independent of value. */
  heightPct: number
}

export function RisingFloors({
  stats,
  className = '',
}: {
  stats: StatFloor[]
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const barsRef      = useRef<(HTMLDivElement | null)[]>([])
  const numsRef      = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      barsRef.current.forEach((bar, i) => {
        if (bar) bar.style.height = `${stats[i].heightPct}%`
      })
      numsRef.current.forEach((num, i) => {
        if (num) num.textContent = `${stats[i].value}${stats[i].suffix}`
      })
      return
    }

    barsRef.current.forEach((bar) => { if (bar) bar.style.height = '0%' })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    })

    stats.forEach((stat, i) => {
      const bar = barsRef.current[i]
      const num = numsRef.current[i]

      if (bar) {
        tl.to(bar, { height: `${stat.heightPct}%`, duration: 1.5, ease: 'power3.out' }, i * 0.12)
      }

      if (num && stat.value > 0) {
        const counter = { val: 0 }
        tl.to(
          counter,
          {
            val: stat.value,
            duration: 1.5,
            ease: 'power3.out',
            onUpdate() {
              if (num) num.textContent = `${Math.round(counter.val)}${stat.suffix}`
            },
          },
          i * 0.12
        )
      } else if (num) {
        num.textContent = `${stat.value}${stat.suffix}`
      }
    })

    return () => { tl.kill() }
  }, [stats])

  return (
    <div ref={containerRef} className={className}>
      <div className="flex items-end justify-center gap-5 sm:gap-10">
        {stats.map((stat, i) => (
          <div key={stat.label} className="flex flex-col items-center gap-4">
            {/* Animated number */}
            <span
              ref={(el) => { numsRef.current[i] = el }}
              className="font-display font-extrabold text-display-lg text-white leading-none tabular-nums"
            >
              0{stat.suffix}
            </span>

            {/* Floor-stack bar */}
            <div className="relative w-16 sm:w-20 h-44 sm:h-52">
              {/* Empty track */}
              <div className="absolute inset-0 bg-white/5 rounded-sm" />

              {/* Horizontal guide lines at each third */}
              {[33, 66].map((pct) => (
                <div
                  key={pct}
                  className="absolute left-0 right-0 border-t border-dashed border-white/10 z-10"
                  style={{ bottom: `${pct}%` }}
                />
              ))}

              {/* Rising bar — animates from bottom up */}
              <div
                ref={(el) => { barsRef.current[i] = el }}
                className="absolute bottom-0 left-0 right-0 rounded-sm overflow-hidden"
                style={{ height: '0%' }}
              >
                {/* Fill */}
                <div className="absolute inset-0 bg-white/20" />
                {/* Gradient shimmer */}
                <div className="absolute inset-0 bg-gradient-to-t from-teal/25 to-transparent" />
                {/* Floor separators inside the bar */}
                {[33, 66].map((pct) => (
                  <div
                    key={pct}
                    className="absolute left-0 right-0 h-px bg-white/15"
                    style={{ bottom: `${pct}%` }}
                  />
                ))}
                {/* Teal cap — the "slab" on top */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-teal" />
              </div>
            </div>

            {/* Label */}
            <span className="font-body text-[10px] sm:text-label-md uppercase tracking-wider text-white/60 text-center max-w-[72px]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
