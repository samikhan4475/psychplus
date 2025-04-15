'use client'

import { Flex } from '@radix-ui/themes'
import { AutoHeader } from './auto-header'
import { AutoTextDataTable } from './auto-text-data-table'
import { AutoTextTablePagination } from './auto-text-table-pagination'
import { StoreProvider } from './store'

const AutoTextView = () => {
  return (
    <StoreProvider>
      <Flex direction="column" className="gap-0.5" p="1" height="100%">
        <AutoHeader />
        <Flex
          direction="column"
          height="100%"
          className="bg-white h-[calc(100dvh-308px)] rounded-1 shadow-2"
        >
          <AutoTextDataTable />
          <AutoTextTablePagination />
        </Flex>
      </Flex>
    </StoreProvider>
  )
}

export { AutoTextView }
