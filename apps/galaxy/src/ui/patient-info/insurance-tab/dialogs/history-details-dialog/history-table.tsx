'use client'

import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { InsuranceHistoryData } from '../../types'

const columns: ColumnDef<InsuranceHistoryData>[] = [
  {
    accessorKey: 'dateTime',
    header: ({ column }) => (
      <ColumnHeader
        label="Date/time"
        sortable
        column={column}
        className="px-1 py-0.5 !text-1 !font-medium"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 py-0.5 !text-1 !font-medium">
        {row.original.dateTime}
      </TextCell>
    ),
  },
  {
    accessorKey: 'user.name',
    header: ({ column }) => (
      <ColumnHeader
        sortable
        column={column}
        label="Username"
        className="px-1 py-0.5 !text-1 !font-medium"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="px-1 py-0.5 !text-1 !font-medium">
        {row?.original?.username}
      </TextCell>
    ),
  },
]
const HistoryTable = () => {
  return (
    <ScrollArea className="max-h-[570px] w-full">
      <DataTable columns={columns} data={data} sticky />
    </ScrollArea>
  )
}

const data: InsuranceHistoryData[] = [...Array(20)].map(() => ({
  dateTime: '12/12/2024',
  username: 'John Robert Smith',
}))
export { HistoryTable }
