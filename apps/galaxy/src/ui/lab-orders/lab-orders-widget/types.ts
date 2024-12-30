import { Row } from '@tanstack/react-table'
import { LabOrders, LabResult } from '@/types'

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

export enum FlagStatus {
  High = 'H',
  Low = 'L',
  Normal = 'N',
}
export enum ResultStatusCode {
  Final = 'F',
  Partial = 'P',
}

export type {
  LabOrderRow,
  LabOrderStatus,
  LabOrderPayload,
  GetLabOrdersParams,
  LabResultRow,
}
