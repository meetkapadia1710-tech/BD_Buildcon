'use client'

import { useState, useMemo } from 'react'
import { PageTitleBand } from '@/components/layout/PageTitleBand'
import { CTABand } from '@/components/layout/CTABand'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { FadeRise } from '@/components/motion/FadeRise'
import { projects } from '@/content/projects'
import { motion, AnimatePresence } from 'framer-motion'

const sectors = ['All', 'Chemical', 'Food', 'Residential', 'Glass', 'Pharma', 'Petroleum', 'Fertiliser', 'Tyre']

export default function ProjectsPage() {
  const [active, setActive] = useState('All')
  const [visibleCount, setVisibleCount] = useState(6)

  const filtered = useMemo(() => {
    if (active === 'All') return projects
    return projects.filter((p) => p.sector === active)
  }, [active])

  const visible = filtered.slice(0, visibleCount)

  return (
    <>
      <PageTitleBand
        title="Projects"
        breadcrumbs={[{ label: 'Projects' }]}
        description="Showcasing our commitment to precision, reliability and modern engineering excellence across various industrial sectors."
      />

      <section className="section-pad bg-white">
        <div className="container-max">
          {/* Pill filters */}
          <div
            className="flex flex-wrap gap-3 mb-12"
            role="group"
            aria-label="Filter projects by sector"
          >
            {sectors.map((sector) => (
              <button
                key={sector}
                onClick={() => {
                  setActive(sector)
                  setVisibleCount(6)
                }}
                className={`px-5 py-2 rounded-full font-body text-label-md uppercase tracking-wider transition-all duration-200 ${
                  active === sector
                    ? 'bg-teal text-white shadow-sm'
                    : 'bg-surface text-ink border border-hairline hover:border-teal hover:text-teal'
                }`}
                aria-pressed={active === sector}
              >
                {sector}
              </button>
            ))}
          </div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {visible.map((project, i) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  priority={i < 3}
                  featured={i === 0}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-20 text-body font-body text-body-lg">
              No projects found for this sector.
            </div>
          )}

          {/* Load more */}
          {visibleCount < filtered.length && (
            <div className="mt-12 text-center">
              <button
                onClick={() => setVisibleCount((c) => c + 6)}
                className="btn-ghost text-sm"
              >
                Load More Projects
              </button>
            </div>
          )}
        </div>
      </section>

      <CTABand />
    </>
  )
}
