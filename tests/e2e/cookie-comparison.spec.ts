import { expect, test } from '@playwright/test'
import { COOKIES } from '../../src/content/cookies'

const classic = COOKIES[0]
const double = COOKIES[1]

test.beforeEach(async ({ page, baseURL }, testInfo) => {
  const origin = new URL(baseURL!).origin
  await page.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort())
  if (testInfo.project.name === 'phone-390') await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' })
})

test('compares two or three cookies and adds to the existing basket', async ({ page }) => {
  const compare = (name: string) => page.getByRole('button', { name: `Compare ${name}`, exact: true })
  await page.goto('/clinics')
  await page.getByRole('button', { name: `Add one ${classic.name}` }).click()
  await page.goto('/workshops')
  const tray = page.getByRole('region', { name: 'Compare cookies' })
  await expect(tray.getByText('0/3 selected')).toBeVisible()
  await compare(classic.name).press('Enter')
  await expect(tray.getByRole('button', { name: 'Compare cookies', exact: true })).toBeDisabled()
  await compare(double.name).press('Enter')
  await expect(compare(double.name)).toHaveAttribute('aria-pressed', 'true')
  await tray.getByRole('link', { name: 'Compare cookies', exact: true }).press('Enter')
  await expect(page).toHaveURL(/\/compare$/)
  const table = page.getByRole('table')
  await expect(table.getByRole('columnheader').filter({ hasText: classic.name }).getByRole('img')).toBeVisible()
  await expect(table.getByRole('columnheader').filter({ hasText: double.name })).toContainText(/3[,.]95/)
  await expect(table.getByRole('columnheader').filter({ hasText: classic.name })).toContainText(/3[,.]50/)

  const selector = page.getByRole('combobox', { name: 'Add a cookie' })
  await selector.selectOption('5')
  await expect(selector).toBeDisabled()
  await expect(page.getByText('3/3 selected')).toBeVisible()
  await expect(table.getByText('· Differs').first()).toBeVisible()
  await page.getByRole('checkbox', { name: 'Highlight differences' }).uncheck()
  await expect(table.getByText('· Differs')).toHaveCount(0)
  await table.getByRole('button', { name: `Remove ${double.name} from comparison` }).click()
  await expect(table.getByText('Texture', { exact: true })).toBeVisible()
  await expect(table.getByText('Chocolate intensity', { exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Find your perfect match' })).toBeVisible()
  await page.reload()
  await expect(page.getByText('2/3 selected')).toBeVisible()
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  await table.getByRole('button', { name: `Add ${classic.name} to basket` }).click()
  await table.getByRole('button', { name: 'Add Salted Caramel to basket' }).click()
  await expect(page.getByRole('status')).toContainText('Salted Caramel added to your basket.')
  await page.getByRole('button', { name: 'Clear all' }).click()
  await expect(page.getByText(/Your comparison is empty/)).toBeVisible()
  await page.getByRole('link', { name: 'Go to order' }).click()
  await expect(page.getByRole('region', { name: /Review your basket/ })).toContainText('Classic Chocolate Chip × 2')
  await expect(page.getByRole('region', { name: /Review your basket/ })).toContainText('Salted Caramel × 1')
  await expect(page.getByRole('region', { name: /Review your basket/ })).toContainText(/10[,.]95/)
})

test('Finder starts a comparison and the catalogue rejects a fourth cookie', async ({ page }) => {
  await page.goto('/cookie-finder')
  for (const answer of ['Rich chocolate', 'Something intensely chocolatey', 'Chocolate brownie', 'I always choose chocolate']) {
    await page.getByRole('button', { name: answer, exact: true }).press('Enter')
  }
  await expect(page.getByRole('heading', { name: double.name, exact: true })).toBeFocused()
  await page.getByRole('button', { name: 'Compare this cookie' }).click()
  await page.getByRole('link', { name: 'Choose another cookie to compare' }).click()
  await expect(page.getByRole('button', { name: `Compare ${double.name}`, exact: true })).toHaveAttribute('aria-pressed', 'true')
  await page.getByRole('button', { name: `Compare ${classic.name}`, exact: true }).click()
  await page.getByRole('button', { name: 'Compare White Chocolate', exact: true }).click()
  await page.getByRole('button', { name: 'Compare Red Velvet', exact: true }).click()
  await expect(page.getByRole('region', { name: 'Compare cookies' }).getByRole('status')).toContainText('You can compare up to three cookies')
  await expect(page.getByRole('button', { name: 'Compare Red Velvet', exact: true })).toHaveAttribute('aria-pressed', 'false')
})