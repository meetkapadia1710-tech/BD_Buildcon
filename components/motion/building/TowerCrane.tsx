'use client'

import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MotionValue } from 'framer-motion'
import * as THREE from 'three'
import { MAT_CRANE_STEEL, MAT_CRANE_ACCENT, MAT_CRANE_DARK, MAT_CABLE, MAT_STEEL, MAT_FOUNDATION } from './constants'
import { stageFactor, type StageBand } from './staging'

// One shared unit cube — every crane member is this geometry, scaled/rotated.
const GEO_UNIT = new THREE.BoxGeometry(1, 1, 1)

// ─── Mast lattice constants ─────────────────────────────────────────────────────
const SEG_H = 3 // segment height
const MAST_W = 0.9 // square lattice side
const H = MAST_W / 2
const MAX_SEG = 11 // → max mast height 33, clears the tallest building (28)
const DIAG_LEN = Math.sqrt(MAST_W * MAST_W + SEG_H * SEG_H)
const DIAG_ANGLE = Math.atan2(SEG_H, MAST_W)
const CORNERS: [number, number][] = [
  [H, H],
  [H, -H],
  [-H, H],
  [-H, -H],
]

// ─── Jib geometry constants ─────────────────────────────────────────────────────
const JIB_X0 = 1.4
const JIB_TIP = 22
const CJIB_TIP = 8 // counter-jib length
const JIB_TOP_Y = 0.3
const JIB_BOT_Y = -0.25
const TROLLEY_X = 14 // fixed working position over the structure
const HOOK_DROP = 11 // fixed hoist length while lifting

// When the crane is present on site: erects over [appear,full], holds, dismantles
// over [fadeStart,gone]. Defaults to the structural phase (+ a little into envelope).
const DEFAULT_BAND: StageBand = [0.14, 0.22, 0.54, 0.62]

interface TowerCraneProps {
  progress: MotionValue<number>
  position?: [number, number, number]
  baseYaw?: number
  detail?: boolean
  band?: StageBand
}

// ─── A single lattice mast segment (chords + top rungs + optional diagonals) ────
const MastSegment = React.memo(function MastSegment({ detail }: { detail: boolean }) {
  return (
    <group>
      {CORNERS.map(([cx, cz], i) => (
        <mesh
          key={`ch${i}`}
          geometry={GEO_UNIT}
          material={MAT_CRANE_STEEL}
          castShadow
          position={[cx, SEG_H / 2, cz]}
          scale={[0.1, SEG_H, 0.1]}
        />
      ))}
      <mesh geometry={GEO_UNIT} material={MAT_CRANE_STEEL} position={[0, SEG_H, H]} scale={[MAST_W, 0.08, 0.08]} />
      <mesh geometry={GEO_UNIT} material={MAT_CRANE_STEEL} position={[0, SEG_H, -H]} scale={[MAST_W, 0.08, 0.08]} />
      <mesh geometry={GEO_UNIT} material={MAT_CRANE_STEEL} position={[H, SEG_H, 0]} scale={[0.08, 0.08, MAST_W]} />
      <mesh geometry={GEO_UNIT} material={MAT_CRANE_STEEL} position={[-H, SEG_H, 0]} scale={[0.08, 0.08, MAST_W]} />
      {detail && (
        <>
          <mesh
            geometry={GEO_UNIT}
            material={MAT_CRANE_STEEL}
            position={[0, SEG_H / 2, H]}
            rotation={[0, 0, DIAG_ANGLE]}
            scale={[DIAG_LEN, 0.06, 0.06]}
          />
          <mesh
            geometry={GEO_UNIT}
            material={MAT_CRANE_STEEL}
            position={[0, SEG_H / 2, -H]}
            rotation={[0, 0, -DIAG_ANGLE]}
            scale={[DIAG_LEN, 0.06, 0.06]}
          />
          <mesh
            geometry={GEO_UNIT}
            material={MAT_CRANE_STEEL}
            position={[H, SEG_H / 2, 0]}
            rotation={[-DIAG_ANGLE, 0, 0]}
            scale={[0.06, 0.06, DIAG_LEN]}
          />
          <mesh
            geometry={GEO_UNIT}
            material={MAT_CRANE_STEEL}
            position={[-H, SEG_H / 2, 0]}
            rotation={[DIAG_ANGLE, 0, 0]}
            scale={[0.06, 0.06, DIAG_LEN]}
          />
        </>
      )}
    </group>
  )
})

// ─── Jib truss (working arm, +X) ────────────────────────────────────────────────
function Jib() {
  const jl = JIB_TIP - JIB_X0
  const jcx = (JIB_TIP + JIB_X0) / 2
  return (
    <group>
      <mesh
        geometry={GEO_UNIT}
        material={MAT_CRANE_ACCENT}
        castShadow
        position={[jcx, JIB_TOP_Y, 0]}
        scale={[jl, 0.16, 0.18]}
      />
      <mesh
        geometry={GEO_UNIT}
        material={MAT_CRANE_ACCENT}
        position={[(18 + JIB_X0) / 2, JIB_BOT_Y, 0]}
        scale={[18 - JIB_X0, 0.12, 0.14]}
      />
      {[4, 8, 12, 16, 20].map((x) => (
        <mesh
          key={`v${x}`}
          geometry={GEO_UNIT}
          material={MAT_CRANE_ACCENT}
          position={[x, 0.02, 0]}
          scale={[0.08, 0.62, 0.1]}
        />
      ))}
      {[5, 9, 13].map((x) => (
        <mesh
          key={`jd${x}`}
          geometry={GEO_UNIT}
          material={MAT_CRANE_ACCENT}
          position={[x, 0.02, 0]}
          rotation={[0, 0, 0.62]}
          scale={[2.6, 0.06, 0.06]}
        />
      ))}
      <mesh geometry={GEO_UNIT} material={MAT_CRANE_DARK} position={[JIB_TIP, 0.05, 0]} scale={[0.5, 0.5, 0.4]} />
    </group>
  )
}

