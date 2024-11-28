import { ColumnDef } from '@tanstack/react-table'
import { ColumnHeader } from '@/components'
import { ClaimServiceLine, StaffResource } from '@/types'
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

const createRowIndexMap = (claimServiceLines: ClaimServiceLine[]) => {
  const rowIndexMap: Record<string, number> = {}
  claimServiceLines.forEach((charge, index) => {
    if (charge.id) rowIndexMap[charge.id] = index
    else rowIndexMap[index] = index
  })
  return rowIndexMap
}

const getRowIndex = (
  rowIndexMap: Record<string, number>,
  row: { original: ClaimServiceLine; index: number },
) => {
  return row.original.id ? rowIndexMap[row.original.id] : row.index
}

const columns = (
  claimServiceLines: ClaimServiceLine[],
  staffData?: StaffResource | undefined,
): ColumnDef<ClaimServiceLine>[] => {
  const rowIndexMap = createRowIndexMap(claimServiceLines)

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
      cell: ({ row }) => (
        <TableCellDosFrom rowIndex={getRowIndex(rowIndexMap, row)} />
      ),
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
      cell: ({ row }) => (
        <TableCellDosTo rowIndex={getRowIndex(rowIndexMap, row)} />
      ),
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
      cell: ({ row }) => (
        <TableCellProcedure
          rowIndex={getRowIndex(rowIndexMap, row)}
          selectedStaff={staffData}
        />
      ),

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
      cell: ({ row }) => (
        <TableCellPOS rowIndex={getRowIndex(rowIndexMap, row)} />
      ),

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
      cell: ({ row }) => (
        <TableCellModifier rowIndex={getRowIndex(rowIndexMap, row)} />
      ),

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
      cell: ({ row }) => (
        <TableCellDiagnosis rowIndex={getRowIndex(rowIndexMap, row)} />
      ),

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
      cell: ({ row }) => (
        <TableCellUnits rowIndex={getRowIndex(rowIndexMap, row)} />
      ),

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
      cell: ({ row }) => (
        <TableCellUnitAmount rowIndex={getRowIndex(rowIndexMap, row)} />
      ),

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
      cell: ({ row }) => <TableCellTotalAmount row={row} />,

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
      cell: ({ row }) => (
        <TableCellStartChargesTime rowIndex={getRowIndex(rowIndexMap, row)} />
      ),

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
      cell: ({ row }) => (
        <TableCellEndChargesTime rowIndex={getRowIndex(rowIndexMap, row)} />
      ),

      enableHiding: true,
    },
    {
      id: 'actions-column',
      accessorKey: 'actions-column',
      header: () => <ColumnHeader label="Actions" className="!font-medium" />,
      cell: ({ row }) => (
        <ClaimRowActionDropdown
          rowIndex={getRowIndex(rowIndexMap, row)}
          rowId={row.original.id}
        />
      ),
      enableHiding: false,
    },
  ]
}

export { columns }
