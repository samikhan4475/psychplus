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
import { Service } from '@/types'
import { formatDateTime } from '@/utils'
import { getServiceHistoryAction } from './actions'

const columns: ColumnDef<Service>[] = [
  {
    id: 'user',
    header: ({ column }) => <ColumnHeader column={column} label="User" />,
    cell: ({ row: { original } }) => (
      <LongTextCell>{original?.metadata?.createdByFullName ?? ''}</LongTextCell>
    ),
  },
  {
    id: 'dateTime',
    header: ({ column }) => <ColumnHeader column={column} label="Date/Time" />,
    cell: ({ row: { original } }) => (
      <TextCell>
        {formatDateTime(original?.metadata?.createdOn) ?? 'N/A'}
      </TextCell>
    ),
  },
  {
    id: 'status',
    header: ({ column }) => <ColumnHeader column={column} label="Status" />,
    cell: ({ row: { original } }) => <TextCell>{original?.status}</TextCell>,
  },
]

interface StatusHistoryTableProps {
  serviceId: string
}
const StatusHistoryTable = ({ serviceId }: StatusHistoryTableProps) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Service[]>([])

  useEffect(() => {
    getServiceHistoryAction(serviceId)
      .then((response) => {
        if (response.state === 'error') {
          setLoading(false)
          return toast.error(response?.error)
        }
        setData(response?.data ?? [])
      })
      .finally(() => setLoading(false))
  }, [serviceId])

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
