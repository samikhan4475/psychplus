import { Metadata } from '@/types'

interface PaymentInfo {
  due: string
  paid: string
}

interface InsuranceInfo {
  primaryInsurance: string
  secondaryInsurance: string
  institutionalPractice: string
  professionalPractice: string
}

interface FacilityAdmission {
  dateTime: string
  user: string
  admittingProvider: string
  admitDateTime: string
  dischargeDate: string
  id?: number
}

interface FinancialDetails {
  coPay: PaymentInfo
  coins: PaymentInfo
  balance: PaymentInfo
}

interface SchedulingHistory {
  visitNumber: number
  id: number
  dateOfService: string
  visitType: string
  location: string
  visitStatus: string
  residingState: string
  service: string
  provider: string
  providerType: string
  cosigner: string
  dcDate: string | null
  dcHospiceName: string | null
  practice: string
  organization: string
  insurance: InsuranceInfo
  facilityAdmission: FacilityAdmission
  coPay: PaymentInfo
  coins: PaymentInfo
  balance: PaymentInfo
}

interface VisitStatus {
  user: string
  date: string
  status: string
}

interface History {
  dateTime: string
  user: string
  coPay: PaymentInfo
  coins: PaymentInfo
  balance: PaymentInfo
}

interface SchedulingHistoryRaw extends SchedulingHistory {
  metadata: Metadata
}

interface GetSchedulingHistoryData {
  schedulingHistories: SchedulingHistory[]
}

interface SelectOptionType {
  label: string
  value: string
}

export type {
  SchedulingHistory,
  VisitStatus,
  FacilityAdmission,
  History,
  PaymentInfo,
  InsuranceInfo,
  FinancialDetails,
  GetSchedulingHistoryData,
  SchedulingHistoryRaw,
  SelectOptionType,
}
