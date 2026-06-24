import type { Metadata } from 'next'
import { PageTitleBand } from '@/components/layout/PageTitleBand'
import { FadeRiseItem } from '@/components/motion/FadeRise'
import { SlideIn } from '@/components/motion/SlideIn'
import { StaggerReveal } from '@/components/motion/StaggerReveal'
import { contactInfo } from '@/content/links'
import { ContactForm } from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with BD Buildcon LLP — call, email or send us a project enquiry. Office in Bharuch, Gujarat.',
}

export default function ContactPage() {
  return (
    <>
      <PageTitleBand title="Contact Us" breadcrumbs={[{ label: 'Contact' }]} />

      <section className="section-pad bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Contact info */}
            <div className="space-y-8">
              <FadeRiseItem>
                <h2 className="font-display text-headline-md text-ink mb-2">CALL US</h2>
                <p className="font-body text-body-lg text-body">
                  We are here to assist you with your industrial EPC needs. Our team responds to all enquiries within
                  one business day.
                </p>
              </FadeRiseItem>

              <StaggerReveal className="space-y-4" direction="up" stagger={0.1}>
                {/* Address */}
                <div className="flex items-start gap-4 p-5 bg-surface rounded-card border border-hairline group hover:border-teal/30 transition-colors shadow-sm hover:shadow-card hover:-translate-y-1 transform duration-300">
                  <div className="p-3 rounded-full bg-teal/10 text-teal group-hover:bg-teal group-hover:text-white transition-colors shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-body text-label-md text-ink uppercase tracking-wider mb-1">Head Office</div>
                    <p className="font-body text-body-md text-body leading-relaxed">{contactInfo.address}</p>
                  </div>
                </div>

                {/* Phone */}
                <a
                  href={`tel:${contactInfo.phoneTel}`}
                  className="flex items-center gap-4 p-5 bg-surface rounded-card border border-hairline group hover:border-teal/30 transition-colors shadow-sm hover:shadow-card hover:-translate-y-1 transform duration-300"
                >
                  <div className="p-3 rounded-full bg-teal/10 text-teal group-hover:bg-teal group-hover:text-white transition-colors shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-body text-label-md text-ink uppercase tracking-wider mb-1">Direct Line</div>
                    <div className="font-body text-body-lg text-teal font-semibold">{contactInfo.phone}</div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-4 p-5 bg-surface rounded-card border border-hairline group hover:border-teal/30 transition-colors shadow-sm hover:shadow-card hover:-translate-y-1 transform duration-300"
                >
                  <div className="p-3 rounded-full bg-teal/10 text-teal group-hover:bg-teal group-hover:text-white transition-colors shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-body text-label-md text-ink uppercase tracking-wider mb-1">
                      General Enquiries
                    </div>
                    <div className="font-body text-body-md text-body">{contactInfo.email}</div>
                  </div>
                </a>

                {/* Hours */}
                <div className="flex items-center gap-4 p-5 bg-surface rounded-card border border-hairline group hover:border-teal/30 transition-colors shadow-sm hover:shadow-card hover:-translate-y-1 transform duration-300">
                  <div className="p-3 rounded-full bg-teal/10 text-teal shrink-0 group-hover:bg-teal group-hover:text-white transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-body text-label-md text-ink uppercase tracking-wider mb-1">Office Hours</div>
                    <div className="font-body text-body-md text-body">{contactInfo.hours}</div>
                  </div>
                </div>
              </StaggerReveal>
            </div>

            {/* Right: Form */}
            <SlideIn from="right" delay={0.15}>
              <div className="bg-white rounded-card border border-hairline shadow-card p-8 group hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)] transition-shadow duration-300">
                <h2 className="font-display text-headline-md text-ink mb-8">GET IN TOUCH WITH US</h2>
                <ContactForm />
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[400px] border-y border-hairline overflow-hidden" aria-label="Office location map">
        <iframe
          src="https://maps.google.com/maps?q=Millenium+Arcade%2C+Opp+SVM+Engineering+College%2C+Old+National+Highway+8%2C+Bharuch%2C+Gujarat+392002&output=embed&z=16"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="BD Buildcon Office Location — Bharuch, Gujarat"
          className="w-full h-full"
        />
      </section>

      {/* Certification badges */}
      <section className="bg-surface border-b border-hairline py-8">
        <div className="container-max">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
            {[
              { icon: '✓', label: 'ISO 9001:2015' },
              { icon: '✓', label: 'CRISIL SME 3 Rated' },
              { icon: '✓', label: '30+ Years' },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-teal flex items-center justify-center text-white font-bold text-sm">
                  {badge.icon}
                </div>
                <span className="font-display font-bold text-ink text-headline-sm">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
