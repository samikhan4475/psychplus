'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { Table } from '@tanstack/react-table'
import { DataTable, LoadingPlaceholder } from '@/components'
import { useStore as useRootStore } from '@/store'
import { Appointment } from '@/types'
import { constructQuickNotesUrl } from '@/utils'
import { useBookedAppointmentsStore, useStore } from '../store'
import { columns } from './table-columns'

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
  const { data, loading } = useBookedAppointmentsStore((state) => ({
    data: state.listViewData,
    loading: state.loading,
  }))
  const router = useRouter()
  const addTab = useRootStore((state) => state.addTab)
  console.log(data)
  return (
    <Flex direction="column" className="w-[100vw] flex-1 px-[26px]">
      <ScrollArea className="mt-[13px] w-full px-2" scrollbars="horizontal">
        {loading ? (
          <LoadingPlaceholder />
        ) : (
          <DataTable
            onRowClick={(row) => {
              const href = constructQuickNotesUrl(
                row.original.patientId,
                row.original.appointmentId,
                row.original.visitTypeCode,
                row.original.visitSequence,
              )

              addTab({
                href,
                label: `${row.original?.name}-${row.original.patientMrn}-${row.original.appointmentId}`,
              })
              router.push(href)
            }}
            columns={columns}
            data={data}
            renderHeader={DataTableHeader}
            isRowSpan
          />
        )}
      </ScrollArea>
    </Flex>
  )
}

export { ListViewTable }
