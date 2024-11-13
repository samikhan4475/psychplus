'use client'

import { Flex } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  DateTimeCell,
  LoadingPlaceholder,
  LongTextCell,
  TextCell,
} from '@/components'
import { Appointment } from '@/types'
import { formatDateTime } from '@/utils/date'
import { ActionsCell } from './cells'
import { useStore } from './store'

const columns: ColumnDef<Appointment>[] = [
  {
    id: 'follow-up-date-time',
    accessorKey: 'follow-up-date-time',
    header: () => <ColumnHeader label="Date/Time" />,
    cell: ({ row }) => {
      return (
        <DateTimeCell>
          {formatDateTime(row.original.appointmentDate, false)}
        </DateTimeCell>
      )
    },
  },
  {
    id: 'provider',
    accessorKey: 'provider',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Provider" />
    ),
    cell: ({ row }) => (
      <TextCell className="whitespace-nowrap">
        {row.original.providerName}
      </TextCell>
    ),
  },
  {
    id: 'location',
    accessorKey: 'location',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Location" />
    ),
    cell: ({ row }) => (
      <TextCell className="whitespace-nowrap">
        {row.original.locationName}
      </TextCell>
    ),
  },
  {
    id: 'visit-type',
    accessorKey: 'visit-type',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Visit Type" />
    ),
    cell: ({ row }) => <LongTextCell>{row.original.visitType}</LongTextCell>,
  },
  {
    id: 'follow-up-actions',
    header: () => <ColumnHeader label="Actions" />,
    cell: ({ row }) => (
      <Flex className="overflow-hidden">
        <ActionsCell row={row} />
      </Flex>
    ),
  },
]

const FollowUpTable = () => {
  const { data, loading } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
  }))

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <DataTable data={data ?? []} columns={columns} disablePagination sticky />
  )
}

export { FollowUpTable }
