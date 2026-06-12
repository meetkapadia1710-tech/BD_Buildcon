import Link from 'next/link'

type Crumb = {
  label: string
  href?: string
}

type Props = {
  title: string
  breadcrumbs?: Crumb[]
  description?: string
}

export function PageTitleBand({ title, breadcrumbs = [], description }: Props) {
  const crumbs: Crumb[] = [{ label: 'Home', href: '/' }, ...breadcrumbs]

  return (
    <section className="bg-surface border-b border-hairline py-10 lg:py-14">
      <div className="max-w-container mx-auto px-gutter">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-3">
          <ol className="flex flex-wrap items-center gap-2 font-body text-body-md text-body">
            {crumbs.map((crumb, i) => (
              <li key={i} className="flex items-center gap-2">
                {i > 0 && (
                  <svg className="w-3 h-3 text-body" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                )}
                {crumb.href ? (
                  <Link href={crumb.href} className="text-teal hover:underline">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-ink font-semibold" aria-current="page">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="font-display text-headline-lg text-ink leading-tight">{title}</h1>
            {description && (
              <p className="mt-3 font-body text-body-lg text-body max-w-2xl">{description}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
