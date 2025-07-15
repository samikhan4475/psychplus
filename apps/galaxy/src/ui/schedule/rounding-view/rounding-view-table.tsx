'use client'

import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { ScrollArea } from '@radix-ui/themes'
import { Row, Table } from '@tanstack/react-table'
import { DataTable } from '@/components'
import { useStore as useGlobalStore } from '@/store'
import { Appointment } from '@/types'
import { capitalizeName, constructQuickNotesUrl, getPatientMRN } from '@/utils'
import { ALWAYS_VISIBLE_COLUMNS } from '../constants'
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
  const addTab = useGlobalStore((state) => state.addTab)
  const router = useRouter()
  const { columnsStore, setColumnsStore, data } = useStore((state) => ({
    columnsStore: state.columnsStore,
    setColumnsStore: state.setColumnsStore,
    data: state.appointments,
  }))

  const { cachedColumns } = useRootStore((state) => ({
    cachedColumns: state.cachedTableColumnsRounding,
  }))

  useEffect(() => {
    if (cachedColumns.length > 0) {
      setColumnsStore(cachedColumns)
    }
  }, [cachedColumns])

  const fetchUnitsAndGroups = useRoundingViewStore(
    (state) => state.fetchUnitsAndGroups,
  )

  useEffect(() => {
    // some serviceIds are missing and appearing as undefined from backend
    if (data?.length) {
      const serviceIds = Array.from(
        new Set(
          data
            .filter((appointment) => appointment?.service)
            .map((appointment) => appointment?.service),
        ),
      )

      if (serviceIds?.length) {
        fetchUnitsAndGroups(serviceIds)
      }
    }
  }, [data])

  const filteredColumns = useMemo(() => {
    return columns.filter((col) => {
      const colId = col.id ?? ''
      return (
        columnsStore.includes(colId) || ALWAYS_VISIBLE_COLUMNS.includes(colId)
      )
    })
  }, [columnsStore])

  const onRowClick = (row: Row<Appointment>) => {
    const href = constructQuickNotesUrl(
      row.original.patientId,
      row.original.appointmentId,
      row.original.visitTypeCode,
      row.original.visitSequence,
    )

    addTab({
      href,
      label: `${capitalizeName(row.original?.name)}-${getPatientMRN(
        row.original.patientId,
      )}-${row.original.appointmentId}`,
    })
    router.push(href)
  }

  return (
    <ScrollArea
      className="bg-white h-full flex-1 px-2.5 py-2"
      scrollbars="both"
    >
      <DataTable
        onRowClick={onRowClick}
        columns={filteredColumns}
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
