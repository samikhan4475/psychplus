'use client'

import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { DenialFilterForm } from './denial-filter-form'
import { DenialPagination } from './denial-pagination'
import { DenialListTable } from './denial-table'
import { ExportExcelButton } from './export-excel-button'

const DenialTabView = () => {
  return (
    <Flex direction="column" className="gap-0.5">
      <TabContentHeading className="justify-between" title="Denial Management">
        <ExportExcelButton  />
      </TabContentHeading>
      <Flex direction="column" gap="1" className="bg-white w-full py-1">
        <DenialFilterForm />
        <DenialListTable />
        <DenialPagination />
      </Flex>
    </Flex>
  )
}

export { DenialTabView }
