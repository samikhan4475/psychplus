import React from 'react'
import { Flex } from '@radix-ui/themes'
import { PayerPlanDialog } from './add-payer-plan-dialog'
import { PayerListFilterForm } from './filters'
import { PayerPlanTabHeader } from './payer-plan-tab-header'
import { PayerPlanListTable } from './table'
import { PayerPlanTablePagination } from './table/payer-table-pagination'

const PayerPlanTabView = () => {
  return (
    <>
      <PayerPlanTabHeader title="Plan">
        <PayerPlanDialog />
      </PayerPlanTabHeader>
      <Flex direction="column" className="relative gap-0.5" width="100%">
        <PayerListFilterForm />
      </Flex>
      <Flex
        gapY="2"
        direction="column"
        className="bg-white flex-1 !overflow-hidden"
      >
        <PayerPlanListTable />
        <PayerPlanTablePagination />
      </Flex>
    </>
  )
}

export { PayerPlanTabView }
