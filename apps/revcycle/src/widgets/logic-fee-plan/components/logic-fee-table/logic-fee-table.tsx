'use client'

import { Box, Button } from '@radix-ui/themes'
import { ColumnDef } from '@tanstack/react-table'
import { DataTable, DataTableColumnHeader } from '@psychplus/ui/data-table'
import { TableCellText } from '@psychplus/ui/table-cell'
import { MultiSelectDropdown } from '../logic-fee-selection-field'

const confirmOptionList = [
  {
    label: 'Yes',
    value: 'Yes',
  },
  {
    label: 'No',
    value: 'No',
  },
]

interface LogicFeeScheduleRecord {
  visitType: string
  accpet: string
  subsitute: string
  insurance: string
  mdDoAmount: string
  npPaAmount: string
  psychologyAmount: string
  mastersAmount: string
  description: string
  cptCode: string
  id?: string
}

const logicFeeScheduleColumns: ColumnDef<LogicFeeScheduleRecord>[] = [
  {
    accessorKey: 'Visit Type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Visit Type'} />
    ),
    cell: ({ row }) => (
      <MultiSelectDropdown
        key={'visitType'}
        selectedValue={'Yes'}
        dropdownOptions={confirmOptionList}
      />
    ),
  },
  {
    accessorKey: 'Accept',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Accept'} />
    ),
    cell: ({ row }) => (
      <MultiSelectDropdown
        selectedValue={row.original.accpet}
        dropdownOptions={confirmOptionList}
      />
    ),
  },
  {
    accessorKey: 'Substitute',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Substitute'} />
    ),
    cell: ({ row }) => (
      <MultiSelectDropdown
        selectedValue={row.original.subsitute}
        dropdownOptions={confirmOptionList}
      />
    ),
  },
  {
    accessorKey: 'Sub Codes',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Sub Codes'} />
    ),
    cell: ({ row }) => (
      <MultiSelectDropdown
        selectedValue={row.original.cptCode}
        dropdownOptions={confirmOptionList}
      />
    ),
  },
  {
    accessorKey: 'MD/DO',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'MD/DO'} />
    ),
    cell: ({ row }) => (
      <TableCellText text={`${row.original.mdDoAmount ?? 'N/A'}`} />
    ),
  },
  {
    accessorKey: 'NP/PA',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'NP/PA'} />
    ),
    cell: ({ row }) => (
      <TableCellText text={`${row.original.npPaAmount ?? 'N/A'}`} />
    ),
  },
  {
    accessorKey: 'PsyD',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'PsyD'} />
    ),
    cell: ({ row }) => (
      <TableCellText text={`${row.original.psychologyAmount ?? 'N/A'}`} />
    ),
  },
  {
    accessorKey: 'Masters',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Masters'} />
    ),
    cell: ({ row }) => (
      <TableCellText text={`${row.original.mastersAmount ?? 'N/A'}`} />
    ),
  },
  {
    accessorKey: 'PR',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'PR'} />
    ),
    cell: ({ row }) => (
      <TableCellText text={`${row.original.psychologyAmount ?? 'N/A'}`} />
    ),
  },
  {
    accessorKey: 'Insurance',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Insurance'} />
    ),
    cell: ({ row }) => (
      <MultiSelectDropdown
        selectedValue={row.original.insurance}
        dropdownOptions={confirmOptionList}
      />
    ),
  },
]

const LogicFeeScheduleTable = ({
  payerId,
  IsPreferredPartnerFeeSchedule,
}: {
  payerId: string
  IsPreferredPartnerFeeSchedule: boolean
}) => (
  <Box m="7">
    <Box className="text-right">
      <Button
        className="my-5"
        color="blue"
        variant="surface"
        highContrast
      >
        Save
      </Button>
    </Box>
    <DataTable
      tableClass="border border-solid border-[lightgray]"
      tHeadClass="bg-[#EBF3FC]"
      thClass="text-center"
      columnCellClass="text-center"
      data={[]}
      columns={logicFeeScheduleColumns}
    />
  </Box>
)

export { LogicFeeScheduleTable }
