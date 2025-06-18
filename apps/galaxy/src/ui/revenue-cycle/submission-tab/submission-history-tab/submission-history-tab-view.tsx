import React from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { SubmissionHistoryFilterForm } from './submission-history-filter-form'
import { SubmissionHistoryTable } from './submission-history-table'
import { SubmissionHistoryTablePagination } from './submission-history-table-pagination'

const SubmissionHistoryView = () => {
  return (
    <Flex direction="column">
      <SubmissionHistoryFilterForm />
      <Flex
        direction="column"
        mt="2"
        className="bg-white min-h-[calc(100vh-364px)]"
      >
        <SubmissionHistoryTable />
        <SubmissionHistoryTablePagination />
      </Flex>
    </Flex>
  )
}
export { SubmissionHistoryView }
