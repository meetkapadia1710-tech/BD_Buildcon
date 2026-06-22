'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Props = {
  children: React.ReactNode
  className?: string
  /** distance in px to shift vertically on scroll (negative = up) */
  yRange?: number
  /** distance in px to shift horizontally on scroll */
  xRange?: number
  /** scrub factor: true = 1, or a number for smoothing */
  scrub?: number | boolean
}

/**
 * Wraps children in a parallax container.
 * The element drifts through `yRange` px (vertically) or `xRange` px (horizontally)
 * as the viewport scrolls past it — creating depth without layout shift.
 */
export function ParallaxLayer({
  children,
  className = '',
  yRange = -60,
  xRange = 0,
  scrub = 1.2,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub,
      },
    })

    if (yRange !== 0) tl.fromTo(el, { y: yRange * -0.5 }, { y: yRange * 0.5, ease: 'none' })
    if (xRange !== 0) tl.fromTo(el, { x: xRange * -0.5 }, { x: xRange * 0.5, ease: 'none' }, '<')

    return () => { tl.kill() }
  }, [yRange, xRange, scrub])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
