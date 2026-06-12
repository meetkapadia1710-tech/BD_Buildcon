'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.set(bar, { scaleX: 0, transformOrigin: 'left center' })

    ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.25,
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress })
      },
    })
  }, [])

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[500] h-[2px] pointer-events-none"
      aria-hidden="true"
    >
      <div
        ref={barRef}
        className="h-full origin-left"
        style={{
          background: 'linear-gradient(90deg, #16A8B8, #0E8C9B)',
          boxShadow: '0 0 6px rgba(22,168,184,0.5)',
          transform: 'scaleX(0)',
        }}
      />
    </div>
  )
}
