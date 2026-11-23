
import type { CourseCheckConfig } from '@/lib/courseCheck'

export const courseCheckConfig: CourseCheckConfig = {
  transactional: {
    collection: 'orders',
    nameField: 'name',
  },
}
