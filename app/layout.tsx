import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Make your websites look 10x better',
  description: 'Beautiful UI components built with React and Framer Motion',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap" rel="stylesheet" />
      </head>
      <body className="overflow-x-hidden bg-black text-white font-bricolage">
        {children}
      </body>
    </html>
  )
}