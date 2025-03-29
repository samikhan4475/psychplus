import { Flex } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DateCell, TextCell } from '@/components'
import { getSlashedPaddedDateString, getTimeLabel } from '@/utils'
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
    cell: ({ row: { original } }) => {
      const { createdOn } = original?.metadata || {}
      return (
        <Flex justify="between" width="100%" align="center" className="px-1">
          <DateCell className="w-[55px]">
            {getSlashedPaddedDateString(createdOn)}
          </DateCell>
          <DateCell className="text-pp-gray-1">
            {getTimeLabel(createdOn ?? '', false)}
          </DateCell>
        </Flex>
      )
    },
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
