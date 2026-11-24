
export const COOKIES = [
  {
    id: 1,
    name: 'Classic Chocolate Chip',
    description: 'A classic cookie filled with delicious chocolate chips. Perfect for chocolate lovers.',
    flavour: 'Chocolate',
    price: 350,
    emoji: '🍪',
  },
  {
    id: 2,
    name: 'Double Chocolate',
    description: 'A rich chocolate cookie with extra chocolate pieces for an intense chocolate experience.',
    flavour: 'Chocolate',
    price: 395,
    emoji: '🍫',
  },
  {
    id: 3,
    name: 'White Chocolate',
    description: 'A sweet cookie with creamy white chocolate pieces and a soft centre.',
    flavour: 'White Chocolate',
    price: 375,
    emoji: '🤍',
  },
  {
    id: 4,
    name: 'Red Velvet',
    description: 'A delicious red velvet cookie with a smooth and sweet flavour.',
    flavour: 'Red Velvet',
    price: 395,
    emoji: '❤️',
  },
  {
    id: 5,
    name: 'Salted Caramel',
    description: 'The perfect combination of sweet caramel and a touch of sea salt.',
    flavour: 'Caramel',
    price: 395,
    emoji: '🍯',
  },
  {
    id: 6,
    name: 'Cookies & Cream',
    description: 'A tasty cookie inspired by the classic combination of cookies and cream.',
    flavour: 'Cookies & Cream',
    price: 395,
    emoji: '🍪',
  },
] as const

export const COOKIE_IDS = [1, 2, 3, 4, 5, 6] as const

export type CookieProfile = {
  sweetness: number
  chocolate: number
  texture: string
  preference: string
  caramel?: boolean
}

export type CookieProduct = {
  id: (typeof COOKIE_IDS)[number]
  name: string
  description: string
  flavour: string
  price: number
  image?: { src: string; alt: string }
  profile?: CookieProfile
}
