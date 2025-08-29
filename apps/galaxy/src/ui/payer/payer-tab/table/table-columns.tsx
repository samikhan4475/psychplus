import { Badge } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { PayerResponse, Sort } from '@/types'
import { getSortDir } from '@/utils'
import { ActionsCell } from '.'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<PayerResponse>[] => {
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
      id: 'recordStatus',
      header: ({ column }) => (
        <ColumnHeader
          label="Payer Status"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => {
        const isActive = row.original.recordStatus === 'Active'
        return (
          <Badge
            color={isActive ? 'green' : 'red'}
            size="1"
            className="rounded-1 font-regular"
          >
            {row.original.recordStatus}
          </Badge>
        )
      },
    },
    {
      id: 'actions',
      header: () => <ColumnHeader label="Actions" />,
      cell: ({ row }) => <ActionsCell row={row} />,
    },
  ]
}

export { columns }
