'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, LongTextCell, TextCell } from '@/components'
import { Appointment } from '@/types'
import { formatDateTime } from '@/utils'
import {
  ActionCell,
  ServiceCell,
  TableHeaderCheckboxCell,
  TableRowCheckboxCell,
} from './cells'

const columns: ColumnDef<Appointment>[] = [
  {
    id: 'select-cell',
    header: ({ table }) => (
      <TableHeaderCheckboxCell
        checked={table.getIsAllRowsSelected()}
        onCheckedChange={table.toggleAllRowsSelected}
      />
    ),
    cell: ({ row }) => (
      <TableRowCheckboxCell
        checked={row.getIsSelected()}
        onCheckedChange={row.toggleSelected}
      />
    ),
    size: 20,
  },
  {
    id: 'patientName',
    accessorKey: 'name',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Patient Name" />
    ),
    cell: ({ row: { original } }) => (
      <LongTextCell>{original.name}</LongTextCell>
    ),
  },
  {
    id: 'gender',
    accessorKey: 'gender',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Gender" />
    ),
    cell: ({ row: { original } }) => <TextCell>{original?.gender}</TextCell>,
  },
  {
    id: 'age',
    accessorKey: 'age',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Age" />
    ),
    cell: ({ row: { original } }) => <TextCell>{original?.age}</TextCell>,
  },
  {
    id: 'visitService',
    accessorKey: 'service',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Visit Service" />
    ),
    cell: ServiceCell,
  },
  {
    id: 'visitType',
    accessorKey: 'visitType',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Visit Type" />
    ),
    cell: ({ row: { original } }) => (
      <LongTextCell>{original?.visitType}</LongTextCell>
    ),
  },
  {
    id: 'visitStatus',
    accessorKey: 'visitStatus',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Visit Status" />
    ),
    cell: ({ row: { original } }) => (
      <TextCell>{original?.visitStatus}</TextCell>
    ),
  },
  {
    id: 'location',
    accessorKey: 'locationName',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Location" />
    ),
    size: 600,
    cell: ({ row: { original } }) => (
      <LongTextCell>{original?.locationName}</LongTextCell>
    ),
  },
  {
    id: 'appointmentDate',
    accessorKey: 'appointmentDate',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Date/Time" />
    ),
    cell: ({ row: { original } }) => (
      <LongTextCell>
        {formatDateTime(original?.appointmentDate) ?? 'N/A'}
      </LongTextCell>
    ),
  },
  {
    id: 'action',
    header: () => <ColumnHeader label="Action" className="!font-medium" />,
    cell: ActionCell,
  },
]

export { columns }
