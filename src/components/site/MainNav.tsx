
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/cookies', label: 'Our Cookies' },
  { href: '/workshops', label: 'Workshops' },
  { href: '/cookie-finder', label: 'Cookie Finder' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact & FAQ' },
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

type MainNavProps = {
  account?: boolean
  loggedIn?: boolean
  mobile?: boolean
}

export function MainNav({
  account = false,
  loggedIn = false,
  mobile = false,
}: MainNavProps) {
  const pathname = usePathname() ?? ''

  const links = account
    ? [...LINKS, loggedIn ? ACCOUNT_LINK : LOGIN_LINK, ORDER_LINK]
    : [...LINKS, ORDER_LINK]

  const content = (
    <ul className="excellence-main-nav flex flex-col gap-1 min-[1050px]:flex-row min-[1050px]:flex-wrap min-[1050px]:items-center min-[1050px]:justify-center">
      {links.map(({ href, label }) => {
        const current = currentFor(href, pathname)
        const isOrder = href === '/clinics'

        return (
          <li key={href}>
            <Link
              href={href}
              aria-current={current}
              className={cn(
                'flex min-h-11 items-center rounded-control border text-sm font-semibold no-underline focus-visible:outline-offset-2',
                isOrder
                  ? 'border-ink bg-ink px-4 font-bold text-canvas hover:border-line hover:bg-blue-tint hover:text-ink'
                  : current
                    ? 'border-line bg-yellow-wash px-2.5 font-bold text-ink'
                    : href === '/workshops'
                      ? 'border-line bg-blue-tint px-2.5 text-ink hover:bg-yellow-wash'
                      : 'border-transparent px-2.5 text-ink hover:bg-yellow-wash',
              )}
            >
              {label}
            </Link>
          </li>
        )
      })}
    </ul>
  )

  if (mobile) {
    return <div aria-label="Mobile menu">{content}</div>
  }

  return <nav aria-label="Main">{content}</nav>
}
