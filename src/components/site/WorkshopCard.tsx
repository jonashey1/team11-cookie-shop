
import type { Workshop } from '@/payload-types'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { formatPrice, formatWhen, levelLabel } from '@/lib/format'
import { workshopImage } from '@/lib/workshop-image'
import { FramedCard } from './FramedCard'
import { TopicList } from './TopicList'

type WorkshopCardProps = {
  workshop: Workshop
  query?: string
  preview?: boolean
  headingLevel?: 'h2' | 'h3'
  sessions?: boolean
}

export function WorkshopCard({
  workshop,
  query = '',
  preview = false,
  headingLevel = 'h3',
  sessions,
}: WorkshopCardProps) {
  const cardImage = workshopImage(workshop)

  return (
    <FramedCard
      title={workshop.title}
      href={`/workshops/${workshop.slug}${query}`}
      image={cardImage}
      accent="yellow"
      headingLevel={headingLevel}
      className={preview ? 'boutique-workshop-card' : undefined}
    >
      {!preview && (
        <>
          <Badge tone={workshop.level === 'beginner' ? 'mint' : 'yellow'}>
            {levelLabel(workshop.level)}
          </Badge>

          <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-2 rounded-control bg-blue-tint p-3">
            <dt className="text-ink-soft">When</dt>
            <dd className="font-semibold">{formatWhen(workshop)}</dd>

            <dt className="text-ink-soft">Price</dt>
            <dd className="font-semibold tabular-nums">{formatPrice(workshop.price)}</dd>
          </dl>
        </>
      )}

      <p>{workshop.summary}</p>
      {sessions === true && <Link href={`/workshops/${workshop.slug}${query}#workshop-registration`} className="w-fit font-semibold underline">View available sessions<span className="sr-only"> for {workshop.title}</span></Link>}
      {sessions === false && <p className="text-ink-soft">No sessions currently available.</p>}

      {!preview && <TopicList topics={workshop.topics} />}
    </FramedCard>
  )
}
