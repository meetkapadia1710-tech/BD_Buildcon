'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MotionValue } from 'framer-motion'
import * as THREE from 'three'
import {
  GEO_CYL,
  GEO_CONE,
  MAT_MACHINE_YELLOW,
  MAT_MACHINE_DARK,
  MAT_TYRE,
  MAT_DRUM,
  MAT_TRUCK_CAB,
  MAT_TRUCK_BODY,
  MAT_SAND,
  MAT_GRAVEL,
  MAT_REBAR,
  MAT_PIPE,
} from './constants'
import { stageFactor, type StageBand } from './staging'

// Shared unit box — every rectangular machine part is this, scaled.
const BOX = new THREE.BoxGeometry(1, 1, 1)

interface MachineProps {
  progress: MotionValue<number>
  band: StageBand
  position: [number, number, number]
  rotationY?: number
  driveOffset?: number
}

// ─── Wheels helper (axles along X) ──────────────────────────────────────────────
function Wheels({
  zs,
  halfW,
  y = 0.45,
  r = 0.46,
  w = 0.34,
}: {
  zs: number[]
  halfW: number
  y?: number
  r?: number
  w?: number
}) {
  return (
    <>
      {zs.map((z, i) =>
        [-halfW, halfW].map((x, j) => (
          <mesh
            key={`${i}-${j}`}
            geometry={GEO_CYL}
            material={MAT_TYRE}
            rotation={[0, 0, Math.PI / 2]}
            position={[x, y, z]}
            scale={[r * 2, w, r * 2]}
          />
        )),
      )}
    </>
  )
}

// ─── JCB / tracked excavator (foundation: digs) ─────────────────────────────────
function Excavator({ progress, band, position, rotationY = 0 }: MachineProps) {
  const ref = useRef<THREE.Group>(null)
  const houseRef = useRef<THREE.Group>(null)
  const armRef = useRef<THREE.Group>(null)
  useFrame((s) => {
    const f = stageFactor(progress.get(), band[0], band[1], band[2], band[3])
    const g = ref.current
    if (!g) return
    g.visible = f > 0.001
    g.scale.setScalar(Math.max(0.001, f))
    const t = s.clock.elapsedTime
    if (houseRef.current) houseRef.current.rotation.y = Math.sin(t * 0.3) * 0.4
    if (armRef.current) armRef.current.rotation.x = -0.5 + Math.sin(t * 1.1) * 0.22
  })
  return (
    <group ref={ref} position={position} rotation={[0, rotationY, 0]} visible={false}>
      {/* tracks */}
      <mesh
        geometry={BOX}
        material={MAT_MACHINE_DARK}
        castShadow
        position={[-0.62, 0.32, 0]}
        scale={[0.5, 0.55, 2.8]}
      />
      <mesh geometry={BOX} material={MAT_MACHINE_DARK} castShadow position={[0.62, 0.32, 0]} scale={[0.5, 0.55, 2.8]} />
      {/* rotating upper house */}
      <group ref={houseRef} position={[0, 0.78, 0]}>
        <mesh
          geometry={BOX}
          material={MAT_MACHINE_YELLOW}
          castShadow
          position={[0, 0.4, -0.3]}
          scale={[1.7, 0.9, 1.9]}
        />
        <mesh
          geometry={BOX}
          material={MAT_MACHINE_DARK}
          castShadow
          position={[-0.45, 0.55, 0.55]}
          scale={[0.8, 0.95, 0.9]}
        />
        <mesh geometry={BOX} material={MAT_MACHINE_YELLOW} position={[0, 0.3, -1.25]} scale={[1.5, 0.7, 0.5]} />
        {/* boom + dipper + bucket */}
        <group ref={armRef} position={[0.35, 0.2, 0.9]}>
          <mesh
            geometry={BOX}
            material={MAT_MACHINE_YELLOW}
            castShadow
            position={[0, 0.5, 0.7]}
            rotation={[0.6, 0, 0]}
            scale={[0.32, 0.32, 2.0]}
          />
          <mesh
            geometry={BOX}
            material={MAT_MACHINE_YELLOW}
            castShadow
            position={[0, 1.0, 1.7]}
            rotation={[-0.5, 0, 0]}
            scale={[0.26, 0.26, 1.5]}
          />
          <mesh
            geometry={BOX}
            material={MAT_MACHINE_DARK}
            castShadow
            position={[0, 0.5, 2.2]}
            scale={[0.5, 0.5, 0.5]}
          />
        </group>
      </group>
    </group>
  )
}

