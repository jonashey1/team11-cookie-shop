'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ButtonLink } from './ButtonLink'
import { COOKIES } from '@/content/cookies'
import { BOX_SIZES, BOX_SUGGESTIONS, boxPrice, fillBox, mergeBox, type BoxCookieId } from '@/lib/cookie-box'
import { cookieImage } from '@/lib/workshop-image'
import { formatOrderAmount, useOrderBasket } from './OrderBasket'

export function CookieBoxBuilder() {
  const [capacity, setCapacity] = useState<number>(4)
  const [slots, setSlots] = useState<BoxCookieId[]>([])
  const [feedback, setFeedback] = useState('')
  const { pending, quantities, setQuantities } = useOrderBasket()
  const adding = useRef(false)

  function update(next: BoxCookieId[]) {
    adding.current = false
    setSlots(next)
    setFeedback(next.length === capacity ? 'Your box is full. You can add it to your basket.' : `${next.length} of ${capacity} slots filled.`)
  }

  return (
    <section aria-label="Cookie box builder" className="grid min-w-0 gap-block pb-block">
      <div className="grid gap-4 rounded-panel border border-line bg-yellow-wash p-4 sm:p-6">
        <fieldset>
          <legend className="mb-3 font-heading text-xl font-bold">Choose a box size</legend>
          <div className="flex flex-wrap gap-3">
            {BOX_SIZES.map(size => (
              <label key={size.capacity} className="inline-flex min-h-11 items-center gap-2 rounded-control border border-line bg-canvas px-3">
                <input type="radio" name="box-size" checked={capacity === size.capacity}
                  className="accent-ink" onChange={() => {
                    if (slots.length > size.capacity) {
                      setFeedback(`Remove ${slots.length - size.capacity} cookies before choosing that box.`)
                      return
                    }
                    setCapacity(size.capacity)
                    setFeedback(`${slots.length} of ${size.capacity} slots filled.`)
                  }} />
                {size.label} · {size.capacity}
              </label>
            ))}
          </div>
        </fieldset>
        <p className="font-semibold">{slots.length} of {capacity} filled · {capacity - slots.length} free · {formatOrderAmount(boxPrice(slots))}</p>
        <ul aria-label="Box slots" className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {Array.from({ length: capacity }, (_, index) => {
            const cookie = COOKIES.find(item => item.id === slots[index])
            const image = cookie ? cookieImage(cookie.name) : undefined
            return <li key={index} className="relative aspect-square overflow-hidden rounded-frame border border-line bg-canvas">
              {cookie ? <>
                {image && <Image src={image.src} alt={image.alt} fill sizes="(min-width: 640px) 16vw, 30vw" className="object-cover" />}
                <Button type="button" variant="secondary" size="icon" className="absolute end-0 top-0"
                  aria-label={`Remove ${cookie.name} from slot ${index + 1}`} onClick={() => update(slots.filter((_, slot) => slot !== index))}>×</Button>
              </> : <span className="absolute inset-0 grid place-items-center text-sm text-ink-soft">Empty</span>}
            </li>
          })}
        </ul>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="quiet" disabled={!slots.length} onClick={() => update([])}>Reset box</Button>
          {Object.entries(BOX_SUGGESTIONS).map(([label, ids]) => (
            <Button key={label} type="button" variant="secondary" className="whitespace-normal"
              disabled={slots.length > 0} onClick={() => update(fillBox(capacity, ids))}>{label}</Button>
          ))}
        </div>
        <p className="text-sm">Suggestions fill an empty box. Each cookie is added as an individual item at its catalogue price.</p>
        <div className="flex flex-wrap gap-3">
          <Button type="button" disabled={slots.length !== capacity || pending} onClick={() => {
            if (adding.current || slots.length !== capacity) return
            const next = mergeBox(quantities, slots)
            if (!next) { setFeedback('Your basket can hold up to 20 of each flavour. Adjust it before adding this box.'); return }
            adding.current = true
            setQuantities(next)
            setSlots([])
            setFeedback('Box added to your basket.')
          }}>Add box to basket</Button>
          <ButtonLink href="/clinics#basket" variant="secondary">Review basket</ButtonLink>
        </div>
        <p role="status" className="min-h-6 text-sm font-semibold">{feedback}</p>
      </div>
      <h2 className="text-2xl">Choose your flavours</h2>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {COOKIES.map(cookie => {
          const image = cookieImage(cookie.name)
          const quantity = slots.filter(id => id === cookie.id).length
          return <li key={cookie.id} className="grid content-start gap-2 rounded-panel border border-line bg-blue-tint p-4">
            {image && <div className="relative aspect-[4/3] overflow-hidden rounded-frame">
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 88vw" className="object-cover" />
            </div>}
            <h3 className="text-xl">{cookie.name}</h3>
            <p>{cookie.description}</p>
            <p className="font-semibold">{formatOrderAmount(cookie.price)} · {quantity} in box</p>
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="secondary" aria-label={`Add ${cookie.name} to box`} disabled={slots.length >= capacity}
                onClick={() => { if (slots.length < capacity) update([...slots, cookie.id]) }}>Add</Button>
              <Button type="button" variant="quiet" aria-label={`Remove ${cookie.name} from box`} disabled={!quantity}
                onClick={() => update(slots.filter((_, index) => index !== slots.lastIndexOf(cookie.id)))}>Remove</Button>
            </div>
          </li>
        })}
      </ul>
    </section>
  )
}
