'use client'

import { Box, Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { AddProfessionalClaimDialog } from './add-professional-claim'
import { ClaimListFilterForm } from './claims-list-filter-form'
import { ClaimListTable } from './claims-list-table'
import { ClaimsListTablePagination } from './claims-list-table-pagination'
import { ExportExcelButton } from './export-excel-button'

const ClaimTabView = () => {
  return (
    <Flex direction="column" className="relative gap-0.5" width="100%">
      <TabContentHeading title="Claims">
        <Flex className="gap-1">
          <ExportExcelButton />
          <AddProfessionalClaimDialog />
        </Flex>
      </TabContentHeading>

      <ClaimListFilterForm />
      <Flex direction="column" className="bg-white w-full">
        <ClaimListTable />
        <ClaimsListTablePagination />
      </Flex>
    </Flex>
  )
}

export { ClaimTabView }
