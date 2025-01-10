import { Row } from '@tanstack/react-table'
import { Metadata } from '@/types'
import { BillingFilterSchemaType } from './filter-form'

interface BillingHistory {
  locationService: string
  metadata?: Metadata
  visitNumber: string
  appointmentId: number
  patientMrn: string
  appointmentDateTime: string
  locationName: string
  visitType: string
  doctorName: string
  dateOfServiceFrom: string
  primaryInsuranceDescription: string
  secondaryInsuranceDescription: string
  diagnosisDisplayName: string
  patientCmd: string
  isSigned: boolean
  cosignerName: string
  coPayDue: number
  coPayPaid: number
  coInsDue: number
  coInsPaid: number
  balanceDue: number
  balancePaid: number
  patientStatusCode: string
  locationServiceDescription: string
  visitSequence: string
  visitMedium: string
  claimNumber: string
  cptCode: string
  dateOfService: string
  appointmentStatus: string
  verification: string
  cptStatus: string
  createdOn: string
  claimSubmittedDate: string
  claimCreatedDate: string
}

type BillingHistoryRow = Row<BillingHistory>

interface GetBillingHistoryData {
  billingHistories: BillingHistory[]
  total: number
}
interface BillingHistoryParams
  extends Omit<BillingFilterSchemaType, 'fromDate' | 'endDate' | 'locationId'> {
  fromDate?: string
  endDate?: string
  locationId?: string[]
  patientId: string
}

export type {
  BillingHistoryRow,
  GetBillingHistoryData,
  BillingHistory,
  BillingHistoryParams,
}
