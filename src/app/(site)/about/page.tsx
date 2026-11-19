
import type { Metadata } from 'next'
import { ButtonLink } from '@/components/site/ButtonLink'
import { PageTitle } from '@/components/site/PageTitle'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn more about Cookie Shop, our concept and our university team project.',
}

export default function AboutPage() {
  return (
    <div className="grid gap-section pb-6">
      <PageTitle
        title="About Us"
        intro="Get to know Cookie Shop and discover the idea behind our online cookie store."
        tone="purple"
      />

      <section aria-labelledby="our-story" className="grid gap-4">
        <h2 id="our-story" className="text-2xl">
          Our Story
        </h2>

        <p className="max-w-[65ch]">
          Cookie Shop is a fictional online cookie store created
          as part of a university web development project.
          Our idea is simple: make discovering and ordering
          delicious cookies easy, clear and enjoyable.
        </p>

        <p className="max-w-[65ch]">
          We want to create a website where customers can
          explore different cookie flavours, compare products
          and find their favourites in just a few clicks.
        </p>
      </section>

      <section aria-labelledby="our-mission" className="grid gap-block">
        <h2 id="our-mission" className="text-2xl">
          Our Mission
        </h2>

        <div className="grid gap-block md:grid-cols-3">
          <div className="framed grid content-start gap-3 p-6 offset-purple">
            <h3 className="text-xl">Discover</h3>
            <p>
              Help customers discover a variety of cookie
              flavours through clear product information.
            </p>
          </div>

          <div className="framed grid content-start gap-3 p-6 offset-coral">
            <h3 className="text-xl">Choose</h3>
            <p>
              Make it easy to compare cookies and choose
              the perfect treat for every occasion.
            </p>
          </div>

          <div className="framed grid content-start gap-3 p-6 offset-purple">
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

        <p className="max-w-[65ch]">
          This website is developed by Team 11 as part of
          a web development course at Ghent University.
          Our focus is on building a functional, accessible
          and user-friendly online store.
        </p>

        <p className="max-w-[65ch]">
          Cookie Shop is a demonstration project.
          The products and prices shown on this website
          are examples and do not represent real commercial offers.
        </p>
      </section>

      <section
        aria-labelledby="explore"
        className="grid gap-4 rounded-panel bg-mint-wash p-6 sm:p-10"
      >
        <h2 id="explore" className="text-2xl">
          Discover Our Cookies
        </h2>

        <p>
          Curious about our cookie selection?
          Explore our flavours and find your favourite.
        </p>

        <ButtonLink href="/workshops" className="w-fit">
          Explore Our Cookies
        </ButtonLink>
      </section>
    </div>
  )
}
