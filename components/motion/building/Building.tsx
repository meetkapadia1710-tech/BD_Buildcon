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
  MAT_FOUNDATION,
  MAT_CORE,
  MAT_GLASS,
  MAT_INDUSTRIAL,
  MAT_ROOF,
  MAT_ROOF_DARK,
  MAT_SCREEN,
  MAT_FORMWORK,
  MAT_BLUEPRINT,
  makeCurtainWall,
} from './constants'
import type { BuildingProps } from './types'

// One reusable matrix scratch object for all instance writes (render loop is
// single-threaded, so a module-level dummy is safe and allocation-free).
const DUMMY = new THREE.Object3D()

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x)

/** The 8 perimeter column positions for a W×D bay (matches the foundation grid). */
function columnGrid(W: number, D: number): [number, number][] {
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

export function Building({
  position = [0, 0, 0],
  config,
  progress,
  progressStart,
  progressEnd,
  glassTint = '#bcd4e8',
  quality,
}: BuildingProps) {
  const { W = 10, D = 10, floors = 10, floorHeight = 2, hasCore = true, style = 'tower' } = config
  const coreH = floors * floorHeight
  const cols = useMemo(() => columnGrid(W, D), [W, D])
  const COL_COUNT = floors * cols.length
  const BEAM_COUNT = floors * 4
  const SLAB_COUNT = floors

  // ── Per-building geometries ──
  const foundationGeo = useMemo(() => new THREE.BoxGeometry(W + 2, 0.5, D + 2), [W, D])
  const coreGeo = useMemo(
    () => (hasCore ? new THREE.BoxGeometry(W * 0.26, coreH, D * 0.26) : null),
    [W, D, coreH, hasCore],
  )
  const envelopeGeo = useMemo(() => new THREE.BoxGeometry(W, coreH, D), [W, D, coreH])
  const roofSlabGeo = useMemo(() => new THREE.BoxGeometry(W, 0.3, D), [W, D])
  const midriseBlockGeo = useMemo(
    () => (style === 'midrise' ? new THREE.BoxGeometry(W * 0.32, 1.4, D * 0.45) : null),
    [W, D, style],
  )
  const collarBaseGeo = useMemo(() => new THREE.BoxGeometry(W * 0.3, 0.5, D * 0.3), [W, D])
  const collarCapGeo = useMemo(() => new THREE.BoxGeometry(W * 0.32, 0.16, D * 0.32), [W, D])

  // Blueprint massing wireframe (signature "drawing → built" reveal)
  const blueprintGeo = useMemo(() => {
    const box = new THREE.BoxGeometry(W, coreH, D)
    const edges = new THREE.EdgesGeometry(box)
    box.dispose()
    return edges
  }, [W, D, coreH])
  const blueprintMat = useMemo(() => MAT_BLUEPRINT.clone(), [])

  // ── Per-building façade material ──
  const facadeMat = useMemo(() => {
    if (!quality.facadeShader) return style === 'industrial' ? MAT_INDUSTRIAL : MAT_GLASS
    if (style === 'industrial') return MAT_INDUSTRIAL
    const vMull = Math.max(4, Math.round(Math.max(W, D) / 1.7))
    return makeCurtainWall({ tint: glassTint, floors, vMullions: vMull })
  }, [quality.facadeShader, style, glassTint, floors, W, D])

  // ── Refs ──
  const foundRef = useRef<THREE.Mesh>(null)
  const coreRef = useRef<THREE.Mesh>(null)
  const collarRef = useRef<THREE.Group>(null)
  const envRef = useRef<THREE.Mesh>(null)
  const roofRef = useRef<THREE.Group>(null)
  const columnsRef = useRef<THREE.InstancedMesh>(null)
  const beamsRef = useRef<THREE.InstancedMesh>(null)
  const slabsRef = useRef<THREE.InstancedMesh>(null)
  const screensRef = useRef<THREE.Group>(null)
  const blueprintRef = useRef<THREE.LineSegments>(null)

  useFrame(() => {
    const pGlobal = progress.get()
    const localProg = clamp01((pGlobal - progressStart) / (progressEnd - progressStart))

    // 0. Blueprint wireframe: fully lit before this building starts, fades over
    //    the first slice of its own build so the real structure rises through it.
    if (blueprintRef.current) {
      const bp = 1 - clamp01(localProg / 0.14)
      blueprintMat.opacity = 0.9 * bp
      blueprintRef.current.visible = bp > 0.01
    }

    // 1. Foundation
    const fProg = clamp01(localProg / 0.1)
    const fs = Math.max(0.001, fProg)
    if (foundRef.current) {
      foundRef.current.scale.y = fs
      foundRef.current.position.y = -0.25 * fs
    }

    // 2. Core — capped to lead the highest risen floor by ~2 storeys so it never
    //    outruns the structure into a bare obelisk.
    const builtFloors = localProg * floors
    if (hasCore && coreRef.current) {
      const coreFloorsVisible = Math.min(floors, Math.max(0, builtFloors + 2))
      const cs = Math.max(0.001, coreFloorsVisible / floors)
      coreRef.current.scale.y = cs
      coreRef.current.position.y = (coreH / 2) * cs
      coreRef.current.visible = cs > 0.02 && localProg < 0.999
      // climbing-formwork collar rides the core top while it's actively rising
      if (collarRef.current) {
        const collarY = coreH * cs
        collarRef.current.position.y = collarY
        collarRef.current.visible = cs > 0.04 && cs < 0.985
      }
    }

    // 3. Structural frame — one InstancedMesh each for columns / beams / slabs.
    const hw = W / 2,
      hd = D / 2
    let topBuiltY = 0

    // Columns
    if (columnsRef.current) {
      let idx = 0
      for (let f = 0; f < floors; f++) {
        const floorStart = f / floors
        const floorEnd = Math.min(1, floorStart + 1.8 / floors)
        const fp = clamp01((localProg - floorStart) / (floorEnd - floorStart))
        const s = Math.min(1, fp * 1.6)
        const colH = Math.max(0.001, s * floorHeight)
        const base = f * floorHeight
        if (s > 0.05) topBuiltY = Math.max(topBuiltY, base + colH)
        for (let c = 0; c < cols.length; c++) {
          DUMMY.position.set(cols[c][0], base + colH / 2, cols[c][1])
          DUMMY.scale.set(1, colH, 1)
          DUMMY.rotation.set(0, 0, 0)
          DUMMY.updateMatrix()
          columnsRef.current.setMatrixAt(idx++, DUMMY.matrix)
        }
      }
      columnsRef.current.instanceMatrix.needsUpdate = true
    }

    // Beams (top ring of each floor)
    if (beamsRef.current) {
      let idx = 0
      for (let f = 0; f < floors; f++) {
        const floorStart = f / floors
        const floorEnd = Math.min(1, floorStart + 1.8 / floors)
        const fp = clamp01((localProg - floorStart) / (floorEnd - floorStart))
        const bp = Math.max(0, (fp - 0.55) / 0.45)
        const y = f * floorHeight + floorHeight
        const lenX = Math.max(0.001, bp * W)
        const lenZ = Math.max(0.001, bp * D)
        // two beams spanning X at z = ±hd
        for (const z of [-hd, hd]) {
          DUMMY.position.set(0, y, z)
          DUMMY.rotation.set(0, 0, 0)
          DUMMY.scale.set(lenX, 1, 1)
          DUMMY.updateMatrix()
          beamsRef.current.setMatrixAt(idx++, DUMMY.matrix)
        }
        // two beams spanning Z at x = ±hw (rotate the X-long member 90°)
        for (const x of [-hw, hw]) {
          DUMMY.position.set(x, y, 0)
          DUMMY.rotation.set(0, Math.PI / 2, 0)
          DUMMY.scale.set(lenZ, 1, 1)
          DUMMY.updateMatrix()
          beamsRef.current.setMatrixAt(idx++, DUMMY.matrix)
        }
      }
      beamsRef.current.instanceMatrix.needsUpdate = true
    }

    // Slabs
    if (slabsRef.current) {
      for (let f = 0; f < floors; f++) {
        const floorStart = f / floors
        const floorEnd = Math.min(1, floorStart + 1.8 / floors)
        const fp = clamp01((localProg - floorStart) / (floorEnd - floorStart))
        const sp = Math.max(0, (fp - 0.65) / 0.35)
        DUMMY.position.set(0, f * floorHeight + floorHeight, 0)
        DUMMY.rotation.set(0, 0, 0)
        DUMMY.scale.set(Math.max(0.001, sp * (W - 0.05)), 1, Math.max(0.001, sp * (D - 0.05)))
        DUMMY.updateMatrix()
        slabsRef.current.setMatrixAt(f, DUMMY.matrix)
      }
      slabsRef.current.instanceMatrix.needsUpdate = true
    }

    // 4. Working-floor safety screens — a translucent teal ring hugging the top of
    //    the risen frame while the envelope hasn't caught up. Classic site read.
    if (screensRef.current) {
      const envProg = clamp01((localProg - 0.58) / 0.3)
      const show = topBuiltY > floorHeight * 1.2 && envProg < 0.85 && localProg > 0.12
      screensRef.current.visible = show
      if (show) {
        const screenH = floorHeight * 1.4
        screensRef.current.position.y = Math.max(0, topBuiltY - screenH * 0.5)
        screensRef.current.scale.y = screenH
      }
    }

    // 5. Envelope (curtain wall)
    if (envRef.current) {
      const eProg = clamp01((localProg - 0.58) / 0.3)
      const es = Math.max(0.001, eProg)
      envRef.current.scale.y = es
      envRef.current.position.y = (coreH / 2) * es
      envRef.current.visible = es > 0.01
    }

    // 6. Roof
    if (roofRef.current) {
      const rProg = clamp01((localProg - 0.88) / 0.12)
      roofRef.current.visible = rProg > 0.01
      roofRef.current.scale.setScalar(Math.max(0.001, rProg))
    }
  })

  // Init instance matrices once so nothing flashes at full size on first frame.
  useEffect(() => {
    const zero = new THREE.Matrix4().makeScale(0.001, 0.001, 0.001)
    for (const [ref, n] of [
      [columnsRef, COL_COUNT],
      [beamsRef, BEAM_COUNT],
      [slabsRef, SLAB_COUNT],
    ] as const) {
      const im = ref.current
      if (!im) continue
      for (let i = 0; i < n; i++) im.setMatrixAt(i, zero)
      im.instanceMatrix.needsUpdate = true
      im.frustumCulled = false
    }
  }, [COL_COUNT, BEAM_COUNT, SLAB_COUNT])

  // Dispose per-building geometries + cloned/generated materials
  useEffect(() => {
    return () => {
      foundationGeo.dispose()
      coreGeo?.dispose()
      envelopeGeo.dispose()
      roofSlabGeo.dispose()
      midriseBlockGeo?.dispose()
      collarBaseGeo.dispose()
      collarCapGeo.dispose()
      blueprintGeo.dispose()
      blueprintMat.dispose()
      if (facadeMat !== MAT_GLASS && facadeMat !== MAT_INDUSTRIAL) facadeMat.dispose()
    }
  }, [
    foundationGeo,
    coreGeo,
    envelopeGeo,
    roofSlabGeo,
    midriseBlockGeo,
    collarBaseGeo,
    collarCapGeo,
    blueprintGeo,
    blueprintMat,
    facadeMat,
  ])

  const screenPanels = useMemo(() => {
    const hw = W / 2 + 0.06,
      hd = D / 2 + 0.06
    // unit-height planes (y scaled at runtime), positioned around the perimeter
    return [
      { pos: [0, 0.5, -hd] as [number, number, number], rot: 0, len: W },
      { pos: [0, 0.5, hd] as [number, number, number], rot: 0, len: W },
      { pos: [-hw, 0.5, 0] as [number, number, number], rot: Math.PI / 2, len: D },
      { pos: [hw, 0.5, 0] as [number, number, number], rot: Math.PI / 2, len: D },
    ]
  }, [W, D])

  return (
    <group position={position}>
      {/* Blueprint massing wireframe */}
      <lineSegments ref={blueprintRef} geometry={blueprintGeo} material={blueprintMat} position={[0, coreH / 2, 0]} />

      {/* Foundation */}
      <mesh
        ref={foundRef}
        receiveShadow
        castShadow
        geometry={foundationGeo}
        material={MAT_FOUNDATION}
        position={[0, -0.25, 0]}
      />

      {/* Core + climbing-formwork collar */}
      {hasCore && coreGeo && (
        <>
          <mesh ref={coreRef} castShadow receiveShadow geometry={coreGeo} material={MAT_CORE} visible={false} />
          <group ref={collarRef} visible={false}>
            <mesh castShadow geometry={collarBaseGeo} material={MAT_FORMWORK} />
            <mesh geometry={collarCapGeo} material={MAT_SCREEN} position={[0, 0.34, 0]} />
          </group>
        </>
      )}

      {/* Structural frame — instanced */}
      <instancedMesh
        ref={columnsRef}
        args={[GEO_COLUMN, MAT_STEEL, COL_COUNT]}
        castShadow
        receiveShadow
        frustumCulled={false}
      />
      <instancedMesh ref={beamsRef} args={[GEO_BEAM, MAT_STEEL, BEAM_COUNT]} castShadow frustumCulled={false} />
      <instancedMesh
        ref={slabsRef}
        args={[GEO_SLAB, MAT_SLAB, SLAB_COUNT]}
        castShadow
        receiveShadow
        frustumCulled={false}
      />

      {/* Working-floor safety screens */}
      <group ref={screensRef} visible={false}>
        {screenPanels.map((p, i) => (
          <mesh key={i} position={p.pos} rotation={[0, p.rot, 0]} material={MAT_SCREEN}>
            <planeGeometry args={[p.len, 1]} />
          </mesh>
        ))}
      </group>

      {/* Envelope */}
      <mesh ref={envRef} castShadow receiveShadow geometry={envelopeGeo} material={facadeMat} visible={false} />

      {/* Roof */}
      <group ref={roofRef} position={[0, coreH + 0.15, 0]} visible={false}>
        <mesh geometry={roofSlabGeo} material={MAT_ROOF} castShadow />
        {style === 'tower' && <mesh geometry={GEO_SPIRE} material={MAT_STEEL} position={[0, 2.5, 0]} />}
        {style === 'midrise' && midriseBlockGeo && (
          <mesh geometry={midriseBlockGeo} material={MAT_ROOF_DARK} position={[W * 0.22, 0.7, 0]} castShadow />
        )}
      </group>
    </group>
  )
}
