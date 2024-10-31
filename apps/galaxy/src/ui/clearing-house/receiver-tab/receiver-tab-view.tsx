'use client'

import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { ReceiverDialog } from '../dialogs'
import { ReceiverListFilterForm } from './receiver-list-filter-form'
import { ReceiverListTable } from './receiver-list-table'
import { ReceiverListTablePagination } from './receiver-list-table-pagination'

const ReceiverTabView = () => {
  return (
    <Flex direction="column" className="gap-0.5">
      <TabContentHeading title="Receiver">
        <ReceiverDialog />
      </TabContentHeading>

      <Flex direction="column" gap="1" className="bg-white w-full py-1">
        <ReceiverListFilterForm />
        <ReceiverListTable />
        <ReceiverListTablePagination />
      </Flex>
    </Flex>
  )
}

export { ReceiverTabView }
