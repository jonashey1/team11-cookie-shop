
import Image from 'next/image'
import { ButtonLink } from '@/components/site/ButtonLink'
import { Hero } from '@/components/site/Hero'

export default function HomePage() {
  return (
    <div className="grid gap-section pt-block">
      <Hero
        title="Welcome to Cookie Shop"
        text="Discover delicious cookies, explore our flavours and find your favourites. From classic chocolate chip to exciting new creations, there is something sweet for everyone."
        image={{
          src: '/images/workshops/classic-chocolate-chip.png',
          alt: 'Three classic chocolate chip cookies on a plate with baking ingredients.',
          width: 800,
          height: 1400,
        }}
        actions={
          <>
            <ButtonLink href="/clinics" size="lg" className="min-h-14 whitespace-normal text-center">
              Order Cookies
            </ButtonLink>
            <ButtonLink href="/workshops" variant="secondary" size="lg" className="min-h-14 whitespace-normal text-center">
              Explore Our Cookies
            </ButtonLink>
          </>
        }
      />

      <section aria-labelledby="discover" className="grid gap-block">
        <div className="grid max-w-reading gap-stack">
          <h2 id="discover" className="text-3xl">
            Discover Our Cookie Shop
          </h2>
          <p className="max-w-reading text-ink-soft">
            At Cookie Shop, we believe that every moment is better
            with a delicious cookie. Explore our selection, compare
            flavours and find the perfect treat for yourself or
            someone special.
          </p>
        </div>

        <div className="grid gap-block md:grid-cols-2">
          <div className="grid content-start gap-stack rounded-panel border border-line bg-blue-tint p-5 sm:p-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-frame bg-yellow-wash">
              <Image
                src="/images/workshops/double-chocolate.png"
                alt="Three double chocolate cookies on a plate with chocolate pieces."
                fill
                sizes="(min-width: 80rem) 34rem, (min-width: 48rem) 43vw, 88vw"
                className="object-cover"
              />
            </div>
            <h3 className="mt-2 text-xl">Explore Our Cookies</h3>
            <p>
              Discover our selection of cookies and learn more about
              the different flavours we offer. Find your favourite
              before placing an order.
            </p>
            <ButtonLink href="/workshops" className="w-fit max-w-full whitespace-normal text-center">
              View Our Cookies
            </ButtonLink>
          </div>

          <div className="grid content-start gap-stack rounded-panel border border-line bg-blue-tint p-5 sm:p-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-frame bg-yellow-wash">
              <Image
                src="/images/workshops/salted-caramel.png"
                alt="Three salted caramel cookies on a plate with caramel and baking ingredients."
                fill
                sizes="(min-width: 80rem) 34rem, (min-width: 48rem) 43vw, 88vw"
                className="object-cover"
              />
            </div>
            <h3 className="mt-2 text-xl">Order Your Favourite Cookies</h3>
            <p>
              Ready to choose your favourites? Select cookies, adjust quantities
              and submit a fictional test order. No payment is required.
            </p>
            <ButtonLink href="/clinics" className="w-fit max-w-full whitespace-normal text-center">
              Order Cookies
            </ButtonLink>
          </div>
        </div>
      </section>

      <section aria-labelledby="choose-your-way" className="grid gap-3 rounded-panel border border-line bg-yellow-wash p-5 sm:p-6">
        <h2 id="choose-your-way" className="text-2xl">Find your favourites</h2>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/cookie-finder" variant="secondary">Find a flavour</ButtonLink>
          <ButtonLink href="/workshops#comparison" variant="secondary">Compare cookies</ButtonLink>
          <ButtonLink href="/build-your-box">Build a cookie box</ButtonLink>
        </div>
      </section>

      <section aria-labelledby="why-us" className="grid gap-block border-y border-line py-block">
        <h2 id="why-us" className="text-3xl">
          Why Choose Cookie Shop?
        </h2>
        <div className="grid gap-block md:grid-cols-3 md:gap-stack">
          <div className="grid content-start gap-stack rounded-frame bg-yellow-wash p-5 sm:p-6">
            <h3 className="text-lg">Delicious Flavours</h3>
            <p>
              Discover a variety of cookie flavours, from timeless
              favourites to creative combinations.
            </p>
          </div>

          <div className="grid content-start gap-stack rounded-frame bg-yellow-wash p-5 sm:p-6">
            <h3 className="text-lg">Easy to Explore</h3>
            <p>
              Find information about our cookies in one place
              and discover which flavours suit you best.
            </p>
          </div>

          <div className="grid content-start gap-stack rounded-frame bg-yellow-wash p-5 sm:p-6">
            <h3 className="text-lg">Made for Cookie Lovers</h3>
            <p>
              Whether you want a treat for yourself or something
              to share, our cookie selection has you covered.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="about-us" className="grid justify-items-start gap-stack rounded-panel border border-line bg-blue-tint p-5 sm:p-block">
        <h2 id="about-us" className="text-3xl">
          A Little More About Us
        </h2>
        <p className="max-w-reading text-ink-soft">
          Cookie Shop is a fictional cookie business created as
          a university team project. Our goal is to build a clear,
          accessible and enjoyable website where customers can
          discover cookies and eventually place orders online.
        </p>
        <ButtonLink href="/about" variant="secondary" className="w-fit max-w-full whitespace-normal text-center">
          Learn More About Us
        </ButtonLink>
      </section>
    </div>
  )
}
