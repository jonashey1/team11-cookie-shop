
'use client'

// Error page for the Cookie Shop ordering section.
// If an unexpected error occurs, visitors can try again
// or return to the main Order Cookies page.

import { PageTitle } from '@/components/site/PageTitle'
import { ButtonLink } from '@/components/site/ButtonLink'
import { Button } from '@/components/ui/button'

type ErrorPageProps = {
  error: Error & { digest?: string }
  retry: () => void
}

export default function ClinicError({ retry }: ErrorPageProps) {
  return (
    <div className="pb-6">
      <PageTitle
        title="This page could not be shown"
        intro="Something went wrong while loading this page. Please try again or return to the Cookie Shop ordering page."
        tone="yellow"
      />

      <div className="flex flex-wrap gap-3">
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
