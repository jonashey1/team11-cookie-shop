import type { Metadata } from 'next'
import { ButtonLink } from '@/components/site/ButtonLink'
import { CookieBoxBuilder } from '@/components/site/CookieBoxBuilder'
import { CookieOrderForm } from '@/components/site/CookieOrderForm'
import { PageTitle } from '@/components/site/PageTitle'

export const metadata: Metadata = {
  title: 'Order Cookies',
  description: 'Choose your favourite cookies or build a four-cookie box, and place a test order. No online payment.',
}

// Ordering has two ways in: single cookies with the + buttons, or a four-cookie box. Both fill the
// same basket, so the Box Builder is a section of this page (the old /build-your-box redirects here).
export default function OrderCookiesPage() {
  return (
    <div className="grid gap-block pb-block">
      <PageTitle
        title="Order Cookies"
        intro="Choose your favourites, review your basket and send a test order. No online payment required."
        tone="blue"
        className="mb-0 border border-line"
      >
        <nav aria-label="On this page" className="flex flex-wrap gap-3">
          <ButtonLink href="#build-your-box" variant="secondary" size="sm">Build a four-cookie box</ButtonLink>
        </nav>
      </PageTitle>
      <CookieOrderForm />
      <section id="build-your-box" tabIndex={-1} aria-labelledby="build-your-box-title" className="grid scroll-mt-24 gap-stack">
        <h2 id="build-your-box-title">Build Your Own Cookie Box</h2>
        <p>Choose any four cookies to create your perfect box. The box goes into the same basket.</p>
        <CookieBoxBuilder />
      </section>
    </div>
  )
}
