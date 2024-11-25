import { type Row } from '@tanstack/react-table'
import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { LabOrders } from '@/types'
import { RowActionAdd } from './row-action-add'
import { RowActionSend } from './row-action-send'

type LabOrderRow = Row<LabOrders>

const rowActions: RowAction<LabOrders>[] = [
  {
    id: 'lab-orders-row-action-add',
    render: RowActionAdd,
  },
  {
    id: 'lab-orders-row-action-send',
    render: RowActionSend,
  },
]

interface ActionsCellProps {
  row: LabOrderRow
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ActionsCell }
