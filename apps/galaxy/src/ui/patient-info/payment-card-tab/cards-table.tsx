'use client'

import { Box } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { ActionsCell, CardTypeCell, CardUseCell, StatusCell } from './cells'
import { CreditCard } from './types'

interface CardsTableProps {
  patientCards: CreditCard[]
}

const columns: ColumnDef<CreditCard>[] = [
  {
    id: 'type',
    accessorKey: 'type',
    header: () => <ColumnHeader label="Type of Card" className="text-1" />,
    cell: ({ row }) => <CardTypeCell row={row} />,
  },

  {
    id: 'numberLastFour',
    accessorKey: 'numberLastFour',
    header: () => (
      <ColumnHeader label="Credit/Debit Card #" className="text-1" />
    ),
    cell: ({ row }) => (
      <TextCell className="!text-1">
        XXXX-XXXX-XXXX-{row.original.numberLastFour}
      </TextCell>
    ),
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: () => <ColumnHeader label="Name on Card" className="text-1" />,
    cell: ({ row }) => (
      <TextCell className="!text-1">{row.original.name}</TextCell>
    ),
  },
  {
    id: 'expiryDate',
    accessorKey: 'expiryDate',
    header: () => <ColumnHeader label="Expiration Date" className="text-1" />,
    cell: ({ row }) => (
      <TextCell className="!text-1">{`${row.original.expireMonth}-${row.original.expireYear}`}</TextCell>
    ),
  },
  {
    id: 'zip',
    accessorKey: 'zip',
    header: () => <ColumnHeader label="Billing Zip code" className="text-1" />,
    cell: ({ row }) => (
      <TextCell className="!text-1">
        {row.original.billingAddress.postalCode}
      </TextCell>
    ),
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: () => <ColumnHeader label="Card Status" className="text-1" />,
    cell: ({ row }) => <StatusCell row={row} />,
  },
  {
    id: 'UseCard',
    header: () => <ColumnHeader label="Use Card" className="text-1" />,
    cell: ({ row }) => <CardUseCell row={row} />,
  },
  {
    id: 'action',
    header: () => <ColumnHeader label="Action" className="text-1" />,
    cell: ActionsCell,
  },
]

const CardsTable = ({ patientCards }: CardsTableProps) => {
  return (
    <Box className="bg-white min-h-full min-w-[100%] px-2 py-2">
      <DataTable
        columns={columns}
        data={patientCards ?? []}
        theadClass="bg-indigo-3"
      />
    </Box>
  )
}

export { CardsTable }
