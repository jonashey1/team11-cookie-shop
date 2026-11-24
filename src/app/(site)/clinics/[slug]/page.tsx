
import { randomUUID } from 'node:crypto'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { cache } from 'react'
import { BookingForm } from '@/components/site/BookingForm'
import { ButtonLink } from '@/components/site/ButtonLink'
import { Notice } from '@/components/site/Notice'
import { PageTitle } from '@/components/site/PageTitle'
import { ParentLink } from '@/components/site/ParentLink'
import { formatPrice, formatSlotTime, formatWhen, imageFrom } from '@/lib/format'
import { membersAreaOn, signedInMember } from '@/lib/membersArea'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

// Existing booking data is retained until the Cookie Shop
// ordering functionality is implemented in a later assignment.
const CLINIC_IMAGE = 'clinic-tools'

type Props = { params: Promise<{ slug: string }> }

const findClinic = cache(async (slug: string) => {
  const payload = await getPayload({ config })

  const found = await payload.find({
    collection: 'clinics',
    where: { slug: { equals: slug } },
    depth: 0,
    limit: 1,
    joins: false,
  })

  return found.docs[0]
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const clinic = await findClinic((await params).slug)

  if (!clinic) return {}

  return {
    title: clinic.name,
    description: clinic.summary,
  }
}

export default async function ClinicPage({ params }: Props) {
  const clinic = await findClinic((await params).slug)

  if (!clinic) notFound()

  const payload = await getPayload({ config })

  const upcoming = await payload.find({
    collection: 'timeSlots',
    where: {
      clinic: { equals: clinic.id },
      startsAt: { greater_than: new Date().toISOString() },
    },
    sort: 'startsAt',
    depth: 0,
    limit: 100,
    joins: false,
  })

  const booked = upcoming.docs.length === 0
    ? { docs: [] }
    : await payload.find({
        collection: 'bookings',
        where: {
          timeSlot: {
            in: upcoming.docs.map((slot) => slot.id),
          },
        },
        select: { timeSlot: true },
        depth: 0,
        pagination: false,
        overrideAccess: true,
      })

  const taken = new Map<number, number>()

  for (const booking of booked.docs) {
    const slotId = booking.timeSlot as number
    taken.set(slotId, (taken.get(slotId) ?? 0) + 1)
  }

  const slots = upcoming.docs.map((slot) => ({
    id: slot.id,
    label: formatSlotTime(slot.startsAt),
    placesLeft: Math.max(0, slot.places - (taken.get(slot.id) ?? 0)),
  }))

  const allFull =
    slots.length > 0 &&
    slots.every((slot) => slot.placesLeft === 0)

  const repairs = (
    await payload.find({
      collection: 'repairs',
      sort: 'createdAt',
      depth: 0,
      limit: 50,
    })
  ).docs

  const picture = (
    await payload.find({
      collection: 'media',
      where: {
        filename: { contains: CLINIC_IMAGE },
      },
      limit: 1,
    })
  ).docs[0]

  const facts = await payload.findGlobal({
    slug: 'site-facts',
    depth: 0,
  })

  const member = membersAreaOn()
    ? await signedInMember(payload, await headers())
    : null

  return (
    <article className="pb-block">
      <ParentLink
        href="/clinics"
        label="Order Cookies"
        current={clinic.name}
      />

      <PageTitle
        title={clinic.name}
        intro="Discover more about our Cookie Shop selection. Online cookie ordering is coming soon."
        image={imageFrom(picture)}
        tone="blue"
        className="mt-3 border border-line sm:mt-4"
      />

      <div className="grid gap-block lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        <section
          aria-labelledby="facts"
          className="grid min-w-0 gap-stack rounded-panel border border-line bg-yellow-wash p-6 lg:col-start-2 lg:row-start-1"
        >
          <h2 id="facts" className="text-xl">
            At a glance
          </h2>

          <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2">
            <dt className="text-ink-soft">When</dt>
            <dd className="font-semibold">
              {formatWhen(clinic)}
            </dd>

            {facts.place && (
              <>
                <dt className="text-ink-soft">Place</dt>
                <dd className="min-w-0 font-semibold [overflow-wrap:anywhere]">
                  {facts.place}
                </dd>
              </>
            )}
          </dl>
        </section>

        <div className="grid content-start gap-block lg:col-start-1 lg:row-start-1">
          <section aria-labelledby="about" className="grid gap-3">
            <h2 id="about" className="text-2xl">
              More information
            </h2>

            <p className="max-w-(--container-reading)">
              {clinic.summary}
            </p>
          </section>

          {repairs.length > 0 && (
            <section aria-labelledby="prices" className="grid gap-3">
              <h2 id="prices" className="text-2xl">
                Prices
              </h2>

              <ul className="grid max-w-(--container-reading) divide-y divide-line border-y border-line">
                {repairs.map((repair) => (
                  <li
                    key={repair.id}
                    className="flex items-baseline justify-between gap-4 py-3"
                  >
                    <span className="grid">
                      <span className="font-semibold">
                        {repair.name}
                      </span>

                      {repair.description && (
                        <span className="text-ink-soft">
                          {repair.description}
                        </span>
                      )}
                    </span>

                    <span className="font-semibold whitespace-nowrap">
                      {formatPrice(repair.price)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section
            aria-labelledby="book"
            className="grid min-w-0 gap-stack rounded-panel border border-line bg-blue-tint p-5 sm:p-block"
          >
            <h2 id="book" className="text-2xl">
              Booking information
            </h2>

            {slots.length === 0 ? (
              <Notice tone="warning" label="No times available">
                <p>
                  There are currently no available time slots.
                  Explore our cookie collection in the meantime.
                </p>
              </Notice>
            ) : allFull ? (
              <Notice tone="warning" label="Fully booked">
                <p className="font-semibold">
                  All available time slots are currently full.
                </p>

                <ButtonLink
                  href="/workshops"
                  variant="secondary"
                  className="mt-2 w-fit"
                >
                  Explore our cookies
                </ButtonLink>
              </Notice>
            ) : (
              <BookingForm
                clinic={clinic.slug}
                slots={slots}
                requestId={randomUUID()}
                repairs={repairs.map(({ id, name, price }) => ({
                  id,
                  name,
                  price,
                }))}
                member={
                  member && {
                    name: member.name ?? '',
                    email: member.email,
                  }
                }
              />
            )}
          </section>
        </div>
      </div>
    </article>
  )
}
