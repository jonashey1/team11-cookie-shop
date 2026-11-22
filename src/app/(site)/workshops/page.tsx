
import type { Metadata } from 'next'
import { ButtonLink } from '@/components/site/ButtonLink'
import { PageTitle } from '@/components/site/PageTitle'
import { COOKIES } from '@/content/cookies'

export const metadata: Metadata = {
  title: 'Our Cookies',
  description:
    'Discover our delicious cookie selection and explore your favourite flavours.',
}

export default function CookiesPage() {
  return (
    <div className="pb-6">
      <PageTitle
        title="Our Cookies"
        intro="Discover our cookie collection! Explore different flavours, compare your favourites and find the perfect sweet treat."
        tone="purple"
      />

      <section
        aria-labelledby="cookies-heading"
        className="grid gap-block"
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
                <p className="text-xl font-bold">{cookie.price}</p>

                <p className="text-sm text-ink-soft">
                  Example product – online ordering coming soon.
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
          We are working on an easy online ordering experience.
          Soon, you will be able to select your favourite cookies,
          choose quantities and submit your order directly
          through our website.
        </p>

        <ButtonLink
          href="/"
          variant="secondary"
          className="w-fit"
        >
          Back to Home
        </ButtonLink>
      </section>
    </div>
  )
}
