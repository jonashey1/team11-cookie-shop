import type { CollectionConfig } from 'payload'
import { isEditor, publicContent } from '../access'
import { price } from './fields'

// The repairs the clinic can do, each with its price.
export const Repairs: CollectionConfig = {
  slug: 'repairs',
  admin: {
    useAsTitle: 'name',
  },
  access: { ...publicContent, read: ({ req }) => isEditor({ req }) || { name: { not_in: ['Full service', 'Each small repair', 'Check'] } } },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    price,
    {
      name: 'description',
      type: 'textarea',
    },
    // Add new repair fields here.
  ],
}
