import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { sortOnAddedOn } from '@/ui/staff-treatment-team/care-teams/util'
import { getUserFullName } from '@/utils'
import { ProviderTeam } from '../actions/get-providers-of-patients'
import { DateTimeCell } from '../cells/date-time-cell'
import { StatusCell } from './status-cell'
import { TableRowCheckboxCell } from './table-row-checkbox-cell'

const columns: (
  heading: string,
  patientId: string,
  isPsychiatry: boolean,
) => ColumnDef<ProviderTeam>[] = (heading, patientId, isPsychiatry) => [
  {
    id: 'select',
    size: 20,
    header: ({ column }) => <ColumnHeader column={column} label="Primary" />,
    cell: ({ row }) => (
      <TableRowCheckboxCell checked={row.original.isPrimary} />
    ),
  },
  {
    accessorKey: 'staffName',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label={heading} />
    ),
    cell: ({ row }) => (
      <TextCell className="pl-1">
        {getUserFullName(row.original?.staffName)}
      </TextCell>
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
    cell: ({ row: { original } }) => (
      <DateTimeCell metadata={original.metadata} />
    ),
    sortingFn: sortOnAddedOn,
  },
  {
    id: 'status',
    accessorKey: 'recordStatus',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Status" />
    ),
    cell: ({ row }) => (
      <StatusCell row={row} patientId={patientId} isPsychiatry={isPsychiatry} />
    ),
  },
]

export { columns }
