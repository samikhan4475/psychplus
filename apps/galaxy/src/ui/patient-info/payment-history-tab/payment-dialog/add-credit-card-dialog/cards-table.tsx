'use client'

import { ScrollArea } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DataTable, LongTextCell, TextCell } from '@/components'
import { CreditCard } from '@/types'
import { formatExpirationDate } from '@/utils'
import { useStore } from '../store'
import { CardTypeCell, PrimaryRadioCell, StatusCell } from './cells'

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
      <TextCell>XXXX-XXXX-XXXX-{row.original.numberLastFour}</TextCell>
    ),
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Name on Card" />
    ),
    cell: ({ row }) => (
      <TextCell className="truncate">{row.original.name}</TextCell>
    ),
  },
  {
    id: 'expiryDate',
    accessorKey: 'expireYear',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Expiration Date" />
    ),
    cell: ({ row }) => (
      <TextCell>
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
      <LongTextCell className="max-w-56">
        {row?.original?.billingAddress?.postalCode}
      </LongTextCell>
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
]

const CreditCardsTable = () => {
  const { patientCards } = useStore((state) => ({
    patientCards: state.patientCards,
  }))
  return (
    <ScrollArea className="bg-white max-h-[150px] w-full rounded-1">
      <DataTable
        columns={columns}
        data={patientCards ?? []}
        theadClass="bg-indigo-3 z-10"
        sticky
        disablePagination
        tableClass="[&_.rt-ScrollAreaScrollbar]:!hidden"
      />
    </ScrollArea>
  )
}

export { CreditCardsTable }
