import { CheckIcon, Cross2Icon } from '@radix-ui/react-icons'
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
import { FeeSchedule } from '../types'
import { AddFeeScheduleButton } from './add-fee-schedule-button'

const columns: ColumnDef<FeeSchedule>[] = [
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
    id: 'effective date',
    accessorKey: 'effectiveDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Effective Date" />
    ),
    cell: ({ row }) => <TableCellText text={row.original.effectiveDate} />,
  },
  {
    id: 'Term Date',
    accessorKey: 'termDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Term Date" />
    ),
    cell: ({ row }) => <TableCellText text={row.original.termDate} />,
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
]

const DataTableHeader = (table: Table<FeeSchedule>) => {
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
        <AddFeeScheduleButton />
      </Flex>
    </Flex>
  )
}

const DataTableFooter = (table: Table<FeeSchedule>) => (
  <Flex py="3" align="center">
    <DataTableSelectedRowLabel table={table} />
  </Flex>
)

const FeeSchedulesTable = () => {
  const feeSchedules = useStore((state) => state.feeSchedules)

  return (
    <DataTable
      data={feeSchedules}
      columns={columns}
      renderHeader={DataTableHeader}
      renderFooter={DataTableFooter}
    />
  )
}

export { FeeSchedulesTable }
