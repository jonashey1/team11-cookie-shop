
import type { Metadata } from 'next'
import { ArtisanPhotoFigure } from '@/components/site/ArtisanPhotoFigure'
import { artisanPhotography } from '@/content/artisan-photography'
import { FortuneCookieExperience } from '@/components/site/FortuneCookieExperience'
import { ButtonLink } from '@/components/site/ButtonLink'
import { PageTitle } from '@/components/site/PageTitle'

export const metadata: Metadata = {
  alternates: { canonical: "https://team11-cookie-shop.vercel.app/about" },
  title: 'About Us',
  description:
    'Learn more about Cookie Shop, our concept and our university team project.',
}

export default function AboutPage() {
  const photo = artisanPhotography.aboutTeam

  return (
    <div className="grid gap-section pb-block">
      <PageTitle
        title="About Us"
        intro="A university project about choosing cookies your way."
        tone="blue"
        className="mb-0 border border-line"
      />

      <section aria-labelledby="our-story" className="boutique-story grid gap-4">
        <div className="grid content-start gap-4">
          <h2 id="our-story" className="text-2xl">
            Our Story
          </h2>

          <p className="max-w-reading text-ink-soft">
            Cookie Shop is a fictional online cookie store created
            as part of a university web development project.
            We started with a simple question: how do you choose
            when there are six flavours and every one sounds good?
          </p>

          <p className="max-w-reading text-ink-soft">
            Follow your tastes with the Cookie Finder, compare the flavours
            side by side, or make a four-cookie box of your own. Our fictional
            workshops explore the techniques behind the flavours, from mixing dough
            to working with chocolate and decorating with icing.
          </p>

          <p className="max-w-reading text-ink-soft">
            Enjoy every bit!
          </p> 

          <p className="max-w-reading text-ink-soft">
            With lots of cookie love and sweet regards,
          </p> 
          <p className="max-w-reading text-ink-soft">
            Jonas, Esma, Tessa, Yana and Arnaud
          </p> 
          
        </div>
        {photo && <ArtisanPhotoFigure photo={photo} sizes="(min-width: 80rem) 35rem, (min-width: 52rem) 48vw, 88vw" />}
      </section>

      <section aria-labelledby="our-mission" className="boutique-editorial grid gap-block">
        <h2 id="our-mission" className="text-2xl">
          How it works
        </h2>

        <div className="grid gap-block md:grid-cols-3">
          <div className="grid content-start gap-stack rounded-panel border border-line bg-blue-tint p-6">
            <h3 className="text-xl">Discover</h3>
            <p>
              Help customers discover a variety of cookie
              flavours through clear product information.
            </p>
          </div>

          <div className="grid content-start gap-stack rounded-panel border border-line bg-blue-tint p-6">
            <h3 className="text-xl">Choose</h3>
            <p>
              Make it easy to compare cookies and choose
              the perfect treat for every occasion.
            </p>
          </div>

          <div className="grid content-start gap-stack rounded-panel border border-line bg-blue-tint p-6">
            <h3 className="text-xl">Order</h3>
            <p>
              Develop a simple online ordering process
              without requiring online payment.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="our-project" className="grid gap-4">
        <h2 id="our-project" className="text-2xl">
          Our University Project
        </h2>

        <p className="max-w-reading text-ink-soft">
          This website is developed by Team 11 as part of
          a web development course at Ghent University.
          Our focus is on building a functional, accessible
          and user-friendly online store.
        </p>

        <p className="max-w-reading text-ink-soft">
          Cookie Shop is a demonstration project.
          The products and prices shown on this website
          are examples and do not represent real commercial offers.
        </p>
      </section>

      <section
        aria-labelledby="explore"
        className="grid gap-stack rounded-panel border border-line bg-yellow-wash p-6 sm:p-block"
      >
        <h2 id="explore" className="text-2xl">
          Discover Our Cookies
        </h2>

        <p>
          Curious about our cookie selection?
          Explore our flavours and find your favourite.
        </p>

        <ButtonLink href="/cookies" className="w-fit">
          Explore Our Cookies
        </ButtonLink>
      </section>
      <section id="fortune-cookie" tabIndex={-1} aria-label="Fortune Cookie" className="scroll-mt-24">
        <FortuneCookieExperience />
      </section>
    </div>
  )
}
