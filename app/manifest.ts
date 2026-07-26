import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BD Buildcon LLP — Industrial EPC Contractor',
    short_name: 'BD Buildcon',
    description:
      'Turnkey industrial EPC contractor in Bharuch, Gujarat. 35+ years, ISO 9001:2015 certified, zero-accident record.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1F2124',
    theme_color: '#1F2124',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
