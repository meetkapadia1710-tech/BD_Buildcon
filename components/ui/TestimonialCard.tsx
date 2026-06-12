import type { Testimonial } from '@/content/testimonials'

type Props = {
  testimonial: Testimonial
}

export function TestimonialCard({ testimonial }: Props) {
  return (
    <figure className="card p-8 flex flex-col gap-6">
      {/* Quote mark */}
      <svg
        className="w-10 h-10 text-teal opacity-30"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
      </svg>

      <blockquote>
        <p className="font-body text-body-lg text-body leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
      </blockquote>

      <figcaption className="flex items-center gap-4 mt-auto pt-4 border-t border-hairline">
        {/* Avatar initials */}
        <div className="w-10 h-10 rounded-full bg-teal/10 border border-teal/20 flex items-center justify-center shrink-0">
          <span className="font-display font-bold text-teal text-sm">
            {testimonial.companyShort.slice(0, 2).toUpperCase()}
          </span>
        </div>
        <div>
          <div className="font-body font-semibold text-ink text-body-md">{testimonial.name}</div>
          <div className="font-body text-body-md text-body">{testimonial.company}</div>
        </div>
      </figcaption>
    </figure>
  )
}
