import React from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { SubmissionHistoryFilterForm } from './submission-history-filter-form'
import { SubmissionHistoryTable } from './submission-history-table'
import { SubmissionHistoryTablePagination } from './submission-history-table-pagination'

const SubmissionHistoryView = () => {
  return (
    <Flex direction={'column'}>
      <SubmissionHistoryFilterForm />
      <Flex direction="column" mt="2" className="bg-white flex-1 ">
        <Box className="flex-1 overflow-auto">
          <SubmissionHistoryTable />
        </Box>
        <SubmissionHistoryTablePagination />
      </Flex>
    </Flex>
  )
}
export { SubmissionHistoryView }
