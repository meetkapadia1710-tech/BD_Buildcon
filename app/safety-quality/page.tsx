import type { Metadata } from 'next'
import Image from 'next/image'
import { PageTitleBand } from '@/components/layout/PageTitleBand'
import { CTABand } from '@/components/layout/CTABand'

export const metadata: Metadata = {
  title: 'Safety & Quality — BD Buildcon LLP',
  description:
    'Zero accidents across 30+ years. ISO 9001:2015-certified quality systems on every site.',
}

const safetyStats = [
  { value: '0', label: 'Lost-Time Incidents' },
  { value: '30+', label: 'Years Accident-Free' },
  { value: '100%', label: 'PPE Compliance' },
  { value: 'Daily', label: 'Toolbox Talks' },
]

const protocols = [
  { title: 'Daily toolbox talks', body: 'Every shift starts with a task-specific safety briefing for all site personnel.' },
  { title: 'Permit-to-work system', body: 'Hot work, confined space and height work proceed only under signed permits.' },
  { title: 'Certified riggers & operators', body: 'Crane and heavy-lift operations run exclusively by certified personnel.' },
  { title: 'Third-party equipment audits', body: 'Lifting tackle and pressure equipment inspected and load-tested on schedule.' },
  { title: 'Client EHS alignment', body: 'Our site protocols integrate with each client’s plant safety systems from day one.' },
]

const quality = [
  { title: 'In-house testing lab', body: 'Cube testing, sieve analysis, slump and rebar checks conducted on site — results documented per pour.' },
  { title: 'Material traceability', body: 'Every steel and cement batch traceable to mill certificate and receipt inspection.' },
  { title: 'Stage-gate inspections', body: 'Hold points at reinforcement, shuttering and pre-pour stages with client sign-off.' },
  { title: 'Welding qualification', body: 'WPS/PQR-qualified welders for structural and pressure piping work.' },
  { title: 'Dimensional control', body: 'Total-station surveys verify alignment and level at each structural stage.' },
  { title: 'Handover dossiers', body: 'Complete QA documentation packages delivered with every project handover.' },
]

export default function SafetyQualityPage() {
  return (
    <>
      <PageTitleBand
        title="Safety & Quality"
        breadcrumbs={[{ label: 'Safety & Quality' }]}
        description="Zero accidents across 30+ years. ISO 9001:2015-certified quality systems on every site."
      />

      {/* ── Safety Record ── */}
      <section aria-label="Safety Record" className="py-[96px] bg-white">
        <div className="max-w-container mx-auto px-gutter grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px]">
          {safetyStats.map((s, i) => (
            <div key={i} className="border border-hairline rounded-card p-[32px] text-center transition-all duration-200 hover:border-teal/40 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
              <div className="font-display font-[800] text-[48px] leading-none text-teal mb-[12px] tabular-nums">{s.value}</div>
              <div className="text-[13px] font-semibold uppercase tracking-[0.08em] text-body">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Safety Protocols ── */}
      <section aria-label="Safety Protocols" className="bg-surface border-y border-hairline py-[96px]">
        <div className="max-w-container mx-auto px-gutter grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-[72px] items-center">
          <div className="relative rounded-card overflow-hidden aspect-[4/3]">
            <Image 
              src="https://images.unsplash.com/photo-1578307985320-34b56dc6b8f6?q=80&w=1200&auto=format&fit=crop" 
              alt="Worker in safety harness and helmet on industrial site"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <span className="block text-[13px] font-semibold uppercase tracking-[0.12em] text-teal mb-[16px]">
              Safety on Site
            </span>
            <h2 className="font-display font-bold text-[38px] leading-[1.25] tracking-[-0.01em] text-ink mb-[28px]">
              Safety is a protocol, not a poster.
            </h2>
            <div className="flex flex-col gap-[18px]">
              {protocols.map((p, i) => (
                <div key={i} className="flex gap-[14px] items-start">
                  <span className="shrink-0 w-[24px] h-[24px] rounded-full bg-teal/10 flex items-center justify-center mt-[2px]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-teal" aria-hidden="true">
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
            <h2 className="font-display font-bold text-[42px] tracking-[-0.01em] text-ink mb-[16px]">Quality Systems</h2>
            <div className="w-[56px] h-[3px] bg-teal rounded-full mx-auto mb-[20px]" />
            <p className="text-[18px] text-body max-w-[620px] mx-auto m-0">
              In-house testing equipment and documented QA at every stage — from material receipt to final handover.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
            {quality.map((q, i) => (
              <div key={i} className="border border-hairline rounded-card p-[30px] transition-all duration-200 hover:border-teal/40 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
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
