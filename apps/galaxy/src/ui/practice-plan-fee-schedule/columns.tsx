import { type ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, TextCell } from '@/components'
import { Sort } from '@/types'
import { getSortDir } from '@/utils'
import { ActionsCell } from './actions-cell'
import { RowCellMdDo } from './cells'
import { RowCellMasters } from './cells/row-cell-masters'
import { RowCellNp } from './cells/row-cell-np'
import { RowCellPa } from './cells/row-cell-pa'
import { RowCellPaymentResponsibility } from './cells/row-cell-payment-responsibility'
import { RowCellPsyD } from './cells/row-cell-psyd'
import { HxStatusCell } from './hx-status-cell'
import { FeeSchedule } from './types'

const columns = (
  sort?: Sort,
  onSort?: (column: string) => void,
): ColumnDef<FeeSchedule>[] => {
  return [
    {
      id: 'shortName',
      header: ({ column }) => (
        <ColumnHeader
          label="CPT Code"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.cpt}</TextCell>,
    },
    {
      id: 'description',
      header: ({ column }) => (
        <ColumnHeader
          label="Description"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.description}</TextCell>,
    },
    {
      id: 'mdDo',
      header: ({ column }) => (
        <ColumnHeader
          label="MD/DO"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <RowCellMdDo row={row} />,
    },
    {
      id: 'np',
      header: ({ column }) => (
        <ColumnHeader
          label="NP"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <RowCellNp row={row} />,
    },
    {
      id: 'pa',
      header: ({ column }) => (
        <ColumnHeader
          label="PA"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <RowCellPa row={row} />,
    },
    {
      id: 'psyD',
      header: ({ column }) => (
        <ColumnHeader
          label="PsyD"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <RowCellPsyD row={row} />,
    },
    {
      id: 'masters',
      header: ({ column }) => (
        <ColumnHeader
          label="Masters"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <RowCellMasters row={row} />,
    },
    {
      id: 'paymentResponsibility',
      header: ({ column }) => (
        <ColumnHeader
          label="Payment Responsibility"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <RowCellPaymentResponsibility row={row} />,
    },
    {
      id: 'status',
      header: ({ column }) => (
        <ColumnHeader
          label="Status"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => {
            onSort?.(column.id)
          }}
        />
      ),
      cell: ({ row }) => <HxStatusCell row={row} />,
    },
    {
      id: 'actions',
      header: () => <ColumnHeader label="Actions" />,
      cell: ({ row }) => <ActionsCell row={row} />,
    },
  ]
}

export { columns }
