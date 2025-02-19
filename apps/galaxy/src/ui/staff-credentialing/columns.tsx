import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader } from '@/components'
import { ActionsCell } from './cells/actions-cell'
import { AlertCell } from './cells/alert-cell'
import { EndDateCell } from './cells/end-date-cell'
import { LicenseCell } from './cells/license-cell'
import { StartDateCell } from './cells/start-date-cell'
import { StateNameCell } from './cells/state-name-cell'
import { StatusCell } from './cells/status-cell'
import { SchemaType } from './schema'
import { License } from './types'

const columns = (
  onSubmit: (data: SchemaType) => void,
  showPermissionAlert: (isOpen: boolean, message: string) => void,
): ColumnDef<License>[] => [
  {
    accessorKey: 'states',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="States" />
    ),
    cell: StateNameCell,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Status" />
    ),
    cell: StatusCell,
  },
  {
    accessorKey: 'license',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="License #" />
    ),
    cell: LicenseCell,
  },
  {
    id: 'startDate',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Start Date" />
    ),
    cell: StartDateCell,
  },
  {
    id: 'endDate',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="End Date" />
    ),
    cell: EndDateCell,
  },
  {
    id: 'alert',
    size: 50,
    header: () => <ColumnHeader label="Alert" />,
    cell: ({ row }) => (
      <AlertCell row={row} showPermissionAlert={showPermissionAlert} />
    ),
  },
  {
    id: 'actions-column',
    size: 50,
    header: () => <ColumnHeader label="Actions" className="!font-medium" />,
    cell: ({ row }) => (
      <ActionsCell
        onSubmit={onSubmit}
        row={row.original}
        showPermissionAlert={showPermissionAlert}
      />
    ),
  },
]

export { columns }
