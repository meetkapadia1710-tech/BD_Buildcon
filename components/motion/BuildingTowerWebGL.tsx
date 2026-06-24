'use client'

import React, { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMotionValue, MotionValue } from 'framer-motion'
import * as THREE from 'three'

// ─── Shared Global Geometries ──────────────────────────────────────────────────
const GEO_COLUMN = new THREE.BoxGeometry(0.14, 1, 0.14)
const GEO_BEAM = new THREE.BoxGeometry(1, 0.12, 0.12)
const GEO_SLAB = new THREE.BoxGeometry(1, 0.1, 1)
const GEO_SPIRE = new THREE.CylinderGeometry(0.05, 0.05, 4, 6)
const GEO_FLOOR = new THREE.PlaneGeometry(200, 200)

// ─── Materials ─────────────────────────────────────────────────────────────────
const MAT_FOUNDATION = new THREE.MeshStandardMaterial({ color: '#c8c8c8', roughness: 0.9 })
const MAT_CORE = new THREE.MeshStandardMaterial({ color: '#b8b8b8', roughness: 0.85 })
const MAT_STEEL = new THREE.MeshStandardMaterial({ color: '#3a3a3a', metalness: 0.95, roughness: 0.25 })
const MAT_GLASS = new THREE.MeshPhysicalMaterial({
  color: '#cce4f7',
  metalness: 0.6,
  roughness: 0.05,
  transmission: 0.4,
  transparent: true,
  side: THREE.DoubleSide,
})
const MAT_GLASS_B = new THREE.MeshPhysicalMaterial({
  color: '#e0eaf2',
  metalness: 0.4,
  roughness: 0.1,
  transmission: 0.3,
  transparent: true,
  side: THREE.DoubleSide,
})
const MAT_SPANDREL = new THREE.MeshStandardMaterial({ color: '#8899aa', roughness: 0.3, metalness: 0.5 })
const MAT_SLAB = new THREE.MeshStandardMaterial({ color: '#cccccc', roughness: 0.9 })
const MAT_INDUSTRIAL = new THREE.MeshStandardMaterial({ color: '#cec9c3', roughness: 0.95 })
const MAT_ROOF = new THREE.MeshStandardMaterial({ color: '#aaaaaa', roughness: 0.7 })
const MAT_ROOF_DARK = new THREE.MeshStandardMaterial({ color: '#888888', roughness: 0.8 })
const MAT_WHITE_FLOOR = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 1 })

// ─── Types ─────────────────────────────────────────────────────────────────────
interface SkeletonFloorProps {
  floorIndex: number
  totalFloors: number
  W: number
  D: number
  floorHeight: number
  groupRef: (el: THREE.Group | null) => void
}

interface WindowBandsProps {
  floors: number
  floorHeight: number
  W: number
  D: number
  groupRef: React.RefObject<THREE.Group>
  geometry: THREE.BufferGeometry
}

interface BuildingConfig {
  W: number
  D: number
  floors: number
  floorHeight: number
  hasCore: boolean
  style: 'tower' | 'midrise' | 'industrial'
}

interface BuildingProps {
  position?: [number, number, number]
  config: BuildingConfig
  progress: MotionValue<number>
  progressStart: number
  progressEnd: number
  glassMat?: THREE.Material
  cladMat?: THREE.Material
}

interface CameraSetupProps {
  isMobile: boolean
}

interface BuildingTowerWebGLProps {
  progress: MotionValue<number>
  isMobile: boolean
  paused?: boolean
}

// ─── SkeletonFloor ────────────────────────────────────────────────────────────
const SkeletonFloor = React.memo(function SkeletonFloor({
  floorIndex,
  W,
  D,
  floorHeight,
  groupRef,
}: SkeletonFloorProps) {
  const hw = W / 2,
    hd = D / 2

  const colPositions = useMemo(
    () => [
      [-hw, 0, -hd],
      [0, 0, -hd],
      [hw, 0, -hd],
      [-hw, 0, 0],
      [hw, 0, 0],
      [-hw, 0, hd],
      [0, 0, hd],
      [hw, 0, hd],
    ],
    [hw, hd],
  )

  const beamDefs = useMemo(
    () => [
      { pos: [0, floorHeight, -hd], rotY: 0 },
      { pos: [0, floorHeight, hd], rotY: 0 },
      { pos: [-hw, floorHeight, 0], rotY: Math.PI / 2 },
      { pos: [hw, floorHeight, 0], rotY: Math.PI / 2 },
    ],
    [hw, hd, floorHeight],
  )

  return (
    <group ref={groupRef}>
      {/* indices 0 to 7: columns */}
      {colPositions.map((pos, i) => (
        <mesh
          key={`c${i}`}
          geometry={GEO_COLUMN}
          material={MAT_STEEL}
          castShadow
          visible={false}
          position={[pos[0], floorIndex * floorHeight, pos[2]]}
        />
      ))}
      {/* indices 8 to 11: beams */}
      {beamDefs.map((b, i) => (
        <mesh
          key={`b${i}`}
          geometry={GEO_BEAM}
          material={MAT_STEEL}
          castShadow
          visible={false}
          position={b.pos as [number, number, number]}
          rotation={[0, b.rotY, 0]}
          scale={[0.001, 1, 1]}
        />
      ))}
      {/* index 12: slab */}
      <mesh
        geometry={GEO_SLAB}
        material={MAT_SLAB}
        receiveShadow
        visible={false}
        position={[0, floorIndex * floorHeight + floorHeight, 0]}
        scale={[0.001, 1, 0.001]}
      />
    </group>
  )
})

