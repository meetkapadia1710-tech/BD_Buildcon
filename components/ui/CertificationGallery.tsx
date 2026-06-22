'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FadeRise, FadeRiseItem } from '@/components/motion/FadeRise'
import { Lightbox } from '@/components/ui/Lightbox'
import { certifications } from '@/content/certifications'

const recommendations = certifications.filter((c) => c.type === 'recommendation')
const accreditations = certifications.filter((c) => c.type === 'accreditation')

export function CertificationGallery() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
  const [lightboxAlt, setLightboxAlt] = useState('')

  return (
    <>
      {/* Recommendation letters */}
      <div className="mb-20">
        <FadeRise className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((cert) => (
            <button
              key={cert.id}
              onClick={() => {
                if (cert.documentImage) {
                  setLightboxSrc(cert.documentImage)
                  setLightboxAlt(`${cert.client} — Recommendation Letter`)
                }
              }}
              className="card p-0 text-left overflow-hidden group cursor-pointer"
              aria-label={`View ${cert.client} recommendation letter`}
            >
              <div className="relative aspect-[3/4] bg-surface overflow-hidden">
                {cert.documentImage && (
                  <Image
                    src={cert.documentImage}
                    alt={`${cert.client} — recommendation letter thumbnail`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-teal text-white rounded-full p-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-headline-sm text-ink mb-1">{cert.clientShort}</h3>
                <p className="font-body text-body-md text-body mb-2">{cert.description}</p>
                <div className="flex items-center gap-2">
                  <span className="inline-block bg-teal/10 text-teal text-xs font-body font-semibold px-2 py-0.5 rounded-full">
                    {cert.year}
                  </span>
                  <span className="font-body text-xs text-body uppercase tracking-wider">
                    Recommendation Letter
                  </span>
                </div>
              </div>
            </button>
          ))}
        </FadeRise>
      </div>

      {/* Accreditations */}
      <div>
        <h3 className="font-display text-headline-sm text-center mb-8">Accreditations & Certifications</h3>
        <FadeRise className="flex flex-wrap justify-center gap-6">
          {accreditations.map((cert) => (
            <FadeRiseItem key={cert.id}>
              <button
                onClick={() => {
                  if (cert.documentImage) {
                    setLightboxSrc(cert.documentImage)
                    setLightboxAlt(`${cert.client} — Certificate`)
                  }
                }}
                className="card p-8 flex flex-col items-center gap-4 min-w-[200px] cursor-pointer group"
                aria-label={`View ${cert.client} certificate`}
              >
                <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center group-hover:bg-teal/20 transition-colors">
                  <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="8" r="6" />
                    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                  </svg>
                </div>
                <div className="text-center">
                  <div className="font-display font-bold text-ink text-body-md">{cert.clientShort}</div>
                  <div className="font-body text-body-md text-body mt-1">{cert.year}</div>
                </div>
              </button>
            </FadeRiseItem>
          ))}
        </FadeRise>
      </div>

      {lightboxSrc && (
        <Lightbox
          src={lightboxSrc}
          alt={lightboxAlt}
          onClose={() => setLightboxSrc(null)}
        />
      )}
    </>
  )
}
