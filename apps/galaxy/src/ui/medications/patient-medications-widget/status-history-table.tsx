'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import {
  ColumnHeader,
  DataTable,
  LoadingPlaceholder,
  LongTextCell,
  PropsWithRow,
  TextCell,
} from '@/components'
import { formatDateTime } from '@/utils'
import { getStatusHistoryAction } from './actions'
import { PatientMedication } from './types'

const columns: ColumnDef<PatientMedication>[] = [
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
    cell: ({ row: { original } }) => (
      <TextCell>{original?.medicationStatus ?? 'N/A'}</TextCell>
    ),
  },
]

const StatusHistoryTable = ({ row }: PropsWithRow<PatientMedication>) => {
  const [loading, setLoading] = useState(false)
  const { id } = row.original
  const patientId = useParams().id as string
  const [data, setData] = useState<PatientMedication[]>([])
  useEffect(() => {
    setLoading(true)
    getStatusHistoryAction(Number(patientId), id).then((response) => {
      if (response.state === 'error') {
        setLoading(false)
        return toast.error(response?.error)
      }
      setData(response?.data ?? [])
      setLoading(false)
    })
  }, [id, patientId])

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
