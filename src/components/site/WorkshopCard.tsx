
import type { Workshop } from '@/payload-types'
import { Badge } from '@/components/ui/badge'
import { formatPrice, formatWhen, levelLabel } from '@/lib/format'
import { workshopImage } from '@/lib/workshop-image'
import { FramedCard } from './FramedCard'
import { TopicList } from './TopicList'

type WorkshopCardProps = {
  workshop: Workshop
  query?: string
  headingLevel?: 'h2' | 'h3'
}

// These images are only used on the workshop overview cards.
// Workshop detail pages keep their original images.
const CARD_IMAGES: Record<string, { src: string; alt: string }> = {
  'classic-chocolate-chip': {
    src: '/images/workshops/classic-chocolate-chip.png',
    alt: 'Three classic chocolate chip cookies on a plate with baking ingredients.',
  },
  'double-chocolate': {
    src: '/images/workshops/double-chocolate.png',
    alt: 'Three double chocolate cookies on a plate with chocolate pieces.',
  },
  'salted-caramel': {
    src: '/images/workshops/salted-caramel.png',
    alt: 'Three salted caramel cookies on a plate with caramel and baking ingredients.',
  },
  'white-chocolate': {
    src: '/images/workshops/white-chocolate.png',
    alt: 'Three white chocolate cookies on a plate with white chocolate pieces.',
  },
}

export function WorkshopCard({
  workshop,
  query = '',
  headingLevel = 'h3',
}: WorkshopCardProps) {
  const cardImage = CARD_IMAGES[workshop.slug] ?? workshopImage(workshop)

  return (
    <FramedCard
      title={workshop.title}
      href={`/workshops/${workshop.slug}${query}`}
      image={cardImage}
      accent="purple"
      headingLevel={headingLevel}
    >
      <Badge tone={workshop.level === 'beginner' ? 'mint' : 'yellow'}>
        {levelLabel(workshop.level)}
      </Badge>

      <dl className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1">
        <dt className="text-ink-soft">When</dt>
        <dd className="font-semibold">{formatWhen(workshop)}</dd>

        <dt className="text-ink-soft">Price</dt>
        <dd className="font-semibold">{formatPrice(workshop.price)}</dd>
      </dl>

      <p>{workshop.summary}</p>

      <TopicList topics={workshop.topics} />
    </FramedCard>
  )
}
