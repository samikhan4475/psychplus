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
      id: 'name',
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
      id: 'practices',
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
      cell: ({ row }) => <TextCell>{row.original.shortName}</TextCell>,
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
          cell: ({ row }) => <TextCell>{row.original.shortName}</TextCell>,
        },
        {
          id: 'phone',
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
          cell: ({ row }) => <TextCell>{row.original.phone}</TextCell>,
        },
        {
          id: 'email',
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
          cell: ({ row }) => <TextCell>{row.original.email}</TextCell>,
        },
      ],
    },
    {
      id: 'address1',
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
      cell: ({ row }) => <TextCell>{row.original.address1}</TextCell>,
    },
    {
      id: 'address2',
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
      cell: ({ row }) => <TextCell>{row.original.address2}</TextCell>,
    },
    {
      id: 'city',
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
      cell: ({ row }) => <TextCell>{row.original.city}</TextCell>,
    },
    {
      id: 'state',
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
      cell: ({ row }) => <TextCell>{row.original.state}</TextCell>,
    },
    {
      id: 'zip',
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
      cell: ({ row }) => <TextCell>{row.original.zip}</TextCell>,
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
