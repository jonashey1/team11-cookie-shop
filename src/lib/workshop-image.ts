
import type { Workshop } from '@/payload-types'
import { imageFrom } from '@/lib/format'

export const COOKIE_IMAGES: Record<string, { src: string; alt: string }> = {
  'classic-chocolate-chip': {
    src: '/images/workshops/classic-chocolate-chip.png',
    alt: 'Three classic chocolate chip cookies on a plate with baking ingredients.',
  },
  'double-chocolate': {
    src: '/images/workshops/double-chocolate.png',
    alt: 'Three double chocolate cookies on a plate with chocolate pieces.',
  },
  'salted-caramel': {
    src: '/images/workshops/salted-caramel.png',
    alt: 'Three salted caramel cookies on a plate with caramel and baking ingredients.',
  },
  'red-velvet': {
    src: '/images/workshops/red-velvet.png',
    alt: 'Three red velvet cookies with white chocolate pieces on a plate.',
  },
  'cookies-and-cream': {
    src: '/images/workshops/cookies-and-cream.png',
    alt: 'Three cookies and cream cookies with pieces of chocolate sandwich cookies on a plate.',
  },
  'white-chocolate': {
    src: '/images/workshops/white-chocolate.png',
    alt: 'Three white chocolate cookies on a plate with white chocolate pieces.',
  },
}

export function cookieImage(name: string) {
  return COOKIE_IMAGES[name.toLowerCase().replace(' & ', ' and ').replaceAll(' ', '-')]
}

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

export const COOKIE_WORKSHOP_SLUGS = Object.keys(WORKSHOP_IMAGES)

export function workshopImage(workshop: Workshop) {
  return WORKSHOP_IMAGES[workshop.slug] ?? imageFrom(workshop.image)
}
