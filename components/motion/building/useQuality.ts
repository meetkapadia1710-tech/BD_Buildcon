import { useMemo } from 'react'
import type { QualitySettings } from './types'

/**
 * Probe the GPU once via WEBGL_debug_renderer_info + device hints and pick a
 * coarse capability class. Best-effort: on any failure we assume 'mid', which is
 * safe on both directions (it still degrades further at runtime via
 * PerformanceMonitor in the Scene).
 */
function probeGpuClass(): 'strong' | 'medium' | 'weak' {
  if (typeof document === 'undefined') return 'medium'
  try {
    const canvas = document.createElement('canvas')
    const gl = (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null
    if (!gl) return 'weak'
    const dbg = gl.getExtension('WEBGL_debug_renderer_info')
    const renderer = dbg ? String(gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL)) : ''
    // release the probe context promptly
    gl.getExtension('WEBGL_lose_context')?.loseContext()

    const r = renderer.toLowerCase()
    if (!r) return 'medium'
    if (/swiftshader|software|llvmpipe|basic render/.test(r)) return 'weak'
    // discrete / Apple silicon / modern mobile flagships
    if (/rtx|radeon rx|geforce|apple m[0-9]|apple gpu|adreno 7|mali-g7|mali-g8/.test(r)) return 'strong'
    // Intel integrated + older mobile → capable but modest
    if (/intel|uhd|iris|adreno 6|mali-g5|mali-g6|apple a1[0-4]/.test(r)) return 'medium'
    return 'medium'
  } catch {
    return 'medium'
  }
}

/**
 * Derives a render-quality tier from the device.
 *  - high: dGPU / Apple silicon desktop → SSAO, soft shadows, bloom, full detail.
 *  - mid:  laptops / recent phones     → no AO (contact shadows only), 1024 maps.
 *  - low:  mass-market / old Android    → no post, no shadow map, reduced fleet.
 */
export function useQuality(isMobile: boolean): QualitySettings {
  return useMemo<QualitySettings>(() => {
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
    const mem = typeof navigator !== 'undefined' ? ((navigator as { deviceMemory?: number }).deviceMemory ?? 4) : 4
    const gpu = probeGpuClass()

    // Resolve the tier
    let tier: QualitySettings['tier']
    if (isMobile) {
      tier = gpu === 'strong' && mem >= 4 ? 'mid' : 'low'
    } else {
      tier = gpu === 'strong' ? 'high' : gpu === 'weak' || mem <= 2 ? 'low' : 'mid'
    }

    if (tier === 'high') {
      return {
        tier: 'high',
        postprocessing: true,
        ao: true,
        softShadows: true,
        environment: true,
        contactShadows: true,
        shadows: true,
        shadowMapSize: 2048,
        facadeShader: true,
        craneDetail: true,
        fullMachines: true,
        dpr: Math.min(2, dpr),
      }
    }
    if (tier === 'mid') {
      return {
        tier: 'mid',
        postprocessing: true,
        ao: false,
        softShadows: false,
        environment: true,
        contactShadows: true,
        shadows: true,
        shadowMapSize: 1024,
        facadeShader: true,
        craneDetail: !isMobile,
        fullMachines: true,
        dpr: Math.min(isMobile ? 1.5 : 1.75, dpr),
      }
    }
    return {
      tier: 'low',
      postprocessing: false,
      ao: false,
      softShadows: false,
      environment: true,
      contactShadows: true,
      shadows: false,
      shadowMapSize: 512,
      facadeShader: false,
      craneDetail: false,
      fullMachines: false,
      dpr: 1,
    }
  }, [isMobile])
}
