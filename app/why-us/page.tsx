import type { Metadata } from 'next'
import { PageTitleBand } from '@/components/layout/PageTitleBand'
import { CTABand } from '@/components/layout/CTABand'

export const metadata: Metadata = {
  title: 'Why Us — BD Buildcon LLP',
  description:
    'What separates a dependable EPC partner from a contractor — and why 70% of our clients come back.',
}

const reasons = [
  { num: '01', title: 'Zero-Accident Record', body: 'Every project delivered without a single lost-time incident — safety engineered into daily protocols, not bolted on.' },
  { num: '02', title: 'On-Time, Every Time', body: 'Owned plant, in-house teams and rigorous scheduling mean deadlines are commitments, not estimates.' },
  { num: '03', title: 'Everything Under One Roof', body: 'Civil, structural, PEB, piping and mechanical — one accountable partner instead of a chain of subcontractors.' },
  { num: '04', title: 'Owned Equipment Fleet', body: 'Cranes, batching plants and testing lab in-house — no third-party availability risk on your critical path.' },
  { num: '05', title: 'ISO 9001:2015 & CRISIL SME 3', body: 'Certified quality management and independently rated financial strength.' },
  { num: '06', title: '70% Repeat Clients', body: 'GNFC, Pidilite, Thermax and Birla Cellulose keep coming back — the strongest endorsement in this industry.' },
]

const compareRows = [
  { label: 'Safety record', us: 'Zero accidents, 30+ years', them: 'Incidents tolerated as "normal"' },
  { label: 'Schedule reliability', us: 'Deadline is contractual', them: 'Slippage passed to client' },
  { label: 'Scope coverage', us: 'Turnkey EPC in-house', them: 'Layers of subcontractors' },
  { label: 'Equipment', us: 'Owned fleet & testing lab', them: 'Rented, availability risk' },
  { label: 'Quality systems', us: 'ISO 9001:2015 certified', them: 'Informal QA' },
]

const testimonials = [
  { quote: 'BD Buildcon delivered our plant expansion ahead of schedule with zero safety incidents. Their coordination between civil and mechanical teams was seamless.', name: 'Project Head', role: 'Chemical Manufacturing Client' },
  { quote: 'What sets them apart is ownership. One point of contact, one accountable team — from earthwork to commissioning.', name: 'Plant Director', role: 'Fertiliser Sector Client' },
  { quote: 'We have engaged BD Buildcon on four consecutive projects. Their quality documentation and testing discipline meet our corporate audit standards every time.', name: 'Engineering Manager', role: 'Adhesives Sector Client' },
]

export default function WhyUsPage() {
  return (
    <>
      <PageTitleBand
        title="Why BD Buildcon"
        breadcrumbs={[{ label: 'Why Us' }]}
        description="What separates a dependable EPC partner from a contractor — and why 70% of our clients come back."
      />

      {/* ── Differentiators ── */}
      <section aria-label="Differentiators" className="py-[96px] bg-white">
        <div className="max-w-container mx-auto px-gutter">
          <div className="text-center mb-[56px]">
            <h2 className="font-display font-bold text-[42px] tracking-[-0.01em] text-ink mb-[16px]">Six Reasons Clients Return</h2>
            <div className="w-[56px] h-[3px] bg-teal rounded-full mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            {reasons.map((r, i) => (
              <div key={i} className="border border-hairline rounded-card p-[32px] flex flex-col gap-[14px] transition-all duration-200 hover:border-teal/40 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
                <span className="font-display font-[800] text-[15px] text-teal tracking-[0.08em]">{r.num}</span>
                <h3 className="font-display font-bold text-[20px] text-ink m-0">{r.title}</h3>
                <p className="text-[15px] leading-[1.65] text-body m-0">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison ── */}
      <section aria-label="Comparison" className="bg-dark-bg py-[96px]">
        <div className="max-w-[980px] mx-auto px-gutter">
          <div className="text-center mb-[56px]">
            <h2 className="font-display font-bold text-[42px] tracking-[-0.01em] text-white mb-[16px]">The BD Buildcon Standard</h2>
            <div className="w-[56px] h-[3px] bg-teal rounded-full mx-auto" />
          </div>
          
          <div className="flex flex-col gap-[2px] rounded-card overflow-hidden">
            <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-white/5 p-[16px_28px]">
              <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/50">Criteria</span>
              <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#5BD6E2]">BD Buildcon</span>
              <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/50">Typical Contractor</span>
            </div>
            
            {compareRows.map((row, i) => (
              <div key={i} className="grid grid-cols-[1.4fr_1fr_1fr] bg-white/[0.03] p-[18px_28px] items-center">
                <span className="text-[15px] font-semibold text-white">{row.label}</span>
                <span className="text-[14.5px] text-[#5BD6E2]">{row.us}</span>
                <span className="text-[14.5px] text-white/50">{row.them}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section aria-label="Testimonials" className="bg-surface py-[96px]">
        <div className="max-w-container mx-auto px-gutter">
          <div className="text-center mb-[56px]">
            <h2 className="font-display font-bold text-[42px] tracking-[-0.01em] text-ink mb-[16px]">What Clients Say</h2>
            <div className="w-[56px] h-[3px] bg-teal rounded-full mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
            {testimonials.map((t, i) => (
              <figure key={i} className="bg-white border border-hairline rounded-card p-[32px] m-0 flex flex-col gap-[20px]">
                <svg width="28" height="20" viewBox="0 0 28 20" fill="#16A8B8" className="opacity-[0.35]" aria-hidden="true">
                  <path d="M0 20V12.4C0 5.9 3.6 1.6 10 0l1.6 3.2C7.4 4.6 5.4 7 5.2 10H11v10H0zm17 0V12.4C17 5.9 20.6 1.6 27 0l1 3.2c-4.2 1.4-6.2 3.8-6.4 6.8H27v10H17z" />
                </svg>
                <blockquote className="text-[15.5px] leading-[1.7] text-body m-0 flex-1">{t.quote}</blockquote>
                <figcaption>
                  <p className="font-display font-bold text-[15px] text-ink m-0">{t.name}</p>
                  <p className="text-[13px] text-body mt-[3px] mb-0">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
