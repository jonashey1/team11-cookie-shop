
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getPayload, type Where } from 'payload'
import { ButtonLink } from '@/components/site/ButtonLink'
import { PageTitle } from '@/components/site/PageTitle'
import { WorkshopCard } from '@/components/site/WorkshopCard'
import { filterQuery, parseFilters, type SearchParams } from '@/tasks/find-workshop/filters'
import { starterWorkshopSlugs } from '@/lib/public-workshop-content'
import config from '@/payload.config'

import { LegacyCookieLinks } from '@/components/site/LegacyCookieLinks'

export const metadata: Metadata = { title: 'Cookie Workshops' }
export const dynamic = 'force-dynamic'

export default function WorkshopsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  return (
    <div className="pb-block">
      <LegacyCookieLinks />
      <PageTitle title="Cookie Workshops" intro="Explore four fictional university demonstrations, from baking basics to chocolate and creative decoration." tone="blue" className="border border-line">
        <ButtonLink href="/cookies" variant="secondary">Explore our cookies</ButtonLink>
      </PageTitle>
      <section
        id="workshops"
        aria-labelledby="workshops-heading"
        className="mt-section grid scroll-mt-24 gap-block border-t border-line pt-block"
      >
        <div className="grid max-w-reading gap-stack">
          <h2 id="workshops-heading" className="text-3xl">
            Explore the workshops
          </h2>

          <p className="max-w-reading text-ink-soft">
            Explore our fictional cookie workshops for this student
            project. Discover baking techniques, creative decoration
            and delicious chocolate combinations. These workshops
            are demonstrations only and cannot be booked.
          </p>
        </div>

        <Suspense fallback={<p role="status">Loading cookie workshops…</p>}>
          <WorkshopCatalogue searchParams={searchParams} />
        </Suspense>
      </section>
    </div>
  )
}

async function WorkshopCatalogue({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const filters = parseFilters(await searchParams)
  const payload = await getPayload({ config })
  const where: Where = { slug: { not_in: starterWorkshopSlugs } }
  if (filters.topic) where['topics.slug'] = { equals: filters.topic }
  if (filters.level) where.level = { equals: filters.level }
  const { docs: workshops } = await payload.find({
    collection: 'workshops',
    where,
    depth: 1,
    limit: 100,
    sort: 'title',
  })

  const query = filterQuery(filters)

  return (
    <>
      {query && <ButtonLink href="/workshops" variant="secondary" className="w-fit">Show all workshops</ButtonLink>}
      {workshops.length === 0 ? <p>No cookie workshops match this selection.</p> : (
        <ul className="grid gap-block md:grid-cols-2">
          {workshops.map((workshop) => (
            <li key={workshop.id} className="grid min-w-0">
              <WorkshopCard workshop={workshop} query={query} />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