// ─── Window Bands ─────────────────────────────────────────────────────────────
const WindowBands = React.memo(function WindowBands({ floors, floorHeight, groupRef, geometry }: WindowBandsProps) {
  return (
    <group ref={groupRef}>
      {Array.from({ length: floors }).map((_, i) => (
        <mesh
          key={i}
          geometry={geometry}
          material={MAT_SPANDREL}
          visible={false}
          position={[0, i * floorHeight + 0.15, 0]}
          scale={[0.001, 1, 0.001]}
        />
      ))}
    </group>
  )
})

// ─── Building ─────────────────────────────────────────────────────────────────
function Building({
  position = [0, 0, 0],
  config,
  progress,
  progressStart,
  progressEnd,
  glassMat = MAT_GLASS,
  cladMat = MAT_INDUSTRIAL,
}: BuildingProps) {
  const { W = 10, D = 10, floors = 10, floorHeight = 2, hasCore = true, style = 'tower' } = config
  const coreH = floors * floorHeight

  // Reusable building-specific geometries
  const foundationGeo = useMemo(() => new THREE.BoxGeometry(W + 2, 0.5, D + 2), [W, D])
  const coreGeo = useMemo(
    () => (hasCore ? new THREE.BoxGeometry(W * 0.26, coreH, D * 0.26) : null),
    [W, D, coreH, hasCore],
  )
  const envelopeGeo = useMemo(() => new THREE.BoxGeometry(W, coreH, D), [W, D, coreH])
  const winBandGeo = useMemo(() => new THREE.BoxGeometry(W + 0.05, 0.18, D + 0.05), [W, D])

  const roofSlabGeo = useMemo(() => new THREE.BoxGeometry(W, 0.3, D), [W, D])
  const midriseBlockGeo = useMemo(
    () => (style === 'midrise' ? new THREE.BoxGeometry(W * 0.32, 1.4, D * 0.45) : null),
    [W, D, style],
  )
  const industrialPipeGeo = useMemo(
    () => (style === 'industrial' ? new THREE.BoxGeometry(W * 0.85, 0.9, 0.1) : null),
    [W, style],
  )

  const foundRef = useRef<THREE.Mesh>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const envRef = useRef<THREE.Mesh>(null)
  const roofRef = useRef<THREE.Group>(null)
  const floorRefs = useRef<(THREE.Group | null)[]>([])
  const winBandsRef = useRef<THREE.Group>(null)

  useFrame(() => {
    // 0. Compute progress
    const pGlobal = progress.get()
    const localProgVal = Math.max(0, Math.min(1, (pGlobal - progressStart) / (progressEnd - progressStart)))

    // 1. Foundation
    const fProg = Math.max(0, Math.min(1, localProgVal / 0.1))
    const fs = Math.max(0.001, fProg)
    if (foundRef.current) {
      foundRef.current.scale.y = fs
      foundRef.current.position.y = -0.25 * fs
    }

    // 2. Core
    if (hasCore && coreRef.current) {
      const cProg = Math.max(0, Math.min(1, (localProgVal - 0.07) / 0.43))
      const cs = Math.max(0.001, cProg)
      coreRef.current.scale.y = cs
      coreRef.current.position.y = (coreH / 2) * cs
      coreRef.current.visible = cs > 0.01
    }

    // 3. Floors (Columns, Beams, Slabs)
    for (let i = 0; i < floors; i++) {
      const floorGroup = floorRefs.current[i]
      if (!floorGroup) continue

      const floorStart = i / floors
      const floorEnd = Math.min(1, floorStart + 1.8 / floors)
      const floorProgVal = Math.max(0, Math.min(1, (localProgVal - floorStart) / (floorEnd - floorStart)))

      const base = i * floorHeight

      // Columns (indices 0 to 7)
      const s = Math.min(1, floorProgVal * 1.6)
      const colScaleY = Math.max(0.001, s * floorHeight)
      const colPosY = base + (s * floorHeight) / 2
      const columnsVisible = s > 0.01

      for (let cIdx = 0; cIdx < 8; cIdx++) {
        const colMesh = floorGroup.children[cIdx] as THREE.Mesh
        if (colMesh) {
          colMesh.visible = columnsVisible
          colMesh.scale.y = colScaleY
          colMesh.position.y = colPosY
        }
      }

      // Beams (indices 8 to 11)
      const bp = Math.max(0, (floorProgVal - 0.55) / 0.45)
      const beamVisible = bp > 0.01

      // Beams along X (W length) - indices 8, 9
      for (let bIdx = 8; bIdx <= 9; bIdx++) {
        const beamMesh = floorGroup.children[bIdx] as THREE.Mesh
        if (beamMesh) {
          beamMesh.visible = beamVisible
          beamMesh.scale.x = Math.max(0.001, bp * W)
        }
      }

      // Beams along Z (D length) - indices 10, 11
      for (let bIdx = 10; bIdx <= 11; bIdx++) {
        const beamMesh = floorGroup.children[bIdx] as THREE.Mesh
        if (beamMesh) {
          beamMesh.visible = beamVisible
          beamMesh.scale.x = Math.max(0.001, bp * D)
        }
      }

      // Slab (index 12)
      const slabMesh = floorGroup.children[12] as THREE.Mesh
      if (slabMesh) {
        const sp = Math.max(0, (floorProgVal - 0.65) / 0.35)
        slabMesh.visible = sp > 0.01
        slabMesh.scale.x = Math.max(0.001, sp * (W - 0.05))
        slabMesh.scale.z = Math.max(0.001, sp * (D - 0.05))
      }
    }

    // 4. Window Bands
    if (winBandsRef.current) {
      winBandsRef.current.children.forEach((meshChild, i) => {
        const mesh = meshChild as THREE.Mesh
        if (!mesh) return
        const start = 0.58 + (i / floors) * 0.25
        const p = Math.max(0, Math.min(1, (localProgVal - start) / 0.06))
        mesh.visible = p > 0.01
        mesh.scale.x = Math.max(0.001, p)
        mesh.scale.z = Math.max(0.001, p)
      })
    }

    // 5. Envelope
    if (envRef.current) {
      const eProg = Math.max(0, Math.min(1, (localProgVal - 0.58) / 0.3))
      const es = Math.max(0.001, eProg)
      envRef.current.scale.y = es
      envRef.current.position.y = (coreH / 2) * es
      envRef.current.visible = es > 0.01
    }

    // 6. Roof
    if (roofRef.current) {
      const rProg = Math.max(0, Math.min(1, (localProgVal - 0.88) / 0.12))
      roofRef.current.visible = rProg > 0.01
      roofRef.current.scale.setScalar(Math.max(0.001, rProg))
    }
  })

  // Clean up WebGL geometries
  useEffect(() => {
    return () => {
      foundationGeo.dispose()
      if (coreGeo) coreGeo.dispose()
      envelopeGeo.dispose()
      winBandGeo.dispose()
      roofSlabGeo.dispose()
      if (midriseBlockGeo) midriseBlockGeo.dispose()
      if (industrialPipeGeo) industrialPipeGeo.dispose()
    }
  }, [foundationGeo, coreGeo, envelopeGeo, winBandGeo, roofSlabGeo, midriseBlockGeo, industrialPipeGeo])

  return (
    <group position={position}>
      <mesh
        ref={foundRef}
        receiveShadow
        castShadow
        geometry={foundationGeo}
        material={MAT_FOUNDATION}
        position={[0, -0.25, 0]}
      />
      {hasCore && coreGeo && (
        <mesh ref={coreRef} castShadow receiveShadow geometry={coreGeo} material={MAT_CORE} visible={false} />
      )}
      {Array.from({ length: floors }).map((_, i) => (
        <SkeletonFloor
          key={i}
          floorIndex={i}
          totalFloors={floors}
          W={W}
          D={D}
          floorHeight={floorHeight}
          groupRef={(el) => {
            floorRefs.current[i] = el
          }}
        />
      ))}
      {style !== 'industrial' && (
        <WindowBands
          floors={floors}
          floorHeight={floorHeight}
          W={W}
          D={D}
          geometry={winBandGeo}
          groupRef={winBandsRef}
        />
      )}
      <mesh
        ref={envRef}
        castShadow
        receiveShadow
        geometry={envelopeGeo}
        material={style === 'industrial' ? cladMat : glassMat}
        visible={false}
      />
      <group ref={roofRef} position={[0, coreH + 0.15, 0]} visible={false}>
        <mesh geometry={roofSlabGeo} material={MAT_ROOF} castShadow />
        {style === 'tower' && <mesh geometry={GEO_SPIRE} material={MAT_STEEL} position={[0, 2.5, 0]} />}
        {style === 'midrise' && midriseBlockGeo && (
          <mesh geometry={midriseBlockGeo} material={MAT_ROOF_DARK} position={[W * 0.22, 0.7, 0]} castShadow />
        )}
        {style === 'industrial' &&
          industrialPipeGeo &&
          [-D * 0.25, 0, D * 0.25].map((oz, idx) => (
            <mesh key={idx} geometry={industrialPipeGeo} material={MAT_STEEL} position={[0, 0.45, oz]} />
          ))}
      </group>
    </group>
  )
}

