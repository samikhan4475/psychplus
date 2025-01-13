'use client'

import { useMemo } from 'react'
import { Flex } from '@radix-ui/themes'
import { Row, type ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DataTable,
  DateTimeCell,
  LoadingPlaceholder,
  LongTextCell,
  TextCell,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Appointment } from '@/types'
import { formatDateCell, formatTimeCell } from '@/ui/schedule/utils'
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
          {formatDateCell(
            row.original.appointmentDate,
            row.original.locationTimezoneId,
          )}{' '}
          {formatTimeCell(
            row.original.appointmentDate,
            row.original.locationTimezoneId,
          )}
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
  const visitStatusCodes = useCodesetCodes(CODESETS.AppointmentStatus)
  const { data, loading } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
  }))

  const inactiveVisitStatusCodes = useMemo(() => {
    return visitStatusCodes
      .filter((code) => {
        const group = code.attributes?.[0].value ?? ''
        const role = code.attributes?.[1].value ?? ''
        if (group === 'Inactive' && role === 'Timed') {
          return true
        }
        return false
      })
      .map((code) => code.value)
  }, [visitStatusCodes])

  const isRowDisabled = (row: Row<Appointment>) => {
    const visitStatus = row.original.visitStatus as string

    if (inactiveVisitStatusCodes.includes(visitStatus)) return true
    return false
  }

  if (loading) {
    return (
      <Flex minHeight="75px" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <DataTable
      data={data ?? []}
      columns={columns}
      isRowDisabled={isRowDisabled}
      disablePagination
      sticky
    />
  )
}

export { FollowUpTable }
