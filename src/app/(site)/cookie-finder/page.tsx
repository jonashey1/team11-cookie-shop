
'use client'

import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import Image from 'next/image'
import { finderVisuals } from '@/content/excellence-visuals'
import { passportTitles } from '@/lib/cookie-passport'
import { cookieImage } from '@/lib/workshop-image'
import { Cookie, IceCreamCone, Scale, Sparkles, Layers3, Candy } from 'lucide-react'
import Link from 'next/link'
import { AddCookieToBasket } from '@/components/site/AddCookieToBasket'
import { CompareFinderResult } from '@/components/site/CookieComparisonControls'
import { explainCookieMatch, QUESTIONS, type Answer } from '@/lib/cookie-finder'

const answerIcons = {
  chocolate: Candy,
  sweet: IceCreamCone,
  balanced: Scale,
  adventurous: Sparkles,
  classic: Cookie,
  'cookies-and-cream': Layers3,
} satisfies Record<Answer, typeof Cookie>

const subscribe = () => () => {}

export default function CookieFinderPage() {
  // An answer cannot be handled until the quiz has hydrated.
  const interactive = useSyncExternalStore(subscribe, () => true, () => false)
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
  const preferences = QUESTIONS.flatMap((question, index) => question.options.filter(option => option.value === answers[index]).map(option => option.label))
  const resultImage = result && cookieImage(result.name)
  const resultHeading = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (finished) resultHeading.current?.focus()
  }, [finished])

  return (
    <div className="mx-auto max-w-3xl pb-section pt-block">
      <div className="boutique-finder-intro mb-block border-y border-line bg-yellow-wash p-4 sm:p-block">
        <p className="mb-3 text-sm font-bold uppercase tracking-widest text-ink-soft">
          Cookie Finder
        </p>

        <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
          Find Your Perfect Cookie
        </h1>

        <p className="max-w-xl text-lg text-ink-soft">
          Answer four quick questions and discover which of our
          delicious cookies matches your taste!
        </p>
      </div>

      <div className="boutique-quiz excellence-quiz">
        {!finished ? (
          <>
            <div className="mb-5">
              <div className="mb-3 flex justify-between gap-3 text-sm font-semibold">
                <span>
                  Question {step + 1} of {QUESTIONS.length}
                </span>
                <span>{Math.round(progress)}% completed</span>
              </div>

              <div
                className="excellence-progress"
                role="progressbar"
                aria-label="Quiz progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
              >
                {QUESTIONS.map(({ title }, index) => <span key={title} data-complete={index < answers.length} />)}
              </div>
            </div>

            <div key={step} className="excellence-question">
              <h2 className="mb-3 text-2xl font-bold sm:text-3xl">
                {question.title}
              </h2>

              <p className="mb-8 text-ink-soft">
                {question.subtitle}
              </p>

              {interactive ? (
                <div className="excellence-answers">
                  {question.options.map((option, index) => {
                    const Icon = answerIcons[option.value]
                    const visual = finderVisuals[step]?.[index]
                    return (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => chooseAnswer(option.value)}
                        data-flavour={visual?.flavour}
                        className="excellence-answer"
                      >
                        {visual ? (
                          <span className="excellence-answer-art">
                            <Image src={visual.src} alt="" fill sizes="(min-width: 48rem) 335px, 45vw" style={{ objectPosition: visual.position }} />
                          </span>
                        ) : <span className="boutique-finder-icon" aria-hidden="true"><Icon size={24} /></span>}

                        <span>{option.label}</span>
                      </button>
                    )
                  })}
                </div>
              ) : (
                <p role="status">Loading the answers…</p>
              )}
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
            <div data-flavour={result.id} className="experience-passport boutique-finder-result excellence-passport" aria-live="polite">
              <p className="boutique-kicker excellence-passport-stamp"><Cookie aria-hidden="true" className="inline size-5" /> Your Cookie Passport</p>
              <p className="experience-profile-title">{passportTitles[result.id]}</p>


              <div className="experience-passport-match">
              {resultImage && <Image src={resultImage.src} alt="" width={360} height={300} className="mx-auto mb-5 aspect-[6/5] w-full max-w-xs rounded-frame object-cover" />}
              <div>
              <p className="boutique-kicker">Your match</p>
              <h2 ref={resultHeading} tabIndex={-1} className="mb-4 text-3xl font-bold sm:text-4xl">
                {result.name}
              </h2>

              <p className="max-w-lg text-lg">
                {result.description}
              </p>

              </div>
              </div>
              <div className="experience-passport-preferences">
                <h3 className="text-xl">Your flavour preferences</h3>
                <ul>{preferences.map(label => <li key={label}>{label}</li>)}</ul>
              </div>
              <div className="excellence-passport-actions">
                <AddCookieToBasket cookie={result} />
                <CompareFinderResult cookie={result} />
                <Link
                  href="/workshops"
                  className="inline-flex min-h-11 items-center justify-center rounded-control border border-line bg-canvas px-4 py-2 text-center font-bold text-ink no-underline hover:bg-blue-tint"
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
                <p className="max-w-lg text-sm text-ink-soft">
                  Your answers about {match.reasons.join(' and ')} contributed to this match.
                </p>
              )}
              {match?.alternative && (
                <div className="excellence-alternative">
                  <p>Another match: <strong>{match.alternative.name}</strong></p>
                  <CompareFinderResult cookie={match.alternative} alternative />
                </div>
              )}
              <p className="flex flex-wrap gap-4"><Link href="/workshops#taste-map" className="text-link underline">Explore the Taste Map</Link><Link href="/build-your-box" className="text-link underline">Build a cookie box</Link></p>
              <p className="text-sm text-ink-soft">
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
