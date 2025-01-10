import { type ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { Sort } from '@/types'
import { getSortDir } from '@/utils'
import { Organization } from '../types'
import { ActionsCell } from './actions-cell'
import { HxStatusCell } from './hx-status-cell'
import { OrganizationNameCell } from './table-row-organization-name-cell'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<Organization>[] => {
  return [
    {
      id: 'displayName',
      header: ({ column }) => (
        <ColumnHeader
          label="Organization Name"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: OrganizationNameCell,
    },
    {
      id: 'practicesNames',
      header: ({ column }) => (
        <ColumnHeader
          label="Practices"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.practicesNames}</TextCell>,
    },

    {
      id: 'contact',
      header: ({ column }) => <ColumnHeader column={column} label="Contact" />,
      columns: [
        {
          id: 'contactName',
          header: ({ column }) => (
            <ColumnHeader
              label="Name"
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
            />
          ),
          cell: ({ row }) => <TextCell>{row.original.contactName}</TextCell>,
        },
        {
          id: 'contactPhone',
          size: 50,
          header: ({ column }) => (
            <ColumnHeader
              label="Phone Number"
              column={column}
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
            />
          ),
          cell: ({ row }) => <TextCell>{row.original.contactPhone}</TextCell>,
        },
        {
          id: 'contactEmail',
          header: ({ column }) => (
            <ColumnHeader
              label="Email"
              column={column}
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
            />
          ),
          cell: ({ row }) => <TextCell>{row.original.contactEmail}</TextCell>,
        },
      ],
    },
    {
      id: 'organizationAddress.street1',
      header: ({ column }) => (
        <ColumnHeader
          label="Address 1"
          column={column}
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.organizationAddress?.street1}</TextCell>
      ),
    },
    {
      id: 'organizationAddress.street2',
      header: ({ column }) => (
        <ColumnHeader
          label="Address 2"
          column={column}
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.organizationAddress?.street2}</TextCell>
      ),
    },
    {
      id: 'organizationAddress.city',
      header: ({ column }) => (
        <ColumnHeader
          label="City"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.organizationAddress?.city}</TextCell>
      ),
    },
    {
      id: 'organizationAddress.state',
      header: ({ column }) => (
        <ColumnHeader
          label="State"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.organizationAddress?.state}</TextCell>
      ),
    },
    {
      id: 'organizationAddress.postalCode',
      header: ({ column }) => (
        <ColumnHeader
          label="Zip"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.organizationAddress?.postalCode}</TextCell>
      ),
    },
    {
      id: 'recordStatus',
      header: ({ column }) => (
        <ColumnHeader
          label="Status"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <HxStatusCell row={row} />,
    },
    {
      id: 'actions',
      header: () => <ColumnHeader label="Actions" />,
      cell: ({ row }) => <ActionsCell row={row} />,
    },
  ]
}

export { columns }
