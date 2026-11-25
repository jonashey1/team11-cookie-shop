'use server'

import { headers } from 'next/headers'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { allowRequest, clientKey } from '@/tasks/book-slot/guards'
import { readWorkshopRegistration, type WorkshopConfirmation, type WorkshopSessionChoice } from '@/lib/workshop-registration'
import { readWorkshopSessions, saveWorkshopRegistration } from '@/lib/workshop-registration-store'

type Result =
  | { confirmation: WorkshopConfirmation; error?: never }
  | { confirmation?: never; error: string; sessions?: WorkshopSessionChoice[]; used?: boolean }

export async function submitWorkshopRegistration(form: FormData): Promise<Result> {
  const parsed = readWorkshopRegistration(form)
  if (!parsed.input) return { error: parsed.error }
  try {
    const payload = await getPayload({ config })
    if (!await allowRequest(`workshop-registration:${clientKey(await headers())}`, 12, 1, { payload })) {
      return { error: 'Too many attempts. Wait a minute before trying again.' }
    }
    const result = await saveWorkshopRegistration(payload, parsed.input)
    if (result.confirmation) return result
    return { ...result, sessions: await readWorkshopSessions(payload, [parsed.input.workshop]) }
  } catch (error) {
    // Database details may contain fictional contact fields. Only log a stable error code.
    console.error('Workshop registration failed', error && typeof error === 'object' && 'code' in error ? error.code : 'unknown')
    return { error: 'We could not confirm your registration. Please try again with the same details.' }
  }
}
