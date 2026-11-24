'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useCookieCatalog } from './OrderBasket'
import { saveOrder, type OrderReceipt } from '@/tasks/order-cookies/saveOrder'
import { track } from '@/lib/analytics'
import { cookieImage } from '@/lib/workshop-image'
import { ButtonLink } from './ButtonLink'
import { AddCookieToBasket } from './AddCookieToBasket'
import { formatOrderAmount, useOrderBasket } from './OrderBasket'

export function CookieOrderForm() {
  const products = useCookieCatalog()
  const { quantities, setQuantities, chosen, total, pending, setPending, getRequestId } = useOrderBasket()
  const [error, setError] = useState('')
  const [confirmed, setConfirmed] = useState<OrderReceipt | null>(null)
  const receiptHeading = useRef<HTMLHeadingElement>(null)
  const submitting = useRef(false)
  const selectedFlavours = new Set(chosen.map(cookie => cookie.flavour))
  const unselected = products.filter(cookie => !quantities[cookie.id])
  const suggestions = chosen.length ? [unselected.find(cookie => selectedFlavours.has(cookie.flavour)), unselected.find(cookie => !selectedFlavours.has(cookie.flavour))].filter(cookie => cookie !== undefined) : []

  useEffect(() => { if (confirmed) receiptHeading.current?.focus() }, [confirmed])

  function changeQuantity(cookieId: number, delta: number) {
    if (pending) return
    setQuantities((previous) => {
      const next = Math.max(0, Math.min(20, (previous[cookieId] ?? 0) + delta))
      return { ...previous, [cookieId]: next }
    })
    setError('')
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current || pending || chosen.length === 0) return
    const data = new FormData(event.currentTarget)
    data.set('items', JSON.stringify(chosen.map((cookie) => ({
      cookieId: cookie.id,
      quantity: quantities[cookie.id],
    }))))
    data.set('requestId', getRequestId())
    data.set('expectedTotal', String(total))
    submitting.current = true
    setPending(true)
    setError('')
    try {
      const result = await saveOrder(data)
      if (result.success) {
        setConfirmed(result.receipt)
        setQuantities({})
        track('cookie_order_saved')
      } else {
        setError(result.message)
      }
    } catch {
      setError('We could not confirm whether your order was saved. Please try again; your basket is kept.')
    } finally {
      submitting.current = false
      setPending(false)
    }
  }

  if (confirmed) {
    return (
      <section aria-labelledby="order-confirmed" className="cookie-order-receipt grid gap-stack rounded-frame border border-line border-t-4 border-t-success bg-success-wash p-4 sm:p-block" role="status">
        <h2 id="order-confirmed" ref={receiptHeading} tabIndex={-1} className="text-3xl">Thank you for your order!</h2>
        <p>Your test order is saved.</p>
        <OrderCelebration />
        <p>This is a fictional order for a university project. No payment has been taken and no products will be shipped.</p>
        <dl className="grid gap-2">
          <div><dt className="font-semibold">Reference</dt><dd className="break-all">{confirmed.name}</dd></div>
          <div><dt className="font-semibold">Date (UTC)</dt><dd><time dateTime={confirmed.createdAt}>{confirmed.createdAt.slice(0, 10)}</time></dd></div>
        </dl>
        <ul className="grid gap-3">
          {confirmed.items.map(item => {
            const image = cookieImage(item.cookieName)
            return <li key={item.cookieId} className="flex flex-wrap items-center gap-3 border-b border-line pb-2">
              {image && <Image src={image.src} alt={image.alt} width={48} height={48} className="size-12 rounded-control object-cover" />}
              <div><strong>{item.cookieName}</strong><p>{item.quantity} × {formatOrderAmount(item.unitPriceCents)} · {formatOrderAmount(item.quantity * item.unitPriceCents)}</p></div>
            </li>
          })}
        </ul>
        <p className="text-xl font-bold">Total: {formatOrderAmount(confirmed.totalCents)}</p>
        <div className="cookie-receipt-actions flex flex-wrap gap-3">
          <Button type="button" className="whitespace-normal" onClick={() => window.print()}>Print or save as PDF</Button>
          <ButtonLink href="/cookies" variant="secondary">Continue shopping</ButtonLink>
          <ButtonLink href="/" variant="quiet">Back to homepage</ButtonLink>
          <Button type="button" variant="quiet" onClick={() => setConfirmed(null)}>Place another test order</Button>
        </div>
      </section>
    )
  }

  return (
    <form onSubmit={submit} className="grid gap-section">
      <section aria-labelledby="choose-cookies" className="grid gap-block">
        <div className="grid gap-2">
          <h2 id="choose-cookies" className="text-3xl">1. Choose your cookies</h2>
          <p>Pick your favourite flavours. You can order up to 20 of each cookie.</p>
        </div>
        <div className="grid gap-block sm:grid-cols-2 lg:grid-cols-3">
          {products.map((cookie) => {
            const image = cookie.image
            return (
              <article key={cookie.id} data-flavour={cookie.id} className="boutique-order-choice grid min-w-0 content-between gap-stack border border-line p-5">
                <div className="grid gap-3">
                  <div className="flex items-center gap-3">
                    {image && <Image src={image.src} alt={image.alt} width={80} height={80} className="size-20 shrink-0 rounded-frame object-cover" />}
                    <h3 className="min-w-0 text-xl">{cookie.name}</h3>
                  </div>
                  <p>{cookie.description}</p>
                  <p className="text-sm"><strong>Flavour:</strong> {cookie.flavour}</p>
                  <p className="font-heading text-lg font-bold tabular-nums">{formatOrderAmount(cookie.price)} each</p>
                </div>
                <div className="flex flex-wrap items-center gap-stack border-t border-line pt-stack">
                  <Button type="button" variant="secondary" size="icon" aria-label={`Remove one ${cookie.name}`} disabled={pending || !(quantities[cookie.id] > 0)} onClick={() => changeQuantity(cookie.id, -1)}>−</Button>
                  <output className="min-w-7 text-center font-bold tabular-nums" aria-label={`${cookie.name} quantity`}>{quantities[cookie.id] ?? 0}</output>
                  <Button type="button" variant="secondary" size="icon" aria-label={`Add one ${cookie.name}`} disabled={pending || (quantities[cookie.id] ?? 0) >= 20} onClick={() => changeQuantity(cookie.id, 1)}>+</Button>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section aria-labelledby="basket" className="grid gap-stack rounded-frame border border-line border-t-4 border-t-brand bg-yellow-wash p-4 sm:p-block">
        <h2 id="basket" className="text-3xl">2. Review your basket</h2>
        {chosen.length === 0 ? <div className="flex flex-wrap items-center gap-3 border-y border-line py-4">
          <svg aria-hidden="true" viewBox="0 0 48 48" className="size-12 shrink-0 text-ink-soft" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
            <path d="M9 18h30l-5 21H14L9 18Zm7 0 8-10 8 10M19 24l2 9m8-9-2 9" />
          </svg>
          <p>Your basket is empty. Choose a cookie from the assortment or add one above.</p>
        </div> : (
          <ul className="grid gap-3">
            {chosen.map((cookie) => (
              <li key={cookie.id} data-flavour={cookie.id} className="boutique-basket-line boutique-basket-item border-b border-line">
                {cookie.image && <Image src={cookie.image.src} alt={cookie.image.alt} width={56} height={56} className="size-14 shrink-0 rounded-control object-cover" />}
                <div className="boutique-basket-details min-w-0 flex-1">
                  <strong>{cookie.name} × {quantities[cookie.id]}</strong>
                  <p className="text-sm">{formatOrderAmount(cookie.price)} each · {formatOrderAmount(cookie.price * quantities[cookie.id])} subtotal</p>
                </div>
                <div className="boutique-basket-controls flex flex-wrap items-center gap-1">
                  <Button type="button" variant="secondary" size="icon" aria-label={`Decrease basket quantity of ${cookie.name}`} disabled={pending} onClick={() => changeQuantity(cookie.id, -1)}>−</Button>
                  <Button type="button" variant="secondary" size="icon" aria-label={`Increase basket quantity of ${cookie.name}`} disabled={pending || quantities[cookie.id] >= 20} onClick={() => changeQuantity(cookie.id, 1)}>+</Button>
                  <Button type="button" variant="quiet" aria-label={`Remove ${cookie.name} from basket`} disabled={pending} onClick={() => changeQuantity(cookie.id, -quantities[cookie.id])}>Remove</Button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <p className="font-heading text-2xl font-bold tabular-nums">Total: {formatOrderAmount(total)}</p>
        <p className="text-sm">No online payment. This is a test website: use made-up details only.</p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/cookies" variant="secondary">Continue shopping</ButtonLink>
          {chosen.length > 0 && <ButtonLink href="/clinics#customer-details">Proceed to checkout</ButtonLink>}
        </div>
      </section>

      {suggestions.length > 0 && (
        <section aria-labelledby="basket-suggestions" className="grid gap-3 rounded-panel border border-line bg-canvas p-4">
          <h2 id="basket-suggestions" className="text-xl">You might also enjoy</h2>
          <ul className="flex flex-wrap gap-4">
            {suggestions.map(cookie => <li key={cookie.id} className="boutique-basket-line grid min-w-0 gap-1">
              <strong>{cookie.name}</strong>
              <span className="text-sm">{selectedFlavours.has(cookie.flavour) ? 'Similar flavour' : 'A different flavour'} · {formatOrderAmount(cookie.price)}</span>
              <AddCookieToBasket cookie={cookie} />
            </li>)}
          </ul>
        </section>
      )}

      <section aria-labelledby="customer-details" className="max-w-reading grid min-w-0 gap-stack rounded-frame border border-line border-s-4 border-s-brand bg-blue-tint p-4 sm:p-block">
        <h2 id="customer-details" className="text-3xl">3. Send your test order</h2>
        <div className="grid gap-2">
          <label htmlFor="customerName" className="font-bold">Name (made-up)</label>
          <input id="customerName" name="customerName" type="text" autoCapitalize="words" required minLength={2} maxLength={100} autoComplete="off" placeholder="Example: Jan" className="min-h-11 w-full rounded-control border-2 border-ink bg-canvas px-4 py-2 text-base text-ink placeholder:text-ink-soft placeholder:opacity-100" />
        </div>
        <div className="grid gap-2">
          <label htmlFor="email" className="font-bold">Email (made-up)</label>
          <input id="email" name="email" type="email" inputMode="email" autoCapitalize="none" required autoComplete="off" placeholder="example@email.com" className="min-h-11 w-full rounded-control border-2 border-ink bg-canvas px-4 py-2 text-base text-ink placeholder:text-ink-soft placeholder:opacity-100" />
        </div>
        {error && <div role="alert" className="rounded-control border border-ink bg-error-wash p-4"><strong>Order not confirmed.</strong> {error}</div>}
        <Button type="submit" disabled={pending || chosen.length === 0} className="w-fit max-w-full whitespace-normal text-center">
          {pending ? 'Saving your order…' : 'Place test order'}
        </Button>
      </section>
    </form>
  )
}


function OrderCelebration() {
  return (
    <svg className="cookie-order-celebration" viewBox="0 0 200 104" aria-hidden="true" focusable="false">
      <path className="celebration-lid" d="M48 62 59 23h82l11 39Z" fill="var(--boutique-paper)" stroke="var(--color-brand)" strokeWidth="3" />
      <g className="celebration-cookies" fill="var(--color-brand)" stroke="var(--color-ink)" strokeWidth="2">
        <circle cx="77" cy="61" r="15" /><circle cx="101" cy="53" r="15" /><circle cx="125" cy="61" r="15" />
        <path d="M73 57h3m5 8h3m15-15h3m-1 7h3m17 0h3m2 8h3" strokeLinecap="round" />
      </g>
      <path d="M48 63h104l-10 32H58Z" fill="var(--color-brand)" stroke="var(--color-ink)" strokeWidth="2" />
      <circle className="celebration-seal" cx="100" cy="79" r="13" fill="var(--color-canvas)" stroke="var(--color-success)" strokeWidth="2" />
      <path className="celebration-seal" d="m94 79 4 4 8-9" fill="none" stroke="var(--color-success)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path className="celebration-sparks" d="M30 48v12m-6-6h12m134-6v12m-6-6h12M42 36h1m114 0h1" stroke="var(--color-brand)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