// ─── Dumper / tipper truck (foundation: hauls sand) ─────────────────────────────
function DumperTruck({ progress, band, position, driveOffset = 26 }: MachineProps) {
  const ref = useRef<THREE.Group>(null)
  useFrame(() => {
    const f = stageFactor(progress.get(), band[0], band[1], band[2], band[3])
    const g = ref.current
    if (!g) return
    g.visible = f > 0.001
    g.position.x = position[0] + (1 - f) * driveOffset
  })
  return (
    <group ref={ref} position={position} visible={false}>
      <mesh geometry={BOX} material={MAT_MACHINE_DARK} position={[0, 0.55, 0]} scale={[1.7, 0.32, 4.4]} />
      <mesh geometry={BOX} material={MAT_TRUCK_CAB} castShadow position={[0, 1.2, 1.5]} scale={[1.6, 1.2, 1.2]} />
      <mesh geometry={BOX} material={MAT_MACHINE_DARK} position={[0, 1.38, 2.12]} scale={[1.45, 0.6, 0.08]} />
      <mesh geometry={BOX} material={MAT_TRUCK_BODY} castShadow position={[0, 1.35, -0.7]} scale={[1.7, 1.0, 2.6]} />
      <mesh geometry={BOX} material={MAT_SAND} position={[0, 1.95, -0.7]} scale={[1.5, 0.45, 2.3]} />
      <Wheels zs={[1.4, -0.4, -1.5]} halfW={0.92} />
    </group>
  )
}

// ─── Transit mixer (structure: drum turns) ──────────────────────────────────────
function MixerTruck({ progress, band, position, driveOffset = -26 }: MachineProps) {
  const ref = useRef<THREE.Group>(null)
  const drumRef = useRef<THREE.Mesh>(null)
  useFrame((s) => {
    const f = stageFactor(progress.get(), band[0], band[1], band[2], band[3])
    const g = ref.current
    if (!g) return
    g.visible = f > 0.001
    g.position.x = position[0] + (1 - f) * driveOffset
    if (drumRef.current && f > 0.01) drumRef.current.rotation.y = s.clock.elapsedTime * 1.4
  })
  return (
    <group ref={ref} position={position} visible={false}>
      <mesh geometry={BOX} material={MAT_MACHINE_DARK} position={[0, 0.55, 0]} scale={[1.6, 0.32, 5.0]} />
      <mesh geometry={BOX} material={MAT_TRUCK_CAB} castShadow position={[0, 1.2, 1.9]} scale={[1.55, 1.2, 1.2]} />
      <mesh geometry={BOX} material={MAT_MACHINE_DARK} position={[0, 1.38, 2.52]} scale={[1.4, 0.6, 0.08]} />
      {/* tilted mixing drum, spinning on its long axis */}
      <group position={[0, 1.7, -0.7]} rotation={[Math.PI / 2 - 0.22, 0, 0]}>
        <mesh ref={drumRef} geometry={GEO_CYL} material={MAT_DRUM} castShadow scale={[1.5, 2.8, 1.5]} />
      </group>
      <Wheels zs={[1.8, -0.2, -1.1, -2.0]} halfW={0.9} />
    </group>
  )
}

// ─── Concrete pump truck (structure: boom folded, outriggers down) ──────────────
function PumpTruck({ progress, band, position, driveOffset = 26 }: MachineProps) {
  const ref = useRef<THREE.Group>(null)
  useFrame(() => {
    const f = stageFactor(progress.get(), band[0], band[1], band[2], band[3])
    const g = ref.current
    if (!g) return
    g.visible = f > 0.001
    g.position.x = position[0] + (1 - f) * driveOffset
  })
  return (
    <group ref={ref} position={position} visible={false}>
      <mesh geometry={BOX} material={MAT_MACHINE_DARK} position={[0, 0.55, 0]} scale={[1.6, 0.32, 5.2]} />
      <mesh geometry={BOX} material={MAT_TRUCK_CAB} castShadow position={[0, 1.2, 2.0]} scale={[1.55, 1.2, 1.2]} />
      <mesh geometry={BOX} material={MAT_MACHINE_DARK} position={[0, 1.38, 2.62]} scale={[1.4, 0.6, 0.08]} />
      <mesh geometry={BOX} material={MAT_MACHINE_YELLOW} castShadow position={[0, 1.0, -2.2]} scale={[1.4, 0.9, 0.9]} />
      {/* folded boom */}
      <mesh geometry={BOX} material={MAT_MACHINE_YELLOW} castShadow position={[0, 2.0, -0.2]} scale={[0.4, 0.4, 3.6]} />
      <mesh
        geometry={BOX}
        material={MAT_MACHINE_YELLOW}
        castShadow
        position={[0, 2.5, 0.5]}
        rotation={[0.25, 0, 0]}
        scale={[0.34, 0.34, 2.2]}
      />
      {/* outriggers */}
      <mesh
        geometry={BOX}
        material={MAT_MACHINE_DARK}
        position={[1.2, 0.4, -1.8]}
        rotation={[0, 0, -0.5]}
        scale={[1.0, 0.18, 0.4]}
      />
      <mesh
        geometry={BOX}
        material={MAT_MACHINE_DARK}
        position={[-1.2, 0.4, -1.8]}
        rotation={[0, 0, 0.5]}
        scale={[1.0, 0.18, 0.4]}
      />
      <Wheels zs={[1.9, -0.4, -1.3, -2.2]} halfW={0.9} />
    </group>
  )
}

