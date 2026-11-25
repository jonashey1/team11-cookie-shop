import { ValidationError, type CollectionConfig } from 'payload'
import { editorsOnly, nobody } from '../access'
import { requireExistingRelation } from '../lib/modelIntegrity'
import { positiveInteger } from './fields'

export const WorkshopSessions: CollectionConfig = {
  slug: 'workshop-sessions',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'workshop', 'startsAt', 'status', 'capacity', 'reservedPlaces'] },
  access: { read: editorsOnly, create: editorsOnly, update: editorsOnly, delete: nobody },
  hooks: {
    beforeChange: [
      requireExistingRelation('workshop', 'workshops', 'Choose an existing workshop.'),
      ({ data, originalDoc }) => {
        const start = Date.parse(data.startsAt ?? originalDoc?.startsAt ?? '')
        const end = Date.parse(data.endsAt ?? originalDoc?.endsAt ?? '')
        if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
          throw new ValidationError({ errors: [{ path: 'endsAt', message: 'End time must follow the start time.' }] })
        }
        const capacity = data.capacity ?? originalDoc?.capacity
        if (capacity < (originalDoc?.reservedPlaces ?? 0)) {
          throw new ValidationError({ errors: [{ path: 'capacity', message: 'Capacity cannot be lower than confirmed places.' }] })
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true, maxLength: 100 },
    { name: 'workshop', type: 'relationship', relationTo: 'workshops', required: true, index: true, access: { update: () => false }, admin: { description: 'Select the workshop when creating the session.' } },
    { name: 'startsAt', type: 'date', required: true, index: true, admin: { date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'endsAt', type: 'date', required: true, admin: { date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'capacity', type: 'number', required: true, min: 1, max: 100, validate: positiveInteger },
    { name: 'reservedPlaces', type: 'number', required: true, defaultValue: 0, access: { create: () => false, update: () => false }, admin: { readOnly: true, description: 'Remaining places equal capacity minus confirmed places.' } },
    { name: 'status', type: 'select', required: true, defaultValue: 'closed', options: ['open', 'closed', 'cancelled'] },
    { name: 'internalNotes', type: 'textarea', maxLength: 1000 },
  ],
}
