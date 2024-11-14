import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { Sort } from '@/types'
import { PayerPlan } from '@/types/payer'
import { getSortDir } from '@/utils'
import { ActionsCell } from './table-cell-action'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<PayerPlan>[] => {
  return [
    {
      id: 'payer',
      header: ({ column }) => (
        <ColumnHeader
          label="Payer"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.payerName}</TextCell>,
    },
    {
      id: 'plan',
      header: ({ column }) => (
        <ColumnHeader
          label="Plan"
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
      id: 'payerType',
      header: ({ column }) => (
        <ColumnHeader
          label="Payer Type"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.payerType}</TextCell>,
    },

    {
      id: 'payerStatus',
      header: ({ column }) => (
        <ColumnHeader
          label="Payer Status"
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
      id: 'actions',
      header: () => <ColumnHeader label="Actions" />,
      cell: ({ row }) => <ActionsCell row={row} />,
    },
  ]
}

const mockPayerPlans: PayerPlan[] = [
  {
    id: '1',
    payerName: 'Health Insurance Co',
    payerType: 'Private',
    payerStatus: 'Active',
    name: 'Basic Health Plan',
  },
  {
    id: '2',
    payerName: 'Medicare',
    payerType: 'Government',
    payerStatus: 'Active',
    name: 'Senior Citizen Health Plan',
  },
  {
    id: '3',
    payerName: 'Blue Shield',
    payerType: 'Private',
    payerStatus: 'Inactive',
    name: 'Comprehensive Coverage',
  },
  {
    id: '4',
    payerName: 'Medicaid',
    payerType: 'Government',
    payerStatus: 'Pending',
    name: 'Low Income Support Plan',
  },
  {
    id: '5',
    payerName: 'Employer Health',
    payerType: 'Employer Sponsored',
    payerStatus: 'Active',
    name: 'Employee Basic Plan',
  },
  {
    id: '6',
    payerName: 'Veterans Health',
    payerType: 'Government',
    payerStatus: 'Active',
    name: 'Veteran Health Benefits',
  },
  {
    id: '7',
    payerName: 'Family Health Network',
    payerType: 'Private',
    payerStatus: 'Inactive',
    name: 'Family Comprehensive Plan',
  },
  {
    id: '8',
    payerName: 'State Health Services',
    payerType: 'State',
    payerStatus: 'Active',
    name: 'State Basic Health Plan',
  },
  {
    id: '9',
    payerName: 'International Health Inc.',
    payerType: 'Private',
    payerStatus: 'Pending',
    name: 'International Travel Plan',
  },
  {
    id: '10',
    payerName: 'Dental Services Co',
    payerType: 'Private',
    payerStatus: 'Active',
    name: 'Dental Basic Plan',
  },
]

export { columns, mockPayerPlans }
