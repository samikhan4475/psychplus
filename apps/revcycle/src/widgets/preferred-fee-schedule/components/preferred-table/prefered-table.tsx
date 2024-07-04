'use client'

import { Box } from '@radix-ui/themes'
import { type ColumnDef, type Table } from '@tanstack/react-table'
import { DataTable, DataTableColumnHeader } from '@psychplus/ui/data-table'
import { TableCellText } from '@psychplus/ui/table-cell'
import { PlanScheduleFeeForm } from '@/widgets/plan-fee-schedule/components/plan-fee-form'
import { DataTableFooter } from '../preferred-fee-footer'
import { PreferredFeeSearchForm } from '../preferred-fee-search'

interface PreferredRowRecord {
  mdDoAmount: string
  npPaAmount: string
  psychologyAmount: string
  mastersAmount: string
  cptCode: string
  id?: string
}

interface FeeFormData {
  type: string
  mdDoPercent: number | string
  npPoPercent: number | string
  prPercent: number | string
  psychologyPercent: number | string
  mastersPercent: number | string
}

interface FeeFormFile {
  file: File
  type: string
}

const preferredColumns: ColumnDef<PreferredRowRecord>[] = [
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
      <TableCellText text={`${row.original.psychologyAmount ?? 'N/A'}`} />
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
const PreferTable = ({ payerId }: { payerId: string }) => {
  const renderFooter = (table: Table<PreferredRowRecord>) => (
    <DataTableFooter table={table} />
  )

  const onPreferredFeeFormSubmission = (data: FeeFormData | FeeFormFile) => {
    // TODO API for submit preferred fee form will be used here
  }

  const getPreferredFeeRecords = (item?: string) => {
    // TODO API for fetch preferred fee records will be used here
  }

  return (
    <Box m="7">
      <Box>
        <PreferredFeeSearchForm onPreferredFeeSearch={getPreferredFeeRecords} />
      </Box>
      <PlanScheduleFeeForm onFeeFormSubmit={onPreferredFeeFormSubmission} />
      <DataTable
        data={[]}
        columns={preferredColumns}
        renderFooter={renderFooter}
        tableClass="border border-solid border-[lightgray]"
        tHeadClass="bg-[#EBF3FC]"
        thClass=" text-center"
        columnCellClass="text-center"
      />
    </Box>
  )
}

export { PreferTable }
