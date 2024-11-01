import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { InsuranceClaimPolicy, Sort } from '@/types'
import { getSortDir } from '@/utils'
import { ActionsCell } from './table-action-cell'

const columns = (sort?: Sort): ColumnDef<InsuranceClaimPolicy>[] => {
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
      cell: ({ row }) => (
        <TextCell>{row.original.insurancePolicyPriority}</TextCell>
      ),
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
      cell: ({ row }) => <TextCell>{row.original.policyName}</TextCell>,
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
      cell: ({ row }) => <TextCell>{row.original.groupNumber}</TextCell>,

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
      cell: ({ row }) => <TextCell>{}</TextCell>,

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
      cell: ({ row }) => <TextCell>{''}</TextCell>,

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
      cell: ({ row }) => <TextCell>{''}</TextCell>,

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
      cell: ({ row }) => <TextCell>{row.original.verificationStatus}</TextCell>,

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

export { columns }
