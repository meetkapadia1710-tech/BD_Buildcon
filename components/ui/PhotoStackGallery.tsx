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
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Auto-play the stack
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isOpen) {
        setCurrentIndex((prev) => (prev + 1) % photos.length)
      }
    }, 3500)
    return () => clearInterval(timer)
  }, [isOpen, photos.length])

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

  const cardVariants = {
    front: {
      y: 0,
      scale: 1,
      zIndex: 40,
      opacity: 1,
      rotate: 0,
    },
    pos1: {
      y: -25,
      scale: 0.95,
      zIndex: 30,
      opacity: 0.9,
      rotate: -2,
    },
    pos2: {
      y: -50,
      scale: 0.9,
      zIndex: 20,
      opacity: 0.7,
      rotate: 2,
    },
    back: {
      y: -75,
      scale: 0.85,
      zIndex: 10,
      opacity: 0,
      rotate: -1,
    },
    exit: {
      y: 120, // Drops down
      scale: 1.05,
      zIndex: 50, // Stay on top while exiting
      opacity: 0,
      rotate: 6,
    },
  }

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
                  className="relative aspect-[16/10] rounded-card overflow-hidden shadow-md border border-hairline bg-[#FAFBFB]"
                >
                  <Image
                    src={photo}
                    alt={`Gallery image ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    style={{ objectFit: 'contain' }}
                    className="object-contain p-2 hover:scale-105 transition-transform duration-500"
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
      <div className="relative w-full max-w-[560px] mx-auto pt-[60px] pb-[30px] px-[16px] sm:px-[32px]">
        {/* Glow effect */}
        <div className="absolute top-[30%] left-[10%] right-[10%] bottom-[10%] bg-teal/10 rounded-full blur-[60px] pointer-events-none" />

        <div
          className="relative w-full aspect-[16/10] sm:aspect-[16/10] cursor-pointer group"
          onClick={() => setIsOpen(true)}
          role="button"
          tabIndex={0}
          aria-label="Open photo gallery"
        >
          {photos.map((photo, i) => {
            let diff = i - currentIndex

            // Handle wrap-around smoothly
            if (diff < -1) diff += photos.length
            if (diff > photos.length - 2) diff -= photos.length

            const isVisible = diff >= -1 && diff <= 3
            if (!isVisible) return null

            let variant = 'back'
            if (diff === -1) variant = 'exit'
            if (diff === 0) variant = 'front'
            if (diff === 1) variant = 'pos1'
            if (diff === 2) variant = 'pos2'

            return (
              <motion.div
                key={photo}
                initial={false}
                animate={variant}
                variants={cardVariants}
                transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                className="absolute inset-0 rounded-xl sm:rounded-2xl overflow-hidden border-[4px] sm:border-[8px] border-white bg-white shadow-[0_12px_48px_rgba(0,0,0,0.12)] origin-bottom"
              >
                <Image
                  src={photo}
                  alt={stackAlt}
                  fill
                  sizes="(max-width: 640px) 90vw, 560px"
                  style={{ objectFit: 'contain' }}
                  className="object-contain p-2"
                />
              </motion.div>
            )
          })}

          {/* Call to action text on hover (desktop only) */}
          <div className="absolute inset-0 z-[60] hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <span className="bg-white/95 backdrop-blur-sm text-ink font-semibold px-5 py-2.5 rounded-full shadow-lg text-[14px] flex items-center gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              View All {photos.length} Photos
            </span>
          </div>
        </div>
      </div>

      {/* ── The Modal Gallery (Portal) ── */}
      {mounted ? createPortal(modalContent, document.body) : null}
    </>
  )
}
