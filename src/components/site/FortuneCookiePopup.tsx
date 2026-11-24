
'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sparkles, X } from 'lucide-react'

const STORAGE_KEY = 'cookie-shop-fortune-popup-seen'

export function FortuneCookiePopup() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [ready, setReady] = useState(false)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (pathname !== '/') return

    try {
      if (sessionStorage.getItem(STORAGE_KEY) === 'yes') return
    } catch {
      // Continue if session storage is unavailable.
    }

    const timer = window.setTimeout(() => {
      try {
        sessionStorage.setItem(STORAGE_KEY, 'yes')
      } catch {
        // The popup remains usable without storage.
      }

      previousFocusRef.current = document.activeElement as HTMLElement
      setReady(true)
      setOpen(true)
    }, 2000)

    return () => window.clearTimeout(timer)
  }, [pathname])

  useEffect(() => {
    if (!open) return

    closeButtonRef.current?.focus()

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
        return
      }

      if (event.key !== 'Tab') return

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
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

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocusRef.current?.focus()
    }
  }, [open])

  if (!ready || !open || pathname !== '/') return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-scrim/75 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          setOpen(false)
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="fortune-popup-title"
        aria-describedby="fortune-popup-description"
        className="relative my-auto w-full max-w-lg rounded-panel border border-line bg-canvas p-6 text-center shadow-[4px_4px_0_0_var(--color-brand)] sm:p-block"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close fortune cookie popup"
          className="absolute right-3 top-3 flex size-11 items-center justify-center rounded-full border-2 border-line bg-canvas text-ink hover:bg-blue-tint"
        >
          <X aria-hidden="true" className="size-5" />
        </button>

        <div className="mb-3 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-link">
          <Sparkles aria-hidden="true" className="size-4" />
          A little surprise for you
          <Sparkles aria-hidden="true" className="size-4" />
        </div>

        <div
          aria-hidden="true"
          className="mx-auto mb-3 flex size-32 items-center justify-center rounded-full bg-yellow-wash text-8xl"
        >
          🥠
        </div>

        <h2
          id="fortune-popup-title"
          className="mb-3 text-3xl font-black text-ink sm:text-4xl"
        >
          Your fortune is waiting!
        </h2>

        <p
          id="fortune-popup-description"
          className="mx-auto mb-7 max-w-sm text-base leading-relaxed text-ink-soft"
        >
          Feeling lucky? Crack open a magical fortune cookie,
          reveal your surprise and discover your perfect cookie match!
        </p>

        <Link
          href="/fortune-cookie"
          onClick={() => setOpen(false)}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-control border-2 border-ink bg-ink px-6 py-3 text-lg font-black text-canvas no-underline transition-transform hover:scale-[1.02] motion-reduce:transition-none"
        >
          <Sparkles aria-hidden="true" className="size-5" />
          Crack my fortune
        </Link>

        <button
          type="button"
          onClick={() => setOpen(false)}
          className="mt-4 min-h-11 rounded-control px-5 py-2 font-semibold text-ink-soft underline underline-offset-4 hover:text-ink"
        >
          Maybe later
        </button>

        <p className="mt-3 text-xs text-ink-soft">
          Just for fun. No prizes or real predictions.
        </p>
      </div>
    </div>
  )
}
