'use client'

import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { MotionValue } from 'framer-motion'
import * as THREE from 'three'
import {
  MAT_CRANE_STEEL,
  MAT_CRANE_ACCENT,
  MAT_CRANE_DARK,
  MAT_CABLE,
  MAT_STEEL,
  MAT_FOUNDATION,
  MAT_CAB_GLASS,
  MAT_BEACON,
} from './constants'
import { stageFactor, type StageBand } from './staging'

// One shared unit cube — every crane member is this geometry, scaled/rotated.
const GEO_UNIT = new THREE.BoxGeometry(1, 1, 1)

// ─── Mast lattice constants ─────────────────────────────────────────────────────
const SEG_H = 3
const MAST_W = 0.95
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
const CJIB_TIP = 8
const JIB_TOP_Y = 0.3
const JIB_BOT_Y = -0.25
const TROLLEY_X = 14
const HOOK_DROP = 11

const DEFAULT_BAND: StageBand = [0.14, 0.22, 0.54, 0.62]

const ZERO_MATRIX = new THREE.Matrix4().makeScale(0.0001, 0.0001, 0.0001)

interface TowerCraneProps {
  progress: MotionValue<number>
  position?: [number, number, number]
  baseYaw?: number
  detail?: boolean
  band?: StageBand
}

/** Precompute the static instance matrices for one full mast (all segments). */
function useMastMatrices(detail: boolean) {
  return useMemo(() => {
    const chords: THREE.Matrix4[] = []
    const rungs: THREE.Matrix4[] = []
    const diags: THREE.Matrix4[] = []
    const seg: number[] = [] // owning segment index, parallel to chords (4 per seg)
    const dummy = new THREE.Object3D()

    for (let s = 0; s < MAX_SEG; s++) {
      const y0 = s * SEG_H
      // 4 vertical chords
      for (const [cx, cz] of CORNERS) {
        dummy.position.set(cx, y0 + SEG_H / 2, cz)
        dummy.rotation.set(0, 0, 0)
        dummy.scale.set(0.14, SEG_H, 0.14)
        dummy.updateMatrix()
        chords.push(dummy.matrix.clone())
        seg.push(s)
      }
      // 4 top rungs forming the square
      const yTop = y0 + SEG_H
      const rungDefs: [number, number, number, [number, number, number]][] = [
        [0, yTop, H, [MAST_W, 0.09, 0.09]],
        [0, yTop, -H, [MAST_W, 0.09, 0.09]],
        [H, yTop, 0, [0.09, 0.09, MAST_W]],
        [-H, yTop, 0, [0.09, 0.09, MAST_W]],
      ]
      for (const [x, y, z, sc] of rungDefs) {
        dummy.position.set(x, y, z)
        dummy.rotation.set(0, 0, 0)
        dummy.scale.set(sc[0], sc[1], sc[2])
        dummy.updateMatrix()
        rungs.push(dummy.matrix.clone())
      }
      // 4 face diagonals (detail tier only)
      if (detail) {
        const diagDefs: [number, number, number, [number, number, number], [number, number, number]][] = [
          [0, y0 + SEG_H / 2, H, [0, 0, DIAG_ANGLE], [DIAG_LEN, 0.06, 0.06]],
          [0, y0 + SEG_H / 2, -H, [0, 0, -DIAG_ANGLE], [DIAG_LEN, 0.06, 0.06]],
          [H, y0 + SEG_H / 2, 0, [-DIAG_ANGLE, 0, 0], [0.06, 0.06, DIAG_LEN]],
          [-H, y0 + SEG_H / 2, 0, [DIAG_ANGLE, 0, 0], [0.06, 0.06, DIAG_LEN]],
        ]
        for (const [x, y, z, rot, sc] of diagDefs) {
          dummy.position.set(x, y, z)
          dummy.rotation.set(rot[0], rot[1], rot[2])
          dummy.scale.set(sc[0], sc[1], sc[2])
          dummy.updateMatrix()
          diags.push(dummy.matrix.clone())
        }
      }
    }
    return { chords, rungs, diags, seg }
  }, [detail])
}

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

// ─── A-frame apex + pendant tie bars + aviation beacon ──────────────────────────
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
      {/* aviation beacon at the apex (bloom picks this up) */}
      <mesh geometry={GEO_UNIT} material={MAT_BEACON} position={[0, 3.5, 0]} scale={[0.16, 0.16, 0.16]} />
    </group>
  )
}

// ─── Operator cab (dark box + glass face) ───────────────────────────────────────
function Cab() {
  return (
    <group position={[1.3, -0.55, 0]}>
      <mesh geometry={GEO_UNIT} material={MAT_CRANE_DARK} castShadow scale={[1.1, 1.15, 1.15]} />
      <mesh geometry={GEO_UNIT} material={MAT_CAB_GLASS} position={[0.58, 0.05, 0]} scale={[0.06, 0.85, 0.95]} />
    </group>
  )
}

