import { expect, test } from '@playwright/test'
import { COOKIES } from '../../src/content/cookies'
import { starterWorkshopSlugs, starterWorkshopTopicSlugs } from '../../src/lib/public-workshop-content'
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

test('redirects the retired example clinic URL to the cookie ordering page', async ({ page }) => {
  await page.goto('/clinics/saturday-repair-clinic')
  await expect(page).toHaveURL(/\/clinics$/)
  await expect(page.getByRole('heading', { name: '1. Choose your cookies' })).toBeVisible()
})

test('redirects former standalone experiences to their accessible sections', async ({ page }) => {
  for (const [from, to] of [
    ['/compare', '/cookies#compare-cookies'],
    ['/faq', '/contact#faq'],
    ['/fortune-cookie', '/about#fortune-cookie'],
  ]) {
    await page.goto(from)
    await expect.poll(() => new URL(page.url()).pathname + new URL(page.url()).hash).toBe(to)
    await expect(page.locator(to.slice(to.indexOf('#')))).toBeVisible()
    await expect(page.locator('main h1')).toHaveCount(1)
  }
})

test('renders the CMS cookie price and blocks public changes', async ({ page, request, baseURL }) => {
  if (!['127.0.0.1', 'localhost'].includes(new URL(baseURL!).hostname)) throw new Error('Isolated CMS fixture required.')
  const response = await request.get('/api/cookies?sort=productId&limit=10')
  expect(response.ok()).toBe(true)
  const { docs } = await response.json()
  expect(docs.map((cookie: { productId: number }) => cookie.productId)).toEqual([1, 2, 3, 4, 5, 6])
  const item = docs[0]
  const guest = await request.patch('/api/cookies/' + item.id, { data: { price: 999 } })
  expect([401, 403]).toContain(guest.status())
  const editor = await request.post('/api/users/login', {
    data: { email: process.env.FIRST_ADMIN_EMAIL, password: process.env.FIRST_ADMIN_PASSWORD },
  })
  expect(editor.ok()).toBe(true)
  const { token } = await editor.json()
  const headers = { Authorization: 'JWT ' + token }
  const patch = async (price: number) => request.patch('/api/cookies/' + item.id, { headers, data: { price } })
  try {
    expect((await patch(425)).ok()).toBe(true)
    await page.goto('/cookies')
    await expect(page.locator('#cookie-1')).toContainText(/4[,.]25/)
    await page.goto('/clinics')
    await page.getByRole('button', { name: 'Add one Classic Chocolate Chip', exact: true }).click()
    await expect(page.getByRole('region', { name: /Review your basket/ })).toContainText(/4[,.]25/)
    await page.getByLabel('Name (made-up)').fill('Fictional catalogue customer')
    const email = 'catalogue-' + Date.now() + '@example.invalid'
    await page.getByLabel('Email (made-up)').fill(email)
    expect((await patch(item.price)).ok()).toBe(true)
    await page.getByRole('button', { name: 'Place test order' }).click()
    await expect(page.locator('form').getByRole('alert')).toContainText('A price changed.')
    await expect(page.getByRole('region', { name: /Review your basket/ })).toContainText(/4[,.]25/)

    expect((await patch(425)).ok()).toBe(true)
    const action = page.waitForRequest(r => r.method() === 'POST' && Boolean(r.headers()['next-action']))
    await page.getByRole('button', { name: 'Place test order' }).click()
    const savedRequest = await action
    await expect(page.locator('.cookie-order-receipt')).toContainText(/4[,.]25/)
    expect((await patch(item.price)).ok()).toBe(true)
    const replay = await request.post(savedRequest.url(), {
      headers: {
        'next-action': savedRequest.headers()['next-action'],
        'content-type': savedRequest.headers()['content-type'],
      },
      data: savedRequest.postDataBuffer()!,
    })
    expect(replay.ok()).toBe(true)
    const orders = await request.get('/api/orders?where[email][equals]=' + encodeURIComponent(email), { headers })
    expect(orders.ok()).toBe(true)
    const persisted = await orders.json()
    expect(persisted.totalDocs).toBe(1)
    expect(persisted.docs[0].totalCents).toBe(425)
    expect(persisted.docs[0].items[0].unitPriceCents).toBe(425)
    expect(await replay.text()).toContain(persisted.docs[0].requestId)
  } finally {
    expect((await patch(item.price)).ok()).toBe(true)
  }
})

test('public CMS reads keep current content and exclude known starter examples', async ({ request }) => {
  for (const [collection, field, hidden, kept] of [
    ['pages', 'slug', ['home', 'about'], 'privacy'],
    ['clinics', 'slug', ['saturday-repair-clinic'], undefined],
    ['repairs', 'name', ['Full service', 'Each small repair', 'Check'], undefined],
    ['workshops', 'slug', starterWorkshopSlugs, 'cookie-baking-basics'],
    ['topics', 'slug', starterWorkshopTopicSlugs, 'baking-techniques'],
  ] as const) {
    const response = await request.get('/api/' + collection + '?limit=100&depth=0')
    expect(response.ok()).toBe(true)
    const { docs } = await response.json()
    const values = docs.map((doc: Record<string, string>) => doc[field])
    for (const value of hidden) expect(values).not.toContain(value)
    if (kept) expect(values).toContain(kept)
  }
  expect((await request.get('/api/globals/site-facts')).status()).toBe(403)
})
