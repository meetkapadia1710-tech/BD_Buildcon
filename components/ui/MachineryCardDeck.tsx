'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion'

export type DeckCardItem = {
  id: string
  title: string
  category: string
  specs: string
  quantity: string
  image: string
  alt: string
}

export const fleetDeckCards: DeckCardItem[] = [
  {
    id: 'card-1',
    title: 'RMC Batching Plant (Universal 1050 / Gayatri)',
    category: 'Batching & Pumping',
    specs: '1050L & 30 CUM Capacity · Automated Electronic Dosing',
    quantity: '7 Plants Owned',
    image: '/brochurephotos/plant and machinery/image17.webp',
    alt: 'BD Buildcon RMC Batching Plant and Silos',
  },
  {
    id: 'card-2',
    title: 'Truck-Mounted DMC Piling Rigs',
    category: 'Foundation & Piling',
    specs: 'ACE Heavy DMC Piling Rigs for Industrial Deep Foundations',
    quantity: '5 Heavy Rigs',
    image: '/brochurephotos/plant and machinery/WhatsApp Image 2026-07-12 at 12.44.00 PM (1).webp',
    alt: 'BD Buildcon Truck-Mounted DMC Piling Rigs',
  },
  {
    id: 'card-3',
    title: 'Cement Storage Silos & Batching Towers',
    category: 'Batching & Pumping',
    specs: 'High-Capacity Bulk Cement Storage Silos with Dust Extraction',
    quantity: '100+ Tons Capacity',
    image: '/brochurephotos/plant and machinery/image45.webp',
    alt: 'Cement Silo Towers owned by BD Buildcon',
  },
  {
    id: 'card-4',
    title: 'Long-Reach Boom Placer (36m)',
    category: 'Batching & Pumping',
    specs: 'Schwing & Sany 36m High-Rise Concrete Placement Truck',
    quantity: '2 Boom Placers',
    image: '/brochurephotos/plant and machinery/image46.webp',
    alt: 'Schwing Boom Placer Truck in action on site',
  },
  {
    id: 'card-5',
    title: 'Heavy Stationary Concrete Pumps',
    category: 'Batching & Pumping',
    specs: 'Schwing SP1200 & Universal 703-D Night Pour Operations',
    quantity: '7 Pumps Fleet',
    image: '/brochurephotos/plant and machinery/image48.webp',
    alt: 'Night-time concrete pumping operations with Schwing pumps',
  },
  {
    id: 'card-6',
    title: 'Transit Mixer Truck Fleet (6 CUM)',
    category: 'Transport & Logistics',
    specs: 'Aquarious & Greaves Heavy-Duty 6 CUM Concrete Transit Mixers',
    quantity: '6 Transit Mixers',
    image: '/brochurephotos/plant and machinery/WhatsApp Image 2026-07-12 at 12.44.00 PM.webp',
    alt: 'BD Buildcon Transit Mixer Fleet',
  },
  {
    id: 'card-7',
    title: 'Vibratory Soil Compactor Rollers',
    category: 'Earthmoving & Rollers',
    specs: 'L&T Case 11.5 MT (35 MT Compaction Force Output)',
    quantity: '6 Vibro Rollers',
    image: '/brochurephotos/plant and machinery/DocScanner Sep 9, 2025 5-45 PM_1(126).webp',
    alt: 'Vibratory Soil Compactor Rollers on site',
  },
  {
    id: 'card-8',
    title: 'Heavy Excavators & Backhoe Loaders',
    category: 'Earthmoving & Rollers',
    specs: 'JCB 3DX & Poclain JS-130 Excavator Fleet',
    quantity: '12 Excavators',
    image: '/brochurephotos/plant and machinery/WhatsApp Image 2026-07-12 at 12.44.00 PM (3).webp',
    alt: 'JCB & Poclain Excavators Fleet',
  },
  {
    id: 'card-9',
    title: 'Hydraulic Mobile Cranes & Tower Rigs',
    category: 'Heavy Lifting',
    specs: 'ACE 35 MT Lifting Capacity & Hydra F-15 Heavy Cranes',
    quantity: '8 Lifting Cranes',
    image: '/brochurephotos/plant and machinery/WhatsApp Image 2026-07-12 at 12.58.08 PM.webp',
    alt: 'ACE Heavy Lifting Mobile Crane',
  },
  {
    id: 'card-10',
    title: 'Digital Laser Survey & Total Station',
    category: 'Survey & QC',
    specs: 'High-Precision Setting-Out & Sub-Millimeter Laser Alignment',
    quantity: 'In-House Survey Unit',
    image: '/brochurephotos/plant and machinery/image6.webp',
    alt: 'Engineer conducting Total Station optical survey',
  },
  {
    id: 'card-11',
    title: 'On-Site Quality Testing Laboratory',
    category: 'Survey & QC',
    specs: 'Cube Testing Compressometer & Slump Cone Calibration Equipment',
    quantity: 'NABL Aligned Lab',
    image: '/brochurephotos/plant and machinery/DocScanner Sep 9, 2025 5-45 PM_1(106).webp',
    alt: 'On-site concrete testing laboratory setup',
  },
  {
    id: 'card-12',
    title: 'Central Logistics & Maintenance Base',
    category: 'Transport & Logistics',
    specs: 'Integrated Storage Bay & Preventative Maintenance Workshop',
    quantity: '5-Acre Ops Base',
    image: '/brochurephotos/plant and machinery/DocScanner Sep 9, 2025 5-45 PM_1(125).webp',
    alt: 'Machinery maintenance and material storage yard',
  },
  {
    id: 'card-13',
    title: 'Earthmoving Fleet at Work',
    category: 'Earthmoving & Rollers',
    specs: 'L&T 190 Heavy Diggers on Multi-Acre Industrial Site',
    quantity: 'Active Fleet',
    image: '/brochurephotos/plant and machinery/DocScanner Sep 9, 2025 5-45 PM_1(155).webp',
    alt: 'Excavator working at sunset',
  },
  {
    id: 'card-14',
    title: 'Modular Scaffolding & Steel Formwork',
    category: 'Structure & Scaffolding',
    specs: 'Cup-Lock Heavy Scaffolding & Heavy Concrete Shuttering',
    quantity: '50,000+ SQFT Stock',
    image: '/brochurephotos/plant and machinery/IMG-20150407-WA0003.webp',
    alt: 'Modular scaffolding and formwork at construction site',
  },
  {
    id: 'card-15',
    title: '24/7 On-Site Emergency Ambulance',
    category: 'Site Safety',
    specs: 'Dedicated TATA Site Rescue Ambulance with First-Aid Rigging',
    quantity: '3 Ambulances',
    image: '/brochurephotos/plant and machinery/WhatsApp Image 2026-07-12 at 12.44.00 PM (2).webp',
    alt: 'BD Buildcon Site Safety Emergency Response Ambulance',
  },
  {
    id: 'card-16',
    title: 'Deep Foundation Rig for Industrial Steel Plants',
    category: 'Foundation & Piling',
    specs: 'DMC Rig Operating for Heavy Structural Foundation Columns',
    quantity: 'Specialized Unit',
    image: '/brochurephotos/plant and machinery/image44.webp',
    alt: 'Heavy piling rig in operation',
  },
]

