import type { Metadata } from 'next'
import { PageTitleBand } from '@/components/layout/PageTitleBand'
import { CTABand } from '@/components/layout/CTABand'
import { PhotoStackGallery } from '@/components/ui/PhotoStackGallery'
import { WhyUsMaster } from '@/components/ui/WhyUsMaster'
import { CountUp } from '@/components/motion/CountUp'
import { SlideIn } from '@/components/motion/SlideIn'
import { StaggerReveal } from '@/components/motion/StaggerReveal'
import { BlueprintReveal } from '@/components/motion/BlueprintReveal'
import { ConstructionDraw } from '@/components/motion/ConstructionDraw'
import { testimonials } from '@/content/testimonials'
import { statsDisplay, stats } from '@/content/company'
import { breadcrumbJsonLd } from '@/lib/jsonld'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Why Choose BD Buildcon',
  description:
    '35-year zero-accident record, ISO 9001:2015 certification, BIM/ERP-driven execution, and 100+ owned machines. See why leading industrials choose BD Buildcon.',
  alternates: { canonical: 'https://bdbuildcon.com/why-us' },
  openGraph: {
    url: 'https://bdbuildcon.com/why-us',
    title: 'Why Choose BD Buildcon LLP',
    description: '35-year zero-accident record, ISO 9001:2015, BIM/ERP-driven execution, 100+ owned machines.',
  },
}

const iconProps = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

// One deduplicated ledger: each pillar merges the related claims that were
// previously repeated across "Competitive Edge", the comparison table, and
// "Workmanship" — every fact appears exactly once.
const standards = [
  {
    title: 'Safety',
    proof: '0 accidents · 35 years',
    us: 'Safety is engineered into every protocol, every day on site — stringent safety systems and full statutory and environmental compliance, proven by a 35-year zero-accident journey.',
    them: 'Incidents tolerated as "normal"',
    icon: (
      <svg {...iconProps}>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: 'Quality & Workmanship',
    proof: 'ISO 9001:2015',
    us: 'One certified quality system governs design, procurement and construction — built to international engineering parameters.',
    points: [
      'Design codes set by international EPC consultants',
      'Every steel & cement batch traceable to mill certificate',
      'Client-signed hold points at reinforcement, shuttering & pre-pour',
    ],
    them: 'Informal QA',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
  {
    title: 'Technology & Precision',
    proof: 'BIM + ERP',
    us: 'BIM modelling, ERP systems and digital project management tools keep every dimension accountable from drawing to as-built.',
    them: 'Manual, untracked execution',
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
    title: 'On-Time Delivery',
    proof: 'Deadline is contractual',
    us: 'A proven track record of meeting project timelines without compromising on quality — the deadline is a commitment, not an estimate.',
    them: 'Slippage passed to client',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: 'Turnkey Scope & Custom Solutions',
    proof: 'Turnkey EPC in-house',
    us: 'End-to-end EPC under one roof, tailored to each client’s requirements — flexible at every stage, with value-engineered solutions for cost-effective durability.',
    them: 'Layers of subcontractors',
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
    title: 'Equipment & Resources',
    proof: `${statsDisplay.machinesOwned} owned machines`,
    us: 'An owned fleet and in-house testing laboratory give complete operational control — higher equipment availability, zero rental dependency.',
    them: 'Rented, availability risk',
    icon: (
      <svg {...iconProps}>
        <path d="M10 17h4V5H2v12h3" />
        <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1" />
        <circle cx="7.5" cy="17.5" r="2.5" />
        <circle cx="17.5" cy="17.5" r="2.5" />
      </svg>
    ),
  },
]

const highlightStats = [
  { value: stats.zeroAccidentYears, suffix: '', label: 'Years Zero-Accident' },
  { value: stats.machinesOwned, suffix: '+', label: 'Owned Machines' },
  { value: stats.repeatClientPct, suffix: '%', label: 'Repeat Clients' },
  { value: stats.projects, suffix: '+', label: 'Projects Completed' },
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

export default function WhyUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: 'Why BD Buildcon', url: 'https://bdbuildcon.com/why-us' }])),
        }}
      />
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

      {/* ── The BD Buildcon Standard — one deduplicated ledger ── */}
      <WhyUsMaster standards={standards} />

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

            <SlideIn from="right" className="flex justify-center items-center">
              <PhotoStackGallery photos={machineryPhotos} />
            </SlideIn>
          </div>
        </BlueprintReveal>
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
