'use client'

import Image from 'next/image'
import { useState } from 'react'
import { PageTitleBand } from '@/components/layout/PageTitleBand'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { CTABand } from '@/components/layout/CTABand'
import { CountUp } from '@/components/motion/CountUp'
import { SlideIn } from '@/components/motion/SlideIn'
import { StaggerReveal } from '@/components/motion/StaggerReveal'
import { motion, AnimatePresence } from 'framer-motion'
import { TestimonialCard } from '@/components/ui/TestimonialCard'
import { testimonials } from '@/content/testimonials'

const reasons = [
  {
    id: 'size',
    num: '01',
    label: 'Company Size',
    heading: 'Scale that delivers.',
    body: 'A large-scale turnkey contracting company focused on safety, quality and timely completion. Our size and owned resources ensure projects finish within the deadline — without dependency on third-party subcontractors for critical works.',
    bullets: [
      'Owned plant, cranes and heavy machinery — no rental delays',
      'In-house specialist teams for every discipline',
      'Single contract, single point of accountability',
    ],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Large industrial construction site with heavy machinery',
  },
  {
    id: 'safety',
    num: '02',
    label: 'Safety',
    heading: 'Zero accidents. Always.',
    body: 'Safety is of utmost importance. Our zero-accident track record means your project is in reliable hands. Regular safety programmes, daily toolbox talks and rigorous permit-to-work systems protect everyone on site.',
    bullets: [
      'Zero recorded accidents across all projects since 1995',
      'Daily toolbox talks and on-site safety audits',
      'Rigorous permit-to-work systems at every stage',
    ],
    image: 'https://images.unsplash.com/photo-1621619856624-42fd193a0661?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Workers in hi-vis gear conducting a safety briefing',
  },
  {
    id: 'schedule',
    num: '03',
    label: 'On-Time Delivery',
    heading: 'On time. Every time.',
    body: 'We commit to timely completion using the latest tools, techniques and technology. Detailed scheduling, weekly progress reviews and proactive risk mitigation are embedded in our project management approach.',
    bullets: [
      '100 % on-time project delivery — no exceptions',
      'Weekly progress reviews shared directly with clients',
      'Risk mitigation planned before ground breaks',
    ],
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Industrial plant nearing completion on schedule',
  },
  {
    id: 'technology',
    num: '04',
    label: 'Technology',
    heading: 'Everything under one roof.',
    body: 'Owned plant and machinery, in-house testing laboratory, and specialist teams for civil, mechanical, PEB and piping — all under one contract. This eliminates coordination gaps and gives you a single accountable partner.',
    bullets: [
      'In-house testing laboratory — no third-party queue',
      'Owned fleet removes rental dependency entirely',
      'Civil, mechanical, PEB and piping teams under one roof',
    ],
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Construction machinery and equipment yard',
  },
  {
    id: 'quality-cost',
    num: '05',
    label: 'Quality & Cost',
    heading: 'Quality you can measure.',
    body: 'All works are executed under a formal Quality Assurance Plan. We test in our own laboratory — removing third-party delays. Value engineering delivers a leaner cost structure without compromising specification.',
    bullets: [
      'Formal QAP on every project, independently audited',
      'ISO 9001:2015 certified processes throughout',
      'Value engineering — savings from efficiency, not cut corners',
    ],
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=1200&auto=format&fit=crop',
    imageAlt: 'Quality testing laboratory and site inspection',
  },
]

const differentiators = [
  { value: 35, suffix: '+', label: 'Years of Experience' },
  { value: 0, suffix: '', label: 'Accidents Recorded' },
  { value: 70, suffix: '%', label: 'Repeat Client Ratio' },
  { value: 50, suffix: '+', label: 'Major Projects Completed' },
]

