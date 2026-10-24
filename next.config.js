/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'aceternity.com'],
  },
  poweredByHeader: false,
  // trial: the "Dimensiuni" page (public/d) is the home page; remove to bring back the app shell
  async rewrites() {
    return { beforeFiles: [{ source: '/', destination: '/d/index.html' }] }
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
