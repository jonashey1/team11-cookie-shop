import type { MetadataRoute } from 'next'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { starterWorkshopSlugs, starterWorkshopTopicSlugs } from '@/lib/public-workshop-content'

export const dynamic = 'force-dynamic'

const origin = 'https://team11-cookie-shop.vercel.app'
const destinations = ['/', '/cookies', '/cookie-finder', '/build-your-box', '/clinics', '/workshops', '/about', '/contact']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const payload = await getPayload({ config })
  const [workshops, topics] = await Promise.all([
    payload.find({ collection: 'workshops', depth: 0, pagination: false, overrideAccess: false, where: { slug: { not_in: starterWorkshopSlugs } } }),
    payload.find({ collection: 'topics', depth: 0, pagination: false, overrideAccess: false, where: { slug: { not_in: starterWorkshopTopicSlugs } } }),
  ])
  return [
    ...destinations,
    ...workshops.docs.map(record => '/workshops/' + encodeURIComponent(record.slug)),
    ...topics.docs.map(record => '/topics/' + encodeURIComponent(record.slug)),
  ].map(path => ({ url: origin + path }))
}
