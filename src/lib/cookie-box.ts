import { COOKIES, type CookieProduct } from '@/content/cookies'

export type BoxCookieId = CookieProduct['id']

export const BOX_SIZES = [
  { label: 'Small Box', capacity: 4 },
  { label: 'Medium Box', capacity: 6 },
  { label: 'Large Box', capacity: 12 },
] as const

export const BOX_SUGGESTIONS = {
  'A Little Bit of Everything': COOKIES.map(cookie => cookie.id),
  'Chocolate Lovers': COOKIES.filter(cookie => cookie.flavour === 'Chocolate').map(cookie => cookie.id),
}

export function boxPrice(ids: readonly BoxCookieId[]) {
  return ids.reduce((sum, id) => sum + (COOKIES.find(cookie => cookie.id === id)?.price ?? 0), 0)
}

export function fillBox(capacity: number, flavours: readonly BoxCookieId[]) {
  return flavours.length ? Array.from({ length: capacity }, (_, index) => flavours[index % flavours.length]) : []
}

export function mergeBox(previous: Record<number, number>, ids: readonly BoxCookieId[]) {
  const next = { ...previous }
  for (const id of ids) {
    next[id] = (next[id] ?? 0) + 1
    if (next[id] > 20) return null
  }
  return next
}
