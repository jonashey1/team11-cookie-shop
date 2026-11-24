
import { Suspense } from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { WorkshopCard } from '@/components/site/WorkshopCard'
import Image from 'next/image'
import { ButtonLink } from '@/components/site/ButtonLink'
import { Cookie, Scale, PackageOpen } from 'lucide-react'
import { COOKIES } from '@/content/cookies'
import { COOKIE_WORKSHOP_SLUGS, cookieImage } from '@/lib/workshop-image'
import Link from 'next/link'
import { journeyVisuals, type ExcellenceVisual } from '@/content/excellence-visuals'
import { CookieShopExperience } from '@/components/site/CookieShopExperience'

const journeys = [
  { title: 'Discover', label: 'Cookie Finder', text: 'Find the flavour that fits your taste.', href: '/cookie-finder', icon: Cookie, visual: journeyVisuals.discover },
  { title: 'Compare', label: 'Cookie Comparison', text: 'See what sets each cookie apart.', href: '/workshops#comparison', icon: Scale, visual: journeyVisuals.compare },
  { title: 'Personalise', label: 'Box Builder', text: 'Make a four-cookie box your own.', href: '/build-your-box', icon: PackageOpen, visual: journeyVisuals.personalise },
] satisfies readonly { title: string; label: string; text: string; href: string; icon: typeof Cookie; visual: ExcellenceVisual | null }[]

export const dynamic = 'force-dynamic'

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

      <nav aria-label="Explore cookie experiences" className="excellence-journeys">
        {journeys.map(({ title, label, text, href, icon: Icon, visual }) => (
          <Link key={title} href={href} data-flavour={visual?.flavour} className="excellence-journey">
            <span className="excellence-journey-art">
              {visual ? <Image src={visual.src} alt="" fill sizes="(min-width: 64rem) 360px, (min-width: 40rem) 31vw, 28vw" style={{ objectPosition: visual.position }} /> : <Icon aria-hidden="true" />}
            </span>
            <span className="excellence-journey-copy">
              <strong>{title}</strong>
              <span>{text}</span>
              <span className="excellence-journey-label">{label} <span aria-hidden="true">↗</span></span>
            </span>
          </Link>
        ))}
      </nav>

      <section aria-labelledby="boutique-workshops" className="boutique-workshops excellence-workshops">
        <div className="boutique-workshops-intro">
          <div>
            <p className="boutique-kicker">Cookie Workshops</p>
            <h2 id="boutique-workshops">More than cookies. An experience.</h2>
            <p>These workshops are demonstrations for a fictional university project.</p>
          </div>
          <ButtonLink href="/workshops#workshops">Explore our workshops</ButtonLink>
        </div>
        <Suspense fallback={<p role="status">Loading cookie workshops…</p>}>
          <WorkshopPreview />
        </Suspense>
      </section>

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
          discover cookies, compare flavours, build a personalised box and place a fictional test order.
        </p>
        <ButtonLink href="/about" variant="secondary" className="w-fit max-w-full whitespace-normal text-center">
          Learn More About Us
        </ButtonLink>
      </section>
    </div>
  )
}

async function loadWorkshopPreview() {
  try {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'workshops',
      where: { slug: { in: COOKIE_WORKSHOP_SLUGS } },
      depth: 1,
      limit: 3,
      sort: 'title',
    })
    return docs
  } catch (error) {
    console.error('Could not load the homepage workshop preview:', error)
    return null
  }
}

async function WorkshopPreview() {
  const workshops = await loadWorkshopPreview()

  if (!workshops) return <p>Workshop previews are temporarily unavailable.</p>
  if (!workshops.length) return null

  return (
    <ul className="boutique-workshop-list">
      {workshops.map(workshop => (
        <li key={workshop.id}><WorkshopCard workshop={workshop} preview /></li>
      ))}
    </ul>
  )
}
