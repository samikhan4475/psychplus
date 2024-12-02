import { Row } from '@tanstack/react-table'
import { LabOrders, LegalName, Metadata } from '@/types'

type LabOrderStatus =
  | 'Draft'
  | 'Result Received'
  | 'Order Completed'
  | 'Submission Pending'
  | 'Pre-order'
  | 'Cancelled'
  | 'Pending'
type ResultOrderStatus = 'Final' | 'Partial'
type FlagOrderStatus = 'High' | 'Low' | 'Normal'

type LabOrderRow = Row<LabOrders>

type LabOrderPayload = {
  appointmentIds: string[]
  patientId: string[]
}
interface GetLabOrdersParams {
  appointmentId: string
  payload?: LabOrderPayload
}
interface LabResult {
  id: string
  metadata: Metadata
  labTestId: string
  orderId: string
  observationTime: string
  resultCode: string
  resultName: string
  resultValue: string
  resultValueUnit?: string
  recommendedValue?: string
  statusCode: string
  abnormalRangeCode: string
  physicianComments: string
  externalResultId: string
  labComments: string
  resultValueType: string
  valueDescription: string
  recordStatus: string
  recomendedValue: string
  patientLegalName: LegalName
}

export type {
  LabOrderRow,
  LabOrderStatus,
  LabOrderPayload,
  GetLabOrdersParams,
  LabResult,
  ResultOrderStatus,
  FlagOrderStatus,
}
