
import type { Metadata } from 'next'
import Image from 'next/image'
import { ButtonLink } from '@/components/site/ButtonLink'
import { PageTitle } from '@/components/site/PageTitle'
import { CookieTasteMap } from '@/components/site/CookieTasteMap'
import { COOKIES, type CookieProduct } from '@/content/cookies'
import { cookieImage } from '@/lib/workshop-image'
import { AddCookieToBasket } from '@/components/site/AddCookieToBasket'
import { CompareCookieButton, ComparisonTray } from '@/components/site/CookieComparisonControls'

export const metadata: Metadata = {
  title: 'Our Cookies',
  description:
    'Discover our delicious cookie selection, explore your favourite flavours.',
}

const tastingNotes = {
  1: 'The one that started it all.',
  2: 'For the serious chocolate lover.',
  3: 'A softer kind of indulgence.',
  4: 'A little different, in a good way.',
  5: 'Sweet meets salty.',
  6: 'A familiar favourite with a twist.',
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
          <ButtonLink href="#cookies" variant="secondary" size="sm" className="min-h-11">
            Discover Our Flavours
          </ButtonLink>
          <ButtonLink href="/workshops" size="sm" className="min-h-11">
            Explore our workshops
          </ButtonLink>
          <ButtonLink href="#taste-map" variant="secondary" size="sm">Taste Map</ButtonLink>
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
          <nav aria-label="Jump to a cookie flavour">
            <ul className="flex flex-wrap gap-2">
              {COOKIES.map((cookie) => (
                <li key={cookie.id}>
                  <a
                    href={`#cookie-${cookie.id}`}
                    className="inline-flex min-h-11 items-center rounded-panel border border-line px-3 py-2 text-sm font-semibold underline underline-offset-4"
                  >
                    {cookie.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <ul className="boutique-assortment">
          {COOKIES.map((cookie) => {
            const image = cookieImage(cookie.name)

            return (
              <li
                key={cookie.id}
                id={`cookie-${cookie.id}`}
                tabIndex={-1}
                data-flavour={cookie.id}
                className="boutique-product scroll-mt-24"
              >
                {image && (
                  <div className="boutique-product-art relative overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(min-width: 80rem) 31rem, (min-width: 48rem) 45vw, 88vw"
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="boutique-product-copy grid content-start gap-2">
                  <p className="text-sm font-semibold text-ink-soft">
                    {cookie.flavour}
                  </p>

                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="text-xl">{cookie.name}</h3>
                    <p className="font-heading text-xl font-bold tabular-nums">
                      {new Intl.NumberFormat('en-BE', {
                        style: 'currency',
                        currency: 'EUR',
                      }).format(cookie.price / 100)}
                    </p>
                  </div>

                  <p className="font-heading italic text-ink-soft">{tastingNotes[cookie.id]}</p><p>{cookie.description}</p>
                </div>

                <div className="boutique-product-controls grid gap-2">
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
        <CookieTasteMap />
        <ComparisonTray />
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
        <ButtonLink href="/build-your-box" variant="secondary">Build a cookie box</ButtonLink>
      </section>

    </div>
  )
}
