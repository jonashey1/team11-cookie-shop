import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page, baseURL }) => {
  const origin = new URL(baseURL!).origin
  await page.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort())
})

test('loads the poster first and plays the commercial on explicit keyboard activation', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' })
  const requestedMedia: string[] = []
  page.on('request', request => {
    if (request.url().endsWith('.mp4')) requestedMedia.push(request.url())
  })
  const poster = page.waitForResponse(response => response.url().endsWith('/cookie-shop-commercial-poster.webp'))
  await page.goto('/')
  expect((await poster).ok()).toBe(true)
  const experience = page.getByRole('region', { name: 'More than just cookies.' })
  expect(await experience.evaluate(section => section.previousElementSibling?.classList.contains('boutique-hero'))).toBe(true)
  const player = experience.locator('video')
  const play = experience.getByRole('button', { name: 'Play commercial' })
  await expect(play).toBeVisible()
  await expect(player).toHaveAttribute('preload', 'none')
  expect(await player.getAttribute('src')).toBeNull()
  expect(requestedMedia).toHaveLength(0)
  const initial = await player.boundingBox()

  const media = page.waitForResponse(response => response.url().endsWith('/cookie-shop-commercial.mp4'))
  await play.press('Enter')
  expect((await media).ok()).toBe(true)
  await expect.poll(() => player.evaluate(element => (element as HTMLVideoElement).currentTime)).toBeGreaterThan(0)
  await expect(player).toBeFocused()
  expect(await player.evaluate(element => {
    const { controls, autoplay, loop } = element as HTMLVideoElement
    return [controls, autoplay, loop]
  })).toEqual([true, false, false])
  const playing = await player.boundingBox()
  expect(playing?.width).toBe(initial?.width)
  expect(playing?.height).toBe(initial?.height)

  await experience.getByText('Commercial transcript', { exact: true }).press('Enter')
  await expect(experience.getByText(/Fictional university project/)).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test('offers three direct, working discovery links without playing the commercial', async ({ page }) => {
  for (const [label, path] of [
    ['Find your perfect cookie.', '/cookie-finder'],
    ['Choose with confidence.', '/cookies#comparison'],
    ['Build your own box.', '/build-your-box'],
  ]) {
    await page.goto('/')
    const experience = page.getByRole('region', { name: 'More than just cookies.' })
    await experience.getByRole('link', { name: label }).press('Enter')
    await expect(page).toHaveURL(url => url.pathname + url.hash === path)
    if (path.includes('#')) await expect(page.locator('#comparison')).toBeAttached()
  }
})
