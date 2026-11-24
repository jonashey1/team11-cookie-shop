import 'server-only'
import { cache } from 'react'
import { getPayload, type Payload } from 'payload'
import config from '@/payload.config'
import { COOKIE_IDS, type CookieProduct } from '@/content/cookies'
import { COOKIE_IMAGES } from './workshop-image'

export async function readCookieCatalog(payload: Payload): Promise<CookieProduct[]> {
  const { docs } = await payload.find({ collection: 'cookies', depth: 0, pagination: false, sort: 'productId', overrideAccess: false })
  return COOKIE_IDS.map(id => {
    const cookie = docs.find(record => record.productId === id)
    const image = cookie && COOKIE_IMAGES[cookie.illustration]
    if (!cookie || !image || !Number.isSafeInteger(cookie.price) || cookie.price <= 0) {
      throw new Error('The product catalogue is incomplete or has an invalid price.')
    }
    return {
      id, name: cookie.name, description: cookie.description, flavour: cookie.flavour, price: cookie.price, image,
      profile: { sweetness: cookie.sweetness, chocolate: cookie.chocolate, texture: cookie.texture, preference: cookie.preference, caramel: cookie.caramel === true },
    }
  })
}

// Share the catalogue lookup within one render. Requests and writes always see current CMS data.
export const getCookieCatalog = cache(async () => readCookieCatalog(await getPayload({ config })))
