import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { getSlashedDateString } from '@/utils'
import { License } from '../../types'
import { StateNameCell } from './state-name-cell'

const columns: ColumnDef<License>[] = [
  {
    accessorKey: 'states',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="State" />
    ),
    cell: StateNameCell,
  },
  {
    accessorKey: 'License #',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="License #" />
    ),
    cell: ({ row }) => (
      <TextCell className="pl-1">{row.original.licenseNumber}</TextCell>
    ),
  },
  {
    id: 'End Date',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="License Expiration Date" />
    ),
    cell: ({ row }) => (
      <TextCell>
        {getSlashedDateString(row.original?.endDate?.toString() ?? '')}
      </TextCell>
    ),
  },
]

export { columns }
