import { type ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { Sort } from '@/types'
import { getSortDir } from '@/utils'
import { Staff } from '../staff-management/types'
import { ActionsCell } from './actions-cell'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<Staff>[] => {
  return [
    {
      id: 'ppId',
      header: ({ column }) => (
        <ColumnHeader
          label="PP ID"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'ppName',
      header: ({ column }) => (
        <ColumnHeader
          label="PP Name"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>--</TextCell>,
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
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'totalIds',
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
      cell: ({ row }) => <TextCell>--</TextCell>,
    },

    {
      id: 'ppStatus',
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
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'ppPayerStatus',
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
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'individual',
      header: ({ column }) => (
        <ColumnHeader className="w-28" label="Individual" />
      ),
      columns: [
        {
          id: 'individual_num',
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
          cell: ({ row }) => <TextCell>--</TextCell>,
        },
        {
          id: 'individual_rate',
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
          cell: ({ row }) => <TextCell>--</TextCell>,
        },
      ],
    },
    {
      id: 'Couples',
      header: ({ column }) => <ColumnHeader className="w-28" label="Couples" />,
      columns: [
        {
          id: 'couples_num',
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
          cell: ({ row }) => <TextCell>--</TextCell>,
        },
        {
          id: 'couples_rate',

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
          cell: ({ row }) => <TextCell>--</TextCell>,
        },
      ],
    },
    {
      id: 'family',
      header: ({ column }) => <ColumnHeader className="w-28" label="Family" />,
      columns: [
        {
          id: 'family_num',
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
          cell: ({ row }) => <TextCell>--</TextCell>,
        },
        {
          id: 'family_rate',
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
          cell: ({ row }) => <TextCell>--</TextCell>,
        },
      ],
    },
    {
      id: 'totalChargePlus',
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
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'totalChargeService',
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
      cell: ({ row }) => <TextCell>--</TextCell>,
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
      cell: ({ row }) => <TextCell>--</TextCell>,
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
      cell: ({ row }) => <TextCell>--</TextCell>,
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
      cell: ({ row }) => <TextCell>--</TextCell>,
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
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'address',
      header: ({ column }) => (
        <ColumnHeader
          label="Address"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>--</TextCell>,
    },
    {
      id: 'actions',
      header: () => <ColumnHeader label="Actions" />,
      cell: ActionsCell,
    },
  ]
}

export { columns }
