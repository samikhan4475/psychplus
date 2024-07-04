'use client'

import { Box } from '@radix-ui/themes'
import { type ColumnDef, type Table } from '@tanstack/react-table'
import { DataTable, DataTableColumnHeader } from '@psychplus/ui/data-table'
import { TableCellText } from '@psychplus/ui/table-cell'
import { DataTableFooter } from '../master-schedule-footer'
import { SearchForm } from '../master-schedule-search'

interface RowRecord {
  mdDoAmount: string
  npPaAmount: string
  paDAmount: string
  mastersAmount: string
  description: string
  cptCode: string
  id?: string
}

const columns: ColumnDef<RowRecord>[] = [
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Description'} />
    ),
    cell: ({ row }) => (
      <TableCellText text={`${row.original.description ?? 'N/A'}`} />
    ),
  },
  {
    accessorKey: 'cptCode',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'CPT Codes'} />
    ),
    cell: ({ row }) => (
      <TableCellText text={`${row.original.cptCode ?? 'N/A'}`} />
    ),
  },
  {
    accessorKey: 'mddo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'MD/DO'} />
    ),
    cell: ({ row }) => (
      <TableCellText text={`${row.original.mdDoAmount ?? 'N/A'}`} />
    ),
  },
  {
    accessorKey: 'npps',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'NP/PA'} />
    ),
    cell: ({ row }) => (
      <TableCellText text={`${row.original.npPaAmount ?? 'N/A'}`} />
    ),
  },
  {
    accessorKey: 'prev',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'PsyD'} />
    ),
    cell: ({ row }) => (
      <TableCellText text={`${row.original.paDAmount ?? 'N/A'}`} />
    ),
  },
  {
    accessorKey: 'current',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Masters'} />
    ),
    cell: ({ row }) => (
      <TableCellText text={`${row.original.mastersAmount ?? 'N/A'}`} />
    ),
  },
]

const MasterFeeScheduleTable = () => {
  const renderMasterFooter = (table: Table<RowRecord>) => (
    <DataTableFooter table={table} />
  )

  const fetchMasterFeeScheduleRecords = async (item?: string) => {
    // TODO this function will be used to fetch master fee records
  }

  return (
    <Box m="7">
      <SearchForm onSearch={fetchMasterFeeScheduleRecords} />
      <DataTable
        data={[]}
        columns={columns}
        renderFooter={renderMasterFooter}
        tableClass="border border-solid border-[lightgray]"
        tHeadClass="bg-[#EBF3FC] text-black"
        thClass="text-center text-black"
        columnCellClass="text-center text-black"
      />
    </Box>
  )
}

export { MasterFeeScheduleTable }
