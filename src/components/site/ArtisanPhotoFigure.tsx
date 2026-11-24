import Image from 'next/image'
import type { ArtisanPhoto } from '@/content/artisan-photography'

export function ArtisanPhotoFigure({ photo, sizes }: { photo: ArtisanPhoto; sizes: string }) {
  return (
    <figure className="boutique-photo">
      <Image
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        sizes={sizes}
        loading="lazy"
      />
      <figcaption className="text-sm text-ink-soft">{photo.caption}</figcaption>
    </figure>
  )
}
