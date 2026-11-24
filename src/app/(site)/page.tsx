
import Image from 'next/image'
import { ButtonLink } from '@/components/site/ButtonLink'
import { Cookie, Scale, PackageOpen } from 'lucide-react'
import { COOKIES } from '@/content/cookies'
import { cookieImage } from '@/lib/workshop-image'
import Link from 'next/link'
import { CookieShopExperience } from '@/components/site/CookieShopExperience'

export default function HomePage() {
  return (
    <div className="grid gap-section pt-block">
      <section aria-labelledby="boutique-title" className="boutique-hero">
        <div className="boutique-hero-copy">
          <p className="boutique-kicker">The Cookie Boutique</p>
          <h1 id="boutique-title">Life’s better <em>with cookies.</em></h1>
          <p>Six flavours. Endless combinations. Find your favourite or create your own perfect box.</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/workshops#cookies" size="lg">Explore Our Cookies</ButtonLink>
            <ButtonLink href="/build-your-box" variant="secondary" size="lg">Build a cookie box</ButtonLink>
          </div>
          <p className="boutique-hand">Your taste. Your choice. Your perfect cookie.</p>
        </div>
        <div className="boutique-hero-art">
          <Image src="/images/signature-hero.webp" unoptimized preload
            alt="Three classic chocolate chip cookies on a plate with baking ingredients."
            width={800} height={1000} />
          <span aria-hidden="true" className="boutique-stamp"><Cookie /> Six flavours</span>
          <span aria-hidden="true" className="boutique-crumbs">✦ · ✧</span>
        </div>
      </section>

      <nav aria-label="Explore cookie experiences" className="boutique-strip">
        <Link href="/cookie-finder"><Cookie aria-hidden="true" /><span><strong>Discover</strong>Cookie Finder</span></Link>
        <Link href="/workshops#comparison"><Scale aria-hidden="true" /><span><strong>Compare</strong>Cookie Comparison</span></Link>
        <Link href="/build-your-box"><PackageOpen aria-hidden="true" /><span><strong>Personalise</strong>Box Builder</span></Link>
      </nav>

      <section aria-labelledby="discover" className="boutique-collection">
        <div>
          <p className="boutique-kicker">The collection</p>
          <h2 id="discover">Discover Our Cookie Shop</h2>
          <p>Find an old favourite or make room for a new one.</p>
        </div>
        <ul className="boutique-flavours">
          {COOKIES.map(cookie => {
            const image = cookieImage(cookie.name)
            return (
              <li key={cookie.id} data-flavour={cookie.id}>
                {image && <Image src={image.src} alt="" width={256} height={256} sizes="(min-width: 64rem) 15vw, (min-width: 40rem) 30vw, 42vw" />}
                <strong>{cookie.name}</strong>
              </li>
            )
          })}
        </ul>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/workshops#cookies">View Our Cookies</ButtonLink>
          <ButtonLink href="/clinics" variant="secondary">Order Cookies</ButtonLink>
        </div>
      </section>

      <CookieShopExperience />

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
