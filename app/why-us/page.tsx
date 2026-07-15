import type { Metadata } from 'next'
import { PageTitleBand } from '@/components/layout/PageTitleBand'
import { CTABand } from '@/components/layout/CTABand'
import { PhotoStackGallery } from '@/components/ui/PhotoStackGallery'
import { CountUp } from '@/components/motion/CountUp'
import { SlideIn } from '@/components/motion/SlideIn'
import { StaggerReveal } from '@/components/motion/StaggerReveal'
import { BlueprintReveal } from '@/components/motion/BlueprintReveal'
import { ConstructionDraw } from '@/components/motion/ConstructionDraw'
import { testimonials } from '@/content/testimonials'
import { statsDisplay, stats } from '@/content/company'

export const metadata: Metadata = {
  title: 'Why Us — BD Buildcon LLP',
  description:
    'Experience and expertise across diverse sectors — industrial, commercial, residential, and infrastructure.',
}

const iconProps = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

const reasons = [
  {
    num: '01',
    title: 'Custom Solutions',
    body: 'Tailored services to meet specific client requirements, ensuring flexibility at every stage of the project.',
    icon: (
      <svg {...iconProps}>
        <line x1="4" y1="21" x2="4" y2="14" />
        <line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" />
        <line x1="20" y1="12" x2="20" y2="3" />
        <line x1="1" y1="14" x2="7" y2="14" />
        <line x1="9" y1="8" x2="15" y2="8" />
        <line x1="17" y1="16" x2="23" y2="16" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Innovation & Technology',
    body: 'Use of the latest construction technology — BIM (Building Information Modelling), ERP systems, and digital project management tools — for precision, efficiency, and timely execution.',
    icon: (
      <svg {...iconProps}>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
        <line x1="20" y1="9" x2="23" y2="9" />
        <line x1="20" y1="14" x2="23" y2="14" />
        <line x1="1" y1="9" x2="4" y2="9" />
        <line x1="1" y1="14" x2="4" y2="14" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'On-Time Delivery',
    body: 'A proven track record of meeting project timelines without compromising on quality.',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Cost Efficiency',
    body: 'Value-engineered solutions for specific clients, ensuring cost-effective durability.',
    icon: (
      <svg {...iconProps}>
        <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
        <polyline points="17 18 23 18 23 12" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Safety & Compliance',
    body: 'Adherence to stringent safety protocols, ISO certifications, and all statutory and environmental compliance.',
    icon: (
      <svg {...iconProps}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
]

const compareRows = [
  { label: 'Safety record', us: '35-year zero-accident journey', them: 'Incidents tolerated as "normal"' },
  { label: 'Schedule reliability', us: 'Deadline is contractual', them: 'Slippage passed to client' },
  { label: 'Scope coverage', us: 'Turnkey EPC in-house', them: 'Layers of subcontractors' },
  { label: 'Equipment', us: 'Owned fleet & testing lab', them: 'Rented, availability risk' },
  { label: 'Quality systems', us: 'ISO 9001:2015 certified', them: 'Informal QA' },
]

const highlightStats = [
  { value: stats.zeroAccidentYears, suffix: '', label: 'Years Zero-Accident' },
  { value: stats.machinesOwned, suffix: '+', label: 'Owned Machines' },
  { value: stats.repeatClientPct, suffix: '%', label: 'Repeat Clients' },
  { value: stats.projects, suffix: '+', label: 'Projects Completed' },
]

const machineryStats: { numeric?: number; suffix?: string; value?: string; label: string }[] = [
  { numeric: stats.machinesOwned, suffix: '+', label: 'Owned Machines & Equipment' },
  { value: 'RMC', label: 'In-House Batching Plants' },
  { value: 'BIM', label: 'Digital Project Management' },
  { value: '24/7', label: 'Equipment Availability' },
]

const featuredTestimonials = testimonials.slice(0, 6)

const machineryPhotos = [
  '/brochurephotos/plant and machinery/image17.webp',
  '/brochurephotos/plant and machinery/image44.webp',
  '/brochurephotos/plant and machinery/image45.webp',
  '/brochurephotos/plant and machinery/image46.webp',
  '/brochurephotos/plant and machinery/image48.webp',
  '/brochurephotos/plant and machinery/image6.webp',
  '/brochurephotos/plant and machinery/DocScanner Sep 9, 2025 5-45 PM_1(106).webp',
  '/brochurephotos/plant and machinery/DocScanner Sep 9, 2025 5-45 PM_1(125).webp',
  '/brochurephotos/plant and machinery/DocScanner Sep 9, 2025 5-45 PM_1(126).webp',
  '/brochurephotos/plant and machinery/DocScanner Sep 9, 2025 5-45 PM_1(155).webp',
  '/brochurephotos/plant and machinery/IMG-20150407-WA0003.webp',
  '/brochurephotos/plant and machinery/WhatsApp Image 2026-07-12 at 12.44.00 PM (1).webp',
  '/brochurephotos/plant and machinery/WhatsApp Image 2026-07-12 at 12.44.00 PM (2).webp',
  '/brochurephotos/plant and machinery/WhatsApp Image 2026-07-12 at 12.44.00 PM (3).webp',
  '/brochurephotos/plant and machinery/WhatsApp Image 2026-07-12 at 12.44.00 PM.webp',
  '/brochurephotos/plant and machinery/WhatsApp Image 2026-07-12 at 12.58.08 PM.webp',
]

function CheckChip() {
  return (
    <span className="shrink-0 w-[20px] h-[20px] rounded-full bg-teal/15 flex items-center justify-center">
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-[#5BD6E2]"
        aria-hidden="true"
      >
        <path d="M20 6L9 17l-5-5"></path>
      </svg>
    </span>
  )
}

function DashChip() {
  return (
    <span className="shrink-0 w-[20px] h-[20px] rounded-full bg-white/10 flex items-center justify-center">
      <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        className="text-white/40"
        aria-hidden="true"
      >
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
    </span>
  )
}

export default function WhyUsPage() {
  return (
    <>
      <PageTitleBand
        title="Why BD Buildcon"
        breadcrumbs={[{ label: 'Why Us' }]}
        description="Experience and expertise across diverse sectors — industrial, commercial, residential, and infrastructure."
      />

      {/* ── Highlights strip ── */}
      <section aria-label="Highlights" className="bg-white border-b border-hairline py-[40px]">
        <div className="max-w-container mx-auto px-gutter grid grid-cols-2 lg:grid-cols-4 gap-[24px] text-center">
          {highlightStats.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-[4px]">
              <div className="font-display font-[800] text-[38px] leading-none text-teal tabular-nums">
                <CountUp target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-body">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Competitive Edge ── */}
      <section aria-label="Competitive Edge" className="py-[96px] bg-white">
        <div className="max-w-container mx-auto px-gutter">
          <SlideIn from="bottom">
            <div className="text-center mb-[56px]">
              <h2 className="font-display font-bold text-[42px] tracking-[-0.01em] text-ink mb-[16px]">
                Our Competitive Edge
              </h2>
              <div className="w-[56px] h-[3px] bg-teal rounded-full mx-auto" />
            </div>
          </SlideIn>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-[24px]" stagger={0.08}>
            {reasons.map((r, i) => (
              <div
                key={i}
                className="group relative overflow-hidden border border-hairline rounded-card p-[32px] flex flex-col gap-[14px] transition-all duration-300 hover:border-teal/40 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
              >
                <span
                  className="absolute -top-3 right-1 font-display font-[800] text-[92px] leading-none text-teal/[0.06] select-none pointer-events-none"
                  aria-hidden="true"
                >
                  {r.num}
                </span>
                <div className="relative z-10 w-[52px] h-[52px] rounded-full bg-teal/10 flex items-center justify-center text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-white">
                  {r.icon}
                </div>
                <h3 className="relative z-10 font-display font-bold text-[20px] text-ink m-0">{r.title}</h3>
                <p className="relative z-10 text-[15px] leading-[1.65] text-body m-0">{r.body}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── Comparison ── */}
      <section aria-label="Comparison" className="relative overflow-hidden bg-dark-bg py-[96px]">
        <div
          className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #16A8B8, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="relative max-w-[980px] mx-auto px-gutter">
          <SlideIn from="bottom">
            <div className="text-center mb-[56px]">
              <h2 className="font-display font-bold text-[42px] tracking-[-0.01em] text-white mb-[16px]">
                The BD Buildcon Standard
              </h2>
              <div className="w-[56px] h-[3px] bg-teal rounded-full mx-auto" />
            </div>
          </SlideIn>

          <div className="flex flex-col gap-[2px] rounded-card overflow-hidden">
            <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-white/5 p-[16px_28px]">
              <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/50">Criteria</span>
              <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#5BD6E2]">BD Buildcon</span>
              <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-white/50">
                Typical Contractor
              </span>
            </div>

            <StaggerReveal direction="left" stagger={0.07} className="flex flex-col gap-[2px]">
              {compareRows.map((row, i) => (
                <div key={i} className="grid grid-cols-[1.4fr_1fr_1fr] bg-white/[0.03] p-[18px_28px] items-center">
                  <span className="text-[15px] font-semibold text-white">{row.label}</span>
                  <span className="flex items-center gap-[10px] text-[14.5px] text-[#5BD6E2] font-medium">
                    <CheckChip />
                    {row.us}
                  </span>
                  <span className="flex items-center gap-[10px] text-[14.5px] text-white/45">
                    <DashChip />
                    {row.them}
                  </span>
                </div>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </section>

      {/* ── Plant & Machinery ── */}
      <section aria-label="Plant and Machinery" className="relative overflow-hidden bg-white py-[96px]">
        <ConstructionDraw className="pointer-events-none absolute -right-16 bottom-0 hidden w-[560px] h-auto text-teal/[0.14] lg:block" />

        <BlueprintReveal className="max-w-container mx-auto px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-[72px] items-center">
            <SlideIn from="left">
              <div>
                <span className="block text-[13px] font-semibold uppercase tracking-[0.12em] text-teal mb-[16px]">
                  Plant &amp; Machinery
                </span>
                <h2 className="font-display font-bold text-[38px] leading-[1.25] tracking-[-0.01em] text-ink mb-[24px]">
                  {statsDisplay.machinesOwned} owned machines. Zero rental dependency.
                </h2>
                <p className="text-[17px] leading-[1.75] text-body mb-[16px]">
                  We believe that investing in the latest technology and modern construction equipment is key to
                  delivering superior productivity, precision, and project efficiency. Our modern and diverse fleet
                  includes an RMC plant, a boom placer, excavators, vibratory rollers, transit mixers, and much more.
                </p>
                <p className="text-[17px] leading-[1.75] text-body mb-[16px]">
                  With {statsDisplay.machinesOwned} owned construction machines and equipment, we maintain complete
                  operational control without relying on rented machinery — ensuring higher equipment availability,
                  minimizing project delays, and allowing us to respond quickly to changing site requirements.
                </p>
                <p className="text-[17px] leading-[1.75] text-body m-0">
                  Regular maintenance and timely equipment upgrades ensure reliable performance, while advanced
                  technology and automation help address labour challenges and keep every project on schedule.
                </p>
              </div>
            </SlideIn>

            <StaggerReveal className="grid grid-cols-2 gap-[20px]" direction="right">
              {machineryStats.map((s, i) => (
                <div key={i} className="bg-white border border-hairline rounded-card p-[28px] text-center">
                  <div className="font-display font-[800] text-[36px] leading-none text-teal mb-[10px] tabular-nums">
                    {s.numeric !== undefined ? <CountUp target={s.numeric} suffix={s.suffix} /> : s.value}
                  </div>
                  <div className="text-[12.5px] font-semibold uppercase tracking-[0.08em] text-body">{s.label}</div>
                </div>
              ))}
            </StaggerReveal>
          </div>
        </BlueprintReveal>

        {/* ── Photo Gallery Stack ── */}
        <div className="relative max-w-container mx-auto px-gutter mt-[96px] pt-[72px] border-t border-hairline flex flex-col items-center">
          <SlideIn from="bottom">
            <div className="text-center mb-[48px]">
              <h3 className="font-display font-bold text-[32px] text-ink mb-[12px]">Explore</h3>
              <p className="text-[16px] text-body">Click the stack to view our extensive machinery gallery</p>
            </div>
          </SlideIn>
          <PhotoStackGallery photos={machineryPhotos} />
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section aria-label="Testimonials" className="bg-surface py-[96px]">
        <div className="max-w-container mx-auto px-gutter">
          <SlideIn from="bottom">
            <div className="text-center mb-[56px]">
              <h2 className="font-display font-bold text-[42px] tracking-[-0.01em] text-ink mb-[16px]">
                What Clients Say
              </h2>
              <div className="w-[56px] h-[3px] bg-teal rounded-full mx-auto" />
            </div>
          </SlideIn>

          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-[24px]" stagger={0.08}>
            {featuredTestimonials.map((t) => (
              <figure
                key={t.id}
                className="bg-white border border-hairline rounded-card p-[32px] m-0 flex flex-col gap-[20px] transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 hover:shadow-[0_16px_36px_rgba(0,0,0,0.08)]"
              >
                <svg
                  width="28"
                  height="20"
                  viewBox="0 0 28 20"
                  fill="#16A8B8"
                  className="opacity-[0.35]"
                  aria-hidden="true"
                >
                  <path d="M0 20V12.4C0 5.9 3.6 1.6 10 0l1.6 3.2C7.4 4.6 5.4 7 5.2 10H11v10H0zm17 0V12.4C17 5.9 20.6 1.6 27 0l1 3.2c-4.2 1.4-6.2 3.8-6.4 6.8H27v10H17z" />
                </svg>
                <blockquote className="text-[15.5px] leading-[1.7] text-body m-0 flex-1">{t.quote}</blockquote>
                <figcaption>
                  <p className="font-display font-bold text-[15px] text-ink m-0">{t.name}</p>
                  <p className="text-[13px] text-body mt-[3px] mb-0">{t.companyShort}</p>
                </figcaption>
              </figure>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <CTABand />
    </>
  )
}
