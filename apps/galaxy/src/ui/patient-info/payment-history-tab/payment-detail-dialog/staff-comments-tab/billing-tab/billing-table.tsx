'use client'

import { Flex, ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, DateCell, TextCell } from '@/components'
import { StaffCommentsBilling } from '../../../types'
import { ActionCell } from './cells'

const columns: ColumnDef<StaffCommentsBilling>[] = [
  {
    accessorKey: 'data_time',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        label="Date/Time"
        className="!text-1 !font-medium"
      />
    ),
    cell: ({ row }) => (
      <Flex width="100%" justify="between" align="center" pl="2">
        <DateCell>{row?.original?.date}</DateCell>
        <DateCell>{row?.original?.time}</DateCell>
      </Flex>
    ),
  },
  {
    accessorKey: 'staff',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        label="Staff"
        className="!text-1 !font-medium"
      />
    ),
    cell: ({ row }) => <TextCell>{row?.original?.staff}</TextCell>,
  },
  {
    id: 'comments',
    header: () => (
      <ColumnHeader
        label="Comments"
        className="min-w-96 !text-1 !font-medium"
      />
    ),
    cell: ({ row }) => <TextCell>{row?.original?.comments}</TextCell>,
  },
  {
    id: 'action',
    cell: ActionCell,
  },
]
const BillingTable = () => {
  return (
    <ScrollArea className="max-h-[125px]">
      <DataTable columns={columns} data={data} sticky disablePagination />
    </ScrollArea>
  )
}
const data: StaffCommentsBilling[] = [...Array(10)].map(() => ({
  comments: 'test',
  date: '04/17/23',
  time: '20:59',
  staff: 'Ronald John, MD ',
}))
export { BillingTable }
