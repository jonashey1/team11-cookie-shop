import type { CollectionConfig } from 'payload'
import { publicContent } from '../access'
import { checkUniqueSlug } from '../lib/modelIntegrity'
import { slug } from './fields'

// The cookies the shop sells. Editors change a cookie's name, description, flavour or price here,
// and the assortment, the comparison, the box builder and the order form all show the new value.
// The order action reads the price from here too, so a user can never send their own price.
//
// Each cookie keeps a fixed catalogue number (1 to 6). Its illustration and tasting profile live in
// the code and are found by that number, and saved orders refer to it, so it must never change.
export const Cookies: CollectionConfig = {
  slug: 'cookies',
  typescript: { interface: 'CookieRecord' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['catalogueId', 'name', 'flavour', 'priceCents'],
  },
  defaultSort: 'catalogueId',
  access: publicContent,
  hooks: { beforeChange: [checkUniqueSlug] },
  fields: [
    {
      name: 'catalogueId',
      type: 'number',
      required: true,
      unique: true,
      index: true,
      min: 1,
      admin: {
        position: 'sidebar',
        description: 'Fixed number of this cookie. Its illustration and saved orders use it: do not change it.',
      },
    },
    { name: 'name', type: 'text', required: true },
    slug,
    { name: 'description', type: 'textarea', required: true },
    {
      name: 'flavour',
      type: 'text',
      required: true,
      admin: { description: 'Shown as "Flavour: ..." on the cards, for example Chocolate.' },
    },
    {
      name: 'priceCents',
      type: 'number',
      required: true,
      min: 1,
      admin: { description: 'The price of one cookie in cents: 350 is €3.50.' },
    },
  ],
}
