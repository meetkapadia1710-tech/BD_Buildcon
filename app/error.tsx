'use client'

import { useEffect } from 'react'
import Link from 'next/link'

/**
 * Route-level error boundary. Catches render/effect errors in any page below the
 * root layout, so a single broken component shows a branded recovery screen
 * instead of Next.js's bare default error page.
 *
 * The root layout (header, footer, nav) still renders around this. For errors in
 * the layout itself, see app/global-error.tsx.
 */
export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Surfaces in the server logs in production; wire to Sentry et al. here if added.
    console.error('[Route error]', error)
  }, [error])

  return (
    <section className="bg-white" aria-labelledby="error-heading">
      <div className="max-w-container mx-auto px-gutter py-[96px] lg:py-[128px] max-w-[720px]">
        <span className="block text-[13px] font-semibold uppercase tracking-[0.14em] text-teal mb-4">
          Something went wrong
        </span>
        <h1
          id="error-heading"
          className="font-display font-bold text-[32px] sm:text-[40px] leading-[1.15] text-ink mb-5"
        >
          This page hit an unexpected error
        </h1>
        <p className="text-[17px] leading-[1.7] text-body mb-8">
          The issue has been logged. You can retry, or head back to the homepage — and if it keeps happening, please
          call us and we&apos;ll pick it up directly.
        </p>

        {error.digest && (
          <p className="text-[13px] text-body/70 mb-8 font-mono">
            Reference: <span className="text-ink">{error.digest}</span>
          </p>
        )}

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="bg-teal text-white border-none cursor-pointer font-body text-[13px] font-semibold uppercase tracking-[0.1em] px-[32px] py-[14px] rounded-full transition-colors hover:bg-teal/90"
          >
            Try again
          </button>
          <Link
            href="/"
            className="font-body text-[13px] font-semibold uppercase tracking-[0.1em] text-ink hover:text-teal transition-colors py-[14px]"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  )
}
