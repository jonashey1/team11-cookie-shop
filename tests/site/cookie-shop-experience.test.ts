import { describe, expect, it } from 'vitest'
import { COOKIES } from '@/content/cookies'
import { flavourProfiles } from '@/lib/cookie-comparison'
import { passportTitles } from '@/lib/cookie-passport'
import { explainCookieMatch, QUESTIONS, type Answer } from '@/lib/cookie-finder'
import { BOX_MESSAGE_LIMIT, BOX_NAME_LIMIT, boxPreviewText, boxPrice, parseSavedBox } from '@/lib/cookie-box'
import { summarizeOrders, type AnalyticsOrder } from '@/lib/order-analytics'

describe('Cookie Shop Experience', () => {
  it('has a Passport for all actual Finder results and keeps the runner-up distinct', () => {
    const sets = QUESTIONS.reduce<Answer[][]>((sets, q) => sets.flatMap(set => q.options.map(o => [...set, o.value])), [[]])
    const titles = new Set(sets.map(answers => {
      const { cookie, alternative } = explainCookieMatch(answers)
      expect(alternative?.id).not.toBe(cookie.id)
      return passportTitles[cookie.id]
    }))
    expect(sets).toHaveLength(256)
    expect(titles.size).toBe(6)
  })

  it('maps every canonical cookie to a distinct ordinal map position', () => {
    const positions = COOKIES.map(({ id }) => {
      const { sweetness, chocolate } = flavourProfiles[id]
      expect(sweetness).toBeGreaterThanOrEqual(1)
      expect(sweetness).toBeLessThanOrEqual(5)
      expect(chocolate).toBeGreaterThanOrEqual(1)
      expect(chocolate).toBeLessThanOrEqual(5)
      return [sweetness, chocolate].join(':')
    })
    expect(new Set(positions).size).toBe(COOKIES.length)
  })

  it('rejects malformed or non-catalogue boxes and restores duplicates at current prices', () => {
    for (const value of [null, 'invalid', '{}', '[1,2,3]', '[1,2,3,9]', '[1,2,3,"4"]', '[1,2,3,4,5]']) {
      expect(parseSavedBox(value)).toBeNull()
    }
    expect(parseSavedBox('[1,2,1,2]')).toEqual([1, 2, 1, 2])
    expect(boxPrice([1, 2, 1, 2])).toBe(1490)
    expect(boxPreviewText('a'.repeat(80), BOX_NAME_LIMIT)).toHaveLength(40)
    expect(boxPreviewText('<b>sweet</b>' + 'c'.repeat(150), BOX_MESSAGE_LIMIT)).toHaveLength(120)
  })

  it('counts each valid unordered pair once per order and breaks ties by label', () => {
    const item = (cookieId: number, quantity: number) => ({ cookieId, cookieName: 'Recorded label', quantity, unitPriceCents: 350 })
    const order = (...items: AnalyticsOrder['items']): AnalyticsOrder => ({ items, totalCents: 0, createdAt: '2026-11-24', status: 'completed' })
    const data = summarizeOrders([order(item(2, 1), item(1, 2), item(1, 1), item(99, 2)), order(item(3, 1), item(1, 1)), order(item(3, 4)), order(item(2, 0), item(4, 1))])
    expect(data.eligibleOrders).toBe(2)
    expect(data.productPairs).toEqual([['Classic Chocolate Chip + Double Chocolate', 1], ['Classic Chocolate Chip + White Chocolate', 1]])
    expect(summarizeOrders([]).productPairs).toEqual([])
    expect(summarizeOrders([]).eligibleOrders).toBe(0)
  })
})
