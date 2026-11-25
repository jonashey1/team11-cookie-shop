import { randomUUID } from 'node:crypto'
import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import pg from 'pg'
import type { Payload } from 'payload'
import { saveWorkshopRegistration } from '../../src/lib/workshop-registration-store'
import { BASE_URL, useOwnAddress } from './helpers'

const workshopSlug = 'cookie-baking-basics'

function isolatedPool() {
  const connectionString = process.env.DATABASE_URL
  const local = (url: string) => ['localhost', '127.0.0.1', '[::1]'].includes(new URL(url).hostname)
  if (!connectionString || !local(connectionString) || !local(BASE_URL)) {
    throw new Error('Workshop regression tests require a disposable loopback database and website.')
  }
  return new pg.Pool({ connectionString })
}

test('enforces workshop capacity, idempotency, snapshots and cancellation in the database', async ({ request }) => {
  const pool = isolatedPool()
  const payload = { db: { pool } } as Payload
  const sessions: number[] = []
  try {
    const { rows: [workshop] } = await pool.query<{id: number}>('SELECT id FROM workshops WHERE slug = $1', [workshopSlug])
    expect(workshop).toBeDefined()
    for (const [status, offset] of [['open', 1], ['closed', 1], ['cancelled', 1], ['open', -2]] as const) {
      const { rows: [{ id }] } = await pool.query<{id: number}>(`
        INSERT INTO workshop_sessions (title, workshop_id, starts_at, ends_at, capacity, status)
        VALUES ('Concurrency fixture', $1, now() + $2 * interval '1 day',
          now() + $2 * interval '1 day' + interval '1 hour', 3, $3) RETURNING id
      `, [workshop.id, offset, status])
      sessions.push(id)
    }
    const [session, closed, cancelled, past] = sessions
    const create = (overrides = {}) => ({
      workshop: workshop.id, session, requestId: randomUUID(), participants: 2,
      name: 'Fictional Baker', email: 'fixture@cookieshop.example', ...overrides,
    })
    for (const item of [closed, cancelled, past, 2147483647]) {
      expect((await saveWorkshopRegistration(payload, create({ session: item }))).error).toBeTruthy()
    }
    expect((await saveWorkshopRegistration(payload, create({ workshop: 2147483647 }))).error).toBeTruthy()
    const duplicate = create()
    const [first, retry, competing] = await Promise.all([
      saveWorkshopRegistration(payload, duplicate), saveWorkshopRegistration(payload, duplicate),
      saveWorkshopRegistration(payload, create()),
    ])
    expect(first.confirmation).toEqual(retry.confirmation)
    const winner = first.confirmation ?? competing.confirmation!
    expect(winner.reference).toMatch(/^WS-[0-9A-F-]{36}$/)
    expect([first, competing].filter(result => result.confirmation)).toHaveLength(1)
    expect((await saveWorkshopRegistration(payload, create())).error).toBeTruthy()
    expect((await saveWorkshopRegistration(payload, create({ participants: 1 }))).confirmation).toBeDefined()
    expect((await saveWorkshopRegistration(payload, create({ participants: 1 }))).error).toBeTruthy()
    const reserved = async () => Number((await pool.query('SELECT reserved_places FROM workshop_sessions WHERE id = $1', [session])).rows[0].reserved_places)
    expect(await reserved()).toBe(3)
    expect((await pool.query('SELECT count(*)::int AS count FROM workshop_registrations WHERE session_id = $1', [session])).rows[0].count).toBe(2)
    await expect(pool.query('UPDATE workshop_sessions SET capacity = 2 WHERE id = $1', [session])).rejects.toMatchObject({ code: '23514' })
    await pool.query("UPDATE workshop_sessions SET title = 'Updated title' WHERE id = $1", [session])
    expect((await pool.query('SELECT session_title FROM workshop_registrations WHERE reference = $1', [winner.reference])).rows[0].session_title).toBe('Concurrency fixture')
    for (const slug of ['workshop-sessions', 'workshop-registrations']) {
      expect((await request.get('/api/' + slug)).status()).toBe(403)
      expect((await request.post('/api/' + slug, { data: {} })).status()).toBe(403)
    }
    const editor = await request.post('/api/users/login', { data: { email: process.env.FIRST_ADMIN_EMAIL, password: process.env.FIRST_ADMIN_PASSWORD } })
    expect(editor.ok()).toBe(true)
    const { rows: [{ id }] } = await pool.query('SELECT id FROM workshop_registrations WHERE reference = $1', [winner.reference])
    const path = '/api/workshop-registrations/' + id
    expect((await request.get(path)).ok()).toBe(true)
    expect((await request.patch(path, { data: { status: 'cancelled', participants: 6 } })).ok()).toBe(true)
    const record = await (await request.get(path)).json()
    expect(record).toMatchObject({ status: 'cancelled', participants: 2, sessionTitle: 'Concurrency fixture' })
    expect(await reserved()).toBe(1)
    expect((await saveWorkshopRegistration(payload, create())).confirmation).toBeDefined()
    expect(await reserved()).toBe(3)
  } finally {
    if (sessions.length) {
      await pool.query('DELETE FROM workshop_registrations WHERE session_id = ANY($1::int[])', [sessions])
      await pool.query('DELETE FROM workshop_sessions WHERE id = ANY($1::int[])', [sessions])
    }
    await pool.end()
  }
})

