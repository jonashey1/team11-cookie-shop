import Link from 'next/link'
import { ArrowRight, Cookie, PackageOpen, Scale } from 'lucide-react'
import { CookieCommercialPlayer } from './CookieCommercialPlayer'

const features = [
  { label: 'Discover', description: 'Find your perfect cookie.', href: '/cookie-finder', Icon: Cookie },
  { label: 'Compare', description: 'Choose with confidence.', href: '/workshops#comparison', Icon: Scale },
  { label: 'Personalise', description: 'Build your own box.', href: '/build-your-box', Icon: PackageOpen },
] as const

export function CookieShopExperience() {
  return (
    <section aria-labelledby="cookie-shop-experience" className="grid min-w-0 gap-5 rounded-panel border border-line bg-blue-tint p-3 sm:gap-6 sm:p-6 lg:p-8">
      <div className="grid justify-items-center gap-2 text-center">
        <p className="text-sm font-bold tracking-wider text-ink-soft uppercase">The Cookie Shop Experience</p>
        <h2 id="cookie-shop-experience" className="text-3xl sm:text-4xl">More than just cookies.</h2>
        <p className="text-ink-soft">A little more personal. A lot more delicious.</p>
      </div>

      <div className="mx-auto w-full max-w-4xl rounded-panel border-2 border-ink bg-canvas p-1.5 shadow-[3px_3px_0_0_var(--color-brand)] sm:p-2">
        <CookieCommercialPlayer />
      </div>

      <ul className="mx-auto grid w-full max-w-4xl gap-2 min-[680px]:grid-cols-3 sm:gap-3">
        {features.map(({ label, description, href, Icon }) => (
          <li key={label} className="min-w-0">
            <Link href={href} className="grid h-full min-w-0 grid-cols-[auto_1fr_auto] items-center gap-3 rounded-frame border border-line bg-canvas p-3 text-ink no-underline hover:border-ink hover:bg-yellow-wash sm:p-4">
              <Icon aria-hidden="true" className="size-5" />
              <span className="min-w-0">
                <span className="block text-xs font-bold tracking-wide text-ink-soft uppercase">{label}</span>
                <span className="block font-heading font-bold break-words">{description}</span>
              </span>
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </li>
        ))}
      </ul>

      <details className="mx-auto w-full max-w-4xl rounded-frame border border-line bg-canvas px-3 py-2 text-sm sm:px-4">
        <summary className="min-h-9 cursor-pointer py-2 font-bold">Commercial transcript</summary>
        <div className="grid max-w-reading gap-2 pb-3 text-ink-soft">
          <p>Soft instrumental music plays. A woman opens a laptop and browses Cookie Shop. The Finder asks about her taste and recommends Double Chocolate.</p>
          <p>Three flavours appear side by side, with differences highlighted. In the box builder, she chooses four cookies and swaps Double Chocolate for Red Velvet.</p>
          <p>The basket and checkout lead to a saved test order. A couple smiles at the confirmation, and friends share cookies in the kitchen.</p>
          <p>Cookie Shop. Your taste. Your choice. Your perfect cookie. team11-cookie-shop.vercel.app. Fictional university project — UGent.</p>
        </div>
      </details>
    </section>
  )
}
