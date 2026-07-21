import type { Metadata } from 'next'
import { PageTitleBand } from '@/components/layout/PageTitleBand'
import { CTABand } from '@/components/layout/CTABand'
import { RevealImage } from '@/components/motion/RevealImage'
import { ParallaxLayer } from '@/components/motion/ParallaxLayer'
import { SlideIn } from '@/components/motion/SlideIn'
import { StaggerReveal } from '@/components/motion/StaggerReveal'
import { BlueprintReveal } from '@/components/motion/BlueprintReveal'
import { CountUp } from '@/components/motion/CountUp'
import { Spotlight } from '@/components/motion/Spotlight'
import { SurveyMark, SiloArtifact } from '@/components/ui/BlueprintArtifacts'
import { PhotoStackGallery } from '@/components/ui/PhotoStackGallery'
import { breadcrumbJsonLd, serviceJsonLd } from '@/lib/jsonld'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Safety & Quality',
  description:
    'A 35-year zero-accident journey. ISO 9001:2015-certified quality systems and a dedicated quality laboratory on every site.',
  alternates: { canonical: 'https://bdbuildcon.com/safety-quality' },
  openGraph: {
    url: 'https://bdbuildcon.com/safety-quality',
    title: 'Safety & Quality — BD Buildcon LLP',
    description: '35-year zero-accident journey. ISO 9001:2015 certified with on-site quality laboratories.',
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

const safetyStats = [
  {
    value: '0',
    numeric: 0,
    suffix: '',
    label: 'Accidents Recorded',
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-teal/30 mb-5 mx-auto group-hover:text-teal transition-colors duration-300"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    value: '35',
    numeric: 35,
    suffix: '',
    label: 'Year Zero-Accident Journey',
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-teal/30 mb-5 mx-auto group-hover:text-teal transition-colors duration-300"
      >
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
        <line x1="4" x2="4" y1="22" y2="15" />
      </svg>
    ),
  },
  {
    value: '100%',
    numeric: 100,
    suffix: '%',
    label: 'PPE Compliance',
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-teal/30 mb-5 mx-auto group-hover:text-teal transition-colors duration-300"
      >
        <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z" />
        <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
        <path d="M4 15v-3a8 8 0 0 1 16 0v3" />
      </svg>
    ),
  },
  {
    value: 'Daily',
    label: 'Toolbox Talks',
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-teal/30 mb-5 mx-auto group-hover:text-teal transition-colors duration-300"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
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
    photo: '/brochurephotos/site photos/technical photos/DocScanner Sep 9, 2025 5-45 PM_1(156).webp',
    photoAlt: 'On-site laboratory and control room with monitoring equipment',
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
    photo: '/brochurephotos/plant and machinery/image6.webp',
    photoAlt: 'Site engineer operating a total station for precision setting-out',
    icon: (
      <svg {...iconProps}>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    title: 'Material traceability',
    body: 'Every steel and cement batch traceable to mill certificate and receipt inspection.',
    photo: '/brochurephotos/fabrication yard/WhatsApp Image 2026-07-12 at 11.56.13 AM (1).webp',
    photoAlt: 'In-house fabrication yard with overhead gantry crane and marked material bays',
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
    photo: '/brochurephotos/site photos/technical photos/image33.webp',
    photoAlt: 'Reinforcement inspection of a raft foundation ahead of a concrete pour',
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
    photo: '/brochurephotos/site photos/technical photos/DocScanner Sep 9, 2025 5-45 PM_1(11).webp',
    photoAlt: 'RCC structure under construction with date-stamped pour records on the formwork',
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
    photo: '/brochurephotos/site photos/city center/city-center-night-170.webp',
    photoAlt: 'City Center — a completed and handed-over BD Buildcon project at night',
    icon: (
      <svg {...iconProps}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <path d="m9.5 15 1.5 1.5 3.5-3.5" />
      </svg>
    ),
  },
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
      className="mx-auto text-[#5BD6E2]"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  )
}

