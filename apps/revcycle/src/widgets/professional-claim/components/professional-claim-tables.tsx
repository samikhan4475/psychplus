import { Flex } from '@radix-ui/themes'
import { type ColumnDef, type Table } from '@tanstack/react-table'
import {
  createDataTableSelectColumn,
  DataTable,
  DataTableColumnHeader,
  DataTableResetFilterButton,
  DataTableSelectedRowLabel,
  DataTableTextFilter,
} from '@psychplus/ui/data-table'
import { TableCellText } from '@psychplus/ui/table-cell'
import { useStore } from '../store'
import { ProfessionalClaim } from '../types'
import { AddProfessionalClaimButton } from './add-professional-claim-button'

const columns: ColumnDef<ProfessionalClaim>[] = [
  createDataTableSelectColumn(),
  {
    id: 'claim id',
    accessorKey: 'claimId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Claim ID" />
    ),
    cell: ({ row }) => <TableCellText text={row.original.claimId} />,
  },
  {
    id: 'Patient',
    accessorKey: 'patient',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Patient" />
    ),
    cell: ({ row }) => <TableCellText text={row.original.patient} />,
  },
  {
    id: 'DOS',
    accessorKey: 'DOS',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="DOS" />
    ),
    cell: ({ row }) => <TableCellText text={row.original.DOS} />,
  },
  {
    id: 'total charges',
    accessorKey: 'totalCharges',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Charges" />
    ),
    cell: ({ row }) => <TableCellText text={row.original.totalCharges} />,
  },
  {
    id: 'balance',
    accessorKey: 'balance',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Balance" />
    ),
    cell: ({ row }) => <TableCellText text={row.original.balance} />,
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => <TableCellText text={row.original.status} />,
  },
  {
    id: 'type',
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => <TableCellText text={row.original.type} />,
  },
]

const DataTableHeader = (table: Table<ProfessionalClaim>) => {
  return (
    <Flex justify="between" py="3">
      <Flex align="center" gap="4">
        <DataTableTextFilter
          column={table.getColumn('name')}
          placeholder="Search..."
          id="claim-status-search-text-input"
        />
        <DataTableResetFilterButton table={table} />
      </Flex>
      <Flex align="center" gap="4">
        <AddProfessionalClaimButton />
      </Flex>
    </Flex>
  )
}

const DataTableFooter = (table: Table<ProfessionalClaim>) => (
  <Flex py="3" align="center">
    <DataTableSelectedRowLabel table={table} />
  </Flex>
)

const ProfessionalClaimTable = () => {
  const professionalClaims = useStore((state) => state.professionalClaims)

  return (
    <DataTable
      data={professionalClaims}
      columns={columns}
      renderHeader={DataTableHeader}
      renderFooter={DataTableFooter}
    />
  )
}

export { ProfessionalClaimTable }
