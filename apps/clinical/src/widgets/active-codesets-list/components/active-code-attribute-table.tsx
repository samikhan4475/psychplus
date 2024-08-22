'use client'

import { Flex } from '@radix-ui/themes'
import { Column, type ColumnDef, type Table } from '@tanstack/react-table'
import { ActiveCodeAttribute } from '@psychplus/codeset'
import {
  DataTable,
  DataTableColumnHeader,
  DataTablePageNavigation,
  DataTablePaginationLabel,
} from '@psychplus/ui/data-table'
import { TableCellLongText, TableCellText } from '@psychplus/ui/table-cell'

const ActiveCodeAttributesTable = (data: ActiveCodeAttribute[]) => {
  return (
    <DataTable
      data={data || []}
      columns={columns()}
      renderFooter={DataTableFooter}
      initialPageSize={25}
      tableClass="bg-[white]"
      tHeadClass="bg-[#EBF3FC] h-7"
      thClass="border border-solid border-[#CAD8FD] text-center"
      isRowPan={true}
      columnCellClass="border-x border-[#CAD8FD] w-50"
    />
  )
}

const DataTableHeader = ({
  title,
  column,
}: {
  title: string
  column: Column<ActiveCodeAttribute>
}) => (
  <DataTableColumnHeader
    column={column}
    title={title}
    className="text-3 font-regular text-[#000]"
  />
)

const columns = (): ColumnDef<ActiveCodeAttribute>[] => [
  {
    id: 'code',
    header: ({ column }) => <DataTableHeader title="Code" column={column} />,
    cell: ({ row }) => <TableCellText text={row.original.name} />,
  },

  {
    id: 'description',
    header: ({ column }) => (
      <DataTableHeader title="Description" column={column} />
    ),
    cell: ({ row }) => <TableCellLongText text={row.original.content} />,
  },

  {
    id: 'actions',
    header: ({ column }) => <DataTableHeader title="Actions" column={column} />,
    cell: () => (
      <Flex
        className="h-3 w-9 rounded-1 bg-[#EBF3FC] "
        align="center"
        justify="center"
      ></Flex>
    ),
  },
]

const DataTableFooter = (table: Table<ActiveCodeAttribute>) => (
  <Flex py="1" align="center" justify="end">
    <Flex gap="3" align="center">
      <DataTablePaginationLabel table={table} />
      <DataTablePageNavigation table={table} />
    </Flex>
  </Flex>
)

export { ActiveCodeAttributesTable }
