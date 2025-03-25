'use client'

import { ScrollArea } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { DataTable, LoadingPlaceholder } from '@/components'
import { columns } from '../columns'
import { License } from '../types'
import { useStore } from './store'

const DEATable = ({ licenses }: { licenses: License[] }) => {
  const { sortData, sort, loading } = useStore((state) => ({
    sort: state.sort,
    loading: state.loading,
    sortData: state.sortData,
  }))
  const isRowDisabled = ({ original }: Row<License>) => {
    const data = original
    if (!data.id) return true
    return false
  }

  if (loading) {
    return <LoadingPlaceholder className="min-h-[46vh] bg-white" />
  }

  return (
    <ScrollArea className="bg-white Xmin-h-[150px] h-full max-w-[calc(100vw_-_198px)] p-2">
      <DataTable
        columns={columns(sort, sortData)}
        data={licenses}
        tdClass="!p-0 first:bg-white"
        sticky
        isRowSpan
        tableRowClass="border-b border-red-200"
        disablePagination
        isRowDisabled={isRowDisabled}
      />
    </ScrollArea>
  )
}

export { DEATable }
