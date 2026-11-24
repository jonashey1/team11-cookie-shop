import { COOKIES, type CookieProduct } from '@/content/cookies'

export type CookieId = CookieProduct['id']
export const MAX_COMPARISON = 3
export const MIN_COMPARISON = 2

export function normalizeComparison(value: unknown): CookieId[] {
  if (!Array.isArray(value)) return []
  const known = new Set<unknown>(COOKIES.map(cookie => cookie.id))
  return [...new Set(value.filter((id): id is CookieId => known.has(id)))].slice(0, MAX_COMPARISON)
}

export function selectCookie(ids: readonly CookieId[], id: CookieId) {
  if (ids.includes(id)) return { ids, status: 'already-selected' } as const
  if (ids.length >= MAX_COMPARISON) return { ids, status: 'full' } as const
  return { ids: [...ids, id], status: 'added' } as const
}

export function removeCookie(ids: readonly CookieId[], id: CookieId) {
  return ids.filter(selected => selected !== id)
}

export function canCompare(ids: readonly CookieId[]) {
  return ids.length >= MIN_COMPARISON
}

export function comparisonProducts(ids: readonly CookieId[], products: readonly CookieProduct[] = COOKIES) {
  return ids.flatMap(id => products.filter(cookie => cookie.id === id))
}

type Rating = 1 | 2 | 3 | 4 | 5
type Profile = {
  sweetness: Rating
  chocolate: Rating
  texture: string
  preference: string
  caramel?: true
}

export const flavourProfiles: Record<CookieId, Profile> = {
  1: { sweetness: 3, chocolate: 3, texture: 'Soft and chewy', preference: 'Classic chocolate chip flavours' },
  2: { sweetness: 4, chocolate: 5, texture: 'Rich and soft', preference: 'Deep cocoa flavours' },
  3: { sweetness: 5, chocolate: 2, texture: 'Soft and creamy', preference: 'Creamy white chocolate' },
  4: { sweetness: 4, chocolate: 2, texture: 'Soft and tender', preference: 'Mild cocoa and red velvet flavours' },
  5: { sweetness: 4, chocolate: 1, texture: 'Soft and chewy', preference: 'Sweet and salty caramel', caramel: true },
  6: { sweetness: 5, chocolate: 3, texture: 'Soft with crunchy pieces', preference: 'Cookies-and-cream flavours' },
}

export function profileFor(cookie: CookieProduct) {
  return cookie.profile ?? flavourProfiles[cookie.id]
}

type Row = {
  label: string
  values: (string | number | undefined)[]
  kind?: 'rating' | 'price'
}

export function comparisonRows(cookies: readonly CookieProduct[]): Row[] {
  return [
    { label: 'Price per cookie', kind: 'price', values: cookies.map(cookie => cookie.price) },
    { label: 'Flavour category', values: cookies.map(cookie => cookie.flavour) },
    { label: 'Sweetness', kind: 'rating', values: cookies.map(cookie => profileFor(cookie).sweetness) },
    { label: 'Chocolate intensity', kind: 'rating', values: cookies.map(cookie => profileFor(cookie).chocolate) },
    { label: 'Texture', values: cookies.map(cookie => profileFor(cookie).texture) },
    { label: 'Best for', values: cookies.map(cookie => profileFor(cookie).preference) },
    { label: 'Description and flavour profile', values: cookies.map(cookie => cookie.description) },
  ]
}

export function rowDiffers(values: Row['values']) {
  return new Set(values.filter(value => value !== undefined)).size > 1
}

export function comparisonInsights(cookies: readonly CookieProduct[]) {
  function leaders(value: (cookie: CookieProduct) => number | undefined, choose: typeof Math.max) {
    const scores = cookies.map(cookie => value(cookie))
    const known = scores.filter(score => score !== undefined)
    return known.length ? cookies.filter((_, index) => scores[index] === choose(...known)) : []
  }

  return [
    { label: 'Most affordable', cookies: leaders(cookie => cookie.price, Math.min) },
    { label: 'Richest chocolate flavour', cookies: leaders(cookie => profileFor(cookie).chocolate, Math.max) },
    { label: 'Sweetest option', cookies: leaders(cookie => profileFor(cookie).sweetness, Math.max) },
    { label: 'Best match for caramel lovers', cookies: cookies.filter(cookie => profileFor(cookie).caramel) },
  ].filter(insight => insight.cookies.length > 0)
}