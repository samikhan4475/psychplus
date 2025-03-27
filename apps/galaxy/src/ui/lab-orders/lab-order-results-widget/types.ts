import { Row } from '@tanstack/react-table'
import { DateValue } from 'react-aria-components'
import { LabOrders, LegalName, Metadata } from '@/types'

type LabOrderRow = Row<LabOrders>

type LabOrderResultPayload = {
  patientId?: string[]
  orderStatus?: string
  orderCreatedDate?: DateValue | null | string
  orderingStaffId?: string
  labTestName?: string
  location?: string
  labTestCode?: string
  idList?: string[]
  isIncludePatient?: boolean
  isResultSigned?: boolean
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

interface LabDocument {
  id: string
  metadata?: Metadata
  orderId: string
  documentType?: string
  documentUrl: string
  documentName?: string
  recordStatus?: string
}

interface SignedOrderPayload {
  orderIds: (string | number)[]
  resultSignedByStaffId: number
  isResultSigned: boolean
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
  Unsigned = 'Unsigned',
}

export enum LabOrderPdf {
  ResultsPdf = 'ResultsPdf',
  RequisitionPdf = 'RequisitionPdf',
}

export type {
  LabOrderRow,
  LabResult,
  LabOrderResultPayload,
  LabDocument,
  SignedOrderPayload,
}
