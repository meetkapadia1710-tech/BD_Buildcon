'use client'

import { ContactShadows } from '@react-three/drei'
import type { QualitySettings } from './types'

interface GroundProps {
  quality: QualitySettings
}

/**
 * "On-page" grounding. There is intentionally no opaque floor plane — the canvas
 * is transparent, so the page's white and the faint teal blueprint grid show
 * through around and behind the structures. The towers are grounded purely by soft
 * contact shadows, which are transparent everywhere except directly beneath the
 * geometry, so nothing reads as a studio "rug" or leaves a visible horizon seam.
 */
export function Ground({ quality }: GroundProps) {
  if (!quality.contactShadows) return null
  const csResolution = quality.tier === 'high' ? 1024 : 512

  return (
    <ContactShadows
      position={[0, -0.46, 0]}
      // tight to the footprint, only the lowest few metres of geometry cast, and
      // light — so it reads as a soft shadow hugging the bases, not a grey slab
      scale={62}
      resolution={csResolution}
      blur={2.4}
      opacity={0.33}
      far={9}
      color="#3a3f45"
    />
  )
}
