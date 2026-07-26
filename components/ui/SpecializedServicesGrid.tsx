'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { specializedServices, SpecializedService } from '@/content/services'
import { ServiceIcon } from '@/components/ui/ServiceIcons'

type FilterCategory = 'All' | 'Civil Engineering' | 'Mechanical & Industrial' | 'Turnkey Delivery'

const categories: { label: string; value: FilterCategory }[] = [
  { label: 'All Services', value: 'All' },
  { label: 'Civil Engineering', value: 'Civil Engineering' },
  { label: 'Mechanical & Industrial', value: 'Mechanical & Industrial' },
  { label: 'Turnkey Delivery', value: 'Turnkey Delivery' },
]

export function SpecializedServicesGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All')

  const filteredServices = specializedServices.filter((service) => {
    if (activeFilter === 'All') return true
    return service.category === activeFilter
  })

  return (
    <div className="w-full mb-[48px] sm:mb-[60px]">
      {/* ── Category Filter Tabs (Mobile Responsive & Touch Optimized) ── */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-[32px] sm:mb-[40px]">
        {categories.map((cat) => {
          const isActive = activeFilter === cat.value
          return (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[13px] sm:text-[14px] font-semibold tracking-wide transition-all duration-300 ease-out flex items-center gap-2 ${
                isActive
                  ? 'bg-teal text-white shadow-md shadow-teal/25 scale-[1.03]'
                  : 'bg-surface text-body hover:bg-teal/10 hover:text-ink border border-hairline/80'
              }`}
            >
              <span>{cat.label}</span>
              {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" aria-hidden="true" />}
            </button>
          )
        })}
      </div>

      {/* ── Responsive Service Grid (4 Col on Desktop, 2 Col Tablet, 1 Col Mobile) ── */}
      <motion.div
        key={activeFilter}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
      >
        {filteredServices.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.03 }}
            className="group bg-white rounded-card p-6 sm:p-7 border border-hairline/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(22,168,184,0.12)] hover:border-teal/30 transition-all duration-300 flex flex-col justify-between relative overflow-hidden h-full"
          >
            {/* Decorative top accent line on hover */}
            <div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal via-[#0E8C9B] to-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            />

            <div>
              {/* Icon Box */}
              <div className="w-[56px] h-[56px] rounded-2xl bg-teal/[0.08] text-teal flex items-center justify-center mb-5 group-hover:bg-teal group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 shadow-sm">
                <ServiceIcon name={service.iconName} className="w-7 h-7" />
              </div>

              {/* Title */}
              <h3 className="font-display font-bold text-[18px] sm:text-[20px] text-ink leading-snug mb-3 group-hover:text-teal transition-colors duration-200">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-[14px] sm:text-[15px] leading-[1.65] text-body line-clamp-3 mb-6">
                {service.description}
              </p>
            </div>

            {/* Card Footer: Category Label at Bottom Left */}
            <div className="flex items-center justify-between pt-4 mt-auto">
              <span className="text-[13px] sm:text-[14px] font-normal text-[#808898] group-hover:text-teal transition-colors duration-200">
                {service.sectorLabel}
              </span>

              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-teal group-hover:text-[#0E8C9B] transition-colors py-1"
                aria-label={`Explore projects for ${service.title}`}
              >
                <span>Explore</span>
                <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
