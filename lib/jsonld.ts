/**
 * Serialises JSON-LD for injection via dangerouslySetInnerHTML.
 *
 * JSON.stringify does not escape `<`, so a content string containing `</script>`
 * would close the tag early and let the rest be parsed as HTML. Escaping `<` as
 * the < unicode escape keeps the JSON semantically identical (parsers decode
 * it back) while making tag-breakout impossible. Also escapes U+2028/U+2029,
 * which are literal newlines to a JS parser.
 *
 * Use this instead of JSON.stringify for every ld+json block.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(
    /[<\u2028\u2029]/g,
    (ch) => '\\u' + ch.charCodeAt(0).toString(16).padStart(4, '0'),
  )
}

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
