import { LegalName } from '@/types'

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

interface History {
  dateTime: string
  user: string
  coPay: PaymentInfo
  coins: PaymentInfo
  balance: PaymentInfo
}

interface SelectOptionType {
  label: string
  value: string
}
interface SchedulingHistoryData {
  visitId: string
  facilityAdmissionId: string
  appointmentId: number
  admittingProviderName: string
  admittingProviderStaffId: number
  admissionDateTime: string
  dischargeVisitSequenceDate: string
  appointmentDateTime: string
  locationTimeZoneId: string
  visitTypeCode: string
  visitSequenceType: string
  visitMedium: string
  locationId: string
  serviceId: string
  providerName: string
  providerStaffId: number
  providerType: string
  cosignerName: string
  cosignerStaffId: number
  dischargeHospitalDate: string
  dischargeHospitalName: string
  dischargeHospitalLocationId: string
  visitStatus: string
  residingStateCode: string
  primaryInsuranceDescription: string
  primaryInsurancePolicyId: string
  secondaryInsuranceDescription: string
  noRebookReason: string
  coPayDue: number
  coPayPaid: number
  coInsDue: number
  coInsPaid: number
  balanceDue: number
  balancePaid: number
  locationName: string
  serviceOffered: string
}

interface GetSchedulingHistoryListResponse {
  list: SchedulingHistoryData[]
  total: number
}

interface PatientFacilityHistoryMetadata {
  createdOn: string
  createdBy: number
  createdByFullName: string
  updatedOn: string
  updatedBy: number
  updatedByFullName: string
  deletedOn: string
  deletedBy: number
  deletedByFullName: string
}

interface PatientFacilityHistory {
  id: string
  metadata: PatientFacilityHistoryMetadata
  appointmentId: number
  appointmentDatetime: string
  facilityAdmissionId: string
  facilityAppointmentStatus: string
  visitTypeId: string
  room: string
  admissionDate: string
  authorizationNumber: string
  authorizationDate: string
  admissionLegalCode: string
  unitId: string
  serviceGroupId: string
  userName: string
  dischargeDate: string
  admittingProviderName: {
    firstName: string
    lastName: string
    honors: string
  }
}

interface PatientScheduleStatusHistory {
  appointmentId: number
  scheduleStatus: string
  scheduleStatusEntryTime: string
  userName: string
}

interface PatientTransactionHistory {
  id: number
  metadata: PatientFacilityHistoryMetadata
  patientId: number
  chargeDate: string
  transactionNumber: string
  type: string
  description: string
  appointmentId: number
  visitNumber: string
  coPayDue: number
  coPayPaid: number
  coInsuranceDue: number
  coInsurancePaid: number
  balanceDue: number
  balancePaid: number
  unappliedPayment: number
  method: string
  stripeNumber: string
  paymentDescription: string
  patientName: LegalName
  preferredPartnerId: string
  isPreferredPartnerTransaction: boolean
  isActive: boolean
  visitStatus: string
  visitType: string
  visitMediumCode: string
}

interface SchedulingHistoryPayload {
  patientId?: string
  fromDate?: string | null
  toDate?: string | null
  visitId?: string
  facilityAdmissionId?: string
  visitTypeCode?: string
  locationId?: string
  visitStatuses?: string
  admittingProviderName?: string
  admissionDateTime?: string
  admitTime?: string
  dischargeVisitSequenceDate: string | null
  dateOfService?: string | null
  serviceId?: string
  providerType?: string
  providerStaffId?: string
  cosignerStaffId?: string
  dischargeHospitalName?: string
  dischargeHospitalDate?: string | null
  residingStateCode?: string
  primaryInsurancePolicyId?: string
  secondaryInsurancePolicyId?: string
  coPayDue?: string
  coPayPaid?: string
  coInsDue?: string
  coInsPaid?: string
  balanceDue?: string
  balancePaid?: string
}

export enum TCMVisitTypes {
  T_EST_PT_TRANSITIONAL_CARE = 'T - Est Pt, Transitional Care Mngt',
  T_NEW_PT_TRANSITIONAL_CARE = 'T - New Pt, Transitional Care Mngt',
  EST_PT_TRANSITIONAL_CARE = 'Est Pt, Transitional Care Mngt',
  NEW_PT_TRANSITIONAL_CARE = 'New Pt, Transitional Care Mngt',
}

export type {
  FacilityAdmission,
  History,
  PaymentInfo,
  InsuranceInfo,
  FinancialDetails,
  SelectOptionType,
  SchedulingHistoryData,
  PatientFacilityHistory,
  PatientScheduleStatusHistory,
  PatientTransactionHistory,
  SchedulingHistoryPayload,
  GetSchedulingHistoryListResponse,
}
