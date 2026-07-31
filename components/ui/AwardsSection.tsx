'use client'

import { useState } from 'react'
import Image from 'next/image'
import { AnimatePresence } from 'framer-motion'
import { FadeRise } from '@/components/motion/FadeRise'
import { SlideIn } from '@/components/motion/SlideIn'
import { Lightbox } from '@/components/ui/Lightbox'
import { awards } from '@/content/awards'

type Props = {
  heading?: string
  eyebrow?: string
  subheading?: string
  className?: string
}

/**
 * Client-issued safety awards, click-to-enlarge.
 *
 * Uses object-contain (not object-cover, as CertificationGallery does) on purpose:
 * these are documents whose wording is the point, and the set mixes landscape
 * certificates with a portrait trophy photo. Cropping to fill would cut the text
 * off. The letterboxing that object-contain leaves is masked by matching the
 * padded frame to the card background.
 */
export function AwardsSection({
  eyebrow = 'Recognition',
  heading = 'Awards & Recognition',
  subheading = 'Safety milestones certified by the clients whose sites we build on.',
  className = 'bg-surface border-y border-hairline py-[72px] lg:py-[100px]',
}: Props) {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  if (awards.length === 0) return null

  return (
    <section aria-label="Awards and Recognition" className={className}>
      <div className="max-w-container mx-auto px-gutter">
        <SlideIn from="bottom">
          <div className="max-w-[720px] mb-10 lg:mb-14">
            <span className="block text-[13px] font-semibold uppercase tracking-[0.14em] text-teal mb-3">
              {eyebrow}
            </span>
            <h2 className="font-display font-[800] text-[32px] sm:text-[42px] tracking-[-0.02em] leading-[1.1] text-ink mb-4">
              {heading}
            </h2>
            {subheading && <p className="text-[16px] sm:text-[17px] leading-[1.65] text-body m-0">{subheading}</p>}
          </div>
        </SlideIn>

        <FadeRise className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.08}>
          {awards.map((award) => (
            <button
              key={award.id}
              type="button"
              onClick={() => setLightbox({ src: award.image, alt: `${award.title} — awarded by ${award.issuer}` })}
              className="group flex flex-col text-left bg-white border border-hairline rounded-card overflow-hidden cursor-pointer transition-all duration-300 hover:border-teal/40 hover:shadow-[0_12px_32px_rgba(0,0,0,0.10)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2"
              aria-label={`Enlarge ${award.title} award from ${award.issuerShort}`}
            >
              <div className="relative aspect-[4/3] bg-surface p-4 overflow-hidden">
                <Image
                  src={award.image}
                  alt={`${award.kind} from ${award.issuerShort} — ${award.title}`}
                  fill
                  className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/[0.06] transition-colors duration-300">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-teal text-white rounded-full p-3">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </span>
                </span>
              </div>

              {/* Heading only — the award image already carries its own wording, so the
                  kind/description/project copy in content/awards.ts is deliberately not
                  rendered here. That detail still feeds the Organization JSON-LD in
                  app/layout.tsx, so nothing is lost for search engines. */}
              <div className="p-6 border-t border-hairline">
                <h3 className="font-display font-bold text-[19px] leading-[1.3] text-ink m-0 group-hover:text-teal transition-colors duration-200">
                  {award.title}
                </h3>
              </div>
            </button>
          ))}
        </FadeRise>
      </div>

      <AnimatePresence>
        {lightbox && <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </section>
  )
}