// ─── Material stockpiles: sand + aggregate (foundation → structure) ─────────────
function MaterialPiles({ progress, band, position }: MachineProps) {
  const ref = useRef<THREE.Group>(null)
  useFrame(() => {
    const f = stageFactor(progress.get(), band[0], band[1], band[2], band[3])
    const g = ref.current
    if (!g) return
    g.visible = f > 0.001
    g.scale.setScalar(Math.max(0.001, f))
  })
  return (
    <group ref={ref} position={position} visible={false}>
      <mesh geometry={GEO_CONE} material={MAT_SAND} castShadow position={[0, 0.7, 0]} scale={[2.2, 1.4, 2.2]} />
      <mesh geometry={GEO_CONE} material={MAT_GRAVEL} castShadow position={[3.4, 0.55, 0.6]} scale={[1.8, 1.1, 1.8]} />
    </group>
  )
}

// ─── Rebar bundles (structure) ──────────────────────────────────────────────────
function RebarStack({ progress, band, position, rotationY = 0 }: MachineProps) {
  const ref = useRef<THREE.Group>(null)
  useFrame(() => {
    const f = stageFactor(progress.get(), band[0], band[1], band[2], band[3])
    const g = ref.current
    if (!g) return
    g.visible = f > 0.001
    g.scale.setScalar(Math.max(0.001, f))
  })
  const bars: [number, number][] = [
    [-0.3, 0.1],
    [-0.1, 0.1],
    [0.1, 0.1],
    [0.3, 0.1],
    [-0.2, 0.28],
    [0.0, 0.28],
    [0.2, 0.28],
    [-0.1, 0.46],
    [0.1, 0.46],
  ]
  return (
    <group ref={ref} position={position} rotation={[0, rotationY, 0]} visible={false}>
      {bars.map(([x, y], i) => (
        <mesh key={i} geometry={BOX} material={MAT_REBAR} castShadow position={[x, y, 0]} scale={[0.12, 0.12, 5]} />
      ))}
    </group>
  )
}

// ─── Pipe stockpile (services) ──────────────────────────────────────────────────
function PipeStack({ progress, band, position, rotationY = 0 }: MachineProps) {
  const ref = useRef<THREE.Group>(null)
  useFrame(() => {
    const f = stageFactor(progress.get(), band[0], band[1], band[2], band[3])
    const g = ref.current
    if (!g) return
    g.visible = f > 0.001
    g.scale.setScalar(Math.max(0.001, f))
  })
  const pipes: [number, number][] = [
    [-1.2, 0.4],
    [-0.4, 0.4],
    [0.4, 0.4],
    [1.2, 0.4],
    [-0.8, 1.05],
    [0.0, 1.05],
    [0.8, 1.05],
  ]
  return (
    <group ref={ref} position={position} rotation={[0, rotationY, 0]} visible={false}>
      {pipes.map(([z, y], i) => (
        <mesh
          key={i}
          geometry={GEO_CYL}
          material={MAT_PIPE}
          castShadow
          rotation={[0, 0, Math.PI / 2]}
          position={[0, y, z]}
          scale={[0.8, 3.2, 0.8]}
        />
      ))}
    </group>
  )
}

// ─── Placement: each cluster gated to the phase it belongs to ───────────────────
export function GroundMachines({ progress, full = true }: { progress: MotionValue<number>; full?: boolean }) {
  return (
    // dropped to the site grade so wheels/tracks rest on the ground, not the pad
    <group position={[0, -0.46, 0]}>
      {/* Foundation — excavator working the first tower's footprint (always shown) */}
      <Excavator progress={progress} band={[0.0, 0.05, 0.16, 0.22]} position={[0.5, 0, -6]} rotationY={-1.6} />
      <MaterialPiles progress={progress} band={[0.02, 0.07, 0.42, 0.5]} position={[14, 0, 12]} />

      {/* Structure — the mixer keys the concrete phase (always shown) */}
      <MixerTruck progress={progress} band={[0.2, 0.26, 0.44, 0.52]} position={[-3, 0, 12]} driveOffset={-24} />

      {/* Full-fleet extras (trimmed on the low tier as a perf guardrail) */}
      {full && (
        <>
          <DumperTruck progress={progress} band={[0.01, 0.06, 0.15, 0.22]} position={[17, 0, 6]} driveOffset={24} />
          <RebarStack progress={progress} band={[0.18, 0.24, 0.46, 0.54]} position={[-12, 0, 8]} rotationY={0.3} />
          <PumpTruck progress={progress} band={[0.22, 0.28, 0.46, 0.54]} position={[5, 0, 12]} driveOffset={24} />
          <PipeStack progress={progress} band={[0.6, 0.66, 0.82, 0.9]} position={[-14, 0, -3]} rotationY={0.2} />
        </>
      )}
    </group>
  )
}
