'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import type { CookieProduct } from '@/content/cookies'
import { useOrderBasket } from './OrderBasket'

export function AddCookieToBasket({ cookie }: { cookie: CookieProduct }) {
  const { pending, quantities, changeQuantity } = useOrderBasket()
  const [message, setMessage] = useState('')
  return <div className="grid gap-1">
    <Button type="button" variant="secondary" className="w-fit max-w-full whitespace-normal"
      aria-label={`Add ${cookie.name} to basket`} disabled={pending || (quantities[cookie.id] ?? 0) >= 20}
      onClick={() => {
        changeQuantity(cookie.id, 1)
        setMessage(`${cookie.name} added to your basket.`)
      }}>Add to basket</Button>
    <p role="status" className={message ? 'text-sm' : 'sr-only'}>{message}</p>
  </div>
}
