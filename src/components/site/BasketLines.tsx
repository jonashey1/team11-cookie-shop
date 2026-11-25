'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { boxPrice, mergeBox } from '@/lib/cookie-box'
import { formatOrderAmount, useOrderBasket } from './OrderBasket'

export function BasketLines({ onChange, onRemove }: { onChange?: () => void; onRemove?: () => void }) {
  const { products, chosen, singles, boxes, quantities, pending, changeQuantity, changeBoxQuantity } = useOrderBasket()
  function adjust(update: () => void, removesLine = false) {
    update()
    onChange?.()
    if (removesLine) onRemove?.()
  }
  return (
    <ul className="grid gap-3">
      {chosen.filter(cookie => singles[cookie.id] > 0).map(cookie => {
        const count = singles[cookie.id]
        return (
          <li key={cookie.id} data-flavour={cookie.id} className="boutique-basket-line boutique-basket-item border-b border-line pb-2">
            {cookie.image && <Image src={cookie.image.src} alt="" width={56} height={56} className="size-14 rounded-control object-cover" />}
            <div className="boutique-basket-details min-w-0">
              <strong>{cookie.name} × {count}</strong>
              <p className="text-sm">{formatOrderAmount(cookie.price)} each · {formatOrderAmount(cookie.price * count)} subtotal</p>
            </div>
            <div className="boutique-basket-controls flex flex-wrap items-center gap-1">
              <Button type="button" variant="secondary" size="icon" aria-label={`Decrease basket quantity of ${cookie.name}`} disabled={pending}
                onClick={() => adjust(() => changeQuantity(cookie.id, -1), count === 1)}>−</Button>
              <Button type="button" variant="secondary" size="icon" aria-label={`Increase basket quantity of ${cookie.name}`} disabled={pending || quantities[cookie.id] >= 20}
                onClick={() => adjust(() => changeQuantity(cookie.id, 1))}>+</Button>
              <Button type="button" variant="quiet" className="px-2" aria-label={`Remove ${cookie.name} from basket`} disabled={pending}
                onClick={() => adjust(() => changeQuantity(cookie.id, -count), true)}>Remove</Button>
            </div>
          </li>
        )
      })}
      {boxes.map((box, index) => {
        const label = `box ${index + 1}`
        const name = box.name || 'Personalised cookie box'
        const unit = boxPrice(box.cookies, products)
        return (
          <li key={box.id} className="grid min-w-0 gap-2 border-b border-line pb-3">
            <div className="flex flex-wrap items-baseline justify-between gap-1">
              <strong className="min-w-0 [overflow-wrap:anywhere]">{name} × {box.quantity}</strong>
              <span className="font-semibold tabular-nums">{formatOrderAmount(unit * box.quantity)}</span>
            </div>
            <ul aria-label={`Cookies in ${label}`} className="grid grid-cols-2 gap-2">
              {box.cookies.map((id, slot) => {
                const cookie = products.find(product => product.id === id)
                return <li key={slot} className="flex min-w-0 flex-wrap items-center gap-1 text-xs">
                  {cookie?.image && <Image src={cookie.image.src} alt="" width={32} height={32} className="size-8 rounded-control object-cover" />}
                  <span className="min-w-0 [overflow-wrap:anywhere]">{cookie?.name}</span>
                </li>
              })}
            </ul>
            {box.message && <p className="border-s-2 border-line ps-2 text-sm [overflow-wrap:anywhere]">{box.message}</p>}
            <p className="text-sm">{formatOrderAmount(unit)} per box · 4 cookies per box</p>
            <div className="flex flex-wrap items-center gap-1">
              <Button type="button" variant="secondary" size="icon" aria-label={`Decrease quantity of ${label}`} disabled={pending}
                onClick={() => adjust(() => changeBoxQuantity(box.id, -1), box.quantity === 1)}>−</Button>
              <Button type="button" variant="secondary" size="icon" aria-label={`Increase quantity of ${label}`} disabled={pending || !mergeBox(quantities, box.cookies)}
                onClick={() => adjust(() => changeBoxQuantity(box.id, 1))}>+</Button>
              <Button type="button" variant="quiet" className="px-2" aria-label={`Remove ${label} from basket`} disabled={pending}
                onClick={() => adjust(() => changeBoxQuantity(box.id, -box.quantity), true)}>Remove</Button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
