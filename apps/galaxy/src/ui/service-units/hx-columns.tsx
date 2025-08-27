import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { formatDateTime } from '@/utils'
import { ServiceGroup } from '../service-groups/types'
import { ServiceUnit } from './types'

const historyColumns: ColumnDef<ServiceUnit | ServiceGroup>[] = [
  {
    id: 'date',
    accessorKey: 'metadata.updatedOn',
    header: ({ column }) => (
      <ColumnHeader label="Date/Time" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => (
      <TextCell>
        {row.original.metadata?.updatedOn
          ? formatDateTime(row.original.metadata?.updatedOn)
          : row.original.metadata?.createdOn &&
            formatDateTime(row.original.metadata?.createdOn)}
      </TextCell>
    ),
  },
  {
    id: 'user',
    accessorKey: 'metadata.updatedByFullName',
    header: ({ column }) => (
      <ColumnHeader label="User" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => (
      <TextCell>
        {row.original?.metadata?.updatedByFullName
          ? row.original?.metadata?.updatedByFullName
          : row.original?.metadata?.createdByFullName}
      </TextCell>
    ),
  },
  {
    id: 'status',
    accessorKey: 'resourceStatus',
    header: ({ column }) => (
      <ColumnHeader label="Status" sortable clientSideSort column={column} />
    ),
    cell: ({ row }) => <TextCell>{row.original.resourceStatus}</TextCell>,
  },
]

export { historyColumns }
