'use client'

import Image from 'next/image'
import { PageTitleBand } from '@/components/layout/PageTitleBand'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { CTABand } from '@/components/layout/CTABand'
import { FadeRiseItem } from '@/components/motion/FadeRise'
import { SlideIn } from '@/components/motion/SlideIn'
import { StaggerReveal } from '@/components/motion/StaggerReveal'
import { ParallaxLayer } from '@/components/motion/ParallaxLayer'

const safetyStats = [
  { value: '0', label: 'Accidents Recorded' },
  { value: '35+', label: 'Years Safety Culture' },
  { value: '50+', label: 'Projects Delivered Safely' },
  { value: '100%', label: 'PTW Compliance Rate' },
]

const safetyPractices = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
        />
      </svg>
    ),
    title: 'Daily Toolbox Talks',
    tag: 'Every morning before work — hazards, controls, procedures.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
    title: 'Permit-to-Work System',
    tag: 'Formal PTW sign-off for every high-risk activity on site.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: 'PPE Compliance',
    tag: 'Full PPE mandatory for all workers and visitors — no exceptions.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: 'Safety Audits & Inspections',
    tag: 'Every finding logged and actioned within 48 hours, on record.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        />
      </svg>
    ),
    title: 'Emergency Response Plans',
    tag: 'Site-specific ERP with mock drills before and during every project.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
      </svg>
    ),
    title: 'Zero-Tolerance Policy',
    tag: 'Any unsafe act triggers an immediate stop-work order.',
  },
]

const qualityPractices = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
    title: 'Quality Assurance Plan',
    tag: 'Hold points and criteria agreed with client before ground breaks.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
    title: 'In-House Testing Laboratory',
    tag: 'On-site concrete, compaction and weld tests — no third-party queue.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
    ),
    title: 'ISO 9001:2015 Certified',
    tag: 'QMS certified by TÜV SÜD South Asia for industrial construction.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    title: 'Value Engineering',
    tag: 'Better outcomes at lower cost — savings from efficiency, not corners.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Rework-Free Execution',
    tag: 'Near-zero rework rate — right first time, every time.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    ),
    title: 'CRISIL SME 3 Rating',
    tag: 'Above Average creditworthiness confirmed by NSIC-CRISIL.',
  },
]

