'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

type Props = {
  src: string
  alt: string
  onClose: () => void
}

// Ref-counted body scroll lock so concurrent Lightboxes don't race.
let scrollLockCount = 0
function lockScroll() {
  if (scrollLockCount === 0) document.body.style.overflow = 'hidden'
  scrollLockCount++
}
function unlockScroll() {
  scrollLockCount = Math.max(0, scrollLockCount - 1)
  if (scrollLockCount === 0) document.body.style.overflow = ''
}

export function Lightbox({ src, alt, onClose }: Props) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    lockScroll()
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      unlockScroll()
    }
  }, [handleKeyDown])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Lightbox: ${alt}`}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative max-w-3xl w-full max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={alt}
          width={900}
          height={1260}
          className="w-full h-auto max-h-[85vh] object-contain rounded-lg shadow-2xl"
        />
        <button
          onClick={onClose}
          aria-label="Close lightbox"
          className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors"
        >
          <svg
            className="w-8 h-8"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </motion.div>
    </motion.div>
  )
}
