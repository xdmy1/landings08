const dev = process.env.NODE_ENV !== 'production'
const preview = process.env.VERCEL_ENV === 'preview'

// what the pages may load: our own files, the Switzer font from Fontshare, images from
// anywhere over https (the website check shows other sites' screenshots), nothing in frames
const csp = [
  "default-src 'self'",
  // Next.js needs inline scripts; the dev server also needs eval, Vercel previews their toolbar
  `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval' https://va.vercel-scripts.com" : ''}${preview ? ' https://vercel.live' : ''}`,
  "style-src 'self' 'unsafe-inline' https://api.fontshare.com",
  "font-src 'self' data: https://cdn.fontshare.com",
  "img-src 'self' data: blob: https:",
  "media-src 'self'",
  `connect-src 'self'${dev ? ' ws: wss:' : ''}${preview ? ' https://vercel.live wss://*.pusher.com' : ''}`,
  `frame-src ${preview ? 'https://vercel.live' : "'none'"}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  ...(dev ? [] : ['upgrade-insecure-requests']),
].join('; ')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'aceternity.com'],
  },
  poweredByHeader: false,
  experimental: {
    // headless Chrome for the website check screenshots
    // and the Claude SDK, whose regexes the minifier would break
    // @vercel/blob ships undici, whose syntax this webpack can't parse: load it as is
    serverComponentsExternalPackages: ['@sparticuz/chromium', 'puppeteer-core', '@anthropic-ai/sdk', '@vercel/blob'],
    outputFileTracingIncludes: {
      '/api/audit/shots': ['./node_modules/@sparticuz/chromium/bin/**'],
      '/api/audit/pdf': ['./node_modules/@sparticuz/chromium/bin/**'],
    },
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
    ]
  },
}

module.exports = nextConfig
