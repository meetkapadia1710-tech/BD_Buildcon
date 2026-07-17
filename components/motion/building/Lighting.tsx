'use client'

import { Environment, Lightformer } from '@react-three/drei'
import type { QualitySettings } from './types'

interface LightingProps {
  quality: QualitySettings
}

/**
 * Lighting rig for the "architectural model on a sunlit table" look.
 *  - A strong golden key "sun" casts the defining shadows; the fill is kept low
 *    so faces model with real light-to-shadow contrast (the old rig was nearly
 *    shadowless, which flattened everything).
 *  - Self-contained image-based environment baked from Lightformers (no HDRI
 *    fetch) gives glass + steel genuine reflections and soft ambient.
 *
 * Note: drei's <SoftShadows> (PCSS) is deliberately NOT used — its shader patch
 * references unpackRGBAToDepth, which three 0.184 removed, and it breaks every
 * material's compile. Shadow softness comes from the PCF shadow map + the SSAO
 * pass + soft contact shadows instead.
 */
export function Lighting({ quality }: LightingProps) {
  return (
    <>
      <hemisphereLight color="#ffffff" groundColor="#e0dcd3" intensity={0.42} />

      {quality.shadows ? (
        <directionalLight
          castShadow
          position={[34, 48, 20]}
          intensity={1.65}
          color="#fff2dc"
          shadow-mapSize-width={quality.shadowMapSize}
          shadow-mapSize-height={quality.shadowMapSize}
          shadow-bias={-0.0004}
          shadow-normalBias={0.02}
          shadow-camera-near={1}
          shadow-camera-far={150}
          shadow-camera-left={-46}
          shadow-camera-right={46}
          shadow-camera-top={52}
          shadow-camera-bottom={-22}
        />
      ) : (
        <directionalLight position={[34, 48, 20]} intensity={1.65} color="#fff2dc" />
      )}

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
          <Lightformer form="circle" intensity={3.4} color="#fff0d6" scale={[7, 7, 1]} position={[14, 11, 9]} />
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