// ─── Counter-jib + counterweight (-X) ───────────────────────────────────────────
function CounterJib() {
  return (
    <group>
      <mesh
        geometry={GEO_UNIT}
        material={MAT_CRANE_STEEL}
        castShadow
        position={[-(1.2 + CJIB_TIP) / 2, JIB_TOP_Y, 0]}
        scale={[CJIB_TIP - 1.2, 0.16, 0.26]}
      />
      <mesh
        geometry={GEO_UNIT}
        material={MAT_CRANE_DARK}
        castShadow
        position={[-CJIB_TIP, -0.1, 0]}
        scale={[2.2, 1.8, 2.2]}
      />
    </group>
  )
}

// ─── A-frame apex + pendant tie bars ────────────────────────────────────────────
function AFrame() {
  return (
    <group>
      <mesh geometry={GEO_UNIT} material={MAT_CRANE_STEEL} position={[0, 1.7, 0]} scale={[0.14, 3.4, 0.14]} />
      <mesh
        geometry={GEO_UNIT}
        material={MAT_CABLE}
        position={[6, 1.75, 0]}
        rotation={[0, 0, Math.atan2(JIB_TOP_Y - 3.2, 12)]}
        scale={[Math.hypot(12, 3.2 - JIB_TOP_Y), 0.05, 0.05]}
      />
      <mesh
        geometry={GEO_UNIT}
        material={MAT_CABLE}
        position={[-3.5, 1.75, 0]}
        rotation={[0, 0, Math.atan2(JIB_TOP_Y - 3.2, -7)]}
        scale={[Math.hypot(7, 3.2 - JIB_TOP_Y), 0.05, 0.05]}
      />
    </group>
  )
}

// ─── Tower Crane (stationary; erects/dismantles within its phase) ───────────────
export function TowerCrane({
  progress,
  position = [0, 0, 0],
  baseYaw = 0,
  detail = true,
  band = DEFAULT_BAND,
}: TowerCraneProps) {
  const rootRef = useRef<THREE.Group>(null)
  const segRefs = useRef<(THREE.Group | null)[]>([])
  const slewRef = useRef<THREE.Group>(null)

  useFrame(() => {
    const p = progress.get()
    const f = stageFactor(p, band[0], band[1], band[2], band[3])

    if (rootRef.current) rootRef.current.visible = f > 0.001
    if (f <= 0.001) return

    // Erect bottom-up with the stage factor; dismantle as it fades out.
    const visSeg = Math.max(0, Math.min(MAX_SEG, Math.round(f * MAX_SEG)))
    for (let i = 0; i < MAX_SEG; i++) {
      const g = segRefs.current[i]
      if (g) g.visible = i < visSeg
    }
    if (slewRef.current) {
      slewRef.current.visible = visSeg > 0
      slewRef.current.position.y = visSeg * SEG_H
      slewRef.current.rotation.y = baseYaw // stationary
    }
  })

  return (
    <group ref={rootRef} position={position} visible={false}>
      {/* concrete base pad */}
      <mesh
        geometry={GEO_UNIT}
        material={MAT_FOUNDATION}
        receiveShadow
        position={[0, -0.2, 0]}
        scale={[2.6, 0.6, 2.6]}
      />

      {/* mast — stacked lattice segments, visibility-toggled to erect/dismantle */}
      {Array.from({ length: MAX_SEG }).map((_, i) => (
        <group
          key={i}
          ref={(el) => {
            segRefs.current[i] = el
          }}
          position={[0, i * SEG_H, 0]}
          visible={false}
        >
          <MastSegment detail={detail} />
        </group>
      ))}

      {/* slewing assembly (positioned at mast top each frame, fixed heading) */}
      <group ref={slewRef} rotation={[0, baseYaw, 0]}>
        <mesh geometry={GEO_UNIT} material={MAT_CRANE_STEEL} castShadow position={[0, -1, 0]} scale={[1.5, 1.4, 1.5]} />
        <mesh geometry={GEO_UNIT} material={MAT_CRANE_DARK} position={[1.0, -0.5, 1.0]} scale={[1, 1.1, 1.1]} />

        <AFrame />
        <Jib />
        <CounterJib />

        {/* trolley + hoist + hook + slung steel load, parked over the structure */}
        <mesh
          geometry={GEO_UNIT}
          material={MAT_CRANE_DARK}
          position={[TROLLEY_X, JIB_BOT_Y - 0.05, 0]}
          scale={[0.7, 0.4, 0.9]}
        />
        <mesh
          geometry={GEO_UNIT}
          material={MAT_CABLE}
          position={[TROLLEY_X, JIB_BOT_Y - HOOK_DROP / 2, 0]}
          scale={[0.05, HOOK_DROP, 0.05]}
        />
        <mesh
          geometry={GEO_UNIT}
          material={MAT_CRANE_STEEL}
          castShadow
          position={[TROLLEY_X, JIB_BOT_Y - HOOK_DROP, 0]}
          scale={[0.35, 0.5, 0.35]}
        />
        <mesh
          geometry={GEO_UNIT}
          material={MAT_STEEL}
          castShadow
          position={[TROLLEY_X, JIB_BOT_Y - HOOK_DROP - 0.6, 0]}
          scale={[3.6, 0.4, 0.5]}
        />
      </group>
    </group>
  )
}
