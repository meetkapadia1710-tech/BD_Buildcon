import Link from 'next/link'
import Image from 'next/image'
import type { Project } from '@/content/projects'

type Props = {
  project: Project
  priority?: boolean
  featured?: boolean
}

export function ProjectCard({ project, priority = false, featured = false }: Props) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group relative block overflow-hidden rounded-card bg-dark-bg ${
        featured ? 'aspect-[16/10]' : 'aspect-[4/3]'
      }`}
    >
      <Image
        src={project.image}
        alt={`${project.name} — ${project.client}`}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes={featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'}
        priority={priority}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Sector badge */}
      <div className="absolute top-4 left-4">
        <span className="inline-block px-3 py-1 bg-teal text-white text-xs font-body font-semibold uppercase tracking-wider rounded-full">
          {project.sector}
        </span>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
        <h3
          className={`font-display text-white mb-1 ${
            featured ? 'text-headline-md' : 'text-headline-sm'
          }`}
        >
          {project.name}
        </h3>
        <p className="font-body text-body-md text-white/70">{project.location}</p>
        <p className="font-body text-body-md text-white/60 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.excerpt}
        </p>
      </div>
    </Link>
  )
}
