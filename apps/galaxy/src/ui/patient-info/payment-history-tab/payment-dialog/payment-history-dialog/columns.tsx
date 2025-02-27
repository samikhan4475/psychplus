import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, LongTextCell, TextCell } from '@/components'
import { Sort } from '@/types'
import { concatDateTimeAndFormat, formatCurrency, getSortDir } from '@/utils'
import { PatientTransaction } from '../../types'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<PatientTransaction>[] => [
  {
    id: 'chargeDate',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => {
          onSort?.(column.id)
        }}
        label="Date/Time"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="truncate">
        {row?.original?.chargeDate &&
          concatDateTimeAndFormat(
            row?.original?.chargeDate,
            row?.original?.chargeTime,
          )}
      </TextCell>
    ),
  },
  {
    id: 'type',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Charge" />
    ),
    cell: ({ row }) => <TextCell>{row.original?.type}</TextCell>,
  },
  {
    id: 'visitNumber',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => {
          onSort?.(column.id)
        }}
        label="Visit #"
      />
    ),
    cell: ({ row }) => (
      <TextCell className="truncate">{row.original?.visitNumber}</TextCell>
    ),
  },
  {
    accessorKey: 'method',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => {
          onSort?.(column.id)
        }}
        label="Method"
      />
    ),
    cell: ({ row }) => <TextCell>{row.original?.method}</TextCell>,
  },
  {
    id: 'paymentDescription',
    accessorKey: 'paymentDescription',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        clientSideSort
        label="Payment Description"
      />
    ),
    cell: ({ row }) => (
      <LongTextCell className="w-36">
        {row.original?.paymentDescription}
      </LongTextCell>
    ),
  },
  {
    id: 'description',
    accessorKey: 'description',
    header: ({ column }) => (
      <ColumnHeader
        column={column}
        sortable
        sortDir={getSortDir(column.id, sort)}
        onClick={() => {
          onSort?.(column.id)
        }}
        label="Description"
      />
    ),
    cell: ({ row }) => (
      <LongTextCell className="w-32">{row.original?.description}</LongTextCell>
    ),
  },
  {
    id: 'coPay',
    header: ({ column }) => <ColumnHeader column={column} label="Co-Pay" />,
    columns: [
      {
        accessorKey: 'coPayDue',
        header: ({ column }) => <ColumnHeader label="Due" column={column} />,
        cell: ({ row }) => (
          <TextCell>{formatCurrency(row.original?.coPayDue)}</TextCell>
        ),
      },
      {
        accessorKey: 'coPayPaid',
        header: ({ column }) => <ColumnHeader label="Paid" column={column} />,
        cell: ({ row }) => (
          <TextCell>{formatCurrency(row.original?.coPayPaid)}</TextCell>
        ),
      },
    ],
  },
  {
    id: 'coIns',
    header: ({ column }) => <ColumnHeader column={column} label="Co-Ins" />,
    columns: [
      {
        accessorKey: 'coInsuranceDue',
        header: ({ column }) => <ColumnHeader label="Due" column={column} />,
        cell: ({ row }) => (
          <TextCell>{formatCurrency(row.original?.coInsuranceDue)}</TextCell>
        ),
      },
      {
        accessorKey: 'coInsurancePaid',
        header: ({ column }) => <ColumnHeader label="Paid" column={column} />,
        cell: ({ row }) => (
          <TextCell>{formatCurrency(row.original?.coInsurancePaid)}</TextCell>
        ),
      },
    ],
  },
  {
    id: 'balance',
    accessorKey: 'balance',
    header: ({ column }) => <ColumnHeader column={column} label="Balance" />,
    columns: [
      {
        accessorKey: 'balanceDue',
        header: ({ column }) => <ColumnHeader label="Due" column={column} />,
        cell: ({ row }) => (
          <TextCell>{formatCurrency(row.original?.balanceDue)}</TextCell>
        ),
      },
      {
        accessorKey: 'balancePaid',
        header: ({ column }) => <ColumnHeader label="Paid" column={column} />,
        cell: ({ row }) => (
          <TextCell>{formatCurrency(row.original?.balancePaid)}</TextCell>
        ),
      },
    ],
  },
  {
    id: 'transaction',
    accessorKey: 'transaction',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Transaction #" />
    ),
    cell: ({ row }) => (
      <TextCell className="truncate">
        {row.original?.transactionNumber}
      </TextCell>
    ),
  },
  {
    accessorKey: 'stripeNumber',
    header: ({ column }) => (
      <ColumnHeader column={column} clientSideSort label="Stripe #" />
    ),
    cell: ({ row }) => (
      <TextCell className="truncate">{row.original?.stripeNumber}</TextCell>
    ),
  },
]

export { columns }
