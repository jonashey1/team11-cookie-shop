'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ButtonLink } from '@/components/site/ButtonLink'
import { canCompare, comparisonProducts, MAX_COMPARISON } from '@/lib/cookie-comparison'
import { cookieImage } from '@/lib/workshop-image'
import type { CookieProduct } from '@/content/cookies'
import { addToComparison, clearComparison, removeFromComparison, useCookieComparison } from './useCookieComparison'

export function CompareCookieButton({ cookie }: { cookie: CookieProduct }) {
  const { ids } = useCookieComparison()
  const selected = ids.includes(cookie.id)
  return (
    <Button type="button" variant="secondary" aria-pressed={selected}
      aria-label={`Compare ${cookie.name}`}
      className={selected ? 'w-fit whitespace-normal bg-yellow-wash' : 'w-fit whitespace-normal'}
      onClick={() => selected ? removeFromComparison(cookie.id, cookie.name) : addToComparison(cookie.id, cookie.name)}>
      {selected ? 'Added to comparison' : ids.length >= MAX_COMPARISON ? 'Comparison full' : 'Compare'}
    </Button>
  )
}

export function ComparisonTray() {
  const { ids, message } = useCookieComparison()
  const heading = useRef<HTMLHeadingElement>(null)
  const selected = comparisonProducts(ids)
  return (
    <div id="comparison" className="scroll-mt-24">
      <section aria-labelledby="comparison-selection" className="grid gap-3 rounded-panel border border-line bg-yellow-wash p-4 sm:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 id="comparison-selection" ref={heading} tabIndex={-1} className="text-xl">Compare cookies</h3>
          <span className="text-sm font-semibold tabular-nums">{ids.length}/{MAX_COMPARISON} selected</span>
        </div>
        {selected.length ? (
          <>
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {selected.map(cookie => {
                const image = cookieImage(cookie.name)
                return (
                  <li key={cookie.id} className="flex min-w-0 items-center gap-2 rounded-control border border-line bg-canvas p-2">
                    {image && <Image src={image.src} alt="" width={44} height={44} className="size-11 shrink-0 rounded-control object-cover" />}
                    <span className="min-w-0 flex-1 break-words text-sm font-semibold">{cookie.name}</span>
                    <Button type="button" variant="quiet" size="icon" aria-label={`Remove ${cookie.name} from comparison`}
                      onClick={() => { removeFromComparison(cookie.id, cookie.name); heading.current?.focus() }}>
                      <span aria-hidden="true">×</span>
                    </Button>
                  </li>
                )
              })}
            </ul>
            <div className="flex flex-wrap gap-2">
              {canCompare(ids)
                ? <ButtonLink href="/compare" className="whitespace-normal">Compare cookies</ButtonLink>
                : <Button type="button" disabled className="whitespace-normal">Compare cookies</Button>}
              <Button type="button" variant="quiet" onClick={() => { clearComparison(); heading.current?.focus() }}>Clear all</Button>
            </div>
          </>
        ) : <p className="text-sm text-ink-soft">Choose two or three cookies below to compare them side by side.</p>}
        <p role="status" className={message ? 'text-sm font-semibold' : 'sr-only'}>{message}</p>
      </section>
    </div>
  )
}

export function CompareFinderResult({ cookie }: { cookie: CookieProduct }) {
  const { ids, message } = useCookieComparison()
  const selected = ids.includes(cookie.id)
  return (
    <div className="grid justify-items-center gap-2">
      <Button type="button" variant="secondary" className="whitespace-normal"
        aria-pressed={selected}
        onClick={() => selected ? removeFromComparison(cookie.id, cookie.name) : addToComparison(cookie.id, cookie.name)}>
        Compare this cookie
      </Button>
      {selected && <Link className="text-link underline" href={canCompare(ids) ? '/compare' : '/workshops#comparison'}>
        {canCompare(ids) ? 'Open comparison' : 'Choose another cookie to compare'}
      </Link>}
      <p role="status" className={message ? 'text-sm' : 'sr-only'}>{message}</p>
    </div>
  )
}