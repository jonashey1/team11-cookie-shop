import { COOKIES, type CookieProduct } from '@/content/cookies'

export type BoxCookieId = CookieProduct['id']
type BoxSlot = BoxCookieId | null
export type BoxSlots = [BoxSlot, BoxSlot, BoxSlot, BoxSlot]

export function emptyBox(): BoxSlots {
  return [null, null, null, null]
}

export const BOX_SUGGESTIONS = {
  'A Little Bit of Everything': [1, 3, 4, 5],
  'Chocolate Lovers': [1, 2, 1, 2],
} as const satisfies Record<string, readonly [BoxCookieId, BoxCookieId, BoxCookieId, BoxCookieId]>

export function boxPrice(ids: readonly BoxCookieId[]) {
  return ids.reduce((sum, id) => sum + (COOKIES.find(cookie => cookie.id === id)?.price ?? 0), 0)
}

export function mergeBox(previous: Record<number, number>, ids: readonly BoxCookieId[]) {
  if (ids.length !== 4) return null
  const next = { ...previous }
  for (const id of ids) {
    next[id] = (next[id] ?? 0) + 1
    if (next[id] > 20) return null
  }
  return next
}
