import type { Metadata } from 'next'
import { CookieOrderForm } from '@/components/site/CookieOrderForm'
import { PageTitle } from '@/components/site/PageTitle'

export const metadata: Metadata = {
  title: 'Order Cookies',
  description: 'Choose your favourite cookies and place a test order. No online payment.',
}

export default function OrderCookiesPage() {
  return (
    <div className="grid gap-section pb-6">
      <PageTitle
        title="Order Cookies"
        intro="Choose your favourites, review your basket and send a test order. No online payment required."
        tone="purple"
      />
      <CookieOrderForm />
    </div>
  )
}
