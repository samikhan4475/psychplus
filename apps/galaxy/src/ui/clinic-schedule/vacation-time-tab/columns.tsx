import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { ActionCell, StatusCell } from './cells'
import { VacationsTime } from './types'

const columns: ColumnDef<VacationsTime>[] = [
  {
    accessorKey: 'startDateTime',
    size: 15,
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="From Date/Time" />
    ),
    cell: ({ row: { original } }) => (
      <TextCell>{original.startDateTime}</TextCell>
    ),
  },
  {
    accessorKey: 'endDateTime',
    size: 15,
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="To Date/Time" />
    ),
    cell: ({ row: { original } }) => (
      <TextCell>{original.endDateTime}</TextCell>
    ),
  },
  {
    id: 'duration',
    accessorKey: 'duration',
    size: 15,
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Duration" />
    ),
    cell: ({ row: { original } }) => <TextCell>{original.duration}</TextCell>,
  },
  {
    id: 'status',
    accessorKey: 'status',
    size: 1,
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Status" />
    ),
    cell: StatusCell,
  },
  {
    id: 'action',
    size: 1,
    header: () => <ColumnHeader label="Action" className="!font-medium" />,
    cell: ActionCell,
  },
]

export { columns }
