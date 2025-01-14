'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { ActiveVisit } from '../types'
import {
  ActionCell,
  TableHeaderCheckboxCell,
  TableRowCheckboxCell,
} from './cells'

const columns: ColumnDef<ActiveVisit>[] = [
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
    accessorKey: 'patientName',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Patient Name" />
    ),
    cell: ({ row }) => <TextCell>{row.original.patientName}</TextCell>,
  },
  {
    id: 'gender',
    accessorKey: 'gender',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Gender" />
    ),
    cell: ({ row }) => <TextCell>{row.original.gender}</TextCell>,
  },
  {
    id: 'age',
    accessorKey: 'age',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Age" />
    ),
    cell: ({ row }) => <TextCell>{row.original.age}</TextCell>,
  },
  {
    id: 'visitService',
    accessorKey: 'visitService',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Visit Service" />
    ),
    cell: ({ row }) => <TextCell>{row.original.visitService}</TextCell>,
  },
  {
    id: 'visitType',
    accessorKey: 'visitType',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Visit Type" />
    ),
    cell: ({ row }) => <TextCell>{row.original.visitType}</TextCell>,
  },
  {
    id: 'visitStatus',
    accessorKey: 'visitStatus',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Visit Status" />
    ),
    cell: ({ row }) => <TextCell>{row.original.visitStatus}</TextCell>,
  },
  {
    id: 'location',
    accessorKey: 'location',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Location" />
    ),
    cell: ({ row }) => <TextCell>{row.original.location}</TextCell>,
  },
  {
    id: 'dateTime',
    accessorKey: 'dateTime',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Date/Time" />
    ),
    cell: ({ row }) => <TextCell>{row.original.dateTime}</TextCell>,
  },
  {
    id: 'action',
    header: () => <ColumnHeader label="Action" className="!font-medium" />,
    cell: ActionCell,
  },
]

export { columns }
