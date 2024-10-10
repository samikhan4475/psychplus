'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { Sort } from '@/types'
import { formatCurrency, formatDateTime, getSortDir } from '@/utils'
import { ActionsCell, CollapseCell } from './cells'
import { PatientTransaction } from './types'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<PatientTransaction>[] => {
  return [
    {
      id: 'hx',
      header: ({ column }) => <ColumnHeader column={column} label="Hx" />,
      cell: CollapseCell,
      size: 50,
    },
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
            formatDateTime(row?.original?.chargeDate)}
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
      id: 'paymentResponsibility',
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          clientSideSort
          label="Payment Responsibility"
        />
      ),
      cell: ({ row }) => (
        <TextCell className="truncate">
          {row.original?.paymentResponsibility}
        </TextCell>
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
        <TextCell className="truncate">
          {row.original?.paymentDescription}
        </TextCell>
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
        <TextCell className="truncate">{row.original?.description}</TextCell>
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
      id: 'transactionNumber',
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
          label="Transaction #"
        />
      ),
      cell: ({ row }) => (
        <TextCell className="truncate">
          {row.original?.transactionNumber}
        </TextCell>
      ),
    },
    {
      id: 'stripeNumber',
      header: ({ column }) => (
        <ColumnHeader column={column} clientSideSort label="Stripe #" />
      ),
      cell: ({ row }) => <TextCell>{row.original?.stripeNumber}</TextCell>,
    },
    {
      accessorKey: 'metadata.updatedBy',
      header: ({ column }) => (
        <ColumnHeader column={column} clientSideSort label="Updated By" />
      ),
      cell: ({ row }) => (
        <TextCell className="truncate">
          {row.original?.metadata?.updatedByFullName}
        </TextCell>
      ),
    },
    {
      accessorKey: 'metadata.updatedOn',
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          sortable
          clientSideSort
          label="Updated Date"
        />
      ),
      cell: ({ row }) => (
        <TextCell className="truncate">
          {row.original?.metadata?.updatedOn &&
            formatDateTime(row.original?.metadata?.updatedOn)}
        </TextCell>
      ),
    },
    {
      id: 'actions',
      header: ({ column }) => <ColumnHeader column={column} label="Actions" />,
      cell: ActionsCell,
    },
  ]
}
export { columns }
