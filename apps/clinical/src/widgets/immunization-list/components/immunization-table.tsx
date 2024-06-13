'use client'

import * as Toast from '@radix-ui/react-toast'
import { Flex } from '@radix-ui/themes'
import { type Table } from '@tanstack/react-table'
import { Immunization } from '@psychplus/immunization'
import {
  DataTable,
  DataTablePageNavigation,
  DataTablePaginationLabel,
} from '@psychplus/ui/data-table'
import { useStore } from '../store'
import { columns } from './columns'

const ImmunizationTable = () => {
  const { immunizations, realCodeSets } = useStore()

  return (
    <Toast.Provider>
      <DataTable
        data={immunizations}
        columns={columns(realCodeSets[0])}
        tableClass="border border-solid border-[lightgray] "
        tHeadClass="bg-[#EBF3FC]"
        thClass="border-b border-r border-solid border-[#C1E2FF] text-center"
        isRowPan={true}
        toBodyClass="border-[lightgray]; border-b border-solid"
        columnCellClass="border border-solid border-[#F2F2F2] w-50"
        initialPageSize={10}
        renderFooter={DataTableFooter}
      />
    </Toast.Provider>
  )
}

const DataTableFooter = (table: Table<Immunization>) => (
  <Flex p="1" align="center" justify="end" gap="3">
    <DataTablePaginationLabel table={table} />
    <DataTablePageNavigation table={table} />
  </Flex>
)

export { ImmunizationTable }
