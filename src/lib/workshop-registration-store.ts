import { randomUUID } from 'node:crypto'
import type { Payload } from 'payload'
import { starterWorkshopSlugs } from './public-workshop-content'
import type { WorkshopConfirmation, WorkshopRegistrationInput, WorkshopSessionChoice } from './workshop-registration'

type SessionRow = Omit<WorkshopSessionChoice, 'startsAt' | 'endsAt'> & {
  startsAt: Date
  endsAt: Date
}

export async function readWorkshopSessions(payload: Payload, workshopIds: number[]) {
  if (!workshopIds.length) return []
  const { rows } = await payload.db.pool.query<SessionRow & { workshop: number }>(`
    SELECT s.id, s.workshop_id AS workshop, s.title, s.starts_at AS "startsAt", s.ends_at AS "endsAt",
           (s.capacity - s.reserved_places)::integer AS remaining, s.status
    FROM workshop_sessions s JOIN workshops w ON w.id = s.workshop_id
    WHERE s.workshop_id = ANY($1::integer[]) AND s.starts_at > now() AND NOT (w.slug = ANY($2::text[]))
    ORDER BY s.starts_at, s.id
  `, [workshopIds, starterWorkshopSlugs])
  return rows.map(row => ({ ...row, startsAt: row.startsAt.toISOString(), endsAt: row.endsAt.toISOString() }))
}

type RegistrationRow = Omit<WorkshopConfirmation, 'startsAt' | 'endsAt'> & {
  startsAt: Date
  endsAt: Date
  workshop: number
  session: number
  name: string
  email: string
  status: 'confirmed' | 'cancelled'
}

const fields = `reference, workshop_id AS workshop, session_id AS session, participant_name AS name, email,
  participants::integer, workshop_title AS "workshopTitle", session_title AS "sessionTitle",
  session_starts_at AS "startsAt", session_ends_at AS "endsAt", status`

export async function saveWorkshopRegistration(payload: Payload, input: WorkshopRegistrationInput) {
  const pool = payload.db.pool
  try {
    // The database takes capacity only when a row was inserted. A duplicate has no capacity effect.
    const inserted = await pool.query<RegistrationRow>(`
      INSERT INTO workshop_registrations (
        reference, request_id, workshop_id, session_id, participant_name, email, participants,
        workshop_title, session_title, session_starts_at, session_ends_at, status
      )
      SELECT $1, $2, w.id, s.id, $3, $4, $5, w.title, s.title, s.starts_at, s.ends_at, 'confirmed'
      FROM workshop_sessions s JOIN workshops w ON w.id = s.workshop_id
      WHERE s.id = $6 AND w.id = $7 AND NOT (w.slug = ANY($8::text[]))
      ON CONFLICT (request_id) DO NOTHING
      RETURNING ${fields}
    `, [`WS-${randomUUID().toUpperCase()}`, input.requestId, input.name, input.email,
      input.participants, input.session, input.workshop, starterWorkshopSlugs])
    const record = inserted.rows[0] ?? (await pool.query<RegistrationRow>(`
      SELECT ${fields} FROM workshop_registrations WHERE request_id = $1
    `, [input.requestId])).rows[0]
    if (!record) return { error: 'That session is unavailable. Choose another session.' } as const
    if (record.workshop !== input.workshop || record.session !== input.session || record.name !== input.name
      || record.email !== input.email || record.participants !== input.participants) {
      return { error: 'This request was already used. Start a new registration to change your details.', used: true } as const
    }
    if (record.status === 'cancelled') return { error: 'This registration was cancelled. Start a new registration.', used: true } as const
    return { confirmation: {
      reference: record.reference, workshopTitle: record.workshopTitle, sessionTitle: record.sessionTitle,
      startsAt: record.startsAt.toISOString(), endsAt: record.endsAt.toISOString(), participants: record.participants,
    } satisfies WorkshopConfirmation } as const
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'PWR01') {
      return { error: 'This session no longer has enough places or has closed. Choose another session or fewer participants.' } as const
    }
    throw error
  }
}
