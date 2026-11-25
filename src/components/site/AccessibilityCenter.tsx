
'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Contrast,
  Eye,
  Link2,
  MousePointer2,
  RotateCcw,
  Type,
  X,
} from 'lucide-react'
import { FortuneCookiePopup } from './FortuneCookiePopup'
import { GlobalBasket } from './GlobalBasket'

type Setting =
  | 'largeText'
  | 'highContrast'
  | 'highlightLinks'
  | 'reduceMotion'
  | 'largeCursor'

type Preferences = Record<Setting, boolean>

const STORAGE_KEY = 'cookie-shop-accessibility'

const DEFAULTS: Preferences = {
  largeText: false,
  highContrast: false,
  highlightLinks: false,
  reduceMotion: false,
  largeCursor: false,
}

const OPTIONS = [
  {
    key: 'largeText',
    label: 'Larger text',
    description: 'Increase text size for easier reading.',
    Icon: Type,
  },
  {
    key: 'highContrast',
    label: 'High contrast',
    description: 'Make text and interface elements stand out.',
    Icon: Contrast,
  },
  {
    key: 'highlightLinks',
    label: 'Highlight links',
    description: 'Make links easier to identify.',
    Icon: Link2,
  },
  {
    key: 'reduceMotion',
    label: 'Reduce motion',
    description: 'Minimise animations and transitions.',
    Icon: Eye,
  },
  {
    key: 'largeCursor',
    label: 'Larger cursor',
    description: 'Make the mouse pointer easier to see.',
    Icon: MousePointer2,
  },
] as const

function readPreferences(): Preferences {
  if (typeof window === 'undefined') {
    return { ...DEFAULTS }
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)

    if (!stored) {
      return { ...DEFAULTS }
    }

    const parsed: unknown = JSON.parse(stored)

    if (!parsed || typeof parsed !== 'object') {
      return { ...DEFAULTS }
    }

    const values = parsed as Partial<Preferences>

    return {
      largeText: values.largeText === true,
      highContrast: values.highContrast === true,
      highlightLinks: values.highlightLinks === true,
      reduceMotion: values.reduceMotion === true,
      largeCursor: values.largeCursor === true,
    }
  } catch {
    // Accessibility settings work without local storage.
    return { ...DEFAULTS }
  }
}

function applyPreferences(preferences: Preferences) {
  const root = document.documentElement

  root.classList.toggle('a11y-large-text', preferences.largeText)
  root.classList.toggle('a11y-high-contrast', preferences.highContrast)
  root.classList.toggle('a11y-highlight-links', preferences.highlightLinks)
  root.classList.toggle('a11y-reduce-motion', preferences.reduceMotion)
  root.classList.toggle('a11y-large-cursor', preferences.largeCursor)
}

function UniversalAccessIcon({ className = 'size-5' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="24" cy="24" r="21" />
      <circle cx="24" cy="13" r="3.2" fill="currentColor" stroke="none" />
      <path d="M12 20 Q24 24 36 20" />
      <path d="M24 23 L24 29 M24 29 L18 39 M24 29 L30 39" />
    </svg>
  )
}
export function AccessibilityCenter() {
  const [open, setOpen] = useState(false)
  const [basketOpen, setBasketOpen] = useState(false)

  const [preferences, setPreferences] =
    useState<Preferences>(readPreferences)

  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    applyPreferences(preferences)
  }, [preferences])

  useEffect(() => {
    if (!open) return

    closeRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
        return
      }

      if (event.key !== 'Tab') return

      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled])',
      )

      if (!focusable?.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  function update(next: Preferences) {
    setPreferences(next)
    applyPreferences(next)

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // Preferences remain active for the current visit.
    }
  }

  function toggle(setting: Setting) {
    update({
      ...preferences,
      [setting]: !preferences[setting],
    })
  }

  function closePanel() {
    setOpen(false)
    triggerRef.current?.focus()
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open accessibility settings"
        title="Accessibility settings"
        className="inline-flex min-h-11 items-center gap-2 rounded-control border border-ink bg-blue-tint px-3 font-semibold text-ink hover:bg-blue-tint"
      >
        <UniversalAccessIcon className="size-6" />
        <span className="hidden sm:inline">Accessibility</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-scrim/70 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closePanel()
            }
          }}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="accessibility-title"
            aria-describedby="accessibility-description"
            className="max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-panel border border-line bg-canvas p-5 text-ink shadow-xl sm:p-7"
          >
            <div className="mb-3 flex items-start justify-between gap-4">
              <div>
                <h2
                  id="accessibility-title"
                  className="flex items-center gap-2 font-heading text-2xl font-bold"
                >
                  <UniversalAccessIcon className="size-7" />
                  Accessibility
                </h2>

                <p
                  id="accessibility-description"
                  className="mt-2 text-sm text-ink-soft"
                >
                  Personalise how you experience Cookie Shop.
                </p>
              </div>

              <button
                ref={closeRef}
                type="button"
                onClick={closePanel}
                aria-label="Close accessibility settings"
                className="flex min-h-11 min-w-11 items-center justify-center rounded-control border-2 border-ink hover:bg-blue-tint"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>

            <div className="space-y-3">
              {OPTIONS.map(({ key, label, description, Icon }) => (
                <div
                  key={key}
                  className="flex items-center justify-between gap-4 rounded-frame border border-line bg-blue-tint p-3"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <Icon
                      aria-hidden="true"
                      className="mt-1 size-5 shrink-0"
                    />

                    <div>
                      <p className="font-bold">{label}</p>
                      <p className="text-sm text-ink-soft">
                        {description}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={preferences[key]}
                    aria-label={label}
                    onClick={() => toggle(key)}
                    className={`min-h-11 min-w-16 shrink-0 rounded-control border-2 border-ink px-3 text-sm font-bold ${
                      preferences[key]
                        ? 'bg-ink text-canvas'
                        : 'bg-canvas text-ink'
                    }`}
                  >
                    {preferences[key] ? 'On' : 'Off'}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => update({ ...DEFAULTS })}
                className="inline-flex min-h-11 items-center gap-2 rounded-control border-2 border-ink bg-canvas px-4 font-bold text-ink hover:bg-blue-tint"
              >
                <RotateCcw aria-hidden="true" className="size-4" />
                Reset settings
              </button>

              <button
                type="button"
                onClick={closePanel}
                className="min-h-11 rounded-control border-2 border-ink bg-ink px-5 font-bold text-canvas"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
      <GlobalBasket onOpenChange={setBasketOpen} />
      <FortuneCookiePopup paused={open || basketOpen} />
    </>
  )
}
