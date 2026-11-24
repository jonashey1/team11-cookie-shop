'use client'

import { useState } from 'react'

/** An optional OpenStreetMap integration. Never loads the provider until the visitor opts in. */
export function OptionalGhentMap() {
  const [showMap, setShowMap] = useState(false)

  return (
    <section aria-labelledby="map-integration" className="grid gap-stack rounded-panel border border-line bg-blue-tint p-6 sm:p-block">
      <h2 id="map-integration" className="text-2xl">Explore Ghent on OpenStreetMap</h2>
      <p>Cookie Shop is a fictional student project without a physical shop. This map illustrates central Ghent; it is not a pickup location.</p>
      <p className="text-sm">If you load the map, your browser connects to OpenStreetMap and shares connection information such as your IP address with the provider.</p>
      {!showMap ? (
        <button type="button" className="min-h-11 w-fit rounded-control border border-ink bg-canvas px-5 py-3 font-semibold hover:bg-yellow-wash" onClick={() => setShowMap(true)}>
          Load interactive map
        </button>
      ) : (
        <div className="grid gap-3">
          <iframe
            title="OpenStreetMap showing central Ghent (illustrative, not a shop address)"
            src="https://www.openstreetmap.org/export/embed.html?bbox=3.6974%2C51.0443%2C3.7374%2C51.0643&layer=mapnik&marker=51.0543%2C3.7174"
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-72 w-full rounded-frame border border-line"
          />
          <a className="w-fit underline underline-offset-4" href="https://www.openstreetmap.org/#map=14/51.0543/3.7174" target="_blank" rel="noopener noreferrer">Open the full map on OpenStreetMap</a>
        </div>
      )}
    </section>
  )
}
