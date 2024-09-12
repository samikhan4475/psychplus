'use client'

import { Flex } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  DataTable,
  DataTableColumnHeader,
  DataTablePageNavigation,
  DataTablePaginationLabel,
} from '@psychplus/ui/data-table'
import { useStore } from '../../store'
import { ClaimSubmissionHistory } from '../../types'
import { formattedDate } from '../../utils'
import { ClaimSubmissionHistoryPopupDialog } from '../claim-submission-history-popup-dialog'
import { RowActionDropdown } from './data-table-row.action'
import { FilterForm } from './filter-form'
import { TableCellLongText } from './table-cell-long-text'

const columns: ColumnDef<ClaimSubmissionHistory>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    size: 10,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Batch #"
        className="font-bold text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={100} text={row.original.id} />
    ),
    enableHiding: true,
  },
  {
    id: 'batchName',
    accessorKey: 'batchName',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Batch Name"
        className="font-bold text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={130} text={row.original.batchName} />
    ),
    enableHiding: true,
  },
  {
    id: 'isaControlNumber',
    accessorKey: 'isaControlNumber',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="ICN #"
        className="font-bold text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={120} text={row.original.isaControlNumber} />
    ),
    enableHiding: true,
  },
  {
    id: 'claimCount',
    accessorKey: 'claimCount',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total # of Claims"
        className="font-bold text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={120} text={`${row.original.claimCount}`} />
    ),
    enableHiding: true,
  },
  {
    id: 'batchDate',
    accessorKey: 'batchDate',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Batch Date"
        className="font-bold text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        maxWidth={120}
        text={`${formattedDate(row.original.metadata.createdOn)}`}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'processedDate',
    accessorKey: 'processedDate',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Processed Date"
        className="font-bold text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        maxWidth={120}
        text={`${formattedDate(row.original.processedDate)}`}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'batchType',
    accessorKey: 'batchType',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Batch Type"
        className="font-bold text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={120} text={row.original.batchType} />
    ),
    enableHiding: true,
  },
  {
    id: 'metadata.createdByFullName',
    accessorKey: 'metadata.createdByFullName',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Created By"
        className="font-bold text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        maxWidth={120}
        text={`${row.original.metadata?.createdByFullName}`}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'processed',
    accessorKey: 'processed',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Processed"
        className="font-bold text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={120} text={`${row.original.isProcessed}`} />
    ),
    enableHiding: true,
  },
  {
    id: 'actions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Actions" />
    ),
    enableHiding: false,
    cell: ({ row }) => <RowActionDropdown row={row} />,
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

const SubmissionHistoryTable = () => {
  const claimSubmissionHistoryList = useStore(
    (state) => state.claimSubmissionHistoryList,
  )

  return (
    <>
      <ClaimSubmissionHistoryPopupDialog />
      <FilterForm />
      <DataTable
        data={claimSubmissionHistoryList}
        columns={columns}
        tableClass="border border-solid border-[lightgray] "
        tHeadClass="bg-[#EBF3FC]"
        thClass="border-b border-r border-solid border-[#C1E2FF] text-left"
        isRowPan={true}
        toBodyClass="border-[lightgray]; border-b border-solid"
        columnCellClass="border border-solid border-[#F2F2F2] w-50"
        renderFooter={DataTableFooter}
      />
    </>
  )
}

export { SubmissionHistoryTable }
