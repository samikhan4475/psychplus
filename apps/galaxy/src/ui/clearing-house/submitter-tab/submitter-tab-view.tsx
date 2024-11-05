'use client'

import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { SubmitterDialog } from '../dialogs'
import { InsurancePaymentListTable } from './receiver-list-table'
import { SubmitterListFilterForm } from './submitter-list-filter-form'
import { SubmitterListTablePagination } from './submitter-list-table-pagination'

const SubmitterTabView = () => {
  return (
    <Flex direction="column" className="gap-0.5">
      <TabContentHeading title="Submitter">
        <SubmitterDialog />
      </TabContentHeading>

      <Flex direction="column" gap="1" className="bg-white w-full py-1">
        <SubmitterListFilterForm />
        <InsurancePaymentListTable />
        <SubmitterListTablePagination />
      </Flex>
    </Flex>
  )
}

export { SubmitterTabView }
