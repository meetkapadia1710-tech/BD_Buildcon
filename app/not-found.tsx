import Link from 'next/link'
import { FadeRise } from '@/components/motion/FadeRise'

export default function NotFound() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-white px-6">
      <div className="texture-dots pointer-events-none absolute inset-0 text-teal/[0.05]" aria-hidden="true" />
      <FadeRise className="relative max-w-xl text-center" stagger={0.1}>
        {/* Big 404 */}
        <div
          className="font-display font-extrabold text-[120px] lg:text-[160px] text-teal/10 leading-none select-none mb-4"
          aria-hidden="true"
        >
          404
        </div>

        {/* Hard hat icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center mb-6 -mt-8">
          <svg
            className="w-8 h-8 text-teal"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v11m0 0H5m4 0h10M5 14v5a2 2 0 002 2h10a2 2 0 002-2v-5"
            />
          </svg>
        </div>

        <h1 className="font-display text-headline-lg text-ink mb-4">Page not found.</h1>
        <p className="font-body text-body-lg text-body mb-10 leading-relaxed">
          The page you are looking for may have been moved or doesn&apos;t exist. Let us help you find what you need.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary text-sm">
            Return Home
          </Link>
          <Link href="/contact" className="btn-ghost text-sm">
            Contact Us
          </Link>
        </div>
      </FadeRise>
    </section>
  )
}
