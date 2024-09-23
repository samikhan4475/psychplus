'use client'

import { useEffect, useState } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { Table } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import { DataTable } from '@/components'
import { getBookedAppointmentsAction } from '../actions'
import { useStore } from '../store'
import { BookedAppointment } from '../types/schedule'
import { columns } from './table-columns'

const DataTableHeader = (table: Table<BookedAppointment>) => {
  const roundingFilters = useStore((state) => state.tableFilters)

  useEffect(() => {
    // reset columns visibility
    table.getAllColumns().forEach((column) => {
      column.toggleVisibility(true)
      column.columns.forEach((column) => column.toggleVisibility(true))
    })
    // set column visiblity
    table
      .getAllColumns()
      .filter(
        (column) => column.getCanHide() && roundingFilters.includes(column.id),
      )
      .forEach((column) => {
        column.columns.forEach((column) => column.toggleVisibility(false))
        column.toggleVisibility(false)
      })
  }, [table, roundingFilters])

  return null
}

const RoundingViewTable = () => {
  const [tableData, setTableData] = useState<BookedAppointment[]>([])

  useEffect(() => {
    getBookedAppointmentsAction().then((response) => {
      if (response.state === 'error') {
        setTableData([])
        toast.error('Failed to retrieve data')
      } else setTableData(response.data)
    })
  }, [])

  return (
    <Flex direction="column" className="w-[100vw] flex-1 px-[26px]">
      <ScrollArea className="mt-[13px] w-full px-2" scrollbars="horizontal">
        <DataTable
          columns={columns()}
          data={tableData}
          renderHeader={DataTableHeader}
          isRowSpan
        />
      </ScrollArea>
    </Flex>
  )
}

export { RoundingViewTable }
