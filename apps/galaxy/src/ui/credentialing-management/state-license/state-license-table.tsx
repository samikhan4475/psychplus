'use client'

import { ScrollArea } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { DataTable, LoadingPlaceholder } from '@/components'
import { columns } from '../columns'
import { License } from '../types'
import { useStore } from './store'

const StateLicenseTable = ({ licenses }: { licenses: License[] }) => {
  const { sort, sortData, loading } = useStore((state) => ({
    sort: state.sort,
    sortData: state.sortData,
    loading: state.loading,
  }))
  const isRowDisabled = (row: Row<License>) => {
    const data = row.original
    if (!data.id) return true
    return false
  }

  if (loading) {
    return <LoadingPlaceholder className="bg-white min-h-[46vh]" />
  }

  return (
    <ScrollArea className="bg-white Xmin-h-[150px] h-full max-w-[calc(100vw_-_198px)] p-2">
      <DataTable
        columns={columns(sort, sortData)}
        data={licenses}
        tdClass="!p-0 first:bg-white"
        isRowSpan
        sticky
        disablePagination
        tableRowClass="border-b border-red-200"
        isRowDisabled={isRowDisabled}
      />
    </ScrollArea>
  )
}

export { StateLicenseTable }
