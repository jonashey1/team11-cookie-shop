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

  console.log('Cookie Shop browser-check fixtures are ready.')
  await payload.destroy()
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
