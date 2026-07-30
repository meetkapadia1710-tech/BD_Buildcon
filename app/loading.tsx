import { Skeleton, SkeletonText } from '@/components/ui/Skeleton'

/**
 * Route-level fallback shown while a page streams in.
 * Mirrors the real page shape — a dark PageTitleBand followed by a
 * centred section heading and a card grid — so content doesn't jump
 * when it arrives.
 */
export default function Loading() {
  return (
    <div role="status" aria-live="polite">
      <span className="sr-only">Loading page…</span>

      {/* ── Title band — mirrors PageTitleBand ── */}
      <section className="relative overflow-hidden bg-dark-bg py-[40px] lg:py-[48px]">
        <div
          className="absolute -right-32 -top-32 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #16A8B8, transparent 70%)' }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-container mx-auto px-gutter">
          {/* Breadcrumb */}
          <div className="flex items-center gap-[8px] mb-[20px]" aria-hidden="true">
            <Skeleton className="h-[10px] w-[48px] rounded-pill bg-white/10" />
            <Skeleton className="h-[10px] w-[10px] rounded-pill bg-white/10" />
            <Skeleton className="h-[10px] w-[76px] rounded-pill bg-white/10" />
          </div>

          {/* Title */}
          <Skeleton className="h-[38px] lg:h-[48px] w-[min(420px,72%)] rounded-[8px] bg-white/10" />

          {/* Description */}
          <div className="mt-[18px] flex flex-col gap-[10px] max-w-[640px]" aria-hidden="true">
            <Skeleton className="h-[13px] w-full rounded-pill bg-white/10" />
            <Skeleton className="h-[13px] w-[68%] rounded-pill bg-white/10" />
          </div>
        </div>
      </section>

      {/* ── Content section — heading + card grid ── */}
      <section className="bg-white py-[48px] sm:py-[96px]">
        <div className="max-w-container mx-auto px-gutter">
          <div className="flex flex-col items-center text-center mb-[32px] sm:mb-[56px]">
            <Skeleton className="h-[12px] w-[104px] rounded-pill mb-[16px]" />
            <Skeleton className="h-[30px] sm:h-[42px] w-[min(320px,80%)] rounded-[8px] mb-[16px]" />
            <Skeleton className="h-[3px] w-[44px] sm:w-[56px] rounded-pill bg-teal/25 mb-[20px]" />
            <SkeletonText lines={2} className="w-full max-w-[520px] items-center" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[16px] sm:gap-[24px]">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-card border border-hairline bg-white p-[20px] sm:p-[24px]">
                <Skeleton className="aspect-[4/3] w-full rounded-[8px] mb-[18px]" />
                <Skeleton className="h-[16px] w-[64%] rounded-pill mb-[14px]" />
                <SkeletonText lines={3} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
