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
import { breadcrumbJsonLd, serviceJsonLd, faqJsonLd } from '@/lib/jsonld'

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

const detailedBulletDescriptions: Record<string, Record<string, string>> = {
  'civil-engineering': {
    'Industrial Infrastructure Development':
      'BD Buildcon delivers end-to-end industrial infrastructure development including land grading, heavy foundations, access roads, drainage networks, and utility corridors tailored to process plants.',
    'Brownfield & Greenfield Projects':
      'Whether building new greenfield industrial complexes from the ground up or executing complex brownfield expansions inside live chemical and pharma facilities, BD Buildcon guarantees zero operational downtime for existing plants.',
    'Plant Expansion & Industrial Modernization':
      'We execute turnkey plant capacity expansions, structural retrofits, and equipment upgrades to modernise existing manufacturing assets efficiently.',
    'Industrial, Commercial & Corporate Buildings':
      'Constructing heavy-duty industrial plant buildings, administrative blocks, control rooms, and commercial facilities designed to international engineering standards.',
    'Warehouses & Logistics Facilities':
      'Designing and building large-span industrial warehouses, raw material storage bays, and dispatch facilities built for heavy fork-lift traffic and high floor load capacities.',
    'RCC Construction':
      'Reinforced Cement Concrete (RCC) structures built with certified concrete batches, stringent formwork controls, and mill-traceable steel reinforcement.',
    'Structural Engineering & Construction':
      'Precision structural engineering and heavy civil construction for complex process plant structures and high-load equipment platforms.',
    'Heavy Equipment Foundations & Pile Foundations':
      'Engineering and casting heavy machine foundations, compressor pedestals, DMC pile foundations, and vibrating equipment bases engineered for dynamic load stability.',
    'Site Development, Earthworks, Excavation & Backfilling':
      'Comprehensive site clearance, bulk excavation, soil compaction using owned 11.5 MT vibro rollers, and precision land grading for industrial bases.',
    'Internal Roads & Pavements':
      'Heavy-duty concrete and bitumen internal plant roads, heavy vehicle aprons, and paved yards engineered for continuous trailer and transit mixer traffic.',
    'Storm Water & Drainage Systems':
      'Engineered RCC storm water drains, rainwater harvesting pits, and plant runoff management systems compliant with statutory environmental norms.',
    'Underground Utility & Service Networks':
      'Underground piping trenches, electrical cable duct banks, fire-water mains, and industrial effluent drainage lines constructed with full CAD/BIM traceability.',
  },
  'mechanical-industrial': {
    'Mechanical Construction':
      'Complete mechanical construction services for industrial process plants, chemical units, and manufacturing facilities.',
    'Heavy Equipment Erection':
      'Rigging, alignment, and erection of heavy static and rotary equipment including pressure vessels, reactors, heat exchangers, and storage tanks.',
    'Mechanical Equipment Installation':
      'Precision positioning and mounting of mechanical equipment using owned mobile cranes and specialized lifting gear.',
    'Industrial Fabrication':
      'Custom industrial steel fabrication executed in our in-house fabrication yard under strict QA/QC standards.',
    'Structural Steel Fabrication':
      'Fabrication and assembly of heavy structural steel frames, pipe racks, equipment platforms, and access walkways.',
    'Process & Utility Piping Fabrication':
      'High-pressure process piping and utility line fabrication welded by qualified welders to international code specifications.',
    'In-House Fabrication Yard':
      'Operating a dedicated in-house fabrication facility equipped for high-volume steel cutting, bending, assembly, and quality testing.',
    'Industrial Piping Systems':
      'Complete installation of process fluid piping networks, steam headers, chemical transfer lines, and jacketed piping systems.',
    'Utility Piping Networks':
      'Cooling water lines, compressed air piping, nitrogen supply networks, and raw water distribution across industrial plants.',
    'Slag Blasting':
      'Surface preparation using high-pressure copper slag blasting to achieve required surface anchor profiles for coating adhesion.',
    'Industrial Painting':
      'Application of specialized anti-corrosive primer systems and industrial topcoats suited to chemical and marine atmospheres.',
    'Protective Coating Systems':
      'Epoxy coatings, polyurethane finishes, high-temperature paints, and chemical-resistant linings for long-term corrosion prevention.',
  },
  'turnkey-delivery': {
    'Project Planning':
      'Detailed project execution planning establishing baseline schedules, resource allocation, and critical path milestones.',
    'Project Scheduling & Controls':
      'Continuous progress monitoring, ERP-integrated resource tracking, and project control systems ensuring schedule compliance.',
    'Procurement Management':
      'Strategic procurement of civil, structural, and mechanical materials from approved vendors with mill certificate traceability.',
    'Vendor & Supply Chain Management':
      'Subcontractor management, vendor expediting, and logistics coordination to keep site supply chains seamless.',
    'Cost Optimization':
      'Value engineering and material optimization to deliver maximum structural durability within target client budgets.',
    'Material Inspection':
      'Rigorous incoming material inspection, mill certificate verification, and batch testing prior to site integration.',
    'Quality Assurance & Quality Control (QA/QC)':
      'ISO 9001:2015-certified QA/QC protocols enforced at every hold point from excavation to pre-pour and final erection.',
    'Health, Safety & Environment (HSE) Management':
      'Full HSE compliance, site safety assemblies, daily toolbox talks, and continuous hazard monitoring backing our 35-year zero-fatality record.',
    'Safety Audits':
      'Regular site safety audits and statutory environmental inspections conducted by certified safety officers.',
    'Testing & Commissioning':
      'Comprehensive hydro-testing, non-destructive testing (NDT), electrical continuity checks, and dry run commissioning.',
    'Project Handover':
      'Final project handover complete with as-built drawings, QA/QC inspection dossiers, statutory clearance certificates, and operating manuals.',
    'After-Sales Support':
      'Defects liability support and operational maintenance assistance following plant commissioning and handover.',
  },
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
  const bulletDescriptions = detailedBulletDescriptions[service.id] || {}

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
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

              <div className="space-y-[24px]">
                {service.bullets.map((bullet, i) => {
                  const desc =
                    bulletDescriptions[bullet] || `${bullet} delivered to international industrial engineering codes.`
                  return (
                    <div
                      key={i}
                      className="p-[24px] rounded-card bg-surface border border-hairline transition-all hover:border-teal/30"
                    >
                      <h3 className="font-display font-bold text-[18px] text-ink mb-[8px] flex items-center gap-[10px]">
                        <span className="w-[8px] h-[8px] rounded-full bg-teal shrink-0" />
                        {bullet}
                      </h3>
                      <p className="text-[15px] leading-[1.65] text-body m-0 pl-[18px]">{desc}</p>
                    </div>
                  )
                })}
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
