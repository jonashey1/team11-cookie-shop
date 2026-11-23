
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
import { FloatingOrderButton } from './FloatingOrderButton'
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

      <header className="border-b border-line">
        <div className="mx-auto flex w-full max-w-none flex-wrap items-center justify-between gap-x-3 gap-y-3 px-4 py-4 lg:gap-x-4 lg:px-6">
          <Link
            href="/"
            className="flex min-h-11 items-center gap-3 font-heading text-xl font-black text-ink no-underline"
          >
            <span className="framed grid size-10 place-items-center rounded-control bg-yellow-tint [--offset-size:3px]">
              <Cookie
                aria-hidden="true"
                className="size-6"
                strokeWidth={2.25}
              />
            </span>

            {SITE_NAME}
          </Link>

          {/* Desktop navigation: the page's single nav element. */}
          <div className="hidden min-[900px]:block">
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
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-center gap-2 rounded-control border-2 border-ink bg-canvas px-4 font-bold text-ink hover:bg-blue-tint [&::-webkit-details-marker]:hidden">
              <Menu aria-hidden="true" className="size-5" />
              Browse Cookie Shop
            </summary>

            <div className="mt-2 rounded-panel border-2 border-line bg-canvas p-3">
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
              className="flex min-h-11 flex-wrap items-center gap-3"
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

      <FloatingOrderButton />
    </>
  )
}
