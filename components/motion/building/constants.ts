import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { concreteRoughnessMap } from './textures'

// ─── Geometry helpers ──────────────────────────────────────────────────────────
// Chamfered members catch specular light along their edges — the single biggest
// tell separating an "architectural model" from a "toy render". Every primitive
// below is a low-segment RoundedBox so the whole scene inherits the softer read.
function rbox(w: number, h: number, d: number, radius = 0.03, seg = 2) {
  // radius must stay under half the smallest side or RoundedBoxGeometry degenerates
  const r = Math.min(radius, Math.min(w, h, d) * 0.48)
  return new RoundedBoxGeometry(w, h, d, seg, r)
}

// ─── Shared Global Geometries ──────────────────────────────────────────────────
// Columns are re-proportioned from a spindly 0.14 to a structural 0.42 on a ~10u
// bay (≈1:24, a believable RCC column). Unit height 1 → scaled by floorHeight.
export const GEO_COLUMN = rbox(0.42, 1, 0.42, 0.05)
export const GEO_BEAM = rbox(1, 0.24, 0.2, 0.04)
// Floor plates get real thickness + a fascia edge instead of a paper wafer.
export const GEO_SLAB = rbox(1, 0.22, 1, 0.03)
export const GEO_SPIRE = new THREE.CylinderGeometry(0.06, 0.09, 4, 8)
export const GEO_FLOOR = new THREE.PlaneGeometry(400, 400)

const concreteRough = concreteRoughnessMap() ?? undefined

// ─── Materials ─────────────────────────────────────────────────────────────────
// Palette: warm off-white concrete (not clinical grey), near-black blue steel,
// teal reserved strictly as an accent. Warm whites read as "daylight on concrete".
export const MAT_FOUNDATION = new THREE.MeshStandardMaterial({
  color: '#d8d3ca',
  roughness: 0.92,
  roughnessMap: concreteRough,
})
export const MAT_CORE = new THREE.MeshStandardMaterial({
  color: '#e2ddd4',
  roughness: 0.86,
  roughnessMap: concreteRough,
})
export const MAT_STEEL = new THREE.MeshStandardMaterial({
  color: '#23272e',
  metalness: 0.86,
  roughness: 0.34,
  envMapIntensity: 1.4,
})
export const MAT_SPANDREL = new THREE.MeshStandardMaterial({
  color: '#7f8b96',
  roughness: 0.34,
  metalness: 0.5,
  envMapIntensity: 1.1,
})
export const MAT_SLAB = new THREE.MeshStandardMaterial({
  color: '#d3cec4',
  roughness: 0.9,
  roughnessMap: concreteRough,
})
export const MAT_SLAB_FASCIA = new THREE.MeshStandardMaterial({ color: '#b9b3a7', roughness: 0.88 })
export const MAT_INDUSTRIAL = new THREE.MeshStandardMaterial({ color: '#d0cbc3', roughness: 0.95 })
export const MAT_ROOF = new THREE.MeshStandardMaterial({ color: '#b7b2a8', roughness: 0.7 })
export const MAT_ROOF_DARK = new THREE.MeshStandardMaterial({ color: '#8b8f93', roughness: 0.8 })
export const MAT_GROUND = new THREE.MeshStandardMaterial({ color: '#ddd8d0', roughness: 1 })

// Under-construction dressing
export const MAT_SCREEN = new THREE.MeshStandardMaterial({
  color: '#16a8b8',
  roughness: 0.55,
  metalness: 0.0,
  transparent: true,
  opacity: 0.26,
  side: THREE.DoubleSide,
  depthWrite: false,
})
export const MAT_FORMWORK = new THREE.MeshStandardMaterial({
  color: '#c9a24a',
  roughness: 0.6,
  metalness: 0.2,
})
export const MAT_BEACON = new THREE.MeshStandardMaterial({
  color: '#ff4433',
  emissive: '#ff4433',
  emissiveIntensity: 2.4,
  roughness: 0.4,
})
export const MAT_CAB_GLASS = new THREE.MeshStandardMaterial({
  color: '#1a1f26',
  roughness: 0.1,
  metalness: 0.4,
  envMapIntensity: 1.6,
})

// ─── Curtain-wall façade material (procedural, per building) ─────────────────────
// A single envelope box gets a mullion grid, per-floor spandrel band and subtle
// per-pane tint drawn in the fragment shader — one draw call, reads as a real
// glazed façade instead of a flat blue box. Built per building so the horizontal
// division count matches that building's floor count.
export interface CurtainWallOpts {
  tint: THREE.ColorRepresentation
  floors: number
  vMullions: number
}

