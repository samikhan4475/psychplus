import { type ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DateCell, TextCell } from '@/components'
import { Sort } from '@/types'
import { formatDate, getSortDir } from '@/utils'
import { ActionsCell } from './actions-cell'
import { PreferredPartnerItem } from './types'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<PreferredPartnerItem>[] => {
  return [
    {
      id: 'ppId',
      header: ({ column }) => (
        <ColumnHeader
          className="w-[260px]"
          label="PP ID"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.id}</TextCell>,
    },
    {
      id: 'ppName',
      header: ({ column }) => (
        <ColumnHeader
          label="PP Name"
          className="w-[180px]"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.name}</TextCell>,
    },
    {
      id: 'totalUsers',
      header: ({ column }) => (
        <ColumnHeader
          label="Total Users"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.totalUsers}</TextCell>,
    },
    {
      id: 'totalUserIds',
      header: ({ column }) => (
        <ColumnHeader
          label="Total IDs"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.totalUserIds}</TextCell>,
    },

    {
      id: 'subscriptionStatus',
      header: ({ column }) => (
        <ColumnHeader
          label="PP Status"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.subscriptionStatus}</TextCell>,
    },
    {
      id: 'payerStatus',
      header: ({ column }) => (
        <ColumnHeader
          label="PP Payer Status"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.payerStatus}</TextCell>,
    },
    {
      id: 'individual',
      header: ({ column }) => (
        <ColumnHeader className="w-28" label="Individual" />
      ),
      columns: [
        {
          id: 'individualsCount',
          header: ({ column }) => (
            <ColumnHeader
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
              label="#"
            />
          ),
          cell: ({ row }) => (
            <TextCell>{row.original.individualsCount}</TextCell>
          ),
        },
        {
          id: 'individualRate',
          header: ({ column }) => (
            <ColumnHeader
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
              label="Rate"
            />
          ),
          cell: ({ row }) => <TextCell>{row.original.individualRate}</TextCell>,
        },
      ],
    },
    {
      id: 'Couples',
      header: ({ column }) => <ColumnHeader className="w-28" label="Couples" />,
      columns: [
        {
          id: 'couplesCount',
          header: ({ column }) => (
            <ColumnHeader
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
              label="#"
            />
          ),
          cell: ({ row }) => <TextCell>{row.original.couplesCount}</TextCell>,
        },
        {
          id: 'coupleRate',

          header: ({ column }) => (
            <ColumnHeader
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
              label="Rate"
            />
          ),
          cell: ({ row }) => <TextCell>{row.original.coupleRate}</TextCell>,
        },
      ],
    },
    {
      id: 'family',
      header: ({ column }) => <ColumnHeader className="w-28" label="Family" />,
      columns: [
        {
          id: 'familiesCount',
          header: ({ column }) => (
            <ColumnHeader
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
              label="#"
            />
          ),
          cell: ({ row }) => <TextCell>{row.original.familiesCount}</TextCell>,
        },
        {
          id: 'familyRate',
          header: ({ column }) => (
            <ColumnHeader
              sortable
              sortDir={getSortDir(column.id, sort)}
              onClick={() => {
                onSort?.(column.id)
              }}
              label="Rate"
            />
          ),
          cell: ({ row }) => <TextCell>{row.original.familyRate}</TextCell>,
        },
      ],
    },
    {
      id: 'plusChargeAmount',
      header: ({ column }) => (
        <ColumnHeader
          label="Total Charge Plus"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell hasPayment>{row.original.plusChargeAmount}</TextCell>
      ),
    },
    {
      id: 'serviceChargeAmount',
      header: ({ column }) => (
        <ColumnHeader
          label="Total Charge Service"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell hasPayment>{row.original.serviceChargeAmount}</TextCell>
      ),
    },
    {
      id: 'billingFrequency',
      header: ({ column }) => (
        <ColumnHeader
          label="Billing Frequency"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.billingFrequency}</TextCell>,
    },
    {
      id: 'startDate',
      header: ({ column }) => (
        <ColumnHeader
          label="Start Date"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) =>
        row.original.startDate && (
          <DateCell>
            {formatDate(`${row.original.startDate}`, 'MM/dd/yyyy')}
          </DateCell>
        ),
    },
    {
      id: 'nextPayment',
      header: ({ column }) => (
        <ColumnHeader
          label="Next Payment Date"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) =>
        row.original.nextPaymentDate && (
          <DateCell>
            {formatDate(`${row.original.nextPaymentDate}`, 'MM/dd/yyyy')}
          </DateCell>
        ),
    },
    {
      id: 'paymentStatus',
      header: ({ column }) => (
        <ColumnHeader
          label="Payment Status"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.paymentStatus}</TextCell>,
    },
    {
      id: 'street1',
      header: ({ column }) => (
        <ColumnHeader
          label="Address"
          sortable
          className="w-[240px]"
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => (
        <TextCell>
          {row.original.contactDetails?.addresses?.[0]?.street1 ?? ''}
        </TextCell>
      ),
    },
    {
      id: 'actions',
      header: () => <ColumnHeader label="Actions" />,
      cell: ActionsCell,
    },
  ]
}

export { columns }
