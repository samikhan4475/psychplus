import { Flex } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { PaymentHistoryData } from '../../types'

const columns: ColumnDef<PaymentHistoryData>[] = [
  {
    id: 'dateTime',
    accessorKey: 'dateTime',
    header: ({ column }) => (
      <ColumnHeader column={column} sortable label="Date/Time" />
    ),
    cell: ({ row }) => (
      <Flex>
        <TextCell>{row.original.date}</TextCell>
        <TextCell>{row.original.time}</TextCell>
      </Flex>
    ),
  },
  {
    id: 'charge',
    accessorKey: 'charge',
    header: ({ column }) => (
      <ColumnHeader column={column} sortable label="Charge" />
    ),
    cell: ({ row }) => <TextCell>{row.original.charge}</TextCell>,
  },
  {
    id: 'visit',
    accessorKey: 'visit',
    header: ({ column }) => (
      <ColumnHeader column={column} sortable label="Visit #" />
    ),
    cell: ({ row }) => <TextCell>{row.original.visit}</TextCell>,
  },
  {
    id: 'method',
    accessorKey: 'method',
    header: ({ column }) => (
      <ColumnHeader column={column} sortable label="Method" />
    ),
    cell: ({ row }) => <TextCell>{row.original.method}</TextCell>,
  },
  {
    id: 'paymentDescription',
    accessorKey: 'paymentDescription',
    header: ({ column }) => (
      <ColumnHeader column={column} sortable label="Payment Description" />
    ),
    cell: ({ row }) => <TextCell>{row.original.paymentDescription}</TextCell>,
  },
  {
    id: 'description',
    accessorKey: 'description',
    header: ({ column }) => (
      <ColumnHeader column={column} sortable label="Description" />
    ),
    cell: ({ row }) => <TextCell>{row.original.description}</TextCell>,
  },
  {
    id: 'coPay',
    accessorKey: 'coPay',
    header: ({ column }) => <ColumnHeader column={column} label="Co-Pay" />,
    columns: [
      {
        accessorKey: 'coPay.duePT',
        header: ({ column }) => <ColumnHeader label="DuePT" column={column} />,
        cell: ({ row }) => <TextCell>{row.original.coPay.duePT}</TextCell>,
      },
      {
        accessorKey: 'coPay.duePP',
        header: ({ column }) => <ColumnHeader label="DuePP" column={column} />,
        cell: ({ row }) => <TextCell>{row.original.coPay.duePP}</TextCell>,
      },
      {
        accessorKey: 'coPay.paid',
        header: ({ column }) => <ColumnHeader label="Paid" column={column} />,
        cell: ({ row }) => <TextCell>{row.original.coPay.paid}</TextCell>,
      },
    ],
  },
  {
    id: 'coIns',
    accessorKey: 'coIns',
    header: ({ column }) => <ColumnHeader column={column} label="Co-Ins" />,
    columns: [
      {
        accessorKey: 'coIns.duePT',
        header: ({ column }) => <ColumnHeader label="DuePT" column={column} />,
        cell: ({ row }) => <TextCell>{row.original.coIns.duePT}</TextCell>,
      },
      {
        accessorKey: 'coIns.duePP',
        header: ({ column }) => <ColumnHeader label="DuePP" column={column} />,
        cell: ({ row }) => <TextCell>{row.original.coIns.duePP}</TextCell>,
      },
      {
        accessorKey: 'coIns.paid',
        header: ({ column }) => <ColumnHeader label="Paid" column={column} />,
        cell: ({ row }) => <TextCell>{row.original.coIns.paid}</TextCell>,
      },
    ],
  },
  {
    id: 'balance',
    accessorKey: 'balance',
    header: ({ column }) => <ColumnHeader column={column} label="Balance" />,
    columns: [
      {
        accessorKey: 'balance.duePT',
        header: ({ column }) => <ColumnHeader label="DuePT" column={column} />,
        cell: ({ row }) => <TextCell>{row.original.balance.duePT}</TextCell>,
      },
      {
        accessorKey: 'balance.duePP',
        header: ({ column }) => <ColumnHeader label="DuePP" column={column} />,
        cell: ({ row }) => <TextCell>{row.original.balance.duePP}</TextCell>,
      },
      {
        accessorKey: 'balance.paid',
        header: ({ column }) => <ColumnHeader label="Paid" column={column} />,
        cell: ({ row }) => <TextCell>{row.original.balance.paid}</TextCell>,
      },
    ],
  },
  {
    id: 'transaction',
    accessorKey: 'transaction',
    header: ({ column }) => (
      <ColumnHeader column={column} sortable label="Transaction #" />
    ),
    cell: ({ row }) => <TextCell>{row.original.transaction}</TextCell>,
  },
  {
    id: 'stripe',
    accessorKey: 'stripe',
    header: ({ column }) => (
      <ColumnHeader column={column} sortable label="Stripe #" />
    ),
    cell: ({ row }) => <TextCell>{row.original.stripe}</TextCell>,
  },
]

export { columns }
