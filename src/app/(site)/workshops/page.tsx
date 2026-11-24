
import type { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'
import { getPayload } from 'payload'
import { ButtonLink } from '@/components/site/ButtonLink'
import { PageTitle } from '@/components/site/PageTitle'
import { WorkshopCard } from '@/components/site/WorkshopCard'
import { COOKIES, type CookieProduct } from '@/content/cookies'
import { cookieImage } from '@/lib/workshop-image'
import { AddCookieToBasket } from '@/components/site/AddCookieToBasket'
import { CompareCookieButton, ComparisonTray } from '@/components/site/CookieComparisonControls'
import config from '@/payload.config'

export const metadata: Metadata = {
  title: 'Our Cookies',
  description:
    'Discover our delicious cookie selection, explore your favourite flavours and learn about our cookie workshops.',
}

export const dynamic = 'force-dynamic'

const tastingNotes = {
  1: 'The one that started it all.',
  2: 'For the serious chocolate lover.',
  3: 'A softer kind of indulgence.',
  4: 'A little different, in a good way.',
  5: 'Sweet meets salty.',
  6: 'A familiar favourite with a twist.',
} satisfies Record<CookieProduct['id'], string>

const accents = {
  1: 'border-t-brand',
  2: 'border-t-ink-soft',
  3: 'border-t-line',
  4: 'border-t-coral',
  5: 'border-t-yellow',
  6: 'border-t-purple',
} satisfies Record<CookieProduct['id'], string>

export default function CookiesPage() {

  return (
    <div className="pb-block">
      <PageTitle
        title="Our Cookies"
        intro="Six flavours, from chocolate classics to sweet-and-salty caramel. Compare them side by side or choose four for your own box."
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

        <div><ButtonLink href="/build-your-box" variant="secondary">Build a cookie box</ButtonLink></div>
        <ComparisonTray />
        <ul className="grid gap-block sm:grid-cols-2 lg:grid-cols-3">
          {COOKIES.map((cookie) => {
            const image = cookieImage(cookie.name)

            return (
              <li
                key={cookie.id}
                className={`flex min-w-0 flex-col gap-stack rounded-frame border border-line border-t-4 bg-canvas p-3 sm:p-4 ${accents[cookie.id]}`}
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

                  <p className="font-heading italic text-ink-soft">{tastingNotes[cookie.id]}</p><p>{cookie.description}</p>
                </div>

                <div className="mt-auto grid gap-2 border-t border-line pt-stack">
                  <p className="font-heading text-xl font-bold tabular-nums">
                    {new Intl.NumberFormat('en-BE', {
                      style: 'currency',
                      currency: 'EUR',
                    }).format(cookie.price / 100)}
                  </p>

                  <div className="flex flex-wrap items-start gap-2">
                    <CompareCookieButton cookie={cookie} />
                    <AddCookieToBasket cookie={cookie} />
                  </div>
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

        <Suspense fallback={<p role="status">Loading cookie workshops…</p>}>
          <WorkshopCatalogue />
        </Suspense>
      </section>
    </div>
  )
}

async function WorkshopCatalogue() {
  const payload = await getPayload({ config })
  const { docs: workshops } = await payload.find({
    collection: 'workshops',
    depth: 1,
    limit: 100,
    sort: 'title',
  })

  if (!workshops.length) return <p>No cookie workshops are available at the moment.</p>

  return (
    <ul className="grid gap-block md:grid-cols-2">
      {workshops.map((workshop) => (
        <li key={workshop.id} className="grid min-w-0">
          <WorkshopCard workshop={workshop} />
        </li>
      ))}
    </ul>
  )
}
