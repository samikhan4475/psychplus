import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader } from '@/components'
import { ClaimServiceLine } from '@/types'
import { ClaimRowActionDropdown } from './table-action-cell'
import { TableCellEndChargesTime } from './table-cell-charges-end-time'
import { TableCellStartChargesTime } from './table-cell-charges-start-time'
import { TableCellDiagnosis } from './table-cell-diagnosis'
import { TableCellDosFrom } from './table-cell-dos-from'
import { TableCellDosTo } from './table-cell-dos-to'
import { TableCellModifier } from './table-cell-modifiers'
import { TableCellPOS } from './table-cell-pos'
import { TableCellProcedure } from './table-cell-procedure'
import { TableCellTotalAmount } from './table-cell-total-amount'
import { TableCellUnitAmount } from './table-cell-unit-amount'
import { TableCellUnits } from './table-cell-units'

const columns = (): ColumnDef<ClaimServiceLine>[] => {
  return [
    {
      id: 'dateOfServiceFrom',
      accessorKey: 'dateOfServiceFrom',
      header: ({ column }) => (
        <ColumnHeader
          className="!text-black justfy-center !font-medium"
          column={column}
          label="DOS From"
        />
      ),
      cell: ({ row }) => <TableCellDosFrom rowIndex={row.index} />,
      enableHiding: true,
    },
    {
      id: 'dateOfServiceTo',
      accessorKey: 'dateOfServiceTo',
      header: ({ column }) => (
        <ColumnHeader
          className="!text-black justfy-center !font-medium"
          column={column}
          label="DOS To"
        />
      ),
      cell: ({ row }) => <TableCellDosTo rowIndex={row.index} />,
      enableHiding: true,
    },
    {
      id: 'cptCode',
      accessorKey: 'cptCode',
      header: ({ column }) => (
        <ColumnHeader
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Procedure"
        />
      ),
      cell: ({ row }) => <TableCellProcedure rowIndex={row.index} />,

      enableHiding: true,
    },
    {
      id: 'placeOfService',
      accessorKey: 'placeOfService',
      header: ({ column }) => (
        <ColumnHeader
          className="!text-black justfy-center !font-medium"
          column={column}
          label="POS"
        />
      ),
      cell: ({ row }) => <TableCellPOS rowIndex={row.index} />,

      enableHiding: true,
    },
    {
      id: 'modifiers',
      accessorKey: 'modifiers',
      header: ({ column }) => (
        <ColumnHeader
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Modifiers"
        />
      ),
      cell: ({ row }) => <TableCellModifier rowIndex={row.index} />,

      enableHiding: true,
    },
    {
      id: 'diagnosis',
      accessorKey: 'diagnosis',
      header: ({ column }) => (
        <ColumnHeader
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Diagnosis"
        />
      ),
      cell: ({ row }) => <TableCellDiagnosis rowIndex={row.index} />,

      enableHiding: true,
    },
    {
      id: 'units',
      accessorKey: 'units',
      header: ({ column }) => (
        <ColumnHeader
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Units"
        />
      ),
      cell: ({ row }) => <TableCellUnits rowIndex={row.index} />,

      enableHiding: true,
    },
    {
      id: 'unitAmount',
      accessorKey: 'unitAmount',
      header: ({ column }) => (
        <ColumnHeader
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Amount"
        />
      ),
      cell: ({ row }) => <TableCellUnitAmount rowIndex={row.index} />,

      enableHiding: true,
    },
    {
      id: 'totalAmount',
      accessorKey: 'totalAmount',
      header: ({ column }) => (
        <ColumnHeader
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Total Amount"
        />
      ),
      cell: ({ row }) => <TableCellTotalAmount row={row}/>,

      enableHiding: true,
    },
    {
      id: 'startTime',
      accessorKey: 'startTime',
      header: ({ column }) => (
        <ColumnHeader
          className="!text-black justfy-center !font-medium"
          column={column}
          label="Start Time"
        />
      ),
      cell: ({ row }) => <TableCellStartChargesTime rowIndex={row.index} />,

      enableHiding: true,
    },
    {
      id: 'endTime',
      accessorKey: 'endTime',
      header: ({ column }) => (
        <ColumnHeader
          className="!text-black justfy-center !font-medium"
          column={column}
          label="End Time"
        />
      ),
      cell: ({ row }) => <TableCellEndChargesTime rowIndex={row.index} />,

      enableHiding: true,
    },
    {
      id: 'actions-column',
      accessorKey: 'actions-column',
      header: () => <ColumnHeader label="Actions" className="!font-medium" />,
      cell: ({ row }) => <ClaimRowActionDropdown rowIndex={row.index} rowId={row.original.id}/>,
      enableHiding: false,
    },
  ]
}

export { columns }
