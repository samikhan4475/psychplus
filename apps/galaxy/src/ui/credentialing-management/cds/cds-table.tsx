'use client'

import { ScrollArea } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { DataTable, LoadingPlaceholder } from '@/components'
import { columns } from '../columns'
import { License } from '../types'
import { useStore } from './store'

const CDSTable = ({ licenses }: { licenses: License[] }) => {
  const { loading, sort, sortData } = useStore((state) => ({
    sortData: state.sortData,
    sort: state.sort,
    loading: state.loading,
  }))
  const isRowDisabled = (row: Row<License>) => {
    if (!row.original?.id) return true
    return false
  }

  if (loading) {
    return <LoadingPlaceholder className="bg-white min-h-[46vh]" />
  }

  return (
    <ScrollArea className="bg-white Xmin-h-[150px] h-full max-w-[calc(100vw_-_198px)] p-2">
      <DataTable
        data={licenses}
        columns={columns(sort, sortData)}
        tdClass="!p-0 first:bg-white"
        isRowSpan
        disablePagination
        sticky
        isRowDisabled={isRowDisabled}
        tableRowClass="border-b border-red-200"
      />
    </ScrollArea>
  )
}

export { CDSTable }
