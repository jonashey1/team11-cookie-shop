
import Image from 'next/image'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

const TONES = {
  mint: 'bg-mint-wash',
  blue: 'bg-blue-tint',
  purple: 'bg-purple-wash',
  yellow: 'bg-yellow-wash',
}

type PageTitleProps = {
  title: string
  intro?: string | null
  tone?: keyof typeof TONES
  image?: { src: string; alt: string } | null
  imageAccent?: 'coral' | 'purple'
  children?: ReactNode
  className?: string
}

export function PageTitle({
  title,
  intro,
  tone = 'mint',
  image,
  imageAccent = 'coral',
  children,
  className,
}: PageTitleProps) {
  return (
    <header
      className={cn(
        'mt-5 mb-block grid items-center gap-5 rounded-frame border-s-4 border-s-brand p-4 sm:mt-8 sm:p-7 lg:px-9',
        image && 'md:grid-cols-[1.4fr_1fr]',
        TONES[tone],
        className,
      )}
    >
      <div className="grid gap-4">
        <h1 className="max-w-[22ch] text-3xl">{title}</h1>
        {intro && (
          <p className="max-w-(--container-reading) text-lg">
            {intro}
          </p>
        )}
        {children}
      </div>

      {image && (
        <div
          className={cn(
            'framed relative aspect-[3/2] overflow-hidden bg-yellow-wash',
            imageAccent === 'purple'
              ? 'offset-purple'
              : 'offset-coral',
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 768px) 24rem, 100vw"
            className="object-contain"
          />
        </div>
      )}
    </header>
  )
}
