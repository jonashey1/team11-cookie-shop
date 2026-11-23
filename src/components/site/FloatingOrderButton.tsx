'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, ShoppingBag, X } from 'lucide-react'

const STORAGE_KEY = 'cookie-shop-hide-floating-order'

export function FloatingOrderButton() {
  const pathname = usePathname()
  const [dismissed, setDismissed] = useState(true)

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(STORAGE_KEY) === 'true')
    } catch {
      setDismissed(false)
    }
  }, [])

  function dismiss() {
    setDismissed(true)

    try {
      sessionStorage.setItem(STORAGE_KEY, 'true')
    } catch {
      // The button still closes if storage is unavailable.
    }
  }

  if (
    dismissed ||
    pathname === '/clinics' ||
    pathname?.startsWith('/clinics/')
  ) {
    return null
  }

  return (
    <div className="fixed bottom-3 left-3 z-40 max-w-[calc(100vw-6rem)] sm:bottom-6 sm:left-6">
      <Link
        href="/clinics"
        aria-label="Order cookies now"
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border-2 border-white/30 bg-[#6941C6] px-3 py-2 text-sm font-black text-white no-underline shadow-[0_8px_28px_rgba(40,20,90,0.35)] transition-all duration-200 hover:-translate-y-1 hover:bg-[#5833B3] hover:shadow-[0_12px_32px_rgba(40,20,90,0.45)] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#6941C6] sm:min-h-14 sm:gap-3 sm:px-5 sm:py-3 sm:text-base"
      >
        <ShoppingBag aria-hidden="true" className="size-5 shrink-0" />

        <span className="whitespace-nowrap">
          Order Cookies
          <span className="hidden sm:inline"> Now</span>
        </span>

        <ArrowRight aria-hidden="true" className="size-5 shrink-0" />
      </Link>

      <button
        type="button"
        onClick={dismiss}
        aria-label="Hide floating order button"
        title="Hide this button"
        className="absolute -right-2 -top-3 flex size-8 items-center justify-center rounded-full border-2 border-ink bg-canvas text-ink shadow-md transition-transform hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <X aria-hidden="true" className="size-4" />
      </button>
    </div>
  )
}