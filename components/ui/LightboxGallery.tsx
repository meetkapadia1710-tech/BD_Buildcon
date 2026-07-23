'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

export type GalleryPhoto = {
  src: string
  alt: string
  /** Optional custom grid span classes for the tile (collage layouts). */
  spanClassName?: string
}

type Props = {
  photos: GalleryPhoto[]
  /** Grid classes for the tile container — pass a responsive grid template. */
  gridClassName?: string
  /** Aspect/height applied to tiles without an explicit span. */
  tileClassName?: string
  groupLabel: string
}

let scrollLockCount = 0
function lockScroll() {
  if (scrollLockCount === 0) document.body.style.overflow = 'hidden'
  scrollLockCount++
}
function unlockScroll() {
  scrollLockCount = Math.max(0, scrollLockCount - 1)
  if (scrollLockCount === 0) document.body.style.overflow = ''
}

/**
 * Photo grid that opens into a full-screen lightbox with keyboard/arrow
 * navigation between all photos in the set.
 */
export function LightboxGallery({ photos, gridClassName, tileClassName, groupLabel }: Props) {
  const [index, setIndex] = useState(-1)
  const isOpen = index >= 0

  const close = useCallback(() => setIndex(-1), [])
  const next = useCallback(() => setIndex((i) => (i + 1) % photos.length), [photos.length])
  const prev = useCallback(() => setIndex((i) => (i - 1 + photos.length) % photos.length), [photos.length])

  useEffect(() => {
    if (!isOpen) return
    lockScroll()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      unlockScroll()
    }
  }, [isOpen, close, next, prev])

  const active = isOpen ? photos[index] : null

  return (
    <>
      <div className={gridClassName ?? 'grid grid-cols-2 sm:grid-cols-3 gap-[14px]'}>
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Open photo: ${p.alt}`}
            className={`group relative overflow-hidden rounded-card bg-surface cursor-pointer ${
              p.spanClassName ?? tileClassName ?? 'aspect-square'
            }`}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.06]"
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-[16px]"
              style={{ background: 'linear-gradient(to top, rgba(13,20,24,0.55), transparent 45%)' }}
            >
              <span className="text-white text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.1em]">
                {p.alt}
              </span>
            </div>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {isOpen && active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Photo lightbox"
            className="fixed inset-0 z-[400] flex flex-col bg-[rgba(13,20,24,0.96)]"
          >
            <div className="flex items-center justify-between px-[20px] sm:px-[32px] py-[20px]">
              <span className="text-white/60 text-[12px] sm:text-[13px] font-semibold tracking-[0.1em] tabular-nums">
                {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')} — {groupLabel}
              </span>
              <button
                onClick={close}
                aria-label="Close"
                className="w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] flex items-center justify-center rounded-full bg-white/[0.08] hover:bg-white/[0.18] transition-colors duration-200"
              >
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M12 4L4 12M4 4L12 12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center gap-[12px] sm:gap-[24px] px-[16px] sm:px-[32px] pb-[24px] sm:pb-[32px] min-h-0">
              <button
                onClick={prev}
                aria-label="Previous photo"
                className="shrink-0 w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] flex items-center justify-center rounded-full bg-white/[0.08] hover:bg-teal transition-colors duration-200"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="relative max-w-[calc(100%-120px)] max-h-full w-full h-full flex items-center justify-center">
                <Image
                  src={active.src}
                  alt={active.alt}
                  width={1200}
                  height={1200}
                  className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-[10px] shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
                />
              </div>
              <button
                onClick={next}
                aria-label="Next photo"
                className="shrink-0 w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] flex items-center justify-center rounded-full bg-white/[0.08] hover:bg-teal transition-colors duration-200"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
