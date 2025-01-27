import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { getSlashedDateString } from '@/utils'
import { License } from '../../types'

const columns: ColumnDef<License>[] = [
  {
    accessorKey: 'Date/Time',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Date/Time" />
    ),
    cell: ({ row }) => (
      <TextCell>
        {getSlashedDateString(row.original?.metadata?.createdOn ?? '')}
      </TextCell>
    ),
  },
  {
    accessorKey: 'User',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="User" />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original?.metadata?.createdByFullName}</TextCell>
    ),
  },
  {
    accessorKey: 'Status',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Status" />
    ),
    cell: ({ row }) => <TextCell>{row.original.status}</TextCell>,
  },
  {
    accessorKey: 'License #',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="License #" />
    ),
    cell: ({ row }) => <TextCell>{row.original.licenseNumber}</TextCell>,
  },
  {
    id: 'Start Date',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Start Date" />
    ),
    cell: ({ row }) => (
      <TextCell>
        {getSlashedDateString(row.original?.startDate?.toString() ?? '')}
      </TextCell>
    ),
  },
  {
    id: 'End Date',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="End Date" />
    ),
    cell: ({ row }) => (
      <TextCell>
        {getSlashedDateString(row.original?.endDate?.toString() ?? '')}
      </TextCell>
    ),
  },
]

export { columns }
