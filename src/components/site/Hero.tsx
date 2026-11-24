// What this is: the big opening of the home page: a short line above the title (the tagline), the
// title, one or two sentences, the main actions and a photo. No slideshow: one clear message and the
// two things a user comes to do. On a phone the photo goes below the text.
//
// What to change for your own site: the TAGLINE below. The title, text and photo come from the home
// page's record and the media library in /admin; the actions from src/app/(site)/page.tsx.
import Image from 'next/image'
import type { ReactNode } from 'react'

// W4: put your own name in this tagline
const TAGLINE = 'Freshly baked cookies · Made with love · Team 11'

type HeroProps = {
  title: string
  text?: string | null
  actions?: ReactNode
  image?: { src: string; alt: string; width: number; height: number } | null
}

export function Hero({ title, text, actions, image }: HeroProps) {
  return (
    <section className="grid items-center gap-block rounded-panel border border-line bg-blue-tint p-5 sm:p-block lg:grid-cols-[minmax(0,1.12fr)_minmax(0,1fr)] lg:px-10 lg:py-10">
      <div className="grid min-w-0 gap-stack sm:gap-5">
        <p className="text-sm font-bold tracking-[0.08em] text-ink-soft uppercase">{TAGLINE}</p>
        <h1 className="max-w-[14ch] text-4xl leading-tight text-ink">{title}</h1>
        {text && <p className="max-w-[46ch] text-base text-ink-soft sm:text-lg">{text}</p>}
        {actions && <div className="mt-2 flex flex-col gap-stack [&>a]:w-full [&>a]:justify-center sm:flex-row sm:flex-wrap sm:[&>a]:w-auto">{actions}</div>}
      </div>
      {image && (
        <div className="relative aspect-[5/4] overflow-hidden rounded-frame bg-yellow-wash lg:aspect-[4/5]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            preload
            sizes="(min-width: 80rem) 32rem, (min-width: 64rem) 43vw, 88vw"
            className="object-cover"
          />
        </div>
      )}
    </section>
  )
}