// ─── Tower Crane (instanced mast; erects/dismantles within its phase) ───────────
export function TowerCrane({
  progress,
  position = [0, 0, 0],
  baseYaw = 0,
  detail = true,
  band = DEFAULT_BAND,
}: TowerCraneProps) {
  const rootRef = useRef<THREE.Group>(null)
  const slewRef = useRef<THREE.Group>(null)
  const beaconRef = useRef<THREE.Group>(null)
  const chordRef = useRef<THREE.InstancedMesh>(null)
  const rungRef = useRef<THREE.InstancedMesh>(null)
  const diagRef = useRef<THREE.InstancedMesh>(null)

  const { chords, rungs, diags, seg } = useMastMatrices(detail)

  useFrame((state) => {
    const p = progress.get()
    const f = stageFactor(p, band[0], band[1], band[2], band[3])

    if (rootRef.current) rootRef.current.visible = f > 0.001
    if (f <= 0.001) return

    const visSeg = Math.max(0, Math.min(MAX_SEG, Math.round(f * MAX_SEG)))

    // Reveal/hide instances per segment by zeroing hidden ones.
    if (chordRef.current) {
      for (let i = 0; i < chords.length; i++) {
        chordRef.current.setMatrixAt(i, seg[i] < visSeg ? chords[i] : ZERO_MATRIX)
      }
      chordRef.current.instanceMatrix.needsUpdate = true
    }
    if (rungRef.current) {
      for (let i = 0; i < rungs.length; i++) {
        chordSegHide(rungRef.current, i, Math.floor(i / 4) < visSeg ? rungs[i] : ZERO_MATRIX)
      }
      rungRef.current.instanceMatrix.needsUpdate = true
    }
    if (diagRef.current && diags.length) {
      for (let i = 0; i < diags.length; i++) {
        chordSegHide(diagRef.current, i, Math.floor(i / 4) < visSeg ? diags[i] : ZERO_MATRIX)
      }
      diagRef.current.instanceMatrix.needsUpdate = true
    }

    if (slewRef.current) {
      slewRef.current.visible = visSeg > 0
      slewRef.current.position.y = visSeg * SEG_H
      // gentle idle slew so the crane feels alive without dominating
      slewRef.current.rotation.y = baseYaw + Math.sin(state.clock.elapsedTime * 0.12) * 0.05
    }
    // beacon blink
    if (beaconRef.current) {
      const blink = 0.6 + 0.4 * Math.sin(state.clock.elapsedTime * 3.0)
      beaconRef.current.scale.setScalar(0.8 + blink * 0.5)
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

      {/* mast — three instanced meshes (chords / rungs / diagonals) */}
      <instancedMesh
        ref={chordRef}
        args={[GEO_UNIT, MAT_CRANE_STEEL, chords.length]}
        castShadow
        frustumCulled={false}
      />
      <instancedMesh ref={rungRef} args={[GEO_UNIT, MAT_CRANE_STEEL, rungs.length]} frustumCulled={false} />
      {diags.length > 0 && (
        <instancedMesh ref={diagRef} args={[GEO_UNIT, MAT_CRANE_STEEL, diags.length]} frustumCulled={false} />
      )}

      {/* slewing assembly (rides the mast top, gentle idle rotation) */}
      <group ref={slewRef} rotation={[0, baseYaw, 0]}>
        <mesh geometry={GEO_UNIT} material={MAT_CRANE_STEEL} castShadow position={[0, -1, 0]} scale={[1.5, 1.4, 1.5]} />
        <Cab />
        <group ref={beaconRef}>
          <AFrame />
        </group>
        <Jib />
        <CounterJib />

        {/* trolley + hoist + hook block + slung steel load */}
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
        {/* hook block */}
        <mesh
          geometry={GEO_UNIT}
          material={MAT_CRANE_DARK}
          castShadow
          position={[TROLLEY_X, JIB_BOT_Y - HOOK_DROP, 0]}
          scale={[0.4, 0.55, 0.4]}
        />
        <mesh
          geometry={GEO_UNIT}
          material={MAT_CRANE_ACCENT}
          position={[TROLLEY_X, JIB_BOT_Y - HOOK_DROP - 0.28, 0]}
          scale={[0.28, 0.14, 0.28]}
        />
        {/* slung steel load */}
        <mesh
          geometry={GEO_UNIT}
          material={MAT_STEEL}
          castShadow
          position={[TROLLEY_X, JIB_BOT_Y - HOOK_DROP - 0.62, 0]}
          scale={[3.6, 0.4, 0.5]}
        />
      </group>
    </group>
  )
}

// setMatrixAt helper kept terse to avoid repeating the ref guard inline
function chordSegHide(im: THREE.InstancedMesh, i: number, m: THREE.Matrix4) {
  im.setMatrixAt(i, m)
}
