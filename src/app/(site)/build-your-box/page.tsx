import type { Metadata } from 'next'
import { PageTitle } from '@/components/site/PageTitle'
import { CookieBoxBuilder } from '@/components/site/CookieBoxBuilder'

const title = 'Build Your Own Cookie Box'
const intro = 'Choose any four cookies to create your perfect box.'

export const metadata: Metadata = { title, description: intro }

export default function BuildYourBoxPage() {
  return <>
    <PageTitle title={title} intro={intro} tone="blue" />
    <CookieBoxBuilder />
  </>
}
