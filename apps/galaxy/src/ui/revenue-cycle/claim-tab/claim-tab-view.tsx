'use client'

import { Flex, ScrollArea } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { ClaimListFilterForm } from './claims-list-filter-form'
import { ClaimListTable } from './claims-list-table'
import { ClaimsListTablePagination } from './claims-list-table-pagination'

const ClaimTabView = () => {
  return (
    <Flex direction="column" className="gap-0.5">
      <TabContentHeading title="Claims" />
      <ScrollArea>
        <Flex direction="column" gap="1" className="bg-white w-full py-1">
          <ClaimListFilterForm />
          <ClaimListTable />
          <ClaimsListTablePagination />
        </Flex>
      </ScrollArea>
    </Flex>
  )
}

export { ClaimTabView }