export function makeCurtainWall({ tint, floors, vMullions }: CurtainWallOpts): THREE.MeshStandardMaterial {
  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(tint),
    metalness: 0.2,
    roughness: 0.14,
    transparent: true,
    opacity: 0.92,
    envMapIntensity: 1.7,
    side: THREE.DoubleSide,
  })
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uFloors = { value: Math.max(1, floors) }
    shader.uniforms.uVMull = { value: Math.max(1, vMullions) }
    shader.vertexShader =
      'varying vec2 vCW;\n' +
      shader.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\n  vCW = uv;')
    shader.fragmentShader =
      'varying vec2 vCW;\nuniform float uFloors;\nuniform float uVMull;\n' +
      shader.fragmentShader.replace(
        '#include <color_fragment>',
        `#include <color_fragment>
        float fu = fract(vCW.y * uFloors);
        float vu = fract(vCW.x * uVMull);
        float mullH = smoothstep(0.0, 0.05, fu) * smoothstep(0.0, 0.05, 1.0 - fu);
        float mullV = smoothstep(0.0, 0.09, vu) * smoothstep(0.0, 0.09, 1.0 - vu);
        float glassMask = mullH * mullV;
        float spandrel = 1.0 - smoothstep(0.30, 0.38, fu);
        vec3 mullionColor = vec3(0.10, 0.11, 0.13);
        vec3 spandrelColor = vec3(0.40, 0.45, 0.50);
        float cell = floor(vCW.y * uFloors) * 31.0 + floor(vCW.x * uVMull) * 7.0;
        float vary = fract(sin(cell) * 43758.5453);
        vec3 pane = diffuseColor.rgb * (0.90 + vary * 0.18);
        vec3 col = mix(mullionColor, pane, glassMask);
        col = mix(col, spandrelColor, spandrel * glassMask * 0.5);
        diffuseColor.rgb = col;`,
      )
  }
  // identical source across buildings → safe to share the compiled program
  mat.customProgramCacheKey = () => 'curtain-wall-v1'
  return mat
}

// Fallback flat glass (used by reduced-motion / low tier where the shader is skipped)
export const MAT_GLASS = new THREE.MeshStandardMaterial({
  color: '#bcd4e8',
  metalness: 0.3,
  roughness: 0.12,
  transparent: true,
  opacity: 0.85,
  side: THREE.DoubleSide,
  envMapIntensity: 1.7,
})
export const MAT_GLASS_B = new THREE.MeshStandardMaterial({
  color: '#d2dee8',
  metalness: 0.25,
  roughness: 0.16,
  transparent: true,
  opacity: 0.82,
  side: THREE.DoubleSide,
  envMapIntensity: 1.5,
})

// ─── Crane Materials ────────────────────────────────────────────────────────────
export const MAT_CRANE_STEEL = new THREE.MeshStandardMaterial({
  color: '#dcd7cd',
  metalness: 0.6,
  roughness: 0.42,
  envMapIntensity: 1.2,
})
export const MAT_CRANE_ACCENT = new THREE.MeshStandardMaterial({
  color: '#16a8b8',
  metalness: 0.5,
  roughness: 0.38,
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
  color: '#e6a91f',
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
export const MAT_PAD = new THREE.MeshStandardMaterial({
  color: '#cbc4b6',
  roughness: 1,
  roughnessMap: concreteRough,
})

// ─── Blueprint (signature reveal) ────────────────────────────────────────────────
export const MAT_BLUEPRINT = new THREE.LineBasicMaterial({
  color: '#16a8b8',
  transparent: true,
  opacity: 0.9,
})

// ─── Buildings ────────────────────────────────────────────────────────────────
import type { BuildingConfig } from './types'

export interface BuildingEntry {
  id: string
  position: [number, number, number]
  config: BuildingConfig
  progressStart: number
  progressEnd: number
  /** façade tint; the curtain-wall material is built per building from this */
  glassTint: THREE.ColorRepresentation
}

export const BUILDINGS: BuildingEntry[] = [
  {
    id: 'towerA',
    position: [-6, 0, -6],
    config: { W: 10, D: 10, floors: 14, floorHeight: 2, hasCore: true, style: 'tower' },
    progressStart: 0.12,
    progressEnd: 0.85,
    glassTint: '#bcd4e8',
  },
  {
    id: 'towerB',
    position: [8, 0, -4],
    config: { W: 12, D: 10, floors: 8, floorHeight: 2.2, hasCore: true, style: 'midrise' },
    progressStart: 0.16,
    progressEnd: 0.78,
    glassTint: '#d2dee8',
  },
  {
    id: 'blockD',
    position: [-4.5, 0, 3.8],
    config: { W: 9, D: 8, floors: 6, floorHeight: 2.5, hasCore: false, style: 'midrise' },
    progressStart: 0.19,
    progressEnd: 0.7,
    glassTint: '#d2dee8',
  },
]

// Tallest building's full height — used to drive how high the crane mast climbs.
export const MAX_BUILD_HEIGHT = Math.max(...BUILDINGS.map((b) => b.config.floors * b.config.floorHeight))
