'use client'

import { Box } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import {
  ActionsCell,
  CardTypeCell,
  PrimaryRadioCell,
  StatusCell,
} from './cells'
import { CreditCard } from './types'

interface CardsTableProps {
  patientCards: CreditCard[]
}

const columns: ColumnDef<CreditCard>[] = [
  {
    id: 'isPrimary',
    header: () => <ColumnHeader label="Primary" />,
    cell: ({ row }) => <PrimaryRadioCell row={row} />,
  },
  {
    id: 'type',
    accessorKey: 'type',
    header: ({ column }) => (
      <ColumnHeader column={column} sortable label="Type of Card" />
    ),
    cell: ({ row }) => <CardTypeCell row={row} />,
  },
  {
    id: 'numberLastFour',
    accessorKey: 'numberLastFour',
    header: ({ column }) => (
      <ColumnHeader column={column} sortable label="Credit/Debit Card #" />
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
    header: ({ column }) => (
      <ColumnHeader column={column} sortable label="Name on Card" />
    ),
    cell: ({ row }) => (
      <TextCell className="!text-1">{row.original.name}</TextCell>
    ),
  },
  {
    id: 'expiryDate',
    accessorKey: 'expiryDate',
    header: ({ column }) => (
      <ColumnHeader column={column} sortable label="Expiration Date" />
    ),
    cell: ({ row }) => (
      <TextCell className="!text-1">{`${row.original.expireMonth}-${row.original.expireYear}`}</TextCell>
    ),
  },
  {
    id: 'zip',
    accessorKey: 'zip',
    header: ({ column }) => (
      <ColumnHeader column={column} sortable label="Billing Zip code" />
    ),
    cell: ({ row }) => (
      <TextCell className="!text-1">
        {row.original.billingAddress.postalCode}
      </TextCell>
    ),
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }) => (
      <ColumnHeader column={column} sortable label="Card Status" />
    ),
    cell: ({ row }) => <StatusCell row={row} />,
  },
  {
    id: 'action',
    header: () => <ColumnHeader label="Action" />,
    cell: ({ row }) => <ActionsCell row={row} />,
  },
]

const CreditCardsTable = ({ patientCards }: CardsTableProps) => {
  return (
    <Box className="bg-white min-h-full min-w-[100%]">
      <DataTable
        columns={columns}
        data={patientCards ?? []}
        theadClass="bg-indigo-3 z-10"
        sticky
      />
    </Box>
  )
}

export { CreditCardsTable }
