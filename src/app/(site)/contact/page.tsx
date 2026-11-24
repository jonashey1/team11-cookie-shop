
import type { Metadata } from 'next'
import { ButtonLink } from '@/components/site/ButtonLink'
import { PageTitle } from '@/components/site/PageTitle'
import { OptionalGhentMap } from '@/components/site/OptionalGhentMap'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Cookie Shop and learn more about our university project.',
}

export default function ContactPage() {
  return (
    <div className="grid gap-section pb-block">
      <PageTitle
        title="Contact Us"
        intro="Have a question about Cookie Shop, our cookies or our website? Find out more about our project below."
        tone="blue"
        className="mb-0 border border-line"
      />

      <section aria-labelledby="get-in-touch" className="grid gap-4">
        <h2 id="get-in-touch" className="text-2xl">
          Get in Touch
        </h2>

        <p className="max-w-reading text-ink-soft">
          Welcome to Cookie Shop! We are developing a fictional
          online cookie store as part of a university project.
          Our goal is to make discovering and ordering cookies
          simple, clear and enjoyable.
        </p>

        <p className="max-w-reading text-ink-soft">
          This is a demonstration website, so we do not currently
          offer customer support or accept real orders.
        </p>
      </section>

      <section aria-labelledby="contact-info" className="grid gap-block">
        <h2 id="contact-info" className="text-2xl">
          Information
        </h2>

        <div className="grid gap-block md:grid-cols-2">
          <div className="grid content-start gap-stack rounded-panel border border-line bg-blue-tint p-6">
            <h3 className="text-xl">Our Project</h3>
            <p>
              Cookie Shop is created by Team 11 for a web
              development course at Ghent University.
            </p>
            <p>
              Our website is designed to demonstrate how an
              online cookie store can work.
            </p>
          </div>

          <div className="grid content-start gap-stack rounded-panel border border-line bg-blue-tint p-6">
            <h3 className="text-xl">Online Orders</h3>
            <p>
              Our test-order form is available on the Order Cookies page.
            </p>
            <p>
              You can submit fictional orders using made-up details. No real purchases or payments are processed.
            </p>
          </div>
        </div>
      </section>

      <OptionalGhentMap />

      <section
        aria-labelledby="faq"
        className="grid gap-stack rounded-panel border border-line bg-yellow-wash p-6 sm:p-block"
      >
        <h2 id="faq" className="text-2xl">
          Frequently Asked Questions
        </h2>

        <div className="grid gap-5">
          <div className="grid gap-2">
            <h3 className="text-lg">
              Can I order cookies online?
            </h3>
            <p>
              Yes, you can place a fictional test order through the Order Cookies page. No real orders or payments are accepted.
            </p>
          </div>

          <div className="grid gap-2">
            <h3 className="text-lg">
              Are the cookies real products?
            </h3>
            <p>
              No. The cookies and prices displayed on this
              website are examples for our university project.
            </p>
          </div>

          <div className="grid gap-2">
            <h3 className="text-lg">
              Do I need to pay online?
            </h3>
            <p>
              No. Our planned ordering system does not
              require online payment.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="explore" className="grid gap-4">
        <h2 id="explore" className="text-2xl">
          Explore Our Cookies
        </h2>

        <p>
          Curious about our selection? Discover our
          cookie flavours and find your favourite.
        </p>

        <ButtonLink href="/workshops" className="w-fit">
          View Our Cookies
        </ButtonLink>
      </section>
    </div>
  )
}
