import { MetadataRoute } from 'next'

// Note: llms.txt reference: https://bdbuildcon.com/llms.txt

const DISALLOW = ['/employee-area', '/api/', '/thank-you']

// Crawlers used by AI assistants / answer engines to index or ground responses.
const AI_CRAWLERS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'Amazonbot',
  'CCBot',
  'cohere-ai',
  'Meta-ExternalAgent',
  'Bytespider',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: DISALLOW },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/', disallow: DISALLOW })),
    ],
    sitemap: 'https://bdbuildcon.com/sitemap.xml',
  }
}
