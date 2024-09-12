'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { VisitStatus } from './types'

const data: VisitStatus[] = [
  {
    user: 'John Smith',
    date: '03/21/24 00:00',
    status: 'Scheduled',
  },
  {
    user: 'John Smith',
    date: '03/21/24 00:00',
    status: 'Cancelled - P',
  },
  {
    user: 'John Smith',
    date: '03/21/24 00:00',
    status: 'Inactive',
  },
]
const columns: ColumnDef<VisitStatus>[] = [
  {
    accessorKey: 'date/time',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Date/Time"
        className="!text-black font-medium"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.date} </TextCell>,
  },
  {
    id: 'user',
    accessorKey: 'user',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="User"
        className="!text-black font-medium"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.user} </TextCell>,
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Status"
        className="!text-black font-medium"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.status} </TextCell>,
  },
]
const VisitStatusTable = () => {
  return <DataTable data={data} columns={columns} />
}
export { VisitStatusTable }
