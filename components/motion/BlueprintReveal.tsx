'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function BlueprintReveal({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const gridRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid    = gridRef.current
    const trigger = wrapperRef.current
    if (!grid || !trigger || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.to(grid, {
      opacity: 0,
      scrollTrigger: {
        trigger,
        start: 'top 55%',
        end:   'center center',
        scrub: 1.5,
      },
    })
  }, [])

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      {/* Blueprint grid overlay — fades out as section enters view */}
      <div
        ref={gridRef}
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: [
            'linear-gradient(rgba(22,168,184,0.10) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(22,168,184,0.10) 1px, transparent 1px)',
            'linear-gradient(rgba(22,168,184,0.035) 1px, transparent 1px)',
            'linear-gradient(90deg, rgba(22,168,184,0.035) 1px, transparent 1px)',
          ].join(', '),
          backgroundSize: '80px 80px, 80px 80px, 20px 20px, 20px 20px',
        }}
      />
      <div className="relative z-20">{children}</div>
    </div>
  )
}
