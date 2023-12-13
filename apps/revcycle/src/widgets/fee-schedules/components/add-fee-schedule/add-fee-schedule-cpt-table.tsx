import { Flex } from '@radix-ui/themes'
import { Row, type ColumnDef, type Table } from '@tanstack/react-table'
import {
  DataTable,
  DataTableColumnHeader,
  DataTableResetFilterButton,
  DataTableTextFilter,
} from '@psychplus/ui/data-table'
import { TableCellText } from '@psychplus/ui/table-cell'
import { useCptCodes } from '../../store'
import { Procedure } from '../../types'
import * as dummyProcedureData from './dummyProcedureData.json'

const priceChangeHandler = (value: string, row: Row<Procedure>) => {
  //TODO: Handle the change in value on the basis of API request
  console.log('priceChangeHandler value', value)
  console.log('priceChangeHandler row', row)
}

const columns: ColumnDef<Procedure>[] = [
  {
    id: 'code',
    accessorKey: 'code',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Code" />
    ),
    cell: ({ row }) => <TableCellText text={row.original.code} />,
  },
  {
    id: 'price',
    accessorKey: 'price',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => (
      <input
        type="number"
        defaultValue={row.original.price}
        onBlur={(e) => priceChangeHandler(e?.target?.value, row)}
      />
    ),
  },
  {
    id: 'type',
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => <TableCellText text={row.original.type} />,
  },
  {
    id: 'description',
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => <TableCellText text={row.original.description} />,
  },
]

const DataTableHeader = (table: Table<Procedure>) => {
  return (
    <Flex justify="between" py="3">
      <Flex align="center" gap="4">
        <DataTableTextFilter
          column={table.getColumn('code')}
          placeholder="Search by code..."
          id="fee-schedule-search-text-input"
        />
        <DataTableResetFilterButton table={table} />
      </Flex>
    </Flex>
  )
}

const AddFeeScheduleCptTable = () => {
  const procedureData = dummyProcedureData as Procedure[]
  const cptCodes = useCptCodes()
  console.log('cptCodes', cptCodes)

  return (
    <DataTable
      data={procedureData}
      columns={columns}
      renderHeader={DataTableHeader}
    />
  )
}

export { AddFeeScheduleCptTable }
