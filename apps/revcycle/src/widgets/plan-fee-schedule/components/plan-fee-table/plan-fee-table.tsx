'use client'

import { Box } from '@radix-ui/themes'
import { type ColumnDef, type Table } from '@tanstack/react-table'
import { DataTable, DataTableColumnHeader } from '@psychplus/ui/data-table'
import { TableCellText } from '@psychplus/ui/table-cell'
import { DataTableFooter } from '@/widgets/preferred-fee-schedule/components/preferred-fee-footer'
import { PreferredFeeSearchForm } from '@/widgets/preferred-fee-schedule/components/preferred-fee-search'
import { PlanScheduleFeeForm } from '../plan-fee-form'

interface PlanRowRecord {
  mdDoAmount: string
  npPaAmount: string
  psychologyAmount: string
  mastersAmount: string
  cptCode: string
  id?: string
}

const columns: ColumnDef<PlanRowRecord>[] = [
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

const PlanFeeScheduleTable = ({ payerId }: { payerId: string }) => {
  const renderFooter = (table: Table<PlanRowRecord>) => (
    <DataTableFooter table={table} />
  )

  return (
    <Box m="7">
      <Box>
        <PreferredFeeSearchForm />
        <PlanScheduleFeeForm />
      </Box>
      <DataTable
        data={[]}
        columns={columns}
        renderFooter={renderFooter}
        tableClass="border border-solid border-[lightgray]"
        tHeadClass="bg-[#EBF3FC]"
      />
    </Box>
  )
}

export { PlanFeeScheduleTable }
