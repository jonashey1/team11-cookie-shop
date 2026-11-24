'use server'

import { getPayload } from 'payload'
import { COOKIES, isCookieId, type CookieId } from '@/content/cookies'
import { getCookieCatalogue } from '@/lib/cookie-catalogue'
import type { Order } from '@/payload-types'
import config from '@/payload.config'

export type OrderReceipt = Pick<Order, 'name' | 'items' | 'totalCents' | 'createdAt'>

function receiptFrom({ name, items, totalCents, createdAt }: Order): OrderReceipt {
  return { name, items, totalCents, createdAt }
}

export type OrderResult =
  | { success: true; orderName: string; receipt: OrderReceipt }
  | { success: false; message: string }

export async function saveOrder(formData: FormData): Promise<OrderResult> {
  try {
    const customerName = String(formData.get('customerName') ?? '').trim()
    const email = String(formData.get('email') ?? '').trim().toLowerCase()
    const requestId = String(formData.get('requestId') ?? '').trim()
    const rawItems = String(formData.get('items') ?? '')

    if (customerName.length < 2 || customerName.length > 100) {
      return { success: false, message: 'Enter a valid name.' }
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return { success: false, message: 'Enter a valid email address.' }
    }

    if (!/^[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(requestId)) {
      return { success: false, message: 'Please reload the page and try again.' }
    }

    let submittedItems: unknown

    try {
      submittedItems = JSON.parse(rawItems)
    } catch {
      return { success: false, message: 'Your shopping cart is invalid.' }
    }

    if (!Array.isArray(submittedItems) || submittedItems.length === 0) {
      return { success: false, message: 'Your shopping cart is empty.' }
    }

    if (submittedItems.length > COOKIES.length) {
      return { success: false, message: 'Invalid cookie selection.' }
    }

    // First check the shape of every line without the database: a broken request is refused before
    // anything is read. The catalogue numbers 1 to 6 are fixed, so the code knows them.
    const lines: { cookieId: CookieId; quantity: number }[] = []
    const cookieIds = new Set<number>()

    for (const item of submittedItems) {
      if (
        typeof item !== 'object' ||
        item === null ||
        !('cookieId' in item) ||
        !('quantity' in item) ||
        typeof item.cookieId !== 'number' ||
        typeof item.quantity !== 'number'
      ) {
        return { success: false, message: 'Invalid cookie selection.' }
      }

      const cookieId = item.cookieId
      const quantity = item.quantity

      if (
        !isCookieId(cookieId) ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 20
      ) {
        return { success: false, message: 'Invalid cookie quantity.' }
      }

      if (cookieIds.has(cookieId)) {
        return { success: false, message: 'Include each cookie only once in your shopping cart.' }
      }
      cookieIds.add(cookieId)
      lines.push({ cookieId, quantity })
    }

    // Then the names and prices from the cookies collection, never from the browser: the price an
    // editor set in /admin is what the order pays.
    const catalogue = await getCookieCatalogue()
    const items: Order['items'] = []
    let totalCents = 0

    for (const { cookieId, quantity } of lines) {
      const cookie = catalogue.find((product) => product.id === cookieId)
      if (!cookie) {
        return { success: false, message: 'This cookie is no longer available.' }
      }
      totalCents += cookie.price * quantity
      items.push({
        cookieId: cookie.id,
        cookieName: cookie.name,
        quantity,
        unitPriceCents: cookie.price,
      })
    }

    if (totalCents > 100000) {
      return { success: false, message: 'The maximum order value is €1,000.' }
    }

    const payload = await getPayload({ config })

    async function savedOrder(): Promise<OrderResult | undefined> {
      const { docs: [existing] } = await payload.find({
        collection: 'orders',
        where: { requestId: { equals: requestId } },
        limit: 1,
        depth: 0,
        overrideAccess: true,
      })
      if (!existing) return undefined

      const sameItems = existing.items.length === items.length && items.every(item =>
        existing.items.some(saved => saved.cookieId === item.cookieId && saved.quantity === item.quantity),
      )
      if (existing.customerName !== customerName || existing.email !== email || !sameItems) {
        return { success: false, message: 'This order reference was already used with different details.' }
      }
      return { success: true, orderName: existing.name, receipt: receiptFrom(existing) }
    }

    const existing = await savedOrder()
    if (existing) return existing

    const orderName = `Cookie order T11-S3F8 - ${requestId}`

    try {
      const order = await payload.create({
        collection: 'orders',
        overrideAccess: true,
        data: {
          name: orderName,
          requestId,
          customerName,
          email,
          items,
          totalCents,
          status: 'new',
        },
      })
      return { success: true, orderName: order.name, receipt: receiptFrom(order) }
    } catch (error) {
      // A simultaneous retry may have saved the order first. Confirm only a record we can read.
      const saved = await savedOrder()
      if (saved) return saved
      throw error
    }

  } catch {
    return {
      success: false,
      message: 'Something went wrong. Please try again.',
    }
  }
}
