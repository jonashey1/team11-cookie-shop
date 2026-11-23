'use client'

import { useRef, useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { COOKIES } from '@/content/cookies'
import { saveOrder } from '@/tasks/order-cookies/saveOrder'
import { track } from '@/lib/analytics'

const money = (cents: number) =>
  new Intl.NumberFormat('en-BE', { style: 'currency', currency: 'EUR' }).format(cents / 100)

export function CookieOrderForm() {
  const [quantities, setQuantities] = useState<Record<number, number>>({})
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [confirmed, setConfirmed] = useState('')
  const requestId = useRef<string | null>(null)

  const chosen = COOKIES.filter((cookie) => (quantities[cookie.id] ?? 0) > 0)
  const total = chosen.reduce((sum, cookie) => sum + cookie.price * quantities[cookie.id], 0)

  function changeQuantity(cookieId: number, delta: number) {
    if (pending) return
    setQuantities((previous) => {
      const next = Math.max(0, Math.min(20, (previous[cookieId] ?? 0) + delta))
      return { ...previous, [cookieId]: next }
    })
    requestId.current = null
    setError('')
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending || chosen.length === 0) return
    const data = new FormData(event.currentTarget)
    data.set('items', JSON.stringify(chosen.map((cookie) => ({
      cookieId: cookie.id,
      quantity: quantities[cookie.id],
    }))))
    requestId.current ??= crypto.randomUUID()
    data.set('requestId', requestId.current)
    setPending(true)
    setError('')
    try {
      const result = await saveOrder(data)
      if (result.success) {
        setConfirmed(result.orderName)
        track('cookie_order_saved')
        setQuantities({})
      } else {
        setError(result.message)
      }
    } catch {
      setError('We could not confirm whether your order was saved. Please try again; your basket is kept.')
    } finally {
      setPending(false)
    }
  }

  if (confirmed) {
    return (
      <section aria-labelledby="order-confirmed" className="grid gap-5 rounded-panel bg-mint-wash p-6 sm:p-10" role="status">
        <h2 id="order-confirmed" className="text-2xl">Your test order is saved!</h2>
        <p>We saved your order in Cookie Shop. This is a university practice project: no payment is taken and nobody will contact you.</p>
        <p className="break-all text-sm"><strong>Reference:</strong> {confirmed}</p>
        <Button type="button" className="w-fit" onClick={() => { setConfirmed(''); requestId.current = null }}>Place another test order</Button>
      </section>
    )
  }

  return (
    <form onSubmit={submit} className="grid gap-section">
      <section aria-labelledby="choose-cookies" className="grid gap-block">
        <div className="grid gap-2">
          <h2 id="choose-cookies" className="text-2xl">1. Choose your cookies</h2>
          <p>Pick your favourite flavours. You can order up to 20 of each cookie.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {COOKIES.map((cookie) => (
            <article key={cookie.id} className="framed grid content-between gap-4 p-5 offset-purple">
              <div className="grid gap-3">
                <span aria-hidden="true" className="text-4xl">{cookie.emoji}</span>
                <h3 className="text-xl">{cookie.name}</h3>
                <p>{cookie.description}</p>
                <p className="text-sm"><strong>Flavour:</strong> {cookie.flavour}</p>
                <p className="font-bold">{money(cookie.price)} each</p>
              </div>
              <div className="flex items-center gap-3">
                <Button type="button" variant="secondary" size="icon" aria-label={`Remove one ${cookie.name}`} disabled={pending || !(quantities[cookie.id] > 0)} onClick={() => changeQuantity(cookie.id, -1)}>−</Button>
                <output className="min-w-7 text-center font-bold" aria-label={`${cookie.name} quantity`}>{quantities[cookie.id] ?? 0}</output>
                <Button type="button" variant="secondary" size="icon" aria-label={`Add one ${cookie.name}`} disabled={pending || (quantities[cookie.id] ?? 0) >= 20} onClick={() => changeQuantity(cookie.id, 1)}>+</Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="basket" className="grid gap-5 rounded-panel bg-mint-wash p-6 sm:p-10">
        <h2 id="basket" className="text-2xl">2. Review your basket</h2>
        {chosen.length === 0 ? <p>Your basket is empty. Add a cookie above to continue.</p> : (
          <ul className="grid gap-3">
            {chosen.map((cookie) => (
              <li key={cookie.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/20 pb-3">
                <span>{cookie.name} × {quantities[cookie.id]}</span>
                <strong>{money(cookie.price * quantities[cookie.id])}</strong>
              </li>
            ))}
          </ul>
        )}
        <p className="text-xl font-bold">Total: {money(total)}</p>
        <p className="text-sm">No online payment. This is a test website: use made-up details only.</p>
      </section>

      <section aria-labelledby="customer-details" className="grid max-w-2xl gap-5">
        <h2 id="customer-details" className="text-2xl">3. Send your test order</h2>
        <div className="grid gap-2">
          <label htmlFor="customerName" className="font-bold">Name (made-up)</label>
          <input id="customerName" name="customerName" required minLength={2} maxLength={100} autoComplete="off" placeholder="Example Customer" className="min-h-11 w-full rounded-control border-2 border-ink bg-canvas px-4 py-2 text-ink" />
        </div>
        <div className="grid gap-2">
          <label htmlFor="email" className="font-bold">Email (made-up)</label>
          <input id="email" name="email" type="email" required autoComplete="off" placeholder="example@example.com" className="min-h-11 w-full rounded-control border-2 border-ink bg-canvas px-4 py-2 text-ink" />
        </div>
        {error && <div role="alert" className="rounded-control border-2 border-ink p-4"><strong>Order not confirmed.</strong> {error}</div>}
        <Button type="submit" disabled={pending || chosen.length === 0} className="w-fit">
          {pending ? 'Saving your order…' : 'Place test order'}
        </Button>
      </section>
    </form>
  )
}
