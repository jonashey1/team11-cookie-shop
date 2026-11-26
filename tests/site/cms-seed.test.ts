import type { Payload } from 'payload'
import { describe, expect, it, vi } from 'vitest'
import { seed } from '../../src/seed/seed'

describe('Cookie Shop CMS setup', () => {
  it('fills an empty database with site pages and fictional site facts only', async () => {
    const find = vi.fn().mockResolvedValue({ docs: [] })
    const create = vi.fn()
    const findGlobal = vi.fn().mockResolvedValue({})
    const updateGlobal = vi.fn()
    const result = await seed({ find, create, findGlobal, updateGlobal } as unknown as Payload)

    expect(result).toEqual({ created: 5, skipped: 0 })
    expect(create.mock.calls.map(([input]) => [input.collection, input.data.slug, input.data.title])).toEqual([
      ['pages', 'home', 'Cookie Shop'],
      ['pages', 'about', 'About Cookie Shop'],
      ['pages', 'contact', 'Contact'],
      ['pages', 'privacy', 'Privacy'],
    ])
    expect(updateGlobal).toHaveBeenCalledExactlyOnceWith({
      slug: 'site-facts',
      data: {
        pricingRule: 'Workshop prices are listed on each workshop page.',
        place: 'Cookie Shop, Ghent',
        email: 'hello@cookieshop.example',
      },
      overrideAccess: true,
    })
  })

  it('leaves existing pages and site facts untouched', async () => {
    const find = vi.fn().mockResolvedValue({ docs: [{ id: 1 }] })
    const create = vi.fn()
    const findGlobal = vi.fn().mockResolvedValue({ pricingRule: 'An editor’s saved value' })
    const updateGlobal = vi.fn()
    const result = await seed({ find, create, findGlobal, updateGlobal } as unknown as Payload)

    expect(result).toEqual({ created: 0, skipped: 5 })
    expect(create).not.toHaveBeenCalled()
    expect(updateGlobal).not.toHaveBeenCalled()
  })
})
