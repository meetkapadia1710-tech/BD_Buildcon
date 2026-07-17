'use client'

import dynamic from 'next/dynamic'

/**
 * Lazily code-splits the WebGL Scene (and with it three.js / fiber / drei /
 * postprocessing) into its own chunk. Because the wrapper only renders <Scene />
 * once the section nears the viewport, users who never scroll that far never
 * download the 3D stack at all.
 */
export const Scene = dynamic(() => import('./Scene'), { ssr: false, loading: () => null })
