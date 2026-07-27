'use client'

import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const BuildingScroll = dynamic(() => import('@/components/motion/BuildingScroll').then((mod) => mod.BuildingScroll), {
  ssr: false,
})
import { CTABand } from '@/components/layout/CTABand'
import { SectorMarquee } from '@/components/layout/SectorMarquee'
import { CustomSelect } from '@/components/ui/CustomSelect'
import { CountUp } from '@/components/motion/CountUp'
import { SlideIn } from '@/components/motion/SlideIn'
import { StaggerReveal } from '@/components/motion/StaggerReveal'
import { RevealText, RevealLine } from '@/components/motion/RevealText'
import { MagneticButton } from '@/components/motion/MagneticButton'
import { services } from '@/content/services'
import { clients } from '@/content/clients'
import { consultants } from '@/content/consultants'
import { submitEnquiry } from '@/lib/submitEnquiry'
import { TrussArtifact, DimensionLines, SurveyMark, CraneArtifact } from '@/components/ui/BlueprintArtifacts'

import { stats, statsDisplay } from '@/content/company'
import { faqs } from '@/content/faqs'
import { testimonials } from '@/content/testimonials'
import { FAQSection } from '@/components/ui/FAQSection'
import { faqJsonLd, reviewJsonLd } from '@/lib/jsonld'

// Sectors are now defined inside SectorMarquee component

const pillars = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    title: '0 Fatalities',
    body: 'Safety is engineered into every protocol, every day on site.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20z M12 6v6l4 2" />
      </svg>
    ),
    title: 'On-Time Delivery',
    body: 'Predictable timelines backed by rigorous planning and owned plant.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 3a4 4 0 100 8 4 4 0 000-8z M23 21v-2a4 4 0 010 7.75" />
      </svg>
    ),
    title: '70% Repeat Clients',
    body: 'More than two-thirds of our clients return — the strongest endorsement.',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M2 3h20v14H2z M8 21h8 M12 17v4" />
      </svg>
    ),
    title: 'Technology Under One Roof',
    body: 'Owned fleet, testing lab and specialist teams — no third-party dependency.',
  },
]

const trackStats = [
  { value: stats.projects, suffix: '+', label: 'Projects Completed' },
  { value: stats.yearsExperience, suffix: '+', label: 'Years Experience' },
  { value: stats.accidents, suffix: '', label: 'Fatalities Recorded' },
  { value: stats.repeatClientPct, suffix: '%', label: 'Repeat Client Ratio' },
]

