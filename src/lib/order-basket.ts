import { COOKIE_IDS } from '@/content/cookies'
import { BOX_MESSAGE_LIMIT, BOX_NAME_LIMIT, boxPreviewText, mergeBox, type BoxCookieId } from './cookie-box'

export type Quantities = Record<number, number>
export type BasketBox = { id: string; cookies: BoxCookieId[]; name: string; message: string; quantity: number }
export type BasketSnapshot = { quantities: Quantities; boxes: BasketBox[]; requestId: string | null }
export const EMPTY_BASKET: BasketSnapshot = { quantities: {}, boxes: [], requestId: null }

const validId = (id: unknown): id is string => typeof id === 'string' && /^[0-9a-f-]{36}$/i.test(id)
const validCookie = (id: unknown): id is BoxCookieId => COOKIE_IDS.some(cookie => cookie === id)

export function basketQuantities({ quantities, boxes }: BasketSnapshot): Quantities {
  const total = { ...quantities }
  for (const box of boxes) {
    for (const id of box.cookies) total[id] = (total[id] ?? 0) + box.quantity
  }
  return total
}

export function readBasket(value: unknown): BasketSnapshot {
  if (!value || typeof value !== 'object') return EMPTY_BASKET
  const raw = value as Partial<BasketSnapshot>
  const quantities: Quantities = {}
  const boxes: BasketBox[] = []
  for (const id of COOKIE_IDS) {
    const quantity = raw.quantities?.[id]
    if (typeof quantity === 'number' && Number.isInteger(quantity) && quantity >= 1 && quantity <= 20) quantities[id] = quantity
  }
  let total = quantities
  if (Array.isArray(raw.boxes)) {
    for (const item of raw.boxes.slice(0, 30)) {
      if (!item || !validId(item.id) || boxes.some(box => box.id === item.id) ||
        !Array.isArray(item.cookies) || item.cookies.length !== 4 || !item.cookies.every(validCookie) ||
        !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 20) continue
      let candidate: Quantities | null = total
      for (let count = 0; count < item.quantity && candidate; count++) candidate = mergeBox(candidate, item.cookies)
      if (!candidate) continue
      total = candidate
      boxes.push({
        id: item.id, cookies: item.cookies, quantity: item.quantity,
        name: typeof item.name === 'string' ? boxPreviewText(item.name, BOX_NAME_LIMIT) : '',
        message: typeof item.message === 'string' ? boxPreviewText(item.message, BOX_MESSAGE_LIMIT) : '',
      })
    }
  }
  const validRequest = Object.keys(quantities).length > 0 || boxes.length > 0
  return { quantities, boxes, requestId: validRequest && validId(raw.requestId) ? raw.requestId : null }
}
