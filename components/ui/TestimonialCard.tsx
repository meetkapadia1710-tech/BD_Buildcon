'use client'

import type { Testimonial } from '@/content/testimonials'
import { motion } from 'framer-motion'

type Props = {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: Props) {
  return (
    <motion.figure
      className="card p-8 flex flex-col gap-6 relative overflow-hidden bg-white group"
      whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.08)' }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      {/* Background quote mark watermark */}
      <motion.svg
        className="absolute -top-4 -right-4 w-32 h-32 text-surface fill-current pointer-events-none z-0"
        viewBox="0 0 24 24"
        aria-hidden="true"
        initial={{ rotate: -10, scale: 0.9 }}
        whileHover={{ rotate: 0, scale: 1.1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
      </motion.svg>

      {/* Quote mark icon */}
      <motion.svg
        className="w-8 h-8 text-teal z-10"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        initial={{ opacity: 0.3 }}
        whileHover={{ opacity: 1, scale: 1.1, rotate: -5 }}
        transition={{ duration: 0.2 }}
      >
        <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
      </motion.svg>

      <blockquote className="z-10 relative">
        <p className="font-body text-body-lg text-ink leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
      </blockquote>

      <figcaption className="flex items-center gap-4 mt-auto pt-5 relative z-10">
        {/* Animated border top */}
        <motion.div
          className="absolute top-0 left-0 h-px bg-hairline"
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        />
        
        {/* Avatar initials */}
        <motion.div
          className="w-11 h-11 rounded-full bg-surface border border-hairline flex items-center justify-center shrink-0"
          whileHover={{ backgroundColor: '#16A8B8', borderColor: '#16A8B8', color: '#FFF' }}
          transition={{ duration: 0.2 }}
        >
          <span className="font-display font-bold text-teal group-hover:text-white transition-colors duration-200">
            {testimonial.companyShort.slice(0, 2).toUpperCase()}
          </span>
        </motion.div>
        
        <div>
          <div className="font-body font-bold text-ink text-body-md group-hover:text-teal transition-colors duration-200">
            {testimonial.name}
          </div>
          <div className="font-body text-body-sm text-body uppercase tracking-wider mt-0.5">
            {testimonial.company}
          </div>
        </div>
      </figcaption>
    </motion.figure>
  )
}
