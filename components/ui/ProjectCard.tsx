'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import type { Project } from '@/content/projects'
import { cn } from '@/lib/utils'

type Props = { project: Project; priority?: boolean; featured?: boolean }

export function ProjectCard({ project, priority = false, featured = false }: Props) {
  return (
    <motion.div
      className={cn(
        'group relative block overflow-hidden rounded-card bg-ink',
        featured ? 'aspect-[16/10]' : 'aspect-[4/3]',
      )}
      whileHover={{ y: -6, scale: 1.015, boxShadow: '0 20px 56px rgba(22,168,184,0.22)' }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-20" aria-label={project.name} />

      {/* Image */}
      <motion.div
        className="absolute inset-0 w-full h-full z-0"
        style={{ willChange: 'transform' }}
        whileHover={{ scale: 1.07 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Image
          src={project.image}
          alt={`${project.name} — ${project.client}`}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </motion.div>

      {/* Base darkening — ensures bright images are always toned down */}
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
      {/* Bottom gradient for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/[0.97] via-black/75 to-transparent z-10 pointer-events-none" />

      {/* Teal shimmer on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-teal/30 to-transparent opacity-0 z-10 pointer-events-none"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      />

      {/* Sector badge */}
      <motion.div
        className="absolute top-4 left-4 z-30 pointer-events-none"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
      >
        <span className="inline-block px-3 py-1 bg-teal text-white text-xs font-body font-semibold uppercase tracking-wider rounded-full shadow-md">
          {project.sector}
        </span>
      </motion.div>

      {/* Content */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-6 z-30 pointer-events-none"
        initial={{ y: 6 }}
        whileHover={{ y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <h3
          className={cn(
            'font-display text-white drop-shadow-md mb-1',
            featured ? 'text-headline-md' : 'text-headline-sm',
          )}
        >
          {project.name}
        </h3>
        <p className="font-body text-body-md text-white drop-shadow-md">{project.location}</p>
        <motion.p
          className="font-body text-body-md text-white/90 mt-1 line-clamp-2 drop-shadow-md"
          initial={{ opacity: 0, height: 0 }}
          whileHover={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.25 }}
        >
          {project.excerpt}
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
