import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, LongTextCell, TextCell } from '@/components'
import { formatDate, getMaskedPhoneNumber } from '@/utils'
import { Pharmacy } from './types'

const columns: ColumnDef<Pharmacy>[] = [
  {
    accessorKey: 'pharmacyName',
    size: 50,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Name" />
    ),
    cell: ({ row }) => <TextCell>{row.original?.name ?? ''}</TextCell>,
  },
  {
    accessorKey: 'orgID',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Org ID" />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original?.pharmacyOrganizationId ?? ''}</TextCell>
    ),
  },
  {
    accessorKey: 'npi',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="NPI" />
    ),
    cell: ({ row }) => <TextCell>{row.original.npi ?? ''}</TextCell>,
  },
  {
    accessorKey: 'ncpdId',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="NCPDP ID" />
    ),
    cell: ({ row }) => <TextCell>{row.original.ncpdpId ?? ''}</TextCell>,
  },
  {
    accessorKey: 'hcid',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="HCID Store #" />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.healthIdentificationNumber ?? ''}</TextCell>
    ),
  },
  {
    accessorKey: 'serviceLevel',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Service Level" />
    ),
    cell: ({ row }) => (
      <TextCell>
        {row.original.serviceLevel ? row.original.serviceLevel.join(', ') : ''}
      </TextCell>
    ),
  },
  {
    accessorKey: 'phoneNumber',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Phone" />
    ),
    cell: ({ row }) => (
      <LongTextCell className="min-w-24 max-w-32">
        {getMaskedPhoneNumber(
          row.original.contactDetails?.phoneNumbers?.[0]?.number ?? '',
        )}
      </LongTextCell>
    ),
  },
  {
    accessorKey: 'address',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Address" />
    ),
    cell: ({ row }) => (
      <TextCell className="truncate">
        {row.original.contactDetails?.addresses?.[0]?.street1 ?? ''}
      </TextCell>
    ),
  },
  {
    accessorKey: 'directAddress',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Direct Address" />
    ),
    cell: ({ row }) => (
      <TextCell className="truncate">
        {row?.original.contactDetails.email}
      </TextCell>
    ),
  },
  {
    accessorKey: 'status',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Status" />
    ),
    cell: ({ row }) => <TextCell>{row?.original?.resourceStatus}</TextCell>,
  },
  {
    accessorKey: 'enableDates',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Enabled Dates" />
    ),
    cell: ({ row }) => (
      <TextCell className="truncate">
        {row?.original?.enabledDate && formatDate(row?.original.enabledDate)}
      </TextCell>
    ),
  },
  {
    accessorKey: 'activeStartDate',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Active Start Date" />
    ),
    cell: ({ row }) => (
      <TextCell className="truncate">
        {row?.original?.enabledDateFrom && formatDate(row?.original.enabledDateFrom)}
      </TextCell>
    ),
  },
  {
    accessorKey: 'activeEndDate',
    size: 100,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Active End Date" />
    ),
    cell: ({ row }) => (
      <TextCell className="truncate">
        {row?.original?.enabledDateTo && formatDate(row?.original.enabledDateTo)}
      </TextCell>
    ),
  },
]

export { columns }
