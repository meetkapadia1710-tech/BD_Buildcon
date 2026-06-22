'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { gsap } from 'gsap'
import Logo from '@/components/ui/Logo'

export function PageTransitionOverlay() {
  const pathname = usePathname()
  const router   = useRouter()

  const panelRef = useRef<HTMLDivElement>(null)
  const lineRef  = useRef<HTMLDivElement>(null)
  const markRef  = useRef<HTMLDivElement>(null)
  const tlRef    = useRef<gsap.core.Timeline | null>(null)

  // ── helpers ──────────────────────────────────────────────────────────────

  const resetPanel = () => {
    const panel = panelRef.current
    const line  = lineRef.current
    const mark  = markRef.current
    if (!panel || !line || !mark) return
    gsap.set(panel, { y: '100vh' })
    gsap.set(line,  { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(mark,  { opacity: 0, scale: 0.95, y: 10 })
  }

  const cover = (onDone: () => void) => {
    const panel = panelRef.current
    const line  = lineRef.current
    const mark  = markRef.current
    if (!panel || !line || !mark) { onDone(); return }

    if (tlRef.current) tlRef.current.kill()
    resetPanel()

    const tl = gsap.timeline({ onComplete: onDone, defaults: { ease: 'expo.inOut' } })
    tlRef.current = tl

    tl.to(panel, { y: '0vh', duration: 0.45 })
    tl.to(line,  { scaleX: 1, duration: 0.35, ease: 'power3.out' }, '-=0.15')
    tl.to(mark,  { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'back.out(1.5)' }, '-=0.2')
  }

  const reveal = () => {
    const panel = panelRef.current
    const line  = lineRef.current
    const mark  = markRef.current
    if (!panel || !line || !mark) return

    if (tlRef.current) tlRef.current.kill()

    const tl = gsap.timeline({ defaults: { ease: 'expo.inOut' } })
    tlRef.current = tl

    tl.to(mark,  { opacity: 0, scale: 1.05, y: -10, duration: 0.22, ease: 'power2.in' })
    tl.to(line,  { scaleX: 0, transformOrigin: 'right center', duration: 0.25, ease: 'power3.in' }, '-=0.1')
    tl.to(panel, { y: '-100vh', duration: 0.45 }, '-=0.15')
  }

  // ── intercept all internal link clicks (capture phase) ───────────────────
  // Runs BEFORE Next.js's own router handler, so we own the navigation timing.
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a') as HTMLAnchorElement | null
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href || !href.startsWith('/')) return   // skip external / hash
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return
      if (anchor.getAttribute('target') === '_blank') return

      // Stop the browser AND Next.js from navigating immediately
      e.preventDefault()
      e.stopPropagation()

      // 1. Cover screen → 2. Navigate (new page renders behind panel)
      cover(() => router.push(href))
    }

    document.addEventListener('click', handleClick, true) // capture = fires first
    return () => document.removeEventListener('click', handleClick, true)
  }, [router]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── reveal once the new page is in the DOM ───────────────────────────────
  const isFirstMount = useRef(true)
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }
    // Small wait lets React commit the new page's DOM before the panel lifts
    const id = setTimeout(reveal, 60)
    return () => clearTimeout(id)
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-[300] pointer-events-none flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#0e1011', transform: 'translateY(100vh)' }}
      aria-hidden="true"
    >
      {/* Soft radial glow */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-20 filter blur-[80px]"
        style={{
          background: 'radial-gradient(circle, #16A8B8 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Sleek loading bar at the top of the viewport */}
      <div
        ref={lineRef}
        className="absolute top-0 left-0 right-0"
        style={{
          height: '3px',
          transform: 'scaleX(0)',
          transformOrigin: 'left center',
          backgroundColor: '#16A8B8',
          boxShadow: '0 1px 10px rgba(22,168,184,0.6)',
        }}
      />

      {/* Brand mark */}
      <div
        ref={markRef}
        className="relative z-10 flex flex-col items-center"
        style={{ opacity: 0, transform: 'translateY(16px)' }}
      >
        <Logo light={false} className="h-24 w-auto" />
      </div>
    </div>
  )
}