export default function SafetyQualityPage() {
  return (
    <>
      <PageTitleBand
        title="Safety & Quality"
        breadcrumbs={[{ label: 'Safety & Quality' }]}
        description="Our zero-accident track record and ISO 9001:2015 quality systems are not badges we display — they are the way we work, every day, on every site."
      />

      {/* ── Safety Hero ── */}
      <section className="relative bg-dark-bg py-24 lg:py-32 overflow-hidden" aria-label="Safety record">
        <ParallaxLayer yRange={-40} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1621619856624-42fd193a0661?q=80&w=2070&auto=format&fit=crop"
            alt="Workers in hi-vis safety gear on a BD Buildcon industrial site"
            fill
            className="object-cover opacity-15"
            sizes="100vw"
            priority
          />
        </ParallaxLayer>
        <div className="relative z-10 container-max grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Big stat */}
          <SlideIn from="left">
            <div>
              <div
                className="font-display font-black leading-none text-teal mb-4 tabular-nums select-none"
                style={{ fontSize: 'clamp(6rem, 14vw, 11rem)' }}
                aria-label="Zero accidents"
              >
                0
              </div>
              <p className="font-display text-headline-md text-white leading-snug">
                accidents recorded
                <br />
                across 35+ years
                <br />
                and 50+ projects.
              </p>
              <div className="mt-6 h-1 w-20 bg-teal rounded-full" />
            </div>
          </SlideIn>

          {/* Philosophy */}
          <SlideIn from="right">
            <div>
              <span className="font-body text-label-md text-teal uppercase tracking-widest block mb-4">
                Our Safety Philosophy
              </span>
              <h2 className="font-display text-headline-lg text-white leading-snug mb-6">
                Safety is not a department.
              </h2>
              <p className="font-body text-body-lg text-white/70 leading-relaxed mb-5">
                At BD Buildcon, safety is engineered into every protocol, every morning meeting and every permit issued.
                Our zero-accident record across 35 years is not luck — it is the direct result of a non-negotiable
                safety culture that starts at the boardroom and reaches every worker on site.
              </p>
              <p className="font-body text-body-lg text-white/70 leading-relaxed">
                We value the health and safety of our employees and the well-being of the communities where we work.
                This humanitarian mindset drives every decision on site — and safety never competes with schedule
                pressure.
              </p>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* ── Safety Stats Strip ── */}
      <section className="bg-teal py-10" aria-label="Safety statistics">
        <div className="container-max grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {safetyStats.map((s) => (
            <div key={s.label}>
              <div className="font-display font-extrabold text-display-lg text-white leading-none mb-1 tabular-nums">
                {s.value}
              </div>
              <div className="font-body text-label-md uppercase tracking-wider text-white/75">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Safety Practices ── */}
      <section className="section-pad bg-surface" aria-label="Safety practices">
        <div className="container-max">
          <SlideIn from="bottom">
            <SectionHeading
              title="How We Keep Everyone Safe"
              subtitle="Six non-negotiable practices on every BD Buildcon site."
            />
          </SlideIn>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-hairline border border-hairline rounded-2xl overflow-hidden shadow-sm">
            {safetyPractices.map((p, i) => (
              <div
                key={p.title}
                className="bg-white flex items-start gap-4 px-6 py-5 hover:bg-teal/[0.025] transition-colors group"
              >
                <div className="shrink-0 mt-0.5 w-9 h-9 rounded-lg bg-teal/10 flex items-center justify-center text-teal group-hover:bg-teal group-hover:text-white transition-colors duration-200">
                  {p.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-body text-[9px] font-bold text-body/30 tracking-widest uppercase tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-ink text-[14px] leading-snug">{p.title}</h3>
                  <p className="font-body text-[12px] text-body mt-1 leading-relaxed">{p.tag}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Safety Quote ── */}
      <section className="bg-footer py-20 text-center" aria-label="Safety commitment quote">
        <div className="container-max max-w-3xl">
          <FadeRiseItem>
            <div className="text-[5rem] leading-none text-teal/30 font-display select-none mb-2" aria-hidden="true">
              &ldquo;
            </div>
            <blockquote className="font-display text-headline-md text-white leading-snug mb-6">
              Safety is not a department — it&apos;s the culture we build every morning before the first concrete is
              poured.
            </blockquote>
            <div className="h-px w-14 bg-teal/50 mx-auto" />
          </FadeRiseItem>
        </div>
      </section>

      {/* ── Quality Intro ── */}
      <section className="section-pad bg-white" aria-label="Quality commitment">
        <div className="container-max grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <SlideIn from="left">
            <div>
              <span className="font-body text-label-md text-teal uppercase tracking-widest block mb-4">
                Our Quality Philosophy
              </span>
              <h2 className="font-display text-headline-lg text-ink leading-snug mb-6">
                Do it right
                <br />
                the first time.
              </h2>
              <p className="font-body text-body-lg text-body leading-relaxed mb-5">
                Every BD Buildcon project is executed under a formal Quality Assurance Plan agreed with the client
                before work begins. Our in-house testing laboratory means quality checks happen on-site — no third-party
                queues, no delays, no compromises.
              </p>
              <p className="font-body text-body-lg text-body leading-relaxed mb-8">
                ISO 9001:2015 certified processes and CRISIL SME 3 rating reflect a commitment to quality that runs from
                the drawing board to final handover. Our near-zero rework rate translates directly into faster plant
                start-up for our clients.
              </p>
              {/* Accreditation badges */}
              <div className="flex flex-wrap gap-3">
                {['ISO 9001:2015', 'CRISIL SME 3', 'TÜV SÜD Certified'].map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-2 border border-teal/30 text-teal rounded-full px-4 py-1.5 font-body text-label-md uppercase tracking-wider hover:bg-teal/5 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </SlideIn>

          {/* Image */}
          <SlideIn from="right">
            <div className="relative aspect-[4/3] rounded-card overflow-hidden shadow-card group">
              <Image
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=900&auto=format&fit=crop"
                alt="Quality control testing and inspection on a construction site"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* ISO badge overlay */}
              <div className="absolute bottom-5 right-5 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-hairline">
                <p className="font-display font-bold text-teal text-sm leading-none">ISO 9001:2015</p>
                <p className="font-body text-xs text-body mt-0.5">Certified by TÜV SÜD South Asia</p>
              </div>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* ── Quality Practices ── */}
      <section className="section-pad bg-surface" aria-label="Quality practices">
        <div className="container-max">
          <SlideIn from="bottom">
            <SectionHeading
              title="Quality at Every Stage"
              subtitle="The systems that ensure every deliverable meets specification — first time, every time."
            />
          </SlideIn>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-hairline border border-hairline rounded-2xl overflow-hidden shadow-sm">
            {qualityPractices.map((p, i) => (
              <div
                key={p.title}
                className="bg-white flex items-start gap-4 px-6 py-5 hover:bg-teal/[0.025] transition-colors group"
              >
                <div className="shrink-0 mt-0.5 w-9 h-9 rounded-lg bg-teal/10 flex items-center justify-center text-teal group-hover:bg-teal group-hover:text-white transition-colors duration-200">
                  {p.icon}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-body text-[9px] font-bold text-body/30 tracking-widest uppercase tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-ink text-[14px] leading-snug">{p.title}</h3>
                  <p className="font-body text-[12px] text-body mt-1 leading-relaxed">{p.tag}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
