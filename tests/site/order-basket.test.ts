import { describe, expect, it } from 'vitest'
import { basketQuantities, readBasket } from '../../src/lib/order-basket'

const box = { id: '12345678-1234-4234-8234-123456789012', cookies: [1, 2, 1, 2], name: 'Gift', message: 'Enjoy', quantity: 2 }

describe('basket storage', () => {
  it('restores legacy loose cookies and the existing retry key', () => {
    expect(readBasket({ quantities: { 1: 3, 2: '5', 10: 6 }, requestId: box.id })).toEqual({
      quantities: { 1: 3 }, requestId: box.id, boxes: [],
    })
  })

  it('stores a personalised box separately and aggregates its four slots for checkout', () => {
    const basket = readBasket({ quantities: { 1: 2 }, boxes: [box] })
    expect(basket.boxes).toEqual([box])
    expect(basketQuantities(basket)).toEqual({ 1: 6, 2: 4 })
  })

  it('rejects malformed and over-limit boxes without losing valid loose cookies', () => {
    expect(readBasket({ quantities: { 1: 19 }, boxes: [null, { ...box, cookies: [1] }, box] })).toEqual({
      quantities: { 1: 19 }, boxes: [], requestId: null,
    })
  })
})
