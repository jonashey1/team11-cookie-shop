
import type { Metadata } from 'next'
import Link from 'next/link'
import { headers } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { getPayload } from 'payload'
import { LoginForm } from '@/components/site/LoginForm'
import { Notice } from '@/components/site/Notice'
import { PageTitle } from '@/components/site/PageTitle'
import { membersAreaOn, signedInMember } from '@/lib/membersArea'
import config from '@/payload.config'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = { title: 'Log in', robots: { index: false } }

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> }

export default async function LoginPage({ searchParams }: Props) {
  if (!membersAreaOn()) notFound()

  const payload = await getPayload({ config })

  if (await signedInMember(payload, await headers())) redirect('/account')

  const signedOut = 'signed-out' in (await searchParams)

  return (
    <div className="pb-block">
      <PageTitle
        title="Log in"
        intro="Log in to access your Cookie Shop account."
        tone="blue"
        className="border border-line"
      />

      <div className="max-w-reading grid min-w-0 gap-stack rounded-panel border border-line bg-blue-tint p-5 sm:p-block">
        {signedOut && (
          <Notice tone="success" label="Done" role="status">
            <p>You are logged out.</p>
          </Notice>
        )}

        <LoginForm />

        <p className="text-ink-soft">
          No account? You can still{' '}
          <Link href="/workshops">explore our cookies</Link>{' '}
          without logging in. Accounts are created by the site&apos;s editors.
        </p>
      </div>
    </div>
  )
}
