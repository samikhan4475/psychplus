'use client'

import { Flex } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  DataTable,
  DataTableColumnHeader,
  DataTablePageNavigation,
  DataTablePaginationLabel,
} from '@psychplus/ui/data-table'
import { RowActionDropdown } from './data-table-row.action'
import { TableCellLongText } from './table-cell-long-text'
import { SubmissionResponseType } from './types'

const columns: ColumnDef<SubmissionResponseType>[] = [
  {
    id: 'entryDate',
    size: 10,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Entry Date"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={100} text={row.original.entry_date} />
    ),
    enableHiding: true,
  },
  {
    id: 'statusDate',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status Date"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={130} text={row.original.status_date} />
    ),
    enableHiding: true,
  },
  {
    id: 'status',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Status"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={120} text={row.original.status} />
    ),
    enableHiding: true,
  },
  {
    id: 'patientAccount',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Patient Account"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={100} text={row.original.patient_account} />
    ),
    enableHiding: true,
  },
  {
    id: 'response',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Response"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={120} text={row.original.response} />
    ),
    enableHiding: true,
  },
  {
    id: 'responseFrom',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Response From"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={120} text={row.original.response_from} />
    ),
    enableHiding: true,
  },
  {
    id: 'categoryCode',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Category Code"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={120} text={row.original.category_code} />
    ),
    enableHiding: true,
  },
  {
    id: 'statusCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status Code" />
    ),
    enableHiding: false,
    cell: ({ row }) => (
      <TableCellLongText maxWidth={120} text={row.original.status_code} />
    ),
  },
  {
    id: 'payerControl',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payer Control" />
    ),
    enableHiding: false,
    cell: ({ row }) => (
      <TableCellLongText maxWidth={120} text={row.original.payer_control} />
    ),
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    enableHiding: false,
    cell: () => <RowActionDropdown />,
  },
]

const DataTableFooter = (table: any) => (
  <Flex py="1" align="center" justify="end">
    <Flex gap="3" align="center">
      <DataTablePaginationLabel table={table} />
      <DataTablePageNavigation table={table} />
    </Flex>
  </Flex>
)

const SubmissionResponse = () => {
  return (
    <DataTable
      data={[]}
      columns={columns}
      tableClass="border border-solid border-[lightgray] "
      tHeadClass="bg-[#EBF3FC]"
      thClass="border-b border-r border-solid border-[#C1E2FF] text-left"
      isRowPan={true}
      toBodyClass="border-[lightgray]; border-b border-solid"
      columnCellClass="border border-solid border-[#F2F2F2] w-50"
      renderFooter={DataTableFooter}
    />
  )
}

export { SubmissionResponse }
