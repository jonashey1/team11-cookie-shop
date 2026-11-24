import { expect, test } from '@playwright/test'
import { COOKIES } from '../../src/content/cookies'
import { cookieImage } from '../../src/lib/workshop-image'

test('puts the assortment before the Taste Map and preserves old flavour URLs', async ({ page }) => {
  await page.goto('/workshops#cookie-1')
  await expect(page).toHaveURL(/\/cookies#cookie-1$/)
  const shortcuts = page.getByRole('navigation', { name: 'Jump to a cookie flavour' })
  await expect(shortcuts.getByRole('link')).toHaveCount(6)
  for (const cookie of COOKIES) {
    await shortcuts.getByRole('link', { name: cookie.name, exact: true }).press('Enter')
    await expect(page.locator('#cookie-' + cookie.id)).toBeFocused()
  }
  await expect(page.locator('.boutique-assortment > li')).toHaveCount(6)
  expect(await page.locator('.boutique-assortment').evaluate(list => Boolean(list.compareDocumentPosition(document.querySelector('#taste-map')!) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true)
  const map = page.getByRole('region', { name: 'Taste Map' })
  await map.getByRole('group', { name: 'Flavour map' }).getByRole('button', { name: 'Red Velvet' }).press('Enter')
  await expect(map.getByRole('img')).toHaveCSS('object-fit', 'contain')
  await expect(map.getByRole('link', { name: 'View in assortment' })).toHaveAttribute('href', '/cookies#cookie-4')
})

test('shows the six approved ordering images and empty checkout examples', async ({ page }) => {
  await page.goto('/clinics')
  for (const cookie of COOKIES) {
    const card = page.locator('.boutique-order-choice').filter({ has: page.getByRole('heading', { name: cookie.name, exact: true }) })
    const img = card.getByRole('img')
    await expect(img).toHaveAttribute('alt', cookieImage(cookie.name)!.alt)
    expect(decodeURIComponent((await img.getAttribute('src'))!)).toContain(cookieImage(cookie.name)!.src)
    await expect(card.getByRole('button', { name: 'Add one ' + cookie.name, exact: true })).toBeEnabled()
  }
  for (const [label, example] of [['Name (made-up)', 'Example: Jan'], ['Email (made-up)', 'example@email.com']]) {
    const field = page.getByLabel(label)
    await expect(field).toHaveAttribute('placeholder', example)
    await expect(field).toHaveValue('')
  }
})

test('shows the campus address before a user opts into the map provider', async ({ page }) => {
  let requests = 0
  await page.route('https://www.openstreetmap.org/**', route => {
    requests += 1
    return route.fulfill({ body: 'Map provider placeholder for the regression check' })
  })
  await page.goto('/contact')
  const campus = page.getByRole('region', { name: 'Find Our University Campus' })
  await campus.scrollIntoViewIfNeeded()
  await expect(campus).toContainText('Tweekerkenstraat 2, 9000 Ghent')
  await expect(campus.locator('iframe')).toHaveCount(0)
  expect(requests).toBe(0)
  await expect(campus.getByRole('link', { name: /on OpenStreetMap/ })).toHaveAttribute('href', /mlat=51\.0427465&mlon=3\.7274096/)
  const toggle = campus.getByRole('button', { name: 'Show OpenStreetMap' })
  await toggle.press('Enter')
  const map = campus.locator('iframe')
  await expect(map).toHaveAttribute('src', /marker=51\.0427465%2C3\.7274096/)
  await expect(map).toHaveAttribute('loading', 'lazy')
  await map.scrollIntoViewIfNeeded()
  await expect.poll(() => requests).toBe(1)
  await toggle.press('Enter')
  await expect(map).toHaveCount(0)
})

test('lists the four workshop detail routes with their three related topics', async ({ page }) => {
  await page.goto('/workshops')
  const overview = page.getByRole('region', { name: 'Explore the workshops' })
  await expect(page.getByRole('heading', { level: 1, name: 'Cookie Workshops' })).toBeVisible()
  await expect(page.locator('#taste-map, .boutique-assortment')).toHaveCount(0)

  for (const [slug, topic] of [
    ['chocolate-cookie-masterclass', 'chocolate-and-flavours'],
    ['cookie-baking-basics', 'baking-techniques'],
    ['cookie-decorating-workshop', 'cookie-decoration'],
    ['creative-cookie-workshop', 'cookie-decoration'],
  ]) {
    const detailHref = '/workshops/' + slug
    const topicHref = '/topics/' + topic
    await overview.locator('a[href="' + detailHref + '"]').press('Enter')
    await expect(page).toHaveURL(new RegExp(detailHref + '$'))
    await expect(page.locator('main h1')).toBeVisible()
    await page.locator('main a[href="' + topicHref + '"]').first().press('Enter')
    await expect(page).toHaveURL(new RegExp(topicHref + '$'))
    await expect(page.locator('main a[href="' + detailHref + '"]')).toBeVisible()
    await page.goto('/workshops')
  }
})
