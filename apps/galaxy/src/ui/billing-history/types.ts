import { Row } from '@tanstack/react-table'

interface BillingHistory {
  visitNumber: string
  appointmentId: number
  patientMrn: string
  appointmentDateTime: string
  locationName: string
  visitType: string
  doctorName: string
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
  claimNo: number
  patientCpt: string
  dateOfService: string
  appointmentStatus: string
  vis: string
  cptStatus: string
  createdOn: string
  submittedOn: string
}

type BillingHistoryRow = Row<BillingHistory>

interface GetBillingHistoryData {
  billingHistories: BillingHistory[]
}
interface BillingHistoryParams {
  FromDate?: string
  EndDate?: string
  PartialComment?: string
  LocationId?: string[]
  Insurance?: string
}

export type {
  BillingHistoryRow,
  GetBillingHistoryData,
  BillingHistory,
  BillingHistoryParams,
}
