'use client'

import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { ClaimListFilterForm } from './claims-list-filter-form'
import { ClaimListTable } from './claims-list-table'
import { ClaimsListTablePagination } from './claims-list-table-pagination'

const ClaimTabView = () => {
  return (
    <Flex direction="column" className="relative gap-0.5" width="100%">
      <TabContentHeading title="Claims" />
      <ClaimListFilterForm />
      <Flex direction="column" className="bg-white w-full">
        <ClaimListTable />
        <ClaimsListTablePagination />
      </Flex>
    </Flex>
  )
}

export { ClaimTabView }
