import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, LongTextCell, TextCell } from '@/components'
import { Location, Sort } from '@/types'
import { getSortDir } from '@/utils'
import { ActionCell, StateCell, StatusCell } from './cells'

const columns = (
  googleApiKey: string,
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<Location>[] => {
  return [
    {
      id: 'id',
      accessorKey: 'locationNameGenerated',
      header: ({ column }) => (
        <ColumnHeader label="ID" column={column} clientSideSort />
      ),
      cell: ({ row: { original } }) => (
        <LongTextCell className="max-w-44">
          {original?.locationNameGenerated}
        </LongTextCell>
      ),
    },
    {
      id: 'locationType',
      accessorKey: 'locationType',
      header: ({ column }) => (
        <ColumnHeader
          label="Location Type"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row: { original } }) => (
        <TextCell>{original?.locationType}</TextCell>
      ),
    },
    {
      id: 'name',
      accessorKey: 'name',
      header: ({ column }) => (
        <ColumnHeader
          label="Location Name"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row: { original } }) => (
        <LongTextCell className="max-w-44">{original?.name}</LongTextCell>
      ),
    },
    {
      id: 'npi',
      accessorKey: 'npi',
      header: ({ column }) => (
        <ColumnHeader label="NPI" column={column} clientSideSort />
      ),
      cell: ({ row: { original } }) => (
        <LongTextCell>{original?.npi ? original?.npi : 'N/A'}</LongTextCell>
      ),
    },
    {
      id: 'address1',
      accessorKey: 'address.street1',
      header: ({ column }) => (
        <ColumnHeader label="P Address 1" column={column} clientSideSort />
      ),
      cell: ({ row: { original } }) => (
        <LongTextCell>{original?.address?.street1 ?? 'N/A'}</LongTextCell>
      ),
    },
    {
      id: 'address2',
      accessorKey: 'address.street2',
      header: ({ column }) => (
        <ColumnHeader label="P Address 2" column={column} clientSideSort />
      ),
      cell: ({ row: { original } }) => (
        <LongTextCell>{original?.address?.street2 ?? 'N/A'}</LongTextCell>
      ),
    },
    {
      id: 'city',
      accessorKey: 'address.city',
      header: ({ column }) => (
        <ColumnHeader label="City" column={column} clientSideSort />
      ),
      cell: ({ row: { original } }) => (
        <LongTextCell>{original?.address?.city}</LongTextCell>
      ),
    },
    {
      id: 'state',
      accessorKey: 'address.state',
      header: ({ column }) => (
        <ColumnHeader label="State" column={column} clientSideSort />
      ),
      cell: StateCell,
    },
    {
      id: 'zipCode',
      accessorKey: 'address.postalCode',
      header: ({ column }) => (
        <ColumnHeader label="ZIP" column={column} clientSideSort />
      ),
      cell: ({ row: { original } }) => (
        <TextCell>{original?.address?.postalCode}</TextCell>
      ),
    },
    {
      id: 'phone',
      accessorKey: 'phone.number',
      header: ({ column }) => (
        <ColumnHeader label="Phone" column={column} clientSideSort />
      ),
      cell: ({ row: { original } }) => (
        <LongTextCell>{original?.phone?.number ?? 'N/A'}</LongTextCell>
      ),
    },
    {
      id: 'fax',
      accessorKey: 'fax.number',
      header: ({ column }) => (
        <ColumnHeader label="Fax" column={column} clientSideSort />
      ),
      cell: ({ row: { original } }) => (
        <LongTextCell>{original.fax?.number ?? 'N/A'}</LongTextCell>
      ),
    },
    {
      id: 'status',
      accessorKey: 'recordStatus',
      header: ({ column }) => (
        <ColumnHeader label="Status" column={column} clientSideSort />
      ),
      cell: StatusCell,
    },
    {
      id: 'actions',
      header: () => <ColumnHeader label="Actions" />,
      cell: ({ row }) => <ActionCell row={row} googleApiKey={googleApiKey} />,
    },
  ]
}

export { columns }
