
import type { Metadata } from 'next'
import Image from 'next/image'
import { getPayload } from 'payload'
import { ButtonLink } from '@/components/site/ButtonLink'
import { PageTitle } from '@/components/site/PageTitle'
import { WorkshopCard } from '@/components/site/WorkshopCard'
import { COOKIES } from '@/content/cookies'
import { COOKIE_IMAGES } from '@/lib/workshop-image'
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
    <div className="pb-block">
      <PageTitle
        title="Our Cookies"
        intro="Discover our cookie collection! Explore different flavours, compare your favourites and find the perfect sweet treat."
        tone="blue"
        className="border border-line"
      >
        <nav aria-label="On this page" className="flex flex-wrap gap-stack">
          <ButtonLink href="/workshops#cookies" variant="secondary" size="sm" className="min-h-11">
            Discover Our Flavours
          </ButtonLink>
          <ButtonLink href="/workshops#workshops" variant="secondary" size="sm" className="min-h-11">
            Cookie Workshops
          </ButtonLink>
        </nav>
      </PageTitle>

      <section
        id="cookies"
        aria-labelledby="cookies-heading"
        className="grid scroll-mt-24 gap-block"
      >
        <div className="grid max-w-reading gap-stack">
          <h2 id="cookies-heading" className="text-3xl">
            Discover Our Flavours
          </h2>

          <p>
            From classic chocolate chip to exciting new combinations,
            there is a cookie for everyone.
          </p>
        </div>

        <ul className="grid gap-block sm:grid-cols-2 lg:grid-cols-3">
          {COOKIES.map((cookie) => {
            const image = COOKIE_IMAGES[cookie.name.toLowerCase().replace(' & ', ' and ').replaceAll(' ', '-')]

            return (
              <li
                key={cookie.id}
                className="flex flex-col gap-stack rounded-panel border border-line bg-blue-tint p-5"
              >
                {image && (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-frame bg-yellow-wash">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 80rem) 21rem, (min-width: 64rem) 28vw, (min-width: 40rem) 42vw, 88vw"
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="grid content-start gap-2">
                  <p className="text-sm font-semibold text-ink-soft">
                    {cookie.flavour}
                  </p>

                  <h3 className="text-xl">{cookie.name}</h3>

                  <p>{cookie.description}</p>
                </div>

                <div className="mt-auto grid gap-2 border-t border-line pt-stack">
                  <p className="font-heading text-xl font-bold tabular-nums">
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
            )
          })}
        </ul>
      </section>

      <section
        aria-labelledby="ordering-heading"
        className="mt-section grid justify-items-start gap-stack rounded-panel border border-line bg-yellow-wash p-6 sm:p-block"
      >
        <h2 id="ordering-heading" className="text-3xl">
          Ready to Order?
        </h2>

        <p className="max-w-reading text-ink-soft">
          Choose your favourite cookies, select quantities and submit
          a fictional test order. No real purchases or payments are accepted.
        </p>

        <ButtonLink
          href="/clinics"
          className="w-fit max-w-full whitespace-normal text-center"
        >
          Order Cookies
        </ButtonLink>
      </section>

      <section
        id="workshops"
        aria-labelledby="workshops-heading"
        className="mt-section grid scroll-mt-24 gap-block border-t border-line pt-block"
      >
        <div className="grid max-w-reading gap-stack">
          <h2 id="workshops-heading" className="text-3xl">
            Cookie Workshops
          </h2>

          <p className="max-w-reading text-ink-soft">
            Explore our fictional cookie workshops for this student
            project. Discover baking techniques, creative decoration
            and delicious chocolate combinations. These workshops
            are demonstrations only and cannot be booked.
          </p>
        </div>

        {workshops.length > 0 ? (
          <ul className="grid gap-block md:grid-cols-2">
            {workshops.map((workshop) => (
              <li key={workshop.id} className="grid min-w-0">
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
