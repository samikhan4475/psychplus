'use client'

import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { DownloadEdiFilesButton } from './download-edi-files-button'
import { ImportEraButton } from './import-era-button'
import { ResponseHistoryFilterForm } from './response-history-filter-form'
import { ResponseHistoryListTable } from './response-history-table'
import { ResponseHistoryTablePagination } from './response-history-table-pagination'

const ResponseHistoryTabView = () => {
  return (
    <>
      <Flex direction="column" className="relative gap-0.5" width="100%">
        <TabContentHeading className="flex" title="Response History">
          <Flex gapX="3">
            <ImportEraButton />
            <DownloadEdiFilesButton />
          </Flex>
        </TabContentHeading>
      </Flex>
      <Flex direction="column" gap="1" className="bg-white w-full flex-1 py-1">
        <ResponseHistoryFilterForm />
        <ResponseHistoryListTable />
        <ResponseHistoryTablePagination />
      </Flex>
    </>
  )
}

export { ResponseHistoryTabView }
