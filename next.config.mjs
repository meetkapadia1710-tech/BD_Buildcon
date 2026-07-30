/** @type {import('next').NextConfig} */
const securityHeaders = [
  // Prevent clickjacking — allow same-origin embeds (e.g. our own iframes) but block third-party framing
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Prevent MIME-type sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Control referrer information sent to third parties
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Disable unused browser features
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
  // HSTS — tells browsers to always use HTTPS (2 years; submit to preload list after domain is stable)
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  // Legacy XSS filter (belt-and-suspenders for older browsers)
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  // Partial CSP. Deliberately omits script-src/style-src: the JSON-LD blocks are
  // inline, and these pages are statically generated, so a nonce-based policy would
  // need middleware + dynamic rendering. The directives below are the ones that add
  // real protection with zero breakage risk on a static site.
  //   object-src      — kill Flash/legacy plugin embedding
  //   base-uri        — stop injected <base> tags redirecting relative URLs
  //   frame-ancestors — clickjacking (the modern X-Frame-Options)
  //   form-action     — forms can only submit to our own origin (/api/contact)
  // Not set: upgrade-insecure-requests, which would rewrite the employee-area ERP
  // link (an http-only host) and break it.
  {
    key: 'Content-Security-Policy',
    value: ["object-src 'none'", "base-uri 'self'", "frame-ancestors 'self'", "form-action 'self'"].join('; '),
  },
]

const nextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  images: {
    formats: ['image/avif', 'image/webp'],
    // No remotePatterns: every image is served from public/. Re-add a specific
    // hostname here only when a genuinely remote image is introduced — each entry
    // is an origin the image optimizer will fetch and proxy on request.
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        // Apply security headers to every route
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig
