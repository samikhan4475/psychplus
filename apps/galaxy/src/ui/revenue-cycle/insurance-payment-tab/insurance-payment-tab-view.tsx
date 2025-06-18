'use client'

import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { InsurancePaymentDialog } from '../dialogs'
import { InsurancePaymentListFilterForm } from './insurance-payment-list-filter-form'
import { InsurancePaymentListTable } from './insurance-payment-list-table'
import { InsurancePaymentListTablePagination } from './insurance-payment-list-table-pagination'

const InsurancePaymentTabView = () => {
  return (
    <Flex direction="column" className="relative flex-1">
      <Flex direction="column" className="relative gap-0.5">
        <TabContentHeading title="Insurance Payment">
          <Flex className="ml-auto mr-[110px] w-[70px]">
            <InsurancePaymentDialog />
          </Flex>
        </TabContentHeading>
        <InsurancePaymentListFilterForm />
      </Flex>
      <Flex direction="column" gap="1" className="bg-white w-full flex-1 py-1">
        <InsurancePaymentListTable />
        <InsurancePaymentListTablePagination />
      </Flex>
    </Flex>
  )
}

export { InsurancePaymentTabView }
