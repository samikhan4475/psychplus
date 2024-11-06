'use client'

import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { ResponseHistoryFilterForm } from './response-history-filter-form'
import { ResponseHistoryListTable } from './response-history-table'
import { ResponseHistoryTablePagination } from './response-history-table-pagination'

const ResponseHistoryTabView = () => {
  return (
    <Flex direction="column" className="gap-0.5">
      <TabContentHeading title="Response History" />
      <Flex direction="column" gap="1" className="bg-white w-full py-1">
        <ResponseHistoryFilterForm />
        <ResponseHistoryListTable />
        <ResponseHistoryTablePagination />
      </Flex>
    </Flex>
  )
}

export { ResponseHistoryTabView }
