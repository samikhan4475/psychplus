import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, LongTextCell, TextCell } from '@/components'
import { formatDateTime, getMaskedPhoneNumber, getPatientPhone } from '@/utils'
import { ActionsCell } from './actions-cell'
import { PrimaryRadioCell } from './primary-radio-cell'
import { Pharmacy } from './types'

const columns = (isFeatureFlagEnabled: boolean): ColumnDef<Pharmacy>[] => {
  const baseColumns: ColumnDef<Pharmacy>[] = [
    {
      accessorKey: 'pharmacyName',
      size: 200,
      header: ({ column }) => (
        <ColumnHeader column={column} clientSideSort label="Pharmacy Name" />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original?.pharmacyName ?? ''}</TextCell>
      ),
    },
    {
      accessorKey: 'address',
      size: 100,
      header: ({ column }) => (
        <ColumnHeader column={column} clientSideSort label="Address" />
      ),
      accessorFn: (row) =>
        row.pharmacyContactDetails?.addresses?.[0]?.street1 ?? '',
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
      accessorFn: (row) =>
        row.pharmacyContactDetails?.addresses?.[0]?.postalCode ?? '',
      cell: ({ row }) => (
        <TextCell>
          {row.original.pharmacyContactDetails?.addresses?.[0]?.postalCode ??
            ''}
        </TextCell>
      ),
    },
    {
      accessorKey: 'city',
      size: 100,
      header: ({ column }) => (
        <ColumnHeader column={column} clientSideSort label="City" />
      ),
      accessorFn: (row) =>
        row.pharmacyContactDetails?.addresses?.[0]?.city ?? '',
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
      accessorFn: (row) =>
        row.pharmacyContactDetails?.addresses?.[0]?.state ?? '',
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
      accessorFn: (row) =>
        row.pharmacyContactDetails?.phoneNumbers?.[0]?.number ?? '',
      cell: ({ row }) => (
        <LongTextCell className="truncate">
          {getMaskedPhoneNumber(
            row.original.pharmacyContactDetails?.phoneNumbers?.[0]?.number ??
              '',
          )}
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

  if (!isFeatureFlagEnabled) {
    baseColumns.unshift({
      accessorKey: 'isPreferred',
      size: 50,
      header: ({ column }) => (
        <ColumnHeader column={column} clientSideSort label="Priority" />
      ),
      cell: ({ row }) => <PrimaryRadioCell row={row} />,
    })

    baseColumns.push({
      accessorKey: 'action',
      size: 100,
      header: ({ column }) => <ColumnHeader column={column} label="Actions" />,
      cell: ({ row }) => (
        <ActionsCell
          pharmacyId={row.original.pharmacyId}
          isFavorite={row.original.isFavorite}
        />
      ),
    })
  }
  return baseColumns
}
export { columns }
