import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getPayload } from 'payload'
import { saveOrder } from '@/tasks/order-cookies/saveOrder'

vi.mock('@/lib/read-cookie-catalog', () => ({ readCookieCatalog: vi.fn() }))
vi.mock('payload', () => ({ getPayload: vi.fn() }))
vi.mock('@/payload.config', () => ({ default: {} }))

const requestId = '10000000-0000-4000-8000-000000000001'

function form(items: string, reference = requestId) {
  const data = new FormData()
  data.set('requestId', reference)
  data.set('customerName', 'Fictional Customer')
  data.set('email', 'fictional@example.invalid')
  data.set('items', items)
  return data
}

beforeEach(() => vi.clearAllMocks())

describe('order input before Payload writes', () => {
  it.each([
    'not JSON',
    '[]',
    '[null]',
    '[{"cookieId":true,"quantity":1}]',
    '[{"cookieId":1,"quantity":true}]',
    '[{"cookieId":[1],"quantity":1}]',
    '[{"cookieId":1,"quantity":"1"}]',
    '[{"cookieId":1000,"quantity":1}]',
    '[{"cookieId":1,"quantity":21}]',
    '[{"cookieId":1,"quantity":1.5}]',
    '[{"cookieId":1,"quantity":1},{"cookieId":1,"quantity":1}]',
  ])('rejects %s before opening Payload', async items => {
    expect((await saveOrder(form(items))).success).toBe(false)
    expect(getPayload).not.toHaveBeenCalled()
  })

  it('rejects a malformed reference before opening Payload', async () => {
    expect((await saveOrder(form('[{"cookieId":1,"quantity":1}]', '-'.repeat(36)))).success).toBe(false)
    expect(getPayload).not.toHaveBeenCalled()
  })
})