const categories = [
  'All Fleet',
  'Batching & Pumping',
  'Earthmoving & Rollers',
  'Heavy Lifting',
  'Foundation & Piling',
  'Transport & Logistics',
  'Survey & QC',
]

export function MachineryCardDeck() {
  const [selectedCategory, setSelectedCategory] = useState('All Fleet')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [viewMode, setViewMode] = useState<'deck' | 'grid'>('deck')
  const [selectedCardForModal, setSelectedCardForModal] = useState<DeckCardItem | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState<number>(0)

  const dragX = useMotionValue(0)
  const cardRotate = useTransform(dragX, [-250, 0, 250], [-18, 0, 18])
  const cardOpacity = useTransform(dragX, [-300, -180, 0, 180, 300], [0.3, 1, 1, 1, 0.3])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Filtered cards based on active category
  const filteredCards = useMemo(() => {
    if (selectedCategory === 'All Fleet') return fleetDeckCards
    return fleetDeckCards.filter((card) => card.category === selectedCategory)
  }, [selectedCategory])

  // Reset current index when category changes
  useEffect(() => {
    setCurrentIndex(0)
  }, [selectedCategory])

  // Auto play autoplay interval
  useEffect(() => {
    if (!isPlaying || viewMode !== 'deck' || selectedCardForModal !== null || filteredCards.length <= 1) return

    const timer = setInterval(() => {
      setSwipeDirection(1)
      setCurrentIndex((prev) => (prev + 1) % filteredCards.length)
    }, 4500)

    return () => clearInterval(timer)
  }, [isPlaying, viewMode, selectedCardForModal, filteredCards.length])

  const handleNext = useCallback(() => {
    setSwipeDirection(1)
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length)
  }, [filteredCards.length])

  const handlePrev = useCallback(() => {
    setSwipeDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length)
  }, [filteredCards.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedCardForModal) {
        if (e.key === 'Escape') setSelectedCardForModal(null)
        if (e.key === 'ArrowRight') {
          const idx = fleetDeckCards.findIndex((c) => c.id === selectedCardForModal.id)
          if (idx !== -1) setSelectedCardForModal(fleetDeckCards[(idx + 1) % fleetDeckCards.length])
        }
        if (e.key === 'ArrowLeft') {
          const idx = fleetDeckCards.findIndex((c) => c.id === selectedCardForModal.id)
          if (idx !== -1)
            setSelectedCardForModal(fleetDeckCards[(idx - 1 + fleetDeckCards.length) % fleetDeckCards.length])
        }
        return
      }

      if (viewMode === 'deck') {
        if (e.key === 'ArrowRight') handleNext()
        if (e.key === 'ArrowLeft') handlePrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedCardForModal, viewMode, handleNext, handlePrev])

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const threshold = 90
    const velocityThreshold = 400

    if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      handleNext()
    } else if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      handlePrev()
    }
  }

  // Active top card
  const activeCard = filteredCards[currentIndex % filteredCards.length] || filteredCards[0]

  return (
    <div className="w-full">
      {/* ── Control Bar: Category Filters & View Toggle ── */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 sm:mb-12">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none max-w-full">
          {categories.map((cat) => {
            const count =
              cat === 'All Fleet' ? fleetDeckCards.length : fleetDeckCards.filter((c) => c.category === cat).length

            if (count === 0) return null

            const isSelected = selectedCategory === cat
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat)
                  setIsPlaying(false)
                }}
                className={`px-3.5 py-1.5 rounded-full text-[12px] sm:text-[13px] font-semibold whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-[#5BD6E2] text-dark-bg border-[#5BD6E2] shadow-[0_0_16px_rgba(91,214,226,0.35)]'
                    : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-dark-bg/20 text-dark-bg' : 'bg-white/10 text-white/50'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* View Mode Switcher + AutoPlay Toggle */}
        <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 border-t md:border-t-0 border-white/10 pt-3 md:pt-0">
          {viewMode === 'deck' && (
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-1.5 rounded-lg text-[12px] font-medium bg-white/5 hover:bg-white/10 text-white/70 border border-white/10 flex items-center gap-1.5 transition-colors"
              title={isPlaying ? 'Pause auto-rotation' : 'Play auto-rotation'}
            >
              {isPlaying ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-[#5BD6E2] animate-pulse" />
                  <span>Auto-Playing</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <span>Paused</span>
                </>
              )}
            </button>
          )}

          <div className="bg-white/5 border border-white/10 p-1 rounded-xl flex items-center gap-1">
            <button
              onClick={() => setViewMode('deck')}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                viewMode === 'deck'
                  ? 'bg-[#5BD6E2] text-dark-bg shadow-sm'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="14" height="14" rx="2" strokeDasharray="3 3" />
                <rect x="7" y="7" width="14" height="14" rx="2" />
              </svg>
              <span>3D Card Deck</span>
            </button>

            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                viewMode === 'grid'
                  ? 'bg-[#5BD6E2] text-dark-bg shadow-sm'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="8" height="8" rx="1.5" />
                <rect x="13" y="3" width="8" height="8" rx="1.5" />
                <rect x="3" y="13" width="8" height="8" rx="1.5" />
                <rect x="13" y="13" width="8" height="8" rx="1.5" />
              </svg>
              <span>Spread Grid</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── 3D DECK VIEW ── */}
      {viewMode === 'deck' && (
        <div className="relative w-full max-w-[820px] mx-auto py-4 sm:py-8 px-2 sm:px-4">
          {/* Ambient Glow behind Deck */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[80%] bg-[#5BD6E2]/10 rounded-full blur-[90px] pointer-events-none" />

          {/* Deck Container */}
          <div className="relative w-full h-[460px] sm:h-[520px] lg:h-[560px] flex items-center justify-center perspective-[1200px]">
            {filteredCards.map((card, i) => {
              // Calculate stack position relative to currentIndex
              let diff = i - currentIndex
              if (diff < 0) diff += filteredCards.length

              // Only render top 4 cards for optimal DOM performance
              if (diff >= 4) return null

              const isTop = diff === 0

              // Stack styling transformation values
              const stackVariants = {
                0: {
                  y: 0,
                  scale: 1,
                  rotate: 0,
                  opacity: 1,
                  filter: 'brightness(1)',
                },
                1: {
                  y: -18,
                  scale: 0.95,
                  rotate: -2,
                  opacity: 0.92,
                  filter: 'brightness(0.85)',
                },
                2: {
                  y: -36,
                  scale: 0.9,
                  rotate: 2.5,
                  opacity: 0.75,
                  filter: 'brightness(0.7)',
                },
                3: {
                  y: -54,
                  scale: 0.85,
                  rotate: -1.5,
                  opacity: 0.5,
                  filter: 'brightness(0.55)',
                },
              }

              const targetVariant = stackVariants[diff as keyof typeof stackVariants] || stackVariants[3]

              return (
                <motion.div
                  key={card.id}
                  style={{
                    zIndex: (4 - diff) * 10,
                    ...(isTop ? { x: dragX, rotate: cardRotate, opacity: cardOpacity } : {}),
                  }}
                  drag={isTop ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragEnd={isTop ? handleDragEnd : undefined}
                  initial={false}
                  animate={
                    isTop
                      ? {
                          y: 0,
                          scale: 1,
                          filter: 'brightness(1)',
                        }
                      : targetVariant
                  }
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 26,
                  }}
                  whileHover={isTop ? { scale: 1.01 } : undefined}
                  onClick={() => {
                    if (isTop) {
                      setSelectedCardForModal(card)
                    }
                  }}
                  className={`absolute top-4 sm:top-8 w-[94%] sm:w-[90%] max-w-[760px] h-[380px] sm:h-[430px] lg:h-[460px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 bg-[#0B111A] shadow-[0_20px_60px_rgba(0,0,0,0.6)] cursor-grab active:cursor-grabbing select-none origin-bottom ${
                    isTop ? 'ring-1 ring-[#5BD6E2]/40' : ''
                  }`}
                >
                  {/* Opaque Background & Photo */}
                  <div className="absolute inset-0 bg-[#0B111A]">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      priority={isTop}
                      sizes="(max-width: 768px) 94vw, 760px"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B111A] via-[#0B111A]/70 to-black/30 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />

                  {/* Top Bar Badges */}
                  <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between z-10 pointer-events-none">
                    <span className="px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-bold uppercase tracking-wider bg-[#5BD6E2] text-dark-bg shadow-md">
                      {card.category}
                    </span>
                    {isTop && (
                      <span className="px-3 py-1 rounded-full text-[11px] sm:text-[12px] font-semibold bg-black/60 text-white/90 backdrop-blur-md border border-white/10">
                        {card.quantity}
                      </span>
                    )}
                  </div>

                  {/* Drag / Click Visual Hint (Desktop/Mobile) - Top Card Only */}
                  {isTop && (
                    <div className="absolute top-16 sm:top-20 left-1/2 -translate-x-1/2 z-10 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white/70 text-[11px]">
                      <svg className="w-3.5 h-3.5 text-[#5BD6E2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 7h8M8 12h8m-8 5h8M3 12l4-4m-4 4l4 4m13-4l-4-4m4 4l-4 4"
                        />
                      </svg>
                      <span>Drag left / right to swipe cards</span>
                    </div>
                  )}

                  {/* Bottom Content Overlay - Top Card Only */}
                  {isTop && (
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 lg:p-8 z-10">
                      <div className="flex items-end justify-between gap-4">
                        <div className="max-w-[85%]">
                          <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-[#5BD6E2] mb-1">
                            BD Buildcon Owned Fleet
                          </span>
                          <h3 className="font-display font-[800] text-[20px] sm:text-[26px] lg:text-[30px] leading-[1.2] text-white tracking-[-0.01em] mb-2 drop-shadow-sm">
                            {card.title}
                          </h3>
                          <p className="text-[13px] sm:text-[15px] leading-[1.5] text-white/80 line-clamp-2">
                            {card.specs}
                          </p>
                        </div>

                        {/* Expand / View Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedCardForModal(card)
                          }}
                          className="w-[42px] h-[42px] sm:w-[48px] sm:h-[48px] rounded-full bg-white/10 hover:bg-[#5BD6E2] text-white hover:text-dark-bg backdrop-blur-md border border-white/20 hover:border-[#5BD6E2] flex items-center justify-center shrink-0 transition-all duration-300 shadow-lg group/btn"
                          aria-label="Enlarge view"
                        >
                          <svg
                            className="w-5 h-5 transition-transform group-hover/btn:scale-110"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* ── Deck Navigation Controls ── */}
          <div className="flex items-center justify-between gap-4 mt-4 sm:mt-6 px-4 max-w-[760px] mx-auto">
            {/* Prev Button */}
            <button
              onClick={() => {
                handlePrev()
                setIsPlaying(false)
              }}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/5 hover:bg-[#5BD6E2] text-white hover:text-dark-bg border border-white/15 hover:border-[#5BD6E2] flex items-center justify-center transition-all duration-300 shadow-md group"
              aria-label="Previous Card"
            >
              <svg
                className="w-5 h-5 transition-transform group-hover:-translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Deck Counter & Progress Dots */}
            <div className="flex flex-col items-center gap-2">
              <div className="text-[13px] font-mono font-bold tracking-widest text-[#5BD6E2]">
                {String((currentIndex % filteredCards.length) + 1).padStart(2, '0')}{' '}
                <span className="text-white/40">/ {String(filteredCards.length).padStart(2, '0')}</span>
              </div>
              <div className="flex items-center gap-1.5 max-w-[200px] overflow-hidden">
                {filteredCards.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentIndex(idx)
                      setIsPlaying(false)
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex % filteredCards.length
                        ? 'w-6 bg-[#5BD6E2]'
                        : 'w-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to card ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={() => {
                handleNext()
                setIsPlaying(false)
              }}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/5 hover:bg-[#5BD6E2] text-white hover:text-dark-bg border border-white/15 hover:border-[#5BD6E2] flex items-center justify-center transition-all duration-300 shadow-md group"
              aria-label="Next Card"
            >
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ── SPREAD GRID VIEW ── */}
      {viewMode === 'grid' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {filteredCards.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
              onClick={() => setSelectedCardForModal(card)}
              className="group relative h-[320px] rounded-2xl overflow-hidden border border-white/10 bg-[#121A26] cursor-pointer hover:border-[#5BD6E2]/50 hover:shadow-[0_12px_32px_rgba(91,214,226,0.15)] transition-all duration-300 flex flex-col justify-end p-5"
            >
              <Image
                src={card.image}
                alt={card.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover group-hover:scale-108 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B111A] via-[#0B111A]/50 to-transparent group-hover:from-[#0B111A]/90 transition-colors" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#5BD6E2] text-dark-bg">
                  {card.category}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-black/60 text-white/90 backdrop-blur-sm border border-white/10">
                  {card.quantity}
                </span>
              </div>

              <div className="relative z-10">
                <h4 className="font-display font-bold text-[18px] text-white leading-tight mb-1 group-hover:text-[#5BD6E2] transition-colors">
                  {card.title}
                </h4>
                <p className="text-[12px] text-white/70 line-clamp-2">{card.specs}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* ── EXPANDED CARD LIGHTBOX MODAL ── */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedCardForModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[500] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
                onClick={() => setSelectedCardForModal(null)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 20 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-[1000px] bg-[#0E1622] rounded-2xl sm:rounded-3xl border border-white/15 overflow-hidden shadow-2xl flex flex-col lg:flex-row"
                >
                  {/* Modal Close Button */}
                  <button
                    onClick={() => setSelectedCardForModal(null)}
                    className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-[#5BD6E2] hover:text-dark-bg border border-white/15 flex items-center justify-center transition-colors"
                    aria-label="Close dialog"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Image Viewport */}
                  <div className="relative w-full lg:w-3/5 h-[300px] sm:h-[400px] lg:h-[540px] bg-black">
                    <Image
                      src={selectedCardForModal.image}
                      alt={selectedCardForModal.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 600px"
                      className="object-contain p-2"
                    />
                  </div>

                  {/* Info Details Panel */}
                  <div className="w-full lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/10 bg-[#121A26]">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-[#5BD6E2] text-dark-bg">
                          {selectedCardForModal.category}
                        </span>
                        <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/10 text-white/80 border border-white/10">
                          {selectedCardForModal.quantity}
                        </span>
                      </div>

                      <h3 className="font-display font-[800] text-[22px] sm:text-[26px] leading-[1.25] text-white tracking-[-0.01em] mb-4">
                        {selectedCardForModal.title}
                      </h3>

                      <div className="space-y-3 border-t border-b border-white/10 py-4 mb-6">
                        <div>
                          <span className="block text-[11px] font-semibold uppercase tracking-wider text-white/40 mb-1">
                            Equipment Details &amp; Spec
                          </span>
                          <p className="text-[14px] leading-relaxed text-white/85">{selectedCardForModal.specs}</p>
                        </div>
                        <div>
                          <span className="block text-[11px] font-semibold uppercase tracking-wider text-white/40 mb-1">
                            Ownership &amp; Availability
                          </span>
                          <p className="text-[14px] leading-relaxed text-[#5BD6E2]">
                            100% BD Buildcon Owned · Zero Rental Reliance
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Modal Bottom Prev / Next Nav */}
                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={() => {
                          const idx = fleetDeckCards.findIndex((c) => c.id === selectedCardForModal.id)
                          if (idx !== -1)
                            setSelectedCardForModal(
                              fleetDeckCards[(idx - 1 + fleetDeckCards.length) % fleetDeckCards.length],
                            )
                        }}
                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-[13px] font-medium border border-white/10 flex items-center gap-2 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>Previous Machine</span>
                      </button>

                      <button
                        onClick={() => {
                          const idx = fleetDeckCards.findIndex((c) => c.id === selectedCardForModal.id)
                          if (idx !== -1) setSelectedCardForModal(fleetDeckCards[(idx + 1) % fleetDeckCards.length])
                        }}
                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-[13px] font-medium border border-white/10 flex items-center gap-2 transition-colors"
                      >
                        <span>Next Machine</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  )
}
