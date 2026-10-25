/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'aceternity.com'],
  },
  poweredByHeader: false,
  experimental: {
    // headless Chrome for the website check screenshots
    // and the Claude SDK, whose regexes the minifier would break
    serverComponentsExternalPackages: ['@sparticuz/chromium', 'puppeteer-core', '@anthropic-ai/sdk'],
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
        ],
      },
    ]
  },
}

module.exports = nextConfig
