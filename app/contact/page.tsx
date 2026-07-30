import type { Metadata } from 'next'
import { PageTitleBand } from '@/components/layout/PageTitleBand'
import { StaggerReveal } from '@/components/motion/StaggerReveal'
import { contactInfo } from '@/content/links'
import { TrussArtifact } from '@/components/ui/BlueprintArtifacts'
import { faqs } from '@/content/faqs'
import { FAQSection } from '@/components/ui/FAQSection'
import { breadcrumbJsonLd, faqJsonLd, serializeJsonLd } from '@/lib/jsonld'
import { EnquiryForm } from './EnquiryForm'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with BD Buildcon LLP for your industrial EPC project. Office in Bharuch, Gujarat. We respond within one business day.',
  alternates: { canonical: 'https://bdbuildcon.com/contact' },
  openGraph: {
    url: 'https://bdbuildcon.com/contact',
    title: 'Contact BD Buildcon LLP',
    description: 'Get in touch for your industrial EPC project. We respond within one business day.',
  },
}

const infoCards = [
  {
    title: 'Registered Office',
    icon: (
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    ),
    body: <p className="text-[15px] leading-[1.7] text-body m-0">{contactInfo.address}</p>,
  },
  {
    title: 'Phone',
    icon: (
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    ),
    body: (
      <div className="flex flex-col gap-[8px]">
        <a
          href="tel:+919879100355"
          className="inline-block py-[10px] -my-[10px] text-[15px] text-teal font-semibold hover:text-teal/80 transition-colors"
        >
          +91 98791 00355
        </a>
        <a
          href="tel:+912642262355"
          className="inline-block py-[10px] -my-[10px] text-[15px] text-teal font-semibold hover:text-teal/80 transition-colors"
        >
          +91 264 226 2355
        </a>
      </div>
    ),
  },
  {
    title: 'Email',
    icon: (
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    ),
    body: (
      <div className="flex flex-col gap-[4px]">
        <a
          href="mailto:business@bdbuildcon.com"
          className="inline-block py-[10px] -my-[10px] text-[15px] text-teal font-semibold hover:text-teal/80 transition-colors"
        >
          business@bdbuildcon.com
        </a>
        <a
          href="mailto:info@bdbuildcon.com"
          className="inline-block py-[10px] -my-[10px] text-[15px] text-teal font-semibold hover:text-teal/80 transition-colors"
        >
          info@bdbuildcon.com
        </a>
      </div>
    ),
  },
  {
    title: 'Office Hours',
    icon: <path d="M12 2a10 10 0 100 20 10 10 0 000-20z M12 6v6l4 2" />,
    body: <p className="text-[15px] leading-[1.7] text-body m-0">{contactInfo.hours}</p>,
  },
]

export default function ContactPage() {
  const contactFaqs = faqs.filter((f) => f.page.includes('contact'))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([
            breadcrumbJsonLd([{ name: 'Contact Us', url: 'https://bdbuildcon.com/contact' }]),
            faqJsonLd(contactFaqs),
          ]),
        }}
      />

      <PageTitleBand
        title="Contact Us"
        breadcrumbs={[{ label: 'Contact' }]}
        description="Tell us about your project. We respond within one business day."
      />

      <section aria-label="Contact" className="relative overflow-hidden bg-white py-[96px]">
        <TrussArtifact className="pointer-events-none absolute -bottom-4 -right-8 w-[300px] h-auto text-teal/[0.09] hidden lg:block" />
        <div className="relative z-10 max-w-container mx-auto px-gutter grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-[56px] items-start">
          {/* Info panel */}
          <StaggerReveal direction="left" className="flex flex-col gap-[20px]" stagger={0.08}>
            {infoCards.map((card) => (
              <div
                key={card.title}
                className="group bg-surface border border-hairline rounded-card p-[28px] flex gap-[18px] transition-all duration-300 hover:border-teal/40 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)]"
              >
                <span className="shrink-0 w-[44px] h-[44px] rounded-full bg-teal/10 flex items-center justify-center text-teal transition-colors duration-300 group-hover:bg-teal group-hover:text-white">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    {card.icon}
                  </svg>
                </span>
                <div className="flex-1">
                  <h2 className="font-display font-bold text-[17px] text-ink mb-[10px] mt-[8px]">{card.title}</h2>
                  {card.body}
                </div>
              </div>
            ))}
          </StaggerReveal>

          {/* Form — client component */}
          <EnquiryForm />
        </div>
      </section>

      {/* Map */}
      <section aria-label="Map" className="bg-surface border-t border-hairline">
        <div className="relative h-[380px] w-full">
          <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent(contactInfo.address)}&output=embed`}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="BD Buildcon LLP — Millenium Arcade, Bharuch"
          />
          <a
            href="https://maps.google.com/?q=Millenium+Arcade+Bharuch"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-[16px] left-[16px] font-body text-[13px] text-body bg-white border border-hairline rounded-[8px] px-[16px] py-[13px] shadow-[0_2px_10px_rgba(0,0,0,0.08)] hover:border-teal transition-colors"
          >
            📍 Open in Google Maps
          </a>
        </div>
      </section>

      <FAQSection faqs={contactFaqs} />
    </>
  )
}
