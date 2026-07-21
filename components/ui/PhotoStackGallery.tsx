'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

type Props = {
  photos: string[]
  title?: string
  stackAlt?: string
  /** Sizing classes for the stack itself — overrides the default max-width. */
  className?: string
}

export function PhotoStackGallery({
  photos,
  title = 'Photo Gallery',
  stackAlt = 'Gallery photo',
  className = 'w-full max-w-[320px] aspect-[4/3] mx-auto',
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!photos || photos.length === 0) return null

  // Use up to 4 photos for the stack
  const stackPhotos = photos.slice(0, 4)
  // Define some random-looking rotations and offsets for the stack effect
  const transforms = [
    'rotate-[-6deg] translate-x-[-12px] translate-y-[8px]',
    'rotate-[4deg] translate-x-[8px] translate-y-[-4px]',
    'rotate-[-2deg] translate-x-[4px] translate-y-[4px]',
    'rotate-[2deg] translate-x-[0] translate-y-[0]',
  ]

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed inset-0 z-[400] bg-white/95 backdrop-blur-md overflow-y-auto"
          data-lenis-prevent="true"
        >
          <div className="sticky top-0 bg-white/95 backdrop-blur-2xl border-b border-hairline px-6 py-4 flex items-center justify-center z-20 shadow-sm">
            <h3 className="font-display font-bold text-[20px] sm:text-[24px] text-ink text-center">{title}</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 md:right-6 w-[40px] h-[40px] flex items-center justify-center rounded-full bg-surface hover:bg-hairline transition-colors"
              aria-label="Close gallery"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 4L4 12M4 4L12 12"
                  stroke="#2E353B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="max-w-[1400px] mx-auto p-6 md:p-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {photos.map((photo, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05, ease: 'easeOut' }}
                  className="relative aspect-square rounded-card overflow-hidden shadow-sm border border-hairline bg-surface"
                >
                  <Image
                    src={photo}
                    alt={`Gallery image ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    style={{ objectFit: 'cover' }}
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      {/* ── The Stack ── */}
      <button
        onClick={() => setIsOpen(true)}
        className={`relative group cursor-pointer focus:outline-none ${className}`}
        aria-label="Open photo gallery"
      >
        <div className="absolute -inset-4 bg-teal/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {stackPhotos.map((photo, i) => (
          <div
            key={i}
            className={`absolute inset-0 rounded-card overflow-hidden border-[4px] border-white shadow-card transition-all duration-300 ease-out origin-center
              ${transforms[i]}
              group-hover:scale-[1.05] group-hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)]
            `}
            style={{
              zIndex: i,
              transitionDelay: `${i * 30}ms`,
            }}
          >
            <Image
              src={photo}
              alt={stackAlt}
              fill
              sizes="(max-width: 768px) 100vw, 320px"
              style={{ objectFit: 'cover' }}
              className="object-cover"
            />
          </div>
        ))}

        {/* Call to action text on top */}
        <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 rounded-card">
          <span className="bg-white text-ink font-semibold px-4 py-2 rounded-full shadow-lg text-[14px]">
            View All {photos.length} Photos
          </span>
        </div>
      </button>

      {/* ── The Modal Gallery (Portal) ── */}
      {mounted ? createPortal(modalContent, document.body) : null}
    </>
  )
}
