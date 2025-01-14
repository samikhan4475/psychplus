import { Flex } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, SelectCell, TextCell } from '@/components'
import { StatusClockPopover } from '../status-clock-popover'
import { StatusWithUsers } from '../types'

interface StatusClock {
  status: string
  username: string
  date: string
}

const columns: ColumnDef<StatusClock>[] = [
  {
    id: 'username',
    header: ({ column }) => <ColumnHeader column={column} label="User" />,
    cell: ({ row }) => <TextCell>{row.original.username}</TextCell>,
  },
  {
    id: 'date',
    header: ({ column }) => <ColumnHeader column={column} label="Date/Time" />,
    cell: ({ row }) => <TextCell>{row.original.date}</TextCell>,
  },
  {
    id: 'status',
    header: ({ column }) => <ColumnHeader column={column} label="Status" />,
    cell: ({ row }) => <TextCell>{row.original.status}</TextCell>,
  },
]

const StatusCell = ({ status, users }: StatusWithUsers) => {
  return (
    <Flex gapX="1" className="min-w-32" align="center">
      <StatusClockPopover title="Status Hx" columns={columns} data={users} />
      <SelectCell className="flex-1" value={status} options={[]} />
    </Flex>
  )
}

export { StatusCell }
