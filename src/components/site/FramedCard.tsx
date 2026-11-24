
// What this is: a card for one thing the user can open, such as a workshop:
// a thin frame with a coloured offset, an optional picture,
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
        'framed grid min-w-0 content-start gap-stack p-5 sm:p-6',
        OFFSETS[accent],
        className,
      )}
    >
      {image && (
        <div className="relative aspect-[4/3] overflow-hidden rounded-frame bg-yellow-wash">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 80rem) 34rem, (min-width: 48rem) 43vw, 88vw"
            className="object-contain"
          />
        </div>
      )}

      <div className="grid min-w-0 content-start gap-stack">
        <Heading className="text-xl">
          {href ? (
            <Link
              href={href}
              className="rounded-control text-ink underline decoration-ink/60 decoration-2 hover:text-link"
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
