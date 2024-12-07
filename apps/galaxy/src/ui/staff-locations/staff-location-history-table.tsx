'use client'

import { useEffect } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { useStore } from '../staff-management/store'
import { Staff } from '../staff-management/types'

const columns: ColumnDef<Staff>[] = [
  {
    id: 'dateTime',
    header: () => <ColumnHeader label="User" />,
    cell: ({ row }) => <TextCell>{row.original.legalName?.firstName}</TextCell>,
  },
  {
    id: 'user',
    header: () => <ColumnHeader label="Date/Time" />,
    cell: ({ row }) => <TextCell>{row.original.legalName?.firstName}</TextCell>,
  },
  {
    id: 'status',
    header: () => <ColumnHeader label="Status" />,
    cell: ({ row }) => <TextCell>{row.original.legalName?.firstName}</TextCell>,
  },
]

interface StaffLocationHistoryTableProps {
  staffId: string
}
const StaffLocationHistoryTable = ({
  staffId,
}: StaffLocationHistoryTableProps) => {
  const { data, loading } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    search: state.search,
    sort: state.sort,
    sortData: state.sortData,
  }))

  useEffect(() => {
    // search({})
  }, [])
  if (loading) return <LoadingPlaceholder className="h-20" />

  return (
    <ScrollArea className="bg-white max-h-44 p-2">
      <DataTable
        data={data?.staff ?? []}
        columns={columns}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { StaffLocationHistoryTable }
