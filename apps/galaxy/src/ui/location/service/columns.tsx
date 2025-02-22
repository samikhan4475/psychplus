import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, LongTextCell, TextCell } from '@/components'
import { ActionCell, StatusCell } from './cells'
import { LocationService } from './types'

const columns: ColumnDef<LocationService>[] = [
  {
    id: 'id',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="ID" />
    ),
    cell: ({ row }) => <TextCell>{row.original.id}</TextCell>,
  },
  {
    id: 'location-type',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Location Type" />
    ),
    cell: ({ row }) => <TextCell>{row.original.locationType}</TextCell>,
  },

  {
    id: 'location-name',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Location Name" />
    ),
    cell: ({ row }) => <TextCell>{row.original.locationName}</TextCell>,
  },
  {
    id: 'service',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Service" />
    ),
    cell: ({ row }) => <TextCell>{row.original.service}</TextCell>,
  },
  {
    id: 'pos',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="POS" />
    ),
    cell: ({ row }) => <TextCell>{row.original.pos}</TextCell>,
  },
  {
    id: 'taxonomy',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Taxonomy" />
    ),
    cell: ({ row }) => <LongTextCell>{row.original.taxonomy}</LongTextCell>,
  },
  {
    id: 'primaryAddress1',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Primary Address1" />
    ),
    cell: ({ row }) => <TextCell>{row.original.primaryAddress1}</TextCell>,
  },

  {
    id: 'address',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Address2" />
    ),
    cell: ({ row }) => <TextCell>{row.original.address2}</TextCell>,
  },
  {
    id: 'city',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="City" />
    ),
    cell: ({ row }) => <TextCell>{row.original.city}</TextCell>,
  },
  {
    id: 'state',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="State" />
    ),
    cell: ({ row }) => <TextCell>{row.original.state}</TextCell>,
  },
  {
    id: 'zip',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="ZIP" />
    ),
    cell: ({ row }) => <TextCell>{row.original.zip}</TextCell>,
  },
  {
    id: 'psychPlusPolicy',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="PsychPlus Policy" />
    ),
    cell: ({ row }) => <TextCell>{row.original.psychPlusPolicy}</TextCell>,
  },
  {
    id: 'reminder',
    header: ({ column }) => <ColumnHeader column={column} label="Reminder" />,
    columns: [
      {
        accessorKey: 'provNotes',
        header: ({ column }) => (
          <ColumnHeader clientSideSort column={column} label="Prov. Notes" />
        ),
        cell: ({ row }) => (
          <TextCell>{row.original.provNotes ?? 'N/A'}</TextCell>
        ),
        enableHiding: false,
      },
      {
        accessorKey: 'ptVisits',
        header: ({ column }) => (
          <ColumnHeader clientSideSort column={column} label="Pt. Visits" />
        ),
        cell: ({ row }) => (
          <TextCell>{row.original.ptVisits ?? 'N/A'}</TextCell>
        ),
        enableHiding: false,
      },
    ],
  },

  {
    id: 'ehrCode',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="EHR Code" />
    ),
    cell: ({ row }) => <TextCell>{row.original.ehrCode}</TextCell>,
  },
  {
    id: 'maxBookingFrequency',
    header: ({ column }) => (
      <ColumnHeader
        clientSideSort
        column={column}
        label="Max Booking Frequency"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.maxBookingFrequency}</TextCell>,
  },
  {
    id: 'cosignerType',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Cosigner Type" />
    ),
    cell: ({ row }) => <TextCell>{row.original.cosignerType}</TextCell>,
  },
  {
    id: 'cosigner',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Cosigner" />
    ),
    cell: ({ row }) => <TextCell>{row.original.cosigner}</TextCell>,
  },
  {
    id: 'primaryProvider',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Primary Provider" />
    ),
    cell: ({ row }) => <TextCell>{row.original.primaryProvider}</TextCell>,
  },
  {
    id: 'status',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Status" />
    ),
    cell: StatusCell,
  },
  {
    id: 'action',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Actions" />
    ),
    cell: ({ row }) => <ActionCell />,
  },
]

export { columns }
