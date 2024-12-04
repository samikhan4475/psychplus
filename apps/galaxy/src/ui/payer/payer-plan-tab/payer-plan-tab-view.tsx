import React from 'react'
import { Flex } from '@radix-ui/themes'
import { PayerPlanDialog } from './add-payer-plan-dialog'
import { PayerListFilterForm } from './filters'
import { PayerPlanTabHeader } from './payer-plan-tab-header'
import { PayerPlanListTable } from './table'
import { PayerPlanTablePagination } from './table/payer-table-pagination'

const PayerPlanTabView = () => {
  return (
    <Flex direction="column" gap="2" className="flex-1">
      <PayerPlanTabHeader title="Plan">
        <PayerPlanDialog />
      </PayerPlanTabHeader>
      <Flex direction="column" gap="1" className="bg-white w-full py-1">
        <PayerListFilterForm />
        <PayerPlanListTable />
        <PayerPlanTablePagination />
      </Flex>
    </Flex>
  )
}

export { PayerPlanTabView }
