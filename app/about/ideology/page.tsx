import type { Metadata } from 'next'
import { PageTitleBand } from '@/components/layout/PageTitleBand'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { CTABand } from '@/components/layout/CTABand'
import { FadeRise, FadeRiseItem } from '@/components/motion/FadeRise'

export const metadata: Metadata = {
  title: 'Ideology',
  description: 'Vision and Mission of BD Buildcon LLP — building with integrity, safety and on-time delivery.',
}

const values = [
  {
    icon: '🛡',
    title: 'Safety First',
    body: 'Every protocol, every team member, every day — safety is our non-negotiable foundation.',
  },
  {
    icon: '⏱',
    title: 'On-Time Delivery',
    body: 'We commit to deadlines and honour them through rigorous planning and owned resources.',
  },
  {
    icon: '🔬',
    title: 'Engineering Quality',
    body: 'ISO 9001:2015 processes and in-house testing ensure every deliverable meets specification.',
  },
  {
    icon: '🤝',
    title: 'Client Trust',
    body: 'Transparent communication and consistent results have made more than 60% of our clients repeat partners.',
  },
  {
    icon: '💡',
    title: 'Technology-Led',
    body: 'Owned plant, modern construction methods and digital tools keep us ahead of schedule.',
  },
  {
    icon: '🔄',
    title: 'Repeat Partnerships',
    body: 'The depth of our client relationships is our most valuable asset — built project by project.',
  },
]

export default function IdeologyPage() {
  return (
    <>
      <PageTitleBand
        title="Ideology"
        breadcrumbs={[{ label: 'About Us' }, { label: 'Ideology' }]}
      />

      {/* Vision & Mission */}
      <section className="section-pad bg-white">
        <div className="container-max max-w-3xl">
          <SectionHeading title="Our Ideology" subtitle="The principles that guide every decision we make on every project." />

          <div className="space-y-8">
            {/* Vision */}
            <FadeRiseItem>
              <div className="flex gap-6 p-8 bg-surface rounded-card border border-hairline">
                <div className="shrink-0 w-16 h-16 rounded-full bg-teal flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M20.188 10.934c.4.586.6 1.307.6 2.066s-.2 1.48-.6 2.066m-16.376 0A6.004 6.004 0 013 12c0-.759.2-1.48.6-2.066M12 4a8 8 0 100 16A8 8 0 0012 4z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-display text-headline-sm text-teal mb-3 uppercase tracking-wide">Vision</h2>
                  <p className="font-body text-body-lg text-body leading-relaxed">
                    To satisfy clients with a strong, proactive workforce and professional technocrats,
                    producing the highest quality standards in a timely manner while keeping the budget
                    in mind.
                  </p>
                </div>
              </div>
            </FadeRiseItem>

            {/* Mission */}
            <FadeRiseItem delay={0.1}>
              <div className="flex gap-6 p-8 bg-teal text-white rounded-card">
                <div className="shrink-0 w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-display text-headline-sm text-white mb-3 uppercase tracking-wide">Mission</h2>
                  <p className="font-body text-body-lg text-white/90 leading-relaxed">
                    To make BD Buildcon (formerly Bhumi Developers) one of the leading construction
                    companies of Western India in customers' choice.
                  </p>
                </div>
              </div>
            </FadeRiseItem>
          </div>
        </div>
      </section>

      {/* Values grid */}
      <section className="section-pad bg-surface border-t border-hairline">
        <div className="container-max">
          <SectionHeading title="Our Core Values" />
          <FadeRise className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v) => (
              <div
                key={v.title}
                className="card p-8 flex flex-col gap-4"
              >
                <span className="text-4xl">{v.icon}</span>
                <h3 className="font-display text-headline-sm text-ink">{v.title}</h3>
                <p className="font-body text-body-md text-body leading-relaxed">{v.body}</p>
              </div>
            ))}
          </FadeRise>
        </div>
      </section>

      <CTABand />
    </>
  )
}
