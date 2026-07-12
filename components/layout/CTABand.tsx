import Link from 'next/link'
import Image from 'next/image'

type Props = {
  title?: string
  subtitle?: string
  btnLabel?: string
  btnHref?: string
}

export function CTABand({
  title = "Ready to build? Let's talk.",
  subtitle = 'Tell us about your project and we will respond within one business day.',
  btnLabel = 'Start your project',
  btnHref = '/contact',
}: Props) {
  return (
    <section className="relative overflow-hidden py-[120px] lg:py-[160px]">
      <div className="absolute inset-0 z-0">
        <Image
          src="/brochurephotos/site photos/ROXUL ROCKWOOL/DSC_8467.webp"
          alt="Site Construction"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-deep/95 to-teal/90" />
      </div>

      <div className="relative z-10 max-w-container mx-auto px-gutter">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left flex-1">
            <h2 className="font-display text-[32px] font-bold text-white leading-tight">{title}</h2>
            <p className="mt-2 font-body text-[18px] text-white/80 max-w-lg">{subtitle}</p>
          </div>

          <div className="shrink-0">
            <Link
              href={btnHref}
              className="inline-flex items-center gap-2 px-6 py-4 bg-white text-teal font-body text-[13px] font-semibold uppercase tracking-[0.08em] rounded-full whitespace-nowrap transition-shadow duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.15)]"
            >
              {btnLabel}
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
