import type { Metadata } from 'next'
import Image from 'next/image'
import { PageTitleBand } from '@/components/layout/PageTitleBand'
import { CTABand } from '@/components/layout/CTABand'

export const metadata: Metadata = {
  title: 'Safety & Quality — BD Buildcon LLP',
  description:
    'A 35-year zero-accident journey. ISO 9001:2015-certified quality systems and a dedicated quality laboratory on every site.',
}

const safetyStats = [
  { value: '0', label: 'Accidents Recorded' },
  { value: '35', label: 'Year Zero-Accident Journey' },
  { value: '100%', label: 'PPE Compliance' },
  { value: 'Daily', label: 'Toolbox Talks' },
]

const protocols = [
  {
    title: 'HSE management at every stage',
    body: 'Our comprehensive Health, Safety, and Environment management system integrates safety into every stage of project execution.',
  },
  {
    title: 'Dedicated Safety Officers on site',
    body: 'Highly qualified and experienced Safety Officers are deployed across our project sites to enforce strict standards, monitor daily operations, and ensure statutory compliance.',
  },
  {
    title: 'Daily Toolbox Talks (TBTs)',
    body: 'Conducted before the start of every workday to reinforce hazard awareness, safe work practices, and task-specific precautions.',
  },
  {
    title: 'On-site Safety Parks',
    body: 'Practical demonstrations of hazardous activities, emergency response procedures, and proper PPE use — hands-on learning that builds workforce awareness.',
  },
  {
    title: 'Audits & continuous monitoring',
    body: 'From project planning and risk assessment to regular site inspections and safety audits, safety remains at the heart of everything we do.',
  },
]

const quality = [
  {
    title: 'Quality laboratory on every site',
    body: 'Every site is equipped with a dedicated quality laboratory to ensure all materials and workmanship meet the required standards at every stage.',
  },
  {
    title: 'Modern testing equipment',
    body: 'Experienced and qualified engineers closely monitor quality using modern testing equipment and updated machinery.',
  },
  {
    title: 'Material traceability',
    body: 'Every steel and cement batch traceable to mill certificate and receipt inspection.',
  },
  {
    title: 'Stage-gate inspections',
    body: 'Hold points at reinforcement, shuttering and pre-pour stages with client sign-off.',
  },
  {
    title: 'QA/QC as a turnkey discipline',
    body: 'Quality Assurance & Quality Control built into project delivery — from material inspection through testing and commissioning.',
  },
  { title: 'Handover dossiers', body: 'Complete QA documentation packages delivered with every project handover.' },
]

