// The cookies as the database holds them, for server code: pages and the order action.
// Editors change them in /admin (collection "cookies"); this reads them once per request.
import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { COOKIES, isCookieId, type CookieProduct } from '@/content/cookies'

export const getCookieCatalogue = cache(async (): Promise<CookieProduct[]> => {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'cookies',
    sort: 'catalogueId',
    depth: 0,
    limit: 100,
    overrideAccess: false,
  })
  // Only the fixed catalogue numbers have an illustration and a tasting profile, so a record with
  // another number is left out instead of showing a cookie without a picture.
  const cookies = docs.flatMap((record): CookieProduct[] => {
    if (!isCookieId(record.catalogueId)) return []
    const original = COOKIES.find(cookie => cookie.id === record.catalogueId)
    return [{
      id: record.catalogueId,
      name: record.name,
      description: record.description,
      flavour: record.flavour,
      price: record.priceCents,
      emoji: original?.emoji ?? '🍪',
    }]
  })
  // A database without cookie records (before its first migration) still shows the shop.
  return cookies.length > 0 ? cookies : COOKIES.map(cookie => ({ ...cookie }))
})
