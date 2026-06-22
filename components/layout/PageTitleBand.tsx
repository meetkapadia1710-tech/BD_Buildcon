'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { SlideIn } from '@/components/motion/SlideIn'
import { FadeRiseItem } from '@/components/motion/FadeRise'

type Crumb = { label: string; href?: string }
type Props  = { title: string; breadcrumbs?: Crumb[]; description?: string }

export function PageTitleBand({ title, breadcrumbs = [], description }: Props) {
  const crumbs: Crumb[] = [{ label: 'Home', href: '/' }, ...breadcrumbs]

  return (
    <section
      className="relative overflow-hidden py-16 lg:py-24"
      style={{
        background: 'linear-gradient(135deg, #1F2124 0%, #2a3035 55%, #0f2a30 100%)',
      }}
    >
      {/* Teal accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-teal via-teal-deep to-transparent" />

      {/* Subtle dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, #16A8B8 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
        aria-hidden="true"
      />

      {/* Teal glow blob */}
      <div
        className="absolute -right-32 -top-32 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #16A8B8, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-container mx-auto px-6">
        {/* Breadcrumb */}
        <SlideIn from="left" delay={0}>
          <nav aria-label="Breadcrumb" className="mb-5">
            <ol className="flex flex-wrap items-center gap-2 font-body text-sm text-white/50">
              {crumbs.map((crumb, i) => (
                <li key={i} className="flex items-center gap-2">
                  {i > 0 && (
                    <svg className="w-3 h-3 text-teal/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  )}
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-teal transition-colors duration-200">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white/80 font-medium" aria-current="page">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </SlideIn>

        {/* Title */}
        <FadeRiseItem>
          <h1 className="font-display text-headline-lg lg:text-display-sm text-white leading-tight">
            {title}
          </h1>
          {/* Animated teal rule */}
          <motion.span
            className="block h-[3px] bg-gradient-to-r from-teal to-teal-deep rounded-full mt-4"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: '56px', transformOrigin: 'left' }}
          />
        </FadeRiseItem>

        {/* Description */}
        {description && (
          <FadeRiseItem delay={0.15}>
            <p className="mt-4 font-body text-body-lg text-white/65 max-w-2xl leading-relaxed">
              {description}
            </p>
          </FadeRiseItem>
        )}
      </div>
    </section>
  )
}
