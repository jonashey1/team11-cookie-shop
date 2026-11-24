'use client'

import { useEffect } from 'react'

export function LegacyCookieLinks() {
  useEffect(() => {
    function followCookieFragment() {
      const fragment = window.location.hash
      if (/^#(?:cookies|taste-map|comparison|cookie-[1-6])$/.test(fragment)) {
        window.location.replace('/cookies' + fragment)
      }
    }

    followCookieFragment()
    window.addEventListener('hashchange', followCookieFragment)
    return () => window.removeEventListener('hashchange', followCookieFragment)
  }, [])

  return null
}
