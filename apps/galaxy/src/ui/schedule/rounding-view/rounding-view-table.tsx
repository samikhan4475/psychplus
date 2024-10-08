'use client'

import { useEffect } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { Table } from '@tanstack/react-table'
import { DataTable } from '@/components'
import { useBookedAppointmentsStore, useStore } from '../store'
import { useStore as useRoundingViewStore } from './store'
import { columns } from './table-columns'
import { Appointment } from '@/types'

const DataTableHeader = (table: Table<Appointment>) => {
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
  const data = useBookedAppointmentsStore((state) => state.roundingViewData)
  const fetchUnitsAndGroups = useRoundingViewStore(
    (state) => state.fetchUnitsAndGroups,
  )

  useEffect(() => {
    // some serviceIds are missing and appearing as undefined from backend
    const serviceIds = data
      .filter((appointment) => appointment.serviceId)
      .map((appointment) => appointment.serviceId)
    fetchUnitsAndGroups(serviceIds)
  }, [data])

  return (
    <Flex direction="column" className="w-[100vw] flex-1 px-[26px]">
      <ScrollArea className="mt-[13px] w-full px-2" scrollbars="horizontal">
        <DataTable
          columns={columns}
          data={data}
          renderHeader={DataTableHeader}
          isRowSpan
        />
      </ScrollArea>
    </Flex>
  )
}

export { RoundingViewTable }
