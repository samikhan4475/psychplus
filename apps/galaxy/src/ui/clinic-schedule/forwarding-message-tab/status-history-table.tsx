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
import { formatDateTime } from '@/utils'
import { getForwardingStatusHistory } from './actions'
import { ForwardingMessage } from './types'

const columns: ColumnDef<ForwardingMessage>[] = [
  {
    id: 'metadata.createdByFullName',
    header: ({ column }) => <ColumnHeader column={column} label="User" />,
    cell: ({ row: { original } }) => (
      <LongTextCell>
        {original?.metadata?.createdByFullName ?? 'N/A'}
      </LongTextCell>
    ),
  },
  {
    id: 'metadata.createdOn',
    header: ({ column }) => <ColumnHeader column={column} label="Date/Time" />,
    cell: ({ row: { original } }) => (
      <TextCell>
        {formatDateTime(original?.metadata?.createdOn, false) ?? 'N/A'}
      </TextCell>
    ),
  },
  {
    id: 'recordStatus',
    header: ({ column }) => <ColumnHeader column={column} label="Status" />,
    cell: ({ row: { original } }) => (
      <TextCell>{original?.recordStatus ?? 'N/A'}</TextCell>
    ),
  },
]
interface StatusHistoryTableProps {
  forwardingMessage: ForwardingMessage
}

const StatusHistoryTable = ({
  forwardingMessage: { id, userId },
}: StatusHistoryTableProps) => {
  const [data, setData] = useState<ForwardingMessage[]>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true)
      const response = await getForwardingStatusHistory(userId, id)
      if (response.state === 'error') {
        setLoading(false)
        return toast.error(response?.error)
      }
      setLoading(false)
      setData(response?.data ?? [])
    }

    fetchHistory()
  }, [userId, id])

  if (loading) {
    return <LoadingPlaceholder className="min-h-24" />
  }

  return (
    <ScrollArea className="rounded-lg h-full max-h-28 w-full">
      <DataTable data={data ?? []} columns={columns} disablePagination sticky />
    </ScrollArea>
  )
}

export { StatusHistoryTable }
