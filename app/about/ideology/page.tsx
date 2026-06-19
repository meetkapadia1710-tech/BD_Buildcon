import type { Metadata } from 'next'
import { PageTitleBand } from '@/components/layout/PageTitleBand'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { CTABand } from '@/components/layout/CTABand'
import { FadeRise, FadeRiseItem } from '@/components/motion/FadeRise'

export const metadata: Metadata = {
  title: 'Ideology',
  description: 'The vision, mission and core values of BD Buildcon LLP — integrity, trust, safety and quality-first execution since 1995.',
}

const values = [
  {
    title: 'Integrity',
    body: 'Hard work and integrity are instilled in every employee. We hold ourselves to the highest standards in the industry — in our workmanship, our communication and our commitments.',
  },
  {
    title: 'Trust',
    body: 'Trust is the foundation of every client relationship. Our 70% repeat client ratio is the most meaningful proof of the relationships we have built — one project at a time.',
  },
  {
    title: 'Caring',
    body: 'We value the health and safety of our employees, and the well-being of the communities where we work and the environment. This humanitarian mindset drives every decision on site.',
  },
  {
    title: 'Quality First',
    body: '"Do it right the first time" is not a slogan — it is our operating philosophy. ISO 9001:2015 certified processes and in-house testing ensure every deliverable meets specification.',
  },
  {
    title: 'Safety',
    body: 'Safety is our primary focus. Our zero-accident track record across 35+ years and 50+ projects reflects a culture where safety programmes, permit-to-work systems and daily toolbox talks are non-negotiable.',
  },
  {
    title: 'Continuous Improvement',
    body: 'Our service does not end at project handover. We listen to feedback, adopt better methods and invest in our people and machinery — so every project raises the bar for the next.',
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
            {values.map((v, i) => (
              <div
                key={v.title}
                className="card p-8 flex flex-col gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center">
                  <span className="font-display font-bold text-teal text-body-md">{String(i + 1).padStart(2, '0')}</span>
                </div>
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
