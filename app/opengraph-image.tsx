import { ImageResponse } from 'next/og'

// Branded social-share card — replaces the previously hot-linked Unsplash image.
// Edge runtime: avoids @vercel/og's Node font-resolution (which breaks on paths
// containing spaces) and works on any deploy target.
export const runtime = 'edge'
export const alt = 'BD Buildcon LLP — Industrial EPC Contractor, Bharuch, Gujarat'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#1F2124',
        padding: '72px 80px',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Top accent bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div style={{ width: 18, height: 64, borderRadius: 9, backgroundColor: '#16A8B8' }} />
        <div style={{ width: 18, height: 64, borderRadius: 9, backgroundColor: '#FDB913' }} />
        <div style={{ width: 18, height: 64, borderRadius: 9, backgroundColor: '#E32322' }} />
        <div
          style={{
            marginLeft: 18,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ color: '#ffffff', fontSize: 40, fontWeight: 800, letterSpacing: '-0.02em' }}>
            BD BUILDCON LLP
          </div>
          <div style={{ color: '#9aa3a9', fontSize: 18, fontWeight: 600 }}>(Formerly Bhumi Developers)</div>
        </div>
      </div>

      {/* Headline */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ color: '#ffffff', fontSize: 66, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          All projects delivered on deadline —
        </div>
        <div style={{ color: '#16A8B8', fontSize: 66, fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          with zero accidents.
        </div>
      </div>

      {/* Footer meta */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ color: '#FDB913', fontSize: 26, fontWeight: 700 }}>Since 1990 · 35+ years</div>
        <div style={{ color: '#6b7177', fontSize: 26 }}>·</div>
        <div style={{ color: '#c8ced2', fontSize: 26, fontWeight: 600 }}>ISO 9001:2015 · Industrial EPC Contractor</div>
      </div>
    </div>,
    { ...size },
  )
}
