
import Link from 'next/link'
import { SITE_NAME } from '@/content/campus-cycle'

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/workshops#cookies', label: 'Our Cookies' },
  { href: '/workshops#workshops', label: 'Workshops' },
  { href: '/clinics', label: 'Order Cookies' },
  { href: '/cookie-finder', label: 'Cookie Finder' },
  { href: '/fortune-cookie', label: 'Fortune Cookie' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/faq', label: 'FAQ' },
  { href: '/privacy', label: 'Privacy' },
]

export function Footer() {
  return (
    <footer className="mt-section border-t border-line bg-blue-tint pb-24">
      <div className="mx-auto grid max-w-page gap-block px-gutter py-block sm:grid-cols-[1.1fr_1fr] sm:py-section">
        <div className="grid content-start gap-stack">
          <p className="font-heading text-2xl font-bold tracking-tight text-ink">
            {SITE_NAME}
          </p>

          <p className="max-w-[40ch] text-ink-soft">
            Discover delicious cookies, explore different
            flavours and find your favourite sweet treats.
          </p>

          <p className="max-w-[40ch] text-sm text-ink-soft">
            A fictional online cookie store created as part
            of a university web development project.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="grid content-start gap-stack">
          <h2 className="font-sans text-sm font-bold tracking-wider text-ink uppercase">
            Quick Links
          </h2>

          <ul className="grid grid-cols-2 gap-x-stack">
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="inline-flex min-h-11 items-center rounded-control py-1 text-sm font-semibold hover:text-ink"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-line pt-stack sm:col-span-2">
          <p className="text-sm font-semibold">
            Team 11 - Cookie Shop | UGent | Team code: T11-S3F8
          </p>

          <p className="mt-2 text-sm text-ink-soft">
            This website is a university demonstration project.
            Products and prices are examples. No real orders
            or online payments are processed.
          </p>
        </div>
      </div>
    </footer>
  )
}
