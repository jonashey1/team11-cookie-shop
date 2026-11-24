'use client'

import { useRef, useState } from 'react'
import { Play } from 'lucide-react'
import { Button } from '@/components/ui/button'

const commercial = '/media/cookie-shop-commercial.mp4'

export function CookieCommercialPlayer() {
  const video = useRef<HTMLVideoElement>(null)
  const [activated, setActivated] = useState(false)
  const [failed, setFailed] = useState(false)

  function play() {
    const player = video.current
    if (!player) return

    // Leave the media URL unset until a user explicitly starts playback.
    player.src = commercial
    setActivated(true)
    player.focus()
    void player.play().catch(() => setFailed(true))
  }

  return (
    <>
      <div className="relative aspect-video rounded-frame bg-ink">
        <video
          ref={video}
          aria-label="The Cookie Shop Experience commercial"
          className="size-full rounded-frame object-contain"
          controls={activated}
          onError={() => setFailed(true)}
          onPlaying={() => setFailed(false)}
          playsInline
          poster="/media/cookie-shop-commercial-poster.webp"
          preload="none"
          tabIndex={activated ? 0 : -1}
        />
        {!activated && (
          <div className="absolute inset-0 grid place-items-center rounded-frame bg-ink/20 p-3">
            <Button type="button" variant="secondary" className="rounded-full whitespace-normal" onClick={play}>
              <Play aria-hidden="true" />
              Play commercial
            </Button>
          </div>
        )}
      </div>
      {failed && (
        <p role="status" className="mt-3 text-sm">
          Playback could not start. <a className="text-link underline" href={commercial}>Open the MP4 directly</a>.
        </p>
      )}
    </>
  )
}
