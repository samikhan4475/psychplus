import { CalendarDate } from '@internationalized/date'
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
    accessorKey: 'stateName',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="States" />
    ),
    cell: StateNameCell,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <ColumnHeader column={column} label="Status" />,
    cell: StatusCell,
  },
  {
    accessorKey: 'licenseNumber',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="License #" />
    ),
    cell: LicenseCell,
  },
  {
    id: 'startDate',
    accessorKey: 'startDate',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Start Date" />
    ),
    cell: StartDateCell,
    sortingFn: (a, b) => {
      return (
        a.original?.startDate?.compare(b.original?.startDate as CalendarDate) ??
        0
      )
    },
  },
  {
    id: 'endDate',
    accessorKey: 'endDate',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="End Date" />
    ),
    cell: EndDateCell,
    sortingFn: (a, b) => {
      return (
        a.original?.endDate?.compare(b.original?.endDate as CalendarDate) ?? 0
      )
    },
  },
  {
    id: 'alert',
    accessorKey: 'isAlertCheck',
    size: 50,
    header: ({ column }) => (
      <ColumnHeader column={column} label="Alert" clientSideSort />
    ),
    cell: ({ row }) => (
      <AlertCell row={row} showPermissionAlert={showPermissionAlert} />
    ),
    sortingFn: (a, b) => {
      return (
        (b.original?.isAlertCheck ? 1 : 0) - (a.original?.isAlertCheck ? 1 : 0)
      )
    },
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
