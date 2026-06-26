'use client'

import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import {
  GEO_COLUMN,
  GEO_BEAM,
  GEO_SLAB,
  GEO_SPIRE,
  MAT_STEEL,
  MAT_SLAB,
  MAT_SPANDREL,
  MAT_FOUNDATION,
  MAT_CORE,
  MAT_GLASS,
  MAT_INDUSTRIAL,
  MAT_ROOF,
  MAT_ROOF_DARK,
} from './constants'
import type { BuildingProps, SkeletonFloorProps, WindowBandsProps } from './types'

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
export function Building({
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
