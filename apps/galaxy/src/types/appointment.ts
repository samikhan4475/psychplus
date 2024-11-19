import { Cosigner, Metadata } from '@/types'

type PaymentType =
  | 'CoPay'
  | 'CoInsurance'
  | 'CoPayAndCoInsurance'
  | 'OutstandingBalance'
  | 'CustomPayment'
  | 'PaymentPlan'
  | 'PlusMembership'
  | 'Insurance'
  | 'SelfPay'

interface Diagnosis {
  id: string
  metadata: Metadata
  icd10Code: string
  description: string
  patientId: number
  isChecked: boolean
  priorityFavourite: number
  priorityCheck: number
  recordStatus: string
}

interface Appointment {
  appointmentId: number
  app_id?: string
  metadata: Metadata
  appointmentDate: string
  appointmentDuration: number
  coPayAmount?: string
  coInsuranceAmount?: string
  appointmentInterval: number
  appointmentDateTime?: string
  name: string
  age: number
  clinicLocation: string
  state: string
  stateCode: string
  gender: string
  dob: string
  patientMrn: string
  patientStatus: string
  service: string
  serviceId: string
  isServiceTimeDependent: boolean
  patientInfoVerificationStatus: string
  patientInsuranceVerificationStatus: string
  patientConsentStatus: string
  patientCardVerificationStatus: boolean
  providerId: number
  providerName: string
  physicianName: string
  providerType: string
  visitType: string
  visitSequence: string
  visitMedium: string
  visitStatus: string
  visitNoteTitle?: string
  insuranceVerification: string
  primaryInsuranceName: string
  secondaryInsuranceName: string
  copayDue: number
  copayPaid: number
  coInsuranceDue: number
  coInsurancePaid: number
  balanceDue: number
  balancePaid: number
  isNoteSigned: boolean
  locationId: string
  locationName: string
  locationTimezoneId: string
  unitResource: {
    id: string
    metadata: Metadata
    locationId: string
    serviceId: string
    unit: string
    coSignerId: number
  }
  groupResource: {
    id: string
    metadata: Metadata
    locationId: string
    serviceId: string
    group: string
    coSignerId: number
  }
  room: string
  diagnosis: Diagnosis[]
  cptCodes: string[]
  legalStatus: string
  authorizationNumber: string
  authorizationDate: string
  dateOfAdmission: string
  lastCoverageDate: string
  facilityAdmissionId: string
  lengthOfStay: number
  patientId: number
  startDate?: string
  endDate?: string
  duration?: number
  visitTypeCode?: string
  encounterNumber?: string
  type?: string
  specialistTypeCode?: number
  cosigners: Cosigner[]
}

export { type Appointment, type PaymentType }
