'use client'

import { Flex, ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, DateCell, TextCell } from '@/components'
import { StaffCommentsTreatment } from '../../../../types'
import { ActionCell } from './cells'

const columns: ColumnDef<StaffCommentsTreatment>[] = [
  {
    accessorKey: 'data_time',
    cell: ({ row }) => (
      <Flex width="100%" justify="between" align="center" pl="2">
        <DateCell>{row?.original?.date}</DateCell>
        <DateCell>{row?.original?.time}</DateCell>
      </Flex>
    ),
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Date/Time"
        className="!text-1 !font-medium"
        sortable
      />
    ),
  },
  {
    accessorKey: 'staff',
    cell: ({ row }) => <TextCell>{row?.original?.staff}</TextCell>,
    header: ({ column }) => (
      <ColumnHeader
        sortable
        column={column}
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
        className="min-w-80 !text-1 !font-medium"
        label="Comments"
      />
    ),
  },
  {
    id: 'action',
    cell: ActionCell,
  },
]

const TreatmentTable = () => {
  return (
    <ScrollArea className="max-h-[150px]">
      <DataTable data={data} columns={columns} sticky disablePagination />
    </ScrollArea>
  )
}

const data: StaffCommentsTreatment[] = [...Array(10)].map(() => ({
  date: '04/17/23',
  comments: 'test',
  staff: 'Ronald John, MD ',
  time: '20:59',
}))

export { TreatmentTable }
