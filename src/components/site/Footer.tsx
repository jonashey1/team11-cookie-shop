
import Link from 'next/link'
import { SITE_NAME } from '@/content/campus-cycle'

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/workshops', label: 'Our Cookies' },
  { href: '/clinics', label: 'Order Cookies' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy' },
]

export function Footer() {
  return (
    <footer className="mt-section bg-blue-tint">
      <div className="mx-auto grid max-w-page gap-block px-gutter py-12 sm:grid-cols-[2fr_1fr]">
        <div className="grid content-start gap-3">
          <p className="font-heading text-xl font-black">
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

        <nav aria-label="Footer navigation" className="grid content-start gap-2">
          <h2 className="text-sm font-bold tracking-[0.08em] uppercase">
            Quick Links
          </h2>

          <ul className="grid gap-2">
            {LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="hover:underline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-line pt-6 sm:col-span-2">
          <p className="text-sm font-semibold">
            Team 11 – Cookie Shop | UGent | Team code: T11-S3F8
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
