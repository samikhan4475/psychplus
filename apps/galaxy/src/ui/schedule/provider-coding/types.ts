import { Appointment, Metadata } from '@/types'

type DayString = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'

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
  facilityAdmissionDetailId?: string
  facilityAdmissionId?: number
  diagnosis: string
  visitMedium?: string
  visitSequence?: string
  visitStatus?: string
  visitType?: string
  isNoteSigned?: boolean
  noteSignedStatus?: string
  cptCodes?: string[]
  appointmentId?: number
  patientId?: number
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
  isPrimaryProviderType: boolean
  isServiceTimeDependent?: boolean
}

interface MergedRecord
  extends Omit<
    Appointment,
    | 'diagnosis'
    | 'appointmentId'
    | 'visitMedium'
    | 'visitSequence'
    | 'isPrimaryProviderType'
    | 'visitStatus'
    | 'visitType'
    | 'cptCodes'
    | 'noteSignedStatus'
  > {
  weekDays: Record<string, WeekdayData>
}

interface WeekdayData {
  diagnosis: string
  visitMedium: string
  visitSequence: string
  isPrimaryProviderType: boolean
  appointmentId: number
  visitStatus: string
  visitType?: string
  noteSignedStatus: string
  cptCodes: string[]
}

interface WeekDay {
  id: string
  label: string
}

export type { DayString, WeekdayData, MergedRecord, AppointmentRecord, WeekDay }
