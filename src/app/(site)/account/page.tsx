import type { Metadata } from 'next'
import { headers } from 'next/headers'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { getPayload } from 'payload'
import { PageTitle } from '@/components/site/PageTitle'
import { Button } from '@/components/ui/button'
import { formatSlotTime } from '@/lib/format'
import { membersAreaOn, signedInMember } from '@/lib/membersArea'
import config from '@/payload.config'
import { signOut } from './actions'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = { title: 'My bookings', robots: { index: false } }

export default async function AccountPage() {
  if (!membersAreaOn()) notFound()

  const payload = await getPayload({ config })
  const member = await signedInMember(payload, await headers())
  if (!member) redirect('/account/login')

  // Use the member's access rules and ask only for the details shown on this page.
  const { docs: bookings } = await payload.find({
    collection: 'bookings',
    where: { member: { equals: member.id } },
    user: { ...member, collection: 'members' },
    overrideAccess: false,
    depth: 2,
    select: { timeSlot: true },
    populate: { timeSlots: { startsAt: true, clinic: true }, clinics: { name: true, slug: true } },
    sort: '-createdAt',
    pagination: false,
  })

  return (
    <div className="pb-block">
      <PageTitle
        title="My bookings"
        intro={`You are logged in as ${member.name || member.email}.`}
        tone="blue"
        className="border border-line"
      />

      <section aria-labelledby="my-bookings" className="grid max-w-reading gap-stack rounded-panel border border-line bg-yellow-wash p-5 sm:p-block">
        <h2 id="my-bookings" className="text-2xl">Your clinic bookings</h2>
        {bookings.length === 0 ? (
          <p>You have no clinic bookings yet.</p>
        ) : (
          <ul className="grid gap-stack">
            {bookings.map(({ id, timeSlot }) => {
              const slot = typeof timeSlot === 'object' ? timeSlot : null
              const clinic = slot && typeof slot.clinic === 'object' ? slot.clinic : null

              return (
                <li key={id} className="grid gap-1 rounded-control border border-line bg-canvas p-4">
                  {clinic ? (
                    <Link href={`/clinics/${clinic.slug}`} className="font-bold">{clinic.name}</Link>
                  ) : (
                    <span className="font-bold">Clinic booking</span>
                  )}
                  {slot ? (
                    <time dateTime={slot.startsAt} className="text-ink-soft">{formatSlotTime(slot.startsAt)}</time>
                  ) : (
                    <p className="text-ink-soft">Time slot unavailable.</p>
                  )}
                </li>
              )
            })}
          </ul>
        )}

        <form action={signOut}>
          <Button type="submit" variant="secondary">Log out</Button>
        </form>
      </section>
    </div>
  )
}
