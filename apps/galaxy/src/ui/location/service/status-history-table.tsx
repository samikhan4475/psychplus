'use client'

import { useEffect, useState } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  LongTextCell,
  TextCell,
} from '@/components'
import { getServiceStatusHistory } from './actions'
import { LocationService } from './types'

const columns: ColumnDef<LocationService>[] = [
  {
    id: 'user',
    header: ({ column }) => <ColumnHeader column={column} label="User" />,
    cell: ({ row: { original } }) => (
      <LongTextCell>{original?.locationName ?? ''}</LongTextCell>
    ),
  },
  {
    id: 'dateTime',
    header: ({ column }) => <ColumnHeader column={column} label="Date/Time" />,
    cell: ({ row: { original } }) => (
      <TextCell>{original?.state ?? 'N/A'}</TextCell>
    ),
  },
  {
    id: 'status',
    header: ({ column }) => <ColumnHeader column={column} label="Status" />,
    cell: ({ row: { original } }) => <TextCell>{original?.status}</TextCell>,
  },
]

const StatusHistoryTable = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<LocationService[]>([])

  useEffect(() => {
    setLoading(true)
    getServiceStatusHistory().then((response) => {
      if (response.state === 'error') {
        setLoading(false)
        return toast.error(response?.error)
      }
      setData(response?.data ?? [])
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <LoadingPlaceholder className="min-h-32" />
  }

  return (
    <ScrollArea className="rounded-lg h-full max-h-32 w-full">
      <DataTable data={data || []} columns={columns} disablePagination sticky />
    </ScrollArea>
  )
}

export { StatusHistoryTable }
