import { Row } from '@tanstack/react-table'
import { Metadata } from '@/types'
import { BillingFilterSchemaType } from './filter-form'

interface BillingHistory {
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
}

type BillingHistoryRow = Row<BillingHistory>

interface GetBillingHistoryData {
  billingHistories: BillingHistory[]
}
interface BillingHistoryParams
  extends Omit<BillingFilterSchemaType, 'fromDate' | 'endDate' | 'locationId'> {
  fromDate?: string
  endDate?: string
  locationId?: string[]
}

export type {
  BillingHistoryRow,
  GetBillingHistoryData,
  BillingHistory,
  BillingHistoryParams,
}
