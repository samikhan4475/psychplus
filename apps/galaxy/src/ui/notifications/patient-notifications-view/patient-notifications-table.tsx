'use client'

import { useEffect } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  DateTimeCell,
  LoadingPlaceholder,
  LongTextCell,
  TextCell,
} from '@/components'
import { formatDateTime } from '@/utils/date'
import type { PatientNotification } from '../types'
import { useStore } from './store'

const columns: ColumnDef<PatientNotification>[] = [
  {
    id: 'notification-date-time',
    header: () => <ColumnHeader label="Date/Time" />,
    cell: ({ row }) => {
      return <DateTimeCell>{formatDateTime(row.original.sentOn)}</DateTimeCell>
    },
  },
  {
    id: 'sent-via',
    header: () => <ColumnHeader label="Sent Via" />,
    cell: ({ row }) => {
      return <TextCell>{row.original.notificationMethod}</TextCell>
    },
  },
  {
    id: 'phone-email',
    header: () => <ColumnHeader label="Phone/Email" />,
    cell: ({ row }) => {
      return <TextCell>{row.original.notificationAddress}</TextCell>
    },
  },
  {
    id: 'reminder',
    header: () => <ColumnHeader label="Reminder" />,
    cell: ({ row }) => {
      return (
        <LongTextCell className="w-[300px]">
          {row.original.message}
        </LongTextCell>
      )
    },
  },
  {
    id: 'status',
    header: () => <ColumnHeader label="Status" />,
    cell: ({ row }) => {
      return <TextCell>{row.original.deliveryStatus}</TextCell>
    },
  },
  {
    id: 'response',
    header: () => <ColumnHeader label="Response" />,
    cell: ({ row }) => {
      return <LongTextCell>{row.original.responseReceived}</LongTextCell>
    },
  },
  {
    id: 'response-date',
    header: () => <ColumnHeader label="Response Date" />,
    cell: ({ row }) => {
      return (
        <DateTimeCell>
          {formatDateTime(row.original.responseReceivedOn)}
        </DateTimeCell>
      )
    },
  },
]

const PatientNotificationsTable = ({ patientId }: { patientId: string }) => {
  const { data, search, loading } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    search: state.search,
  }))

  useEffect(() => {
    search({ patientId: patientId })
  }, [])

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <ScrollArea>
      <DataTable
        data={data?.notifications ?? []}
        columns={columns}
        disablePagination
        sticky
      />
    </ScrollArea>
  )
}

export { PatientNotificationsTable }
