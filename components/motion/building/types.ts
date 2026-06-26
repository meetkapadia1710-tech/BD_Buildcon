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
  glassMat?: THREE.Material
  cladMat?: THREE.Material
}

export interface SkeletonFloorProps {
  floorIndex: number
  totalFloors: number
  W: number
  D: number
  floorHeight: number
  groupRef: (el: THREE.Group | null) => void
}

export interface WindowBandsProps {
  floors: number
  floorHeight: number
  W: number
  D: number
  groupRef: React.RefObject<THREE.Group>
  geometry: THREE.BufferGeometry
}

/** Render-quality tier derived from device. Drives postprocessing, shadow res, crane detail. */
export interface QualitySettings {
  tier: 'high' | 'low'
  postprocessing: boolean
  environment: boolean
  contactShadows: boolean
  shadowMapSize: number
  craneDetail: boolean
  dpr: number
}

export interface SceneProps {
  progress: MotionValue<number>
  isMobile: boolean
  paused?: boolean
}
