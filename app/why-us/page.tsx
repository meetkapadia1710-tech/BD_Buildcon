import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CTABand } from '@/components/layout/CTABand'
import { PageHero } from '@/components/ui/PageHero'
import { TickerBand } from '@/components/ui/TickerBand'
import { PillarExplorer } from '@/components/ui/PillarExplorer'
import { LightboxGallery } from '@/components/ui/LightboxGallery'
import { QuoteCarousel } from '@/components/ui/QuoteCarousel'
import { SlideIn } from '@/components/motion/SlideIn'
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

const heroStats = [
  {
    value: String(stats.zeroAccidentYears),
    numeric: stats.zeroAccidentYears,
    suffix: '',
    label: 'Years zero-accident',
  },
  { value: statsDisplay.machinesOwned, numeric: stats.machinesOwned, suffix: '+', label: 'Machines we own' },
  { value: statsDisplay.repeatClientPct, numeric: stats.repeatClientPct, suffix: '%', label: 'Clients who return' },
  { value: statsDisplay.projects, numeric: stats.projects, suffix: '+', label: 'Projects delivered' },
]

const tickerItems = [
  'Zero accidents since 1990',
  'ISO 9001:2015 certified',
  'CRISIL SME 3 rated',
  'Turnkey EPC in-house',
  `${statsDisplay.valueDelivered} delivered`,
  'Since 1995 · Bharuch, Gujarat',
]

const pillars = [
  {
    title: 'Safety',
    badge: '0 accidents · 35 years',
    body: 'Safety is engineered into every protocol, every day on site — stringent safety systems and full statutory and environmental compliance, proven by a 35-year zero-accident journey.',
    them: 'Incidents tolerated as "normal".',
    photo: '/brochurephotos/safety/image15.webp',
    photoAlt: 'Worker in full PPE during a safety demonstration',
  },
  {
    title: 'Quality & Workmanship',
    badge: 'ISO 9001:2015',
    body: 'One certified quality system governs design, procurement and construction. Design codes set by international EPC consultants; every steel and cement batch traceable to mill certificate; client-signed hold points at reinforcement, shuttering and pre-pour.',
    them: 'Informal QA, no traceability.',
    photo: '/brochurephotos/site photos/technical photos/DocScanner Sep 9, 2025 5-45 PM_1(156).webp',
    photoAlt: 'On-site quality laboratory and control room',
  },
  {
    title: 'Technology & Precision',
    badge: 'BIM + ERP',
    body: 'BIM modelling, ERP systems and digital project management tools keep every dimension accountable from drawing to as-built.',
    them: 'Manual, untracked execution.',
    photo: '/brochurephotos/plant and machinery/image6.webp',
    photoAlt: 'Engineer operating a total station for precision setting-out',
  },
  {
    title: 'On-Time Delivery',
    badge: 'Deadline is contractual',
    body: 'A proven track record of meeting project timelines without compromising on quality — the deadline is a commitment, not an estimate.',
    them: 'Slippage passed to the client.',
    photo: '/brochurephotos/site photos/city center/city-center-night-170.webp',
    photoAlt: 'City Center — a completed project delivered on schedule',
  },
  {
    title: 'Turnkey Scope',
    badge: 'Turnkey EPC in-house',
    body: 'End-to-end EPC under one roof, tailored to each client’s requirements — flexible at every stage, with value-engineered solutions for cost-effective durability.',
    them: 'Layers of subcontractors.',
    photo: '/brochurephotos/fabrication yard/WhatsApp Image 2026-07-12 at 11.56.13 AM (1).webp',
    photoAlt: 'In-house fabrication yard with marked material bays',
  },
  {
    title: 'Equipment & Resources',
    badge: `${statsDisplay.machinesOwned} owned machines`,
    body: 'An owned fleet and in-house testing laboratory give complete operational control — higher equipment availability, zero rental dependency.',
    them: 'Rented plant, availability risk.',
    photo: '/brochurephotos/plant and machinery/image17.webp',
    photoAlt: 'Heavy plant and machinery owned by BD Buildcon',
  },
]

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

const fleetSpanPattern = ['col-span-2 row-span-2', '', '', 'row-span-2', '', '', 'col-span-2', '']

const fleetPhotos = machineryPhotos.map((src, i) => ({
  src,
  alt: 'BD Buildcon owned machinery',
  spanClassName: fleetSpanPattern[i % fleetSpanPattern.length],
}))

