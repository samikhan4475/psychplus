'use client'

import { Box, ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import {
  ColumnHeader,
  DateCell,
  DataTable as Table,
  TextCell,
} from '@/components'
import { StaffComment } from '@/types'
import { formatDateTime } from '@/utils'
import { ActionCell, CommentCell, UrgentCell } from './cells'

interface DataTableProps {
  data: StaffComment[]
}

const columns: ColumnDef<StaffComment>[] = [
  {
    id: 'commentedOn',
    accessorKey: 'commentedOn',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Date/Time" />
    ),
    cell: ({ row }) => (
      <DateCell>{formatDateTime(row?.original?.commentedOn)}</DateCell>
    ),
  },
  {
    id: 'staffName',
    accessorKey: 'staffName.firstName',
    header: ({ column }) => (
      <ColumnHeader clientSideSort column={column} label="Staff" />
    ),
    cell: ({ row }) => (
      <TextCell>
        {row?.original?.staffName?.firstName}{' '}
        {row?.original?.staffName?.lastName}
      </TextCell>
    ),
  },
  {
    id: 'organization',
    accessorKey: 'organization',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Organization" />
    ),
    cell: ({ row }) => <TextCell>{row?.original?.organization}</TextCell>,
  },
  {
    id: 'comments',
    size: 400,
    header: () => <ColumnHeader label="Comments" />,
    cell: CommentCell,
  },
  {
    id: 'urgent',
    size: 50,
    header: () => <ColumnHeader label="Urgent" />,
    cell: UrgentCell,
  },
  {
    id: 'Action',
    size: 50,
    cell: ActionCell,
  },
]

const DataTable = ({ data }: DataTableProps) => {
  return (
    <Box className="bg-white rounded-1 p-2 shadow-2">
      <ScrollArea className="max-h-[31dvh]" scrollbars="vertical">
        <Table columns={columns} data={data ?? []} sticky theadClass="z-[1]" />
      </ScrollArea>
    </Box>
  )
}

export { DataTable }
