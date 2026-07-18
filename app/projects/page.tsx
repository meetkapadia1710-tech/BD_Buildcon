import type { Metadata } from 'next'
import Image from 'next/image'
import { PageTitleBand } from '@/components/layout/PageTitleBand'
import { CTABand } from '@/components/layout/CTABand'
import { StaggerReveal } from '@/components/motion/StaggerReveal'
import { projects } from '@/content/projects'
import { DimensionLines } from '@/components/ui/BlueprintArtifacts'
import { breadcrumbJsonLd } from '@/lib/jsonld'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: 'Our Projects',
  description:
    '50+ industrial EPC projects delivered across chemicals, pharma, petroleum, tyre, food processing and infrastructure sectors in Gujarat and beyond.',
  alternates: { canonical: 'https://bdbuildcon.com/projects' },
  openGraph: {
    url: 'https://bdbuildcon.com/projects',
    title: 'Our Projects — BD Buildcon LLP',
    description: '50+ industrial EPC projects delivered across chemicals, pharma, and infrastructure.',
  },
}

const allProjects = projects.map((p) => ({
  name: p.name,
  client: p.client,
  category: p.sector,
  scope: p.scope,
  location: p.location,
  year: p.year,
  image: p.image,
}))

export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd([{ name: 'Our Projects', url: 'https://bdbuildcon.com/projects' }])),
        }}
      />
      <PageTitleBand
        title="Our Projects"
        breadcrumbs={[{ label: 'Projects' }]}
        description="50+ industrial projects delivered across chemicals, pharma, tyre, food processing and infrastructure."
      />

      <section aria-label="Projects Grid" className="relative overflow-hidden bg-white py-[72px] pb-[96px]">
        {/* Blueprint artifact — DimensionLines right edge */}
        <DimensionLines className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 h-[60%] w-auto text-teal/[0.09] hidden lg:block" />
        <div className="relative z-10 max-w-container mx-auto px-gutter">
          {/* Grid */}
          <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]" stagger={0.06}>
            {allProjects.map((p, i) => (
              <article
                key={i}
                className="group border border-hairline rounded-card overflow-hidden bg-white flex flex-col transition-all duration-300 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] hover:border-teal/40 hover:-translate-y-1"
              >
                <div className="relative aspect-[16/10] bg-dark-bg overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute top-[14px] left-[14px] bg-[#0f1417]/75 backdrop-blur-[4px] text-[#5BD6E2] text-[11px] font-semibold uppercase tracking-[0.08em] px-[12px] py-[6px] rounded-full">
                    {p.category}
                  </span>
                </div>
                <div className="p-[24px] flex flex-col gap-[8px] flex-1">
                  <h3 className="font-display font-bold text-[19px] leading-[1.3] text-ink m-0 group-hover:text-teal transition-colors duration-200">
                    {p.name}
                  </h3>
                  <p className="text-[14px] text-teal font-semibold m-0">{p.client}</p>
                  <p className="text-[14.5px] leading-[1.6] text-body m-0 flex-1">{p.scope}</p>

                  <div className="flex gap-[16px] mt-[10px] pt-[14px] border-t border-[#EFF1F2]">
                    <span className="text-[12.5px] text-body">
                      <strong className="text-ink font-semibold">{p.location}</strong>
                    </span>
                    <span className="text-[12.5px] text-body">{p.year}</span>
                  </div>
                </div>
              </article>
            ))}
          </StaggerReveal>
        </div>
      </section>

      <CTABand />
    </>
  )
}
