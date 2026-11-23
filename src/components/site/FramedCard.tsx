
// What this is: a card for one thing the user can open, such as a workshop:
// a thin navy frame with a coloured offset, an optional picture,
// a linked title, and additional details.

import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type FramedCardProps = {
  title: string
  href?: string
  image?: { src: string; alt: string } | null
  accent?: 'mint' | 'purple' | 'coral' | 'yellow'
  headingLevel?: 'h2' | 'h3'
  children?: ReactNode
  className?: string
}

const OFFSETS = {
  mint: 'offset-mint',
  purple: 'offset-purple',
  coral: 'offset-coral',
  yellow: 'offset-yellow',
}

export function FramedCard({
  title,
  href,
  image,
  accent = 'mint',
  headingLevel = 'h3',
  children,
  className,
}: FramedCardProps) {
  const Heading = headingLevel

  return (
    <article
      className={cn(
        'framed grid overflow-hidden',
        image && 'sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]',
        OFFSETS[accent],
        className,
      )}
    >
      {image && (
        <div className="relative aspect-[4/3] overflow-hidden border-b-2 border-ink bg-[#f7f1e8] sm:aspect-auto sm:min-h-44 sm:border-r-2 sm:border-b-0">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 640px) 16rem, 100vw"
            className="object-contain"
          />
        </div>
      )}

      <div className="grid content-start gap-3 p-5 sm:p-6">
        <Heading className="text-xl">
          {href ? (
            <Link
              href={href}
              className="text-ink underline decoration-ink/60 decoration-2 hover:decoration-link"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </Heading>

        {children}
      </div>
    </article>
  )
}
