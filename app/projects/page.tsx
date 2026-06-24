'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { PageTitleBand } from '@/components/layout/PageTitleBand'
import { CTABand } from '@/components/layout/CTABand'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { FadeRise } from '@/components/motion/FadeRise'
import { SlideIn } from '@/components/motion/SlideIn'
import { projects } from '@/content/projects'
import { motion, AnimatePresence } from 'framer-motion'

export default function ProjectsPage() {
  const [active, setActive] = useState('All')
  const [visibleCount, setVisibleCount] = useState(6)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Derive sectors dynamically from project data
  const sectors = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.sector))).sort()
    return ['All', ...unique]
  }, [])

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
          {/* Sector filter — dropdown */}
          <SlideIn from="top" className="relative z-[200]">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-12">
              <label
                htmlFor="sector-filter"
                className="font-body text-label-md uppercase tracking-widest text-body shrink-0"
              >
                Filter by sector
              </label>

              <div className="relative w-full sm:w-72" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full flex justify-between items-center rounded-xl border border-hairline bg-white px-4 py-3 text-sm font-body text-ink shadow-sm transition-colors duration-200 hover:border-teal focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20 cursor-pointer select-none text-left"
                  aria-haspopup="listbox"
                  aria-expanded={isDropdownOpen}
                >
                  <span className="truncate pr-2 font-medium">{active === 'All' ? 'All Sectors' : active}</span>
                  <svg
                    className={`w-4 h-4 text-teal transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div
                    className="absolute left-0 right-0 mt-2 max-h-72 overflow-y-auto bg-white border border-hairline rounded-card shadow-lg z-[500] py-1 focus:outline-none animate-in fade-in slide-in-from-top-2 duration-150"
                    role="listbox"
                    onWheel={(e) => e.stopPropagation()}
                  >
                    {sectors.map((sector) => {
                      const isSelected = active === sector
                      return (
                        <button
                          key={sector}
                          type="button"
                          onClick={() => {
                            setActive(sector)
                            setVisibleCount(6)
                            setIsDropdownOpen(false)
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm border-t first:border-0 border-hairline/50 transition-colors duration-150 ${
                            isSelected
                              ? 'bg-teal text-white font-semibold'
                              : 'text-ink hover:bg-teal/5 hover:text-teal font-medium'
                          }`}
                          role="option"
                          aria-selected={isSelected}
                        >
                          {sector === 'All' ? 'All Sectors' : sector}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              {active !== 'All' && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-3 py-1.5 font-body text-label-md text-teal"
                >
                  {filtered.length} project{filtered.length !== 1 ? 's' : ''}
                  <button
                    onClick={() => {
                      setActive('All')
                      setVisibleCount(6)
                    }}
                    className="ml-1 rounded-full text-teal hover:text-teal-hover transition-colors"
                    aria-label="Clear filter"
                  >
                    ✕
                  </button>
                </motion.span>
              )}
            </div>
          </SlideIn>

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
                <ProjectCard key={project.slug} project={project} priority={i < 3} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-20 text-body font-body text-body-lg">No projects found for this sector.</div>
          )}

          {/* Load more */}
          {visibleCount < filtered.length && (
            <div className="mt-12 text-center">
              <button onClick={() => setVisibleCount((c) => c + 6)} className="btn-ghost text-sm">
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
