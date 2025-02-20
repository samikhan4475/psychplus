'use client'

import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { EdiDialog } from '../dialogs'
import { EdiListTable } from './edi-list-table'
import { EdiListTablePagination } from './edi-list-table-pagination'

const EdiTabView = () => {
  return (
    <Flex direction="column" className="gap-0.5">
      <TabContentHeading title="Insurance Plan EDI Setup">
        <EdiDialog />
      </TabContentHeading>

      <Flex direction="column" gap="1" className="bg-white w-full py-1">
        <EdiListTable />
        <EdiListTablePagination />
      </Flex>
    </Flex>
  )
}

export { EdiTabView }
