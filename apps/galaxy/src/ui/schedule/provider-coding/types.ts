import { Metadata } from '@/types'

type DayString = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun"
interface Diagnosis {
  id: number
  metadata: object
  icd10Code: string
  description: string
  patientId: number
  isChecked: boolean
  priorityFavourite: number
  priorityCheck: number
  recordStatus: string
}
interface UnitResource {
  id: string
  metadata: Metadata
  locationId: string
  serviceId: string
  unit: string
  coSignerId: number
}

interface GroupResource {
  id: string
  metadata: Metadata
  locationId: string
  serviceId: string
  group: string
  coSignerId: number
}
interface AppointmentRecord {
  facilityAdmissionId?: string
  diagnosis: Diagnosis[]
  visitMedium?: string
  visitSequence?: string
  visitStatus?: string
  visitType?: string
  isNoteSigned?: boolean
  cptCodes?: []
  appointmentId?: number
  metadata?: Metadata
  appointmentDate: string
  name?: string
  age?: number
  clinicLocation?: string
  state?: string
  gender?: string
  dob?: string
  patientStatus?: string
  service?: string
  patientInfoVerificationStatus?: string
  patientInsuranceVerificationStatus?: string
  patientConsentStatus?: string
  patientCardVerificationStatus?: boolean
  providerId?: number
  providerName?: string
  providerType?: string
  insuranceVerification?: string
  primaryInsuranceName?: string
  secondaryInsuranceName?: string
  copayDue?: number
  copayPaid?: number
  coInsuranceDue?: number
  coInsurancePaid?: number
  balanceDue?: number
  balancePaid?: number
  locationName?: string
  locationId?: string
  locationTimezoneId?: string
  unitResource?: UnitResource // Make sure these are included
  groupResource?: GroupResource // Make sure these are included
  room?: string
  legalStatus?: string
  authorizationNumber?: string
  dateOfAdmission?: string
  lastCoverageDate?: string
  lengthOfStay?: number
  serviceId: string
  isServiceTimeDependent?: boolean
}

interface MergedRecord {
  Mon?: WeekdayData
  Tue?: WeekdayData
  Wed?: WeekdayData
  Thu?: WeekdayData
  Fri?: WeekdayData
  Sat?: WeekdayData
  Sun?: WeekdayData
  facilityAdmissionId?: string
  diagnosis?: Diagnosis[]
  visitMedium?: string
  visitSequence?: string
  visitStatus?: string
  visitType?: string
  isNoteSigned?: boolean
  cptCodes?: []
  appointmentId?: number
  metadata?: Metadata
  appointmentDate: string
  name?: string
  age?: number
  clinicLocation?: string
  state?: string
  gender?: string
  dob?: string
  patientStatus?: string
  service?: string
  patientInfoVerificationStatus?: string
  patientInsuranceVerificationStatus?: string
  patientConsentStatus?: string
  patientCardVerificationStatus?: boolean
  providerId?: number
  providerName?: string
  providerType?: string
  insuranceVerification?: string
  primaryInsuranceName?: string
  secondaryInsuranceName?: string
  copayDue?: number
  copayPaid?: number
  coInsuranceDue?: number
  coInsurancePaid?: number
  balanceDue?: number
  balancePaid?: number
  locationName?: string
  locationId?: string
  locationTimezoneId?: string
  unitResource?: UnitResource
  groupResource?: GroupResource
  room?: string
  legalStatus?: string
  authorizationNumber?: string
  dateOfAdmission?: string
  lastCoverageDate?: string
  lengthOfStay?: number
  serviceId: string
  isServiceTimeDependent?: boolean
}

interface WeekdayData {
  diagnosis: Diagnosis[]
  visitMedium?: string
  visitSequence?: string
  visitStatus?: string
  visitType?: string
  isNoteSigned?: boolean
  cptCodes?: []
}

interface WeekDay {
  id: string
  label: string
}

export type { DayString, WeekdayData, MergedRecord, AppointmentRecord, WeekDay,Diagnosis }
