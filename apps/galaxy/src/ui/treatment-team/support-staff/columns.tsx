import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { AddedOnCell } from '@/ui/staff-treatment-team/care-teams/cells/added-on-cell'
import { CareTeam } from '@/ui/staff-treatment-team/care-teams/types'
import { sortOnAddedOn } from '@/ui/staff-treatment-team/care-teams/util'
import { getUserFullName } from '@/utils'
import { StatusCell } from './status-cell'

const columns: (heading: string) => ColumnDef<CareTeam>[] = (heading) => [
  {
    accessorKey: 'staffName',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label={heading} />
    ),
    cell: ({ row }) => (
      <TextCell>{getUserFullName(row.original.staffName)}</TextCell>
    ),
  },
  {
    id: 'added-on',
    accessorFn: (row) => row.metadata?.createdOn,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        clientSideSort
        label="Added on - Date/Time"
      />
    ),
    cell: AddedOnCell,
    sortingFn: sortOnAddedOn,
  },
  {
    id: 'status',
    accessorKey: 'recordStatus',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Status" />
    ),
    cell: ({ row }) => <StatusCell row={row} />,
  },
]

export { columns }
