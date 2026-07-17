import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { projects } from '@/content/projects'
import { CTABand } from '@/components/layout/CTABand'
import { FadeRise, FadeRiseItem } from '@/components/motion/FadeRise'
import { RevealImage } from '@/components/motion/RevealImage'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) return {}
  return {
    title: `${project.name} | BD Buildcon`,
    description: project.excerpt,
    openGraph: {
      type: 'article',
      url: `https://bdbuildcon.com/projects/${project.slug}`,
      title: `${project.name} | BD Buildcon`,
      description: project.excerpt,
      images: [
        {
          url: project.image,
          alt: project.name,
        },
      ],
    },
  }
}

export default function ProjectDetailPage({ params }: Props) {
  const projectIndex = projects.findIndex((p) => p.slug === params.slug)
  if (projectIndex === -1) notFound()

  const project = projects[projectIndex]
  const next = projects.length > 1 ? projects[(projectIndex + 1) % projects.length] : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: project.name,
            description: project.excerpt,
            image: project.image,
            author: {
              '@type': 'Organization',
              name: 'BD Buildcon LLP',
            },
            publisher: {
              '@type': 'Organization',
              name: 'BD Buildcon LLP',
              logo: {
                '@type': 'ImageObject',
                url: 'https://bdbuildcon.com/logo.svg',
              },
            },
          }),
        }}
      />
      {/* Cinematic hero */}
      <section
        className="relative h-[70vh] flex items-end overflow-hidden bg-dark-bg"
        aria-label={`${project.name} hero`}
      >
        <Image
          src={project.image}
          alt={`${project.name} — ${project.client}`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative z-10 max-w-container mx-auto px-6 pb-12 w-full">
          <FadeRiseItem>
            <span className="inline-block px-3 py-1 bg-teal text-white text-xs font-body font-semibold uppercase tracking-widest rounded-full mb-4">
              {project.sector}
            </span>
            <h1 className="font-display text-display-lg text-white leading-tight mb-2">{project.name}</h1>
            <p className="font-body text-body-lg text-white/70">
              {project.client} · {project.location}
            </p>
          </FadeRiseItem>
        </div>
      </section>

      {/* Facts strip */}
      <section className="bg-surface border-b border-hairline py-6">
        <div className="max-w-container mx-auto px-6">
          <FadeRise className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Scope', value: project.scope },
              { label: 'Duration', value: project.duration },
              { label: 'Year', value: project.year },
              { label: 'Safety', value: project.safetyRecord },
            ].map((fact) => (
              <div key={fact.label}>
                <span className="block font-body text-label-md text-teal uppercase tracking-widest mb-1">
                  {fact.label}
                </span>
                <span className="font-display font-semibold text-ink text-body-lg">{fact.value}</span>
              </div>
            ))}
          </FadeRise>
        </div>
      </section>

      {/* Narrative */}
      <section className="section-pad bg-white">
        <div className="max-w-container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {[
                { title: 'The Challenge', content: project.challenge },
                { title: 'What We Built', content: project.whatWeBuilt },
                { title: 'The Outcome', content: project.outcome },
              ].map((block, i) => (
                <FadeRiseItem key={block.title} delay={i * 0.1}>
                  <h2 className="font-display text-headline-md text-ink mb-4">{block.title}</h2>
                  <span className="block w-10 h-0.5 bg-teal mb-5 rounded-full" />
                  <p className="font-body text-body-lg text-body leading-relaxed">{block.content}</p>
                </FadeRiseItem>
              ))}

              {/* Client quote */}
              {project.quote && (
                <FadeRiseItem delay={0.3}>
                  <figure className="border-l-4 border-teal pl-6 py-2">
                    <blockquote className="font-display text-headline-sm text-ink leading-snug">
                      &ldquo;{project.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-4 font-body text-body-md text-body">
                      — {project.quoteName}, {project.quoteTitle}
                    </figcaption>
                  </figure>
                </FadeRiseItem>
              )}
            </div>

            {/* Image gallery */}
            <div className="space-y-4">
              {project.images.slice(0, 3).map((img, i) => (
                <RevealImage
                  key={img}
                  src={img}
                  alt={`${project.name} — site photo ${i + 1}`}
                  fill
                  wrapperClassName="aspect-[4/3] rounded-card overflow-hidden"
                  className="object-cover"
                  delay={i * 0.1}
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Next project */}
      {next && (
        <section className="bg-surface border-t border-hairline py-10">
          <div className="max-w-container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-body text-label-md text-teal uppercase tracking-widest mb-1">Next Project</p>
              <h3 className="font-display text-headline-sm text-ink">{next.name}</h3>
            </div>
            <Link
              href={`/projects/${next.slug}`}
              className="flex items-center gap-2 py-[14px] -my-[14px] font-body text-label-md text-teal uppercase tracking-wider hover:gap-3 transition-all"
            >
              View project
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      )}

      <CTABand />
    </>
  )
}
