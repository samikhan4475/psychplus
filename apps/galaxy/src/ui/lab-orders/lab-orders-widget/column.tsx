import { type ColumnDef } from '@tanstack/react-table'
import { ColumnHeader, DateTimeCell, TextCell } from '@/components'
import { LabOrders } from '@/types'
import { formatUTCDate } from '@/utils'
import { TableHeaderCheckboxCell } from '../lab-order-results-widget/cells/table-header-checkbox-cell'
import { TableRowCheckboxCell } from '../lab-order-results-widget/cells/table-row-checkbox-cell'
import { LabTestCell, ResultsCell, StatusCell } from './cells'
import { ActionsCell } from './cells/actions-cell'

const getColumns: (
  appointmentId: string | null,
  isInboxLabOrder: boolean,
  afterSummaryVisit: boolean,
) => ColumnDef<LabOrders>[] = (
  appointmentId,
  isInboxLabOrder,
  afterSummaryVisit,
) => {
  const baseColumns: ColumnDef<LabOrders>[] = [
    {
      id: 'labOrderDate',
      accessorKey: 'labOrderDate',
      header: ({ column }) => (
        <ColumnHeader column={column} clientSideSort label="Date/Time" />
      ),
      cell: ({ row }) => (
        <DateTimeCell>
          {formatUTCDate(row.original.labOrderDate, 'MM/dd/yy HH:mm')}
        </DateTimeCell>
      ),
    },
    {
      id: 'labOrderNumber',
      accessorKey: 'labOrderNumber',
      header: ({ column }) => (
        <ColumnHeader column={column} clientSideSort label="Lab Order Number" />
      ),
      cell: ({ row }) => <TextCell>{row.original.labOrderNumber}</TextCell>,
    },
    {
      id: 'orderingStaffName',
      accessorKey: 'orderingStaffName',
      header: ({ column }) => (
        <ColumnHeader column={column} clientSideSort label="Provider" />
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

  if (afterSummaryVisit) {
    baseColumns.push({
      id: 'initiated',
      accessorKey: 'initiated',
      header: ({ column }) => (
        <ColumnHeader column={column} clientSideSort label="Initiated" />
      ),
      cell: ({ row }) => (
        <TextCell>{row.original?.metadata?.createdByFullName ?? ''}</TextCell>
      ),
    })
  }

  const remainingColumns: ColumnDef<LabOrders>[] = [
    {
      id: 'labTests',
      accessorKey: 'labTests',
      header: ({ column }) => (
        <ColumnHeader column={column} clientSideSort label="Test" />
      ),
      cell: ({ row }) => <LabTestCell row={row} />,
    },
    {
      id: 'orderingLab.name',
      accessorKey: 'orderingLab.name',
      header: ({ column }) => (
        <ColumnHeader column={column} clientSideSort label="Location" />
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
          clientSideSort
        />
      ),
      cell: ({ row }) => <StatusCell row={row} />,
    },
  ]

  const columns = [...baseColumns, ...remainingColumns]

  if (appointmentId === '0' || afterSummaryVisit) {
    return columns
  } else {
    return !isInboxLabOrder
      ? [
          ...columns,
          {
            id: 'results',
            size: 150,
            header: () => <ColumnHeader label="Result" />,
            cell: ({ row }) => <ResultsCell row={row} />,
          },
          {
            id: 'actions',
            size: 100,
            header: () => <ColumnHeader label="Actions" />,
            cell: ({ row }) => <ActionsCell row={row} />,
          },
        ]
      : [
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
}

export { getColumns }
