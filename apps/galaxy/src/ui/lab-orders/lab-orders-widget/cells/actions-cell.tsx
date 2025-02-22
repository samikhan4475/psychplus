import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { LabOrders } from '@/types'
import { AddLabOrderView } from '../../add-lab-order'
import { LabOrderRow } from '../types'
import { RowActionDelete } from './row-action-delete'
import { RowActionSend } from './row-action-send'

const rowActions: RowAction<LabOrders>[] = [
  {
    id: 'lab-orders-row-action-send',
    render: ({ row }) => (
      <RowActionSend
        orderId={row.original.id}
        labLocationName={row.original?.orderingLab?.name}
        orderStatus={row.original.orderStatus}
      />
    ),
  },
  {
    id: '',
    render: ({ row }) => (
      <AddLabOrderView isEdit={true} labOrderData={row.original} />
    ),
  },
  {
    id: 'lab-orders-row-action-delete',
    render: ({ row }) => (
      <RowActionDelete
        orderId={row.original.id}
        labLocationName={row.original?.orderingLab?.name}
        orderStatus={row.original.orderStatus}
      />
    ),
  },
]

interface ActionsCellProps {
  row: LabOrderRow
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  return <AdaptiveRowActionsCell actions={rowActions} row={row} />
}

export { ActionsCell }
