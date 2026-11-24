
'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AddCookieToBasket } from '@/components/site/AddCookieToBasket'
import { CompareFinderResult } from '@/components/site/CookieComparisonControls'
import { explainCookieMatch, QUESTIONS, type Answer } from '@/lib/cookie-finder'

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

  const match = finished ? explainCookieMatch(answers) : null
  const result = match?.cookie
  const resultHeading = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (finished) resultHeading.current?.focus()
  }, [finished])

  return (
    <div className="mx-auto max-w-3xl pb-section pt-block">
      <div className="mb-block rounded-panel border border-line bg-blue-tint p-6 text-center sm:p-block">
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

      <div className="rounded-panel border border-line bg-canvas p-5 sm:p-block">
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
                  className="h-full rounded-full bg-link transition-[width] duration-300 motion-reduce:transition-none"
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
                    className="flex min-h-28 items-center gap-4 rounded-frame border border-line bg-blue-tint p-5 text-left font-semibold transition-colors hover:border-ink hover:bg-yellow-wash focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-focus"
                  >
                    <span className="text-3xl" aria-hidden="true">
                      {option.emoji}
                    </span>

                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-block flex flex-wrap items-center justify-between gap-stack">
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
                className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-yellow-wash text-7xl"
                aria-hidden="true"
              >
                {result.emoji}
              </div>

              <h2 ref={resultHeading} tabIndex={-1} className="mb-4 text-3xl font-bold sm:text-4xl">
                {result.name}
              </h2>

              <p className="mx-auto mb-8 max-w-lg text-lg">
                {result.description}
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/workshops"
                  className="inline-flex min-h-11 items-center justify-center rounded-control border border-ink bg-ink px-6 py-3 text-center font-bold text-canvas no-underline hover:bg-link"
                >
                  Explore Our Cookies →
                </Link>

                <button
                  type="button"
                  onClick={restart}
                  className="min-h-11 rounded-control border border-line bg-canvas px-6 py-3 font-bold hover:bg-blue-tint"
                >
                  Try Again ↻
                </button>
              </div>

              {match && match.reasons.length > 0 && (
                <p className="mx-auto mt-4 max-w-lg text-sm text-ink-soft">
                  Your answers about {match.reasons.join(' and ')} contributed to this match.
                </p>
              )}
              <div className="mt-4 grid justify-items-center gap-3">
                <CompareFinderResult cookie={result} />
                <AddCookieToBasket cookie={result} />
              </div>
              {match?.alternative && (
                <div className="mt-5 grid gap-2 rounded-panel border border-line bg-canvas p-4">
                  <p>Another match: <strong>{match.alternative.name}</strong></p>
                  <CompareFinderResult cookie={match.alternative} alternative />
                </div>
              )}
              <p className="mt-4"><Link href="/build-your-box" className="text-link underline">Build a cookie box</Link></p>
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