export default function WhyUsPage() {
  const [active, setActive] = useState(0)
  const reason = reasons[active]

  return (
    <>
      <PageTitleBand
        title="Why BD Buildcon?"
        breadcrumbs={[{ label: 'Why Us' }]}
        description="The BD Buildcon team has 35+ years of experience and a proven track record, ensuring projects are completed in a timely, quality and professional manner."
      />

      {/* ── Interactive Reasons ── */}
      <section className="section-pad bg-white" aria-label="Why choose BD Buildcon">
        <div className="container-max">
          {/* Tab navigation */}
          <div className="overflow-x-auto scrollbar-none -mx-4 px-4 mb-10">
            <div className="flex gap-0 border-b border-hairline min-w-max">
              {reasons.map((r, i) => (
                <button
                  key={r.id}
                  onClick={() => setActive(i)}
                  className={`relative pb-4 px-5 font-body text-label-md uppercase tracking-wider whitespace-nowrap transition-colors duration-200 ${
                    active === i ? 'text-teal' : 'text-body hover:text-ink'
                  }`}
                >
                  <span className="font-display text-[10px] opacity-50 mr-1.5">{r.num}</span>
                  {r.label}
                  {active === i && (
                    <motion.span
                      layoutId="tab-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal"
                      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Animated content panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] rounded-card overflow-hidden shadow-card group">
                <Image
                  src={reason.image}
                  alt={reason.imageAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                {/* Label badge */}
                <div className="absolute top-5 left-5 flex items-center gap-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5">
                  <span className="font-display font-bold text-teal text-sm">{reason.num}</span>
                  <span className="font-body text-white/80 text-xs uppercase tracking-wider">{reason.label}</span>
                </div>
                {/* Progress dots */}
                <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
                  {reasons.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        i === active ? 'bg-teal w-4' : 'bg-white/40 hover:bg-white/70'
                      }`}
                      aria-label={`Go to ${reasons[i].label}`}
                    />
                  ))}
                </div>
              </div>

              {/* Text */}
              <div className="relative">
                {/* Giant faded number */}
                <span
                  className="absolute -top-8 -left-4 font-display font-black text-[9rem] leading-none text-teal/[0.06] select-none pointer-events-none"
                  aria-hidden="true"
                >
                  {reason.num}
                </span>

                <span className="font-body text-label-md text-teal uppercase tracking-widest block mb-4 relative">
                  {reason.label}
                </span>
                <h2 className="font-display text-headline-lg text-ink leading-snug mb-5 relative">{reason.heading}</h2>
                <p className="font-body text-body-lg text-body leading-relaxed mb-8 relative">{reason.body}</p>

                {/* Bullet points */}
                <ul className="space-y-3 mb-8 relative">
                  {reason.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-teal/10 flex items-center justify-center shrink-0">
                        <svg
                          className="w-3 h-3 text-teal"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="font-body text-body-md text-ink">{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Prev / Next nav */}
                <div className="flex items-center gap-3 relative">
                  <button
                    onClick={() => setActive((a) => Math.max(0, a - 1))}
                    disabled={active === 0}
                    className="w-10 h-10 rounded-full border border-hairline flex items-center justify-center text-body hover:border-teal hover:text-teal transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Previous"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M19 12H5M12 5l-7 7 7 7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setActive((a) => Math.min(reasons.length - 1, a + 1))}
                    disabled={active === reasons.length - 1}
                    className="w-10 h-10 rounded-full border border-hairline flex items-center justify-center text-body hover:border-teal hover:text-teal transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Next"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                  <span className="font-body text-label-md text-body ml-2">
                    {active + 1} / {reasons.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Stats Band ── */}
      <section className="relative section-pad bg-teal text-white overflow-hidden" aria-label="Key differentiators">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
          aria-hidden="true"
        />
        <div className="container-max relative z-10">
          <SlideIn from="bottom">
            <SectionHeading
              title="By the Numbers"
              subtitle="Our track record speaks for itself."
              className="[&_h2]:text-white [&_p]:text-white/70"
            />
          </SlideIn>
          <StaggerReveal className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center" direction="up" stagger={0.12}>
            {differentiators.map((d) => (
              <div key={d.label} className="relative group">
                <div className="font-display font-extrabold text-display-lg text-white leading-none mb-3 tabular-nums">
                  <CountUp target={d.value} suffix={d.suffix} />
                </div>
                <div className="font-body text-label-md uppercase tracking-wider text-white/70">{d.label}</div>
                <div className="mt-4 mx-auto w-8 h-px bg-white/20 group-hover:w-16 group-hover:bg-white/50 transition-all duration-300" />
              </div>
            ))}
          </StaggerReveal>

          {/* Certifications */}
          <StaggerReveal className="mt-14 flex flex-wrap justify-center gap-4" direction="up" stagger={0.1} delay={0.2}>
            {['ISO 9001:2015', 'CRISIL SME 3 Rated', 'Zero Accidents Since 1995'].map((badge) => (
              <div
                key={badge}
                className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-5 py-2.5 backdrop-blur-sm hover:bg-white/20 transition-colors"
              >
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-body text-label-md text-white uppercase tracking-wider">{badge}</span>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="section-pad bg-surface" aria-label="Client testimonials">
        <div className="container-max">
          <SlideIn from="bottom">
            <SectionHeading
              title="What Our Clients Say"
              subtitle="Trusted by leading names across chemical, pharma, petroleum and industrial sectors."
            />
          </SlideIn>
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" direction="up" stagger={0.14}>
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </StaggerReveal>
        </div>
      </section>

      <CTABand />
    </>
  )
}
