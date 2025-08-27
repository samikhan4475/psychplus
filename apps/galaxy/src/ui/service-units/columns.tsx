import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { Sort } from '@/types'
import { formatDateTime, getSortDir } from '@/utils'
import { sharedColumns } from '../service-groups/utils'
import { ActionsCell, ServiceUnitHistoryDialog } from './cells'
import { ServiceUnit } from './types'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<ServiceUnit>[] => {
  return [
    {
      id: 'unit',
      header: ({ column }) => (
        <ColumnHeader
          label="Unit Name/No."
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.(column.id)}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.unit}</TextCell>,
    },
    ...sharedColumns(sort, onSort),
    {
      id: 'resourceStatus',
      header: ({ column }) => (
        <ColumnHeader
          label="Unit Status"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.(column.id)}
        />
      ),
      cell: ServiceUnitHistoryDialog,
    },
    {
      id: 'actions',
      header: ({ column }) => (
        <ColumnHeader
          label="Actions"
          className="min-w-[140px]"
          column={column}
        />
      ),
      cell: ActionsCell,
    },
  ]
}

export { columns }
