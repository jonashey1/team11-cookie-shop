import Link from 'next/link'
import { headers } from 'next/headers'
import { orderAnalyticsEditor } from '@/lib/read-order-analytics'

export async function OrderAnalyticsLink() {
  if (!await orderAnalyticsEditor(await headers())) return null
  return <Link href="/admin/order-analytics">Order analytics</Link>
}
