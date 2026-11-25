import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page, baseURL }) => {
  await page.route(url => url.origin !== new URL(baseURL!).origin, route => route.abort())
})

test('opens the global basket and keeps quantities and checkout synchronized', async ({ page }, testInfo) => {
  await page.goto('/cookies', { waitUntil: 'domcontentloaded' })
  const trigger = page.getByRole('button', { name: /^Open basket/ })
  const drawer = page.getByRole('dialog', { name: 'Your basket' })
  await trigger.press('Enter')
  await expect(drawer.getByRole('heading')).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(drawer.getByRole('button', { name: 'Close basket' })).toBeFocused()
  await expect(drawer).toContainText('Your basket is waiting for something sweet.')
  await expect(drawer.getByRole('link', { name: 'Proceed to checkout' })).toHaveCount(0)
  await page.keyboard.press('Escape')
  await expect(trigger).toBeFocused()
  await page.getByRole('button', { name: 'Add Classic Chocolate Chip to basket', exact: true }).first().click()
  await page.getByRole('button', { name: 'Add Double Chocolate to basket', exact: true }).first().click()
  await expect(page.getByTestId('basket-count')).toHaveText('2')
  await page.goto('/workshops/cookie-baking-basics', { waitUntil: 'domcontentloaded' })
  await expect(page.getByRole('heading', { name: 'Reserve your spot' })).toBeVisible()
  await page.reload({ waitUntil: 'domcontentloaded' })
  await trigger.click()
  await expect(drawer).toContainText('Classic Chocolate Chip × 1')
  await expect(drawer).toContainText(/Subtotal.*7[,.]45/)
  await drawer.getByRole('button', { name: 'Increase basket quantity of Classic Chocolate Chip' }).click()
  await expect(drawer).toContainText(/Subtotal.*10[,.]95/)
  await drawer.getByRole('button', { name: 'Decrease basket quantity of Classic Chocolate Chip' }).click()
  await drawer.getByRole('link', { name: 'Proceed to checkout' }).click()
  await expect(page).toHaveURL(/\/clinics#customer-details$/)
  await expect(drawer).toHaveCount(0)
  await expect(page.getByRole('region', { name: /Review your basket/ })).toContainText(/Total:.*7[,.]45/)
  await trigger.click()
  for (const name of ['Classic Chocolate Chip', 'Double Chocolate']) {
    await drawer.getByRole('button', { name: `Remove ${name} from basket` }).click()
  }
  await expect(drawer).toContainText('Your basket is waiting for something sweet.')
  await page.keyboard.press('Escape')
  await expect(trigger).toHaveAccessibleName('Open basket (0 items)')
  if (testInfo.project.name === 'phone-390') {
    await page.getByText('Browse Cookie Shop', { exact: true }).click()
    await expect(page.locator('header.excellence-header').getByRole('link', { name: 'Workshops', exact: true })).toBeVisible()
  }
})

test('keeps boxes grouped across refresh and makes the drawer usable with accessibility settings', async ({ page }) => {
  await page.goto('/clinics#build-your-box', { waitUntil: 'domcontentloaded' })
  const builder = page.getByRole('region', { name: 'Cookie box builder' })
  await builder.getByRole('button', { name: 'Chocolate Lovers' }).click()
  await builder.getByText('Personalise your box', { exact: true }).click()
  await builder.getByLabel('Name your box', { exact: false }).fill('Chocolate evening')
  await builder.getByLabel('Add a little message', { exact: false }).fill('Enjoy the treats')
  await builder.getByRole('button', { name: 'Add box to basket' }).click()
  await page.reload({ waitUntil: 'domcontentloaded' })
  await page.getByRole('button', { name: 'Switch to dark mode' }).click()
  await page.getByRole('button', { name: 'Open accessibility settings' }).click()
  for (const name of ['Larger text', 'High contrast', 'Highlight links', 'Reduce motion', 'Larger cursor']) {
    await page.getByRole('switch', { name, exact: true }).click()
  }
  await page.keyboard.press('Escape')
  const trigger = page.getByRole('button', { name: /^Open basket/ })
  await expect(trigger).toHaveAccessibleName('Open basket (1 item)')
  await trigger.click()
  const drawer = page.getByRole('dialog', { name: 'Your basket' })
  await expect(drawer).toContainText('Chocolate evening × 1')
  await expect(drawer).toContainText('Enjoy the treats')
  await expect(drawer.getByRole('list', { name: 'Cookies in box 1' }).getByRole('listitem')).toHaveCount(4)
  await drawer.getByRole('button', { name: 'Increase quantity of box 1' }).click()
  await expect(drawer).toContainText(/Subtotal.*29[,.]80/)
  await drawer.getByRole('button', { name: 'Decrease quantity of box 1' }).click()
  await expect(drawer).toContainText(/Subtotal.*14[,.]90/)
  for (const width of [320, 375, 390, 430, 768, 1100, 1440]) {
    await page.setViewportSize({ width, height: 844 })
    await expect.poll(() => drawer.evaluate((el, viewport) =>
      innerWidth === viewport && el.scrollWidth <= viewport && document.documentElement.scrollWidth <= viewport, width
    ), { message: `No horizontal overflow after resize to ${width}px` }).toBe(true)
    await expect(drawer.getByRole('link', { name: 'Proceed to checkout' })).toBeInViewport()
  }
  await page.setViewportSize({ width: 320, height: 740 })
  expect((await new AxeBuilder({ page }).include('.global-basket').analyze()).violations).toEqual([])
  await page.keyboard.press('Escape')
  await expect(trigger).toBeFocused()
  await expect(page).toHaveURL(/\/clinics#build-your-box$/)
  await trigger.press('Enter')
  await drawer.getByRole('link', { name: 'Proceed to checkout' }).press('Enter')
  await expect(page).toHaveURL(/\/clinics#customer-details$/)
  await expect(drawer).toHaveCount(0)
  await expect(page.getByRole('region', { name: /Review your basket/ })).toContainText('Chocolate evening × 1')
})

test('pauses Fortune Cookie while the native basket dialog is open', async ({ page }) => {
  await page.clock.install()
  await page.goto('/', { waitUntil: 'domcontentloaded' })
  await page.getByRole('button', { name: /^Open basket/ }).click()
  await page.clock.runFor(2100)
  await expect(page.getByRole('dialog', { name: 'Your basket' })).toBeVisible()
  await expect(page.locator('#fortune-popup-title')).toHaveCount(0)
  await page.keyboard.press('Escape')
  await page.clock.runFor(2100)
  await expect(page.getByRole('dialog', { name: 'Your fortune is waiting!' })).toBeVisible()
})
