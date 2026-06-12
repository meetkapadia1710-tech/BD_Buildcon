import type { Metadata } from 'next'
import Image from 'next/image'
import { PageTitleBand } from '@/components/layout/PageTitleBand'
import { CTABand } from '@/components/layout/CTABand'
import { FadeRise, FadeRiseItem } from '@/components/motion/FadeRise'
import { RevealImage } from '@/components/motion/RevealImage'

export const metadata: Metadata = {
  title: 'Desk of Directors',
  description: 'A message from the leadership of BD Buildcon LLP — our values, vision and commitment to industrial construction excellence.',
}

export default function DirectorsPage() {
  return (
    <>
      <PageTitleBand
        title="Desk of Directors"
        breadcrumbs={[{ label: 'About Us' }, { label: 'Desk of Directors' }]}
      />

      {/* Director message */}
      <section className="section-pad bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Message */}
            <div>
              <FadeRiseItem>
                <span className="font-body text-label-md text-teal uppercase tracking-widest mb-4 block">
                  From the Director's Desk
                </span>
                <h2 className="font-display text-headline-md text-ink mb-6 leading-snug">
                  Building more than structures — building trust.
                </h2>
              </FadeRiseItem>

              <FadeRiseItem delay={0.1}>
                <div className="space-y-5 font-body text-body-lg text-body leading-relaxed">
                  <p>
                    Welcome to BD Buildcon LLP. Since founding the company (formerly Bhumi Developers)
                    in 1995, our driving force has been a simple but uncompromising belief: every project
                    we undertake must be delivered safely, on time, and to the highest quality standards.
                    There are no shortcuts when people's lives and industrial operations depend on what
                    we build.
                  </p>
                  <p>
                    Over 35 years, we have grown from a regional civil contractor into a full-service
                    turnkey EPC contractor recognised across Gujarat and beyond. That growth has been
                    earned project by project — through transparent communication, technical depth and
                    the resilience to deliver in challenging conditions.
                  </p>
                  <p>
                    Our repeat client ratio of more than 70% is the metric I am proudest of. It tells
                    me that clients don't just complete a project with us — they trust us with the next
                    one. That trust is the foundation on which we continue to invest: in our people, our
                    machinery fleet and our quality systems.
                  </p>
                  <p>
                    We have been recognised with industry awards and client appreciation letters, but the
                    most meaningful recognition is a returning client. That is why we remain committed
                    to continuous improvement — listening to feedback, adopting better methods and
                    training our teams to raise the bar with every project.
                  </p>
                  <p>
                    Thank you for considering BD Buildcon for your next industrial project. We look
                    forward to earning your trust.
                  </p>
                </div>
              </FadeRiseItem>

              {/* Signature */}
              <FadeRiseItem delay={0.2}>
                <div className="mt-8 pt-6 border-t border-hairline">
                  <p className="font-display font-bold text-ink text-headline-sm">Director</p>
                  <p className="font-body text-body-md text-body">BD Buildcon LLP (Formerly Bhumi Developers)</p>
                </div>
              </FadeRiseItem>
            </div>

            {/* Right: Portrait */}
            <div>
              <RevealImage
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=900&auto=format&fit=crop"
                alt="Director of BD Buildcon LLP — professional portrait"
                fill
                wrapperClassName="relative aspect-[3/4] rounded-card overflow-hidden shadow-card-hover"
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
                parallax
              />

              {/* Stat strip */}
              <FadeRise className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { num: '35+', label: 'Years' },
                  { num: '50+', label: 'Projects' },
                  { num: '70%', label: 'Repeat' },
                ].map((s) => (
                  <div key={s.label} className="bg-surface rounded-card p-4 text-center border border-hairline">
                    <div className="font-display font-bold text-teal text-headline-sm">{s.num}</div>
                    <div className="font-body text-label-md text-body uppercase tracking-wider mt-1">{s.label}</div>
                  </div>
                ))}
              </FadeRise>
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
