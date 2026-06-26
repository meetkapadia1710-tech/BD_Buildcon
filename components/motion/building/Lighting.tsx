'use client'

import { Environment, Lightformer } from '@react-three/drei'
import type { QualitySettings } from './types'

interface LightingProps {
  quality: QualitySettings
}

/**
 * Cinematic lighting rig.
 *  - A key directional "sun" at a golden-hour angle that casts the sharp shadows.
 *  - A soft hemisphere fill so shadowed faces don't go black.
 *  - A self-contained image-based environment baked from Lightformers (no external
 *    HDRI fetch) that gives the glass and steel real reflections + soft ambient.
 */
export function Lighting({ quality }: LightingProps) {
  return (
    <>
      <hemisphereLight color="#ffffff" groundColor="#dfe2e6" intensity={0.55} />

      <directionalLight
        castShadow
        position={[34, 46, 20]}
        intensity={1.25}
        color="#fff4e2"
        shadow-mapSize-width={quality.shadowMapSize}
        shadow-mapSize-height={quality.shadowMapSize}
        shadow-bias={-0.0004}
        shadow-camera-near={1}
        shadow-camera-far={160}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={48}
        shadow-camera-bottom={-20}
      />

      {quality.environment && (
        <Environment resolution={256} frames={1}>
          {/* sky dome — broad cool fill from above */}
          <Lightformer
            form="rect"
            intensity={0.7}
            color="#eaf2fb"
            scale={[24, 24, 1]}
            position={[0, 14, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          />
          {/* warm sun disc — hot highlight on glass + steel */}
          <Lightformer form="circle" intensity={3.2} color="#fff0d6" scale={[7, 7, 1]} position={[14, 11, 9]} />
          {/* cool back-fill for rim separation */}
          <Lightformer form="rect" intensity={0.6} color="#cfe0f0" scale={[14, 10, 1]} position={[-14, 7, -12]} />
          {/* warm ground bounce */}
          <Lightformer
            form="rect"
            intensity={0.35}
            color="#f3ede1"
            scale={[26, 26, 1]}
            position={[0, -5, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        </Environment>
      )}
    </>
  )
}
