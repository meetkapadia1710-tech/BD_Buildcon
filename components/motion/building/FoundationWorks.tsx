'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MotionValue } from 'framer-motion'
import * as THREE from 'three'
import { BUILDINGS, GEO_CYL, MAT_PAD, MAT_PILE, MAT_CORE, MAT_REBAR, MAT_SLAB, type BuildingEntry } from './constants'
import { stageFactor, type StageBand } from './staging'

// Shared unit box — every rectangular footing/beam part is this, scaled.
const BOX = new THREE.BoxGeometry(1, 1, 1)

/**
 * Staged sub-group: reveals its children by scaling vertically (Y) about grade
 * (y=0). Below-grade parts (pad, piles, caps) grow downward as if excavated/cast;
 * above-grade parts (rebar starters) grow upward — all staying put horizontally,
 * so footings appear exactly on their column positions rather than sliding in.
 */
function Staged({
  progress,
  band,
  children,
}: {
  progress: MotionValue<number>
  band: StageBand
  children: React.ReactNode
}) {
  const ref = useRef<THREE.Group>(null)
  useFrame(() => {
    const f = stageFactor(progress.get(), band[0], band[1], band[2], band[3])
    const g = ref.current
    if (!g) return
    g.visible = f > 0.001
    g.scale.set(1, Math.max(0.001, f), 1)
  })
  return <group ref={ref}>{children}</group>
}

const band = (s: number, a: number, b: number, c: number, d: number): StageBand => [s + a, s + b, s + c, s + d]

/** The 8 perimeter column positions of a building (matches SkeletonFloor). */
function columnPositions(W: number, D: number): [number, number][] {
  const hw = W / 2,
    hd = D / 2
  return [
    [-hw, -hd],
    [0, -hd],
    [hw, -hd],
    [-hw, 0],
    [hw, 0],
    [-hw, hd],
    [0, hd],
    [hw, hd],
  ]
}

/** Plinth-beam runs: 3 along X (at z = -hd, 0, hd) and 3 along Z (at x = -hw, 0, hw). */
function plinthBeams(W: number, D: number) {
  const hw = W / 2,
    hd = D / 2
  const beams: { pos: [number, number, number]; scale: [number, number, number] }[] = []
  for (const z of [-hd, 0, hd]) beams.push({ pos: [0, -0.1, z], scale: [W, 0.3, 0.4] })
  for (const x of [-hw, 0, hw]) beams.push({ pos: [x, -0.1, 0], scale: [0.4, 0.3, D] })
  return beams
}

// ─── One tower's foundation, on its own footprint + column grid ─────────────────
function BuildingFoundation({ progress, building }: { progress: MotionValue<number>; building: BuildingEntry }) {
  const s = building.progressStart
  const [bx, , bz] = building.position
  const { W, D } = building.config
  const cols = columnPositions(W, D)
  const beams = plinthBeams(W, D)

  // Sequenced to lead into this tower's rise (which starts at s):
  const padBand = band(s, -0.12, -0.1, -0.02, 0.01) // excavate the footprint
  const pileBand = band(s, -0.1, -0.08, 0.0, 0.03) // bore piles at each column
  const footBand = band(s, -0.08, -0.06, 0.04, 0.08) // pile caps / RCC footings
  const starterBand = band(s, -0.07, -0.05, 0.06, 0.1) // rebar starters (columns grow from these)
  const plinthBand = band(s, -0.05, -0.03, 0.05, 0.09) // plinth beams tie the footings

  return (
    <group position={[bx, 0, bz]}>
      {/* excavated / levelled footprint pad */}
      <Staged progress={progress} band={padBand}>
        <mesh
          geometry={BOX}
          material={MAT_PAD}
          receiveShadow
          position={[0, -0.32, 0]}
          scale={[W + 1.6, 0.5, D + 1.6]}
        />
      </Staged>

      {/* bored piles at every column */}
      <Staged progress={progress} band={pileBand}>
        {cols.map(([x, z], i) => (
          <mesh key={i} geometry={GEO_CYL} material={MAT_PILE} position={[x, -0.85, z]} scale={[0.5, 1.4, 0.5]} />
        ))}
      </Staged>

      {/* pile caps / RCC footings */}
      <Staged progress={progress} band={footBand}>
        {cols.map(([x, z], i) => (
          <mesh
            key={i}
            geometry={BOX}
            material={MAT_CORE}
            castShadow
            position={[x, -0.05, z]}
            scale={[1.5, 0.6, 1.5]}
          />
        ))}
      </Staged>

      {/* column starter bars — a tidy 4-bar cage the columns rise out of.
          Half the old height + thinner, so footings don't read as fat sticks. */}
      <Staged progress={progress} band={starterBand}>
        {cols.map(([x, z], i) => (
          <group key={i}>
            {[
              [0.14, 0.14],
              [-0.14, 0.14],
              [0.14, -0.14],
              [-0.14, -0.14],
            ].map(([ox, oz], j) => (
              <mesh
                key={j}
                geometry={BOX}
                material={MAT_REBAR}
                castShadow
                position={[x + ox, 0.55, z + oz]}
                scale={[0.05, 1.0, 0.05]}
              />
            ))}
          </group>
        ))}
      </Staged>

      {/* plinth beams */}
      <Staged progress={progress} band={plinthBand}>
        {beams.map((b, i) => (
          <mesh key={i} geometry={BOX} material={MAT_SLAB} position={b.pos} scale={b.scale} />
        ))}
      </Staged>
    </group>
  )
}

export function FoundationWorks({ progress }: { progress: MotionValue<number> }) {
  return (
    <group>
      {BUILDINGS.map((b) => (
        <BuildingFoundation key={b.id} progress={progress} building={b} />
      ))}
    </group>
  )
}
