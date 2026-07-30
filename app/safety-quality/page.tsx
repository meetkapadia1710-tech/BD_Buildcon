import type { Metadata } from 'next'
import { CTABand } from '@/components/layout/CTABand'
import { PageHero } from '@/components/ui/PageHero'
import { TickerBand } from '@/components/ui/TickerBand'
import { PillarExplorer } from '@/components/ui/PillarExplorer'
import { LightboxGallery } from '@/components/ui/LightboxGallery'
import { SlideIn } from '@/components/motion/SlideIn'
import { StaggerReveal } from '@/components/motion/StaggerReveal'
import { faqs } from '@/content/faqs'
import { FAQSection } from '@/components/ui/FAQSection'
import { breadcrumbJsonLd, serviceJsonLd, faqJsonLd, serializeJsonLd } from '@/lib/jsonld'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Safety & Quality',
  description:
    'A 35-year zero-fatality journey. ISO 9001:2015-certified quality systems and a dedicated quality laboratory on every site.',
  alternates: { canonical: 'https://bdbuildcon.com/safety-quality' },
  openGraph: {
    url: 'https://bdbuildcon.com/safety-quality',
    title: 'Safety & Quality — BD Buildcon LLP',
    description: '35-year zero-fatality journey. ISO 9001:2015 certified with on-site quality laboratories.',
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

const heroStats = [
  { value: '0', numeric: 0, suffix: '', label: 'Fatalities' },
  { value: '35', numeric: 35, suffix: '', label: 'Year Zero-Fatality Journey' },
  { value: '100%', numeric: 100, suffix: '%', label: 'PPE Compliance' },
  { value: 'Daily', label: 'Toolbox Talks' },
]

const tickerItems = [
  'HSE at every stage',
  'Safety officers on every site',
  'ISO 9001:2015 certified',
  'Lab on every site',
  'Daily toolbox talks',
  '35-year 0 fatality record',
]

const protocols = [
  {
    title: 'HSE management at every stage',
    badge: 'Every project phase',
    body: 'Our comprehensive Health, Safety, and Environment management system integrates safety into every stage of project execution — from planning and risk assessment through commissioning.',
    photo: '/brochurephotos/safety/67.webp',
    photoAlt: 'Site-wide safety assembly',
  },
  {
    title: 'Dedicated Safety Officers on site',
    badge: 'Every site, full-time',
    body: 'Highly qualified and experienced Safety Officers are deployed across our project sites to enforce strict standards, monitor daily operations, and ensure statutory compliance.',
    photo: '/brochurephotos/safety/image15.webp',
    photoAlt: 'Safety officer conducting an equipment demonstration',
  },
  {
    title: 'Daily Toolbox Talks',
    badge: 'Before every workday',
    body: 'Conducted before the start of every workday to reinforce hazard awareness, safe work practices, and task-specific precautions.',
    photo: '/brochurephotos/safety/image16.webp',
    photoAlt: 'Toolbox talk on material storage safety',
  },
  {
    title: 'On-site Safety Parks',
    badge: 'Hands-on training',
    body: 'Practical demonstrations of hazardous activities, emergency response procedures, and proper PPE use — hands-on learning that builds workforce awareness.',
    photo: '/brochurephotos/safety/safety-park.webp',
    photoAlt: 'On-site safety park training session',
  },
  {
    title: 'Audits & continuous monitoring',
    badge: 'Scheduled + surprise',
    body: 'From project planning and risk assessment to regular site inspections and safety audits, safety remains at the heart of everything we do.',
    photo: '/brochurephotos/safety/62.webp',
    photoAlt: 'Safety award ceremony',
  },
]

const quality = [
  {
    title: 'Quality laboratory on every site',
    body: 'Every site is equipped with a dedicated quality laboratory to ensure all materials and workmanship meet the required standards at every stage.',
    icon: (
      <svg {...iconProps}>
        <path d="M9 3h6" />
        <path d="M10 3v6.5L4.5 18a1.6 1.6 0 0 0 1.4 2.5h12.2a1.6 1.6 0 0 0 1.4-2.5L14 9.5V3" />
        <path d="M7.5 15h9" />
      </svg>
    ),
  },
  {
    title: 'Modern testing equipment',
    body: 'Experienced and qualified engineers closely monitor quality using modern testing equipment and updated machinery.',
    icon: (
      <svg {...iconProps}>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: 'Material traceability',
    body: 'Every steel and cement batch traceable to mill certificate and receipt inspection.',
    icon: (
      <svg {...iconProps}>
        <path d="M20.59 13.41 12 22l-9.41-9.41A2 2 0 0 1 2 11.17V4a2 2 0 0 1 2-2h7.17a2 2 0 0 1 1.41.59L21 12a2 2 0 0 1 0 2Z" />
        <circle cx="7.5" cy="7.5" r="1.5" />
      </svg>
    ),
  },
  {
    title: 'Stage-gate inspections',
    body: 'Hold points at reinforcement, shuttering and pre-pour stages with client sign-off.',
    icon: (
      <svg {...iconProps}>
        <rect x="6" y="4" width="12" height="17" rx="2" />
        <path d="M9 4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1H9V4z" />
        <path d="m9.5 13 2 2 3.5-4" />
      </svg>
    ),
  },
  {
    title: 'QA/QC as a turnkey discipline',
    body: 'Quality Assurance & Quality Control built into project delivery — from material inspection through testing and commissioning.',
    icon: (
      <svg {...iconProps}>
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    title: 'Handover dossiers',
    body: 'Complete QA documentation packages delivered with every project handover.',
    icon: (
      <svg {...iconProps}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="m9.5 15 1.5 1.5 3.5-3.5" />
      </svg>
    ),
  },
]

const safetyPhotos = [
  {
    src: '/brochurephotos/safety/67.webp',
    alt: 'Safety assembly',
    spanClassName: 'col-span-2 row-span-2 aspect-square sm:aspect-auto',
  },
  {
    src: '/brochurephotos/safety/safety-park.webp',
    alt: 'Safety park training',
    spanClassName: 'row-span-2 aspect-square sm:aspect-auto',
  },
  { src: '/brochurephotos/safety/62.webp', alt: 'Safety award', spanClassName: 'aspect-square' },
  { src: '/brochurephotos/safety/image15.webp', alt: 'PPE demonstration', spanClassName: 'aspect-square' },
  { src: '/brochurephotos/safety/image16.webp', alt: 'Material storage safety', spanClassName: 'aspect-square' },
]

function SealIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mx-auto text-teal"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  )
}

export default function SafetyQualityPage() {
  const safetyFaqs = faqs.filter((f) => f.page.includes('safety-quality'))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([
            breadcrumbJsonLd([{ name: 'Safety & Quality', url: 'https://bdbuildcon.com/safety-quality' }]),
            serviceJsonLd({
              name: 'Safety & Quality Management',
              description:
                'ISO 9001:2015-certified quality systems and zero-fatality safety protocols for industrial EPC projects.',
              url: 'https://bdbuildcon.com/safety-quality',
            }),
            faqJsonLd(safetyFaqs),
          ]),
        }}
      />

      <PageHero
        image="/brochurephotos/safety/67.webp"
        imageAlt="Site-wide safety assembly at a BD Buildcon project"
        crumbLabel="Safety & Quality"
        titleLines={[
          '35 years.',
          <>
            <span className="text-[#5BD6E2]">0 Fatalities.</span>
          </>,
        ]}
        description="Not a slogan — a record. ISO 9001:2015-certified quality systems, a laboratory on every site, and a safety culture drilled into every workday since 1990."
        primaryCta={{ label: 'How we do it', href: '#protocols' }}
        secondaryCta={{ label: 'Quality systems', href: '#quality' }}
        stats={heroStats}
      />

      <TickerBand items={tickerItems} />

      {/* ── Safety Protocols — interactive explorer ── */}
      <section id="protocols" aria-label="Safety Protocols" className="bg-white py-[72px] lg:py-[110px]">
        <div className="max-w-container mx-auto px-gutter">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-[24px] lg:gap-[32px] mb-[48px] lg:mb-[64px]">
            <div>
              <span className="block text-[13px] font-semibold uppercase tracking-[0.14em] text-teal mb-[14px]">
                Safety on site
              </span>
              <h2 className="font-display font-[800] text-[34px] sm:text-[42px] lg:text-[52px] tracking-[-0.02em] leading-[1.08] text-ink m-0 max-w-[15ch]">
                A protocol, not a poster.
              </h2>
            </div>
            <p className="text-[16px] leading-[1.7] text-body max-w-[400px] m-0">
              Five disciplines run on every site, every day. Step through them — each one is photographed on our own
              sites, not stock.
            </p>
          </div>

          <SlideIn from="bottom">
            <PillarExplorer items={protocols} />
          </SlideIn>
        </div>
      </section>

      {/* ── Quality Systems — hairline capability matrix ── */}
      <section
        id="quality"
        aria-label="Quality Systems"
        className="relative overflow-hidden bg-[#111920] py-[56px] sm:py-[72px] lg:py-[110px]"
      >
        {/* Ambient glow — depth without a repeating pattern competing with the content */}
        <div
          className="pointer-events-none absolute -left-[10%] -top-[20%] h-[52vmax] w-[52vmax] rounded-full opacity-45 blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(22,168,184,0.30), transparent 65%)' }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-[28%] -right-[12%] h-[46vmax] w-[46vmax] rounded-full opacity-40 blur-[130px]"
          style={{ background: 'radial-gradient(circle, rgba(91,214,226,0.22), transparent 65%)' }}
          aria-hidden="true"
        />

        <div className="relative max-w-container mx-auto px-gutter">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-[20px] lg:gap-[48px] mb-[36px] sm:mb-[48px] lg:mb-[56px]">
            <div>
              <span className="flex items-center gap-[10px] text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.14em] text-[#5BD6E2] mb-[14px]">
                <span className="h-px w-[26px] bg-[#5BD6E2]/50" aria-hidden="true" />
                Quality systems
              </span>
              <h2 className="font-display font-[800] text-[28px] sm:text-[42px] lg:text-[52px] tracking-[-0.02em] leading-[1.08] text-white m-0 max-w-[15ch]">
                Documented from batch to handover.
              </h2>
            </div>
            <p className="text-[15px] sm:text-[16px] leading-[1.7] text-white/55 max-w-[400px] m-0 lg:text-right">
              Every site runs a dedicated quality laboratory, and QA paperwork travels with the structure — six
              disciplines, from mill certificate to handover dossier.
            </p>
          </div>

          {/* One cohesive panel; the 1px grid gaps read as hairline rules between cells */}
          <div className="overflow-hidden rounded-[20px] border border-white/[0.09]">
            <StaggerReveal
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.09]"
              stagger={0.07}
            >
              {quality.map((q, i) => (
                <div
                  key={i}
                  className="group relative bg-black/25 p-[26px] sm:p-[32px] transition-colors duration-300 hover:bg-black/10"
                >
                  {/* Teal wash on hover */}
                  <span
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: 'radial-gradient(ellipse 90% 70% at 50% 0%, rgba(91,214,226,0.10), transparent 70%)',
                    }}
                    aria-hidden="true"
                  />

                  <div className="relative">
                    <div className="flex items-center justify-between mb-[20px]">
                      <span className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-[12px] border border-white/[0.10] bg-white/[0.04] text-[#5BD6E2] transition-colors duration-300 group-hover:border-[#5BD6E2]/40 group-hover:bg-[#5BD6E2]/10">
                        {q.icon}
                      </span>
                      <span className="font-display font-[800] text-[13px] tabular-nums tracking-[0.14em] text-white/20 transition-colors duration-300 group-hover:text-[#5BD6E2]/60">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-[18px] sm:text-[20px] leading-[1.3] text-white mb-[10px]">
                      {q.title}
                    </h3>
                    <p className="text-[14px] sm:text-[14.5px] leading-[1.65] text-white/55 m-0">{q.body}</p>
                  </div>
                </div>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </section>

      {/* ── Safety in pictures — collage ── */}
      <section aria-label="Safety in Pictures" className="bg-surface border-y border-hairline py-[72px] lg:py-[110px]">
        <div className="max-w-container mx-auto px-gutter grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-[40px] lg:gap-[72px] items-center">
          <div>
            <span className="block text-[13px] font-semibold uppercase tracking-[0.14em] text-teal mb-[14px]">
              Culture, photographed
            </span>
            <h2 className="font-display font-[800] text-[32px] sm:text-[44px] tracking-[-0.02em] leading-[1.1] text-ink mb-[20px]">
              Safety you can see.
            </h2>
            <p className="text-[16px] leading-[1.75] text-body mb-[16px]">
              A safe workplace is the foundation of successful project delivery. Our 35-year zero-fatality journey
              stands on disciplined culture, continuous training, strong leadership, and responsible construction
              practice.
            </p>
            <p className="text-[16px] leading-[1.75] text-body m-0">
              Safety parks, morning assemblies, PPE drills, award ceremonies — click any photo to enlarge.
            </p>
          </div>
          <LightboxGallery
            photos={safetyPhotos}
            groupLabel="Safety"
            gridClassName="grid grid-cols-3 auto-rows-[130px] sm:auto-rows-[190px] gap-[14px]"
          />
        </div>
      </section>

      {/* ── Accreditations ── */}
      <section aria-label="Certifications" className="bg-white py-[72px] lg:py-[110px]">
        <div className="max-w-container mx-auto px-gutter">
          <div className="text-center mb-[48px] lg:mb-[56px]">
            <span className="block text-[13px] font-semibold uppercase tracking-[0.14em] text-teal mb-[14px]">
              Accreditations
            </span>
            <h2 className="font-display font-[800] text-[32px] sm:text-[42px] lg:text-[48px] tracking-[-0.02em] text-ink m-0">
              Independently verified.
            </h2>
          </div>
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-[20px] max-w-[1020px] mx-auto">
            <div className="border border-border rounded-card p-[36px] sm:p-[48px] sm:px-[44px] transition-all duration-300 hover:border-teal/50 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1">
              <div className="w-[56px] h-[56px] rounded-2xl bg-teal/10 flex items-center justify-center mb-[24px]">
                <SealIcon />
              </div>
              <div className="font-display font-[800] text-[26px] sm:text-[30px] text-ink mb-[10px]">ISO 9001:2015</div>
              <p className="text-[15px] sm:text-[15.5px] leading-[1.7] text-body m-0">
                Certified quality management system covering design, procurement and construction execution.
              </p>
            </div>
            <div className="border border-border rounded-card p-[36px] sm:p-[48px] sm:px-[44px] transition-all duration-300 hover:border-teal/50 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1">
              <div className="w-[56px] h-[56px] rounded-2xl bg-teal/10 flex items-center justify-center mb-[24px]">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#16A8B8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="font-display font-[800] text-[26px] sm:text-[30px] text-ink mb-[10px]">
                Zero-Fatality Record
              </div>
              <p className="text-[15px] sm:text-[15.5px] leading-[1.7] text-body m-0">
                35 consecutive years of zero fatalities across all live industrial sites.
              </p>
            </div>
          </StaggerReveal>
        </div>
      </section>

      <FAQSection faqs={safetyFaqs} />

      <CTABand
        title="Build with the zero-fatality contractor."
        subtitle="Tell us about your project and we will respond within one business day."
        btnLabel="Start your project"
      />
    </>
  )
}
