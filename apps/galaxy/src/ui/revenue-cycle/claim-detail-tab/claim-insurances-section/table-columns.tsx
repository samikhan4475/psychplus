import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { InsuranceClaimPolicy, Sort } from '@/types'
import { ActionsCell } from './table-action-cell'
import { TableCellCoverage } from './table-cell-coverage'

const columns = ( editRowId: number | null,setEditRowId: (id: number | null) => void): ColumnDef<InsuranceClaimPolicy>[] => {
  return [
    {
      id: 'coverage',
      accessorKey: 'coverage',
      header: ({ column }) => (
        <ColumnHeader
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Coverage"
        />
      ),
      cell: ({ row }) => <TableCellCoverage editRowId={editRowId} row={row} />,
      enableHiding: true,
    },
    {
      id: 'insuranceName',
      accessorKey: 'insuranceName',
      header: ({ column }) => (
        <ColumnHeader
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
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Relationship"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original?.policyHolderRelationship}</TextCell>,

      enableHiding: true,
    },
    {
      id: 'address',
      accessorKey: 'address',
      header: ({ column }) => (
        <ColumnHeader
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
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Status"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original?.claimStatus}</TextCell>,

      enableHiding: true,
    },
    {
      id: 'actions-column',
      header: () => <ColumnHeader label="Actions" className="!font-medium" />,
      cell: ({ row }) => (
        <ActionsCell
          item={row.original}
          onEdit={() => setEditRowId(row.index)}
        />
      ),
      enableHiding: false,
    },
  ]
}

export { columns }
