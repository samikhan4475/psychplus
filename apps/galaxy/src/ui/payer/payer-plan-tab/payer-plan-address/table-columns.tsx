import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { PayerPlan, PayerPlanAddress } from '@/types/payer'
import { ActionsCell } from './table-action-cell'
import { TableCellStatus } from './table-column-status'

const columns = (): ColumnDef<PayerPlanAddress>[] => {
  return [
    {
      id: 'address1',
      header: ({ column }) => <ColumnHeader label="Address 1" />,
      cell: ({ row }) => <TextCell>{row.original.address1}</TextCell>,
    },
    {
      id: 'address2',
      header: ({ column }) => <ColumnHeader label="Address 2" />,
      cell: ({ row }) => <TextCell>{row.original.address2}</TextCell>,
    },
    {
      id: 'city',
      header: ({ column }) => <ColumnHeader label="City" />,
      cell: ({ row }) => <TextCell>{row.original.city}</TextCell>,
    },

    {
      id: 'state',
      header: ({ column }) => <ColumnHeader label="State" />,
      cell: ({ row }) => <TextCell>{row.original.state}</TextCell>,
    },
    {
      id: 'status',
      header: ({ column }) => <ColumnHeader label="Status" />,
      cell: ({ row }) => <TableCellStatus row={row} />,
    },
    {
      id: 'zip',
      header: ({ column }) => <ColumnHeader label="Zip" />,
      cell: ({ row }) => <TextCell>{row.original.zip}</TextCell>,
    },
    {
      id: 'actions',
      header: () => <ColumnHeader label="Actions" />,
      cell: ({ row }) => <ActionsCell row={row} />,
    },
  ]
}

const mockData: PayerPlanAddress[] = [
  {
    id: '1',
    address1: '123 Main St',
    address2: 'Suite 101',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    status: 'Active',
  },
  {
    id: '2',
    address1: '456 Elm St',
    address2: 'Suite 202',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90001',
    status: 'Inactive',
  },
  {
    id: '3',
    address1: '789 Oak St',
    address2: 'Suite 303',
    city: 'Chicago',
    state: 'IL',
    zip: '60601',
    status: 'Active',
  },
  {
    id: '4',
    address1: '101 Pine St',
    address2: 'Suite 404',
    city: 'Miami',
    state: 'FL',
    zip: '33101',
    status: 'Active',
  },
  {
    id: '5',
    address1: '202 Maple Ave',
    address2: 'Suite 505',
    city: 'San Francisco',
    state: 'CA',
    zip: '94101',
    status: 'Active',
  },
]

export { columns, mockData }
