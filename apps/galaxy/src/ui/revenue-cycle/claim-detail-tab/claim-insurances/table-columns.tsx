import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { Sort } from '@/types'
import { getSortDir } from '@/utils'
import { ActionsCell } from './table-action-cell'

interface InsuranceData {
  coverage: string
  insuranceName: string
  policyNumber: string
  relationship: string
  address: string
  payerAddress: string
  status: string
}

const columns = (sort?: Sort): ColumnDef<InsuranceData>[] => {
  return [
    {
      id: 'coverage',
      accessorKey: 'coverage',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Coverage"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.coverage}</TextCell>,
      enableHiding: true,
    },
    {
      id: 'insuranceName',
      accessorKey: 'insuranceName',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Insurance Name"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.insuranceName}</TextCell>,
      enableHiding: true,
    },
    {
      id: 'policyNumber',
      accessorKey: 'insuranceName',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Policy Number"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.policyNumber}</TextCell>,

      enableHiding: true,
    },
    {
      id: 'relationship',
      accessorKey: 'relationship',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Relationship"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.relationship}</TextCell>,

      enableHiding: true,
    },
    {
      id: 'address',
      accessorKey: 'address',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Address"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.address}</TextCell>,

      enableHiding: true,
    },
    {
      id: 'payerAddress',
      accessorKey: 'payerAddress',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Payer Address"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.payerAddress}</TextCell>,

      enableHiding: true,
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: ({ column }) => (
        <ColumnHeader
          sortable
          sortDir={getSortDir(column.id, sort)}
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Status"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.status}</TextCell>,

      enableHiding: true,
    },
    {
      id: 'actions-column',
      header: () => <ColumnHeader label="Actions" className="!font-medium" />,
      cell: ({ row }) => <ActionsCell />,
      enableHiding: false,
    },
  ]
}

const dummyData: InsuranceData[] = [
  {
    coverage: 'Primary',
    insuranceName: 'BCBS- Insurance 1',
    policyNumber: '78910',
    relationship: '18 Self',
    address: '217 Mackenzie Drive',
    payerAddress: '-',
    status: 'New Charge',
  },
  {
    coverage: 'Secondary',
    insuranceName: '1199 National Insurance',
    policyNumber: '10987',
    relationship: '18 Self',
    address: '217 Mackenzie Drive',
    payerAddress: '-',
    status: 'N/A',
  },
]
export { columns, dummyData }
