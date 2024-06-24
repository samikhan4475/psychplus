'use client'

import { Flex } from '@radix-ui/themes'
import { Column, type ColumnDef, type Table } from '@tanstack/react-table'
import { format } from 'date-fns'
import { HealthConcern } from '@psychplus/health-concerns/types'
import {
  DataTable,
  DataTableColumnHeader,
  DataTablePageNavigation,
  DataTablePaginationLabel,
} from '@psychplus/ui/data-table'
import { TableCellLongText, TableCellText } from '@psychplus/ui/table-cell'
import { HealthConcernsTableRowActions } from '.'
import { useStore } from '../store'

const DATE_FORMAT = 'MM/dd/yyyy'

const HealthConcernsTable = () => {
  const data = useStore((state) => state.healthConcerns)

  return (
    <DataTable
      data={data}
      columns={columns}
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
  column: Column<any>
}) => (
  <DataTableColumnHeader
    column={column}
    title={title}
    className="text-3 font-regular text-[#000]"
  />
)

const columns: ColumnDef<HealthConcern>[] = [
  {
    id: 'healthConcernDate',
    accessorKey: 'healthConcernDate',
    header: ({ column }) => <DataTableHeader title="Date" column={column} />,
    cell: ({ row }) => (
      <TableCellText
        text={format(new Date(row.original.healthConcernDate), DATE_FORMAT)}
      />
    ),
  },

  {
    id: 'symptomCodesetUsed',
    accessorKey: 'symptomCodesetUsed',
    header: ({ column }) => <DataTableHeader title="Type" column={column} />,
    cell: ({ row }) => <TableCellText text={row.original.symptomCodesetUsed} />,
  },
  {
    id: 'symptomCode',
    accessorKey: 'symptomCode',
    header: ({ column }) => <DataTableHeader title="Code" column={column} />,
    cell: ({ row }) => <TableCellText text={row.original.symptomCode} />,
  },
  {
    id: 'symptomCodeDescription',
    accessorKey: 'symptomCodeDescription',
    header: ({ column }) => (
      <DataTableHeader title="Description" column={column} />
    ),
    cell: ({ row }) => (
      <TableCellLongText text={row.original.symptomCodeDescription} />
    ),
  },
  {
    id: 'notes',
    accessorKey: 'notes',
    header: ({ column }) => <DataTableHeader title="Notes" column={column} />,
    cell: ({ row }) => <TableCellLongText text={row.original.notes} />,
  },

  {
    id: 'actions',
    header: ({ column }) => <DataTableHeader title="Action" column={column} />,
    cell: (row) => (
      <Flex
        className="h-3 w-9 rounded-1 bg-[#EBF3FC] "
        align="center"
        justify="center"
      >
        <HealthConcernsTableRowActions data={row.row.original} />
      </Flex>
    ),
  },
]

const DataTableFooter = (table: Table<any>) => (
  <Flex py="1" align="center" justify="end">
    <Flex gap="3" align="center">
      <DataTablePaginationLabel table={table} />
      <DataTablePageNavigation table={table} />
    </Flex>
  </Flex>
)

export { HealthConcernsTable }
