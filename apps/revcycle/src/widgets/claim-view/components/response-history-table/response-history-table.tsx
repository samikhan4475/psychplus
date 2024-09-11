'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { type ColumnDef } from '@tanstack/react-table'
import {
  DataTable,
  DataTableColumnHeader,
  DataTablePageNavigation,
  DataTablePaginationLabel,
} from '@psychplus/ui/data-table'
import { useStore } from '../../store'
import { ResponseHistoryRecord } from '../../types'
import { RowActionDropdown } from './data-table-row.action'
import { FilterForm } from './filter-form'
import { TableCellLongText } from './table-cell-long-text'
import { ClaimSubmissionHistoryPopupDialog } from '../response-history-popup-dialog'

const columns: ColumnDef<ResponseHistoryRecord>[] = [
  {
    id: 'receiverName',
    accessorKey: 'receiverName',
    size: 10,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Receiver Name"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={100} text={row.original.receiverName} />
    ),
    enableHiding: true,
  },
  {
    id: 'submitterName',
    accessorKey: 'submitterName',
    size: 10,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Submitter Name"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={100} text={row.original.submitterName} />
    ),
    enableHiding: true,
  },
  {
    id: 'practiceName',
    accessorKey: 'practiceName',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Practice Name"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={100} text={row.original.practiceName} />
    ),
    enableHiding: true,
  },
  {
    id: 'zipFilePath',
    accessorKey: 'zipFilePath',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="File Path"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        maxWidth={120}
        text={row.original.zipFilePath}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'isProcessed',
    accessorKey: 'isProcessed',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Processing Status"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        maxWidth={100}
        text={`${row.original.isProcessed}`}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'fileCount',
    accessorKey: 'fileCount',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="File Count"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        maxWidth={120}
        text={String(row.original.fileCount)}
      />
    ),
    enableHiding: true,
  },
  {
    id: 'isManualImport',
    accessorKey: 'isManualImport',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Manual Import"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText
        maxWidth={120}
        text={String(row.original.isManualImport)}
      />
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

const ResponseHistoryTable = () => {
  const responseHistoryList = useStore((state) => state.responseHistoryList)
  return (
    <>
      <Box className="shadow-lg">
        <Flex
          py="1"
          justify="start"
          className="border  border-[#b9b3b322] bg-[#fefdfd]"
        >
          <Text size="5" weight="bold">Response History</Text>
        </Flex>
      </Box>
      <ClaimSubmissionHistoryPopupDialog />
      <FilterForm />
      <DataTable
        data={responseHistoryList}
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

export { ResponseHistoryTable }
