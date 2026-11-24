import type { CollectionConfig } from 'payload'
import { anyone, editorsOnly, nobody } from '../access'
import { COOKIE_IDS } from '../content/cookies'
import { COOKIE_IMAGES } from '../lib/workshop-image'

export const Cookies: CollectionConfig = {
  slug: 'cookies',
  admin: { useAsTitle: 'name', defaultColumns: ['productId', 'name', 'price'] },
  access: { read: anyone, create: nobody, update: editorsOnly, delete: nobody },
  fields: [
    { name: 'productId', type: 'number', required: true, unique: true,
      admin: { readOnly: true }, access: { update: () => false },
      validate: (value: unknown) => COOKIE_IDS.some(id => id === value) || 'Choose a supported catalogue identifier.' },
    { name: 'name', type: 'text', required: true, maxLength: 100 },
    { name: 'slug', type: 'text', required: true, unique: true, admin: { readOnly: true }, access: { update: () => false } },
    { name: 'description', type: 'textarea', required: true },
    { name: 'flavour', type: 'text', required: true },
    { name: 'price', label: 'Price in euro cents', type: 'number', required: true, min: 1, max: 100000,
      validate: (value: unknown) => Number.isInteger(value) && Number(value) >= 1 && Number(value) <= 100000 || 'Enter a whole number of cents from 1 to 100,000.' },
    { name: 'illustration', type: 'select', required: true, options: Object.keys(COOKIE_IMAGES) },
    { name: 'sweetness', type: 'number', required: true, min: 1, max: 5,
      validate: (value: unknown) => Number.isInteger(value) && Number(value) >= 1 && Number(value) <= 5 || 'Enter a whole number from 1 to 5.' },
    { name: 'chocolate', type: 'number', required: true, min: 1, max: 5,
      validate: (value: unknown) => Number.isInteger(value) && Number(value) >= 1 && Number(value) <= 5 || 'Enter a whole number from 1 to 5.' },
    { name: 'texture', type: 'text', required: true },
    { name: 'preference', type: 'text', required: true },
    { name: 'caramel', type: 'checkbox', defaultValue: false },
  ],
}
