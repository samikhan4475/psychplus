'use client'

import { useEffect, useState } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { Table } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import { DataTable } from '@/components'
import { getBookedAppointmentsAction } from '../actions'
import { useStore } from '../store'
import { columns } from './table-columns'
import { Appointment } from '../types'

const DataTableHeader = (table: Table<Appointment>) => {
  const listViewFilters = useStore((state) => state.tableFilters)

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
        (column) => column.getCanHide() && listViewFilters.includes(column.id),
      )
      .forEach((column) => {
        column.columns.forEach((column) => column.toggleVisibility(false))
        column.toggleVisibility(false)
      })
  }, [table, listViewFilters])

  return null
}

const ListViewTable = () => {
  const [tableData, setTableData] = useState<Appointment[]>([])

  useEffect(() => {
    getBookedAppointmentsAction().then((response) => {
      if (response.state === 'error') {
        setTableData([])
        toast.error('Failed to retrieve appointments data')
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

export { ListViewTable }
