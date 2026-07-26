import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PageTitleBand } from '@/components/layout/PageTitleBand'
import { CTABand } from '@/components/layout/CTABand'
import { StaggerReveal } from '@/components/motion/StaggerReveal'
import { services } from '@/content/services'
import { faqs } from '@/content/faqs'
import { FAQSection } from '@/components/ui/FAQSection'
import { breadcrumbJsonLd, faqJsonLd } from '@/lib/jsonld'
import { DimensionLines } from '@/components/ui/BlueprintArtifacts'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    "BD Buildcon's core industrial EPC services: civil engineering, mechanical & industrial services, and turnkey project delivery.",
  alternates: { canonical: 'https://bdbuildcon.com/services' },
  openGraph: {
    url: 'https://bdbuildcon.com/services',
    title: 'Industrial EPC Services — BD Buildcon LLP',
    description:
      "Civil engineering, mechanical & industrial services, and turnkey project delivery for India's process industries.",
  },
}

export default function ServicesPage() {
  const serviceFaqs = faqs.filter((f) => f.page.includes('services'))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbJsonLd([{ name: 'Services', url: 'https://bdbuildcon.com/services' }]),
            faqJsonLd(serviceFaqs),
          ]),
        }}
      />
      <PageTitleBand
        title="Industrial EPC Services"
        breadcrumbs={[{ label: 'Services' }]}
        description="Complete civil engineering, mechanical services, and turnkey project execution for process industries."
      />

      <section aria-label="Services Grid" className="relative overflow-hidden bg-white py-[72px] pb-[96px]">
        <DimensionLines className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-[60%] w-auto text-teal/[0.09] hidden lg:block" />
        <div className="relative z-10 max-w-container mx-auto px-gutter">
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-[32px]" stagger={0.08}>
            {services.map((svc) => (
              <article
                key={svc.id}
                className="group border border-hairline rounded-card overflow-hidden bg-white flex flex-col transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] hover:border-teal/40 hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] bg-dark-bg overflow-hidden">
                  <Image
                    src={svc.image}
                    alt={svc.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-bg/60 to-transparent" />
                </div>
                <div className="p-[28px] flex flex-col flex-1">
                  <h2 className="font-display font-bold text-[22px] text-ink mb-[12px] group-hover:text-teal transition-colors">
                    {svc.title}
                  </h2>
                  <p className="text-[15px] leading-[1.65] text-body mb-[20px] flex-1">{svc.description}</p>
                  <Link
                    href={`/services/${svc.id}`}
                    className="inline-flex items-center gap-[8px] text-[13px] font-semibold uppercase tracking-[0.1em] text-teal group-hover:text-[#0E8C9B] transition-colors mt-auto"
                  >
                    View service details
                    <span className="text-[16px]">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <FAQSection faqs={serviceFaqs} />

      <CTABand />
    </>
  )
}
