
import type { Workshop } from '@/payload-types'
import { imageFrom } from '@/lib/format'

const WORKSHOP_IMAGES: Record<string, { src: string; alt: string }> = {
  'classic-chocolate-chip': {
    src: '/images/workshops/cookie-baking-basics.png',
    alt: 'Freshly baked chocolate chip cookies with baking ingredients.',
  },
  'salted-caramel': {
    src: '/images/workshops/cookie-decorating-workshop.png',
    alt: 'Decorated cookies with colourful icing and sprinkles.',
  },
  'white-chocolate': {
    src: '/images/workshops/creative-cookie-workshop.png',
    alt: 'Creative cookies decorated with colourful icing.',
  },
  'double-chocolate': {
    src: '/images/workshops/chocolate-cookie-masterclass.png',
    alt: 'Rich chocolate cookies with dark and white chocolate chunks.',
  },

  // Original workshop slugs, kept for compatibility.
  'cookie-baking-basics': {
    src: '/images/workshops/cookie-baking-basics.png',
    alt: 'Chocolate chip cookies on a baking tray with baking ingredients.',
  },
  'cookie-decorating-workshop': {
    src: '/images/workshops/cookie-decorating-workshop.png',
    alt: 'Cookies decorated with icing and sprinkles.',
  },
  'chocolate-cookie-masterclass': {
    src: '/images/workshops/chocolate-cookie-masterclass.png',
    alt: 'Chocolate cookies with dark and white chocolate chunks.',
  },
  'creative-cookie-workshop': {
    src: '/images/workshops/creative-cookie-workshop.png',
    alt: 'Creative cookies with colourful icing and cookie cutters.',
  },
}

export function workshopImage(workshop: Workshop) {
  return WORKSHOP_IMAGES[workshop.slug] ?? imageFrom(workshop.image)
}