export default function SafetyQualityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbJsonLd([{ name: 'Safety & Quality', url: 'https://bdbuildcon.com/safety-quality' }]),
            serviceJsonLd({
              name: 'Safety & Quality Management',
              description:
                'ISO 9001:2015-certified quality systems and zero-accident safety protocols for industrial EPC projects.',
              url: 'https://bdbuildcon.com/safety-quality',
            }),
          ]),
        }}
      />
      <PageTitleBand
        title="Safety & Quality"
        breadcrumbs={[{ label: 'Safety & Quality' }]}
        description="A 35-year zero-accident journey. ISO 9001:2015-certified quality systems and a dedicated quality laboratory on every site."
      />

      {/* ── Safety Record ── */}
      <section aria-label="Safety Record" className="relative overflow-hidden py-[96px] bg-white">
        {/* Blueprint artifacts — SurveyMark corners */}
        <SurveyMark className="pointer-events-none absolute top-4 left-4 w-12 h-12 text-teal/[0.10] hidden lg:block" />
        <SurveyMark className="pointer-events-none absolute bottom-4 right-4 w-12 h-12 text-teal/[0.10] hidden lg:block" />
        <StaggerReveal
          className="relative z-10 max-w-container mx-auto px-gutter grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px]"
          stagger={0.08}
        >
          {safetyStats.map((s, i) => (
            <div
              key={i}
              className="group relative overflow-hidden border border-hairline rounded-card p-[32px] text-center transition-all duration-300 hover:border-teal/40 hover:shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:-translate-y-1 bg-white"
            >
              {/* Decorative background shapes that fade in on hover */}
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-surface rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"></div>
              <div className="absolute -left-8 -bottom-8 w-24 h-24 bg-teal/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"></div>

              <div className="relative z-10">
                {s.icon}
                <div className="font-display font-[800] text-[48px] leading-none text-teal mb-[12px] tabular-nums">
                  {s.numeric !== undefined ? <CountUp target={s.numeric} suffix={s.suffix} /> : s.value}
                </div>
                <div className="text-[13px] font-semibold uppercase tracking-[0.08em] text-body">{s.label}</div>
              </div>
            </div>
          ))}
        </StaggerReveal>
      </section>

      {/* ── Safety Protocols ── */}
      <section aria-label="Safety Protocols" className="bg-surface border-y border-hairline py-[96px]">
        <div className="max-w-container mx-auto px-gutter grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-[64px] items-center">
          {/* Safety Photo Stack */}
          <SlideIn from="left">
            <PhotoStackGallery
              photos={[
                '/brochurephotos/safety/67.webp',
                '/brochurephotos/safety/62.webp',
                '/brochurephotos/safety/safety-park.webp',
                '/brochurephotos/safety/image15.webp',
                '/brochurephotos/safety/image16.webp',
              ]}
              title="Safety on Site Gallery"
              stackAlt="BD Buildcon safety on site"
              className="w-full max-w-[480px] aspect-[4/3] mx-auto"
            />
          </SlideIn>

          <div className="relative">
            {/* Giant watermark shield */}
            <svg
              className="pointer-events-none absolute -right-4 -top-10 hidden w-[220px] h-[220px] text-teal/[0.06] sm:block"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              aria-hidden="true"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>

            <div className="relative">
              <span className="block text-[13px] font-semibold uppercase tracking-[0.12em] text-teal mb-[16px]">
                Safety on Site
              </span>
              <h2 className="font-display font-bold text-[38px] leading-[1.25] tracking-[-0.01em] text-ink mb-[20px]">
                Safety is a protocol, not a poster.
              </h2>
              <p className="text-[16px] leading-[1.7] text-body mb-[28px]">
                We firmly believe that a safe workplace is the foundation of successful project delivery. Our 35-year
                zero-accident journey stands as a testament to our disciplined safety culture, continuous training,
                strong leadership, and unwavering commitment to responsible construction practices.
              </p>
              <StaggerReveal direction="left" stagger={0.08} className="flex flex-col gap-[18px]">
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
              </StaggerReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Quality Systems ── */}
      <section aria-label="Quality Systems" className="py-[96px] bg-white">
        <BlueprintReveal className="max-w-container mx-auto px-gutter">
          <SlideIn from="bottom">
            <div className="text-center mb-[56px]">
              <h2 className="font-display font-bold text-[42px] tracking-[-0.01em] text-ink mb-[16px]">
                Quality Systems
              </h2>
              <div className="w-[56px] h-[3px] bg-teal rounded-full mx-auto mb-[20px]" />
              <p className="text-[18px] text-body max-w-[680px] mx-auto m-0">
                Quality is at the heart of everything we do. We never compromise on quality — every site is equipped
                with a dedicated quality laboratory, and documented QA runs from material receipt to final handover.
              </p>
            </div>
          </SlideIn>
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]" stagger={0.07}>
            {quality.map((q, i) => (
              <Spotlight
                key={i}
                className="group border border-hairline rounded-card overflow-hidden bg-white transition-all duration-300 hover:border-teal/40 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)]"
              >
                {/* Photo header */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <RevealImage
                    src={q.photo}
                    alt={q.photoAlt}
                    fill
                    wrapperClassName="absolute inset-0"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* soft bottom fade so the badge and text sit cleanly */}
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-[56px] bg-gradient-to-t from-black/25 to-transparent"
                    aria-hidden="true"
                  />
                </div>

                <div className="relative p-[30px] pt-0">
                  {/* Icon badge overlapping the photo edge */}
                  <div className="relative z-10 -mt-[23px] mb-[16px] w-[46px] h-[46px] rounded-full bg-teal text-white flex items-center justify-center ring-4 ring-white shadow-[0_4px_12px_rgba(22,168,184,0.35)]">
                    {q.icon}
                  </div>
                  <h3 className="font-display font-bold text-[19px] text-ink mb-[10px]">{q.title}</h3>
                  <p className="text-[15px] leading-[1.65] text-body m-0">{q.body}</p>
                </div>
              </Spotlight>
            ))}
          </StaggerReveal>
        </BlueprintReveal>
      </section>

      {/* ── Certifications ── */}
      <section aria-label="Certifications" className="relative overflow-hidden bg-dark-bg py-[88px]">
        {/* Blueprint artifact — SiloArtifact left edge, white line-art */}
        <SiloArtifact className="pointer-events-none absolute -left-8 top-1/2 -translate-y-1/2 h-[90%] w-auto text-white/[0.06] hidden lg:block" />
        <div
          className="absolute -right-24 -bottom-24 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #16A8B8, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="relative max-w-[980px] mx-auto px-gutter">
          <SlideIn from="bottom">
            <div className="text-center mb-[48px]">
              <span className="block text-[13px] font-semibold uppercase tracking-[0.12em] text-teal mb-[12px]">
                Accreditations
              </span>
              <h2 className="font-display font-bold text-[32px] text-white m-0">Independently Verified</h2>
            </div>
          </SlideIn>
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            <div className="border border-teal/30 bg-white/5 rounded-card p-[40px] text-center transition-all duration-300 hover:border-teal/60 hover:bg-white/[0.07]">
              <SealIcon />
              <div className="font-display font-[800] text-[28px] text-[#5BD6E2] mt-[14px] mb-[10px]">
                ISO 9001:2015
              </div>
              <p className="text-[15px] leading-[1.65] text-white/65 m-0">
                Certified quality management system covering design, procurement and construction execution.
              </p>
            </div>
            <div className="border border-teal/30 bg-white/5 rounded-card p-[40px] text-center transition-all duration-300 hover:border-teal/60 hover:bg-white/[0.07]">
              <SealIcon />
              <div className="font-display font-[800] text-[28px] text-[#5BD6E2] mt-[14px] mb-[10px]">CRISIL SME 3</div>
              <p className="text-[15px] leading-[1.65] text-white/65 m-0">
                Independently rated financial strength and operational credibility.
              </p>
            </div>
          </StaggerReveal>
        </div>
      </section>

      <CTABand />
    </>
  )
}
