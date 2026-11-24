import { analyticsCsv, parseAnalyticsFilters } from '@/lib/order-analytics'
import { orderAnalyticsEditor, readOrderAnalytics } from '@/lib/read-order-analytics'

const headers = { 'Cache-Control': 'private, no-store' }

export async function GET(request: Request) {
  const editor = await orderAnalyticsEditor(request.headers)
  if (!editor) return new Response('Forbidden', { status: 403, headers })
  const filters = parseAnalyticsFilters(new URL(request.url).searchParams)
  if (!filters) return new Response('Invalid filters', { status: 400, headers })
  return new Response(analyticsCsv(await readOrderAnalytics(editor, filters)), {
    headers: {
      ...headers,
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="cookie-shop-order-analytics.csv"',
    },
  })
}
