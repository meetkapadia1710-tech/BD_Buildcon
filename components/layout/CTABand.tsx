import Link from 'next/link'
import { FadeRiseItem } from '@/components/motion/FadeRise'

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
    <section className="bg-teal text-white py-16 lg:py-20">
      <div className="max-w-container mx-auto px-gutter">
        <FadeRiseItem className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="text-center lg:text-left">
            <h2 className="font-display text-headline-md text-white">{title}</h2>
            <p className="mt-2 font-body text-body-lg text-white/80">{subtitle}</p>
          </div>
          <Link
            href={btnHref}
            className="shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-white text-teal font-body text-label-md uppercase tracking-wider rounded-full transition-all duration-300 hover:bg-teal-light hover:shadow-lg whitespace-nowrap"
          >
            {btnLabel}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </FadeRiseItem>
      </div>
    </section>
  )
}
