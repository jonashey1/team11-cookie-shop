'use client'

import { createContext, useContext, useState, useSyncExternalStore, type Dispatch, type ReactNode, type SetStateAction } from 'react'
import type { CookieProduct } from '@/content/cookies'
import { basketQuantities, EMPTY_BASKET, readBasket, type BasketBox, type BasketSnapshot, type Quantities } from '@/lib/order-basket'
import { mergeBox } from '@/lib/cookie-box'

type NewBox = Pick<BasketBox, 'cookies' | 'name' | 'message'>
type OrderBasket = {
  products: readonly CookieProduct[]
  quantities: Quantities
  singles: Quantities
  boxes: BasketBox[]
  chosen: CookieProduct[]
  itemCount: number
  total: number
  pending: boolean
  setPending: Dispatch<SetStateAction<boolean>>
  changeQuantity: (id: CookieProduct['id'], delta: number) => void
  addBox: (box: NewBox) => boolean
  changeBoxQuantity: (id: string, delta: number) => void
  clear: () => void
  getRequestId: () => string
}

const OrderBasketContext = createContext<OrderBasket | null>(null)
const currency = new Intl.NumberFormat('en-BE', { style: 'currency', currency: 'EUR' })
const STORAGE_KEY = 'cookie-shop-order-basket'
const listeners = new Set<() => void>()
let snapshot: BasketSnapshot | undefined

const getServerBasket = () => EMPTY_BASKET

function getBasket() {
  if (snapshot) return snapshot
  snapshot = EMPTY_BASKET
  try {
    snapshot = readBasket(JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? 'null'))
  } catch {
    // The basket still works in memory when the browser blocks storage.
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
    if (Object.keys(next.quantities).length || next.boxes.length) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } else {
      sessionStorage.removeItem(STORAGE_KEY)
    }
  } catch {
    // Keep the in-memory basket when storage is unavailable.
  }
  listeners.forEach(listener => listener())
}

function changeQuantity(id: CookieProduct['id'], delta: number) {
  const current = getBasket()
  const single = current.quantities[id] ?? 0
  const next = Math.max(0, Math.min(single + delta, single + 20 - (basketQuantities(current)[id] ?? 0)))
  if (next === single) return
  const quantities = { ...current.quantities }
  if (next) quantities[id] = next
  else delete quantities[id]
  saveBasket({ ...current, quantities, requestId: null })
}

function addBox(box: NewBox) {
  const current = getBasket()
  if (!mergeBox(basketQuantities(current), box.cookies)) return false
  saveBasket({ ...current, boxes: [...current.boxes, { ...box, id: crypto.randomUUID(), quantity: 1 }], requestId: null })
  return true
}

function changeBoxQuantity(id: string, delta: number) {
  const current = getBasket()
  const box = current.boxes.find(item => item.id === id)
  if (!box || (delta > 0 && !mergeBox(basketQuantities(current), box.cookies))) return
  const boxes = current.boxes.map(item => item.id === id ? { ...item, quantity: item.quantity + delta } : item)
    .filter(item => item.quantity > 0)
  saveBasket({ ...current, boxes, requestId: null })
}

const clear = () => saveBasket(EMPTY_BASKET)

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

export function OrderBasketProvider({ children, products }: { children: ReactNode; products: readonly CookieProduct[] }) {
  const stored = useSyncExternalStore(subscribe, getBasket, getServerBasket)
  const [pending, setPending] = useState(false)
  const singles = stored.quantities
  const boxes = stored.boxes.filter(box => box.cookies.every(id => products.some(product => product.id === id)))
  const quantities = basketQuantities({ ...stored, boxes })
  const chosen = products.filter(cookie => (quantities[cookie.id] ?? 0) > 0)
  const total = chosen.reduce((sum, cookie) => sum + cookie.price * quantities[cookie.id], 0)
  const itemCount = products.reduce((sum, product) => sum + (singles[product.id] ?? 0), 0)
    + boxes.reduce((sum, box) => sum + box.quantity, 0)

  return (
    <OrderBasketContext.Provider value={{ products, quantities, singles, boxes, chosen, itemCount, total, pending, setPending, changeQuantity, addBox, changeBoxQuantity, clear, getRequestId }}>
      {children}
    </OrderBasketContext.Provider>
  )
}

export function useOrderBasket() {
  const basket = useContext(OrderBasketContext)
  if (!basket) throw new Error('useOrderBasket needs an OrderBasketProvider.')
  return basket
}

export function useCookieCatalog() {
  return useOrderBasket().products
}
