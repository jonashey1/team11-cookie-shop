
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Hanken_Grotesk } from 'next/font/google'
import type { ReactNode } from 'react'
import { Footer } from '@/components/site/Footer'
import { Header } from '@/components/site/Header'
import './globals.css'

// Main font used throughout the Cookie Shop website.
const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hanken-grotesk',
})

// Website metadata for search engines and browser tabs.
export const metadata: Metadata = {
  title: {
    default: 'Cookie Shop',
    template: '%s - Cookie Shop',
  },
  description:
    'Discover delicious cookies, explore different flavours and find your favourite treats. Cookie Shop is a fictional online cookie store developed by Team 11 at Ghent University.',
  applicationName: 'Cookie Shop',
  keywords: [
    'Cookie Shop',
    'cookies',
    'chocolate chip cookies',
    'online cookie store',
    'Team 11',
    'Ghent University',
  ],
}

export default function SiteLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className={hanken.variable}>
      <body className="flex min-h-screen flex-col">
        <Header />

        <main
          id="main"
          tabIndex={-1}
          className="mx-auto w-full max-w-page flex-1 px-gutter focus:outline-none"
        >
          {children}
        </main>

        <Footer />

        {process.env.NEXT_PUBLIC_ANALYTICS === 'vercel' && (
          <Analytics />
        )}
      </body>
    </html>
  )
}
