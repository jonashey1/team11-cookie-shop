import type { GlobalConfig } from 'payload'
import { editorsOnly } from '../access'

// Keep shared Cookie Shop settings in one record.
// A "global" is a record that exists exactly once (there is one set of site facts, not a list).
export const SiteFacts: GlobalConfig = {
  slug: 'site-facts',
  label: 'Site facts',
  admin: {
    description: 'Shared location and contact settings for Cookie Shop.',
  },
  // The site reads these retained settings on the server. The public API does not expose them.
  access: {
    read: editorsOnly,
    update: editorsOnly,
  },
  fields: [
    {
      name: 'pricingRule',
      type: 'textarea',
      required: true,
      admin: {
        hidden: true,
      },
    },
    {
      name: 'place',
      type: 'text',
      required: true,
      admin: {
        description: 'Shown on workshop and clinic pages.',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        description: 'Fictional email address for the Cookie Shop student project.',
      },
    },
  ],
}
