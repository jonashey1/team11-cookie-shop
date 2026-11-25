import { describe, expect, it } from 'vitest'
import { formatWorkshopSession, readWorkshopRegistration } from '../../src/lib/workshop-registration'

function registration(overrides: Record<string, string> = {}) {
  const form = new FormData()
  for (const [key, value] of Object.entries({
    workshop: '1', session: '2', participants: '3', name: ' Demo Baker ',
    email: 'BAKER@cookieshop.example', requestId: '12345678-1234-4234-8234-123456789012',
    ...overrides,
  })) form.set(key, value)
  return readWorkshopRegistration(form)
}

describe('workshop registration input', () => {
  it('normalises fictional contact details and parses identifiers', () => {
    expect(registration().input).toMatchObject({ workshop: 1, session: 2, participants: 3, name: 'Demo Baker', email: 'baker@cookieshop.example' })
  })

  it.each<Record<string, string>>([
    { workshop: '0' }, { session: '2147483648' }, { participants: '0' }, { participants: '-1' },
    { participants: '2.5' }, { participants: '7' }, { name: '' },
    { email: 'not-an-email' }, { requestId: '' },
  ])('rejects invalid input %j', fields => {
    expect(registration(fields).error).toBeTruthy()
  })

  it.each(['gmail.com', 'outlook.com', 'hotmail.com', 'ugent.be', 'sub.example.org', 'cookieshop.example'])(
    'accepts a syntactically valid demo address at %s',
    domain => {
      const email = `cookie-shop-demo+test@${domain}`
      expect(registration({ email }).input?.email).toBe(email)
    },
  )

  it.each(['demo@', '@gmail.com', 'demo@@outlook.com', 'demo tag@hotmail.com', 'demo@-ugent.be', 'demo@ugent..be', 'a..b@ugent.be'])(
    'rejects malformed email %s',
    email => {
      expect(registration({ email }).error).toBe('Enter a valid email address.')
    },
  )

  it('formats summer and winter times in Brussels', () => {
    expect(formatWorkshopSession('2027-07-10T08:00:00Z', '2027-07-10T09:30:00Z')).toMatch(/10:00.*11:30.*Brussels/)
    expect(formatWorkshopSession('2027-01-10T08:00:00Z', '2027-01-10T09:30:00Z')).toMatch(/09:00.*10:30.*Brussels/)
  })
})