test('finds a workshop, recovers lost availability and confirms a fictional registration', async ({ page }, testInfo) => {
  const pool = isolatedPool()
  const ids: number[] = []
  try {
    const stamp = randomUUID().slice(0, 8)
    const first = `Test morning ${stamp}`
    const second = `Test afternoon ${stamp}`
    const full = `Test full ${stamp}`
    for (const title of [first, second, full]) {
      const { rows: [{ id, workshop_id: workshop }] } = await pool.query<{id: number; workshop_id: number}>(`
        INSERT INTO workshop_sessions (title, workshop_id, starts_at, ends_at, capacity, status)
        SELECT $1, id, now() + interval '2 days', now() + interval '2 days 1 hour', 2, 'open'
        FROM workshops WHERE slug = $2 RETURNING id, workshop_id
      `, [title, workshopSlug])
      ids.push(id)
      if (title === full) {
        const payload = { db: { pool } } as Payload
        expect((await saveWorkshopRegistration(payload, {
          workshop, session: id, participants: 2, name: 'Fictional Fixture',
          email: 'fixture@cookieshop.example', requestId: randomUUID(),
        })).confirmation).toBeDefined()
      }
    }
    await useOwnAddress(page, testInfo)
    // Keep this database and registration check independent of third-party widget responses.
    await page.route(url => url.origin !== new URL(BASE_URL).origin, route => route.abort())
    await page.goto('/workshops', { waitUntil: 'domcontentloaded' })
    await page.getByRole('link', { name: 'View available sessions for Cookie Baking Basics' }).press('Enter')
    await expect(page).toHaveURL(/cookie-baking-basics#workshop-registration$/)
    const section = page.locator('#workshop-registration')
    await expect(section.getByRole('radio', { name: new RegExp(full) })).toBeDisabled()
    await expect(section.getByText('Fully booked')).toBeVisible()
    await section.getByRole('radio', { name: new RegExp(first) }).press('Space')
    await section.getByLabel('Number of participants').selectOption('2')
    await section.getByLabel('Fictional full name').fill('Demo Baker')
    const email = section.getByLabel('Fictional email')
    await email.fill('baker@real.invalid')
    await section.getByRole('button', { name: 'Review registration' }).click()
    expect(await email.evaluate((element: HTMLInputElement) => element.validity.patternMismatch)).toBe(true)
    await email.fill('baker@cookieshop.example')
    await section.getByRole('button', { name: 'Review registration' }).press('Enter')
    await expect(section.getByRole('heading', { name: 'Review your registration' })).toBeFocused()
    await pool.query("UPDATE workshop_sessions SET status = 'closed' WHERE id = $1", [ids[0]])
    await section.getByRole('button', { name: 'Confirm demo registration' }).press('Enter')
    await expect(section.getByRole('alert')).toContainText('has closed')
    await expect(email).toHaveValue('baker@cookieshop.example')
    await section.getByRole('radio', { name: new RegExp(second) }).check()
    await section.getByLabel('Number of participants').selectOption('2')

    await page.getByRole('button', { name: 'Switch to dark mode' }).click()
    await page.getByRole('button', { name: 'Open accessibility settings' }).click()
    for (const name of ['Larger text', 'High contrast', 'Highlight links', 'Reduce motion', 'Larger cursor']) {
      await page.getByRole('switch', { name, exact: true }).click()
    }
    await page.keyboard.press('Escape')
    for (const width of [320, 375, 390, 430, 768, 1100, 1440]) {
      await page.setViewportSize({ width, height: 844 })
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    }
    await page.setViewportSize({ width: testInfo.project.name === 'phone-390' ? 320 : 1100, height: 844 })
    expect((await new AxeBuilder({ page }).include('#workshop-registration').analyze()).violations).toEqual([])
    await section.getByRole('button', { name: 'Review registration' }).press('Enter')
    await expect(section.getByRole('heading', { name: 'Review your registration' })).toBeFocused()
    await section.getByRole('button', { name: 'Confirm demo registration' }).press('Enter')
    await expect(section.getByRole('status')).toContainText(/Registration reference WS-[0-9A-F-]+/)
    const { rows } = await pool.query('SELECT reference, participants, status FROM workshop_registrations WHERE session_id = $1', [ids[1]])
    expect(rows).toHaveLength(1)
    expect(rows[0]).toMatchObject({ participants: '2', status: 'confirmed' })
    await expect(section.getByRole('status')).toContainText(rows[0].reference)
    await page.reload({ waitUntil: 'domcontentloaded' })
    await expect(section.getByRole('radio', { name: new RegExp(second) })).toBeDisabled()
    await expect(section.getByRole('status')).toHaveCount(0)
  } finally {
    if (ids.length) {
      await pool.query('DELETE FROM workshop_registrations WHERE session_id = ANY($1::int[])', [ids])
      await pool.query('DELETE FROM workshop_sessions WHERE id = ANY($1::int[])', [ids])
    }
    await pool.end()
  }
})
