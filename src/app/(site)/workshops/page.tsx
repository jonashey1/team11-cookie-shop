
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import { ButtonLink } from '@/components/site/ButtonLink'
import { PageTitle } from '@/components/site/PageTitle'
import { WorkshopCard } from '@/components/site/WorkshopCard'
import { COOKIES } from '@/content/cookies'
import config from '@/payload.config'

export const metadata: Metadata = {
  title: 'Our Cookies',
  description:
    'Discover our delicious cookie selection, explore your favourite flavours and learn about our cookie workshops.',
}

export const dynamic = 'force-dynamic'

export default async function CookiesPage() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'workshops',
    depth: 1,
    limit: 100,
    sort: 'title',
  })

  const workshops = result.docs

  return (
    <div className="pb-6">
      <PageTitle
        title="Our Cookies"
        intro="Discover our cookie collection! Explore different flavours, compare your favourites and find the perfect sweet treat."
        tone="purple"
      />

      <section
        id="cookies"
        aria-labelledby="cookies-heading"
        className="grid scroll-mt-24 gap-block"
      >
        <div className="grid gap-2">
          <h2 id="cookies-heading" className="text-2xl">
            Discover Our Flavours
          </h2>

          <p>
            From classic chocolate chip to exciting new combinations,
            there is a cookie for everyone.
          </p>
        </div>

        <ul className="grid gap-block md:grid-cols-2 lg:grid-cols-3">
          {COOKIES.map((cookie) => (
            <li
              key={cookie.id}
              className="framed grid content-start gap-4 p-6 offset-purple"
            >
              <div
                className="flex h-36 items-center justify-center rounded-xl bg-mint-wash text-6xl"
                aria-hidden="true"
              >
                {cookie.emoji}
              </div>

              <div className="grid gap-2">
                <p className="text-sm font-semibold text-ink-soft">
                  {cookie.flavour}
                </p>

                <h3 className="text-xl">{cookie.name}</h3>

                <p>{cookie.description}</p>
              </div>

              <div className="mt-auto grid gap-3 pt-3">
                <p className="text-xl font-bold">
                  {new Intl.NumberFormat('en-BE', {
                    style: 'currency',
                    currency: 'EUR',
                  }).format(cookie.price / 100)}
                </p>

                <p className="text-sm text-ink-soft">
                  Available for fictional test orders; no payment is taken.
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="ordering-heading"
        className="mt-12 grid gap-4 rounded-panel bg-mint-wash p-6 sm:p-10"
      >
        <h2 id="ordering-heading" className="text-2xl">
          Ready to Order?
        </h2>

        <p className="max-w-[65ch]">
          Choose your favourite cookies, select quantities and submit
          a fictional test order. No real purchases or payments are accepted.
        </p>

        <ButtonLink
          href="/clinics"
          variant="secondary"
          className="w-fit"
        >
          Order Cookies
        </ButtonLink>
      </section>

      <section
        id="workshops"
        aria-labelledby="workshops-heading"
        className="mt-12 grid scroll-mt-24 gap-block"
      >
        <div className="grid gap-2">
          <h2 id="workshops-heading" className="text-2xl">
            Cookie Workshops
          </h2>

          <p className="max-w-[70ch]">
            Explore our fictional cookie workshops for this student
            project. Discover baking techniques, creative decoration
            and delicious chocolate combinations. These workshops
            are demonstrations only and cannot be booked.
          </p>
        </div>

        {workshops.length > 0 ? (
          <ul className="grid gap-block md:grid-cols-2">
            {workshops.map((workshop) => (
              <li key={workshop.id}>
                <WorkshopCard workshop={workshop} />
              </li>
            ))}
          </ul>
        ) : (
          <p>No cookie workshops are available at the moment.</p>
        )}
      </section>
    </div>
  )
}
