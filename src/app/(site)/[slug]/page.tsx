// The plain pages: About and Privacy (and any page an editor adds), one page file for all. The part of
// the address after the slash (the slug, for example "about") picks the record in the Pages collection;
// editors write the text in /admin. An address with no page behind it shows the "not found" page.
// Contact has its own page file (contact/page.tsx), because it also shows the e-mail address and place.
import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { PlainPage } from '@/components/site/PlainPage'
import { findPage, pageMetadata } from '@/lib/pages'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return pageMetadata(await findPage((await params).slug))
}

export default async function PlainPageRoute({ params }: Props) {
  const { slug } = await params
  // The home page's record is shown at "/", so "/home" would be a second copy of the same page. A
  // permanent redirect sends anyone who types or bookmarks /home to the one real address instead.
  if (slug === 'home') permanentRedirect('/')
  const page = await findPage(slug)
  if (!page) notFound()
  return (
    <PlainPage page={page}>
      {slug === 'privacy' && (
        <section aria-labelledby="workshop-privacy" className="grid gap-stack">
          <h2 id="workshop-privacy" className="text-2xl">Demo workshop registrations</h2>
          <p>Use a fictional name and an email address ending in .example. We store those details with the selected session, participant count and registration reference so authorised project editors can manage capacity and verify the demo. Registration records are retained with their cancellation history for the project handover. We send no email and create no real workshop reservation.</p>
        </section>
      )}
    </PlainPage>
  )
}
