'use client'

import { useEffect } from 'react'

/**
 * Last-resort boundary for errors thrown by the root layout itself (where
 * app/error.tsx cannot render, because the layout it depends on is the thing
 * that failed). It must supply its own <html>/<body>, and cannot rely on the
 * layout's fonts or global styles loading — so everything here is inline.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('[Global error]', error)
  }, [error])

  return (
    <html lang="en-IN">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          backgroundColor: '#ffffff',
          color: '#1F2124',
          fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
            <span style={{ width: 12, height: 44, borderRadius: 6, backgroundColor: '#16A8B8' }} />
            <span style={{ width: 12, height: 44, borderRadius: 6, backgroundColor: '#FDB913' }} />
            <span style={{ width: 12, height: 44, borderRadius: 6, backgroundColor: '#E32322' }} />
          </div>

          <h1 style={{ fontSize: 30, fontWeight: 800, lineHeight: 1.2, margin: '0 0 14px' }}>
            BD Buildcon is temporarily unavailable
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.65, color: '#5A6169', margin: '0 0 28px' }}>
            We hit an unexpected error while loading the site. Please try again in a moment.
          </p>

          {error.digest && (
            <p style={{ fontSize: 13, color: '#8A9199', margin: '0 0 28px', fontFamily: 'monospace' }}>
              Reference: {error.digest}
            </p>
          )}

          <button
            type="button"
            onClick={reset}
            style={{
              backgroundColor: '#16A8B8',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              fontSize: 13,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '14px 32px',
              borderRadius: 999,
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}
