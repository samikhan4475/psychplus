'use client'

import { useEffect } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { Table } from '@tanstack/react-table'
import { DataTable } from '@/components'
import { useStore } from './store'
import { columns as getColumns } from './table-columns'
import { MergedRecord } from './types'

const DataTableHeader = (table: Table<MergedRecord>) => {
  const listViewFilters = useStore((state) => state.tableFilters)

  useEffect(() => {
    table.getAllColumns().forEach((column) => {
      column.toggleVisibility(true)
      column.columns.forEach((column) => column.toggleVisibility(true))
    })
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
const ProvierCodingTableView = () => {
  const { data, currentWeekDays, fetchUnitsAndGroups } = useStore((state) => ({
    data: state.data || [],
    currentWeekDays: state.currentWeekDays,
    fetchUnitsAndGroups: state.fetchUnitsAndGroups,
  }))

  useEffect(() => {
    if (!data.length) return
    const serviceIds = data
      .filter((appointment) => appointment.serviceId)
      .map((appointment) => appointment.serviceId)
    fetchUnitsAndGroups(serviceIds)
  }, [data])

  return (
    <Flex direction="column" className="w-[100vw] flex-1 px-[26px]">
      <ScrollArea className="mt-[13px] w-full px-2" scrollbars="horizontal">
        <DataTable
          columns={getColumns(currentWeekDays)}
          data={data}
          renderHeader={DataTableHeader}
          isRowSpan
        />
      </ScrollArea>
    </Flex>
  )
}

export { ProvierCodingTableView }