export default function SafetyQualityPage() {
  return (
    <>
      <PageTitleBand
        title="Safety & Quality"
        breadcrumbs={[{ label: 'Safety & Quality' }]}
        description="A 35-year zero-accident journey. ISO 9001:2015-certified quality systems and a dedicated quality laboratory on every site."
      />

      {/* ── Safety Record ── */}
      <section aria-label="Safety Record" className="py-[96px] bg-white">
        <div className="max-w-container mx-auto px-gutter grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px]">
          {safetyStats.map((s, i) => (
            <div
              key={i}
              className="border border-hairline rounded-card p-[32px] text-center transition-all duration-200 hover:border-teal/40 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
            >
              <div className="font-display font-[800] text-[48px] leading-none text-teal mb-[12px] tabular-nums">
                {s.value}
              </div>
              <div className="text-[13px] font-semibold uppercase tracking-[0.08em] text-body">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Safety Protocols ── */}
      <section aria-label="Safety Protocols" className="bg-surface border-y border-hairline py-[96px]">
        <div className="max-w-container mx-auto px-gutter grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-[72px] items-center">
          {/* Safety Photo Collage */}
          <div className="grid grid-cols-2 gap-4 pr-0 lg:pr-8">
            <div className="grid gap-4 self-center">
              <div className="relative aspect-[4/3] rounded-card overflow-hidden shadow-sm border border-hairline">
                <Image src="/brochurephotos/safety/67.jpeg" alt="Safety assembly" fill className="object-cover" />
              </div>
              <div className="relative aspect-square rounded-card overflow-hidden shadow-sm border border-hairline">
                <Image src="/brochurephotos/safety/62.jpeg" alt="Safety award" fill className="object-cover" />
              </div>
            </div>
            <div className="grid gap-4 mt-8 md:mt-12">
              <div className="relative aspect-[4/5] rounded-card overflow-hidden shadow-sm border border-hairline">
                <Image
                  src="/brochurephotos/safety/safety-park.jpeg"
                  alt="Safety training session"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-square rounded-card overflow-hidden shadow-sm border border-hairline">
                  <Image
                    src="/brochurephotos/safety/image15.png"
                    alt="Safety equipment demo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-card overflow-hidden shadow-sm border border-hairline">
                  <Image
                    src="/brochurephotos/safety/image16.png"
                    alt="Material storage safety"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <span className="block text-[13px] font-semibold uppercase tracking-[0.12em] text-teal mb-[16px]">
              Safety on Site
            </span>
            <h2 className="font-display font-bold text-[38px] leading-[1.25] tracking-[-0.01em] text-ink mb-[20px]">
              Safety is a protocol, not a poster.
            </h2>
            <p className="text-[16px] leading-[1.7] text-body mb-[28px]">
              We firmly believe that a safe workplace is the foundation of successful project delivery. Our 35-year
              zero-accident journey stands as a testament to our disciplined safety culture, continuous training, strong
              leadership, and unwavering commitment to responsible construction practices.
            </p>
            <div className="flex flex-col gap-[18px]">
              {protocols.map((p, i) => (
                <div key={i} className="flex gap-[14px] items-start">
                  <span className="shrink-0 w-[24px] h-[24px] rounded-full bg-teal/10 flex items-center justify-center mt-[2px]">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-teal"
                      aria-hidden="true"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                  </span>
                  <div>
                    <p className="font-display font-bold text-[16.5px] text-ink mb-[4px]">{p.title}</p>
                    <p className="text-[15px] leading-[1.6] text-body m-0">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Quality Systems ── */}
      <section aria-label="Quality Systems" className="py-[96px] bg-white">
        <div className="max-w-container mx-auto px-gutter">
          <div className="text-center mb-[56px]">
            <h2 className="font-display font-bold text-[42px] tracking-[-0.01em] text-ink mb-[16px]">
              Quality Systems
            </h2>
            <div className="w-[56px] h-[3px] bg-teal rounded-full mx-auto mb-[20px]" />
            <p className="text-[18px] text-body max-w-[680px] mx-auto m-0">
              Quality is at the heart of everything we do. We never compromise on quality — every site is equipped with
              a dedicated quality laboratory, and documented QA runs from material receipt to final handover.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
            {quality.map((q, i) => (
              <div
                key={i}
                className="border border-hairline rounded-card p-[30px] transition-all duration-200 hover:border-teal/40 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
              >
                <h3 className="font-display font-bold text-[19px] text-ink mb-[10px]">{q.title}</h3>
                <p className="text-[15px] leading-[1.65] text-body m-0">{q.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section aria-label="Certifications" className="bg-dark-bg py-[88px]">
        <div className="max-w-[980px] mx-auto px-gutter grid grid-cols-1 md:grid-cols-2 gap-[24px]">
          <div className="border border-teal/30 bg-white/5 rounded-card p-[40px] text-center">
            <div className="font-display font-[800] text-[28px] text-[#5BD6E2] mb-[10px]">ISO 9001:2015</div>
            <p className="text-[15px] leading-[1.65] text-white/65 m-0">
              Certified quality management system covering design, procurement and construction execution.
            </p>
          </div>
          <div className="border border-teal/30 bg-white/5 rounded-card p-[40px] text-center">
            <div className="font-display font-[800] text-[28px] text-[#5BD6E2] mb-[10px]">CRISIL SME 3</div>
            <p className="text-[15px] leading-[1.65] text-white/65 m-0">
              Independently rated financial strength and operational credibility.
            </p>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
