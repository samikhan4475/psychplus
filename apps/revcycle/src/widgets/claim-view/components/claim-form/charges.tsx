'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { DataTable, DataTableColumnHeader } from '@psychplus/ui/data-table'
import {
  TableCellDateOfServiceFrom,
  TableCellDateOfServiceTo,
  TableCellDiagnoses,
  TableCellEndTime,
  TableCellModifiers,
  TableCellPOS,
  TableCellProcedure,
  TableCellStartTime,
} from './charges-table-components'
import { RowActionDropdown } from './data-table-row.action'
import { TableCellLongText } from './table-cell-long-text'
import { Charge } from './types'

const columns: ColumnDef<Charge>[] = [
  {
    id: 'dosFrom',
    size: 10,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="DOS From"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellDateOfServiceFrom row={row} />,
    enableHiding: true,
  },
  {
    id: 'dosTo',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="DOS To"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellDateOfServiceTo row={row} />,
    enableHiding: true,
  },
  {
    id: 'procedure',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Procedure"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellProcedure row={row} />,
    enableHiding: true,
  },
  {
    id: 'pos',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="POS"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellPOS row={row} />,
    enableHiding: true,
  },
  {
    id: 'modifiers',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Modifiers"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellModifiers row={row} />,
    enableHiding: true,
  },
  {
    id: 'diagnoses',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Diagnoses"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellDiagnoses row={row} />,
    enableHiding: true,
  },
  {
    id: 'units',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Units"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={120} text={row.original.units} />
    ),
    enableHiding: true,
  },
  {
    id: 'amount',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Amount"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={120} text={row.original.amount} />
    ),
    enableHiding: true,
  },
  {
    id: 'totalAmount',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total Amount"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => (
      <TableCellLongText maxWidth={120} text={row.original.total_amount} />
    ),
    enableHiding: true,
  },
  {
    id: 'startTime',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Start Time"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellStartTime row={row} />,
    enableHiding: true,
  },
  {
    id: 'endTime',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="End Time"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellEndTime row={row} />,
    enableHiding: true,
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

// Static Data will be removed after integration
const dummyData: Charge[] = [
  {
    units: '2',
    amount: '50',
    total_amount: '100',
  },
]

const Charges = () => {
  return (
    <DataTable
      data={dummyData}
      columns={columns}
      tableClass="border border-solid border-[lightgray] "
      tHeadClass="bg-[#EBF3FC]"
      thClass="border-b border-r border-solid border-[#C1E2FF] text-left"
      isRowPan={true}
      toBodyClass="border-[lightgray]; border-b border-solid"
      columnCellClass="border border-solid border-[#F2F2F2] w-50"
    />
  )
}

export { Charges }
