import { useEffect, useState } from 'react'
import { Box, ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { getForwardingMessagesAction } from './actions'
import { ActionCell, StatusCell } from './table-cells'
import { ForwardingMessage } from './types'

const columns: ColumnDef<ForwardingMessage>[] = [
  {
    id: 'staff-name',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Staff Name" />
    ),
    cell: ({ row }) => <TextCell>{row.original.staffName}</TextCell>,
  },
  {
    id: 'credential',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Credentials" />
    ),
    cell: ({ row }) => (
      <TextCell>
        {row.original.type}, {row.original.role}
      </TextCell>
    ),
  },
  {
    id: 'start-date',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Start Date Time" />
    ),
    cell: ({ row }) => (
      <TextCell className="text-nowrap">{row.original.startDate}</TextCell>
    ),
  },
  {
    id: 'end-date',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="End Date Time" />
    ),
    cell: ({ row }) => (
      <TextCell className="text-nowrap">{row.original.endDate}</TextCell>
    ),
  },
  {
    id: 'duration',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Duration" />
    ),
    cell: ({ row }) => (
      <TextCell className="text-nowrap">{row.original.endDate}</TextCell>
    ),
  },
  {
    id: 'task',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Tasks" />
    ),
    cell: ({ row }) => (
      <TextCell className="text-nowrap">
        {row.original.tasks.join(', ')}
      </TextCell>
    ),
  },
  {
    id: 'status',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Status" />
    ),
    cell: ({ row }) => <StatusCell {...row.original.statusWithUsers} />,
  },
  {
    id: 'action',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Actions" />
    ),
    cell: ({ row }) => <ActionCell row={row} />,
  },
]

const ForwardingMessageTable = () => {
  const [data, setData] = useState<ForwardingMessage[]>([])
  const fetchForwardingMessages = async () => {
    const forwardingMessages = await getForwardingMessagesAction()
    setData(forwardingMessages)
  }

  useEffect(() => {
    fetchForwardingMessages()
  }, [])

  return (
    <Box p="2" className="bg-white mt-[3px]">
      <ScrollArea
        scrollbars="horizontal"
        className="w-full max-w-[calc(100vw_-_210px)]"
      >
        <DataTable columns={columns} data={data} />
      </ScrollArea>
    </Box>
  )
}

export { ForwardingMessageTable }
