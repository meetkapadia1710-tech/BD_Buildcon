'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { gsap } from 'gsap'

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
    gsap.set(mark,  { opacity: 0, y: 16 })
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

    // Panel slides up from below
    tl.to(panel, { y: '0vh', duration: 0.65 })
    // Laser line draws left → right
    tl.to(line, { scaleX: 1, duration: 0.45, ease: 'power3.out' }, '-=0.2')
    // Brand mark rises in
    tl.to(mark, { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }, '-=0.25')
  }

  const reveal = () => {
    const panel = panelRef.current
    const line  = lineRef.current
    const mark  = markRef.current
    if (!panel || !line || !mark) return

    if (tlRef.current) tlRef.current.kill()

    const tl = gsap.timeline({ defaults: { ease: 'expo.inOut' } })
    tlRef.current = tl

    // Mark fades out
    tl.to(mark, { opacity: 0, y: -12, duration: 0.25, ease: 'power2.in' })
    // Line retracts right → left
    tl.to(line, { scaleX: 0, transformOrigin: 'right center', duration: 0.3, ease: 'power3.in' }, '-=0.1')
    // Panel sweeps away upward
    tl.to(panel, { y: '-100vh', duration: 0.65 }, '-=0.15')
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
      className="fixed inset-0 z-[300] pointer-events-none flex items-center justify-center"
      style={{ backgroundColor: '#111416', transform: 'translateY(100vh)' }}
      aria-hidden="true"
    >
      {/* Laser-level rule — teal horizontal line */}
      <div
        ref={lineRef}
        className="absolute left-0 right-0"
        style={{
          top: '50%',
          height: '1px',
          transform: 'scaleX(0)',
          backgroundColor: '#16A8B8',
          boxShadow: '0 0 10px rgba(22,168,184,0.55)',
        }}
      />

      {/* Brand mark */}
      <div
        ref={markRef}
        className="relative z-10 flex flex-col items-center gap-5"
        style={{ opacity: 0, transform: 'translateY(16px)' }}
      >
        {/* Icon */}
        <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#16A8B8' }}>
          <svg viewBox="0 0 36 36" className="w-9 h-9" aria-hidden="true">
            <rect x="4"  y="4"  width="6"  height="28" rx="1" fill="white" />
            <rect x="4"  y="4"  width="14" height="6"  rx="1" fill="white" />
            <rect x="4"  y="15" width="13" height="5"  rx="1" fill="white" />
            <rect x="4"  y="26" width="14" height="6"  rx="1" fill="white" />
            <rect x="21" y="4"  width="6"  height="28" rx="1" fill="white" opacity="0.5" />
            <rect x="21" y="4"  width="11" height="5"  rx="1" fill="white" opacity="0.5" />
            <rect x="21" y="27" width="11" height="5"  rx="1" fill="white" opacity="0.5" />
          </svg>
        </div>

        {/* Wordmark */}
        <div className="flex flex-col items-center gap-1.5">
          <span className="font-display font-bold" style={{ fontSize: '18px', color: 'white', letterSpacing: '-0.02em' }}>
            BD Buildcon <span style={{ color: '#16A8B8' }}>LLP</span>
          </span>
          <span className="font-body uppercase" style={{ fontSize: '9px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.22em' }}>
            Industrial EPC Contractor
          </span>
        </div>
      </div>
    </div>
  )
}
