
import { Analytics } from '@vercel/analytics/next'
import type { Metadata } from 'next'
import { Hanken_Grotesk } from 'next/font/google'
import Script from 'next/script'
import type { ReactNode } from 'react'
import { Footer } from '@/components/site/Footer'
import { Header } from '@/components/site/Header'
import { FloatingOrderButton } from '@/components/site/FloatingOrderButton'
import { FortuneCookiePopup } from '@/components/site/FortuneCookiePopup'
import { OrderBasketProvider } from '@/components/site/OrderBasket'
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
    <html
      lang="en"
      className={hanken.variable}
      suppressHydrationWarning
    >
      <head>
        {/* Apply the saved theme before the page becomes visible. */}
        <script id="cookie-shop-theme" src="/cookie-shop-theme.js" async blocking="render" />
      </head>

      <body className="flex min-h-screen flex-col">
        <OrderBasketProvider>
          <Header />
          <FloatingOrderButton />

          <main
            id="main"
            tabIndex={-1}
            className="mx-auto w-full max-w-page flex-1 px-gutter pb-28 focus:outline-none sm:pb-24 lg:pb-0"
          >
            {children}
          </main>

          <Footer />
        </OrderBasketProvider>

        <FortuneCookiePopup />

        {/* Optional creative enhancement: Watermelon AI Cookie Assistant. */}
        <Script
          id="watermelon-chatbot"
          src="https://chatwidget-prod.web.app/embed/init.iife.js"
          strategy="afterInteractive"
          type="module"
          data-watermelon-widget-id="E8AgMVf16MQ"
          data-watermelon-settings-id="18166"
        />

        <Analytics />
      </body>
    </html>
  )
}
