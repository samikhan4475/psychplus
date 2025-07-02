import { Flex } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, LongTextCell, TextCell } from '@/components'
import { getMaskedPhoneNumber } from '@/utils'
import { PharmacyFilter } from '../types'
import { PlusIconCell } from './plus-icon-cell'

const columns: ColumnDef<PharmacyFilter>[] = [
  {
    accessorKey: 'priority',
    size: 50,
    header: ({ column }) => <ColumnHeader column={column} label="" />,
    cell: ({ row }) => {
      const pharmacyId = row.original.id ?? ''
      return (
        <Flex align="center" justify="center">
          <PlusIconCell pharmacyId={pharmacyId} />
        </Flex>
      )
    },
  },

  {
    accessorKey: 'name',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Pharmacy Name" />
    ),
    cell: ({ row }) => <TextCell>{row.original.name ?? ''}</TextCell>,
  },
  {
    accessorKey: 'address',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Address" />
    ),
    accessorFn: (row) => row.contactDetails?.addresses?.[0]?.street1 ?? '',
    cell: ({ row }) => (
      <TextCell>
        {row.original.contactDetails?.addresses?.[0]?.street1 ?? ''}
      </TextCell>
    ),
  },
  {
    accessorKey: 'zipCode',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Zip Code" />
    ),
    accessorFn: (row) => row.contactDetails?.addresses?.[0]?.postalCode ?? '',
    cell: ({ row }) => (
      <TextCell>
        {row.original.contactDetails?.addresses?.[0]?.postalCode ?? ''}
      </TextCell>
    ),
  },
  {
    accessorKey: 'postalPlus4Code',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Postal+4" />
    ),
    accessorFn: (row) =>
      row.contactDetails?.addresses?.[0]?.postalPlus4Code ?? '',
    cell: ({ row }) => (
      <TextCell>
        {row.original.contactDetails?.addresses?.[0]?.postalPlus4Code ?? ''}
      </TextCell>
    ),
  },
  {
    accessorKey: 'city',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="City" />
    ),
    accessorFn: (row) => row.contactDetails?.addresses?.[0]?.city ?? '',
    cell: ({ row }) => (
      <TextCell>
        {row.original.contactDetails?.addresses?.[0]?.city ?? ''}
      </TextCell>
    ),
  },
  {
    accessorKey: 'state',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="State" />
    ),
    accessorFn: (row) => row.contactDetails?.addresses?.[0]?.state ?? '',
    cell: ({ row }) => (
      <TextCell>
        {row.original.contactDetails?.addresses?.[0]?.state ?? ''}
      </TextCell>
    ),
  },
  {
    accessorKey: 'phoneNumber',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Phone Number" />
    ),
    accessorFn: (row) => row.contactDetails?.phoneNumbers?.[0]?.number ?? '',
    cell: ({ row }) => (
      <LongTextCell className="min-w-24 max-w-32 truncate">
        {getMaskedPhoneNumber(
          row.original.contactDetails?.phoneNumbers?.[0]?.number ?? '',
        )}
      </LongTextCell>
    ),
  },
  // {
  //   accessorKey: 'lastUsed',
  //   size: 100,
  //   header: ({ column }) => <ColumnHeader column={column} label="Action" />,
  //   cell: ({ row }) => {
  //     const pharmacyId = row.original.id ?? ''
  //     return <StarIconCell pharmacyId={pharmacyId} />
  //   },
  // },
  // TODO: will be handle next phase
]

export { columns }
