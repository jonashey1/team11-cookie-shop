'use client'

import { useState } from 'react'

// The marker matches the destination in UGent's faculty directions for Tweekerkenstraat 2.
const latitude = 51.0427465
const longitude = 3.7274096
const provider = 'https://www.openstreetmap.org'
const embed = provider + '/export/embed.html?' + new URLSearchParams({
  bbox: '3.7219,51.0405,3.7329,51.0450',
  layer: 'mapnik',
  marker: latitude + ',' + longitude,
})
const fullMap = provider + '/?mlat=' + latitude + '&mlon=' + longitude + '#map=17/' + latitude + '/' + longitude

export function OptionalGhentMap() {
  const [showMap, setShowMap] = useState(false)

  return (
    <section aria-labelledby="map-integration" className="grid gap-stack rounded-panel border border-line bg-blue-tint p-6 sm:p-block">
      <h2 id="map-integration" className="text-2xl">Find Our University Campus</h2>
      <p><strong>Ghent University — Campus Tweekerken</strong><br />Tweekerkenstraat 2, 9000 Ghent</p>
      <p>Cookie Shop is a fictional university project associated with this campus. There is no physical Cookie Shop or pickup location here.</p>
      <p id="campus-map-privacy" className="text-sm">Opening the interactive map connects your browser to OpenStreetMap, which can receive connection data such as your IP address.</p>
      <button type="button" aria-pressed={showMap} aria-describedby="campus-map-privacy"
        className="min-h-11 w-fit rounded-control border border-ink bg-canvas px-5 py-3 font-semibold hover:bg-yellow-wash"
        onClick={() => setShowMap(!showMap)}>
        Show OpenStreetMap
      </button>
      {showMap && (
        <iframe title="OpenStreetMap showing Ghent University Campus Tweekerken"
          src={embed} loading="lazy" referrerPolicy="no-referrer"
          className="h-72 w-full rounded-frame border border-line" />
      )}
      <a className="w-fit underline underline-offset-4" href={fullMap} target="_blank" rel="noopener noreferrer">Open Campus Tweekerken on OpenStreetMap</a>
    </section>
  )
}
