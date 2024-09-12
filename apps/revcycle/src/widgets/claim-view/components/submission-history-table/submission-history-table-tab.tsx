'use client'

import { Flex } from '@radix-ui/themes'
import { SubmissionHistoryTable } from './submission-history-table'

const SubmissionHistoryTableTab = () => {
  return (
    <Flex direction="column" className="h-fit p-2">
      <SubmissionHistoryTable />
    </Flex>
  )
}

export { SubmissionHistoryTableTab }
