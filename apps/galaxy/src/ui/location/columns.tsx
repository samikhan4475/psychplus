import { ColumnHeader, TextCell } from "@/components"
import { getSortDir } from "@/utils"
import { ColumnDef } from "@tanstack/react-table"
import { LocationType } from "./actions/types"
import { Sort } from "@/types"
import { ColumnCellDropDown } from "./column-cells/column-cell-dropdown"
import { ColumnCellIcon } from "./column-cells/column-cell-icon"

const columns = (
  sort?: Sort,
  onSort?: (column: keyof LocationType) => void, 
): ColumnDef<LocationType>[] => {
  return [
    {
      id: 'id',
      accessorKey: 'id',
      header: ({ column }) => (
        <ColumnHeader
          label="ID"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.('id')}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.id}</TextCell>
    },
    {
      id: 'locationType',
      accessorKey: 'locationType',
      header: ({ column }) => (
        <ColumnHeader
          label="Location Type"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.('locationType')}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.locationType}</TextCell>
    },
    {
      id: 'locationName',
      accessorKey: 'locationNameGenerated',
      header: ({ column }) => (
        <ColumnHeader
          label="Location Name"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.('locationNameGenerated')}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.locationNameGenerated}</TextCell>
    },
    {
      id: 'npi',
      accessorKey: 'npi',
      header: ({ column }) => (
        <ColumnHeader
          label="NPI"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.('npi')}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.npi}</TextCell>
    },
    {
      id: 'address1',
      accessorKey: 'address',
      header: ({ column }) => (
        <ColumnHeader
          label="P Address 1"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.('address')}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.address.street1 || 'N/A'}</TextCell>
    },
    {
      id: 'address2',
      accessorKey: 'address',
      header: ({ column }) => (
        <ColumnHeader
          label="P Address 2"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.('address')}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.address.street2 || "N/A"}</TextCell>
    },
    {
      id: 'city',
      accessorKey: 'address',
      header: ({ column }) => (
        <ColumnHeader
          label="City"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.('address')}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.address.city}</TextCell>
    },
    {
      id: 'state',
      accessorKey: 'address',
      header: ({ column }) => (
        <ColumnHeader
          label="State"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.('address')}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.address.state}</TextCell>
    },
    {
      id: 'zipCode',
      accessorKey: 'address',
      header: ({ column }) => (
        <ColumnHeader
          label="ZIP"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.('address')}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.address.postalCode}</TextCell>
    },
    {
      id: 'phone',
      accessorKey: 'phone',
      header: ({ column }) => (
        <ColumnHeader
          label="Phone"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.('phone')}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.phone?.number || "N/A"}</TextCell>
    },
    {
      id: 'fax',
      accessorKey: 'fax',
      header: ({ column }) => (
        <ColumnHeader
          label="Fax"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.('fax')}
        />
      ),
      cell: ({ row }) => <TextCell> {row.original.fax?.type ? `${row.original.fax.type}: ` : ''}{row.original.fax?.number || "N/A"}</TextCell>
    },
    {
      id: 'status',
      accessorKey: 'recordStatus',
      header: ({ column }) => (
        <ColumnHeader
          label="Status"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.('recordStatus')}
        />
      ),
      cell: ({ row }) => <ColumnCellDropDown status={row.original.recordStatus} /> 
    },
    {
      id: 'actions',
      header: () => <ColumnHeader label="Actions" />,
      cell: ({ row }) => <ColumnCellIcon />
    },
  ];
};



export { columns }