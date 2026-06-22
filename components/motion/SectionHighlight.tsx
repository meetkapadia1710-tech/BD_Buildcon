'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  /** The section id being highlighted (e.g. 'overview', 'ideology') */
  activeId: string | null
  /** The id this badge belongs to */
  sectionId: string
}

/**
 * Renders an expanding teal ring + glow that pulses once when
 * the user navigates to this section via the dropdown.
 * Place it as a direct child inside the target <section>.
 */
export function SectionHighlight({ activeId, sectionId }: Props) {
  const active = activeId === sectionId

  return (
    <AnimatePresence>
      {active && (
        <motion.span
          key="ring"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-0"
          initial={{ opacity: 0.7, scale: 0.96 }}
          animate={{ opacity: 0, scale: 1.03 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          style={{
            boxShadow: 'inset 0 0 0 3px #16A8B8, 0 0 40px rgba(22,168,184,0.18)',
          }}
        />
      )}
    </AnimatePresence>
  )
}
