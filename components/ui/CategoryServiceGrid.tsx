'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { specializedServices } from '@/content/services'
import { ServiceIcon } from '@/components/ui/ServiceIcons'
import { CapabilityCard } from '@/content/unifiedCapabilities'

export function CategoryServiceGrid({ items }: { items: CapabilityCard[] }) {
  if (!items || items.length === 0) return null

  return (
    <div className="w-full mt-[32px] sm:mt-[48px]">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6"
      >
        {items.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group bg-white rounded-card p-5 sm:p-6 border border-hairline/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(22,168,184,0.12)] hover:border-teal/30 transition-all duration-300 flex flex-col justify-between relative overflow-hidden h-full"
          >
            {/* Decorative top accent line on hover */}
            <div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal via-[#0E8C9B] to-teal opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-hidden="true"
            />

            <div>
              {/* Icon Box */}
              <div className="w-[48px] h-[48px] rounded-2xl bg-teal/[0.08] text-teal flex items-center justify-center mb-4 group-hover:bg-teal group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 shadow-sm">
                <ServiceIcon name={service.iconName} className="w-6 h-6" />
              </div>

              {/* Title */}
              <h3 className="font-display font-bold text-[17px] sm:text-[19px] text-ink leading-snug mb-2 group-hover:text-teal transition-colors duration-200">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-[14px] leading-[1.6] text-body mb-5">{service.description}</p>
            </div>

            {/* Card Footer: Category Label at Bottom Left */}
            <div className="flex items-center justify-between pt-3 mt-auto border-t border-hairline/40">
              <span className="text-[12px] font-medium text-[#808898] group-hover:text-teal transition-colors duration-200">
                {service.sectorLabel}
              </span>

              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-teal group-hover:text-[#0E8C9B] transition-colors py-1"
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
