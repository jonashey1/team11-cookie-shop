import { CAMPUS_CYCLE } from '@/content/campus-cycle'

// Keep the original starter records available to editors without showing them in Cookie Shop.
export const starterWorkshopSlugs = CAMPUS_CYCLE.workshops.map(workshop => workshop.slug)
export const starterWorkshopTopicSlugs = CAMPUS_CYCLE.topics.map(topic => topic.slug)
