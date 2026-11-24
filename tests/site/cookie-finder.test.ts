import { expect, it } from 'vitest'
import { COOKIES } from '@/content/cookies'
import { findCookie, QUESTIONS, type Answer } from '@/lib/cookie-finder'

it('recommends each catalogue cookie across all answer combinations', () => {
  const combinations = QUESTIONS.reduce<Answer[][]>(
    (paths, question) => paths.flatMap(path => question.options.map(option => [...path, option.value])),
    [[]],
  )
  expect(combinations).toHaveLength(256)

  const winners = new Set<number>()
  for (const answers of combinations) {
    const result = findCookie(answers)
    expect(COOKIES).toContain(result)
    expect(findCookie(answers)).toBe(result)
    winners.add(result.id)
  }
  expect(winners).toEqual(new Set(COOKIES.map(cookie => cookie.id)))
})

it('chooses the lower product ID when Double Chocolate and White Chocolate tie', () => {
  expect(findCookie(['sweet', 'chocolate', 'sweet', 'chocolate']).id).toBe(2)
})
