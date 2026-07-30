import type { Metadata } from 'next'

/**
 * page.tsx is a client component and so cannot export metadata itself. Without
 * this, the page inherited the root layout's canonical (the homepage) and relied
 * on robots.txt alone — which stops crawling, not indexing, if the URL is ever
 * linked from elsewhere. The noindex directive is the part that actually keeps
 * a confirmation page out of search results.
 */
export const metadata: Metadata = {
  title: 'Thank You',
  description: 'Your enquiry has been received. The BD Buildcon team will be in touch shortly.',
  alternates: { canonical: 'https://bdbuildcon.com/thank-you' },
  robots: { index: false, follow: false },
}

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
