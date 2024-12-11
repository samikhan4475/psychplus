'use client'

import { useEffect, useState } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { formatDateTime } from '@/utils'
import { getProviderLocationHistoryAction } from './actions'
import { StaffLocation } from './types'

const columns: ColumnDef<StaffLocation>[] = [
  {
    id: 'User',
    header: () => <ColumnHeader label="User" />,
    cell: ({ row }) => (
      <TextCell>{row.original.metadata?.createdByFullName}</TextCell>
    ),
  },
  {
    id: 'metadata.createdOn',
    header: () => <ColumnHeader label="Date/Time" />,
    cell: ({ row }) => (
      <TextCell>{formatDateTime(row.original.metadata?.createdOn)}</TextCell>
    ),
  },
  {
    id: 'status',
    header: () => <ColumnHeader label="Status" />,
    cell: ({ row }) => (
      <TextCell>{row.original?.recordStatus ?? '--'}</TextCell>
    ),
  },
]

interface StaffLocationHistoryTableProps {
  providerLocationId: string
}
const StaffLocationHistoryTable = ({
  providerLocationId,
}: StaffLocationHistoryTableProps) => {
  const [historyList, setHistoryList] = useState<StaffLocation[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProviderLocationHistoryAction(providerLocationId).then((result) => {
      if (result.state === 'success') {
        setHistoryList(result.data.staffLocations)
      } else if (result.state === 'error') {
        toast.error(result.error)
      }
      setLoading(false)
    })
  }, [])
  if (loading) return <LoadingPlaceholder className="h-20" />

  return (
    <ScrollArea className="bg-white max-h-44 p-2">
      <DataTable
        data={historyList ?? []}
        columns={columns}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { StaffLocationHistoryTable }
