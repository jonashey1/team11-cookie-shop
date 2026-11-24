
'use client'

// Error page for the Cookie Shop ordering section.
// Visitors can retry loading the page or return to Order Cookies.

import { PageTitle } from '@/components/site/PageTitle'
import { ButtonLink } from '@/components/site/ButtonLink'
import { Button } from '@/components/ui/button'

type ErrorPageProps = {
  error: Error & { digest?: string }
  retry: () => void
}

export default function ClinicError({ retry }: ErrorPageProps) {
  return (
    <div className="pb-block">
      <PageTitle
        title="This page could not be shown"
        intro="Something went wrong while loading this page. Please try again or return to the Cookie Shop ordering page."
        tone="yellow"
        className="border border-line"
      />

      <div className="flex flex-wrap gap-stack">
        <Button type="button" onClick={() => retry()}>
          Try again
        </Button>

        <ButtonLink href="/clinics" variant="secondary">
          Order Cookies
        </ButtonLink>
      </div>
    </div>
  )
}
