'use client'

import { useEffect, useState } from 'react'
import Logo from '@/components/ui/Logo'

/** Never flash by: hold the splash at least this long. */
const MIN_VISIBLE_MS = 700
/** Never hang: dismiss no later than this, even if `load` never fires. */
const MAX_VISIBLE_MS = 3000
/** Must match the leave transition duration below. */
const LEAVE_MS = 620

/**
 * Branded splash shown once, on the very first paint. Client-side navigation
 * is handled by the route-level skeleton in app/loading.tsx instead — this
 * component is mounted in the root layout so it never remounts on a route change.
 *
 * Every animated property here is `transform` or `opacity` so the whole splash
 * stays on the compositor; nothing triggers layout or paint per frame.
 */
export function InitialLoader() {
  const [progress, setProgress] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const start = performance.now()
    const pending: number[] = []
    let finished = false

    // Ease toward 90% while the document loads, then snap to 100 on `load`.
    const creep = window.setInterval(() => {
      setProgress((p) => (p >= 90 ? p : p + (90 - p) * 0.12 + 0.8))
    }, 120)

    const finish = () => {
      if (finished) return
      finished = true
      window.clearInterval(creep)
      setProgress(100)

      const wait = Math.max(0, MIN_VISIBLE_MS - (performance.now() - start))
      pending.push(
        window.setTimeout(() => {
          setLeaving(true)
          pending.push(window.setTimeout(() => setDone(true), LEAVE_MS))
        }, wait),
      )
    }

    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish)

    const cap = window.setTimeout(finish, MAX_VISIBLE_MS)

    return () => {
      window.clearInterval(creep)
      window.clearTimeout(cap)
      window.removeEventListener('load', finish)
      pending.forEach(window.clearTimeout)
    }
  }, [])

  // Hold the page still underneath while the splash is up.
  useEffect(() => {
    if (done) return
    const { style } = document.documentElement
    const prev = style.overflow
    style.overflow = 'hidden'
    return () => {
      style.overflow = prev
    }
  }, [done])

  if (done) return null

  const pct = Math.min(100, Math.round(progress))

  return (
    <div
      id="initial-loader"
      role="status"
      aria-live="polite"
      aria-busy={!leaving}
      className={`fixed inset-0 z-[400] grid place-items-center overflow-hidden bg-[#0B1114] transition-[opacity,transform] duration-[620ms] ease-[cubic-bezier(0.4,0,0.2,1)] will-change-[opacity,transform] ${
        leaving ? 'pointer-events-none scale-[1.04] opacity-0' : 'scale-100 opacity-100'
      }`}
    >
      <span className="sr-only">Loading BD Buildcon — {pct}%</span>

      {/* ── Ambient aurora ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="animate-aurora-a absolute left-[22%] top-[28%] h-[46vmax] w-[46vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[90px] will-change-transform motion-reduce:animate-none"
          style={{ background: 'radial-gradient(circle, rgba(22,168,184,0.55), transparent 65%)' }}
        />
        <div
          className="animate-aurora-b absolute left-[78%] top-[66%] h-[40vmax] w-[40vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[100px] will-change-transform motion-reduce:animate-none"
          style={{ background: 'radial-gradient(circle, rgba(91,214,226,0.34), transparent 65%)' }}
        />
        <div
          className="animate-aurora-a absolute left-[62%] top-[16%] h-[26vmax] w-[26vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[110px] will-change-transform motion-reduce:animate-none"
          style={{
            background: 'radial-gradient(circle, rgba(253,185,19,0.22), transparent 60%)',
            animationDelay: '-8s',
          }}
        />
      </div>

      {/* ── Blueprint grid, a whisper of the brand ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #9FE8F0 1px, transparent 1px), linear-gradient(to bottom, #9FE8F0 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 62% 55% at 50% 50%, #000 30%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse 62% 55% at 50% 50%, #000 30%, transparent 78%)',
        }}
        aria-hidden="true"
      />

      {/* ── Vignette ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 35%, rgba(6,10,12,0.72) 100%)' }}
        aria-hidden="true"
      />

      {/* ── Glass card ── */}
      <div className="animate-splash-in relative z-10 w-[min(370px,86vw)] motion-reduce:animate-none">
        <div className="relative overflow-hidden rounded-[24px] border border-white/[0.12] bg-white/[0.055] px-[28px] py-[32px] shadow-[0_30px_90px_-24px_rgba(0,0,0,0.8)] backdrop-blur-2xl sm:px-[34px] sm:py-[38px]">
          {/* Top inner highlight — the tell of real glass */}
          <span
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"
            aria-hidden="true"
          />
          {/* Sheen sweep */}
          <span
            className="animate-glass-sheen pointer-events-none absolute inset-y-0 left-0 w-[38%] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent will-change-transform motion-reduce:hidden"
            aria-hidden="true"
          />

          <div className="relative flex flex-col items-center">
            <Logo className="h-[58px] w-auto sm:h-[66px]" />

            <span className="mt-[24px] h-px w-full bg-white/[0.10]" aria-hidden="true" />

            {/* Progress — scaleX keeps this off the layout path */}
            <div className="mt-[24px] w-full">
              <div className="relative h-[2px] w-full overflow-hidden rounded-pill bg-white/[0.13]">
                <span
                  className="absolute inset-0 origin-left rounded-pill bg-gradient-to-r from-teal to-teal-light transition-transform duration-500 ease-out will-change-transform"
                  style={{ transform: `scaleX(${pct / 100})`, boxShadow: '0 0 12px rgba(22,168,184,0.6)' }}
                  aria-hidden="true"
                />
              </div>

              <div className="mt-[15px] flex items-baseline justify-between">
                <span className="font-body text-[10.5px] font-semibold uppercase tracking-[0.22em] text-white/40">
                  Building your experience
                </span>
                <span className="font-body text-[12px] font-semibold tabular-nums text-white/70">{pct}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
