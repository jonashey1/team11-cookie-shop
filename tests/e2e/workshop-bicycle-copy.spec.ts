import { expect, test } from '@playwright/test'

test('cookie workshop details omit the legacy site-wide bicycle pricing notice', async ({ page }) => {
  await page.goto('/workshops/classic-chocolate-chip')
  await expect(page.getByRole('heading', {name: 'At a glance'})).toBeVisible()
  await expect(page.getByText('This workshop is a demonstration for a fictional university project.')).toBeVisible()
  await expect(page.getByRole('main')).not.toContainText(/per bicycle|bring your own parts|tools, a tutor and standard parts/i)
})
