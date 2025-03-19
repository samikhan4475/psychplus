import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader } from '@/components'
import { Sort } from '@/types'
import { getSortDir } from '@/utils'
import { AlertCell } from './cells/alert-cell'
import { EndDateCell } from './cells/end-date-cell'
import { LicenseCell } from './cells/license-cell'
import { ProviderNameCell } from './cells/provider-name-cell'
import { StartDateCell } from './cells/start-date-cell'
import { StateNameCell } from './cells/state-name-cell'
import { StatusCell } from './cells/status-cell'
import { License } from './types'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<License>[] => [
  {
    accessorFn: (row) => row.legalName.firstName,
    id: 'name',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => onSort?.(column.id)}
        label="Provider"
      />
    ),
    cell: ProviderNameCell,
  },
  {
    accessorKey: 'stateCode',
    id: 'state',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => onSort?.(column.id)}
        label="State"
      />
    ),
    cell: StateNameCell,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <ColumnHeader column={column} label="Status" />,
    cell: StatusCell,
  },
  {
    accessorKey: 'license',
    id: 'number',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => onSort?.(column.id)}
        label="License #"
      />
    ),
    cell: LicenseCell,
  },
  {
    id: 'startDate',
    header: ({ column }) => (
      <ColumnHeader
        sortable
        sortDir={getSortDir(column.id, sort)}
        column={column}
        onClick={() => onSort?.(column.id)}
        label="Start Date"
      />
    ),
    cell: StartDateCell,
  },
  {
    id: 'endDate',
    header: ({ column }) => (
      <ColumnHeader
        sortable
        sortDir={getSortDir(column.id, sort)}
        column={column}
        onClick={() => onSort?.(column.id)}
        label="End Date"
      />
    ),
    cell: EndDateCell,
  },
  {
    id: 'isAlert',
    size: 50,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => onSort?.(column.id)}
        label="Alert"
      />
    ),
    cell: AlertCell,
  },
]

export { columns }
