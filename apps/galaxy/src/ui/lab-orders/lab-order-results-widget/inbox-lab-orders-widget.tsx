'use client'

import { InboxLabOrderResultHeader } from './inbox-lab-order-result-header'
import { Flex } from '@radix-ui/themes'
import { InboxLabOrdersFilterForm } from './inbox-lab-orders-filter-form'
import { InboxLabOrderTable } from './inbox-lab-order-table'
import { InboxLabOrderTablePagination } from './inbox-lab-order-result-pagination'


const InboxLabOrderWidget = () => {
  return (
      <Flex
        direction="column"
        width="100%"
        className="bg-white min-h-[calc(100dvh_-_278px)] rounded-1 shadow-2"
      >
        <InboxLabOrderResultHeader />
        <InboxLabOrdersFilterForm />
        <InboxLabOrderTable />
        <InboxLabOrderTablePagination />
      </Flex>
  )
}

export { InboxLabOrderWidget }
