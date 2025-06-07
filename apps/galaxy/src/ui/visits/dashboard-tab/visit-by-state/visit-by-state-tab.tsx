'use client'

import { Box, Flex } from '@radix-ui/themes'
import { VisitByStateListFilterForm } from './visit-by-state-list-filter-form'
import { VisitByStateListTable } from './visit-by-state-list-table'
import { VisitByStateListTablePagination } from './visit-by-state-list-table-pagination'

const VisitByState = () => {
  return (
    <Flex
      gap="1"
      className="bg-pp-bg-accent flex-1 !overflow-hidden"
      direction="column"
    >
      <VisitByStateListFilterForm />
      <Flex direction="column" className="bg-white flex-1 !overflow-hidden">
        <VisitByStateListTable />
        {/*
          Todo for now removed pagination will be added later
          <VisitByStateListTablePagination />
         */}
      </Flex>
    </Flex>
  )
}

export { VisitByState }
