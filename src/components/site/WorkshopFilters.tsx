
import type { Topic } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select'
import { levelLabel } from '@/lib/format'
import { LEVELS, type Filters } from '@/tasks/find-workshop/filters'
import { ButtonLink } from './ButtonLink'

type WorkshopFiltersProps = {
  topics: Pick<Topic, 'id' | 'name' | 'slug'>[]
  filters: Pick<Filters, 'topic' | 'level'>
}

export function WorkshopFilters({ topics, filters }: WorkshopFiltersProps) {
  const filtered = Boolean(filters.topic || filters.level)

  return (
    <form
      method="get"
      action="/workshops#results"
      aria-label="Filter the cookies"
      className="grid gap-5 rounded-panel bg-blue-tint p-5 sm:p-6 md:grid-cols-[1fr_1fr_auto] md:items-end"
    >
      <div className="grid gap-2">
        <label htmlFor="filter-topic" className="text-sm font-medium">
          Topic
        </label>
        <NativeSelect id="filter-topic" name="topic" defaultValue={filters.topic ?? ''}>
          <NativeSelectOption value="">All topics</NativeSelectOption>
          {topics.map((topic) => (
            <NativeSelectOption key={topic.id} value={topic.slug}>
              {topic.name}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>

      <div className="grid gap-2">
        <label htmlFor="filter-level" className="text-sm font-medium">
          Level
        </label>
        <NativeSelect id="filter-level" name="level" defaultValue={filters.level ?? ''}>
          <NativeSelectOption value="">All levels</NativeSelectOption>
          {LEVELS.map((level) => (
            <NativeSelectOption key={level} value={level}>
              {levelLabel(level)}
            </NativeSelectOption>
          ))}
        </NativeSelect>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit">Apply filters</Button>
        {filtered && (
          <ButtonLink href="/workshops" variant="secondary">
            Clear filters
          </ButtonLink>
        )}
      </div>
    </form>
  )
}
