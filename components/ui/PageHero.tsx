import Image from 'next/image'
import Link from 'next/link'
import { RevealText, RevealLine } from '@/components/motion/RevealText'
import { CountUp } from '@/components/motion/CountUp'

type Stat = {
  value: string
  numeric?: number
  suffix?: string
  label: string
}

type Props = {
  image: string
  imageAlt: string
  crumbLabel: string
  titleLines: React.ReactNode[]
  description: string
  primaryCta: { label: string; href: string }
  secondaryCta: { label: string; href: string }
  stats: Stat[]
}

/**
 * Full-bleed photographic hero used on the redesigned Safety & Quality and
 * Why Us pages — bigger and more visual than the standard PageTitleBand.
 */
export function PageHero({
  image,
  imageAlt,
  crumbLabel,
  titleLines,
  description,
  primaryCta,
  secondaryCta,
  stats,
}: Props) {
  return (
    <section className="relative overflow-hidden bg-dark-bg min-h-[560px] lg:min-h-[720px] flex flex-col justify-end">
      {/* Background photo */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover animate-hero-zoom"
          style={{ objectPosition: 'center 32%' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(13,20,24,0.4) 0%, rgba(13,20,24,0.5) 45%, rgba(13,20,24,0.94) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(13,20,24,0.6), transparent 55%)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-container w-full mx-auto px-gutter pt-[120px] lg:pt-[140px]">
        <nav aria-label="Breadcrumb" className="flex items-center gap-[10px] mb-[28px]">
          <Link
            href="/"
            className="text-white/55 text-[12px] font-semibold uppercase tracking-[0.14em] hover:text-[#5BD6E2] transition-colors duration-200"
          >
            Home
          </Link>
          <span className="w-[24px] h-[1px] bg-white/30" aria-hidden="true" />
          <span className="text-[#5BD6E2] text-[12px] font-semibold uppercase tracking-[0.14em]" aria-current="page">
            {crumbLabel}
          </span>
        </nav>

        <RevealText
          as="h1"
          className="font-display font-[800] text-[42px] sm:text-[56px] lg:text-[76px] leading-[1.02] tracking-[-0.025em] text-white max-w-[15ch]"
        >
          {titleLines.map((line, i) => (
            <RevealLine key={i}>{line}</RevealLine>
          ))}
        </RevealText>

        <p className="text-[16px] sm:text-[19px] leading-[1.65] text-white/75 max-w-[560px] mt-[24px]">{description}</p>

        <div className="flex flex-wrap gap-[14px] mt-[36px]">
          <Link href={primaryCta.href} className="btn-primary">
            {primaryCta.label}
            <svg
              className="w-[15px] h-[15px]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
          <Link href={secondaryCta.href} className="btn-ghost-white">
            {secondaryCta.label}
          </Link>
        </div>
      </div>

      {/* Stat bar */}
      <div className="relative z-10 max-w-container w-full mx-auto px-gutter mt-[48px] lg:mt-[64px]">
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-white/[0.18]">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`py-[24px] lg:py-[28px] pr-[16px] lg:pr-[32px] ${i > 0 ? 'lg:pl-[32px]' : ''} ${
                i < stats.length - 1 ? 'lg:border-r border-white/[0.12]' : ''
              }`}
            >
              <div className="font-display font-[800] text-[32px] sm:text-[40px] lg:text-[52px] leading-none text-white tabular-nums">
                {s.numeric !== undefined ? <CountUp target={s.numeric} suffix={s.suffix ?? ''} /> : s.value}
              </div>
              <div className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.12em] text-[#5BD6E2] mt-[10px]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
