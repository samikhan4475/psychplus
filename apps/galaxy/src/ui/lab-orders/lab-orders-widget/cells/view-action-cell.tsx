import { Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { LabResult } from '@/types'
import { ViewActionDelete } from './view-action-delete'
import { ViewActionEdit } from './view-action-edit'

interface ActionsCellProps {
  shouldEditLabResult: boolean
  row: Row<LabResult>
}

const ViewActionsCell = ({ row, shouldEditLabResult }: ActionsCellProps) => {
  const rowActions: RowAction<LabResult>[] = shouldEditLabResult
    ? [
        {
          id: 'lab-orders-row-action-edit',
          render: ViewActionEdit,
        },
        {
          id: 'lab-orders-row-action-delete',
          render: ViewActionDelete,
        },
      ]
    : [
        {
          id: 'lab-orders-row-action-delete',
          render: ViewActionDelete,
        },
      ]

  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ViewActionsCell }
