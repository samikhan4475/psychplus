'use client'

import { Flex, ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, DateCell, TextCell } from '@/components'
import { StaffCommentsBilling } from '../../../../types'
import { ActionCell } from './cells'

const columns: ColumnDef<StaffCommentsBilling>[] = [
  {
    accessorKey: 'data_time',
    cell: ({ row }) => (
      <Flex align="center" width="100%" justify="between" pl="2">
        <DateCell>{row?.original?.date}</DateCell>
        <DateCell>{row?.original?.time}</DateCell>
      </Flex>
    ),
    header: ({ column }) => (
      <ColumnHeader
        sortable
        column={column}
        className="!text-1 !font-medium"
        label="Date/Time"
      />
    ),
  },
  {
    accessorKey: 'staff',
    cell: ({ row }) => <TextCell>{row?.original?.staff}</TextCell>,
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        className="!text-1 !font-medium"
        label="Staff"
      />
    ),
  },
  {
    id: 'comments',
    cell: ({ row }) => <TextCell>{row?.original?.comments}</TextCell>,
    header: () => (
      <ColumnHeader
        label="Comments"
        className="min-w-80 !text-1 !font-medium"
      />
    ),
  },
  {
    cell: ActionCell,
    id: 'action',
  },
]

const BillingTable = () => {
  return (
    <ScrollArea className="max-h-[125px]">
      <DataTable data={data} columns={columns} disablePagination sticky />
    </ScrollArea>
  )
}

const data: StaffCommentsBilling[] = [...Array(10)].map(() => ({
  staff: 'Ronald John, MD ',
  comments: 'test',
  time: '20:59',
  date: '04/17/23',
}))

export { BillingTable }
