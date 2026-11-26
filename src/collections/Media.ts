import type { CollectionConfig } from 'payload'
import { publicContent } from '../access'

// Uploaded images. Anyone can see them on the website; only editors can upload or change them.
export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    baseFilter: () => ({ filename: { not_in: [
      'adjust-your-brakes.jpg', 'clinic-tools.jpg', 'repair-a-puncture.jpg',
      'service-a-gear-system.jpg', 'true-a-wheel.jpg', 'workshop-tools.jpg',
    ] } }),
  },
  access: publicContent,
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Describe the image. Never upload photos of people.',
      },
    },
  ],
  upload: true,
}
