'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import { services } from '@/content/services'

const EASE = [0.16, 1, 0.3, 1] as const

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  return isMobile
}

function ServiceCopy({ svc, index }: { svc: (typeof services)[number]; index: number }) {
  return (
    <>
      <div className="flex items-center gap-[12px] mb-[16px]">
        <span className="font-body text-[11px] font-bold text-teal bg-teal/5 px-[10px] py-[4px] rounded-[4px] border border-teal/15 tracking-[0.05em]">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="font-body text-[11px] tracking-[0.15em] uppercase text-body font-semibold">Service</span>
      </div>
      <h3 className="font-display font-bold text-[24px] sm:text-[30px] tracking-[-0.01em] text-ink mb-[12px] sm:mb-[16px]">
        {svc.title}
      </h3>
      <p className="text-[15px] sm:text-[17px] leading-[1.7] text-body mb-[20px] sm:mb-[24px]">{svc.description}</p>
      <ul className="flex flex-col gap-[8px] mb-[24px] sm:mb-[32px]">
        {svc.bullets.slice(0, 4).map((b, bi) => (
          <li key={bi} className="flex items-start gap-[10px] text-[14px] sm:text-[15px] text-body">
            <span className="text-teal mt-[3px] shrink-0">✓</span>
            {b}
          </li>
        ))}
      </ul>
      <Link
        href="/projects"
        className="inline-flex items-center gap-[8px] text-[13px] font-semibold uppercase tracking-[0.1em] text-teal hover:text-[#0E8C9B] transition-colors duration-200"
      >
        View projects
        <span className="text-[16px]">→</span>
      </Link>
    </>
  )
}

export function ServicesScroll() {
  const ref = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [active, setActive] = useState(0)
  const isMobile = useIsMobile()
  const shouldReduce = useReducedMotion()

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  useEffect(() => {
    setMounted(true)
  }, [])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(services.length - 1, Math.floor(v * services.length))
    setActive(idx)
  })

  const reduce = mounted ? !!shouldReduce : false

  // ── Reduced motion / mobile fallback — plain stacked rows, no pin ──
  if (reduce || isMobile) {
    return (
      <div className="max-w-container mx-auto px-gutter pb-[72px] sm:pb-[96px]">
        <div className="flex flex-col gap-[48px] sm:gap-[64px]">
          {services.map((svc, idx) => {
            const isReversed = idx % 2 !== 0
            return (
              <div
                key={svc.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-[24px] lg:gap-[56px] items-center${
                  idx > 0 ? ' pt-[48px] sm:pt-[64px] border-t border-hairline' : ''
                }`}
              >
                <div
                  className={`relative w-full aspect-[16/10] rounded-card overflow-hidden bg-dark-bg${
                    isReversed ? ' lg:order-2' : ''
                  }`}
                >
                  <Image
                    src={svc.image}
                    alt={svc.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className={isReversed ? 'lg:order-1' : ''}>
                  <ServiceCopy svc={svc} index={idx} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const svc = services[active]

  return (
    <div ref={ref} className="relative" style={{ height: '280vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <div className="w-full max-w-container mx-auto px-gutter grid grid-cols-1 lg:grid-cols-2 gap-[56px] items-center">
          {/* Photo — crossfades between services */}
          <div className="relative w-full aspect-[16/10] rounded-card overflow-hidden bg-dark-bg">
            <AnimatePresence mode="wait">
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="absolute inset-0"
              >
                <Image src={svc.image} alt={svc.title} fill className="object-cover" sizes="50vw" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Copy — crossfades between services */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <ServiceCopy svc={svc} index={active} />
              </motion.div>
            </AnimatePresence>

            {/* Progress indicator */}
            <div className="flex items-center gap-[8px] mt-[32px]" aria-hidden="true">
              {services.map((s, i) => (
                <div
                  key={s.id}
                  className="h-[4px] rounded-[2px] transition-all duration-300"
                  style={{
                    width: i === active ? 32 : 16,
                    background: i === active ? '#16A8B8' : i < active ? 'rgba(22,168,184,0.4)' : '#E5E7E8',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
