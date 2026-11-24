import { COOKIES } from '@/content/cookies'
import type { Order } from '@/payload-types'

export const PERIODS = ['all', '7', '30', '90', 'custom'] as const
export const ORDER_STATUSES = ['new', 'processing', 'completed', 'cancelled'] as const
type Period = (typeof PERIODS)[number]
type Status = (typeof ORDER_STATUSES)[number]
export type AnalyticsOrder = Pick<Order, 'createdAt' | 'items' | 'totalCents' | 'status'>
export type DateFilter = { period: Period; from: string; to: string; status?: Status; start?: string; end?: string }
const day = 86_400_000

function date(value: string | undefined) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return ''
  const parsed = new Date(value)
  return Number.isFinite(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value ? value : ''
}

export function parseAnalyticsFilters(query: URLSearchParams, now = new Date()): DateFilter | null {
  const requested = query.get('period') ?? 'all'
  const period = PERIODS.find(value => value === requested)
  const rawStatus = query.get('status') ?? ''
  const status = ORDER_STATUSES.find(value => value === rawStatus)
  if (!period || (rawStatus && !status)) return null
  if (period === 'all') return { period, from: '', to: '', status }
  const to = period === 'custom' ? date(query.get('to') ?? undefined) : now.toISOString().slice(0, 10)
  const from = period === 'custom' ? date(query.get('from') ?? undefined)
    : new Date(new Date(to).valueOf() - (Number(period) - 1) * day).toISOString().slice(0, 10)
  if (!from || !to || from > to) return null
  return { period, from, to, status, start: new Date(from).toISOString(), end: new Date(new Date(to).valueOf() + day).toISOString() }
}

function counts(map: Map<string, number>) {
  return [...map].sort(([a, n], [b, m]) => m - n || a.localeCompare(b))
}

export function summarizeOrders(orders: Iterable<AnalyticsOrder>) {
  const products = new Map<string, number>()
  const statuses = new Map<string, number>()
  const sizes = new Map<string, number>()
  const pairs = new Map<string, number>()
  const knownProducts = new Map<number, string>(COOKIES.map(cookie => [cookie.id, cookie.name]))
  let eligibleOrders = 0
  const combinations = new Map<string, number>()
  const periods = new Map<string, { orders: number; cents: number }>()
  let orderCount = 0
  let totalCents = 0
  let cookies = 0
  let highest = 0

  for (const order of orders) {
    orderCount++
    totalCents += order.totalCents
    highest = Math.max(highest, order.totalCents)
    const key = order.createdAt.slice(0, 7)
    const period = periods.get(key) ?? { orders: 0, cents: 0 }
    periods.set(key, { orders: period.orders + 1, cents: period.cents + order.totalCents })
    const status = order.status || 'Unspecified'
    statuses.set(status, (statuses.get(status) ?? 0) + 1)
    let size = 0
    for (const item of order.items) {
      products.set(item.cookieName, (products.get(item.cookieName) ?? 0) + item.quantity)
      size += item.quantity
    }
    cookies += size
    sizes.set(String(size), (sizes.get(String(size)) ?? 0) + 1)
    const mix = [...new Set(order.items.map(item => item.cookieName))].sort().join(' + ')
    const ids = [...new Set(order.items.filter(item => item.quantity > 0 && knownProducts.has(item.cookieId)).map(item => item.cookieId))].sort((a, b) => a - b)
    if (ids.length >= 2) eligibleOrders++
    ids.forEach((left, index) => {
      for (const right of ids.slice(index + 1)) {
        const label = knownProducts.get(left) + ' + ' + knownProducts.get(right)
        pairs.set(label, (pairs.get(label) ?? 0) + 1)
      }
    })
    if (mix) combinations.set(mix, (combinations.get(mix) ?? 0) + 1)
  }

  const productTotals = counts(products)
  return {
    orderCount, totalCents, cookies, highest,
    averageCents: orderCount ? Math.round(totalCents / orderCount) : 0,
    averageCookies: orderCount ? cookies / orderCount : 0,
    products: productTotals,
    most: productTotals.filter(([, n]) => n === productTotals[0]?.[1]).map(([name]) => name),
    least: productTotals.filter(([, n]) => n === productTotals.at(-1)?.[1]).map(([name]) => name),
    sizes: [...sizes].sort(([a], [b]) => Number(a) - Number(b)),
    statuses: counts(statuses),
    combinations: counts(combinations),
    productPairs: counts(pairs), eligibleOrders,
    periods: [...periods].sort(([a], [b]) => a.localeCompare(b)),
  }
}

export type OrderAnalytics = ReturnType<typeof summarizeOrders>

function csvCell(value: string | number) {
  const text = String(value)
  // Stored labels are untrusted text. Prevent spreadsheet formula evaluation.
  const safe = typeof value === 'string' && /^(?:\s*[=+@-]|[\t\r\n])/.test(text) ? "'" + text : text
  return '"' + safe.replaceAll('"', '""') + '"'
}

export function analyticsCsv(data: OrderAnalytics) {
  const rows: (string | number)[][] = [
    ['Category', 'Label', 'Count', 'Value (EUR cents)'],
    ['Summary', 'All included orders', data.orderCount, data.totalCents],
    ['Summary', 'Average order value', '', data.averageCents],
    ['Summary', 'Cookies ordered', data.cookies, ''],
    ...data.products.map(([label, count]) => ['Product', label, count, '']),
    ...data.periods.map(([label, value]) => ['Month (UTC)', label, value.orders, value.cents]),
    ...data.sizes.map(([label, count]) => ['Cookies per order', label, count, '']),
    ...data.statuses.map(([label, count]) => ['Order status', label, count, '']),
  ]
  return rows.map(row => row.map(csvCell).join(',')).join('\r\n') + '\r\n'
}
