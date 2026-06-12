type Props = {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionHeading({ title, subtitle, centered = true, className = '' }: Props) {
  return (
    <div className={`mb-12 lg:mb-16 ${centered ? 'text-center' : ''} ${className}`}>
      <h2 className="font-display text-headline-lg text-ink">{title}</h2>
      <span className={`teal-rule ${centered ? 'mx-auto' : ''}`} />
      {subtitle && (
        <p className="mt-4 font-body text-body-lg text-body max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  )
}
