const bars = [
  { colorClass: 'bg-logo-blue', delay: '0s' },
  { colorClass: 'bg-logo-yellow', delay: '0.15s' },
  { colorClass: 'bg-logo-red', delay: '0.3s' },
]

export default function Loading() {
  return (
    <>
      {/* ── Branded loading band ── */}
      <div
        role="status"
        aria-live="polite"
        aria-label="Loading page"
        className="relative flex min-h-[320px] w-full items-center justify-center overflow-hidden bg-dark-bg py-[96px]"
      >
        {/* Breathing radial glows */}
        <div
          className="animate-soft-pulse pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, #16A8B8, transparent 70%)' }}
          aria-hidden="true"
        />
        <div
          className="animate-soft-pulse pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, #16A8B8, transparent 70%)', animationDelay: '1.2s' }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col items-center gap-7">
          {/* Brand bars, echoing the BD Buildcon 3-pillar mark */}
          <div className="flex h-[52px] items-end gap-[10px]" aria-hidden="true">
            {bars.map((bar, i) => (
              <span
                key={i}
                className={`animate-bar-grow h-full w-[12px] rounded-full ${bar.colorClass}`}
                style={{ animationDelay: bar.delay }}
              />
            ))}
          </div>

          <span className="font-body text-[12px] font-semibold uppercase tracking-[0.22em] text-white/60">
            Loading BD Buildcon
          </span>

          {/* Indeterminate sweep bar */}
          <div className="relative h-[3px] w-[160px] overflow-hidden rounded-full bg-white/10" aria-hidden="true">
            <span
              className="animate-loading-sweep absolute inset-y-0 left-0 w-full rounded-full bg-teal"
              style={{ boxShadow: '0 0 10px rgba(22,168,184,0.7)' }}
            />
          </div>
        </div>
      </div>

      {/* ── Shimmering content skeleton ── */}
      <section className="section-pad bg-white">
        <div className="container-max">
          <div className="relative mb-10 h-10 w-64 overflow-hidden rounded-[8px] bg-surface">
            <span className="animate-shimmer absolute inset-0" />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-card bg-surface">
                <span className="animate-shimmer absolute inset-0" style={{ animationDelay: `${i * 0.08}s` }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
