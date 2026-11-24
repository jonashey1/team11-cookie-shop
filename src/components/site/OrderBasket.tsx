'use client'

import { createContext, useContext, useState, useSyncExternalStore, type Dispatch, type ReactNode, type SetStateAction } from 'react'
import { COOKIES, type CookieProduct } from '@/content/cookies'
import { useCookies } from '@/components/site/CookieCatalogue'

type Quantities = Record<number, number>
type BasketSnapshot = { quantities: Quantities; requestId: string | null }

type OrderBasket = {
  quantities: Quantities
  setQuantities: Dispatch<SetStateAction<Quantities>>
  chosen: CookieProduct[]
  count: number
  total: number
  pending: boolean
  setPending: Dispatch<SetStateAction<boolean>>
  getRequestId: () => string
}

const OrderBasketContext = createContext<OrderBasket | null>(null)
const currency = new Intl.NumberFormat('en-BE', { style: 'currency', currency: 'EUR' })
const STORAGE_KEY = 'cookie-shop-order-basket'
const EMPTY: BasketSnapshot = { quantities: {}, requestId: null }
const listeners = new Set<() => void>()
let snapshot: BasketSnapshot | undefined

function getServerBasket() {
  return EMPTY
}

function getBasket() {
  if (snapshot) return snapshot

  snapshot = EMPTY
  try {
    const stored = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? 'null') as Partial<BasketSnapshot> | null
    const quantities: Quantities = {}
    for (const { id } of COOKIES) {
      const quantity = stored?.quantities?.[id]
      if (typeof quantity === 'number' && Number.isInteger(quantity) && quantity >= 1 && quantity <= 20) {
        quantities[id] = quantity
      }
    }
    const requestId = stored?.requestId
    if (Object.keys(quantities).length > 0) {
      snapshot = {
        quantities,
        requestId: typeof requestId === 'string' && /^[0-9a-f-]{36}$/i.test(requestId) ? requestId : null,
      }
    }
  } catch {
    // The basket still works on this page when the browser blocks storage.
  }
  return snapshot
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => { listeners.delete(listener) }
}

function saveBasket(next: BasketSnapshot) {
  snapshot = next
  try {
    // Keep the quantities and order reference together so a retry after a reload uses the same order.
    if (Object.values(next.quantities).some(quantity => quantity > 0)) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } else {
      sessionStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    // Keep the in-memory basket when storage is unavailable.
  }
  listeners.forEach(listener => listener())
}

function setQuantities(update: SetStateAction<Quantities>) {
  const current = getBasket()
  const quantities = typeof update === 'function' ? update(current.quantities) : update
  saveBasket({ quantities, requestId: null })
}

function getRequestId() {
  const current = getBasket()
  if (current.requestId) return current.requestId
  const requestId = crypto.randomUUID()
  saveBasket({ ...current, requestId })
  return requestId
}

export function formatOrderAmount(cents: number) {
  return currency.format(cents / 100)
}

export function OrderBasketProvider({ children }: { children: ReactNode }) {
  const { quantities } = useSyncExternalStore(subscribe, getBasket, getServerBasket)
  const [pending, setPending] = useState(false)
  // Names and prices from the database, so the basket total matches what the order action charges.
  const cookies = useCookies()
  const chosen = cookies.filter((cookie) => (quantities[cookie.id] ?? 0) > 0)
  const count = chosen.reduce((sum, cookie) => sum + quantities[cookie.id], 0)
  const total = chosen.reduce((sum, cookie) => sum + cookie.price * quantities[cookie.id], 0)

  return (
    <OrderBasketContext.Provider value={{ quantities, setQuantities, chosen, count, total, pending, setPending, getRequestId }}>
      {children}
    </OrderBasketContext.Provider>
  )
}

export function useOrderBasket() {
  const basket = useContext(OrderBasketContext)
  if (!basket) throw new Error('useOrderBasket needs an OrderBasketProvider.')
  return basket
}
