'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ButtonLink } from '@/components/site/ButtonLink'
import { COOKIES } from '@/content/cookies'
import {
  canCompare, comparisonInsights, comparisonProducts, comparisonRows,
  MAX_COMPARISON, rowDiffers,
} from '@/lib/cookie-comparison'
import { cookieImage } from '@/lib/workshop-image'
import { formatOrderAmount, useOrderBasket } from './OrderBasket'
import { addToComparison, clearComparison, removeFromComparison, useCookieComparison } from './useCookieComparison'

export function CookieComparison() {
  const { ids, message } = useCookieComparison()
  const { quantities, pending, setQuantities } = useOrderBasket()
  const [highlight, setHighlight] = useState(true)
  const [basketFeedback, setBasketFeedback] = useState('')
  const heading = useRef<HTMLHeadingElement>(null)
  const cookies = comparisonProducts(ids)
  const rows = comparisonRows(cookies)

  return (
    <section className="grid gap-block pb-block" aria-labelledby="comparison-heading">
      <div className="grid gap-3 rounded-frame border-s-4 border-brand bg-blue-tint p-4 sm:p-6">
        <h2 id="comparison-heading" ref={heading} tabIndex={-1} className="text-2xl">Your selection</h2>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold">{ids.length}/{MAX_COMPARISON} selected</span>
          <label className="flex min-h-11 min-w-0 flex-col items-start gap-2 font-semibold sm:flex-row sm:items-center">
            Add a cookie
            <select value="" disabled={ids.length >= MAX_COMPARISON}
              className="min-h-11 min-w-0 w-full max-w-64 rounded-control border border-line bg-canvas px-2 text-ink sm:w-auto"
              onChange={event => {
                const cookie = COOKIES.find(item => item.id === Number(event.target.value))
                if (cookie) {
                  setBasketFeedback('')
                  addToComparison(cookie.id, cookie.name)
                  if (ids.length + 1 === MAX_COMPARISON) heading.current?.focus()
                }
              }}>
              <option value="">Choose a flavour</option>
              {COOKIES.filter(cookie => !ids.includes(cookie.id)).map(cookie => (
                <option key={cookie.id} value={cookie.id}>{cookie.name}</option>
              ))}
            </select>
          </label>
          {ids.length > 0 && <Button type="button" variant="quiet" onClick={() => {
            setBasketFeedback('')
            clearComparison()
            heading.current?.focus()
          }}>Clear all</Button>}
        </div>
        <p role="status" className={message || basketFeedback ? 'text-sm font-semibold' : 'sr-only'}>
          {basketFeedback || message}
        </p>
        {ids.length >= MAX_COMPARISON && <p className="text-sm">Remove a cookie to add another.</p>}
      </div>

      {canCompare(ids) && (
        <div className="rounded-control border border-line bg-canvas px-4 py-2">
          <label className="flex min-h-11 cursor-pointer items-center gap-2">
            <input type="checkbox" checked={highlight} onChange={event => setHighlight(event.target.checked)} className="size-5 shrink-0 accent-ink" />
            Highlight differences
          </label>
        </div>
      )}

      {cookies.length > 0 ? (
        <div className="mobile-comparison">
          <p id="comparison-scroll-hint" className="mobile-comparison-hint">Swipe sideways to see every selected cookie.</p>
          <div className="mobile-comparison-scroll" role="region" aria-label="Cookie characteristics" aria-describedby="comparison-scroll-hint" tabIndex={0}>
        <table className="w-full table-fixed border-separate border-spacing-y-2 text-start [overflow-wrap:anywhere]">
          <caption className="sr-only">Selected cookies compared side by side</caption>
          <thead>
            <tr>
              {cookies.map(cookie => {
                const image = cookieImage(cookie.name)
                const atLimit = (quantities[cookie.id] ?? 0) >= 20
                return (
                  <th key={cookie.id} data-flavour={cookie.id} scope="col" id={`compare-cookie-${cookie.id}`} className="px-1 text-start align-top sm:px-2">
                    {image && <div className="boutique-comparison-art relative mb-2 aspect-square overflow-hidden rounded-frame bg-yellow-wash">
                      <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="(min-width: 75rem) 24rem, 45vw" />
                    </div>}
                    <div className="grid gap-2">
                      <span className="min-h-[3lh] font-heading text-base leading-tight sm:min-h-0 sm:text-xl">{cookie.name}</span>
                      <span className="tabular-nums">{formatOrderAmount(cookie.price)}</span>
                      <Button type="button" disabled={pending || atLimit}
                        className="min-w-0 whitespace-normal px-1 text-sm sm:px-3"
                        aria-label={`Add ${cookie.name} to basket`}
                        onClick={() => {
                          setQuantities(previous => ({
                            ...previous,
                            [cookie.id]: Math.min(20, (previous[cookie.id] ?? 0) + 1),
                          }))
                          setBasketFeedback(`${cookie.name} added to your basket.`)
                        }}>
                        {atLimit ? 'Basket limit reached' : 'Add to basket'}
                      </Button>
                      <Button type="button" variant="quiet" className="min-w-0 whitespace-normal px-1 text-sm"
                        aria-label={`Remove ${cookie.name} from comparison`}
                        onClick={() => {
                          setBasketFeedback('')
                          removeFromComparison(cookie.id, cookie.name)
                          heading.current?.focus()
                        }}>Remove</Button>
                    </div>
                  </th>
                )
              })}
            </tr>
          </thead>
          {canCompare(ids) && rows.map((row, index) => {
            const rowId = `comparison-row-${index}`
            const differs = highlight && rowDiffers(row.values)
            const background = differs ? 'bg-yellow-wash' : index % 2 ? 'bg-blue-tint' : 'bg-canvas'
            return (
              <tbody key={row.label} className={background}>
                <tr>
                  <th id={rowId} colSpan={cookies.length}
                    className={`rounded-t-frame px-2 py-2 text-left sm:px-4 ${differs ? 'border-t-2 border-brand' : ''}`}>
                    {row.label}{differs && <span className="ms-2 text-sm font-normal text-ink-soft">· Differs</span>}
                  </th>
                </tr>
                <tr>
                  {row.values.map((value, column) => (
                    <td key={cookies[column].id}
                      headers={`compare-cookie-${cookies[column].id} ${rowId}`}
                      className="px-2 pb-3 align-top text-sm first:rounded-bl-frame last:rounded-br-frame sm:px-4 sm:text-base">
                      {row.kind === 'rating' && typeof value === 'number' && (
                        <span aria-hidden="true" className="mb-1 grid grid-cols-5 gap-0.5 sm:gap-1">
                          {[1, 2, 3, 4, 5].map(segment => <span key={segment}
                            className={`h-1.5 rounded-full ${segment <= value ? 'bg-ink-soft' : 'bg-line/40'}`} />)}
                        </span>
                      )}
                      {value === undefined
                        ? 'Not available'
                        : row.kind === 'price' && typeof value === 'number'
                          ? formatOrderAmount(value)
                          : row.kind === 'rating' ? `${value} of 5` : value}
                    </td>
                  ))}
                </tr>
              </tbody>
            )
          })}
        </table>
          </div>
        </div>
      ) : null}

      {canCompare(ids) ? (
        <div className="grid gap-3 rounded-frame border-s-4 border-brand bg-blue-tint p-4 sm:p-6">
          <h2 className="text-2xl">Find your perfect match</h2>
          <ul className="grid gap-2">
            {comparisonInsights(cookies).map(insight => (
              <li key={insight.label}><strong>{insight.label}</strong>{' '}{insight.cookies.map(cookie => cookie.name).join(', ')}</li>
            ))}
          </ul>
          <p className="text-sm text-ink-soft">Taste ratings and texture are illustrative profiles for this student project.</p>
        </div>
      ) : <p className="rounded-panel border border-line bg-canvas p-4">
        {ids.length ? 'Add one more cookie to compare the differences.' : 'Your comparison is empty. Choose two or three cookies to get started.'}
      </p>}
      <nav aria-label="After comparing" className="flex flex-wrap gap-3">
        <ButtonLink href="/clinics" className="whitespace-normal">Go to order</ButtonLink>
        <ButtonLink href="/cookies#cookies" variant="secondary" className="whitespace-normal">Continue shopping</ButtonLink>
      </nav>
    </section>
  )
}