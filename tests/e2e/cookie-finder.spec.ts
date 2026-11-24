import { expect, test } from '@playwright/test'

test('focuses the recommendation and links to its priced catalogue card', async ({ page, baseURL }) => {
  const origin = new URL(baseURL!).origin
  await page.route('**/*', route => {
    const sameOrigin = new URL(route.request().url()).origin === origin
    return sameOrigin ? route.continue() : route.abort()
  })
  await page.goto('/cookie-finder')
  for (const answer of [
    'Rich chocolate',
    'Something intensely chocolatey',
    'Chocolate brownie',
    'I always choose chocolate',
  ]) {
    await page.getByRole('button', { name: answer, exact: true }).press('Enter')
  }

  const result = page.getByRole('heading', { name: 'Double Chocolate', exact: true })
  await expect(result).toBeFocused()
  await expect(page.getByRole('button', { name: /Try Again/ })).toBeVisible()
  await page.getByRole('link', { name: /Explore Our Cookies/ }).click()
  await expect(page).toHaveURL(/\/cookies$/)
  const card = page.locator('#cookies').getByRole('listitem').filter({ has: result })
  await expect(card.getByText(/^€\s*3[,.]95$/)).toBeVisible()
})