export default function HomePage() {
  const homeFaqs = faqs.filter((f) => f.page.includes('home'))
  const organizationReviews = reviewJsonLd(testimonials)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([faqJsonLd(homeFaqs), ...organizationReviews]),
        }}
      />
      {/* ── Hero ── */}
      <section
        aria-label="Hero"
        className="relative min-h-[calc(100dvh-72px)] flex items-center justify-center overflow-hidden bg-dark-bg"
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image
            src="/new-hero-image.webp"
            alt="Crane lifting steel beams at a BD Buildcon construction site"
            fill
            className="object-cover animate-hero-zoom"
            priority
          />
        </div>

        <div className="relative z-10 w-full h-full flex flex-col justify-end pb-[40px] sm:pb-[80px] mt-auto">
          <RevealText
            as="h1"
            className="text-white text-left font-display font-[800] text-[44px] sm:text-[68px] md:text-[88px] lg:text-[112px] leading-[1.15] tracking-tight mb-[32px] sm:mb-[48px] px-4 sm:px-8 lg:px-12 w-full max-w-[1400px]"
            stagger={0.18}
          >
            <RevealLine>
              Building <span className="font-serif italic font-light text-white/75">modern</span>
            </RevealLine>
            <RevealLine>
              <span className="text-white inline-block animate-hero-word-expand">infrastructure</span>
            </RevealLine>
          </RevealText>

          <div className="flex flex-col sm:flex-row gap-8 justify-between items-start sm:items-end w-full px-4 sm:px-8 lg:px-12">
            <div className="flex flex-wrap items-center gap-[12px] sm:gap-[16px]">
              <div className="inline-flex items-center gap-[8px] bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-[14px] sm:px-[16px] py-[8px] text-white/90 font-medium text-[10px] sm:text-[11px] uppercase tracking-[0.15em]">
                <span className="w-[6px] h-[6px] bg-[#5BD6E2] rounded-full" />
                35+ years
              </div>
              <div className="inline-flex items-center gap-[8px] bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-[14px] sm:px-[16px] py-[8px] text-white/90 font-medium text-[10px] sm:text-[11px] uppercase tracking-[0.15em]">
                <span className="w-[6px] h-[6px] bg-[#5BD6E2] rounded-full" />
                ISO 9001:2015
              </div>
              <div className="inline-flex items-center gap-[8px] bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-[14px] sm:px-[16px] py-[8px] text-white/90 font-medium text-[10px] sm:text-[11px] uppercase tracking-[0.15em]">
                <span className="w-[6px] h-[6px] bg-[#5BD6E2] rounded-full" />
                35-year zero fatality
              </div>
            </div>

            <div className="flex gap-[12px] sm:gap-[16px] w-full sm:w-auto">
              <MagneticButton
                as="a"
                href="/projects"
                strength={0.35}
                className="border border-white/30 backdrop-blur-sm text-white text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.1em] px-[24px] sm:px-[32px] py-[12px] sm:py-[13px] rounded-full transition-colors duration-300 hover:bg-white hover:text-ink w-full sm:w-auto text-center"
              >
                See the work
              </MagneticButton>
              <MagneticButton
                as="a"
                href="/contact"
                strength={0.35}
                className="bg-white text-ink text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.1em] px-[24px] sm:px-[32px] py-[12px] sm:py-[13px] rounded-full transition-colors duration-300 hover:bg-gray-100 w-full sm:w-auto text-center"
              >
                Start project
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sector Marquee ── */}
      <SectorMarquee />

      {/* ── What We Build ── */}
      <section aria-label="What We Build" className="bg-white">
        <div className="max-w-container mx-auto px-gutter pt-[56px] sm:pt-[72px] pb-[56px] sm:pb-[72px]">
          <div className="text-center mb-[48px] sm:mb-[64px]">
            <span className="font-body text-[11px] font-bold text-teal bg-teal/5 px-[12px] py-[5px] rounded-full border border-teal/15 tracking-[0.1em] uppercase mb-[12px] inline-block">
              Core Divisions
            </span>
            <h2 className="font-display font-bold text-[32px] sm:text-[42px] tracking-[-0.01em] text-ink mb-[16px]">
              What We Build
            </h2>
            <div className="w-[56px] h-[3px] bg-teal rounded-full mx-auto mb-[20px]" />
            <p className="text-[16px] sm:text-[18px] leading-[1.7] text-body max-w-[760px] mx-auto">
              BD Buildcon LLP is an ISO 9001:2015–certified industrial EPC contractor based in Bharuch, Gujarat,
              delivering civil engineering, mechanical services, and turnkey construction for India&apos;s chemical,
              pharmaceutical, and process industries since 1995. Explore our turnkey execution methodology and
              comprehensive technical capabilities across our three primary engineering divisions.
            </p>
          </div>

          <div className="flex flex-col gap-[80px] sm:gap-[100px]">
            {services.map((svc, idx) => {
              const isReversed = idx % 2 !== 0
              return (
                <SlideIn key={svc.id} from={isReversed ? 'right' : 'left'} delay={0.05}>
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-[32px] lg:gap-[64px] items-center${
                      idx > 0 ? ' pt-[80px] sm:pt-[100px] border-t border-hairline' : ''
                    }`}
                  >
                    <div
                      className={`relative w-full aspect-[16/10] rounded-card overflow-hidden bg-dark-bg${
                        isReversed ? ' lg:order-2' : ''
                      }`}
                    >
                      <Image
                        src={svc.image}
                        alt={svc.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                    <div className={isReversed ? 'lg:order-1' : ''}>
                      <div className="flex items-center gap-[12px] mb-[16px]">
                        <span className="font-body text-[11px] font-bold text-teal bg-teal/5 px-[10px] py-[4px] rounded-[4px] border border-teal/15 tracking-[0.05em]">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="font-body text-[11px] tracking-[0.15em] uppercase text-body font-semibold">
                          Service
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-[24px] sm:text-[30px] tracking-[-0.01em] text-ink mb-[12px] sm:mb-[16px]">
                        {svc.title}
                      </h3>
                      <p className="text-[15px] sm:text-[17px] leading-[1.7] text-body mb-[20px] sm:mb-[24px]">
                        {svc.description}
                      </p>
                      <ul className="flex flex-col gap-[8px] mb-[24px] sm:mb-[32px]">
                        {svc.bullets.slice(0, 5).map((b, bi) => (
                          <li key={bi} className="flex items-start gap-[10px] text-[14px] sm:text-[15px] text-body">
                            <span className="text-teal mt-[3px] shrink-0">✓</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={`/services/${svc.id}`}
                        className="inline-flex items-center gap-[8px] py-[10px] -my-[10px] text-[13px] font-semibold uppercase tracking-[0.1em] text-teal hover:text-[#0E8C9B] transition-colors duration-200"
                      >
                        Explore service details
                        <span className="text-[16px]">→</span>
                      </Link>
                    </div>
                  </div>
                </SlideIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── How we build ── */}
      <BuildingScroll />

      {/* ── Stats ── */}
      <section aria-label="Key statistics" className="relative overflow-hidden bg-teal py-[64px] sm:py-[76px]">
        <div className="texture-dots pointer-events-none absolute inset-0 text-white/[0.08]" aria-hidden="true" />
        {/* Blueprint artifact — TrussArtifact bottom-left, white line-art */}
        <TrussArtifact className="pointer-events-none absolute -bottom-6 -left-6 w-[320px] h-auto text-white/[0.08] hidden lg:block" />
        <div className="relative max-w-container mx-auto px-gutter">
          <SlideIn from="bottom">
            <div className="text-center mb-[56px]">
              <h2 className="font-display font-bold text-[42px] tracking-[-0.01em] text-white mb-[16px]">
                Our Track Record
              </h2>
              <div className="w-[56px] h-[3px] bg-white/50 rounded-full mx-auto mb-[20px]" />
              <p className="text-[18px] text-white/75 m-0">
                Numbers that have been earned on site — not in a brochure.
              </p>
            </div>
          </SlideIn>
          <StaggerReveal className="grid grid-cols-2 md:grid-cols-4 gap-[32px] text-center" stagger={0.1}>
            {trackStats.map((s, i) => (
              <div key={i}>
                <div className="font-display font-[800] text-[64px] leading-none text-white mb-[12px] font-variant-numeric tabular-nums">
                  <CountUp target={s.value} suffix={s.suffix} />
                </div>
                <div className="text-[13px] font-semibold uppercase tracking-[0.1em] text-white/75">{s.label}</div>
              </div>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ── Director ── */}
      <section
        aria-label="Message from the Director"
        className="relative overflow-hidden bg-white py-[64px] sm:py-[80px]"
      >
        {/* Blueprint artifact — DimensionLines along left edge */}
        <DimensionLines className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 h-[80%] w-auto text-teal/[0.10] hidden lg:block" />
        <div className="relative z-10 max-w-container mx-auto px-gutter grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-[72px] items-center">
          <SlideIn from="left">
            <div
              className="relative aspect-[3/4] rounded-card overflow-hidden bg-[#EFF3F4] flex items-center justify-center"
              style={{ backgroundImage: 'repeating-linear-gradient(45deg, #EFF3F4 0 14px, #E6ECEE 14px 28px)' }}
            >
              <span className="font-mono text-[13px] color-body bg-white border border-hairline rounded-[6px] px-[12px] py-[6px]">
                director portrait
              </span>
            </div>
          </SlideIn>
          <SlideIn from="right" delay={0.1}>
            <div>
              <span className="block text-[13px] font-semibold uppercase tracking-[0.12em] text-teal mb-[20px]">
                Desk of Directors
              </span>
              <blockquote className="font-display font-semibold text-[26px] leading-[1.45] text-ink mb-[24px]">
                &ldquo;Every project we undertake must be delivered safely, on time, and to the highest quality
                standards. There are no shortcuts when people&apos;s lives and industrial operations depend on what we
                build.&rdquo;
              </blockquote>
              <p className="text-[17px] leading-[1.75] text-body mb-[32px]">
                Over {stats.yearsExperience} years, we have grown from a regional civil contractor into a full-service
                turnkey EPC partner recognised across Gujarat and beyond — earned project by project through transparent
                communication, technical depth and the resilience to deliver under pressure.
              </p>
              <div className="flex items-center gap-[16px] mb-[32px]">
                <span className="w-[40px] h-[2px] bg-teal block" />
                <div>
                  <p className="font-display font-bold text-[17px] text-ink m-0">Kiran Majmudar</p>
                  <p className="text-[14px] text-body mt-[2px] mb-0">Director, BD Buildcon LLP · Est. 1995</p>
                </div>
              </div>
              <Link
                href="/about"
                className="inline-block border-[2px] border-teal text-teal text-[13px] font-semibold uppercase tracking-[0.1em] px-[30px] py-[13px] rounded-full transition-colors duration-200 hover:bg-teal hover:text-white"
              >
                About BD Buildcon
              </Link>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* ── Trusted By ── */}
      <section aria-label="Our clients" className="bg-surface border-top border-hairline py-[64px] sm:py-[80px]">
        <div className="w-full mx-auto px-gutter xl:px-[80px]">
          <SlideIn from="bottom">
            <div className="text-center mb-[56px]">
              <h2 className="font-display font-bold text-[42px] tracking-[-0.01em] text-ink mb-[16px]">Trusted By</h2>
              <div className="w-[56px] h-[3px] bg-teal rounded-full mx-auto mb-[20px]" />
              <p className="text-[18px] text-body m-0">
                Industry leaders who partner with BD Buildcon for mission-critical construction.
              </p>
            </div>
          </SlideIn>
          {/* ── Marquee Rows ── */}
          <div className="relative overflow-hidden">
            {/* Gradient masks for smooth fading on edges */}
            <div className="absolute top-0 left-0 bottom-0 w-[80px] sm:w-[150px] bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 bottom-0 w-[80px] sm:w-[150px] bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

            {/* Row 1: Clients (Moves left) */}
            <div className="flex w-max animate-marquee mb-[24px] hover:pause">
              <div className="flex gap-[24px] pr-[24px]">
                {clients.map((c, i) => (
                  <div
                    key={`client-1-${i}`}
                    className="w-[240px] shrink-0 bg-white border border-hairline rounded-card p-[24px] flex flex-col items-center justify-center gap-[16px] min-h-[180px] text-center transition-all duration-200 hover:border-teal/40 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
                  >
                    {c.logo && (
                      <div className="relative w-full max-w-[160px] h-[72px]">
                        <Image src={c.logo} alt={c.name} fill className="object-contain" />
                      </div>
                    )}
                    <div>
                      <span className="block font-display font-bold text-[14.5px] leading-[1.2] text-ink">
                        {c.name}
                      </span>
                      <span className="block text-[12px] text-body mt-[6px]">{c.sector}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-[24px] pr-[24px]" aria-hidden="true">
                {clients.map((c, i) => (
                  <div
                    key={`client-2-${i}`}
                    className="w-[240px] shrink-0 bg-white border border-hairline rounded-card p-[24px] flex flex-col items-center justify-center gap-[16px] min-h-[180px] text-center transition-all duration-200 hover:border-teal/40 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
                  >
                    {c.logo && (
                      <div className="relative w-full max-w-[160px] h-[72px]">
                        <Image src={c.logo} alt={c.name} fill className="object-contain" />
                      </div>
                    )}
                    <div>
                      <span className="block font-display font-bold text-[14.5px] leading-[1.2] text-ink">
                        {c.name}
                      </span>
                      <span className="block text-[12px] text-body mt-[6px]">{c.sector}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Consultants (Moves right) */}
            <div className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused]">
              <div className="flex gap-[24px] pr-[24px]">
                {consultants.map((c, i) => (
                  <div
                    key={`cons-1-${i}`}
                    className="w-[240px] shrink-0 bg-white border border-hairline rounded-card p-[24px] flex flex-col items-center justify-center gap-[16px] min-h-[180px] text-center transition-all duration-200 hover:border-teal/40 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
                  >
                    {c.logo && (
                      <div className="relative w-full max-w-[160px] h-[72px]">
                        <Image src={c.logo} alt={c.name} fill className="object-contain" />
                      </div>
                    )}
                    <div>
                      <span className="block font-display font-bold text-[14.5px] leading-[1.2] text-ink">
                        {c.name}
                      </span>
                      <span className="block text-[12px] text-body mt-[6px]">{c.sector}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-[24px] pr-[24px]" aria-hidden="true">
                {consultants.map((c, i) => (
                  <div
                    key={`cons-2-${i}`}
                    className="w-[240px] shrink-0 bg-white border border-hairline rounded-card p-[24px] flex flex-col items-center justify-center gap-[16px] min-h-[180px] text-center transition-all duration-200 hover:border-teal/40 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
                  >
                    {c.logo && (
                      <div className="relative w-full max-w-[160px] h-[72px]">
                        <Image src={c.logo} alt={c.name} fill className="object-contain" />
                      </div>
                    )}
                    <div>
                      <span className="block font-display font-bold text-[14.5px] leading-[1.2] text-ink">
                        {c.name}
                      </span>
                      <span className="block text-[12px] text-body mt-[6px]">{c.sector}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Enquiry form ── */}
      <section aria-label="Quick enquiry form" className="relative overflow-hidden bg-white py-[96px]">
        {/* Blueprint artifacts — SurveyMark top-right + CraneArtifact bottom-left */}
        <SurveyMark className="pointer-events-none absolute top-6 right-6 w-16 h-16 text-teal/[0.12] hidden lg:block" />
        <CraneArtifact className="pointer-events-none absolute -bottom-8 -left-4 w-[180px] h-auto text-teal/[0.10] hidden lg:block" />
        <div className="relative z-10 max-w-[960px] mx-auto px-6 sm:px-10">
          <SlideIn from="bottom">
            <div className="text-center mb-[48px]">
              <h2 className="font-display font-bold text-[42px] tracking-[-0.01em] text-ink mb-[16px]">
                Start a Conversation
              </h2>
              <div className="w-[56px] h-[3px] bg-teal rounded-full mx-auto mb-[20px]" />
              <p className="text-[18px] text-body m-0">
                Tell us about your project — we respond within one business day.
              </p>
            </div>
          </SlideIn>

          <HomeEnquiryForm />
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <FAQSection faqs={homeFaqs} />

      {/* ── CTA band ── */}
      <CTABand />
    </>
  )
}

function HomeEnquiryForm() {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    setSending(true)
    setSent(false)
    setError(null)

    const result = await submitEnquiry(form)
    setSending(false)
    if (result.ok) {
      setSent(true)
      form.reset()
    } else {
      setError(result.error ?? 'Something went wrong. Please try again.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border border-hairline rounded-card shadow-[0_1px_4px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.06)] p-[32px] sm:p-[48px] flex flex-col gap-[28px]"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[24px] gap-y-[28px]">
        <div>
          <label
            htmlFor="hq-name"
            className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-ink mb-[10px]"
          >
            Name <span className="text-error">*</span>
          </label>
          <input
            id="hq-name"
            name="name"
            type="text"
            required
            placeholder="Your full name"
            className="w-full bg-surface border border-hairline rounded-[10px] px-[18px] py-[14px] font-body text-[15.5px] text-ink focus:border-teal focus:shadow-[0_0_0_3px_rgba(22,168,184,0.12)] focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="hq-email"
            className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-ink mb-[10px]"
          >
            Email <span className="text-error">*</span>
          </label>
          <input
            id="hq-email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className="w-full bg-surface border border-hairline rounded-[10px] px-[18px] py-[14px] font-body text-[15.5px] text-ink focus:border-teal focus:shadow-[0_0_0_3px_rgba(22,168,184,0.12)] focus:outline-none"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[24px] gap-y-[28px]">
        <div>
          <label
            htmlFor="hq-company"
            className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-ink mb-[10px]"
          >
            Company
          </label>
          <input
            id="hq-company"
            name="company"
            type="text"
            placeholder="Your company name"
            className="w-full bg-surface border border-hairline rounded-[10px] px-[18px] py-[14px] font-body text-[15.5px] text-ink focus:border-teal focus:shadow-[0_0_0_3px_rgba(22,168,184,0.12)] focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="hq-phone"
            className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-ink mb-[10px]"
          >
            Phone
          </label>
          <input
            id="hq-phone"
            name="phone"
            type="tel"
            placeholder="+91 XXX XXX XXXX"
            className="w-full bg-surface border border-hairline rounded-[10px] px-[18px] py-[14px] font-body text-[15.5px] text-ink focus:border-teal focus:shadow-[0_0_0_3px_rgba(22,168,184,0.12)] focus:outline-none"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[24px] gap-y-[28px]">
        <div>
          <label
            htmlFor="hq-sector"
            className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-ink mb-[10px]"
          >
            Sector
          </label>
          <select
            id="hq-sector"
            name="sector"
            className="w-full bg-surface border border-hairline rounded-[10px] px-[18px] py-[14px] font-body text-[15.5px] text-ink appearance-auto focus:border-teal focus:shadow-[0_0_0_3px_rgba(22,168,184,0.12)] focus:outline-none"
          >
            <option>Select sector</option>
            <option>Chemicals</option>
            <option>Pharma</option>
            <option>Petroleum</option>
            <option>Fertiliser</option>
            <option>Glass</option>
            <option>Tyre</option>
            <option>Food Processing</option>
            <option>Institutional</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="hq-type"
            className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-ink mb-[10px]"
          >
            Project Type
          </label>
          <select
            id="hq-type"
            name="projectType"
            className="w-full bg-surface border border-hairline rounded-[10px] px-[18px] py-[14px] font-body text-[15.5px] text-ink appearance-auto focus:border-teal focus:shadow-[0_0_0_3px_rgba(22,168,184,0.12)] focus:outline-none"
          >
            <option>Select type</option>
            <option>Greenfield Plant</option>
            <option>Plant Expansion</option>
            <option>PEB Structure</option>
            <option>Piping &amp; Mechanical</option>
            <option>Civil Works</option>
            <option>Roads &amp; Earthwork</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div>
        <label
          htmlFor="hq-message"
          className="block text-[12px] font-semibold uppercase tracking-[0.08em] text-ink mb-[10px]"
        >
          Message <span className="text-error">*</span>
        </label>
        <textarea
          id="hq-message"
          name="message"
          rows={4}
          required
          placeholder="Brief project description..."
          className="w-full bg-surface border border-hairline rounded-[10px] px-[18px] py-[14px] font-body text-[15.5px] text-ink resize-y focus:border-teal focus:shadow-[0_0_0_3px_rgba(22,168,184,0.12)] focus:outline-none"
        ></textarea>
      </div>
      <div className="flex flex-col gap-[10px]">
        <div className="flex items-center gap-[16px]">
          <MagneticButton
            as="button"
            type="submit"
            disabled={sending}
            strength={0.3}
            className="bg-teal text-white border-none cursor-pointer font-body text-[13px] font-semibold uppercase tracking-[0.1em] px-[36px] py-[15px] rounded-full transition-colors duration-200 hover:bg-[#0E8C9B] disabled:opacity-70"
          >
            {sending ? 'Sending...' : 'Send Enquiry'}
          </MagneticButton>
          {sent && (
            <span className="text-[14px] text-success font-medium">
              ✓ Enquiry sent — we&apos;ll get back to you shortly.
            </span>
          )}
        </div>
        {error && <span className="text-[14px] text-error font-medium">{error}</span>}
      </div>
    </form>
  )
}
