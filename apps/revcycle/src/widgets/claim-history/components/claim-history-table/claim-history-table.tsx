'use client'

import { useCallback, useState } from 'react'
import { Box } from '@radix-ui/themes'
import { Column, Row, type ColumnDef, type Table } from '@tanstack/react-table'
import { DataTable, DataTableColumnHeader } from '@psychplus/ui/data-table'
import { TableCellText } from '@psychplus/ui/table-cell'
import { fetchClaimHistory } from '../../api.client'
import { ClaimHistoryFilter } from '../claim-history-filter'
import { DataTableFooter } from '../claim-history-footer'

interface ClaimHistory {
  changeDate: string
  changedBy: string
  sectionName: string
  fieldName: string
  oldValue: string
  newValue: string
}

interface ClaimPayload {
  claimId?: string
  dateFrom?: string
  dateTo?: string
}

const columns: ColumnDef<ClaimHistory>[] = [
  {
    accessorKey: 'dateTime',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Date Time'} />
    ),
    cell: ({ row }) => (
      <TableCellText text={`${row.original.changeDate ?? 'N/A'}`} />
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Name'} />
    ),
    cell: ({ row }) => (
      <TableCellText text={`${row.original.changedBy ?? 'N/A'}`} />
    ),
  },
  {
    accessorKey: 'section',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Section'} />
    ),
    cell: ({ row }) => (
      <TableCellText text={`${row.original.sectionName ?? 'N/A'}`} />
    ),
  },
  {
    accessorKey: 'field',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Field'} />
    ),
    cell: ({ row }) => (
      <TableCellText text={`${row.original.fieldName ?? 'N/A'}`} />
    ),
  },
  {
    accessorKey: 'prev',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Previous Value'} />
    ),
    cell: ({ row }) => (
      <TableCellText text={`${row.original.oldValue ?? 'N/A'}`} />
    ),
  },
  {
    accessorKey: 'current',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Current Value'} />
    ),
    cell: ({ row }) => (
      <TableCellText text={`${row.original.newValue ?? 'N/A'}`} />
    ),
  },
]
const ClaimHistoryTable = ({ claimId }: { claimId: string }) => {
  const [pageRecords, setPageRecords] = useState<ClaimHistory[]>([])
  const renderFooter = (table: Table<ClaimHistory>) => (
    <DataTableFooter table={table} />
  )

  const getClaimHistoryRecords = async (body: ClaimPayload) => {
    const response = await fetchClaimHistory({ ...body, claimId })
    setPageRecords(response as ClaimHistory[])
  }

  return (
    <Box mt="3">
      <ClaimHistoryFilter search={getClaimHistoryRecords} />
      <DataTable
        data={pageRecords}
        columns={columns}
        renderFooter={renderFooter}
        initialPageSize={10}
        tableClass="border border-solid border-[lightgray] mt-5"
        tHeadClass="bg-[#EBF3FC]"
        thClass=" text-center"
        columnCellClass="text-center"
      />
    </Box>
  )
}

export { ClaimHistoryTable }
