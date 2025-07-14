import { ColumnHeader, DateTimeCell, TextCell } from '@/components'
import { LabOrders, Sort } from '@/types'
import { formatDateTime, getSortDir } from '@/utils'
import { Row, type ColumnDef } from '@tanstack/react-table'
import { TableHeaderCheckboxCell } from '../lab-order-results-widget/cells/table-header-checkbox-cell'
import { TableRowCheckboxCell } from '../lab-order-results-widget/cells/table-row-checkbox-cell'
import { LabTestCell, ResultsCell, StatusCell } from './cells'
import { ActionsCell } from './cells/actions-cell'

const getColumns = ({
  appointmentId,
  isInboxLabOrder,
  afterSummaryVisit,
  sort,
  onSort,
  onResultClick,
}: {
  appointmentId: string | null
  isInboxLabOrder: boolean
  afterSummaryVisit: boolean
  sort?: Sort
  onSort?: (column: string) => void
  onResultClick: (row: Row<LabOrders>) => void
}): ColumnDef<LabOrders>[] => {
  const baseColumns: ColumnDef<LabOrders>[] = [
    {
      id: 'labOrderDate',
      accessorKey: 'labOrderDate',
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.(column.id)}
          label="Date/Time"
        />
      ),
      cell: ({ row }) => (
        <DateTimeCell>
          {formatDateTime(row.original.labOrderDate)}
        </DateTimeCell>
      ),
    },
    {
      id: 'labOrderNumber',
      accessorKey: 'labOrderNumber',
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.(column.id)}
          label="Lab Order Number"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original.labOrderNumber}</TextCell>,
    },
    {
      id: 'orderedBy',
      accessorKey: 'orderedBy',
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.(column.id)}
          label="Provider"
        />
      ),
      cell: ({ row }) => (
        <TextCell>
          {row.original?.orderingStaffName?.firstName ?? ''}{' '}
          {row.original?.orderingStaffName?.lastName ?? ''}
          {', '}
          {row.original?.orderingStaffName?.honors ?? ''}
        </TextCell>
      ),
    },
  ]

  if (isInboxLabOrder) {
    baseColumns.splice(2, 0, {
      id: 'patientName',
      accessorKey: 'patientName',
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.(column.id)}
          label="Patient Name"
        />
      ),
      cell: ({ row }) => (
        <TextCell
          className={row.original?.isResultAbnormal ? 'text-red-9' : ''}
        >{`${row.original.patient?.legalName?.firstName} ${row.original.patient?.legalName?.lastName}`}</TextCell>
      ),
    })
  }

  if (afterSummaryVisit) {
    baseColumns.push({
      id: 'initiated',
      accessorKey: 'initiated',
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.(column.id)}
          label="Initiated"
        />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original?.metadata?.createdByFullName ?? ''}</TextCell>
      ),
    })
  }

  const remainingColumns: ColumnDef<LabOrders>[] = [
    {
      id: 'testPanel',
      accessorKey: 'testPanel',
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.(column.id)}
          label="Test"
        />
      ),
      cell: ({ row }) => <LabTestCell row={row} />,
    },
    {
      id: 'orderingLab',
      accessorKey: 'orderingLab',
      header: ({ column }) => (
        <ColumnHeader
          column={column}
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.(column.id)}
          label="Location"
        />
      ),
      cell: ({ row }) => <TextCell>{row.original?.orderingLab?.name}</TextCell>,
    },
    {
      id: 'orderStatus',
      accessorKey: 'orderStatus',
      header: ({ column }) => (
        <ColumnHeader
          label="Lab Status"
          column={column}
          className="!text-black p-1 !font-medium"
          sortable
          sortDir={getSortDir(column.id, sort)}
          onClick={() => onSort?.(column.id)}
        />
      ),
      cell: ({ row }) => (
        <StatusCell row={row}  />
      ),
    },
  ]

  const columns = [...baseColumns, ...remainingColumns]

  if (afterSummaryVisit) {
    return [
      ...columns,
      {
        id: 'actions',
        size: 100,
        header: () => <ColumnHeader label="Actions" />,
        cell: ({ row }) => (
          <ActionsCell
            row={row}
            afterSummaryVisit={afterSummaryVisit}
            appointmentId={appointmentId ?? ''}
          />
        ),
      },
    ]
  }

  if (!isInboxLabOrder) {
    return [
      ...columns,
      {
        id: 'results',
        size: 150,
        header: () => <ColumnHeader label="Result" />,
        cell: ({ row }) => (
          <ResultsCell row={row} onResultClick={onResultClick} />
        ),
      },
      {
        id: 'actions',
        size: 100,
        header: () => <ColumnHeader label="Actions" />,
        cell: ({ row }) => (
          <ActionsCell row={row} appointmentId={appointmentId ?? ''} />
        ),
      },
    ]
  }

  return [
    {
      id: 'select',
      header: ({ table }) => (
        <TableHeaderCheckboxCell
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={table.toggleAllPageRowsSelected}
        />
      ),
      cell: ({ row }) => (
        <TableRowCheckboxCell
          checked={row.getIsSelected()}
          onCheckedChange={row.toggleSelected}
        />
      ),
      size: 20,
    },
    ...columns,
  ]
}

export { getColumns }
