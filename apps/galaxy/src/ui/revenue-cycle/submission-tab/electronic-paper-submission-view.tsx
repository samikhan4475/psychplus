import React from 'react'
import { Flex } from '@radix-ui/themes'
import { FilterForm } from './submission-filter-form'
import { SubmissionTable } from './submission-table'
import { SubmissionTablePagination } from './submission-table-pagination'

const ElectronicPaperSubmissionView = () => {
  return (
    <Flex direction="column">
      <FilterForm />
      <Flex
        direction="column"
        mt="2"
        className="bg-white min-h-[calc(100vh-364px)]"
      >
        <SubmissionTable />
        <SubmissionTablePagination />
      </Flex>
    </Flex>
  )
}
export { ElectronicPaperSubmissionView }
