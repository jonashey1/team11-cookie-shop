
'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Gift, RotateCcw, Sparkles } from 'lucide-react'
import { COOKIES } from '@/content/cookies'

type Fortune = {
  message: string
  detail: string
  cookieId: number
}

type Stage = 'closed' | 'cracking' | 'opened'

const FORTUNES: Fortune[] = [
  {
    message: 'Your future is looking delicious.',
    detail: 'Sometimes happiness is just one chocolate chip away.',
    cookieId: 1,
  },
  {
    message: 'Great things come to those who eat cookies.',
    detail: 'Your next big idea might arrive with a little chocolate.',
    cookieId: 2,
  },
  {
    message: 'A sweet surprise is heading your way.',
    detail: 'Good things happen when you embrace your sweet side.',
    cookieId: 3,
  },
  {
    message: 'Dare to be different. The world needs your flavour.',
    detail: 'Your next adventure deserves something extraordinary.',
    cookieId: 4,
  },
  {
    message: 'Life is sweeter with a little balance.',
    detail: 'A pinch of salt can make the sweetest moments better.',
    cookieId: 5,
  },
  {
    message: 'You are the secret ingredient.',
    detail: 'The best combinations are often the unexpected ones.',
    cookieId: 6,
  },
  {
    message: 'Your luck is about to crumble... in a good way!',
    detail: 'A delicious surprise is closer than you think.',
    cookieId: 1,
  },
  {
    message: 'Chocolate is temporary. Happiness is forever.',
    detail: 'Actually, chocolate makes happiness even better.',
    cookieId: 2,
  },
  {
    message: 'Someone thinks you are pretty sweet.',
    detail: 'And we think you deserve a cookie for that.',
    cookieId: 3,
  },
  {
    message: 'Your next adventure starts with one bite.',
    detail: 'Try something new. Your taste buds will thank you.',
    cookieId: 4,
  },
  {
    message: 'A little chaos makes life interesting.',
    detail: 'Especially when sweet and salty flavours collide.',
    cookieId: 5,
  },
  {
    message: 'You were born to stand out.',
    detail: 'Why choose ordinary when you can have extraordinary?',
    cookieId: 6,
  },
]

const CRUMBS = [
  { x: -116, y: -72, delay: 0, size: 9 },
  { x: -145, y: 18, delay: 80, size: 6 },
  { x: -85, y: 105, delay: 130, size: 11 },
  { x: -45, y: -122, delay: 60, size: 7 },
  { x: 52, y: -120, delay: 110, size: 8 },
  { x: 115, y: -72, delay: 40, size: 10 },
  { x: 145, y: 24, delay: 120, size: 6 },
  { x: 86, y: 104, delay: 90, size: 9 },
  { x: 15, y: 135, delay: 160, size: 7 },
  { x: -15, y: -145, delay: 70, size: 5 },
]

function CookieIllustration({
  half,
}: {
  half: 'left' | 'right'
}) {
  const left = half === 'left'

  return (
    <svg
      viewBox="0 0 160 230"
      className="h-full w-full drop-shadow-[0_14px_10px_rgba(88,45,15,0.2)]"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id={`cookie-gold-${half}`}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#FFE4A2" />
          <stop offset="40%" stopColor="#EAB46A" />
          <stop offset="100%" stopColor="#B86E31" />
        </linearGradient>
        <linearGradient
          id={`cookie-inner-${half}`}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#FFF1C9" />
          <stop offset="100%" stopColor="#D99A50" />
        </linearGradient>
      </defs>

      {left ? (
        <>
          <path
            d="M143 17 C78 5 22 47 15 112 C7 178 55 219 139 210 C104 171 101 132 121 106 C142 77 147 44 143 17Z"
            fill={`url(#cookie-gold-${half})`}
            stroke="#95531F"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          <path
            d="M139 32 C90 29 41 63 34 112 C26 157 58 192 119 196"
            fill="none"
            stroke="#FFF0BD"
            strokeWidth="11"
            strokeLinecap="round"
            opacity=".75"
          />
          <path
            d="M143 17 C128 54 135 83 121 106 C101 132 104 171 139 210"
            fill="none"
            stroke="#8B4C20"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M130 40 C114 75 119 91 109 106 C88 143 104 172 125 195"
            fill="none"
            stroke={`url(#cookie-inner-${half})`}
            strokeWidth="10"
            strokeLinecap="round"
          />
        </>
      ) : (
        <>
          <path
            d="M17 17 C82 5 138 47 145 112 C153 178 105 219 21 210 C56 171 59 132 39 106 C18 77 13 44 17 17Z"
            fill={`url(#cookie-gold-${half})`}
            stroke="#95531F"
            strokeWidth="5"
            strokeLinejoin="round"
          />
          <path
            d="M21 32 C70 29 119 63 126 112 C134 157 102 192 41 196"
            fill="none"
            stroke="#FFF0BD"
            strokeWidth="11"
            strokeLinecap="round"
            opacity=".75"
          />
          <path
            d="M17 17 C32 54 25 83 39 106 C59 132 56 171 21 210"
            fill="none"
            stroke="#8B4C20"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M30 40 C46 75 41 91 51 106 C72 143 56 172 35 195"
            fill="none"
            stroke={`url(#cookie-inner-${half})`}
            strokeWidth="10"
            strokeLinecap="round"
          />
        </>
      )}

      <g fill="#A9632B" opacity=".45">
        <circle cx={left ? 64 : 96} cy="83" r="4" />
        <circle cx={left ? 78 : 82} cy="147" r="3" />
        <circle cx={left ? 50 : 110} cy="126" r="2.5" />
        <circle cx={left ? 91 : 69} cy="62" r="2" />
      </g>
    </svg>
  )
}

