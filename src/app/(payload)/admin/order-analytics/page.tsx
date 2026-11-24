import { headers } from 'next/headers'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ORDER_STATUSES, parseAnalyticsFilters } from '@/lib/order-analytics'
import { orderAnalyticsEditor, readOrderAnalytics } from '@/lib/read-order-analytics'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Order analytics', robots: { index: false, follow: false } }
const amount = new Intl.NumberFormat('en-BE', { style: 'currency', currency: 'EUR' })
const periods = [['all', 'All time'], ['7', 'Last 7 days'], ['30', 'Last 30 days'], ['90', 'Last 90 days'], ['custom', 'Custom date range']]

function Breakdown({ title, rows, total }: { title: string; rows: [string, number][]; total?: number }) {
  const max = Math.max(1, ...rows.map(([, value]) => value))
  return <section className="order-analytics__panel">
    <h2>{title}</h2>
    {rows.length ? <ul>{rows.map(([label, value]) => <li key={label}>
      <span>{label} · {value}{total ? ` (${Math.round(value / total * 100)}%)` : ''}</span>
      <meter aria-hidden="true" min={0} max={max} value={value} />
    </li>)}</ul> : <p>No records match the active filters.</p>}
  </section>
}

export default async function OrderAnalyticsPage({ searchParams }: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const editor = await orderAnalyticsEditor(await headers())
  if (!editor) notFound()
  const params = new URLSearchParams()
  for (const [name, value] of Object.entries(await searchParams)) if (typeof value === 'string') params.set(name, value)
  const filters = parseAnalyticsFilters(params)
  const data = filters ? await readOrderAnalytics(editor, filters) : null
  const topCombinations = data?.combinations.filter(([, n]) => n === data.combinations[0]?.[1]).map(([label]) => label)
  return <main className="order-analytics">
    <Link href="/admin">Back to Payload admin</Link>
    <h1>Cookie Shop order analytics</h1>
    <p>Recorded fictional orders. Values do not represent real revenue. Dates use UTC.</p>
    <form className="order-analytics__filters" action="/admin/order-analytics">
      <div><label htmlFor="analytics-period">Period</label><select id="analytics-period" name="period" defaultValue={params.get('period') ?? 'all'}>{periods.map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div>
      <div><label htmlFor="analytics-from">Custom start</label><input id="analytics-from" name="from" type="date" defaultValue={params.get('from') ?? ''} /></div>
      <div><label htmlFor="analytics-to">Custom end</label><input id="analytics-to" name="to" type="date" defaultValue={params.get('to') ?? ''} /></div>
      <div><label htmlFor="analytics-status">Order status</label><select id="analytics-status" name="status" defaultValue={params.get('status') ?? ''}>
        <option value="">All statuses</option>{ORDER_STATUSES.map(status => <option key={status}>{status}</option>)}
      </select></div>
      <button type="submit">Apply filters</button>
    </form>
    {!data ? <p role="alert">Choose a valid period and ordered start and end dates.</p> : <>
      <p><a href={`/api/order-analytics/export?${params}`}>Download aggregated CSV</a></p>
      <dl className="order-analytics__grid">
        {[
          ['Total test order value', amount.format(data.totalCents / 100)],
          ['Total orders', data.orderCount],
          ['Average order value', amount.format(data.averageCents / 100)],
          ['Total cookies ordered', data.cookies],
          ['Average cookies per order', data.averageCookies.toFixed(1)],
        ].map(([label, value]) => <div className="order-analytics__panel" key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
      </dl>
      <div className="order-analytics__grid">
        <Breakdown title="Most ordered cookies" rows={data.products} />
        <Breakdown title="Product mix" rows={data.products} total={data.cookies} />
        <Breakdown title="Order size distribution" rows={data.sizes} />
        <Breakdown title="Order status overview" rows={data.statuses} />
      </div>
      <section className="order-analytics__panel">
        <h2>Order value and count over time</h2>
        {data.periods.length ? <table>
          <thead><tr><th scope="col">Month (UTC)</th><th scope="col">Orders</th><th scope="col">Value</th></tr></thead>
          <tbody>{data.periods.map(([month, value]) => <tr key={month}>
            <th scope="row">{month}</th><td>{value.orders}</td><td>{amount.format(value.cents / 100)}</td>
          </tr>)}</tbody>
        </table> : <p>No records match the active filters.</p>}
      </section>
      <section className="order-analytics__panel">
        <h2>Business insights</h2>
        {data.orderCount ? <ul>
          <li>Most ordered: {data.most.join(', ') || 'Not enough order data to generate this insight.'}</li>
          <li>Least ordered among purchased flavours: {data.least.join(', ') || 'Not enough order data to generate this insight.'}</li>
          <li>Average basket size: {data.averageCookies.toFixed(1)} cookies</li>
          <li>Highest order value: {amount.format(data.highest / 100)}</li>
          <li>Most frequent flavour combinations: {topCombinations?.join('; ') || 'Not enough order data to generate this insight.'}</li>
        </ul> : <p>Not enough order data to generate this insight.</p>}
      </section>
    </>}
  </main>
}
