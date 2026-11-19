
import { ButtonLink } from '@/components/site/ButtonLink'
import { Hero } from '@/components/site/Hero'

export default function HomePage() {
  return (
    <div className="grid gap-section pt-6 sm:pt-10">
      <Hero
        title="Welcome to Cookie Shop"
        text="Discover delicious cookies, explore our flavours and find your favourites. From classic chocolate chip to exciting new creations, there is something sweet for everyone."
        image={null}
        actions={
          <>
            <ButtonLink href="/workshops" size="lg">
              Explore Our Cookies
            </ButtonLink>
            <ButtonLink href="/about" variant="secondary" size="lg">
              About Our Shop
            </ButtonLink>
          </>
        }
      />

      <section aria-labelledby="discover" className="grid gap-block">
        <div className="grid gap-3">
          <h2 id="discover" className="text-2xl">
            Discover Our Cookie Shop
          </h2>
          <p className="max-w-[65ch]">
            At Cookie Shop, we believe that every moment is better
            with a delicious cookie. Explore our selection, compare
            flavours and find the perfect treat for yourself or
            someone special.
          </p>
        </div>

        <div className="grid gap-block md:grid-cols-2">
          <div className="framed grid content-start gap-4 p-6 offset-purple sm:p-8">
            <h3 className="text-xl">Explore Our Cookies</h3>
            <p>
              Discover our selection of cookies and learn more about
              the different flavours we offer. Find your favourite
              before placing an order.
            </p>
            <ButtonLink href="/workshops" className="w-fit">
              View Our Cookies
            </ButtonLink>
          </div>

          <div className="framed grid content-start gap-4 p-6 offset-coral sm:p-8">
            <h3 className="text-xl">Order Your Favourite Cookies</h3>
            <p>
              We are developing an online ordering system where you
              will be able to select your favourite cookies, choose
              quantities and submit your order.
            </p>
            <p className="font-semibold">
              Online ordering is coming soon.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="why-us" className="grid gap-block">
        <h2 id="why-us" className="text-2xl">
          Why Choose Cookie Shop?
        </h2>
        <div className="grid gap-block md:grid-cols-3">
          <div className="framed grid content-start gap-3 p-6 offset-purple">
            <h3 className="text-lg">Delicious Flavours</h3>
            <p>
              Discover a variety of cookie flavours, from timeless
              favourites to creative combinations.
            </p>
          </div>

          <div className="framed grid content-start gap-3 p-6 offset-coral">
            <h3 className="text-lg">Easy to Explore</h3>
            <p>
              Find information about our cookies in one place
              and discover which flavours suit you best.
            </p>
          </div>

          <div className="framed grid content-start gap-3 p-6 offset-purple">
            <h3 className="text-lg">Made for Cookie Lovers</h3>
            <p>
              Whether you want a treat for yourself or something
              to share, our cookie selection has you covered.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="about-us" className="grid gap-block">
        <h2 id="about-us" className="text-2xl">
          A Little More About Us
        </h2>
        <p className="max-w-[65ch]">
          Cookie Shop is a fictional cookie business created as
          a university team project. Our goal is to build a clear,
          accessible and enjoyable website where customers can
          discover cookies and eventually place orders online.
        </p>
        <ButtonLink href="/about" variant="secondary" className="w-fit">
          Learn More About Us
        </ButtonLink>
      </section>
    </div>
  )
}
