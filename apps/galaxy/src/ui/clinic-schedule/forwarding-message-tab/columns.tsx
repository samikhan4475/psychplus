'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { formatDateTime, getPatientFullName } from '@/utils'
import { ActionCell, StatusCell } from './cells'
import { ForwardingMessage } from './types'

const columns: ColumnDef<ForwardingMessage>[] = [
  {
    accessorKey: 'staffUserName',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Staff Name" />
    ),
    cell: ({ row }) => (
      <TextCell>{getPatientFullName(row.original?.staffUserName)}</TextCell>
    ),
  },
  {
    accessorKey: 'staffUserName.honors',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Credentials" />
    ),
    cell: ({ row: { original } }) => (
      <TextCell>
        {original?.staffSpecialization ?? 'N/A'},{' '}
        {original?.staffUserName?.honors ?? 'N/A'}
      </TextCell>
    ),
  },
  {
    accessorKey: 'startDateTime',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Start Date Time" />
    ),
    cell: ({ row: { original } }) => (
      <TextCell>{formatDateTime(original?.startDateTime, false)}</TextCell>
    ),
  },
  {
    accessorKey: 'endDateTime',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="End Date Time" />
    ),
    cell: ({ row: { original } }) => (
      <TextCell>{formatDateTime(original?.endDateTime, false)}</TextCell>
    ),
  },
  {
    accessorKey: 'durationInDays',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Duration" />
    ),
    cell: ({ row: { original } }) => (
      <TextCell>{original?.duration} days</TextCell>
    ),
  },
  {
    accessorKey: 'recordStatus',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Status" />
    ),
    cell: StatusCell,
  },
  {
    id: 'action',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Actions" />
    ),
    cell: ActionCell,
  },
]
export { columns }
