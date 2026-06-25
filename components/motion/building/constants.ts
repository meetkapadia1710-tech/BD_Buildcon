import * as THREE from 'three'

// ─── Shared Global Geometries ──────────────────────────────────────────────────
export const GEO_COLUMN = new THREE.BoxGeometry(0.14, 1, 0.14)
export const GEO_BEAM = new THREE.BoxGeometry(1, 0.12, 0.12)
export const GEO_SLAB = new THREE.BoxGeometry(1, 0.1, 1)
export const GEO_SPIRE = new THREE.CylinderGeometry(0.05, 0.05, 4, 6)
export const GEO_FLOOR = new THREE.PlaneGeometry(400, 400)

// ─── Materials ─────────────────────────────────────────────────────────────────
export const MAT_FOUNDATION = new THREE.MeshStandardMaterial({ color: '#c8c8c8', roughness: 0.9 })
export const MAT_CORE = new THREE.MeshStandardMaterial({ color: '#b8b8b8', roughness: 0.85 })
export const MAT_STEEL = new THREE.MeshStandardMaterial({
  color: '#3a3a3a',
  metalness: 0.95,
  roughness: 0.25,
  envMapIntensity: 1.35,
})
export const MAT_GLASS = new THREE.MeshPhysicalMaterial({
  color: '#cce4f7',
  metalness: 0.6,
  roughness: 0.05,
  transmission: 0.4,
  transparent: true,
  side: THREE.DoubleSide,
  envMapIntensity: 1.6,
})
export const MAT_GLASS_B = new THREE.MeshPhysicalMaterial({
  color: '#e0eaf2',
  metalness: 0.4,
  roughness: 0.1,
  transmission: 0.3,
  transparent: true,
  side: THREE.DoubleSide,
  envMapIntensity: 1.4,
})
export const MAT_SPANDREL = new THREE.MeshStandardMaterial({
  color: '#8899aa',
  roughness: 0.3,
  metalness: 0.5,
  envMapIntensity: 1.1,
})
export const MAT_SLAB = new THREE.MeshStandardMaterial({ color: '#cccccc', roughness: 0.9 })
export const MAT_INDUSTRIAL = new THREE.MeshStandardMaterial({ color: '#cec9c3', roughness: 0.95 })
export const MAT_ROOF = new THREE.MeshStandardMaterial({ color: '#aaaaaa', roughness: 0.7 })
export const MAT_ROOF_DARK = new THREE.MeshStandardMaterial({ color: '#888888', roughness: 0.8 })
export const MAT_GROUND = new THREE.MeshStandardMaterial({ color: '#d9d5cd', roughness: 1 })

// ─── Crane Materials ────────────────────────────────────────────────────────────
// Lattice steel in a warm structural grey, brand-teal accents on the working arm,
// dark counterweight + cabling for contrast.
export const MAT_CRANE_STEEL = new THREE.MeshStandardMaterial({
  color: '#d7d2c8',
  metalness: 0.6,
  roughness: 0.45,
  envMapIntensity: 1.2,
})
export const MAT_CRANE_ACCENT = new THREE.MeshStandardMaterial({
  color: '#16a8b8',
  metalness: 0.5,
  roughness: 0.4,
  envMapIntensity: 1.2,
})
export const MAT_CRANE_DARK = new THREE.MeshStandardMaterial({
  color: '#2c2f33',
  metalness: 0.7,
  roughness: 0.5,
  envMapIntensity: 1,
})
export const MAT_CABLE = new THREE.MeshStandardMaterial({ color: '#1d1f22', metalness: 0.4, roughness: 0.6 })

// ─── Machinery geometry + materials ─────────────────────────────────────────────
export const GEO_CYL = new THREE.CylinderGeometry(0.5, 0.5, 1, 16)
export const GEO_CONE = new THREE.ConeGeometry(1, 1, 22)

export const MAT_MACHINE_YELLOW = new THREE.MeshStandardMaterial({
  color: '#f2b01a',
  roughness: 0.5,
  metalness: 0.25,
  envMapIntensity: 1,
})
export const MAT_MACHINE_DARK = new THREE.MeshStandardMaterial({
  color: '#23262a',
  roughness: 0.45,
  metalness: 0.6,
  envMapIntensity: 1.2,
})
export const MAT_TYRE = new THREE.MeshStandardMaterial({ color: '#141618', roughness: 0.85 })
export const MAT_DRUM = new THREE.MeshStandardMaterial({
  color: '#d0d4d7',
  roughness: 0.5,
  metalness: 0.4,
  envMapIntensity: 1.1,
})
export const MAT_TRUCK_CAB = new THREE.MeshStandardMaterial({
  color: '#b23a2c',
  roughness: 0.4,
  metalness: 0.35,
  envMapIntensity: 1.2,
})
export const MAT_TRUCK_BODY = new THREE.MeshStandardMaterial({
  color: '#3d6b86',
  roughness: 0.5,
  metalness: 0.3,
  envMapIntensity: 1,
})
export const MAT_SAND = new THREE.MeshStandardMaterial({ color: '#ccb486', roughness: 1 })
export const MAT_GRAVEL = new THREE.MeshStandardMaterial({ color: '#8b8984', roughness: 1 })
export const MAT_REBAR = new THREE.MeshStandardMaterial({ color: '#7c6a52', roughness: 0.65, metalness: 0.55 })
export const MAT_PIPE = new THREE.MeshStandardMaterial({
  color: '#9aa0a4',
  roughness: 0.55,
  metalness: 0.45,
  envMapIntensity: 1.2,
})

// ─── Foundation / earthworks materials ──────────────────────────────────────────
export const MAT_SOIL = new THREE.MeshStandardMaterial({ color: '#9c8463', roughness: 1 })
export const MAT_SOIL_DARK = new THREE.MeshStandardMaterial({ color: '#6c5942', roughness: 1 })
export const MAT_PILE = new THREE.MeshStandardMaterial({ color: '#a39d93', roughness: 0.85 })
// light, neutral "excavated/levelled ground" pad — subtle on the white backdrop
export const MAT_PAD = new THREE.MeshStandardMaterial({ color: '#c7c0b2', roughness: 1 })

// ─── Buildings ────────────────────────────────────────────────────────────────
import type { BuildingConfig } from './types'

export interface BuildingEntry {
  id: string
  position: [number, number, number]
  config: BuildingConfig
  progressStart: number
  progressEnd: number
  glassMat: THREE.Material
}

export const BUILDINGS: BuildingEntry[] = [
  {
    id: 'towerA',
    position: [-6, 0, -6],
    config: { W: 10, D: 10, floors: 14, floorHeight: 2, hasCore: true, style: 'tower' },
    progressStart: 0.12,
    progressEnd: 0.85,
    glassMat: MAT_GLASS,
  },
  {
    id: 'towerB',
    position: [8, 0, -4],
    config: { W: 12, D: 10, floors: 8, floorHeight: 2.2, hasCore: true, style: 'midrise' },
    progressStart: 0.16,
    progressEnd: 0.78,
    glassMat: MAT_GLASS_B,
  },
  {
    id: 'blockD',
    position: [-4.5, 0, 3.8],
    config: { W: 9, D: 8, floors: 6, floorHeight: 2.5, hasCore: false, style: 'midrise' },
    progressStart: 0.19,
    progressEnd: 0.7,
    glassMat: MAT_GLASS_B,
  },
]

// Tallest building's full height — used to drive how high the crane mast climbs.
export const MAX_BUILD_HEIGHT = Math.max(...BUILDINGS.map((b) => b.config.floors * b.config.floorHeight))
