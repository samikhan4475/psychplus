import { Metadata } from '@/types'

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
  metadata: Metadata
  appointmentDate: string
  name: string
  age: number
  clinicLocation: string
  state: string
  gender: string
  dob: string
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
  providerType: string
  visitType: string
  visitSequence: string
  visitMedium: string
  visitStatus: string
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
  dateOfAdmission: string
  lastCoverageDate: string
  lengthOfStay: number
}

export { type Appointment }
