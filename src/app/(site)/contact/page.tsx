
import type { Metadata } from 'next'
import { ArtisanPhotoFigure } from '@/components/site/ArtisanPhotoFigure'
import { artisanPhotography } from '@/content/artisan-photography'
import { ButtonLink } from '@/components/site/ButtonLink'
import { PageTitle } from '@/components/site/PageTitle'
import { ContactFaq } from '@/components/site/ContactFaq'
import { OptionalGhentMap } from '@/components/site/OptionalGhentMap'

export const metadata: Metadata = {
  alternates: { canonical: "https://team11-cookie-shop.vercel.app/contact" },
  title: 'Contact & FAQ',
  description:
    'Get in touch with Cookie Shop and learn more about our university project.',
}

export default function ContactPage() {
  const photo = artisanPhotography.contactCounter

  return (
    <div className="grid gap-section pb-block">
      <PageTitle
        title="Contact & FAQ"
        intro="Have a question about Cookie Shop, our cookies or our website? Find out more about our project below."
        tone="blue"
        className="mb-0 border border-line"
      />

      <section aria-labelledby="get-in-touch" className="boutique-story grid gap-4">
        <div className="grid content-start gap-4">
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
        </div>
        {photo && <ArtisanPhotoFigure photo={photo} sizes="(min-width: 80rem) 35rem, (min-width: 52rem) 48vw, 88vw" />}
      </section>

      <section aria-labelledby="contact-info" className="boutique-editorial grid gap-block">
        <h2 id="contact-info" className="text-2xl">
          Information
        </h2>

        <div className="grid gap-block md:grid-cols-2">
          <div className="grid content-start gap-stack border-t-2 border-brand bg-blue-tint p-4 sm:p-6">
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

          <div className="grid content-start gap-stack border-t-2 border-brand bg-blue-tint p-4 sm:p-6">
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

      <section id="faq" tabIndex={-1} aria-label="Frequently asked questions" className="scroll-mt-24">
        <ContactFaq />
      </section>

      <section aria-labelledby="explore" className="grid gap-4">
        <h2 id="explore" className="text-2xl">
          Explore Our Cookies
        </h2>

        <p>
          Curious about our selection? Discover our
          cookie flavours and find your favourite.
        </p>

        <ButtonLink href="/cookies" className="w-fit">
          View Our Cookies
        </ButtonLink>
      </section>
    </div>
  )
}
