export type ArtisanPhoto = {
  src: `/images/photography/${string}.webp`
  alt: string
  width: number
  height: number
  caption: string
}

type Placement = 'aboutTeam' | 'contactCounter' | 'decoratingWorkshop'

// Set any placement to null to restore that section's original layout.
export const artisanPhotography: Record<Placement, ArtisanPhoto | null> = {
  aboutTeam: {
    src: '/images/photography/fictional-bakery-team.webp',
    alt: 'Five bakers in neutral aprons preparing trays of cookies around a kitchen table.',
    width: 1200,
    height: 800,
    caption: 'Generated image of the fictional Cookie Shop bakery team. The pictured people are fictional.',
  },
  contactCounter: {
    src: '/images/photography/cookie-box-counter.webp',
    alt: 'A hand places a chocolate chip cookie into a kraft box on a kitchen counter.',
    width: 1200,
    height: 800,
    caption: 'Generated illustration of the Cookie Shop concept.',
  },
  decoratingWorkshop: {
    src: '/images/photography/decorating-workshop.webp',
    alt: 'Hands pipe icing onto cookies arranged on a baking tray.',
    width: 1200,
    height: 800,
    caption: 'Generated illustration of a fictional cookie decorating workshop.',
  },
}
