
'use client'

import { useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingBag, X } from 'lucide-react'
import { formatOrderAmount, useOrderBasket } from './OrderBasket'

const STORAGE_KEY = 'cookie-shop-hide-floating-order'

const subscribe = () => () => {}

function getClientSnapshot() {
  return true
}

function getServerSnapshot() {
  return false
}

export function FloatingOrderButton() {
  const pathname = usePathname()
  const { count, total } = useOrderBasket()
  const onOrderPage = pathname === '/clinics'
  const summary = count > 0 ? `${count} ${count === 1 ? 'cookie' : 'cookies'} · ${formatOrderAmount(total)}` : null

  const hydrated = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  )

  const [dismissed, setDismissed] = useState(false)

  let storedDismissed = false

  if (hydrated) {
    try {
      storedDismissed = sessionStorage.getItem(STORAGE_KEY) === 'true'
    } catch {
      // The button remains available when storage is unavailable.
    }
  }

  function dismiss() {
    setDismissed(true)

    try {
      sessionStorage.setItem(STORAGE_KEY, 'true')
    } catch {
      // The button still closes if storage is unavailable.
    }
  }

  if (
    !hydrated ||
    dismissed ||
    storedDismissed ||
    (onOrderPage && !summary) ||
    pathname?.startsWith('/clinics/')
  ) {
    return null
  }

  return (
    <div className="boutique-order-dock fixed z-40 flex items-center gap-1 rounded-panel border border-line bg-canvas p-1 shadow-[3px_3px_0_0_var(--color-brand)]">
      <Link
        href={onOrderPage ? '#basket' : '/clinics'}
        aria-label={summary ? `${onOrderPage ? 'Review basket' : 'Order cookies now'}: ${summary}` : 'Order cookies now'}
        className="inline-flex min-h-11 min-w-0 items-center gap-2 rounded-control bg-ink px-3 py-2 text-sm font-bold leading-tight text-canvas no-underline transition-colors hover:bg-link focus-visible:outline-offset-2 sm:px-4"
      >
        <ShoppingBag aria-hidden="true" className="size-4 shrink-0" />
        <span className="min-w-0">
          {onOrderPage ? 'Review basket' : 'Order Cookies'}
          {summary && <span className="block font-normal tabular-nums sm:mt-1">{summary}</span>}
        </span>
      </Link>

      <button
        type="button"
        onClick={dismiss}
        aria-label="Hide floating order button"
        title="Hide this button"
        className="flex size-11 shrink-0 items-center justify-center rounded-control text-ink hover:bg-blue-tint focus-visible:outline-offset-2"
      >
        <X aria-hidden="true" className="size-4" />
      </button>
    </div>
  )
}
