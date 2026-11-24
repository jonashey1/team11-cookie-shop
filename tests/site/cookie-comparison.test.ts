import { describe, expect, it } from 'vitest'
import { COOKIES } from '@/content/cookies'
import {
  canCompare, comparisonInsights, comparisonProducts, comparisonRows, normalizeComparison,
  removeCookie, rowDiffers, selectCookie,
} from '@/lib/cookie-comparison'

describe('cookie comparison selection', () => {
  it('adds distinct products up to three and removes or clears the selection', () => {
    const first = selectCookie([], 1)
    expect(first).toEqual({ ids: [1], status: 'added' })
    expect(canCompare(first.ids)).toBe(false)
    expect(selectCookie(first.ids, 1)).toEqual({ ids: [1], status: 'already-selected' })
    const second = selectCookie(first.ids, 2)
    expect(canCompare(second.ids)).toBe(true)
    const third = selectCookie(second.ids, 5)
    expect(selectCookie(third.ids, 6)).toEqual({ ids: [1, 2, 5], status: 'full' })
    expect(removeCookie(third.ids, 2)).toEqual([1, 5])
    expect(canCompare([])).toBe(false)
  })

  it('sanitizes persisted values without reordering valid products', () => {
    expect(normalizeComparison([3, 3, '2', 0, null, 2, 6, 5])).toEqual([3, 2, 6])
    expect(normalizeComparison({ ids: [1, 2] })).toEqual([])
    expect(normalizeComparison(null)).toEqual([])
  })
})

describe('catalogue comparison', () => {
  it('uses catalogue prices and flavour labels and retains ties', () => {
    const cookies = comparisonProducts([5, 2, 1])
    expect(comparisonRows(cookies)[0].values).toEqual(cookies.map(cookie => cookie.price))
    expect(comparisonRows(cookies)[1].values).toEqual(cookies.map(cookie => cookie.flavour))
    const insights = comparisonInsights(cookies)
    expect(insights.find(point => point.label === 'Most affordable')?.cookies).toEqual([COOKIES[0]])
    expect(insights.find(point => point.label === 'Richest chocolate flavour')?.cookies).toEqual([COOKIES[1]])
    expect(insights.find(point => point.label === 'Sweetest option')?.cookies).toEqual([COOKIES[4], COOKIES[1]])
    expect(comparisonInsights(comparisonProducts([2, 5]))[0].cookies).toEqual([COOKIES[1], COOKIES[4]])
  })

  it('does not mistake missing values for differences', () => {
    expect(rowDiffers([undefined, undefined])).toBe(false)
    expect(rowDiffers([4, undefined, 4])).toBe(false)
    expect(rowDiffers([4, undefined, 1])).toBe(true)
    expect(comparisonRows(comparisonProducts([1, 5])).find(row => row.label === 'Texture')?.values).toEqual(['Soft and chewy', 'Soft and chewy'])
  })
})