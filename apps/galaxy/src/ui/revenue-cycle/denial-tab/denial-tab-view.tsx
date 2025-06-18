'use client'

import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { DenialFilterForm } from './denial-filter-form'
import { DenialPagination } from './denial-pagination'
import { DenialListTable } from './denial-table'
import { ExportExcelButton } from './export-excel-button'

const DenialTabView = () => {
  return (
    <Flex direction="column" className="flex-1 gap-0.5">
      <Flex direction='column'>
        <TabContentHeading
          className="justify-between"
          title="Denial Management"
        >
          <ExportExcelButton />
        </TabContentHeading>
        <DenialFilterForm />
      </Flex>
      <Flex direction="column" gap="1" className="bg-white w-full flex-1 py-1">
        <DenialListTable />
        <DenialPagination />
      </Flex>
    </Flex>
  )
}

export { DenialTabView }
