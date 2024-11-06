import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, LongTextCell, TextCell } from '@/components'
import { formatDateTime } from '@/utils'
import { PrimaryRadioCell } from './primary-radio-cell'
import { Pharmacy } from './types'

const columns: ColumnDef<Pharmacy>[] = [
  {
    accessorKey: 'priority',
    size: 50,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Priority" />
    ),
    cell: ({ row }) => <PrimaryRadioCell row={row} />,
  },
  {
    accessorKey: 'pharmacyName',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Pharmacy Name" />
    ),
    cell: ({ row }) => <TextCell>{row.original?.pharmacyName ?? ''}</TextCell>,
  },
  {
    accessorKey: 'address',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Address" />
    ),
    cell: ({ row }) => (
      <TextCell>
        {row.original.pharmacyContactDetails?.addresses?.[0]?.street1 ?? ''}
      </TextCell>
    ),
  },
  {
    accessorKey: 'zipCode',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Zip Code" />
    ),
    cell: ({ row }) => (
      <TextCell>
        {row.original.pharmacyContactDetails?.addresses?.[0]?.postalCode ?? ''}
      </TextCell>
    ),
  },
  {
    accessorKey: 'city',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="City" />
    ),
    cell: ({ row }) => (
      <TextCell>
        {row.original.pharmacyContactDetails?.addresses?.[0]?.city ?? ''}
      </TextCell>
    ),
  },
  {
    accessorKey: 'state',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="State" />
    ),
    cell: ({ row }) => (
      <TextCell>
        {row.original.pharmacyContactDetails?.addresses?.[0]?.state ?? ''}
      </TextCell>
    ),
  },
  {
    accessorKey: 'phoneNumber',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Phone Number" />
    ),
    cell: ({ row }) => (
      <LongTextCell className="min-w-24 max-w-32">
        {row.original.pharmacyContactDetails?.phoneNumbers?.[0]?.number ?? ''}
      </LongTextCell>
    ),
  },
  {
    accessorKey: 'lastUsed',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Last Used" />
    ),
    cell: ({ row }) => (
      <TextCell className="truncate">
        {row?.original?.lastUsed && formatDateTime(row?.original.lastUsed)}
      </TextCell>
    ),
  },
]

export { columns }
