'use client'

import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { History } from './types'

const data: History[] = [...Array(5)].map(() => ({
  user: 'John Smith, MD',
  dateTime: '03/21/24 00:00',
  coins: {
    due: '$20',
    paid: '$20',
  },
  balance: {
    due: '$20',
    paid: '$20',
  },
  coPay: {
    due: '$20',
    paid: '$20',
  },
}))
const columns: ColumnDef<History>[] = [
  {
    accessorKey: 'date/time',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Date/Time"
        className="!text-black !font-medium"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.dateTime} </TextCell>,
  },
  {
    id: 'user',
    accessorKey: 'user',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="User"
        className="!text-black !font-medium"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original.user} </TextCell>,
  },
  {
    accessorKey: 'coPay',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="CoPay"
        className="!text-black w-full text-center !font-medium"
      />
    ),
    columns: [
      {
        accessorKey: 'coPay.due',
        header: ({ column }) => (
          <ColumnHeader
            column={column}
            label="Due"
            className="!text-black !font-medium"
          />
        ),
        cell: ({ row }) => <TextCell>{row.original.coPay?.due} </TextCell>,
      },
      {
        accessorKey: 'coPay.paid',
        header: ({ column }) => (
          <ColumnHeader
            column={column}
            label="Paid"
            className="!text-black !font-medium"
          />
        ),
        cell: ({ row }) => <TextCell>{row.original.coPay?.paid} </TextCell>,
      },
    ],
  },
  {
    accessorKey: 'coins',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="CoIns"
        className="!text-black w-full text-center !font-medium"
      />
    ),
    columns: [
      {
        accessorKey: 'coins.due',
        header: ({ column }) => (
          <ColumnHeader
            column={column}
            label="Due"
            className="!text-black !font-medium"
          />
        ),
        cell: ({ row }) => <TextCell>{row.original.coins?.due} </TextCell>,
      },
      {
        accessorKey: 'coins.paid',
        header: ({ column }) => (
          <ColumnHeader
            column={column}
            label="Paid"
            className="!text-black !font-medium"
          />
        ),
        cell: ({ row }) => <TextCell>{row.original.coins?.paid} </TextCell>,
      },
    ],
  },
  {
    accessorKey: 'balance',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        label="Balance"
        className="!text-black w-full text-center !font-medium"
      />
    ),
    columns: [
      {
        accessorKey: 'balance.due',
        header: ({ column }) => (
          <ColumnHeader
            column={column}
            label="Due"
            className="!text-black !font-medium"
          />
        ),
        cell: ({ row }) => <TextCell>{row.original.balance?.due} </TextCell>,
      },
      {
        accessorKey: 'balance.paid',
        header: ({ column }) => (
          <ColumnHeader
            column={column}
            label="Paid"
            className="!text-black !font-medium"
          />
        ),
        cell: ({ row }) => <TextCell>{row.original.balance?.paid}</TextCell>,
      },
    ],
  },
]
const HistoryTable = () => {
  return (
    <ScrollArea className="h-36" scrollbars="vertical">
      <DataTable data={data} columns={columns} isRowSpan />
    </ScrollArea>
  )
}
export { HistoryTable }
