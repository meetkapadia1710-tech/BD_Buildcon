'use client'

import { motion } from 'framer-motion'
import { SlideIn } from '@/components/motion/SlideIn'

type Props = {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionHeading({ title, subtitle, centered = true, className = '' }: Props) {
  return (
    <div className={`mb-12 lg:mb-16 ${centered ? 'text-center' : ''} ${className}`}>
      <SlideIn from="bottom">
        <h2 className={`font-display text-headline-lg lg:text-display-sm text-ink mb-4`}>{title}</h2>
      </SlideIn>
      
      <motion.div
        className={`h-[3px] bg-gradient-to-r from-teal to-teal-deep rounded-full ${centered ? 'mx-auto' : ''}`}
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 64, opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      />
      
      {subtitle && (
        <SlideIn from="bottom" delay={0.2}>
          <p className="mt-5 font-body text-body-lg text-body max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </SlideIn>
      )}
    </div>
  )
}
