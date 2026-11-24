
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function main() {
  const payload = await getPayload({ config })

  const topicSlug = 'chocolate-lovers'
  const workshopSlug = 'classic-chocolate-chip'

  const topics = await payload.find({
    collection: 'topics',
    where: { slug: { equals: topicSlug } },
    limit: 1,
  })

  const topic = topics.docs[0] ?? await payload.create({
    collection: 'topics',
    data: {
      name: 'Chocolate Lovers',
      slug: topicSlug,
      description: 'Workshops for chocolate cookie lovers.',
    },
  })

  const workshops = await payload.find({
    collection: 'workshops',
    where: { slug: { equals: workshopSlug } },
    limit: 1,
  })

  if (workshops.docs.length === 0) {
    await payload.create({
      collection: 'workshops',
      data: {
        title: 'Classic Chocolate Chip',
        slug: workshopSlug,
        level: 'beginner',
        day: 'Saturday',
        startTime: '10:00',
        price: 15,
        groupSize: 6,
        summary: 'Learn to bake classic chocolate chip cookies.',
        topics: [topic.id],
      },
    })
  }

  const demoWorkshops = [
    ['chocolate-cookie-masterclass', 'Chocolate Cookie Masterclass', 'chocolate-and-flavours', 'Chocolate & Flavours'],
    ['cookie-baking-basics', 'Cookie Baking Basics', 'baking-techniques', 'Baking Techniques'],
    ['cookie-decorating-workshop', 'Cookie Decorating Workshop', 'cookie-decoration', 'Cookie Decoration'],
    ['creative-cookie-workshop', 'Creative Cookie Workshop', 'cookie-decoration', 'Cookie Decoration'],
  ]

  for (const [slug, title, topicSlug, topicName] of demoWorkshops) {
    const { docs: [workshop] } = await payload.find({ collection: 'workshops', where: { slug: { equals: slug } }, limit: 1 })
    if (workshop) continue

    const { docs: [existingTopic] } = await payload.find({ collection: 'topics', where: { slug: { equals: topicSlug } }, limit: 1 })
    const topic = existingTopic ?? await payload.create({
      collection: 'topics',
      data: { slug: topicSlug, name: topicName, description: 'Fictional browser-check workshop topic.' },
    })
    await payload.create({
      collection: 'workshops',
      data: {
        slug, title, level: 'beginner', day: 'Saturday', startTime: '10:00', price: 15, groupSize: 6,
        summary: 'Fictional browser-check cookie workshop.',
        topics: [topic.id],
      },
    })
  }

  console.log('Cookie Shop browser-check fixtures are ready.')
  await payload.destroy()

  // Explicitly exit so GitHub Actions does not wait
  // for remaining database connections.
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
