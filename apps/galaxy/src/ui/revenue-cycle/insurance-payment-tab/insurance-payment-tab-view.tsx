'use client'

import { Flex, ScrollArea } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { InsurancePaymentListFilterForm } from './insurance-payment-list-filter-form'
import { InsurancePaymentListTable } from './insurance-payment-list-table'
import { InsurancePaymentListTablePagination } from './insurance-payment-list-table-pagination'

const InsurancePaymentTabView = () => {
  return (
    <Flex direction="column" className="gap-0.5">
      <TabContentHeading title="Insurance Payment" />
      <ScrollArea>
        <Flex direction="column" gap="1" className="bg-white w-full py-1">
          <InsurancePaymentListFilterForm />
          <InsurancePaymentListTable />
          <InsurancePaymentListTablePagination />
        </Flex>
      </ScrollArea>
    </Flex>
  )
}

export { InsurancePaymentTabView }
