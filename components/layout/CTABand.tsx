'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { SlideIn } from '@/components/motion/SlideIn'

type Props = {
  title?: string
  subtitle?: string
  btnLabel?: string
  btnHref?: string
}

export function CTABand({
  title = "Ready to build? Let's talk.",
  subtitle = 'Tell us about your project and we will respond within one business day.',
  btnLabel = 'Start your project',
  btnHref = '/contact',
}: Props) {
  return (
    <section className="relative overflow-hidden bg-teal text-white py-16 lg:py-20">
      {/* Animated background blobs */}
      <motion.div
        className="absolute -left-24 -top-24 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)' }}
        animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(12,122,136,0.5), transparent 70%)' }}
        animate={{ x: [0, -18, 0], y: [0, 12, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        aria-hidden="true"
      />

      {/* Diagonal dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-container mx-auto px-gutter">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <SlideIn from="left" className="text-center lg:text-left">
            <h2 className="font-display text-headline-md text-white">{title}</h2>
            <p className="mt-3 font-body text-body-lg text-white/75 max-w-lg">{subtitle}</p>
          </SlideIn>

          <SlideIn from="right" delay={0.1} className="shrink-0">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} transition={{ type: 'spring', stiffness: 300, damping: 18 }}>
              <Link
                href={btnHref}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-teal font-body text-label-md uppercase tracking-wider rounded-full whitespace-nowrap transition-shadow duration-300 hover:shadow-[0_8px_32px_rgba(255,255,255,0.25)]"
              >
                {btnLabel}
                <motion.svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  aria-hidden="true"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </motion.svg>
              </Link>
            </motion.div>
          </SlideIn>
        </div>
      </div>
    </section>
  )
}
