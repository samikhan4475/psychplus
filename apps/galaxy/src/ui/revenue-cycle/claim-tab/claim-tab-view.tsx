'use client'

import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { ClaimListFilterForm } from './claims-list-filter-form'
import { ClaimListTable } from './claims-list-table'
import { ClaimsListTablePagination } from './claims-list-table-pagination'

const ClaimTabView = () => {
  return (
    <>
      <Flex direction="column" className="relative gap-0.5" width="100%">
        <TabContentHeading title="Claims" />
        <ClaimListFilterForm />
      </Flex>
      <Flex
        gapY="2"
        direction="column"
        className="bg-white flex-1 !overflow-hidden"
      >
        <ClaimListTable />
        <ClaimsListTablePagination />
      </Flex>
    </>
  )
}

export { ClaimTabView }
