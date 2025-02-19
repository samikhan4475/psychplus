import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { formatDateTime } from '@/utils'
import { ActionCell, StatusCell } from './cells'
import { VacationTime } from './types'

const columns: ColumnDef<VacationTime>[] = [
  {
    accessorKey: 'startDateTime',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="From Date/Time" />
    ),
    cell: ({ row: { original } }) => (
      <TextCell>
        {formatDateTime(original.startDateTime ?? 'N/A', false)}
      </TextCell>
    ),
  },
  {
    accessorKey: 'endDateTime',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="To Date/Time" />
    ),
    cell: ({ row: { original } }) => (
      <TextCell>
        {formatDateTime(original.endDateTime ?? 'N/A', false)}
      </TextCell>
    ),
  },
  {
    id: 'duration',
    accessorKey: 'duration',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Duration" />
    ),
    cell: ({ row: { original } }) => <TextCell>{original.duration}</TextCell>,
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Status" />
    ),
    cell: StatusCell,
  },
  {
    id: 'action',
    size: 10,
    header: () => <ColumnHeader label="Action" className="!font-medium" />,
    cell: ActionCell,
  },
]

export { columns }
