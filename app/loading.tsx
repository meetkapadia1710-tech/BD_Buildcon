import Logo from '@/components/ui/Logo'
import { AbstractSkyline } from '@/components/ui/AbstractSkyline'

export default function Loading() {
  return (
    <>
      {/* ── Plain white loading band ── */}
      <div
        role="status"
        aria-live="polite"
        aria-label="Loading page"
        className="relative flex min-h-[320px] w-full items-center justify-center overflow-hidden bg-white py-[96px]"
      >
        {/* Abstract skyline horizon */}
        <AbstractSkyline className="pointer-events-none absolute inset-x-0 bottom-0 h-[64px] w-full text-teal/[0.16] sm:h-[84px]" />

        <div className="relative z-10 flex flex-col items-center gap-7">
          <div className="relative flex items-center justify-center animate-pulse">
            <Logo light={true} className="relative h-24 w-auto" />
          </div>

          <span className="font-body text-[13px] font-semibold uppercase tracking-[0.22em] text-ink/70">
            Engineering Excellence...
          </span>

          {/* Indeterminate sweep bar */}
          <div className="relative h-[3px] w-[160px] overflow-hidden rounded-full bg-hairline" aria-hidden="true">
            <span
              className="animate-loading-sweep absolute inset-y-0 left-0 w-full rounded-full bg-teal"
              style={{ boxShadow: '0 0 10px rgba(22,168,184,0.3)' }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
