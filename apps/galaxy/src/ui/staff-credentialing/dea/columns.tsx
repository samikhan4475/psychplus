import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { DEA } from '../types'
import { ActionsCell } from './cells/actions-cell'
import { AlertCell } from './cells/alert-cell'
import { EndDateCell } from './cells/end-date-cell'
import { LicenseCell } from './cells/license-cell'
import { StartDateCell } from './cells/start-date-cell'
import { StatusCell } from './cells/status-cell'
import { SchemaType } from './schema'

const columns = (
  onSubmit: (data: SchemaType, rowIndex: number) => void,
): ColumnDef<DEA>[] => [
  {
    accessorKey: 'states',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="States" />
    ),
    cell: ({ row }) => <TextCell>{row.original.state}</TextCell>,
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
    cell: AlertCell,
  },
  {
    id: 'actions-column',
    size: 50,
    header: () => <ColumnHeader label="Actions" className="!font-medium" />,
    cell: ({ row }) => <ActionsCell onSubmit={onSubmit} rowIndex={row.index} />,
  },
]

export { columns }
