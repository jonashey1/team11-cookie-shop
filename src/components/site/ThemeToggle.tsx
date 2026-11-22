
'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'cookie-shop-theme'

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    const updateTheme = () => {
      setTheme(
        document.documentElement.classList.contains('dark')
          ? 'dark'
          : 'light',
      )
    }

    updateTheme()

    const observer = new MutationObserver(updateTheme)

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  function toggleTheme() {
    const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark'

    document.documentElement.classList.toggle(
      'dark',
      nextTheme === 'dark',
    )

    document.documentElement.style.colorScheme = nextTheme

    try {
      localStorage.setItem(STORAGE_KEY, nextTheme)
    } catch {
      // The theme still works if storage is unavailable.
    }

    setTheme(nextTheme)
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      disabled={theme === null}
      aria-label={
        theme === 'dark'
          ? 'Switch to light mode'
          : 'Switch to dark mode'
      }
      title={
        theme === 'dark'
          ? 'Switch to light mode'
          : 'Switch to dark mode'
      }
      className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-control border-2 border-ink bg-canvas text-ink transition-colors hover:bg-blue-tint disabled:opacity-50"
    >
      {theme === 'dark' ? (
        <Sun aria-hidden="true" className="size-5" />
      ) : (
        <Moon aria-hidden="true" className="size-5" />
      )}
    </button>
  )
}
