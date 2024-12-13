import { Row } from '@tanstack/react-table'
import { LabOrders, LabResult, Metadata } from '@/types'

type LabOrderStatus =
  | 'Draft'
  | 'Result Received'
  | 'Order Completed'
  | 'Submission Pending'
  | 'Pre-order'
  | 'Cancelled'
  | 'Pending'

type LabOrderRow = Row<LabOrders>
type LabResultRow = Row<LabResult>

type LabOrderPayload = {
  appointmentIds: string[]
  patientId: string[]
}
interface GetLabOrdersParams {
  appointmentId: string
  payload?: LabOrderPayload
}

export type {
  LabOrderRow,
  LabOrderStatus,
  LabOrderPayload,
  GetLabOrdersParams,
  LabResultRow,
}
