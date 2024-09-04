'use client'

import { useMemo } from 'react'
import { type ColumnDef } from '@tanstack/react-table'
import { UseFormReturn, useWatch } from 'react-hook-form'
import { DataTable, DataTableColumnHeader } from '@psychplus/ui/data-table'
import { SchemaType } from './add-claim-form'
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
import { TableCellUnits } from './charges-table-components/units'
import { TableCellUnitAmount } from './charges-table-components/units-amount'
import { ClaimRowActionDropdown } from './claim-data-table-row.action'
import { ClaimTableCellLongText } from './claim-table-cell-long-text'
import { ClaimServiceLine } from './types'

const getColumns = (
  form: UseFormReturn<SchemaType>,
): ColumnDef<ClaimServiceLine>[] => [
  {
    id: 'dateOfServiceFrom',
    size: 10,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="DOS From"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellDateOfServiceFrom row={row} form={form} />,
    enableHiding: true,
  },
  {
    id: 'dateOfServiceTo',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="DOS To"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellDateOfServiceTo row={row} form={form} />,
    enableHiding: true,
  },
  {
    id: 'cptCode',
    size: 50,

    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Procedure"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellProcedure row={row} form={form} />,
    enableHiding: true,
  },
  {
    id: 'placeOfService',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="POS"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellPOS row={row} form={form} />,
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
    cell: ({ row }) => <TableCellModifiers row={row} form={form} />,
    enableHiding: true,
  },
  {
    id: 'diagnosis',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Diagnosis"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellDiagnoses row={row} form={form} />,
    enableHiding: true,
  },
  {
    id: 'units',
    accessorKey: 'units',
    size: 50,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Units"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellUnits row={row} form={form} />,
    enableHiding: true,
  },
  {
    id: 'unitAmount',
    size: 70,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Amount"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <TableCellUnitAmount row={row} form={form} />,
    enableHiding: true,
  },
  {
    id: 'totalAmount',
    size: 100,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total Amount"
        className="text-[#000]"
      />
    ),
    cell: ({ row }) => <ClaimTableCellLongText maxWidth={200} row={row} />,
    enableHiding: true,
  },
  {
    id: 'startTime',
    accessorKey: 'startTime',
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
    accessorKey: 'endTime',
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
    cell: ({ row }) => (
      <ClaimRowActionDropdown
        rowIndex={row.index}
        rowId={row.original.id}
        form={form}
      />
    ),
  },
]

const Charges = ({ form }: { form: UseFormReturn<SchemaType> }) => {
  const columns = useMemo(() => getColumns(form), [form])
  // Watch the 'claimServiceLines' field
  const claimServiceLines =
    useWatch({
      control: form.control,
      name: 'claimServiceLines',
    }) || ([] as ClaimServiceLine[]) // Ensure type compatibility
  return (
    <DataTable
      data={claimServiceLines}
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
