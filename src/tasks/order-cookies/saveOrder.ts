'use server'

import { headers } from 'next/headers'
import { getPayload } from 'payload'
import { COOKIES } from '@/content/cookies'
import config from '@/payload.config'

export type OrderResult =
  | { success: true; orderName: string }
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

    if (!/^[0-9a-f-]{36}$/i.test(requestId)) {
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

    const items = []
    let totalCents = 0

    for (const item of submittedItems) {
      if (
        typeof item !== 'object' ||
        item === null ||
        !('cookieId' in item) ||
        !('quantity' in item)
      ) {
        return { success: false, message: 'Invalid cookie selection.' }
      }

      const cookie = COOKIES.find(
        (product) => product.id === Number(item.cookieId),
      )
      const quantity = Number(item.quantity)

      if (
        !cookie ||
        !Number.isInteger(quantity) ||
        quantity < 1 ||
        quantity > 20
      ) {
        return { success: false, message: 'Invalid cookie quantity.' }
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

    const existing = await payload.find({
      collection: 'orders',
      where: { requestId: { equals: requestId } },
      limit: 1,
      overrideAccess: true,
    })

    if (existing.docs.length > 0) {
      return {
        success: true,
        orderName: String(existing.docs[0].name),
      }
    }

    const orderName = `Cookie order T11-S3F8 - ${requestId}`

    await payload.create({
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

    const requestHeaders = await headers()
    void requestHeaders

    return { success: true, orderName }
  } catch {
    return {
      success: false,
      message: 'Something went wrong. Please try again.',
    }
  }
}
