import type { Payload } from 'payload'
import { CAMPUS_CYCLE, MADE_UP_DATA_NOTICE } from '../content/campus-cycle'
import { richText } from './richText'

export const ADD_EXAMPLE_CONTENT = true

// Retained for the course starter's test fixtures.
export const NO_BLOB_STORE_MESSAGE =
  'Images cannot be stored: this Vercel project has no Blob store connected.'

export const PAGES = [
  {
    title: 'Cookie Shop',
    slug: 'home',
    intro: 'Cookie Shop is a fictional online cookie store created for our web development project.',
  },
  {
    title: 'About Cookie Shop',
    slug: 'about',
    intro: 'Meet the Cookie Shop student project and explore our cookie workshops.',
    body: richText([
      { paragraph: 'Cookie Shop is a fictional student project at Ghent University. Explore the cookie assortment, build a box or discover a cookie workshop.' },
      { paragraph: 'Orders and registrations are for demonstration. There are no payments or deliveries.' },
    ]),
  },
  {
    title: 'Contact',
    slug: 'contact',
    intro: 'Questions about the Cookie Shop student project or its cookie workshops?',
    body: richText([
      { paragraph: 'See the contact page for project information. Use fictional details for demo orders and workshop registrations.' },
      { paragraph: 'The address saved in Site facts is a fictional example. It does not receive mail.' },
    ]),
  },
  {
    title: 'Privacy',
    slug: 'privacy',
    intro: 'What this site keeps about you, why, who can see it and for how long.',
    body: richText([
      { heading: 'Demo orders' },
      { paragraph: 'A test order saves the name and e-mail address you enter, your selected cookies, quantities, total and order time. Project editors can see these records. Use fictional details.' },
      { heading: 'Browser storage and third-party services' },
      { paragraph: 'Your basket, saved box and display settings are saved in your browser. Vercel hosts the site and provides page analytics. The map loads after you request it. The support chat is provided by Watermelon. Avoid sharing personal details in the chat.' },
      { heading: 'A practice project' },
      { paragraph: MADE_UP_DATA_NOTICE },
    ]),
  },
]

export type SeedResult = { created: number; skipped: number }

// Existing records and relationships belong to editors. A rerun only fills missing pages and facts.
export async function seed(
  payload: Payload,
  _options: { env?: Record<string, string | undefined> } = {},
): Promise<SeedResult> {
  const result: SeedResult = { created: 0, skipped: 0 }
  for (const page of PAGES) {
    const existing = await payload.find({
      collection: 'pages',
      where: { slug: { equals: page.slug } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })
    if (existing.docs.length) {
      result.skipped += 1
    } else {
      await payload.create({ collection: 'pages', data: page, overrideAccess: true })
      result.created += 1
    }
  }

  const facts = await payload.findGlobal({ slug: 'site-facts', depth: 0, overrideAccess: true })
  if (facts.pricingRule) {
    result.skipped += 1
  } else {
    await payload.updateGlobal({
      slug: 'site-facts',
      data: { pricingRule: CAMPUS_CYCLE.pricingRule, place: CAMPUS_CYCLE.place, email: CAMPUS_CYCLE.email },
      overrideAccess: true,
    })
    result.created += 1
  }
  return result
}
