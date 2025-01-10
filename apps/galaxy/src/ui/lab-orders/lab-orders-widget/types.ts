import { Row } from '@tanstack/react-table'
import { DateValue } from 'react-aria-components'
import { LabOrders, LegalName, Metadata } from '@/types'

type LabOrderStatus =
  | 'Draft'
  | 'ResultReceived'
  | 'OrderCompleted'
  | 'Submission Pending'
  | 'PreOrder'
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
interface LabDocument {
  id: string
  metadata?: Metadata
  orderId: string
  documentType?: string
  documentUrl: string
  documentName?: string
  recordStatus?: string
}

export enum LabOrderPdf {
  ResultsPdf = 'ResultsPdf',
  RequisitionPdf = 'RequisitionPdf',
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
export enum RecordStatus {
  Deleted = 'Deleted',
  Active = 'Active',
}
export enum OrderingLabName {
  Quest = 'Quest',
  PsychPlus = 'PsychPlus',
}

export enum OrderStatus {
  OrderCompleted = 'OrderCompleted',
  ResultReceived = 'ResultReceived',
}

export type {
  LabOrderRow,
  LabOrderStatus,
  LabOrderPayload,
  LabResult,
  LabResultRow,
  LabDocument,
}
