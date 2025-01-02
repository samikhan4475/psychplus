import { CalendarDate } from '@internationalized/date'
import { DateValue } from 'react-aria-components'
import { LabOrderStatus } from '@/ui/lab-orders/lab-orders-widget/types'
import { Appointment } from './appointment'
import { ContactDetails } from './contact'
import { Metadata } from './metadata'
import { PatientProfile } from './patient'

interface LabTestAnswer {
  id: string
  metadata: Metadata
  labTestId: string
  questionCode: string
  questionText: string
  entryAnswer: string
  resourceStatus: string
}

interface LabTest {
  id: string
  metadata: Metadata
  recordStatus: string
  orderId: string
  labTestCode: string
  testName: string
  labTestCodeType: string
  labAssignedCode: string
  temperatureType: string
  papIndicator: string
  labTestAnswers: LabTestAnswer[]
}

interface LabResult {
  id?: string
  metadata?: Metadata
  labTestId?: string
  orderId?: string
  observationTime?: string | CalendarDate
  resultCode?: string
  resultName?: string
  resultValue?: string
  resultValueUnit: string
  recomendedValue?: string
  statusCode: string
  abnormalRangeCode: string
  physicianComments?: string
  externalResultId?: string
  labComments?: string
  resultValueType?: string
  valueDescription?: string
  recordStatus?: string
}

interface LabResultPayload {
  id?: string
  labTestId?: string
  orderId?: string
  observationTime?: DateValue | null
  resultName?: string
  statusCode?: string
  resultCode?: string
  resultValue?: string
  resultValueUnit?: string
  recomendedValue?: string
  abnormalRangeCode?: string
  physicianComments?: string
}

interface LabDocument {
  id: string
  metadata: Metadata
  orderId: string
  documentType: string
  documentUrl: string
  documentName: string
  recordStatus: string
}

interface LabOrders {
  id: string
  labOrderNumber: number
  metadata: Metadata
  labId: string
  patientId: number
  appointmentId: number
  statusCode: string
  orderingStaffId: number
  orderingStaffName: string
  billType: string
  isFasting: boolean
  isLabDraw: boolean
  orderType: string
  orderSendStatus: boolean
  orderSentDateTime: string
  isPscHold: boolean
  isTest: boolean
  labOrderDate: string
  labNotes: string
  orderingLab: {
    id: string
    metadata: Metadata
    recordStatus: string
    name: string
    locationName: string
    locationId: string
    consolidatorId: string
    labGroupId: string
    contactDetails: ContactDetails
    isTest: boolean
  }
  labTests: LabTest[]
  labResults: LabResult[]
  labDocuments: LabDocument[]
  patient: PatientProfile
  appointment: Appointment
  recordStatus: string
  orderStatus: LabOrderStatus
}
interface LabOrderResponseList {
  labOrders: LabOrders[]
  total: number
}

export {
  type LabOrders,
  type LabTest,
  type LabResult,
  type LabOrderResponseList,
  type LabResultPayload,
}