// ─── Simple White Floor ───────────────────────────────────────────────────────
function Floor() {
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.48, 0]}
      receiveShadow
      material={MAT_WHITE_FLOOR}
      geometry={GEO_FLOOR}
    />
  )
}

// ─── Camera ───────────────────────────────────────────────────────────────────
function CameraSetup({ isMobile }: CameraSetupProps) {
  const { camera, size } = useThree()
  useEffect(() => {
    if (isMobile) {
      const multiplier = Math.max(1.06, Math.min(1.35, 0.86 + (768 - size.width) * 0.00055))
      const lookAtY = 14 + (multiplier - 1) * 22.0

      const x = 2 + 54 * multiplier
      const y = lookAtY + 26 * multiplier
      const z = -1 + 54 * multiplier

      camera.position.set(x, y, z)
      camera.lookAt(2, lookAtY, -1)
    } else {
      camera.position.set(56, 40, 53)
      camera.lookAt(2, 14, -1)
    }
    camera.updateProjectionMatrix()
  }, [camera, size.width, size.height, isMobile])
  return null
}

// ─── Buildings ────────────────────────────────────────────────────────────────
const BUILDINGS = [
  {
    id: 'towerA',
    position: [-6, 0, -6] as [number, number, number],
    config: { W: 10, D: 10, floors: 14, floorHeight: 2, hasCore: true, style: 'tower' as const },
    progressStart: 0,
    progressEnd: 0.85,
    glassMat: MAT_GLASS,
  },
  {
    id: 'towerB',
    position: [8, 0, -4] as [number, number, number],
    config: { W: 12, D: 10, floors: 8, floorHeight: 2.2, hasCore: true, style: 'midrise' as const },
    progressStart: 0.06,
    progressEnd: 0.78,
    glassMat: MAT_GLASS_B,
  },
  {
    id: 'blockD',
    position: [-4.5, 0, 3.8] as [number, number, number],
    config: { W: 9, D: 8, floors: 6, floorHeight: 2.5, hasCore: false, style: 'midrise' as const },
    progressStart: 0.1,
    progressEnd: 0.7,
    glassMat: MAT_GLASS_B,
  },
]

