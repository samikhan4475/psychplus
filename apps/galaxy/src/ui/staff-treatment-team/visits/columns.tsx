import { ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { ColumnHeader, TextCell } from '@/components'
import { ActionsCell } from './cells/action-cell'
import { VisitsList } from './types'

const columns: ColumnDef<VisitsList>[] = [
  {
    accessorKey: 'date/time',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Date/Time" />
    ),
    cell: ({ row }) => (
      <TextCell>
        {format(
          new Date(
            row.original?.metadata?.createdOn ??
              row.original?.metadata?.updatedOn,
          ),
          'MM/dd/yyyy HH:mm',
        )}
      </TextCell>
    ),
  },
  {
    accessorKey: 'patientName',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Patient Name" />
    ),
    cell: ({ row }) => <TextCell>{row.original.patientName}</TextCell>,
  },
  {
    accessorKey: 'gender',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Gender" />
    ),
    cell: ({ row }) => <TextCell>{row.original.gender}</TextCell>,
  },
  {
    id: 'dob',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="DOB" />
    ),
    cell: ({ row }) => <TextCell>{row.original.dob}</TextCell>,
  },
  {
    id: 'mrn',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="MRN" />
    ),
    cell: ({ row }) => <TextCell>{row.original.patientId}</TextCell>,
  },
  {
    id: 'visitId',
    size: 50,
    header: () => <ColumnHeader clientSideSort label="Visit ID" />,
    cell: ({ row }) => <TextCell>{row.original.visitId}</TextCell>,
  },
  {
    id: 'location',
    size: 100,
    header: () => <ColumnHeader clientSideSort label="Location" />,
    cell: ({ row }) => <TextCell>{row.original.locationName}</TextCell>,
  },
  {
    id: 'visitType',
    size: 50,
    header: () => <ColumnHeader clientSideSort label="Visit Type" />,
    cell: ({ row }) => <TextCell>{row.original.visitType}</TextCell>,
  },
  {
    id: 'visitStatus',
    size: 50,
    header: () => <ColumnHeader clientSideSort label="Visit Status" />,
    cell: ({ row }) => <TextCell>{row.original.visitStatus}</TextCell>,
  },
  {
    id: 'actions-column',
    size: 50,
    header: () => <ColumnHeader label="Actions" className="!font-medium" />,
    cell: ActionsCell,
  },
]

export { columns }
