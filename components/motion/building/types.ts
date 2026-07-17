import type { MotionValue } from 'framer-motion'
import type * as THREE from 'three'

export interface BuildingConfig {
  W: number
  D: number
  floors: number
  floorHeight: number
  hasCore: boolean
  style: 'tower' | 'midrise' | 'industrial'
}

export interface BuildingProps {
  position?: [number, number, number]
  config: BuildingConfig
  progress: MotionValue<number>
  progressStart: number
  progressEnd: number
  glassTint?: THREE.ColorRepresentation
  quality: QualitySettings
}

/** Render-quality tier derived from device. Drives post, AO, shadows, detail. */
export interface QualitySettings {
  tier: 'high' | 'mid' | 'low'
  /** cinematic post composer (bloom/tone/vignette/SMAA) */
  postprocessing: boolean
  /** ambient-occlusion pass (desktop-class only) */
  ao: boolean
  /** PCSS soft shadows */
  softShadows: boolean
  /** baked env reflections from Lightformers */
  environment: boolean
  /** soft contact shadows under the models */
  contactShadows: boolean
  /** directional shadow map */
  shadows: boolean
  shadowMapSize: number
  /** procedural curtain-wall façade shader (vs flat glass) */
  facadeShader: boolean
  /** crane lattice diagonals */
  craneDetail: boolean
  /** full ground-machine fleet (vs a reduced set) */
  fullMachines: boolean
  dpr: number
}

export interface SceneProps {
  progress: MotionValue<number>
  isMobile: boolean
  paused?: boolean
}
