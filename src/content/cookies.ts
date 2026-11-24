// The six cookies as they were first written, before they moved into the Payload collection
// "cookies" (src/collections/Cookies.ts). The migration 20261124_203238_cookies copied these values
// into the database. They stay here for two reasons:
//   - the catalogue numbers (1 to 6) are fixed: illustrations, tasting profiles and saved orders use
//     them, so the code needs to know which numbers exist;
//   - when the database has no cookie records yet (a brand-new laptop database before its first
//     migration), the site can still show something sensible.
// What users see (name, description, flavour, price) comes from the database: see
// src/lib/cookie-catalogue.ts on the server and useCookies() in the browser.

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

/** One of the fixed catalogue numbers, 1 to 6. */
export type CookieId = (typeof COOKIES)[number]['id']

/** A cookie as the site shows it. Name, description, flavour and price come from the database. */
export interface CookieProduct {
  id: CookieId
  name: string
  description: string
  flavour: string
  /** The price of one cookie, in cents. */
  price: number
  emoji: string
}

/** Is this one of the fixed catalogue numbers? */
export function isCookieId(value: unknown): value is CookieId {
  return COOKIES.some(cookie => cookie.id === value)
}
