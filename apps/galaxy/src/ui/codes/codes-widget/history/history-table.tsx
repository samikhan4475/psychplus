'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'

interface CodesHistory {
  user: string
  dateTime: string
  cptCode: string
}

const columns: ColumnDef<CodesHistory>[] = [
  {
    accessorKey: 'user',
    size: 100,
    header: ({ column }) => <ColumnHeader column={column} label="User" />,
    cell: ({ row }) => <TextCell>{row?.original?.user}</TextCell>,
  },
  {
    accessorKey: 'dateTime',
    size: 100,
    header: ({ column }) => <ColumnHeader clientSideSort column={column} label="Date/Time" />,
    cell: ({ row }) => <TextCell>{row?.original?.dateTime}</TextCell>,
  },
  {
    accessorKey: 'cptCode',
    size: 300,
    header: ({ column }) => <ColumnHeader clientSideSort column={column} label="CPT Code" />,
    cell: ({ row }) => <TextCell>{row?.original?.cptCode}</TextCell>,
  },
]

const data: CodesHistory[] = [
  {
    user: 'Faisal Tai',
    dateTime: '03/25/24 1200',
    cptCode: '99202 | 25, 59, 95 | 96127, 96127, 96372, 90836, 99406, 99408, 99050',
  },
  {
    user: 'Irfan Syed',
    dateTime: '03/23/24 1000',
    cptCode: '99202 | 25, 59, 95 | 96127, 96127, 96372',
  },
  {
    user: 'Shelby Simpson',
    dateTime: '03/23/24 0800',
    cptCode: '99202 | 25, 59, 95 | 96127',
  },
]

const CodesHistoryTable = () => {
  return <DataTable columns={columns} data={data} />
}

export { CodesHistoryTable }
