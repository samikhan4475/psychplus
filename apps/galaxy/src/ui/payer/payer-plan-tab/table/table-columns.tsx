import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { PayerPlanResponse, Sort } from '@/types'
import { getSortDir } from '@/utils'
import { ActionsCell } from './table-cell-action'
import { TableCellStatus } from './table-column-status'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<PayerPlanResponse>[] => {
  return [
    {
      id: 'payerName',
      header: ({ column }) => (
        <ColumnHeader
          label="Payer"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.payerName}</TextCell>,
    },
    {
      id: 'name',
      header: ({ column }) => (
        <ColumnHeader
          label="Plan"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.name}</TextCell>,
    },
    {
      id: 'payerType',
      header: ({ column }) => (
        <ColumnHeader
          label="Payer Type"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.payerTypeDescription}</TextCell>,
    },

    {
      id: 'isActive',
      header: ({ column }) => (
        <ColumnHeader
          label="Plan Status"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TableCellStatus row={row} />,
    },
    {
      id: 'actions',
      header: () => <ColumnHeader label="Actions" />,
      cell: ({ row }) => <ActionsCell row={row} />,
    },
  ]
}

export { columns }
