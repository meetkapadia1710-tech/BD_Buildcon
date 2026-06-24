'use client'

import { useEffect, useRef, createContext, useContext } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ── Context ──────────────────────────────────────────────────── */
type LenisContextValue = {
  scrollTo: (target: string | HTMLElement | number, opts?: { offset?: number; duration?: number }) => void
}

const LenisContext = createContext<LenisContextValue>({
  scrollTo: () => {},
})

export function useLenis() {
  return useContext(LenisContext)
}

/* ── Provider ─────────────────────────────────────────────────── */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

  // Scroll to top on every page navigation while the transition overlay covers the screen
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true } as Parameters<Lenis['scrollTo']>[1])
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
  }, [pathname])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const rafCallback = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(rafCallback)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      lenisRef.current = null
      gsap.ticker.remove(rafCallback)
    }
  }, [])

  const scrollTo: LenisContextValue['scrollTo'] = (target, opts = {}) => {
    const lenis = lenisRef.current
    if (!lenis) {
      // Fallback: native scroll
      if (typeof target === 'string') {
        const el = document.querySelector(target)
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      return
    }
    lenis.scrollTo(target as string, {
      offset: opts.offset ?? -80,
      duration: opts.duration ?? 1.4,
      easing: (t: number) => 1 - Math.pow(1 - t, 4), // quartic ease-out
    })
  }

  return <LenisContext.Provider value={{ scrollTo }}>{children}</LenisContext.Provider>
}
