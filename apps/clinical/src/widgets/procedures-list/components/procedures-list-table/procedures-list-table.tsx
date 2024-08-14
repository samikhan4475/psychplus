'use client'

import React from 'react'
import { Flex } from '@radix-ui/themes'
import { type Table } from '@tanstack/react-table'
import { Procedure } from '@psychplus/procedures'
import {
  DataTable,
  DataTablePageNavigation,
  DataTablePaginationLabel,
} from '@psychplus/ui/data-table'
import { useStore } from '../../store'
import { columns } from '../columns'

const ProceduresListTable = () => {
  const { procedures } = useStore()

  return (
    <DataTable
      data={procedures}
      columns={columns()}
      tableClass="border border-solid border-[lightgray] "
      tHeadClass="bg-[#EBF3FC]"
      thClass="border-b border-r border-solid border-[#C1E2FF] text-center"
      isRowPan={true}
      toBodyClass="border-[lightgray]; border-b border-solid"
      columnCellClass="border border-solid border-[#F2F2F2] w-50"
      initialPageSize={10}
      renderFooter={DataTableFooter}
    />
  )
}
const DataTableFooter = (table: Table<Procedure>) => (
  <Flex p="1" align="center" justify="end">
    <Flex gap="3" align="center">
      <DataTablePaginationLabel table={table} />
      <DataTablePageNavigation table={table} />
    </Flex>
  </Flex>
)

export { ProceduresListTable }
