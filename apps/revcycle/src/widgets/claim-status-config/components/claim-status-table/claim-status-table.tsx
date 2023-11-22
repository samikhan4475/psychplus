import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons'
import { Flex } from '@radix-ui/themes'
import { type ColumnDef, type Table } from '@tanstack/react-table'
import {
  createDataTableSelectColumn,
  DataTable,
  DataTableBulkActions,
  DataTableColumnHeader,
  DataTableResetFilterButton,
  DataTableRowActions,
  DataTableSelectedRowLabel,
  DataTableTextFilter,
  type BulkAction,
  type RowAction,
} from '@psychplus/ui/data-table'
import { TableCellText } from '@psychplus/ui/table-cell'
import { useClaimStatuses } from '../../store'
import { ClaimStatus } from '../../types'
import { AddClaimStatusButton } from '../add-claim-status'
import { ClaimStatusBulkActionActivate } from './claim-status-bulk-action-activate'
import { ClaimStatusBulkActionDeactivate } from './claim-status-bulk-action-deactivate'
import { ClaimStatusRowActionActivate } from './claim-status-row-action-activate'
import { ClaimStatusRowActionEdit } from './claim-status-row-action-edit'

const rowActions: RowAction<ClaimStatus>[] = [
  {
    id: 'claim-status-row-action-edit',
    render: ClaimStatusRowActionEdit,
  },
  {
    id: 'claim-status-row-action-activate',
    render: ClaimStatusRowActionActivate,
  },
]

const bulkActions: BulkAction<ClaimStatus>[] = [
  {
    id: 'claim-status-bulk-action-activate',
    render: ClaimStatusBulkActionActivate,
  },
  {
    id: 'claim-status-bulk-action-deactivate',
    render: ClaimStatusBulkActionDeactivate,
  },
]

const columns: ColumnDef<ClaimStatus>[] = [
  createDataTableSelectColumn(),
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <TableCellText text={row.original.name} />,
  },
  {
    id: 'due to',
    accessorKey: 'dueTo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due To" />
    ),
    cell: ({ row }) => <TableCellText text={row.original.dueTo} />,
  },
  {
    id: 'created by',
    accessorKey: 'createdBy',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created By" />
    ),
    cell: ({ row }) => <TableCellText text={row.original.createdBy} />,
  },
  {
    id: 'active',
    accessorKey: 'isActive',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Active"
        className="text-center"
      />
    ),
    cell: ({ row }) => (
      <Flex justify="center">
        {row.original.isActive ? (
          <CheckIcon color="green" height={18} width={18} />
        ) : (
          <Cross2Icon color="red" height={18} width={18} />
        )}
      </Flex>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <DataTableRowActions row={row} actions={rowActions} />,
  },
]

const DataTableHeader = (table: Table<ClaimStatus>) => {
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
        <DataTableBulkActions table={table} actions={bulkActions} />
        <AddClaimStatusButton />
      </Flex>
    </Flex>
  )
}

const DataTableFooter = (table: Table<ClaimStatus>) => (
  <Flex py="3" align="center">
    <DataTableSelectedRowLabel table={table} />
  </Flex>
)

const ClaimStatusTable = () => {
  const claimStatuses = useClaimStatuses()

  return (
    <DataTable
      data={claimStatuses}
      columns={columns}
      renderHeader={DataTableHeader}
      renderFooter={DataTableFooter}
    />
  )
}

export { ClaimStatusTable }
