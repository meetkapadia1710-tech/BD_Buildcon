import type { Metadata } from 'next'
import Image from 'next/image'
import { PageTitleBand } from '@/components/layout/PageTitleBand'
import { CTABand } from '@/components/layout/CTABand'

export const metadata: Metadata = {
  title: 'About BD Buildcon',
  description:
    'Learn about BD Buildcon LLP — a turnkey industrial EPC contractor with 30+ years, ISO 9001:2015 certified, specialised in Civil, Mechanical, PEB, piling and piping.',
}

const milestones = [
  { year: '1995', title: 'Founded as Bhumi Developers', body: 'Civil contracting firm established in Bharuch, Gujarat.' },
  { year: '2005', title: 'Industrial EPC expansion', body: 'Entered structural steel, PEB and mechanical works for chemical plants.' },
  { year: '2015', title: 'ISO 9001:2015 certified', body: 'Formalised quality systems; CRISIL SME 3 rating earned.' },
  { year: '2021', title: 'BD Buildcon LLP', body: 'Reorganised as an LLP; full turnkey EPC capability under one roof.' },
]

const leaders = [
  { name: 'Kiran Majmudar', role: 'Director' },
  { name: 'Designated Partner', role: 'Operations & Execution' },
  { name: 'Designated Partner', role: 'Engineering & QA' },
]

export default function AboutPage() {
  return (
    <>
      <PageTitleBand 
        title="About BD Buildcon" 
        breadcrumbs={[{ label: 'About Us' }]} 
        description="Three decades of turnkey industrial construction — from Bhumi Developers to BD Buildcon LLP."
      />

      {/* ── Story ── */}
      <section aria-label="Our Story" className="py-[96px] bg-white">
        <div className="max-w-container mx-auto px-gutter grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-[72px] items-center">
          <div>
            <span className="block text-[13px] font-semibold uppercase tracking-[0.12em] text-teal mb-[16px]">
              Our Story
            </span>
            <h2 className="font-display font-bold text-[38px] leading-[1.25] tracking-[-0.01em] text-ink mb-[24px]">
              Built project by project since 1995.
            </h2>
            <p className="text-[17px] leading-[1.75] text-body mb-[16px]">
              BD Buildcon LLP began as Bhumi Developers, a civil contracting firm serving the industrial belt of Bharuch, Gujarat. Over 30 years we have grown into a full-service turnkey EPC contractor — handling civil, structural, PEB, piping, mechanical and infrastructure works under one roof.
            </p>
            <p className="text-[17px] leading-[1.75] text-body m-0">
              With professional human resources, an owned equipment fleet, and state-of-the-art construction quality testing equipment, we execute mission-critical projects for chemical, pharma, petroleum and manufacturing clients across India.
            </p>
          </div>
          <div className="relative rounded-card overflow-hidden aspect-[4/3]">
            <Image 
              src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop" 
              alt="Construction team reviewing drawings on site"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section aria-label="Milestones" className="bg-surface border-y border-hairline py-[96px]">
        <div className="max-w-container mx-auto px-gutter">
          <div className="text-center mb-[56px]">
            <h2 className="font-display font-bold text-[42px] tracking-[-0.01em] text-ink mb-[16px]">Milestones</h2>
            <div className="w-[56px] h-[3px] bg-teal rounded-full mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px]">
            {milestones.map((m, i) => (
              <div key={i} className="bg-white border border-hairline rounded-card p-[28px] flex flex-col gap-[10px]">
                <span className="font-display font-[800] text-[28px] text-teal">{m.year}</span>
                <span className="font-display font-bold text-[17px] text-ink">{m.title}</span>
                <span className="text-[14.5px] leading-[1.6] text-body">{m.body}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mission / Vision ── */}
      <section aria-label="Mission and Vision" className="py-[96px] bg-white">
        <div className="max-w-container mx-auto px-gutter grid grid-cols-1 md:grid-cols-2 gap-[24px]">
          <div className="bg-dark-bg rounded-card p-[48px]">
            <span className="block text-[13px] font-semibold uppercase tracking-[0.12em] text-[#5BD6E2] mb-[16px]">
              Mission
            </span>
            <p className="font-display font-semibold text-[22px] leading-[1.5] text-white m-0">
              Deliver every industrial project safely, on schedule, and to uncompromising quality — earning repeat trust from India&apos;s leading manufacturers.
            </p>
          </div>
          <div className="bg-teal rounded-card p-[48px]">
            <span className="block text-[13px] font-semibold uppercase tracking-[0.12em] text-white/75 mb-[16px]">
              Vision
            </span>
            <p className="font-display font-semibold text-[22px] leading-[1.5] text-white m-0">
              To be the most dependable turnkey EPC partner in Western India — where zero accidents and on-time delivery are the standard, not the goal.
            </p>
          </div>
        </div>
      </section>

      {/* ── Leadership ── */}
      <section aria-label="Leadership" className="bg-surface border-t border-hairline py-[96px]">
        <div className="max-w-container mx-auto px-gutter">
          <div className="text-center mb-[56px]">
            <h2 className="font-display font-bold text-[42px] tracking-[-0.01em] text-ink mb-[16px]">Leadership</h2>
            <div className="w-[56px] h-[3px] bg-teal rounded-full mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-[24px] max-w-[980px] mx-auto">
            {leaders.map((l, i) => (
              <div key={i} className="bg-white border border-hairline rounded-card overflow-hidden">
                <div className="aspect-square flex items-center justify-center bg-[#EFF3F4]" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #EFF3F4 0 14px, #E6ECEE 14px 28px)' }}>
                  <span className="font-mono text-[12px] text-body bg-white border border-hairline rounded-[6px] px-[10px] py-[5px]">
                    portrait
                  </span>
                </div>
                <div className="p-[22px] text-center">
                  <p className="font-display font-bold text-[18px] text-ink mb-[4px]">{l.name}</p>
                  <p className="text-[14px] text-teal font-semibold m-0">{l.role}</p>
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
