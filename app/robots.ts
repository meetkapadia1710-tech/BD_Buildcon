import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/employee-area', '/api/', '/thank-you'],
    },
    sitemap: 'https://bdbuildcon.com/sitemap.xml',
  }
}
