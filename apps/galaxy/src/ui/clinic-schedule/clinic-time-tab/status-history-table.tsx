import { useEffect, useState } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { getClinicStatusHistoryList } from './action/get-clinic-status-history-list'

interface StatusHistory {
  status: string
  username: string
  date: string
}

const columns: ColumnDef<StatusHistory>[] = [
  {
    id: 'username',
    header: ({ column }) => <ColumnHeader column={column} label="User" />,
    cell: ({ row }) => <TextCell>{row.original.username}</TextCell>,
  },
  {
    id: 'date',
    header: ({ column }) => <ColumnHeader column={column} label="Date/Time" />,
    cell: ({ row }) => <TextCell>{row.original.date}</TextCell>,
  },
  {
    id: 'status',
    header: ({ column }) => <ColumnHeader column={column} label="Status" />,
    cell: ({ row }) => <TextCell>{row.original.status}</TextCell>,
  },
]

const StatusHistoryTable = () => {
  const [data, setData] = useState<StatusHistory[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getClinicStatusHistoryList()
      .then((data) => {
        setData(data ?? [])
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <LoadingPlaceholder className="min-h-24" />
  }

  return (
    <ScrollArea className="rounded-lg h-full max-h-28 w-full">
      <DataTable data={data || []} columns={columns} disablePagination sticky />
    </ScrollArea>
  )
}

export { StatusHistoryTable }
