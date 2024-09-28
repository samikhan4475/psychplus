import { Metadata } from '@/types'

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
  patientInfoVerificationStatus: string
  patientInsuranceVerificationStatus: string
  patientConsentStatus: string
  patientCardVerificationStatus: boolean
  service: string
  providerId: number
  providerName: string
  providerType: string
  visitType: string
  visitStatus: string
  visitSequence: string
  visitMedium: string
  insuranceVerification: string
  primaryInsuranceName: string
  secondaryInsuranceName: string
  copayPaid: number
  copayDue: number
  coInsurancePaid: number
  coInsuranceDue: number
  balancePaid: number
  balanceDue: number
  isNoteSigned: boolean
  locationName: string
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
  diagnosis: string
  cptCodes: string[]
  legalStatus: string
  authorizationNumber: string
  dateOfAddmission: string
  lastCoverageDate: string
  lengthOfStay: number
}

export { type Appointment }
