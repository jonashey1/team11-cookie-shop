
import type { Metadata } from 'next'
import { ButtonLink } from '@/components/site/ButtonLink'
import { PageTitle } from '@/components/site/PageTitle'

export const metadata: Metadata = {
  title: 'Order Cookies',
  description:
    'Discover how to order your favourite cookies from Cookie Shop.',
}

export default function OrderCookiesPage() {
  return (
    <div className="grid gap-section pb-6">
      <PageTitle
        title="Order Cookies"
        intro="Your favourite cookies, just a few clicks away. Discover our selection and get ready for a simple online ordering experience."
        tone="coral"
      />

      <section aria-labelledby="how-it-works" className="grid gap-block">
        <h2 id="how-it-works" className="text-2xl">
          How Will Ordering Work?
        </h2>

        <p className="max-w-[65ch]">
          We are developing a simple ordering system that will allow
          you to choose your favourite cookies, select the quantities
          you want and submit your order online.
        </p>

        <div className="grid gap-block md:grid-cols-3">
          <div className="framed grid content-start gap-4 p-6 offset-purple">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-mint-wash text-xl font-bold">
              1
            </div>
            <h3 className="text-xl">Choose Your Cookies</h3>
            <p>
              Explore our cookie selection and discover the flavours
              you would like to order.
            </p>
          </div>

          <div className="framed grid content-start gap-4 p-6 offset-coral">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-mint-wash text-xl font-bold">
              2
            </div>
            <h3 className="text-xl">Select Quantities</h3>
            <p>
              Choose how many cookies you want and review your
              selection before submitting your order.
            </p>
          </div>

          <div className="framed grid content-start gap-4 p-6 offset-purple">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-mint-wash text-xl font-bold">
              3
            </div>
            <h3 className="text-xl">Submit Your Order</h3>
            <p>
              Enter the necessary details and submit your order
              through our website. No online payment is required.
            </p>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="order-status"
        className="grid gap-4 rounded-panel bg-mint-wash p-6 sm:p-10"
      >
        <h2 id="order-status" className="text-2xl">
          Online Ordering Is Coming Soon!
        </h2>

        <p className="max-w-[65ch]">
          Our online ordering system is currently under development.
          You cannot place an order yet, but you can already explore
          our example cookie collection.
        </p>

        <ButtonLink href="/workshops" className="w-fit">
          Explore Our Cookies
        </ButtonLink>
      </section>

      <section aria-labelledby="questions" className="grid gap-4">
        <h2 id="questions" className="text-2xl">
          Questions About Our Cookies?
        </h2>

        <p className="max-w-[65ch]">
          Want to learn more about our cookie shop? Visit our
          contact page for more information.
        </p>

        <ButtonLink href="/contact" variant="secondary" className="w-fit">
          Contact Us
        </ButtonLink>
      </section>
    </div>
  )
}
