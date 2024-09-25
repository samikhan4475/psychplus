import { useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { FilterChip } from '../shared'
import { LIST_VIEW_TABLE_FILTERS, TableFilters } from './constants'

const FiltersList = [
  TableFilters.All,
  TableFilters.Timed,
  TableFilters.Untimed,
  TableFilters.Intake,
  TableFilters.CSS,
  TableFilters.RevCycle,
  TableFilters.Provider,
  TableFilters.BA,
]

const TableFiltersGroup = () => {
  const [activeFilter, setActiveFilter] = useState<string>(TableFilters.All)
  return (
    <Flex gap="2" align="center">
      {FiltersList.map((filter) => (
        <FilterChip
          key={filter}
          value={activeFilter}
          setValue={setActiveFilter}
          filter={filter}
          filtersList={LIST_VIEW_TABLE_FILTERS}
        />
      ))}
    </Flex>
  )
}

export { TableFiltersGroup }