// ─── Export ───────────────────────────────────────────────────────────────────
export default function BuildingTowerWebGL({ progress, isMobile, paused }: BuildingTowerWebGLProps) {
  const staticProgress = useMotionValue(1)
  const animatedProgress = paused ? staticProgress : progress
  const activeBuildings = BUILDINGS

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        shadows
        dpr={Math.min(isMobile ? 1.5 : 2, typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1)}
        camera={{ position: [56, 40, 53], fov: isMobile ? 40 : 32, near: 0.5, far: 380 }}
        gl={{ antialias: true }}
      >
        <CameraSetup isMobile={isMobile} />

        <hemisphereLight color="#ffffff" groundColor="#e0e0e0" intensity={0.7} />
        <directionalLight
          castShadow
          position={[28, 50, 22]}
          intensity={1.1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={1}
          shadow-camera-far={140}
          shadow-camera-left={-30}
          shadow-camera-right={30}
          shadow-camera-top={30}
          shadow-camera-bottom={-30}
        />
        <fog attach="fog" args={['#ffffff', 80, 180]} />

        <Floor />

        <group>
          {activeBuildings.map((b) => (
            <Building
              key={b.id}
              position={b.position}
              config={b.config}
              progress={animatedProgress}
              progressStart={b.progressStart}
              progressEnd={b.progressEnd}
              glassMat={b.glassMat}
            />
          ))}
        </group>
      </Canvas>
    </div>
  )
}
