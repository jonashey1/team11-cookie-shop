import { expect, test } from '@playwright/test'

test('connects the Passport to the Taste Map and the shared comparison', async ({ page }) => {
  await page.goto('/cookie-finder')
  for (const answer of ['Rich chocolate', 'Something intensely chocolatey', 'Chocolate brownie', 'I always choose chocolate']) {
    await page.getByRole('button', { name: answer, exact: true }).press('Enter')
  }
  await expect(page.getByText('The Chocolate Lover')).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Double Chocolate' })).toBeFocused()
  await expect(page.locator('.experience-passport-preferences')).toContainText('Chocolate brownie')
  await page.getByRole('link', { name: 'Explore the Taste Map' }).press('Enter')
  const map = page.getByRole('region', { name: 'Taste Map' })
  const markers = map.getByRole('group', { name: 'Flavour map' })
  await expect(markers.getByRole('button')).toHaveCount(6)
  for (const name of ['Double Chocolate', 'Red Velvet', 'White Chocolate', 'Salted Caramel']) {
    await markers.getByRole('button', { name, exact: true }).press('Enter')
    await map.getByRole('button', { name: 'Compare ' + name, exact: true }).press('Enter')
  }
  const tray = page.getByRole('region', { name: 'Compare cookies' })
  await expect(tray).toContainText('3/3 selected')
  await expect(tray.getByRole('status')).toContainText('You can compare up to three cookies')
})

test('keeps personalisation local and saves or restores exactly four cookies', async ({ page }) => {
  await page.goto('/build-your-box')
  await page.getByRole('button', { name: 'Chocolate Lovers' }).press('Enter')
  await page.getByText('Personalise your box', { exact: true }).press('Enter')
  await page.getByLabel(/Name your box/).fill('Weekend favourites')
  await page.getByLabel(/Add a little message/).fill('<b>Sweet!</b>')
  const giftCard = page.locator('.experience-gift-card')
  await expect(giftCard).toBeVisible()
  await expect(giftCard).toHaveText('<b>Sweet!</b>')
  await expect(giftCard.locator('b')).toHaveCount(0)
  await page.getByRole('button', { name: 'Save combination' }).press('Enter')
  await page.reload()
  await page.getByRole('button', { name: 'Restore saved combination' }).press('Enter')
  await expect(page.getByText('4 of 4 selected')).toBeVisible()
  await expect(page.getByText(/Total:.*14[.,]90/)).toBeVisible()
  await page.getByRole('button', { name: 'Restore saved combination' }).press('Enter')
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.getByRole('button', { name: 'Keep my selection' }).press('Enter')
  await page.getByRole('button', { name: 'Remove saved combination' }).press('Enter')
  await expect(page.getByRole('button', { name: 'Restore saved combination' })).toHaveCount(0)
})
