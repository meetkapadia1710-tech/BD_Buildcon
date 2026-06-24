import { MetadataRoute } from 'next'
import { projects } from '@/content/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://bdbuildcon.com'

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/why-us`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/safety-quality`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${base}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...projectRoutes]
}
