import type { Metadata } from 'next'
import Image from 'next/image'
import { PageTitleBand } from '@/components/layout/PageTitleBand'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { CTABand } from '@/components/layout/CTABand'
import { FadeRise, FadeRiseItem } from '@/components/motion/FadeRise'
import { RevealImage } from '@/components/motion/RevealImage'
import { CountUp } from '@/components/motion/CountUp'

export const metadata: Metadata = {
  title: 'Why Us',
  description: 'Why choose BD Buildcon? 25+ years of industrial EPC expertise, zero accidents, 60% repeat clients, and all technology under one roof.',
}

const reasons = [
  {
    id: 'size',
    label: 'Company Size & Capability',
    heading: 'Scale that delivers.',
    body: 'A large-scale turnkey contracting company focused on safety, quality and timely completion. Our size and owned resources ensure projects finish within the deadline — without dependency on third-party subcontractors for critical works.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=900&auto=format&fit=crop',
    imageAlt: 'Large industrial construction site with BD Buildcon heavy machinery',
    reverse: false,
  },
  {
    id: 'safety',
    label: 'Safety',
    heading: 'Zero accidents. Always.',
    body: 'Safety is of utmost importance. Our zero-accident track record means your project is in reliable hands. Regular safety programmes, daily toolbox talks and rigorous permit-to-work systems protect our employees, your plant personnel and the public.',
    image: 'https://images.unsplash.com/photo-1621619856624-42fd193a0661?q=80&w=900&auto=format&fit=crop',
    imageAlt: 'Workers in hi-vis gear conducting safety briefing on construction site',
    reverse: true,
  },
  {
    id: 'schedule',
    label: 'Schedule & Delivery',
    heading: 'On time. Every time.',
    body: 'We commit to timely completion, using the latest tools, techniques and technology to keep projects on deadline. Detailed scheduling, weekly progress reviews and proactive risk mitigation are embedded in our project management approach.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=900&auto=format&fit=crop',
    imageAlt: 'Industrial plant nearing completion — on-schedule delivery',
    reverse: false,
  },
  {
    id: 'technology',
    label: 'Technology',
    heading: 'Everything under one roof.',
    body: 'Owned plant and machinery, in-house testing laboratory, and specialist teams for civil, mechanical, PEB and piping — all under one contract. This eliminates coordination delays and gives you a single accountable partner for your entire project.',
    image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?q=80&w=900&auto=format&fit=crop',
    imageAlt: 'Construction machinery and testing equipment in BD Buildcon yard',
    reverse: true,
  },
]

const differentiators = [
  { value: 25, suffix: '+', label: 'Years of Experience' },
  { value: 0, suffix: '', label: 'Accidents Recorded' },
  { value: 60, suffix: '%', label: 'Repeat Client Ratio' },
  { value: 50, suffix: '+', label: 'Major Projects Completed' },
]

export default function WhyUsPage() {
  return (
    <>
      <PageTitleBand
        title="Why BD Buildcon?"
        breadcrumbs={[{ label: 'Why Us' }]}
        description="The BD Buildcon team has 25+ years of experience and a proven track record, ensuring projects are completed in a timely, quality and professional manner."
      />

      {/* Alternating rows */}
      <section className="section-pad bg-white space-y-20 lg:space-y-28">
        {reasons.map((reason) => (
          <div key={reason.id} className="container-max">
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                reason.reverse ? 'lg:[&>:first-child]:order-2' : ''
              }`}
            >
              {/* Image */}
              <RevealImage
                src={reason.image}
                alt={reason.imageAlt}
                fill
                wrapperClassName="aspect-[16/10] rounded-card overflow-hidden"
                className="object-cover"
                parallax
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Text */}
              <FadeRiseItem>
                <span className="font-body text-label-md text-teal uppercase tracking-widest block mb-3">
                  {reason.label}
                </span>
                <h2 className="font-display text-headline-md text-ink mb-5 leading-snug">
                  {reason.heading}
                </h2>
                <p className="font-body text-body-lg text-body leading-relaxed">{reason.body}</p>
              </FadeRiseItem>
            </div>
          </div>
        ))}
      </section>

      {/* Stats differentiator */}
      <section className="section-pad bg-teal text-white" aria-label="Key differentiators">
        <div className="container-max">
          <SectionHeading title="By the Numbers" subtitle="Our track record speaks for itself." />
          <FadeRise className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {differentiators.map((d) => (
              <div key={d.label}>
                <div className="font-display font-extrabold text-display-lg text-white leading-none mb-3">
                  <CountUp target={d.value} suffix={d.suffix} />
                </div>
                <div className="font-body text-label-md uppercase tracking-wider text-white/80">
                  {d.label}
                </div>
              </div>
            ))}
          </FadeRise>

          {/* Certifications */}
          <FadeRiseItem delay={0.2}>
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              {['ISO 9001:2015', 'NSIC-CRISIL Rated', 'Zero Accidents Since 1992'].map((badge) => (
                <div
                  key={badge}
                  className="flex items-center gap-2 bg-white/10 rounded-full px-5 py-2.5 backdrop-blur-sm"
                >
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-body text-label-md text-white uppercase tracking-wider">{badge}</span>
                </div>
              ))}
            </div>
          </FadeRiseItem>
        </div>
      </section>

      <CTABand />
    </>
  )
}
