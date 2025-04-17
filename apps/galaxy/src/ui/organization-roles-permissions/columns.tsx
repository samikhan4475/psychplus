import { type ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { Role, Sort } from '@/types'
import { formatDateTime, getSortDir } from '@/utils'
import { ActionsCell } from './actions-cell'
import { HxStatusCell } from './hx-status-cell'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<Role>[] => {
  return [
    {
      id: 'shortName',
      header: ({ column }) => (
        <ColumnHeader
          label="Role"
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
      id: 'actorCategory',
      header: ({ column }) => (
        <ColumnHeader
          label="Staff Type"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.actorCategory}</TextCell>,
    },
    {
      id: 'displayName',
      header: ({ column }) => (
        <ColumnHeader
          label="Display Name"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.displayName}</TextCell>,
    },
    {
      id: 'status',
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
      id: 'metadata.createdOn',
      header: ({ column }) => (
        <ColumnHeader
          label="Created On"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{formatDateTime(row.original.metadata.createdOn)}</TextCell>
      ),
    },
    {
      id: 'metadata.createdBy',
      header: ({ column }) => (
        <ColumnHeader
          label="Created By"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original.metadata.createdByFullName}</TextCell>
      ),
    },
    {
      id: 'actions',
      header: () => <ColumnHeader label="Actions" />,
      cell: ({ row }) => <ActionsCell row={row} />,
    },
  ]
}

export { columns }
