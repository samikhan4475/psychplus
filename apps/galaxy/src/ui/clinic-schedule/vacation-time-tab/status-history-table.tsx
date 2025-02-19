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
import { VacationStatusCell } from './cells'
import { getVacationStatusHistory } from './client-actions'
import { VacationTime } from './types'

const columns: ColumnDef<VacationTime>[] = [
  {
    id: 'user',
    header: ({ column }) => <ColumnHeader column={column} label="User" />,
    cell: ({ row: { original } }) => (
      <LongTextCell>
        {original?.metadata?.createdByFullName ?? 'N/A'}
      </LongTextCell>
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
    cell: ({ row }) => <VacationStatusCell row={row} />,
  },
]

interface StatusHistoryTableProps {
  vacationTimeId: string
}
const StatusHistoryTable = ({ vacationTimeId }: StatusHistoryTableProps) => {
  const [data, setData] = useState<VacationTime[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getVacationStatusHistory(vacationTimeId)
      .then((response) => {
        if (response.state === 'error') {
          return toast.error(response?.error)
        }
        setData(response.data ?? [])
      })
      .finally(() => setLoading(false))
  }, [vacationTimeId])

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
