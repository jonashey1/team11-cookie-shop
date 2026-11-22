
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/workshops', label: 'Our Cookies' },
  { href: '/cookie-finder', label: '🍪 Cookie Finder' },
  { href: '/clinics', label: 'Order Cookies' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/faq', label: 'FAQ' },
]

const ACCOUNT_LINK = { href: '/account', label: 'My bookings' }
const LOGIN_LINK = { href: '/account/login', label: 'Log in' }

function currentFor(
  href: string,
  pathname: string,
): 'page' | 'true' | undefined {
  if (pathname === href) return 'page'
  if (href === '/') return undefined
  if (pathname.startsWith(`${href}/`)) return 'true'
  if (href === '/workshops' && pathname.startsWith('/topics/')) return 'true'
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
    ? [...LINKS, loggedIn ? ACCOUNT_LINK : LOGIN_LINK]
    : LINKS

  return (
    <nav aria-label="Main">
      <ul className="flex flex-wrap gap-x-1 gap-y-2">
        {links.map(({ href, label }) => {
          const current = currentFor(href, pathname)

          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={current}
                className={cn(
                  'flex min-h-11 items-center rounded-control px-3 font-semibold text-ink no-underline focus-visible:outline-offset-6',
                  current
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
