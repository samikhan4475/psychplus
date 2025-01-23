'use client'

import { useEffect } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { Table } from '@tanstack/react-table'
import { DataTable } from '@/components'
import { Appointment } from '@/types'
import { useStore as useRootStore } from '../store'
import { useStore as useRoundingViewStore, useStore } from './store'
import { columns } from './table-columns'

const DataTableHeader = (table: Table<Appointment>) => {
  const roundingFilters = useRootStore((state) => state.tableFilters)

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
  const data = useStore((state) => state.appointments)
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
    <ScrollArea
      className="bg-white h-full flex-1 px-2.5 py-2"
      scrollbars="both"
    >
      <DataTable
        columns={columns}
        data={data}
        renderHeader={DataTableHeader}
        disablePagination
        tableClass="[&_.rt-ScrollAreaScrollbar]:!hidden"
        theadClass="z-10"
        isRowSpan
        sticky
        defaultSorting={[{ id: 'appointment-date', desc: true }]}
      />
    </ScrollArea>
  )
}

export { RoundingViewTable }
