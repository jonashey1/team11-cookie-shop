import { expect, test } from '@playwright/test'

test('a fictional checkout preserves its basket on a network failure and prints a saved order', async ({ page, baseURL }) => {
  const origin = new URL(baseURL!).origin
  const host = new URL(baseURL!).hostname
  if (host !== '127.0.0.1' && host !== 'localhost') throw new Error('Signature checkout writes require a loopback test site.')
  let failFirst = true
  await page.route('**/*', route => {
    const request = route.request()
    if (new URL(request.url()).origin !== origin) return route.abort()
    if (request.method() === 'POST' && failFirst) {
      failFirst = false
      return route.abort()
    }
    return route.continue()
  })

  await page.goto('/clinics')
  const basket = page.getByRole('region', { name: /Review your basket/ })
  const placeOrder = page.getByRole('button', { name: 'Place test order' })
  await expect(basket).toContainText('Your basket is empty.')
  await expect(placeOrder).toBeDisabled()
  await page.getByRole('button', { name: 'Add one Classic Chocolate Chip', exact: true }).press('Enter')
  await page.getByRole('button', { name: 'Add one Salted Caramel', exact: true }).press('Enter')
  await basket.getByRole('button', { name: 'Increase basket quantity of Classic Chocolate Chip' }).press('Enter')
  await expect(basket).toContainText(/Total:.*10[.,]95/)
  await basket.getByRole('link', { name: 'Proceed to checkout' }).press('Enter')
  const name = page.getByLabel('Name (made-up)')
  const email = page.getByLabel('Email (made-up)')
  await name.fill('Fictional Signature Customer')
  await email.fill('signature-checkout@example.invalid')
  await placeOrder.press('Enter')
  await expect(page.locator('form').getByRole('alert')).toContainText('Order not confirmed.')
  await expect(page.locator('.cookie-order-celebration')).toHaveCount(0)
  // A failed order keeps the order page's address (the checkout link may add #customer-details).
  await expect(page).toHaveURL(/\/clinics(#[\w-]+)?$/)
  await expect(name).toHaveValue('Fictional Signature Customer')
  await expect(email).toHaveValue('signature-checkout@example.invalid')
  await expect(basket).toContainText(/Total:.*10[.,]95/)

  await placeOrder.press('Enter')
  const receipt = page.locator('.cookie-order-receipt')
  await expect(receipt.getByRole('heading', { name: 'Thank you for your order!' })).toBeVisible()
  await expect(receipt).toContainText('Your test order is saved.')
  // The address marks the saved order, so Vercel Analytics counts it as a page view.
  await expect(page).toHaveURL(/\/clinics\/confirmed$/)
  const celebration = receipt.locator('.cookie-order-celebration')
  await expect(celebration).toBeVisible()
  await expect(celebration).toHaveAttribute('aria-hidden', 'true')
  await expect(celebration.locator('.celebration-cookies')).toHaveCSS('animation-name', 'receipt-cookies')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(celebration.locator('.celebration-cookies')).toHaveCSS('animation-name', 'none')
  await expect(celebration).toBeVisible()
  await expect(receipt).toContainText('T11-S3F8')
  await expect(receipt).toContainText(/Total:.*10[.,]95/)
  await expect(receipt).not.toContainText('signature-checkout@example.invalid')
  await expect(receipt.getByRole('button', { name: 'Print or save as PDF' })).toBeVisible()
  await page.emulateMedia({ media: 'print' })
  await expect(receipt).toBeVisible()
  await expect(celebration).toBeHidden()
  await expect(page.locator('header').first()).toBeHidden()
  await expect(receipt.getByRole('button', { name: 'Print or save as PDF' })).toBeHidden()
})
