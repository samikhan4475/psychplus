import { useEffect, useState } from 'react'
import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  TextCell,
} from '@/components'
import { formatDateTime } from '@/utils'
import { getClinicStatusHistoryList } from './actions'
import { ClinicSchedule } from './types'

const columns: ColumnDef<ClinicSchedule>[] = [
  {
    id: 'username',
    header: ({ column }) => <ColumnHeader column={column} label="User" />,
    cell: ({ row }) => (
      <TextCell>{row.original.metadata.createdByFullName ?? 'N/A'}</TextCell>
    ),
  },
  {
    id: 'date',
    header: ({ column }) => <ColumnHeader column={column} label="Date/Time" />,
    cell: ({ row }) => (
      <TextCell>{formatDateTime(row.original.metadata.createdOn)}</TextCell>
    ),
  },
  {
    id: 'status',
    header: ({ column }) => <ColumnHeader column={column} label="Status" />,
    cell: ({ row }) => <TextCell>{row.original.status}</TextCell>,
  },
]

interface StatusHistoryTableProps {
  staffId: number
  clinicTimeId: number
}

const StatusHistoryTable = ({
  clinicTimeId,
  staffId,
}: StatusHistoryTableProps) => {
  const [data, setData] = useState<ClinicSchedule[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getClinicStatusHistoryList(String(staffId), clinicTimeId)
      .then((response) => {
        if (response.state === 'error') {
          return toast.error(response?.error)
        }
        setData(response.data ?? [])
      })
      .finally(() => setLoading(false))
  }, [clinicTimeId, staffId])

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
