import 'server-only'
import { getPayload, type Where } from 'payload'
import config from '@/payload.config'
import { summarizeOrders, type AnalyticsOrder, type DateFilter } from './order-analytics'

export async function orderAnalyticsEditor(headers: Headers) {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })
  return user?.collection === 'users' ? { payload, user } : null
}

export async function readOrderAnalytics(editor: NonNullable<Awaited<ReturnType<typeof orderAnalyticsEditor>>>, filter: DateFilter) {
  const conditions: Where[] = []
  if (filter.start) conditions.push({ createdAt: { greater_than_equal: filter.start } })
  if (filter.end) conditions.push({ createdAt: { less_than: filter.end } })
  if (filter.status) conditions.push({ status: { equals: filter.status } })
  const orders: AnalyticsOrder[] = []
  let page = 1
  while (true) {
    const result = await editor.payload.find({
      collection: 'orders',
      overrideAccess: false,
      user: editor.user,
      depth: 0,
      page,
      limit: 100,
      sort: 'id',
      select: { createdAt: true, items: true, totalCents: true, status: true },
      where: conditions.length ? { and: conditions } : undefined,
    })
    orders.push(...result.docs)
    if (!result.hasNextPage) break
    page++
  }
  return summarizeOrders(orders)
}
