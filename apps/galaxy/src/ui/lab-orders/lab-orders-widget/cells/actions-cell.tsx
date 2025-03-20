import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { LabOrders } from '@/types'
import { AddLabOrderView } from '../../add-lab-order'
import { LabOrderRow } from '../types'
import { RowActionDelete } from './row-action-delete'
import { RowResultAttachment } from './row-result-attachment'

const rowActions: RowAction<LabOrders>[] = [
  {
    id: 'row-results-attachment',
    render: RowResultAttachment,
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
        orderId={row.original?.id ?? ''}
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
