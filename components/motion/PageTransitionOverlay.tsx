'use client'

import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { gsap } from 'gsap'
import Logo from '@/components/ui/Logo'
import { AbstractSkyline } from '@/components/ui/AbstractSkyline'
import { useLenis } from '@/components/motion/LenisProvider'

export function PageTransitionOverlay() {
  const pathname = usePathname()
  const router = useRouter()
  const { resetScroll } = useLenis()

  const panelRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const markRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  // ── helpers ──────────────────────────────────────────────────────────────

  const resetPanel = () => {
    const panel = panelRef.current
    const line = lineRef.current
    const mark = markRef.current
    if (!panel || !line || !mark) return
    gsap.set(panel, { y: '100vh' })
    gsap.set(line, { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(mark, { opacity: 0, scale: 0.95, y: 10 })
  }

  const cover = (onDone: () => void) => {
    const panel = panelRef.current
    const line = lineRef.current
    const mark = markRef.current
    if (!panel || !line || !mark) {
      onDone()
      return
    }

    if (tlRef.current) tlRef.current.kill()
    resetPanel()

    const tl = gsap.timeline({ onComplete: onDone, defaults: { ease: 'expo.inOut' } })
    tlRef.current = tl

    tl.to(panel, { y: '0vh', duration: 0.28 })
    tl.to(line, { scaleX: 1, duration: 0.22, ease: 'power3.out' }, '-=0.12')
    tl.to(mark, { opacity: 1, scale: 1, y: 0, duration: 0.18, ease: 'back.out(1.5)' }, '-=0.16')
  }

  const reveal = () => {
    const panel = panelRef.current
    const line = lineRef.current
    const mark = markRef.current
    if (!panel || !line || !mark) return

    if (tlRef.current) tlRef.current.kill()

    const tl = gsap.timeline({ defaults: { ease: 'expo.inOut' } })
    tlRef.current = tl

    tl.to(mark, { opacity: 0, scale: 1.05, y: -10, duration: 0.14, ease: 'power2.in' })
    tl.to(line, { scaleX: 0, transformOrigin: 'right center', duration: 0.16, ease: 'power3.in' }, '-=0.08')
    tl.to(panel, { y: '-100vh', duration: 0.32 }, '-=0.12')
  }

  // ── intercept all internal link clicks (capture phase) ───────────────────
  // Runs BEFORE Next.js's own router handler, so we own the navigation timing.
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a') as HTMLAnchorElement | null
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href || !href.startsWith('/')) return // skip external / hash
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return
      if (anchor.getAttribute('target') === '_blank') return

      // Skip same-pathname navigations (query-param-only changes like ?tab=)
      // — the overlay's reveal() watches pathname, so it would never fire and the
      // panel would cover the screen permanently.
      const targetPathname = new URL(href, window.location.origin).pathname
      if (targetPathname === pathnameRef.current) return

      // Stop the browser AND Next.js from navigating immediately
      e.preventDefault()
      e.stopPropagation()

      // 1. Cover screen → 2. Reset scroll (Lenis-aware, so it can't fight back
      // on the next raf tick) → 3. Navigate (new page renders behind panel, already at the top)
      cover(() => {
        resetScroll()
        router.push(href)
      })
    }

    document.addEventListener('click', handleClick, true) // capture = fires first
    return () => document.removeEventListener('click', handleClick, true)
  }, [router, resetScroll]) // eslint-disable-line react-hooks/exhaustive-deps

  // ── reveal once the new page is in the DOM ───────────────────────────────
  // Track current pathname in a ref so the click handler always has the latest value
  const pathnameRef = useRef(pathname)
  useEffect(() => {
    pathnameRef.current = pathname
  }, [pathname])

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
      className="fixed inset-0 z-[300] pointer-events-none flex items-center justify-center overflow-hidden bg-white"
      style={{ transform: 'translateY(100vh)' }}
      aria-hidden="true"
    >
      {/* Abstract skyline horizon */}
      <AbstractSkyline className="pointer-events-none absolute inset-x-0 bottom-0 h-[80px] w-full text-teal/[0.14] sm:h-[110px]" />

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

      {/* Brand mark and Text */}
      <div
        ref={markRef}
        className="relative z-10 flex flex-col items-center gap-6"
        style={{ opacity: 0, transform: 'translateY(16px)' }}
      >
        <div className="relative flex items-center justify-center animate-pulse">
          <Logo light={true} className="relative h-24 w-auto" />
        </div>

        <span className="font-body text-[13px] font-semibold uppercase tracking-[0.22em] text-ink/70">
          Engineering Excellence...
        </span>
      </div>
    </div>
  )
}
