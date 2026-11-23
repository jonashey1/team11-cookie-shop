
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/workshops#cookies', label: 'Our Cookies' },
  { href: '/workshops#workshops', label: 'Workshops' },
  { href: '/cookie-finder', label: 'Cookie Finder' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
]

const ORDER_LINK = { href: '/clinics', label: 'Order Cookies' }
const ACCOUNT_LINK = { href: '/account', label: 'My bookings' }
const LOGIN_LINK = { href: '/account/login', label: 'Log in' }

function currentFor(
  href: string,
  pathname: string,
): 'page' | 'true' | undefined {
  const path = href.split('#')[0]

  if (pathname === path) {
    if (href.includes('#')) return undefined
    return 'page'
  }

  if (path === '/') return undefined
  if (pathname.startsWith(`${path}/`)) return 'true'
  if (path === '/workshops' && pathname.startsWith('/topics/')) return 'true'

  return undefined
}

export function MainNav({
  account = false,
  loggedIn = false,
}: {
  account?: boolean
  loggedIn?: boolean
}) {
  const pathname = usePathname() ?? ''

  const links = account
    ? [...LINKS, loggedIn ? ACCOUNT_LINK : LOGIN_LINK, ORDER_LINK]
    : [...LINKS, ORDER_LINK]

  return (
    <nav aria-label="Main">
      <ul className="flex flex-col gap-1 min-[900px]:flex-row min-[900px]:flex-wrap min-[900px]:items-center min-[900px]:gap-x-1">
        {links.map(({ href, label }) => {
          const current = currentFor(href, pathname)
          const isOrder = href === '/clinics'

          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={current}
                className={cn(
                  'flex min-h-11 items-center whitespace-nowrap rounded-control px-2.5 font-semibold text-ink no-underline focus-visible:outline-offset-6',
                  isOrder
                    ? 'border-2 border-ink bg-yellow-tint px-4 font-black shadow-[4px_4px_0_0_#001b50] hover:brightness-95'
                    : current
                      ? 'framed rounded-control font-bold [--offset-size:4px]'
                      : 'border-2 border-transparent hover:bg-blue-tint',
                )}
              >
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
