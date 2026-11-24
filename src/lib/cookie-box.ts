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

export const BOX_NAME_LIMIT = 40
export const BOX_MESSAGE_LIMIT = 120

export function boxPreviewText(text: string, limit: number) {
  return text.slice(0, limit)
}

export function parseSavedBox(value: string | null): BoxSlots | null {
  if (!value) return null
  try {
    const ids: unknown = JSON.parse(value)
    if (!Array.isArray(ids) || ids.length !== 4) return null
    const [a, b, c, d] = ids
    const valid = (id: unknown): id is BoxCookieId => COOKIES.some(cookie => cookie.id === id)
    return valid(a) && valid(b) && valid(c) && valid(d) ? [a, b, c, d] : null
  } catch {
    return null
  }
}
