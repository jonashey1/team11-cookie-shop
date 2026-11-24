
import { headers } from 'next/headers'
import Link from 'next/link'
import { Cookie, Menu } from 'lucide-react'
import { getPayload } from 'payload'
import { signOut } from '@/app/(site)/account/actions'
import { Button } from '@/components/ui/button'
import { SITE_NAME } from '@/content/campus-cycle'
import { membersAreaOn, signedInMember } from '@/lib/membersArea'
import config from '@/payload.config'
import { AccessibilityCenter } from './AccessibilityCenter'
import { MainNav } from './MainNav'
import { ThemeToggle } from './ThemeToggle'

/**
 * Checks whether a member is logged in.
 * If the optional members' area is disabled, no lookup is needed.
 */
async function loggedInMember() {
  if (!membersAreaOn()) return null

  try {
    return await signedInMember(
      await getPayload({ config }),
      await headers(),
    )
  } catch (error) {
    console.error('Could not look up the logged-in member:', error)
    return null
  }
}

export async function Header() {
  const member = await loggedInMember()

  return (
    <>
      {/* Allows keyboard users to skip directly to the main content. */}
      <a
        href="#main"
        className="sr-only z-10 rounded-control bg-ink font-bold text-canvas no-underline focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:px-4 focus:py-2"
      >
        Skip to main content
      </a>

      <header className="border-b border-line bg-canvas">
        <div className="mx-auto flex w-full max-w-page flex-wrap items-center justify-between gap-x-stack gap-y-stack px-gutter py-stack min-[900px]:grid min-[900px]:grid-cols-[auto_minmax(0,1fr)_auto]">
          <Link
            href="/"
            className="flex min-h-11 items-center gap-2.5 rounded-control font-heading text-xl font-bold tracking-tight text-ink no-underline"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-yellow-tint">
              <Cookie
                aria-hidden="true"
                className="size-6"
                strokeWidth={2.25}
              />
            </span>

            {SITE_NAME}
          </Link>

          {/* Desktop navigation: the page's single nav element. */}
          <div className="hidden min-w-0 min-[900px]:block">
            <MainNav
              account={membersAreaOn()}
              loggedIn={member !== null}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <ThemeToggle />
            <AccessibilityCenter />
          </div>

          {/* Mobile menu: same links, without a second nav element. */}
          <details className="group relative order-3 w-full min-[900px]:hidden">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-center gap-2 rounded-control border border-line bg-blue-tint px-4 text-center text-sm font-bold text-ink hover:bg-yellow-wash group-open:border-ink [&::-webkit-details-marker]:hidden">
              <Menu aria-hidden="true" className="size-5" />
              Browse Cookie Shop
            </summary>

            <div className="mt-2 rounded-frame border border-line bg-blue-tint p-2">
              <MainNav
                account={membersAreaOn()}
                loggedIn={member !== null}
                mobile
              />
            </div>
          </details>

          {member && (
            <form
              action={signOut}
              className="flex min-h-11 flex-wrap items-center gap-3 min-[900px]:col-span-3 min-[900px]:justify-self-end"
            >
              <span className="font-semibold">
                {member.name || member.email}
              </span>

              <Button type="submit" variant="secondary">
                Log out
              </Button>
            </form>
          )}
        </div>
      </header>
    </>
  )
}
