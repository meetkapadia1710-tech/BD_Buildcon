/** Generates a BreadcrumbList JSON-LD object for inner pages. */
export function breadcrumbJsonLd(crumbs: Array<{ name: string; url: string }>): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bdbuildcon.com' },
      ...crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: c.name,
        item: c.url,
      })),
    ],
  }
}

/** Generates a Service JSON-LD object. */
export function serviceJsonLd(opts: { name: string; description: string; url: string }): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    provider: { '@id': 'https://bdbuildcon.com/#organization' },
    name: opts.name,
    description: opts.description,
    url: opts.url,
    areaServed: { '@type': 'Country', name: 'India' },
    serviceType: 'Industrial EPC Contracting',
  }
}

/** Generates a FAQPage JSON-LD object. */
export function faqJsonLd(faqs: Array<{ question: string; answer: string }>): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }
}

/** Generates Review JSON-LD objects for organization testimonials. */
export function reviewJsonLd(
  reviews: Array<{ name: string; title?: string; quote: string }>,
): Record<string, unknown>[] {
  return reviews.map((r) => ({
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: { '@id': 'https://bdbuildcon.com/#organization' },
    author: {
      '@type': 'Person',
      name: r.name,
      ...(r.title ? { jobTitle: r.title } : {}),
    },
    reviewBody: r.quote,
  }))
}
