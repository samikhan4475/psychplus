'use client'

import { ColumnHeader, DataTable, TextCell } from '@/components'
import { ColumnDef } from '@tanstack/react-table'
import { PracticesHistory } from '../types'

const columns: ColumnDef<PracticesHistory>[] = [
  {
    id: 'user',
    accessorKey: 'user',
    header: () => <ColumnHeader label="User" />,
    cell: ({ row }) => <TextCell>{row.original.user}</TextCell>,
  },
  {
    id: 'date',
    accessorKey: 'date',
    header: () => <ColumnHeader label="Date/Time" />,
    cell: ({ row }) => <TextCell>{row.original.date}</TextCell>,
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: () => <ColumnHeader label="Status" />,
    cell: ({ row }) => <TextCell>{row.original.status}</TextCell>,
  }
]

interface HistoryDataTableProps {
  data: PracticesHistory[]
}
const HistoryDataTable = ({ data }: HistoryDataTableProps) => {
  return <DataTable columns={columns} data={data} />
}
export { HistoryDataTable }
