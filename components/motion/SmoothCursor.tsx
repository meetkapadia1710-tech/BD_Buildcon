'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export function SmoothCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Touch / coarse-pointer devices get the native cursor
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Place off-screen until first mousemove
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -200, y: -200 })

    // quickTo is the most performant way to drive repeated position updates
    const dotX  = gsap.quickTo(dot,  'x', { duration: 0.1,  ease: 'none' })
    const dotY  = gsap.quickTo(dot,  'y', { duration: 0.1,  ease: 'none' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.55, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.55, ease: 'power3.out' })

    const onMove = (e: MouseEvent) => {
      if (!show) setShow(true)
      dotX(e.clientX);  dotY(e.clientY)
      ringX(e.clientX); ringY(e.clientY)
    }

    // Event delegation — works for dynamically added elements
    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('a, button, [role="button"], label')
      if (!el) return
      gsap.to(ring, { scale: 1.65, borderColor: '#16A8B8', backgroundColor: 'rgba(22,168,184,0.10)', duration: 0.3, ease: 'power2.out' })
      gsap.to(dot,  { scale: 0.4, duration: 0.2 })
    }

    const onOut = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('a, button, [role="button"], label')
      if (!el) return
      gsap.to(ring, { scale: 1, borderColor: 'rgba(22,168,184,0.45)', backgroundColor: 'transparent', duration: 0.35, ease: 'power2.out' })
      gsap.to(dot,  { scale: 1, duration: 0.25 })
    }

    // Grow ring when hovering images / cards for a "view" feel
    const onOverImage = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('img, [data-cursor-view]')
      if (!el) return
      gsap.to(ring, { scale: 2.2, borderColor: '#16A8B8', borderWidth: '1px', duration: 0.4, ease: 'power2.out' })
    }

    const onOutImage = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('img, [data-cursor-view]')
      if (!el) return
      gsap.to(ring, { scale: 1, borderColor: 'rgba(22,168,184,0.45)', borderWidth: '1px', duration: 0.35, ease: 'power2.out' })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout',  onOut)
    document.addEventListener('mouseover', onOverImage)
    document.addEventListener('mouseout',  onOutImage)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout',  onOut)
      document.removeEventListener('mouseover', onOverImage)
      document.removeEventListener('mouseout',  onOutImage)
    }
  }, [show])

  return (
    <>
      {/* Inner dot — snappy */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[600] pointer-events-none rounded-full bg-teal"
        style={{
          width: 7,
          height: 7,
          opacity: show ? 1 : 0,
          transition: 'opacity 0.3s',
          willChange: 'transform',
        }}
      />
      {/* Outer ring — lagging */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 z-[600] pointer-events-none rounded-full"
        style={{
          width: 38,
          height: 38,
          border: '1px solid rgba(22,168,184,0.45)',
          opacity: show ? 1 : 0,
          transition: 'opacity 0.3s',
          willChange: 'transform',
        }}
      />
    </>
  )
}
