
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Hanken_Grotesk } from 'next/font/google'
import type { ReactNode } from 'react'
import { Footer } from '@/components/site/Footer'
import { Header } from '@/components/site/Header'
import { FortuneCookiePopup } from '@/components/site/FortuneCookiePopup'
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

// Apply the saved theme before the page becomes visible.
const themeScript = `
(function () {
  try {
    var savedTheme = localStorage.getItem('cookie-shop-theme');
    var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var dark = savedTheme === 'dark' ||
      (savedTheme !== 'light' && systemDark);

    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
  } catch (error) {
    // The website remains usable if localStorage is unavailable.
  }
})();
`

export default function SiteLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html
      lang="en"
      className={hanken.variable}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
      </head>

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

        <FortuneCookiePopup />

        {process.env.NEXT_PUBLIC_ANALYTICS === 'vercel' && (
          <Analytics />
        )}
      </body>
    </html>
  )
}
