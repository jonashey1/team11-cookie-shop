
/**
 * Cookie Shop product catalogue.
 *
 * Shared data for the Our Cookies page and
 * the interactive Cookie Finder quiz.
 *
 * These are fictional example products.
 * No real orders or payments are processed.
 */

export const COOKIES = [
  {
    id: 1,
    name: 'Classic Chocolate Chip',
    description:
      'A classic cookie filled with delicious chocolate chips. Perfect for chocolate lovers.',
    flavour: 'Chocolate',
    price: '€3.50',
    emoji: '🍪',
  },
  {
    id: 2,
    name: 'Double Chocolate',
    description:
      'A rich chocolate cookie with extra chocolate pieces for an intense chocolate experience.',
    flavour: 'Chocolate',
    price: '€3.95',
    emoji: '🍫',
  },
  {
    id: 3,
    name: 'White Chocolate',
    description:
      'A sweet cookie with creamy white chocolate pieces and a soft centre.',
    flavour: 'White Chocolate',
    price: '€3.75',
    emoji: '🍪',
  },
  {
    id: 4,
    name: 'Red Velvet',
    description:
      'A delicious red velvet cookie with a smooth and sweet flavour.',
    flavour: 'Red Velvet',
    price: '€3.95',
    emoji: '❤️',
  },
  {
    id: 5,
    name: 'Salted Caramel',
    description:
      'The perfect combination of sweet caramel and a touch of sea salt.',
    flavour: 'Caramel',
    price: '€3.95',
    emoji: '🍯',
  },
  {
    id: 6,
    name: 'Cookies & Cream',
    description:
      'A tasty cookie inspired by the classic combination of cookies and cream.',
    flavour: 'Cookies & Cream',
    price: '€3.95',
    emoji: '🍪',
  },
] as const

export type CookieProduct = (typeof COOKIES)[number]
