// Set any visual to null to show the text and icon fallback for that placement.
export type ExcellenceVisual = {
  src: `/images/${string}`
  position: string
  flavour: 1 | 2 | 3 | 4 | 5 | 6
}
const classic = '/images/workshops/classic-chocolate-chip.png'
const chocolate = '/images/workshops/double-chocolate.png'
const vanilla = '/images/workshops/white-chocolate.png'
const velvet = '/images/workshops/red-velvet.png'
const caramel = '/images/workshops/salted-caramel.png'
const cream = '/images/workshops/cookies-and-cream.png'
const assorted = '/images/photography/cookie-box-counter.webp'

export const finderVisuals: readonly (readonly (ExcellenceVisual | null)[])[] = [
  [{src: chocolate, position: 'center 60%', flavour: 2}, {src: vanilla, position: 'center 59%', flavour: 3}, {src: caramel, position: 'center 58%', flavour: 5}, {src: cream, position: 'center 61%', flavour: 6}],
  [{src: chocolate, position: 'center 50%', flavour: 2}, {src: classic, position: 'center 60%', flavour: 1}, {src: caramel, position: 'center 48%', flavour: 5}, {src: cream, position: 'center 49%', flavour: 6}],
  [{src: chocolate, position: 'center 62%', flavour: 2}, {src: vanilla, position: 'center 27%', flavour: 3}, {src: caramel, position: 'center 62%', flavour: 5}, {src: velvet, position: 'center 26%', flavour: 4}],
  [{src: chocolate, position: 'center 55%', flavour: 2}, {src: classic, position: 'center 55%', flavour: 1}, {src: caramel, position: 'center 52%', flavour: 5}, {src: assorted, position: 'center 58%', flavour: 4}],
]

export const journeyVisuals = {
  discover: {src: classic, position: 'center 55%', flavour: 1},
  compare: {src: velvet, position: 'center 57%', flavour: 4},
  personalise: {src: assorted, position: 'center 61%', flavour: 3},
} satisfies Record<string, ExcellenceVisual | null>
