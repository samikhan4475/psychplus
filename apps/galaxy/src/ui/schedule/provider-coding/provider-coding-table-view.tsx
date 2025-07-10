'use client'

import { useEffect, useMemo } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { Table } from '@tanstack/react-table'
import { DataTable } from '@/components'
import { ALWAYS_VISIBLE_COLUMNS, DAY_PATTERN } from '../constants'
import { useStore as useRootStore } from '../store'
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
const ProviderCodingTableView = () => {
  const {
    data,
    currentWeekDays,
    fetchUnitsAndGroups,
    columnsStore,
    setColumnsStore,
  } = useStore((state) => ({
    data: state.data || [],
    currentWeekDays: state.currentWeekDays,
    fetchUnitsAndGroups: state.fetchUnitsAndGroups,
    columnsStore: state.columnsStore,
    setColumnsStore: state.setColumnsStore,
  }))

  const { cachedColumns } = useRootStore((state) => ({
    cachedColumns: state.cachedTableColumnsProviderCoding,
  }))

  useEffect(() => {
    if (cachedColumns.length > 0) {
      setColumnsStore(cachedColumns)
    }
  }, [cachedColumns])

  useEffect(() => {
    if (!data.length) return

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
  }, [data])

  const baseColumns = useMemo(() => {
    return getColumns(currentWeekDays)
  }, [currentWeekDays])

  const filteredColumns = useMemo(() => {
    return baseColumns.filter((col) => {
      const id = col.id ?? ''

      const isStored = columnsStore.includes(id)
      const containsDay = DAY_PATTERN.test(id)

      return isStored || ALWAYS_VISIBLE_COLUMNS.includes(id) || containsDay
    })
  }, [columnsStore, baseColumns])

  return (
    <ScrollArea
      className="bg-white h-full flex-1 px-2.5 py-2"
      scrollbars="both"
    >
      <DataTable
        columns={filteredColumns}
        data={data}
        renderHeader={DataTableHeader}
        tableClass="[&_.rt-ScrollAreaScrollbar]:!hidden"
        theadClass="z-10"
        isRowSpan
        sticky
      />
    </ScrollArea>
  )
}

export { ProviderCodingTableView }
