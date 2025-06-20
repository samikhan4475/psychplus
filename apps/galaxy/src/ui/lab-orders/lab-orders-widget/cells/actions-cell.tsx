import { AdaptiveRowActionsCell, type RowAction } from '@/components'
import { LabOrders } from '@/types'
import { AddLabOrderView } from '../../add-lab-order'
import { LabOrderRow } from '../types'
import { RowActionDelete } from './row-action-delete'
import { RowActionReview } from './row-action-reveiw'
import { RowResultAttachment } from './row-result-attachment'

interface ActionsCellProps {
  row: LabOrderRow
  afterSummaryVisit?: boolean
  appointmentId?: string
}

const ActionsCell = ({
  row,
  afterSummaryVisit,
  appointmentId,
}: ActionsCellProps) => {
  const { original } = row
  const resultAttachmentAction: RowAction<LabOrders> = {
    id: 'row-results-attachment',
    render: RowResultAttachment,
  }

  const editAction: RowAction<LabOrders> = {
    id: 'row-results-edit',
    render: () => <AddLabOrderView isEdit={true} labOrderData={original} />,
  }

  const reviewAction: RowAction<LabOrders> = {
    id: 'row-results-review',
    render: () => <RowActionReview orderId={original?.id ?? ''} />,
  }

  const deleteAction: RowAction<LabOrders> = {
    id: 'lab-orders-row-action-delete',
    render: () => (
      <RowActionDelete
        orderId={original?.id ?? ''}
        orderStatus={original.orderStatus}
      />
    ),
  }

  const actions: RowAction<LabOrders>[] = []

  actions.push(resultAttachmentAction)

  if (!afterSummaryVisit) {
    const hasValidAppointment = appointmentId && appointmentId !== '0'
    const isResultNotSigned = !original.isResultSigned

    if (isResultNotSigned) actions.push(reviewAction)
    if (hasValidAppointment) actions.push(editAction)

    actions.push(deleteAction)
  }

  return <AdaptiveRowActionsCell actions={actions} row={row} />
}

export { ActionsCell }
