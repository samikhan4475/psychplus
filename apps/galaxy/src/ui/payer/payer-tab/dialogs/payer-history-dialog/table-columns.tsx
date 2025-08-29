import { Badge } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { Sort } from '@/types'
import { PayerAuditHistory } from '@/ui/payer/types'
import { formatDateTime, getSortDir } from '@/utils'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<PayerAuditHistory>[] => {
  return [
    {
      id: 'updatedOn',
      accessorKey: 'metadata.updatedOn',
      header: ({ column }) => (
        <ColumnHeader
          label="Date/Time"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell className="w-[120px]">
          {formatDateTime(row.original?.metadata?.updatedOn) || 'N/A'}
        </TextCell>
      ),
    },
    {
      id: 'payerName',
      header: ({ column }) => (
        <ColumnHeader
          label="Payer Name"
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
  ]
}

export { columns }
