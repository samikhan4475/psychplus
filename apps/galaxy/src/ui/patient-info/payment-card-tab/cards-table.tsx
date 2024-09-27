'use client'

import { Box, ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, TextCell } from '@/components'
import { CreditCard } from '@/types'
import { formatExpirationDate } from '@/utils'
import {
  ActionsCell,
  CardTypeCell,
  PrimaryRadioCell,
  StatusCell,
} from './cells'

interface CardsTableProps {
  patientCards: CreditCard[]
}

const columns: ColumnDef<CreditCard>[] = [
  {
    id: 'isPrimary',
    size: 50,
    header: () => <ColumnHeader label="Primary" />,
    cell: ({ row }) => <PrimaryRadioCell row={row} />,
  },
  {
    id: 'type',
    accessorKey: 'cardType',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Type of Card" />
    ),
    cell: ({ row }) => <CardTypeCell row={row} />,
  },
  {
    id: 'numberLastFour',
    accessorKey: 'numberLastFour',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        clientSideSort
        label="Credit/Debit Card #"
      />
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
      <ColumnHeader column={column} clientSideSort label="Name on Card" />
    ),
    cell: ({ row }) => (
      <TextCell className="!text-1">{row.original.name}</TextCell>
    ),
  },
  {
    id: 'expiryDate',
    accessorKey: 'expireYear',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Expiration Date" />
    ),
    cell: ({ row }) => (
      <TextCell className="!text-1">
        {formatExpirationDate(
          row?.original?.expireMonth,
          row?.original?.expireYear,
        )}
      </TextCell>
    ),
  },
  {
    id: 'zip',
    accessorKey: 'billingAddress.postalCode',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Billing Zip code" />
    ),
    cell: ({ row }) => (
      <TextCell className="!text-1">
        {row?.original?.billingAddress?.postalCode}
      </TextCell>
    ),
  },
  {
    id: 'status',
    accessorKey: 'isActive',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Card Status" />
    ),
    cell: ({ row }) => <StatusCell row={row} />,
  },
  {
    id: 'action',
    size: 50,
    header: () => <ColumnHeader label="Action" />,
    cell: ({ row }) => <ActionsCell row={row} />,
  },
]

const CreditCardsTable = ({ patientCards }: CardsTableProps) => {
  return (
    <Box className="bg-white rounded-1 p-2 pb-0">
      <ScrollArea className="max-h-[49vh] pb-2">
        <DataTable
          columns={columns}
          data={patientCards ?? []}
          theadClass="bg-indigo-3 z-10"
        />
      </ScrollArea>
    </Box>
  )
}

export { CreditCardsTable }
