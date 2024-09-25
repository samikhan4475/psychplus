'use client'

import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { type PatientHistory } from '../../types'

const columns: ColumnDef<PatientHistory>[] = [
  {
    accessorKey: 'dateTime',
    header: ({ column }) => (
      <ColumnHeader label="Date/time" sortable column={column} />
    ),
    cell: ({ row }) => <TextCell>{row.original.dateTime}</TextCell>,
  },
  {
    accessorKey: 'username',
    header: ({ column }) => (
      <ColumnHeader sortable column={column} label="Username" />
    ),
    cell: ({ row }) => <TextCell>{row?.original?.username}</TextCell>,
  },
]
const PatientHistoryTable = () => {
  return (
    <ScrollArea className="max-h-[calc(100vh_-_180px)] min-w-[224px]">
      <DataTable columns={columns} data={data} sticky />
    </ScrollArea>
  )
}

const data: PatientHistory[] = [...Array(200)].map(() => ({
  dateTime: '12/12/2024',
  username: 'John Robert Smith',
}))
export { PatientHistoryTable }
