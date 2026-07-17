import Link from 'next/link'
import { RevealText, RevealLine } from '@/components/motion/RevealText'

type Crumb = { label: string; href?: string }
type Props = { title: string; breadcrumbs?: Crumb[]; description?: string }

export function PageTitleBand({ title, breadcrumbs = [], description }: Props) {
  const crumbs: Crumb[] = [{ label: 'Home', href: '/' }, ...breadcrumbs]

  return (
    <section className="relative overflow-hidden bg-dark-bg py-[64px] lg:py-[72px]">
      {/* Teal radial glow top-right */}
      <div
        className="absolute -right-32 -top-32 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #16A8B8, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-container mx-auto px-gutter">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-5">
          <ol className="flex flex-wrap items-center gap-2 font-body text-[13px] text-white/50">
            {crumbs.map((crumb, i) => (
              <li key={i} className="flex items-center gap-2">
                {i > 0 && (
                  <svg
                    className="w-3 h-3 text-teal/60"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden="true"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                )}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="hover:text-[#5BD6E2] transition-colors duration-200 uppercase tracking-widest font-semibold"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#5BD6E2] uppercase tracking-widest font-semibold" aria-current="page">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Title */}
        <RevealText as="h1" className="font-display text-[48px] font-[800] text-white leading-tight">
          <RevealLine>{title}</RevealLine>
        </RevealText>

        {/* Description */}
        {description && (
          <p className="mt-4 font-body text-[18px] text-white/70 max-w-[640px] leading-relaxed">{description}</p>
        )}
      </div>
    </section>
  )
}