export default function FortuneCookiePage() {
  const [stage, setStage] = useState<Stage>('closed')
  const [fortune, setFortune] = useState<Fortune | null>(null)
  const lastIndex = useRef<number | null>(null)
  const revealTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const selectedCookie = fortune
    ? COOKIES.find((cookie) => cookie.id === fortune.cookieId)
    : null

  useEffect(() => {
    return () => {
      if (revealTimer.current) {
        clearTimeout(revealTimer.current)
      }
    }
  }, [])

  function crackCookie() {
    if (stage !== 'closed') return

    const choices = FORTUNES.map((_, index) => index).filter(
      (index) => index !== lastIndex.current,
    )
    const index = choices[Math.floor(Math.random() * choices.length)]

    lastIndex.current = index
    setFortune(FORTUNES[index])
    setStage('cracking')

    const reducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      document.documentElement.classList.contains('a11y-reduce-motion')

    revealTimer.current = setTimeout(
      () => setStage('opened'),
      reducedMotion ? 100 : 1500,
    )
  }

  function tryAgain() {
    if (revealTimer.current) {
      clearTimeout(revealTimer.current)
      revealTimer.current = null
    }

    setFortune(null)
    setStage('closed')
  }

  return (
    <div className="mx-auto max-w-5xl pb-20 pt-8">
      <div className="mb-10 text-center">
        <p className="mb-3 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-widest text-ink-soft">
          <Sparkles aria-hidden="true" className="size-4" />
          Cookie Shop · Interactive Experience
          <Sparkles aria-hidden="true" className="size-4" />
        </p>

        <h1 className="mb-4 text-4xl font-black sm:text-6xl">
          Crack Your Fortune
          <span className="ml-2 inline-block" aria-hidden="true">
            🥠
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-lg text-ink-soft">
          A little mystery, a little magic and a lot of cookies.
          Crack open your fortune cookie to discover what the
          cookie universe has in store for you!
        </p>
      </div>

      <div className="framed offset-purple overflow-hidden p-5 sm:p-10">
        <div className="fortune-scene relative flex min-h-[390px] flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-line bg-blue-tint p-5 text-center sm:min-h-[480px]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'radial-gradient(circle, currentColor 1px, transparent 1px)',
              backgroundSize: '30px 30px',
              maskImage:
                'radial-gradient(ellipse, black 0%, transparent 75%)',
            }}
          />

          <span
            aria-hidden="true"
            className="absolute left-[12%] top-[15%] text-3xl text-purple"
          >
            ✦
          </span>
          <span
            aria-hidden="true"
            className="absolute right-[15%] top-[23%] text-4xl text-purple"
          >
            ✧
          </span>
          <span
            aria-hidden="true"
            className="absolute bottom-[15%] left-[18%] text-2xl text-purple"
          >
            ✨
          </span>

          {stage === 'closed' && (
            <div className="relative z-10 flex flex-col items-center">
              <p className="mb-5 text-xl font-black text-ink">
                Your fortune is waiting...
              </p>

              <button
                type="button"
                onClick={crackCookie}
                aria-label="Crack open your fortune cookie"
                className="fortune-float group relative flex h-56 w-64 items-center justify-center rounded-full focus-visible:outline-4 focus-visible:outline-offset-8 focus-visible:outline-focus sm:h-64 sm:w-80"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-8 rounded-full bg-purple/20 blur-3xl"
                />

                <span className="fortune-whole relative flex h-44 w-52 items-center justify-center sm:h-52 sm:w-64">
                  <span className="fortune-half-left absolute left-0 h-full w-1/2">
                    <CookieIllustration half="left" />
                  </span>
                  <span className="fortune-half-right absolute right-0 h-full w-1/2">
                    <CookieIllustration half="right" />
                  </span>
                </span>
              </button>

              <p className="mt-5 text-sm font-semibold text-ink-soft">
                Tap the cookie to crack it open
              </p>
            </div>
          )}

          {stage === 'cracking' && (
            <div
              className="relative z-10 flex flex-col items-center"
              role="status"
              aria-label="Your fortune cookie is opening"
            >
              <p className="mb-5 text-xl font-black text-ink">
                Your fortune is unfolding...
              </p>

              <div
                aria-hidden="true"
                className="fortune-break relative flex h-60 w-72 items-center justify-center sm:h-72 sm:w-96"
              >
                <div className="fortune-paper absolute z-0 flex h-28 w-40 items-center justify-center border-2 border-amber-700 bg-[#FFF7DB] shadow-lg">
                  <span className="text-3xl text-amber-800">✦</span>
                </div>

                <div className="fortune-break-left absolute left-1/2 z-10 h-44 w-24 -translate-x-full sm:h-52 sm:w-32">
                  <CookieIllustration half="left" />
                </div>

                <div className="fortune-break-right absolute left-1/2 z-10 h-44 w-24 sm:h-52 sm:w-32">
                  <CookieIllustration half="right" />
                </div>

                {CRUMBS.map((crumb, index) => (
                  <span
                    key={index}
                    className="fortune-crumb absolute left-1/2 top-1/2 z-20 rounded-full bg-[#C88A45]"
                    style={
                      {
                        width: crumb.size,
                        height: crumb.size,
                        '--crumb-x': `${crumb.x}px`,
                        '--crumb-y': `${crumb.y}px`,
                        animationDelay: `${crumb.delay}ms`,
                      } as React.CSSProperties
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {stage === 'opened' && fortune && (
            <div className="fortune-result relative z-10 flex w-full max-w-xl flex-col items-center">
              <div
                aria-hidden="true"
                className="mb-5 flex items-center gap-2"
              >
                <div className="h-20 w-16 -rotate-25 sm:h-24 sm:w-20">
                  <CookieIllustration half="left" />
                </div>
                <div className="h-20 w-16 rotate-25 sm:h-24 sm:w-20">
                  <CookieIllustration half="right" />
                </div>
              </div>

              <div
                role="status"
                aria-live="polite"
                className="fortune-unfold w-full rotate-[-1deg] border-2 border-ink bg-[#FFF7DB] px-5 py-8 text-[#382715] shadow-[6px_6px_0_#9D75D4] sm:px-10"
              >
                <Sparkles
                  aria-hidden="true"
                  className="mx-auto mb-4 size-7 text-[#7951B2]"
                />

                <p className="mb-4 text-2xl font-black leading-snug sm:text-3xl">
                  {fortune.message}
                </p>

                <p className="text-base text-[#68523C]">
                  {fortune.detail}
                </p>

                <div
                  aria-hidden="true"
                  className="mx-auto mt-5 h-px w-24 bg-amber-700/30"
                />

                <p className="mt-3 text-xs font-bold uppercase tracking-[0.25em] text-[#7951B2]">
                  Your cookie fortune
                </p>
              </div>
            </div>
          )}
        </div>

        {stage === 'opened' && selectedCookie && (
          <div className="fortune-result mt-10 text-center">
            <div className="mb-5 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider text-ink-soft">
              <Gift aria-hidden="true" className="size-5" />
              Your lucky cookie match
            </div>

            <div className="mx-auto max-w-xl rounded-2xl border-2 border-line bg-canvas p-6">
              <div className="mb-3 text-6xl" aria-hidden="true">
                {selectedCookie.emoji}
              </div>

              <h2 className="mb-2 text-2xl font-black">
                {selectedCookie.name}
              </h2>

              <p className="mb-3 text-ink-soft">
                {selectedCookie.description}
              </p>

              <p className="mb-5 text-xl font-bold">
                {selectedCookie.price}
              </p>

              <Link
                href="/workshops"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-control border-2 border-ink bg-ink px-5 py-3 font-bold text-canvas no-underline hover:opacity-90"
              >
                Explore our cookies
                <ArrowRight aria-hidden="true" className="size-5" />
              </Link>
            </div>

            <button
              type="button"
              onClick={tryAgain}
              className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-control border-2 border-ink bg-canvas px-6 py-3 font-bold text-ink hover:bg-blue-tint"
            >
              <RotateCcw aria-hidden="true" className="size-5" />
              Try another fortune
            </button>
          </div>
        )}

        <p className="mt-8 text-center text-xs text-ink-soft">
          Just for fun. No actual predictions or prizes are involved.
        </p>
      </div>

      <style jsx>{`
        .fortune-float {
          animation: float-cookie 3s ease-in-out infinite;
        }

        .fortune-whole {
          transition: transform 300ms ease;
        }

        .fortune-float:hover .fortune-whole {
          transform: scale(1.07) rotate(-5deg);
        }

        .fortune-break-left {
          animation: break-left 1.2s ease-in-out both;
        }

        .fortune-break-right {
          animation: break-right 1.2s ease-in-out both;
        }

        .fortune-paper {
          animation: paper-emerge 1.3s ease-out both;
        }

        .fortune-crumb {
          opacity: 0;
          animation: crumb-fly 900ms ease-out forwards;
        }

        .fortune-result {
          animation: result-appear 650ms ease-out both;
        }

        .fortune-unfold {
          transform-origin: center top;
          animation: unfold-paper 700ms ease-out both;
        }

        @keyframes float-cookie {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-13px);
          }
        }

        @keyframes break-left {
          0% {
            transform: translateX(-100%) rotate(0deg);
          }
          18% {
            transform: translateX(-100%) rotate(-8deg);
          }
          36% {
            transform: translateX(-100%) rotate(8deg);
          }
          100% {
            transform: translateX(-175%) rotate(-32deg);
          }
        }

        @keyframes break-right {
          0% {
            transform: translateX(0) rotate(0deg);
          }
          18% {
            transform: translateX(0) rotate(8deg);
          }
          36% {
            transform: translateX(0) rotate(-8deg);
          }
          100% {
            transform: translateX(75%) rotate(32deg);
          }
        }

        @keyframes paper-emerge {
          0%,
          35% {
            opacity: 0;
            transform: translateY(20px) scale(0.2);
          }
          100% {
            opacity: 1;
            transform: translateY(-15px) scale(1);
          }
        }

        @keyframes crumb-fly {
          0%,
          25% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0);
          }
          40% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate(
                calc(-50% + var(--crumb-x)),
                calc(-50% + var(--crumb-y))
              )
              rotate(220deg) scale(0.5);
          }
        }

        @keyframes result-appear {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes unfold-paper {
          from {
            opacity: 0;
            transform: scaleY(0.1) rotate(-1deg);
          }
          to {
            opacity: 1;
            transform: scaleY(1) rotate(-1deg);
          }
        }

        :global(html.a11y-reduce-motion) .fortune-float,
        :global(html.a11y-reduce-motion) .fortune-break-left,
        :global(html.a11y-reduce-motion) .fortune-break-right,
        :global(html.a11y-reduce-motion) .fortune-paper,
        :global(html.a11y-reduce-motion) .fortune-crumb,
        :global(html.a11y-reduce-motion) .fortune-result,
        :global(html.a11y-reduce-motion) .fortune-unfold {
          animation: none;
        }

        @media (prefers-reduced-motion: reduce) {
          .fortune-float,
          .fortune-break-left,
          .fortune-break-right,
          .fortune-paper,
          .fortune-crumb,
          .fortune-result,
          .fortune-unfold {
            animation: none;
          }

          .fortune-whole {
            transition: none;
          }
        }
      `}</style>
    </div>
  )
}
