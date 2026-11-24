import { expect, test } from '@playwright/test'

test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } })

test('keeps Finder progress and three-cookie comparison usable by touch', async ({ page }) => {
  await page.goto('/cookie-finder')
  const answer = page.getByRole('button', { name: 'Rich chocolate', exact: true })
  await answer.tap()
  const next = page.locator('.excellence-question h2')
  await expect(next).toBeFocused()
  await expect(page.getByRole('progressbar', { name: 'Quiz progress' })).toHaveAttribute('aria-valuenow', '25')

  await page.goto('/cookies')
  for (const name of ['Classic Chocolate Chip', 'Double Chocolate', 'White Chocolate']) {
    await page.getByRole('button', { name: 'Compare ' + name, exact: true }).tap()
  }
  await page.getByRole('region', { name: 'Compare cookies' }).getByRole('link', { name: 'Compare cookies', exact: true }).tap()
  const scroll = page.getByRole('region', { name: 'Cookie characteristics' })
  await expect(page.getByText('Swipe sideways to see every selected cookie.')).toBeVisible()
  await expect(scroll.locator('tbody th')).toHaveCount(7)
  expect(await scroll.evaluate(element => {
    element.scrollLeft = element.scrollWidth
    return element.scrollLeft > 0 && document.documentElement.scrollWidth <= window.innerWidth
  })).toBe(true)
})
