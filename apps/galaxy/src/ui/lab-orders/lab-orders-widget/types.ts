import { Row } from '@tanstack/react-table'
import { DateValue } from 'react-aria-components'
import { LabOrders, LegalName, Metadata } from '@/types'

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
  orderStatus?: string
  orderCreatedDate?: DateValue | null | string
  orderingStaffId?: string
  labTestName?: string
  location?: string
  labTestCode?: string
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
  LabResult,
  LabResultRow,
}
