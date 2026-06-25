'use client'

import { useMotionValue } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { Building } from './Building'
import { TowerCrane } from './TowerCrane'
import { GroundMachines } from './GroundMachines'
import { FoundationWorks } from './FoundationWorks'
import { Lighting } from './Lighting'
import { Ground } from './Ground'
import { Effects } from './Effects'
import { CameraRig } from './CameraRig'
import { BUILDINGS } from './constants'
import { useQuality } from './useQuality'
import type { SceneProps } from './types'

export default function BuildingScene({ progress, isMobile, paused }: SceneProps) {
  const staticProgress = useMotionValue(1)
  const animatedProgress = paused ? staticProgress : progress
  const quality = useQuality(isMobile)

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        shadows
        dpr={quality.dpr}
        camera={{ position: [56, 40, 53], fov: isMobile ? 40 : 32, near: 0.5, far: 400 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.0 }}
      >
        <CameraRig isMobile={isMobile} />

        <Lighting quality={quality} />
        {/* white fog matches the page so the farthest edges melt into it (no horizon) */}
        <fog attach="fog" args={['#ffffff', 80, 300]} />

        <Ground quality={quality} />

        <group>
          {BUILDINGS.map((b) => (
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

        <FoundationWorks progress={animatedProgress} />

        <TowerCrane progress={animatedProgress} position={[-16, 0, 2]} baseYaw={0.23} detail={quality.craneDetail} />

        <GroundMachines progress={animatedProgress} />

        {quality.postprocessing && <Effects />}
      </Canvas>
    </div>
  )
}
