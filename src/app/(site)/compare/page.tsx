import type { Metadata } from 'next'
import { PageTitle } from '@/components/site/PageTitle'
import { CookieComparison } from '@/components/site/CookieComparison'

export const metadata: Metadata = {
  title: 'Compare Your Cookies',
  description: 'Compare Cookie Shop flavours, prices and taste profiles side by side.',
}

export default function ComparePage() {
  return (
    <>
      <PageTitle title="Compare Your Cookies" intro="Discover what makes each cookie special." tone="blue" />
      <CookieComparison />
    </>
  )
}