import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { getSlashedDateString } from '@/utils'
import { PrescriberSettingResponse } from '../../types'

const columns: ColumnDef<PrescriberSettingResponse>[] = [
  {
    accessorKey: 'name',
    size: 200,
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Name" />
    ),
    cell: ({ row }) => <TextCell>{row.original.name.split('_')[1]}</TextCell>,
  },
  {
    accessorKey: 'content',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Value" />
    ),
    cell: ({ row }) => <TextCell>{row.original.content}</TextCell>,
  },
  {
    accessorKey: 'metadata.createdOn',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Updated On" />
    ),
    cell: ({ row }) => (
      <TextCell>
        {getSlashedDateString(row.original?.metadata?.createdOn ?? '')}
      </TextCell>
    ),
  },
  {
    accessorKey: 'metadata.createdByFullName',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Updated By" />
    ),
    cell: ({ row }) => (
      <TextCell>{row.original.metadata?.createdByFullName ?? ''}</TextCell>
    ),
  },
]

export { columns }