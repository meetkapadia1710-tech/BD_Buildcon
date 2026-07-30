import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { services } from '@/content/services'
import { projects } from '@/content/projects'
import { faqs } from '@/content/faqs'
import { PageTitleBand } from '@/components/layout/PageTitleBand'
import { CTABand } from '@/components/layout/CTABand'
import { FAQSection } from '@/components/ui/FAQSection'
import { SlideIn } from '@/components/motion/SlideIn'
import { StaggerReveal } from '@/components/motion/StaggerReveal'
import { CategoryServiceGrid } from '@/components/ui/CategoryServiceGrid'
import { unifiedCapabilities } from '@/content/unifiedCapabilities'
import { breadcrumbJsonLd, serviceJsonLd, faqJsonLd, serializeJsonLd } from '@/lib/jsonld'
export const dynamic = 'force-static'

type Props = {
  params: { slug: string }
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.id }))
}

export function generateMetadata({ params }: Props): Metadata {
  const service = services.find((s) => s.id === params.slug)
  if (!service) return {}

  return {
    title: `${service.title} — Industrial EPC Services`,
    description: service.description,
    alternates: { canonical: `https://bdbuildcon.com/services/${service.id}` },
    openGraph: {
      url: `https://bdbuildcon.com/services/${service.id}`,
      title: `${service.title} — BD Buildcon LLP`,
      description: service.description,
    },
  }
}

export default function ServiceDetailPage({ params }: Props) {
  const service = services.find((s) => s.id === params.slug)
  if (!service) notFound()

  // Match relevant projects based on service type
  const relatedProjects = projects
    .filter((p) => {
      if (service.id === 'civil-engineering')
        return p.scope.toLowerCase().includes('civil') || p.scope.toLowerCase().includes('rcc')
      if (service.id === 'mechanical-industrial')
        return (
          p.scope.toLowerCase().includes('steel') ||
          p.scope.toLowerCase().includes('piping') ||
          p.scope.toLowerCase().includes('peb')
        )
      return p.scope.toLowerCase().includes('turnkey') || p.scope.toLowerCase().includes('epc')
    })
    .slice(0, 3)

  const serviceFaqs = faqs.filter((f) => f.page.includes('services'))

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd([
            breadcrumbJsonLd([
              { name: 'Services', url: 'https://bdbuildcon.com/services' },
              { name: service.title, url: `https://bdbuildcon.com/services/${service.id}` },
            ]),
            serviceJsonLd({
              name: service.title,
              description: service.description,
              url: `https://bdbuildcon.com/services/${service.id}`,
            }),
            faqJsonLd(serviceFaqs),
          ]),
        }}
      />

      <PageTitleBand
        title={service.title}
        breadcrumbs={[{ label: 'Services', href: '/services' }, { label: service.title }]}
        description={service.description}
      />

      {/* ── Main Service Overview & Capability Breakdown ── */}
      <section aria-label="Service Details" className="py-[72px] lg:py-[96px] bg-white">
        <div className="max-w-container mx-auto px-gutter grid grid-cols-1 lg:grid-cols-12 gap-[48px] items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-8">
            <SlideIn from="bottom">
              <div className="relative w-full aspect-[16/9] rounded-card overflow-hidden bg-dark-bg mb-[40px] shadow-md">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
              </div>

              <h2 className="font-display font-bold text-[28px] sm:text-[36px] text-ink mb-[20px]">
                Core Scope &amp; Capabilities
              </h2>
              <p className="text-[17px] leading-[1.75] text-body mb-[40px]">
                {service.description} BD Buildcon brings complete technical depth, an owned machinery fleet of over 100
                machines, and a 35-year zero-fatality execution track record to every contract.
              </p>

              <div className="mt-[32px]">
                <CategoryServiceGrid items={unifiedCapabilities[service.id] || []} />
              </div>
            </SlideIn>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4 space-y-[32px]">
            <SlideIn from="right" delay={0.1}>
              <div className="bg-dark-bg text-white p-[32px] rounded-card border border-white/10 relative overflow-hidden">
                <span className="block text-[12px] font-semibold uppercase tracking-[0.14em] text-[#5BD6E2] mb-[12px]">
                  Turnkey Guarantee
                </span>
                <h3 className="font-display font-bold text-[22px] mb-[16px] text-white">35 Years Zero Fatalities</h3>
                <p className="text-[14.5px] leading-[1.65] text-white/75 mb-[24px]">
                  ISO 9001:2015 certified execution with zero rental dependency and dedicated on-site quality testing
                  labs.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center w-full py-[12px] px-[20px] bg-[#5BD6E2] text-dark-bg font-semibold text-[13px] uppercase tracking-[0.1em] rounded-full hover:bg-white transition-colors"
                >
                  Request a Quote
                </Link>
              </div>

              {/* Navigation to other services */}
              <div className="p-[28px] rounded-card bg-surface border border-hairline">
                <h4 className="font-display font-bold text-[16px] uppercase tracking-wider text-ink mb-[16px]">
                  All Services
                </h4>
                <ul className="space-y-[10px]">
                  {services.map((s) => (
                    <li key={s.id}>
                      <Link
                        href={`/services/${s.id}`}
                        className={`block text-[14.5px] py-[6px] transition-colors ${
                          s.id === service.id ? 'font-bold text-teal' : 'text-body hover:text-ink'
                        }`}
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* ── Related Representative Projects ── */}
      {relatedProjects.length > 0 && (
        <section aria-label="Representative Projects" className="py-[72px] bg-surface border-t border-hairline">
          <div className="max-w-container mx-auto px-gutter">
            <SlideIn from="bottom">
              <div className="mb-[40px]">
                <span className="block text-[13px] font-semibold uppercase tracking-[0.14em] text-teal mb-[10px]">
                  Track Record
                </span>
                <h2 className="font-display font-bold text-[32px] sm:text-[38px] text-ink">
                  Representative {service.shortTitle} Projects
                </h2>
              </div>
            </SlideIn>

            <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-[24px]" stagger={0.08}>
              {relatedProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="group border border-hairline rounded-card overflow-hidden bg-white flex flex-col transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] hover:border-teal/40"
                >
                  <div className="relative aspect-[16/10] bg-dark-bg overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-[24px] flex flex-col flex-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-teal mb-[6px]">
                      {p.sector} · {p.location}
                    </span>
                    <h3 className="font-display font-bold text-[18px] text-ink mb-[8px] group-hover:text-teal transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-[14px] text-body line-clamp-2 mt-auto">{p.excerpt}</p>
                  </div>
                </Link>
              ))}
            </StaggerReveal>
          </div>
        </section>
      )}

      <FAQSection faqs={serviceFaqs} />

      <CTABand />
    </>
  )
}
