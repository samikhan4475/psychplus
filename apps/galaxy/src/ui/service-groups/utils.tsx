import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { Sort } from '@/types'
import { formatDateTime, getSortDir } from '@/utils'
import { ServiceUnit } from '../service-units/types'
import { ServiceGroup } from './types'

export const sharedColumns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<ServiceGroup | ServiceUnit>[] => {
  return [
    {
      id: 'firstName',
      header: ({ column }) => (
        <ColumnHeader
          label="Default Cosigner"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.(column.id)}
        />
      ),
      cell: ({ row }) => (
        <TextCell>
          {row.original?.coSignerName &&
            row.original?.coSignerName?.firstName +
              ' ' +
              row.original?.coSignerName?.lastName}
        </TextCell>
      ),
    },
    {
      id: 'practiceId',
      header: ({ column }) => (
        <ColumnHeader
          label="Default Practice"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.(column.id)}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.practiceId}</TextCell>,
    },
    {
      id: 'createdOn',
      header: ({ column }) => (
        <ColumnHeader
          label="Created on"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.(column.id)}
        />
      ),
      cell: ({ row }) => (
        <TextCell>
          {row.original?.metadata?.createdOn &&
            formatDateTime(row.original?.metadata?.createdOn)}
        </TextCell>
      ),
    },
    {
      id: 'createdBy',
      header: ({ column }) => (
        <ColumnHeader
          label="Created By"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.(column.id)}
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original?.metadata?.createdByFullName}</TextCell>
      ),
    },
  ]
}
