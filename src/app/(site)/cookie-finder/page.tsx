
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { COOKIES } from '@/content/cookies'

type Answer = 'chocolate' | 'sweet' | 'balanced' | 'adventurous'

type Question = {
  title: string
  subtitle: string
  options: {
    label: string
    emoji: string
    value: Answer
  }[]
}

const QUESTIONS: Question[] = [
  {
    title: 'What is your favourite flavour?',
    subtitle: 'Every great cookie starts with your favourite taste.',
    options: [
      { label: 'Rich chocolate', emoji: '🍫', value: 'chocolate' },
      { label: 'Sweet and creamy', emoji: '🍦', value: 'sweet' },
      { label: 'A little sweet and salty', emoji: '🍯', value: 'balanced' },
      { label: 'Something different', emoji: '✨', value: 'adventurous' },
    ],
  },
  {
    title: 'What kind of treat are you craving?',
    subtitle: 'Choose the feeling that fits you best.',
    options: [
      { label: 'Something intensely chocolatey', emoji: '🍫', value: 'chocolate' },
      { label: 'A comforting sweet treat', emoji: '🍪', value: 'sweet' },
      { label: 'A balanced flavour combination', emoji: '⚖️', value: 'balanced' },
      { label: 'A fun new flavour', emoji: '🎉', value: 'adventurous' },
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
      { label: 'I love classic sweet flavours', emoji: '🤍', value: 'sweet' },
      { label: 'I enjoy unexpected combinations', emoji: '🧂', value: 'balanced' },
      { label: 'Surprise me!', emoji: '🎲', value: 'adventurous' },
    ],
  },
]

const RECOMMENDATIONS: Record<Answer, number[]> = {
  chocolate: [2, 1],
  sweet: [3, 6],
  balanced: [5, 1],
  adventurous: [4, 6],
}

function findCookie(answers: Answer[]) {
  const scores = new Map<number, number>()

  for (const answer of answers) {
    const recommendations = RECOMMENDATIONS[answer]

    recommendations.forEach((id, index) => {
      const points = index === 0 ? 3 : 1
      scores.set(id, (scores.get(id) ?? 0) + points)
    })
  }

  const bestId = [...scores.entries()].sort(
    (a, b) => b[1] - a[1] || a[0] - b[0],
  )[0]?.[0]

  return COOKIES.find((cookie) => cookie.id === bestId) ?? COOKIES[0]
}

export default function CookieFinderPage() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])

  const finished = answers.length === QUESTIONS.length
  const progress = (answers.length / QUESTIONS.length) * 100
  const question = QUESTIONS[step]

  function chooseAnswer(answer: Answer) {
    const updated = [...answers.slice(0, step), answer]
    setAnswers(updated)

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1)
    }
  }

  function goBack() {
    if (step > 0) {
      setAnswers((previous) => previous.slice(0, -1))
      setStep(step - 1)
    }
  }

  function restart() {
    setStep(0)
    setAnswers([])
  }

  const result = finished ? findCookie(answers) : null

  return (
    <div className="mx-auto max-w-3xl pb-16 pt-8">
      <div className="mb-10 text-center">
        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-ink-soft">
          Cookie Shop · Interactive Experience
        </p>

        <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
          Find Your Perfect Cookie 🍪
        </h1>

        <p className="mx-auto max-w-xl text-lg text-ink-soft">
          Answer four quick questions and discover which of our
          delicious cookies matches your taste!
        </p>
      </div>

      <div className="framed offset-purple p-5 sm:p-10">
        {!finished ? (
          <>
            <div className="mb-8">
              <div className="mb-3 flex justify-between gap-3 text-sm font-semibold">
                <span>
                  Question {step + 1} of {QUESTIONS.length}
                </span>
                <span>{Math.round(progress)}% completed</span>
              </div>

              <div
                className="h-3 overflow-hidden rounded-full bg-blue-tint"
                role="progressbar"
                aria-label="Quiz progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
              >
                <div
                  className="h-full rounded-full bg-purple transition-[width] duration-300 motion-reduce:transition-none"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div key={step}>
              <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
                {question.title}
              </h2>

              <p className="mb-8 text-ink-soft">
                {question.subtitle}
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {question.options.map((option) => (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => chooseAnswer(option.value)}
                    className="flex min-h-28 items-center gap-4 rounded-xl border-2 border-line bg-canvas p-5 text-left font-semibold transition-colors hover:border-purple hover:bg-blue-tint focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-focus"
                  >
                    <span className="text-3xl" aria-hidden="true">
                      {option.emoji}
                    </span>

                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="rounded-lg px-4 py-3 font-semibold text-link underline underline-offset-4"
                >
                  ← Previous question
                </button>
              ) : (
                <span />
              )}

              <button
                type="button"
                onClick={restart}
                className="rounded-lg px-4 py-3 text-sm font-semibold text-ink-soft underline underline-offset-4"
              >
                Start over
              </button>
            </div>
          </>
        ) : (
          result && (
            <div className="text-center" aria-live="polite">
              <p className="mb-3 text-sm font-bold uppercase tracking-widest text-ink-soft">
                Your Cookie Match
              </p>

              <div
                className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-mint-wash text-7xl"
                aria-hidden="true"
              >
                {result.emoji}
              </div>

              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                {result.name}
              </h2>

              <p className="mx-auto mb-5 max-w-lg text-lg">
                {result.description}
              </p>

              <p className="mb-8 text-2xl font-bold">
                {result.price}
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/workshops"
                  className="rounded-xl bg-purple px-6 py-4 font-bold text-white transition-opacity hover:opacity-90"
                >
                  Explore Our Cookies →
                </Link>

                <button
                  type="button"
                  onClick={restart}
                  className="rounded-xl border-2 border-line bg-canvas px-6 py-4 font-bold hover:bg-blue-tint"
                >
                  Try Again ↻
                </button>
              </div>

              <p className="mt-8 text-sm text-ink-soft">
                This is a fun recommendation quiz using fictional
                example products. No purchase is required.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  )
}
