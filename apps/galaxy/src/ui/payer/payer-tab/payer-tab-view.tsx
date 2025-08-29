import React from 'react'
import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { PayerHistoryDialog } from './dialogs'
import { AddPayerDialog } from './dialogs/add-payer-dialog'
import { ExportExcelButton } from './export-excel-button'
import { PayerFilterForm } from './filters/payer-filter-form'
import { PayerListTable } from './table/payer-list-table'
import { PayerTablePagination } from './table/payer-table-pagination'

const PayerTabView = () => {
  return (
    <Flex direction="column" className="relative flex-1 gap-2" width="100%">
      <Flex direction="column" gapY="2">
        <TabContentHeading title="Payer">
          <Flex gapX="2">
            <PayerHistoryDialog />
            <AddPayerDialog />
            <ExportExcelButton />
          </Flex>
        </TabContentHeading>
        <PayerFilterForm />
      </Flex>
      <Flex
        direction="column"
        height="100%"
        className="bg-white h-[calc(100dvh-274px)] rounded-1"
      >
        <PayerListTable />
        <PayerTablePagination />
      </Flex>
    </Flex>
  )
}

export { PayerTabView }
