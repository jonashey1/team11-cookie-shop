import { COOKIES, type CookieProduct } from '@/content/cookies'

export type Answer = 'chocolate' | 'sweet' | 'balanced' | 'adventurous' | 'classic' | 'cookies-and-cream'

type Question = {
  title: string
  subtitle: string
  options: {
    label: string
    emoji: string
    value: Answer
  }[]
}

export const QUESTIONS: Question[] = [
  {
    title: 'What is your favourite flavour?',
    subtitle: 'Every great cookie starts with your favourite taste.',
    options: [
      { label: 'Rich chocolate', emoji: '🍫', value: 'chocolate' },
      { label: 'Sweet and creamy', emoji: '🍦', value: 'sweet' },
      { label: 'A little sweet and salty', emoji: '🍯', value: 'balanced' },
      { label: 'Something different', emoji: '✨', value: 'cookies-and-cream' },
    ],
  },
  {
    title: 'What kind of treat are you craving?',
    subtitle: 'Choose the feeling that fits you best.',
    options: [
      { label: 'Something intensely chocolatey', emoji: '🍫', value: 'chocolate' },
      { label: 'A comforting sweet treat', emoji: '🍪', value: 'classic' },
      { label: 'A balanced flavour combination', emoji: '⚖️', value: 'balanced' },
      { label: 'A fun new flavour', emoji: '🎉', value: 'cookies-and-cream' },
    ],
  },
  {
    title: 'Pick your perfect dessert.',
    subtitle: 'Your dessert choice says a lot about your cookie taste.',
    options: [
      { label: 'Chocolate brownie', emoji: '🍫', value: 'chocolate' },
      { label: 'Vanilla ice cream', emoji: '🍨', value: 'sweet' },
      { label: 'Salted caramel dessert', emoji: '🍮', value: 'balanced' },
      { label: 'Red velvet cake', emoji: '🍰', value: 'adventurous' },
    ],
  },
  {
    title: 'How adventurous are you?',
    subtitle: 'One final question before we find your match.',
    options: [
      { label: 'I always choose chocolate', emoji: '🍫', value: 'chocolate' },
      { label: 'I love classic sweet flavours', emoji: '🤍', value: 'classic' },
      { label: 'I enjoy unexpected combinations', emoji: '🧂', value: 'balanced' },
      { label: 'Surprise me!', emoji: '🎲', value: 'adventurous' },
    ],
  },
]

type Recommendation = readonly [primary: CookieProduct['id'], secondary: CookieProduct['id']]

const RECOMMENDATIONS: Record<Answer, Recommendation> = {
  chocolate: [2, 1],
  sweet: [3, 6],
  balanced: [5, 1],
  adventurous: [4, 6],
  classic: [1, 3],
  'cookies-and-cream': [6, 4],
}

function rankedCookies(answers: readonly Answer[]) {
  const scores = new Map<number, number>()

  for (const answer of answers) {
    const recommendations = RECOMMENDATIONS[answer]

    recommendations.forEach((id, index) => {
      const points = index === 0 ? 3 : 1
      scores.set(id, (scores.get(id) ?? 0) + points)
    })
  }

  return [...scores.entries()].sort(
    ([leftId, leftScore], [rightId, rightScore]) => {
      const byScore = rightScore - leftScore
      return byScore === 0 ? leftId - rightId : byScore
    },
  )

}

const tasteLabels: Record<Answer, string> = {
  chocolate: 'rich chocolate',
  sweet: 'sweet and creamy flavours',
  balanced: 'sweet and salty flavours',
  adventurous: 'red velvet and adventurous flavours',
  classic: 'classic sweet flavours',
  'cookies-and-cream': 'a different flavour combination',
}

export function findCookie(answers: readonly Answer[]) {
  const [best] = rankedCookies(answers)
  return COOKIES.find(cookie => cookie.id === best?.[0]) ?? COOKIES[0]
}

export function explainCookieMatch(answers: readonly Answer[], products: readonly CookieProduct[] = COOKIES) {
  const [best, second] = rankedCookies(answers)
  const cookie = products.find(product => product.id === best?.[0]) ?? products[0]
  const alternative = products.find(product => product.id === second?.[0])
  const relevant = answers.filter(answer => RECOMMENDATIONS[answer][0] === cookie.id)
  const source = relevant.length ? relevant : answers.filter(answer => RECOMMENDATIONS[answer][1] === cookie.id)
  const reasons = [...new Set(source)].map(answer => tasteLabels[answer])
  return { cookie, alternative, reasons }
}