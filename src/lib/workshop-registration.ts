export const MAX_WORKSHOP_PARTICIPANTS = 6

export type WorkshopSessionChoice = {
  id: number
  title: string
  startsAt: string
  endsAt: string
  remaining: number
  status: 'open' | 'closed' | 'cancelled'
}

export type WorkshopConfirmation = {
  reference: string
  workshopTitle: string
  sessionTitle: string
  startsAt: string
  endsAt: string
  participants: number
}

const dateFormat = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'full', timeStyle: 'short', timeZone: 'Europe/Brussels',
})

const EMAIL = /^(?![^@]*\.\.)[\w!#$%&'*+/=?^`{|}~-](?:[\w!#$%&'*+/=?^`{|}~.-]*[\w!#$%&'*+/=?^`{|}~-])?@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i

export function formatWorkshopSession(startsAt: string, endsAt: string) {
  return `${dateFormat.formatRange(new Date(startsAt), new Date(endsAt))} (Brussels time)`
}

export function readWorkshopRegistration(form: FormData) {
  const text = (field: string) => {
    const value = form.get(field)
    return typeof value === 'string' ? value.trim() : ''
  }
  const workshop = Number(text('workshop'))
  const session = Number(text('session'))
  const participants = Number(text('participants'))
  const name = text('name')
  const email = text('email').toLowerCase()
  const requestId = text('requestId')
  const validId = (value: number) => Number.isInteger(value) && value > 0 && value <= 2147483647
  if (!validId(workshop) || !validId(session)) return { error: 'Choose an available workshop session.' } as const
  if (!Number.isInteger(participants) || participants < 1 || participants > MAX_WORKSHOP_PARTICIPANTS) {
    return { error: 'Choose a valid number of participants.' } as const
  }
  if (name.length < 2 || name.length > 100) return { error: 'Enter a fictional full name of 2 to 100 characters.' } as const
  if (email.length > 254 || !EMAIL.test(email)) {
    return { error: 'Enter a valid email address.' } as const
  }
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestId)) {
    return { error: 'Reload the page before starting a new registration.' } as const
  }
  return { input: { workshop, session, participants, name, email, requestId } } as const
}

export type WorkshopRegistrationInput = NonNullable<ReturnType<typeof readWorkshopRegistration>['input']>
