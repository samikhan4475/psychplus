import { Row } from '@tanstack/react-table'
import { LabOrders } from '@/types'

type LabOrderStatus =
  | 'Draft'
  | 'Result Received'
  | 'Order Completed'
  | 'Submission Pending'
  | 'Pre-order'
  | 'Cancelled'

type LabOrderRow = Row<LabOrders>

type LabOrderPayload = {
  appointmentIds: string[]
  patientId: string[]
}
interface GetLabOrdersParams {
  appointmentId: string
  payload?: LabOrderPayload
}

export type { LabOrderRow, LabOrderStatus, LabOrderPayload, GetLabOrdersParams }
