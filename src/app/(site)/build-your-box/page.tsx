import type { Metadata } from 'next'
import { PageTitle } from '@/components/site/PageTitle'
import { CookieBoxBuilder } from '@/components/site/CookieBoxBuilder'

export const metadata: Metadata = { title: 'Build Your Cookie Box', description: 'Choose four, six or twelve cookies for your fictional order.' }

export default function BuildYourBoxPage() {
  return <>
    <PageTitle title="Build Your Cookie Box" intro="Choose a size, fill every slot and add your selection to the basket." tone="blue" />
    <CookieBoxBuilder />
  </>
}
