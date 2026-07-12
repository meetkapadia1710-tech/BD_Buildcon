'use client'

import React, { useRef, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion'

// Load the WebGL canvas only on the client — three.js cannot run during SSR
const BuildingTowerWebGL = dynamic(() => import('./BuildingTowerWebGL'), { ssr: false })

const EASE = [0.16, 1, 0.3, 1]

const stages = [
  {
    n: '01',
    label: 'Foundation',
    title: 'Groundwork & foundations',
    desc: 'Piling, excavation and RCC footings — establishing the load path that every floor above depends on.',
  },
  {
    n: '02',
    label: 'Structure',
    title: 'Structural frame',
    desc: 'RCC framing and heavy structural steel rise floor by floor, set out to controlled tolerances.',
  },
  {
    n: '03',
    label: 'Envelope',
    title: 'Cladding & envelope',
    desc: 'Pre-engineered cladding, roofing and façade seal the building against the elements.',
  },
  {
    n: '04',
    label: 'Services',
    title: 'Mechanical, electrical & plumbing',
    desc: 'Coordinated MEP packages are threaded through the live frame, integrated with the civil program.',
  },
  {
    n: '05',
    label: 'Handover',
    title: 'Commissioning & handover',
    desc: 'Finishing, testing and a snag-free, documented handover — delivered safely and on schedule.',
  },
]

const STAGE_BANDS = [0, 0.18, 0.45, 0.64, 0.82]

function useBreakpoint() {
  const [width, setWidth] = useState(1280)

  useEffect(() => {
    setWidth(window.innerWidth)
    const handler = () => setWidth(window.innerWidth)
    window.addEventListener('resize', handler, { passive: true })
    return () => window.removeEventListener('resize', handler)
  }, [])

  return {
    isMobile: width < 768,
    isTablet: width < 1024,
    isDesktop: width >= 1024,
  }
}

interface EyebrowProps {
  children: React.ReactNode
  index?: string
  tone?: 'auto' | 'light'
}

function Eyebrow({ children, index, tone = 'auto' }: EyebrowProps) {
  const color = tone === 'light' ? 'rgba(255,255,255,0.6)' : '#6B7177'
  return (
    <div
      className="flex items-center gap-[10px] font-body text-[11px] font-medium tracking-[0.18em] uppercase"
      style={{ color }}
    >
      {index && <span className="text-teal font-semibold">{index}</span>}
      {index && <span className="text-body text-[10px]">—</span>}
      <span>{children}</span>
    </div>
  )
}

export function BuildingScroll() {
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [stage, setStage] = useState(0)
  const [pct, setPct] = useState(0)

  const { isMobile } = useBreakpoint()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const staticProgress = useMotionValue(1)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    let idx = 0
    for (let i = 0; i < STAGE_BANDS.length; i++) {
      if (v >= STAGE_BANDS[i]) idx = i
    }
    setStage(idx)
    setPct(Math.max(0, Math.min(100, Math.round((v / 0.85) * 100))))
  })

  const active = stages[stage]
  const reduce = mounted ? !!shouldReduce : false

  // ── Reduced motion fallback ──
  if (reduce) {
    return (
      <section className="bg-white py-20 lg:py-28">
        <div className="container-max mx-auto px-6">
          <Eyebrow index="PROCESS">How we build</Eyebrow>
          <h2 className="font-display font-extrabold text-[32px] md:text-[40px] text-ink tracking-tight mt-[18px] mb-[48px]">
            From the ground to handover.
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1fr] gap-[64px] items-center">
            <div className="h-[52vh]">
              <BuildingTowerWebGL progress={staticProgress} isMobile={isMobile} paused />
            </div>
            <ol className="m-0 p-0">
              {stages.map((s) => (
                <li key={s.n} className="flex gap-[18px] py-[16px] border-t border-hairline">
                  <span className="font-body text-[13px] text-teal font-semibold">{s.n}</span>
                  <div>
                    <div className="font-display font-bold text-[18px] text-ink">{s.title}</div>
                    <div className="font-body text-[14px] text-body mt-[4px]">{s.desc}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="relative bg-white" style={{ height: isMobile ? '300vh' : '340vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* CAD grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.45] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(22,168,184,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(22,168,184,0.08) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(130% 100% at 28% 65%, #000 38%, transparent 88%)',
            WebkitMaskImage: 'radial-gradient(130% 100% at 28% 65%, #000 38%, transparent 88%)',
          }}
        />

        <div className="relative w-full max-w-container mx-auto px-6 grid grid-cols-1 lg:grid-cols-[0.95fr_1fr] gap-[16px] lg:gap-[96px] items-center h-screen">
          {/* LEFT — WebGL 3D tower (pinned) */}
          <div
            className="relative w-full"
            style={isMobile ? { height: '48vh', marginTop: '76px' } : { height: '80vh' }}
          >
            <BuildingTowerWebGL progress={scrollYProgress} isMobile={isMobile} />
          </div>

          {/* RIGHT — cycling stage text */}
          <div className="relative w-full">
            <div className="mb-[12px] lg:mb-[22px]">
              <Eyebrow index="PROCESS">How we build</Eyebrow>
            </div>

            {/* Construction Progress Bar */}
            <div className="w-full max-w-[360px] mb-[18px] lg:mb-[36px]">
              <div className="flex justify-between items-baseline mb-[8px]">
                <span className="font-body text-[10px] tracking-[0.05em] uppercase text-body">
                  Construction Progress
                </span>
                <span className="font-body text-[12px] text-teal font-bold">{pct}% Built</span>
              </div>
              <div className="w-full h-[4px] bg-hairline rounded-[2px] relative overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 bottom-0 right-0 bg-gradient-to-r from-teal to-[#1ea5fc] origin-left"
                  style={{ scaleX: scrollYProgress }}
                />
              </div>
            </div>

            {/* Stage text animation container */}
            <div className="h-[200px] flex flex-col justify-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -18 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="w-full"
                >
                  {/* Phase Badge and Label */}
                  <div className="flex items-center gap-[12px] mb-[10px] lg:mb-[20px]">
                    <div className="font-body text-[11px] font-bold text-teal bg-teal/5 px-[10px] py-[4px] rounded-[4px] border border-teal/15 tracking-[0.05em]">
                      PHASE {active.n}
                    </div>
                    <span className="font-body text-[11px] tracking-[0.15em] uppercase text-body font-semibold">
                      {active.label}
                    </span>
                  </div>

                  <h2 className="font-display font-extrabold text-[28px] lg:text-[40px] leading-[1.1] tracking-tight text-ink mb-[8px] lg:mb-[16px]">
                    {active.title}
                  </h2>
                  <p className="font-body text-[14px] lg:text-[18px] leading-relaxed text-body max-w-[460px]">
                    {active.desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Connected step track indicator */}
            {isMobile ? (
              <div className="flex gap-[8px] mt-[20px] justify-start">
                {stages.map((s, i) => {
                  const isCurrent = i === stage
                  const isCompleted = i < stage
                  return (
                    <div
                      key={s.n}
                      className="h-[8px] rounded-[4px] transition-all duration-300"
                      style={{
                        width: isCurrent ? 24 : 8,
                        background: isCurrent
                          ? 'var(--teal, #16A8B8)'
                          : isCompleted
                            ? 'rgba(22,168,184,0.4)'
                            : '#E5E7E8',
                      }}
                    />
                  )
                })}
              </div>
            ) : (
              <div className="flex items-center gap-[4px] mt-[40px] flex-wrap">
                {stages.map((s, i) => {
                  const isCurrent = i === stage
                  const isCompleted = i < stage
                  const isActiveOrCompleted = i <= stage

                  return (
                    <div key={s.n} className="flex items-center">
                      <div
                        className="font-body text-[10px] tracking-[0.05em] uppercase px-[12px] py-[6px] rounded-[20px] flex items-center gap-[6px] transition-all duration-300"
                        style={{
                          border: `1px solid ${isCurrent ? '#16A8B8' : isCompleted ? 'rgba(22,168,184,0.2)' : '#E5E7E8'}`,
                          color: isCurrent || isCompleted ? '#16A8B8' : '#828D95',
                          background: isCurrent
                            ? 'rgba(22,168,184,0.08)'
                            : isCompleted
                              ? 'rgba(22,168,184,0.04)'
                              : 'transparent',
                          fontWeight: isActiveOrCompleted ? 600 : 400,
                        }}
                      >
                        {isCompleted && <span className="text-teal font-bold">✓</span>}
                        {isCurrent && <span className="w-[6px] h-[6px] rounded-full bg-teal" />}
                        <span>{s.label}</span>
                      </div>
                      {i < stages.length - 1 && (
                        <div
                          className="w-[12px] h-[1px] mx-[4px] opacity-50"
                          style={{ background: isCompleted ? '#16A8B8' : '#E5E7E8' }}
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            )}

            <div className="mt-[18px] lg:mt-[30px]">
              <Link
                href="/why-us"
                className="inline-flex items-center gap-2 bg-ink text-white hover:bg-ink/90 transition-colors px-6 py-3 border border-transparent rounded-[8px] font-body font-semibold text-sm"
              >
                <span>See our full process</span>
                <span className="text-teal">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
