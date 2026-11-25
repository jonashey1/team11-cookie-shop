import type { CollectionConfig, FieldAccess } from 'payload'
import { editorsOnly, nobody } from '../access'

const immutable: FieldAccess = () => false
const snapshot = { access: { update: immutable }, admin: { readOnly: true } } as const

export const WorkshopRegistrations: CollectionConfig = {
  slug: 'workshop-registrations',
  admin: { useAsTitle: 'reference', defaultColumns: ['reference', 'sessionTitle', 'participants', 'status', 'createdAt'] },
  access: { read: editorsOnly, create: nobody, update: editorsOnly, delete: nobody },
  fields: [
    { ...snapshot, name: 'reference', type: 'text', required: true, unique: true },
    { ...snapshot, name: 'requestId', type: 'text', required: true, unique: true, admin: { hidden: true } },
    { ...snapshot, name: 'workshop', type: 'relationship', relationTo: 'workshops', required: true },
    { ...snapshot, name: 'session', type: 'relationship', relationTo: 'workshop-sessions', required: true },
    { ...snapshot, name: 'participantName', type: 'text', required: true, maxLength: 100 },
    { ...snapshot, name: 'email', type: 'email', required: true },
    { ...snapshot, name: 'participants', type: 'number', required: true },
    { ...snapshot, name: 'workshopTitle', type: 'text', required: true },
    { ...snapshot, name: 'sessionTitle', type: 'text', required: true },
    { ...snapshot, name: 'sessionStartsAt', type: 'date', required: true },
    { ...snapshot, name: 'sessionEndsAt', type: 'date', required: true },
    {
      name: 'status', type: 'select', required: true, defaultValue: 'confirmed', options: ['confirmed', 'cancelled'],
      access: { update: ({ doc }) => doc?.status === 'confirmed' },
      admin: { description: 'Cancel a record to release its places. Cancellation is permanent.' },
    },
  ],
}
