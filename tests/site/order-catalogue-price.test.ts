import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getPayload } from 'payload'
import { saveOrder } from '@/tasks/order-cookies/saveOrder'

// The order action must charge the price an editor keeps in the cookies collection, not the price
// that was first written in the code. Payload is replaced by a small stand-in that answers with one
// cookie whose price an editor changed.
vi.mock('payload', () => ({ getPayload: vi.fn() }))
vi.mock('@/payload.config', () => ({ default: {} }))

const editedCookie = {
  catalogueId: 1,
  name: 'Classic Chocolate Chip (renamed)',
  slug: 'classic-chocolate-chip',
  description: 'Edited in /admin.',
  flavour: 'Chocolate',
  priceCents: 420,
}

function form(items: string) {
  const data = new FormData()
  data.set('requestId', '10000000-0000-4000-8000-000000000042')
  data.set('customerName', 'Fictional Customer')
  data.set('email', 'fictional@cookieshop.example')
  data.set('items', items)
  return data
}

beforeEach(() => {
  vi.clearAllMocks()
  const create = vi.fn(async ({ data }: { data: Record<string, unknown> }) => ({ ...data, createdAt: '2026-11-24T00:00:00.000Z' }))
  const find = vi.fn(async ({ collection }: { collection: string }) => ({
    docs: collection === 'cookies' ? [editedCookie] : [],
  }))
  vi.mocked(getPayload).mockResolvedValue({ find, create } as never)
})

describe('order prices come from the cookies collection', () => {
  it('charges the edited price and copies the edited name into the order line', async () => {
    const result = await saveOrder(form('[{"cookieId":1,"quantity":2}]'))
    expect(result.success).toBe(true)
    if (!result.success) return
    expect(result.receipt.totalCents).toBe(840)
    expect(result.receipt.items).toEqual([
      { cookieId: 1, cookieName: 'Classic Chocolate Chip (renamed)', quantity: 2, unitPriceCents: 420 },
    ])
  })

  it('refuses a cookie that is no longer in the collection', async () => {
    const result = await saveOrder(form('[{"cookieId":2,"quantity":1}]'))
    expect(result).toEqual({ success: false, message: 'This cookie is no longer available.' })
  })
})
