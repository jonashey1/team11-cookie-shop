'use client'

import Image from 'next/image'
import { useState } from 'react'
import { COOKIES } from '@/content/cookies'
import { flavourProfiles, type CookieId } from '@/lib/cookie-comparison'
import { cookieImage } from '@/lib/workshop-image'
import { ButtonLink } from './ButtonLink'
import { CompareCookieButton } from './CookieComparisonControls'
import { formatOrderAmount } from './OrderBasket'

const sweetnessLabels = ['Least sweet', 'Lightly sweet', 'Moderately sweet', 'Sweet', 'Sweeter'] as const
const chocolateLabels = ['Mildest', 'Mild', 'Moderate', 'Rich', 'Most intense'] as const

export function CookieTasteMap() {
  const [selectedId, setSelected] = useState<CookieId | null>(null)
  const selected = COOKIES.find(cookie => cookie.id === selectedId)
  const image = selected && cookieImage(selected.name)

  return (
    <section id="taste-map" aria-labelledby="taste-map-heading" className="experience-map scroll-mt-8">
      <div>
        <p className="boutique-kicker">The flavour atlas</p>
        <h2 id="taste-map-heading">Taste Map</h2>
        <p>Explore our six flavours by sweetness and chocolate intensity. Positions reflect our tasting notes.</p>
      </div>
      <div className="experience-map-layout">
        <div>
          <p className="text-sm font-semibold">Sweetness · sweeter at the top</p>
          <div className="experience-map-grid" role="group" aria-label="Flavour map">
            {COOKIES.map(cookie => {
              const { chocolate, sweetness } = flavourProfiles[cookie.id]
              return (
                <button key={cookie.id} type="button" data-flavour={cookie.id}
                  className="experience-map-marker" style={{ gridColumn: chocolate, gridRow: 6 - sweetness }}
                  aria-label={cookie.name} aria-pressed={selectedId === cookie.id} onClick={() => setSelected(cookie.id)}>
                  {cookie.id}
                </button>
              )
            })}
          </div>
          <p className="flex justify-between gap-3 text-sm font-semibold"><span>Mild chocolate</span><span>Intense chocolate</span></p>
        </div>
        <ol className="experience-map-key" aria-label="Find a flavour by name">
          {COOKIES.map(cookie => (
            <li key={cookie.id} data-flavour={cookie.id}>
              <button type="button" aria-pressed={selectedId === cookie.id} onClick={() => setSelected(cookie.id)}>
                <span aria-hidden="true">{cookie.id}</span> {cookie.name}
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div aria-live="polite">
        {selected ? (
          <article data-flavour={selected.id} className="experience-map-detail">
            {image && <Image src={image.src} alt={image.alt} width={144} height={144} className="aspect-square w-full max-w-36 rounded-frame object-cover" />}
            <div className="grid gap-2">
              <h3 className="text-2xl">{selected.name}</h3>
              <p>{selected.description}</p>
              <dl className="grid grid-cols-[auto_1fr] gap-x-3">
                <dt>Sweetness</dt><dd>{sweetnessLabels[flavourProfiles[selected.id].sweetness - 1]}</dd>
                <dt>Chocolate intensity</dt><dd>{chocolateLabels[flavourProfiles[selected.id].chocolate - 1]}</dd>
              </dl>
              <p>{flavourProfiles[selected.id].texture} · {flavourProfiles[selected.id].preference}</p>
              <p><strong>{formatOrderAmount(selected.price)}</strong></p>
              <div className="flex flex-wrap gap-2">
                <CompareCookieButton cookie={selected} />
                <ButtonLink href={`/workshops#cookie-${selected.id}`} variant="secondary">View in assortment</ButtonLink>
              </div>
              <a href="#comparison" className="inline-flex min-h-11 items-center underline">View comparison selection</a>
            </div>
          </article>
        ) : <p>Choose a flavour to see its profile and price.</p>}
      </div>
    </section>
  )
}
