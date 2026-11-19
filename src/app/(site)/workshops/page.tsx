
import type { Metadata } from 'next'
import { ButtonLink } from '@/components/site/ButtonLink'
import { PageTitle } from '@/components/site/PageTitle'

export const metadata: Metadata = {
  title: 'Our Cookies',
  description:
    'Discover our delicious cookie selection and explore your favourite flavours.',
}

const cookies = [
  {
    id: 1,
    name: 'Classic Chocolate Chip',
    description:
      'A classic cookie filled with delicious chocolate chips. Perfect for chocolate lovers.',
    flavour: 'Chocolate',
    price: '€3.50',
    emoji: '🍪',
  },
  {
    id: 2,
    name: 'Double Chocolate',
    description:
      'A rich chocolate cookie with extra chocolate pieces for an intense chocolate experience.',
    flavour: 'Chocolate',
    price: '€3.95',
    emoji: '🍫',
  },
  {
    id: 3,
    name: 'White Chocolate',
    description:
      'A sweet cookie with creamy white chocolate pieces and a soft centre.',
    flavour: 'White Chocolate',
    price: '€3.75',
    emoji: '🍪',
  },
  {
    id: 4,
    name: 'Red Velvet',
    description:
      'A delicious red velvet cookie with a smooth and sweet flavour.',
    flavour: 'Red Velvet',
    price: '€3.95',
    emoji: '❤️',
  },
  {
    id: 5,
    name: 'Salted Caramel',
    description:
      'The perfect combination of sweet caramel and a touch of sea salt.',
    flavour: 'Caramel',
    price: '€3.95',
    emoji: '🍯',
  },
  {
    id: 6,
    name: 'Cookies & Cream',
    description:
      'A tasty cookie inspired by the classic combination of cookies and cream.',
    flavour: 'Cookies & Cream',
    price: '€3.95',
    emoji: '🍪',
  },
]

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
          {cookies.map((cookie) => (
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

        <ButtonLink href="/" variant="secondary" className="w-fit">
          Back to Home
        </ButtonLink>
      </section>
    </div>
  )
}
