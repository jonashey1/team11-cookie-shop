import { permanentRedirect } from 'next/navigation'

// The Box Builder is now a section of Order Cookies, so old links and bookmarks go straight there.
export default function LegacyPage() {
  permanentRedirect('/clinics#build-your-box')
}
