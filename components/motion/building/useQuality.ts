import { useMemo } from 'react'
import type { QualitySettings } from './types'

/**
 * Derives a render-quality tier from the device. Desktop gets the full cinematic
 * stack (postprocessing, environment reflections, high-res shadows, detailed crane);
 * mobile drops the expensive passes as a guardrail so it doesn't white-screen.
 */
export function useQuality(isMobile: boolean): QualitySettings {
  return useMemo<QualitySettings>(() => {
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
    if (isMobile) {
      return {
        tier: 'low',
        postprocessing: false,
        environment: true,
        contactShadows: true,
        shadowMapSize: 1024,
        craneDetail: false,
        dpr: Math.min(1.5, dpr),
      }
    }
    return {
      tier: 'high',
      postprocessing: true,
      environment: true,
      contactShadows: true,
      shadowMapSize: 2048,
      craneDetail: true,
      dpr: Math.min(2, dpr),
    }
  }, [isMobile])
}
