'use client'

import { Flex } from '@radix-ui/themes'
import { ExperienceHeader } from './experience-header.tsx'
import { ExperienceTablePagination } from './experience-table-pagination.tsx'
import { ExperienceTable } from './experience-table.tsx'
import { ExperienceFilterForm } from './filter-form'
import { StoreProvider } from './store'

const ExperienceView = () => {
  return (
    <StoreProvider>
      <Flex
        gap="1"
        className="bg-pp-bg-accent flex-1 !overflow-hidden"
        direction="column"
      >
        <ExperienceHeader />
        <ExperienceFilterForm />
        <ExperienceTable />
        <ExperienceTablePagination />
      </Flex>
    </StoreProvider>
  )
}

export { ExperienceView }
