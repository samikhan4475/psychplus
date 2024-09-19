'use client'

import { Button, Flex } from '@radix-ui/themes'
import { SearchButton } from '../shared'
import { AddFiltersPopover } from './add-filters-popover'
import { useRoundingFiltersContext } from './context'

const FiltersActionGroup = () => {
  const { filters, setFilters } = useRoundingFiltersContext()
  return (
    <Flex align="center" className="flex-1 " gap="2">
      <AddFiltersPopover />
      <Button
        className="text-pp-text-primary-base text-[12px] font-[500]"
        type="button"
        variant="ghost"
        disabled={filters.length === 0}
        onClick={() => setFilters([])}
      >
        Hide Filters
      </Button>
      <Button variant="outline" color="gray" size="1">
        Clear
      </Button>
      <SearchButton />
    </Flex>
  )
}

export { FiltersActionGroup }