export default function WhyUsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: 'Why BD Buildcon', url: 'https://bdbuildcon.com/why-us' }])),
        }}
      />

      <PageHero
        image="/brochurephotos/general photo/2I2A7705.webp"
        imageAlt="BD Buildcon industrial site under construction"
        crumbLabel="Why Us"
        titleLines={[
          'Proof, poured',
          <>
            in <span className="text-[#5BD6E2]">concrete.</span>
          </>,
        ]}
        description="35 years on live industrial plants without a single accident. Every claim on this page is backed by a certificate, a client letter, or a machine we own."
        primaryCta={{ label: 'Start your project', href: '/contact' }}
        secondaryCta={{ label: 'See the fleet', href: '#fleet' }}
        stats={heroStats}
      />

      <TickerBand items={tickerItems} />

      {/* ── The Standard — interactive pillar explorer ── */}
      <section aria-label="The BD Buildcon Standard" className="bg-white py-[72px] lg:py-[110px]">
        <div className="max-w-container mx-auto px-gutter">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-[24px] lg:gap-[32px] mb-[48px] lg:mb-[64px]">
            <div>
              <span className="block text-[13px] font-semibold uppercase tracking-[0.14em] text-teal mb-[14px]">
                The BD Buildcon Standard
              </span>
              <h2 className="font-display font-[800] text-[34px] sm:text-[42px] lg:text-[52px] tracking-[-0.02em] leading-[1.08] text-ink m-0 max-w-[14ch]">
                Six reasons plants call us back.
              </h2>
            </div>
            <p className="text-[16px] leading-[1.7] text-body max-w-[380px] m-0">
              Select a pillar to see how we work — and what the same line item looks like with a typical contractor.
            </p>
          </div>

          <SlideIn from="bottom">
            <PillarExplorer items={pillars} />
          </SlideIn>
        </div>
      </section>

      {/* ── Fleet — masonry gallery + lightbox ── */}
      <section
        id="fleet"
        aria-label="Plant and Machinery"
        className="relative overflow-hidden bg-dark-bg py-[72px] lg:py-[110px]"
      >
        <div className="texture-grid pointer-events-none absolute inset-0 text-teal/[0.07]" aria-hidden="true" />
        <div className="relative max-w-container mx-auto px-gutter">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-[24px] lg:gap-[32px] mb-[48px] lg:mb-[56px]">
            <div>
              <span className="block text-[13px] font-semibold uppercase tracking-[0.14em] text-[#5BD6E2] mb-[14px]">
                Plant &amp; Machinery
              </span>
              <h2 className="font-display font-[800] text-[34px] sm:text-[42px] lg:text-[52px] tracking-[-0.02em] leading-[1.08] text-white m-0 max-w-[14ch]">
                {statsDisplay.machinesOwned} machines. All ours.
              </h2>
            </div>
            <p className="text-[16px] leading-[1.7] text-white/60 max-w-[400px] m-0">
              RMC plant, boom placer, excavators, vibratory rollers, transit mixers — an owned fleet means zero rental
              dependency and zero waiting. Click any photo to view.
            </p>
          </div>

          <LightboxGallery
            photos={fleetPhotos}
            groupLabel="Plant & Machinery"
            gridClassName="grid grid-cols-2 sm:grid-cols-4 auto-rows-[150px] sm:auto-rows-[200px] gap-[14px]"
          />
        </div>
      </section>

      {/* ── Testimonials — big-quote carousel ── */}
      <section aria-label="Testimonials" className="bg-surface border-y border-hairline py-[72px] lg:py-[110px]">
        <div className="max-w-container mx-auto px-gutter">
          <QuoteCarousel quotes={testimonials} />
        </div>
      </section>

      {/* ── Join or build — dual CTA ── */}
      <section aria-label="Join or Build" className="bg-white py-[72px] lg:py-[110px]">
        <div className="max-w-container mx-auto px-gutter grid grid-cols-1 md:grid-cols-2 gap-[20px]">
          <div className="relative rounded-card overflow-hidden min-h-[360px] sm:min-h-[440px] flex items-end">
            <Image
              src="/brochurephotos/site photos/ROXUL ROCKWOOL/DSC_8467.webp"
              alt="Industrial construction site"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(12,122,136,0.92), rgba(12,122,136,0.2) 60%)' }}
            />
            <div className="relative p-[32px] sm:p-[44px]">
              <h3 className="font-display font-[800] text-[26px] sm:text-[34px] tracking-[-0.01em] text-white mb-[12px]">
                Have a plant to build?
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/85 max-w-[400px] mb-[24px] sm:mb-[28px]">
                Tell us about your project — we respond within one business day with a senior engineer, not a sales rep.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-[10px] px-[24px] sm:px-[28px] py-[13px] sm:py-[14px] bg-white text-teal-deep text-[13px] font-semibold uppercase tracking-[0.1em] rounded-pill transition-all duration-[250ms] hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
              >
                Start your project
                <svg
                  className="w-[15px] h-[15px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="relative rounded-card overflow-hidden min-h-[360px] sm:min-h-[440px] flex items-end">
            <Image
              src="/brochurephotos/site photos/technical photos/our-site-team.webp"
              alt="BD Buildcon site team"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, rgba(13,20,24,0.92), rgba(13,20,24,0.15) 60%)' }}
            />
            <div className="relative p-[32px] sm:p-[44px]">
              <h3 className="font-display font-[800] text-[26px] sm:text-[34px] tracking-[-0.01em] text-white mb-[12px]">
                Want to build with us?
              </h3>
              <p className="text-[15px] sm:text-[16px] leading-[1.65] text-white/80 max-w-[400px] mb-[24px] sm:mb-[28px]">
                Engineers, supervisors and operators join a crew that has kept every one of its people safe for 35
                years.
              </p>
              <Link href="/contact" className="btn-ghost-white">
                Join the team
                <svg
                  className="w-[15px] h-[15px]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
