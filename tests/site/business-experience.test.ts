import { describe, expect, it } from 'vitest'
import { COOKIES } from '@/content/cookies'
import { BOX_SUGGESTIONS, boxPrice, emptyBox, mergeBox } from '@/lib/cookie-box'
import { explainCookieMatch, findCookie, QUESTIONS, type Answer } from '@/lib/cookie-finder'
import { analyticsCsv, parseAnalyticsFilters, summarizeOrders } from '@/lib/order-analytics'

describe('box configuration', () => {
  it('prices four cookies from the catalogue and preserves existing quantities', () => {
    const entries = BOX_SUGGESTIONS['Chocolate Lovers']
    expect(entries).toEqual([1, 2, 1, 2])
    expect(boxPrice(entries)).toBe(2 * (COOKIES[0].price + COOKIES[1].price))
    expect(mergeBox({ 1: 1, 5: 2 }, entries)).toEqual({ 1: 3, 2: 2, 5: 2 })
    expect(mergeBox({ 1: 19 }, entries)).toBeNull()
    expect(mergeBox({}, [1, 2, 3])).toBeNull()
    expect(mergeBox({}, [1, 2, 3, 4, 5])).toBeNull()
    expect(emptyBox()).toEqual([null, null, null, null])
    for (const suggestion of Object.values(BOX_SUGGESTIONS)) {
      expect(suggestion).toHaveLength(4)
      expect(suggestion.every(id => COOKIES.some(cookie => cookie.id === id))).toBe(true)
    }
  })
})

describe('explainable recommendations', () => {
  it('keeps every existing recommendation and chooses a different alternative', () => {
    const paths = QUESTIONS.reduce<Answer[][]>((current, question) => current.flatMap(path => question.options.map(option => [...path, option.value])), [[]])
    expect(paths).toHaveLength(256)
    for (const answers of paths) {
      const match = explainCookieMatch(answers)
      expect(match.cookie).toBe(findCookie(answers))
      expect(match.alternative?.id).not.toBe(match.cookie.id)
      expect(match.reasons.length).toBeGreaterThan(0)
    }
    expect(explainCookieMatch(['chocolate']).reasons).toEqual(['rich chocolate'])
  })
})

describe('order analytics', () => {
  it('validates exact UTC dates and uses exclusive end boundaries', () => {
    const now = new Date('2026-11-24T10:00:00Z')
    expect(parseAnalyticsFilters(new URLSearchParams('period=7&status=processing'), now)).toMatchObject({
      start: '2026-11-18T00:00:00.000Z', end: '2026-11-25T00:00:00.000Z', status: 'processing',
    })
    expect(parseAnalyticsFilters(new URLSearchParams('period=custom&from=2026-02-30&to=2026-03-02'), now)).toBeNull()
    expect(parseAnalyticsFilters(new URLSearchParams('period=custom&from=2026-11-02&to=2026-11-01'), now)).toBeNull()
    expect(parseAnalyticsFilters(new URLSearchParams('status=invalid'), now)).toBeNull()
  })

  it('uses historical order totals, handles ties and empty data, and neutralizes formulas', () => {
    const item = { cookieId: 1, cookieName: '=Formula', quantity: 2, unitPriceCents: 200 }
    const data = summarizeOrders([
      { totalCents: 400, items: [item], status: 'new', createdAt: '2026-11-23T00:00:00.000Z' },
      { totalCents: 800, items: [{ ...item, cookieId: 2, cookieName: 'Other', unitPriceCents: 400 }], status: 'completed', createdAt: '2026-12-01T00:00:00.000Z' },
    ])
    expect(data).toMatchObject({ orderCount: 2, totalCents: 1200, averageCents: 600, cookies: 4, averageCookies: 2, highest: 800 })
    expect(data.most).toEqual(["=Formula", "Other"])
    expect(data.periods).toEqual([['2026-11', { orders: 1, cents: 400 }], ['2026-12', { orders: 1, cents: 800 }]])
    const csv = analyticsCsv(data)
    expect(csv).toContain("'=Formula")
    expect(csv).not.toContain('customerName')
    expect(summarizeOrders([])).toMatchObject({ orderCount: 0, averageCents: 0, averageCookies: 0, periods: [] })
  })
})
