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
import { Appointment } from '@/types'
import { VisitStatusSelectCell } from '@/ui/schedule/shared/table-cells'
import { formatDateTime } from '@/utils/date'
import { ActionsCell } from './cells'
import { useStore } from './store'
import { getEndDate } from './utils'

const columns: ColumnDef<Appointment>[] = [
  {
    id: 'follow-up-date-time',
    header: () => <ColumnHeader label="Date/Time" />,
    cell: ({ row }) => {
      return (
        <DateTimeCell>
          {formatDateTime(row.original.appointmentDate)}
        </DateTimeCell>
      )
    },
  },
  {
    id: 'provider',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Provider" />
    ),
    cell: ({ row }) => (
      <TextCell className="whitespace-nowrap">
        {row.original.providerName}
      </TextCell>
    ),
    enableHiding: true,
  },
  {
    id: 'location',
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
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Type" />
    ),
    cell: ({ row }) => <LongTextCell>{row.original.visitType}</LongTextCell>,
    enableHiding: false,
  },
  {
    id: 'visit-status',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Status" />
    ),
    cell: ({ row }) => <VisitStatusSelectCell row={row} />,
    enableHiding: false,
  },
  {
    id: 'follow-up-actions',
    header: () => <ColumnHeader label="Actions" />,
    cell: ActionsCell,
  },
]

const FollowUpTable = ({ patientId }: { patientId: string }) => {
  const { data, search, loading } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    search: state.search,
  }))

  useEffect(() => {
    search({
      startingDate: new Date().toDateString(),
      endingDate: getEndDate('4week').toDateString(),
    })
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
      <DataTable data={data ?? []} columns={columns} disablePagination sticky />
    </ScrollArea>
  )
}

export { FollowUpTable }
