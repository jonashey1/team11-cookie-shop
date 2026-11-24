import type { Metadata } from 'next'
import { ButtonLink } from '@/components/site/ButtonLink'
import { PageTitle } from '@/components/site/PageTitle'

// The address the order form switches to once the server has saved an order. The receipt itself is
// shown by the order form, without leaving the page; this address exists so that the saved order is
// counted as a page view in Vercel Web Analytics. A user only lands on this file when they reload or
// reopen that address later, and then the receipt is no longer in the browser, so it says so.
export const metadata: Metadata = {
  title: 'Test order confirmed',
  robots: { index: false },
}

export default function OrderConfirmedPage() {
  return (
    <div className="grid gap-block pb-block">
      <PageTitle
        title="Test order confirmed"
        intro="Your receipt was shown right after you placed your test order. It is not kept in your browser, so it cannot be shown again here."
        tone="blue"
        className="mb-0 border border-line"
      />
      <p className="max-w-reading">
        Cookie Shop is a fictional student project: no payment was taken and nothing will be delivered.
      </p>
      <ButtonLink href="/clinics" className="w-fit">Order more cookies</ButtonLink>
    </div>
  )
}
