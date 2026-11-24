import { permanentRedirect } from 'next/navigation'

export default function LegacyPage() {
  permanentRedirect("/cookies#compare-cookies")
}
