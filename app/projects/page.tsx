'use client'

import { useState } from 'react'
import Image from 'next/image'
import { PageTitleBand } from '@/components/layout/PageTitleBand'
import { CTABand } from '@/components/layout/CTABand'

const imgs = {
  civil: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=900&auto=format&fit=crop',
  peb: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?q=80&w=900&auto=format&fit=crop',
  piping: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=900&auto=format&fit=crop',
  roads: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=900&auto=format&fit=crop',
  plant: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=900&auto=format&fit=crop',
  steel: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=900&auto=format&fit=crop',
}

import { projects } from '@/content/projects'

const allProjects = projects.map((p) => ({
  name: p.name,
  client: p.client,
  category: p.sector,
  scope: p.scope,
  location: p.location,
  year: p.year,
  image: p.image,
}))

const categories = ['All', ...Array.from(new Set(allProjects.map((p) => p.category)))].sort()

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const displayedProjects =
    activeFilter === 'All' ? allProjects : allProjects.filter((p) => p.category === activeFilter)

  return (
    <>
      <PageTitleBand
        title="Our Projects"
        breadcrumbs={[{ label: 'Projects' }]}
        description="50+ industrial projects delivered across chemicals, pharma, tyre, food processing and infrastructure."
      />

      <section aria-label="Projects Grid" className="bg-white py-[72px] pb-[96px]">
        <div className="max-w-container mx-auto px-gutter">
          {/* Filter */}
          <div role="tablist" aria-label="Filter projects by category" className="flex flex-wrap gap-[10px] mb-[48px]">
            {categories.map((c) => {
              const isActive = c === activeFilter
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setActiveFilter(c)}
                  className={`cursor-pointer font-body text-[13px] font-semibold px-[20px] py-[10px] rounded-full transition-all duration-150 border
                    ${
                      isActive
                        ? 'bg-teal border-teal text-white'
                        : 'bg-white border-hairline text-[#4d545a] hover:border-teal/40'
                    }`}
                >
                  {c}
                </button>
              )
            })}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
            {displayedProjects.map((p, i) => (
              <article
                key={i}
                className="border border-hairline rounded-card overflow-hidden bg-white flex flex-col transition-all duration-200 hover:shadow-[0_8px_28px_rgba(0,0,0,0.08)] hover:border-teal/40"
              >
                <div className="relative aspect-[16/10] bg-dark-bg overflow-hidden">
                  <Image src={p.image} alt={p.name} fill className="object-cover" />
                  <span className="absolute top-[14px] left-[14px] bg-[#0f1417]/75 backdrop-blur-[4px] text-[#5BD6E2] text-[11px] font-semibold uppercase tracking-[0.08em] px-[12px] py-[6px] rounded-full">
                    {p.category}
                  </span>
                </div>
                <div className="p-[24px] flex flex-col gap-[8px] flex-1">
                  <h3 className="font-display font-bold text-[19px] leading-[1.3] text-ink m-0">{p.name}</h3>
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
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
