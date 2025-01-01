import { Metadata } from './metadata'

interface FacilityAdmissionRecord {
  id: string
  metadata: Metadata
  recordStatus: string
  facilityAdmissionSequenceNumber: number
  locationId: string
  admissionLegalStatus: string
  insuranceAuthorizationNumber: string
  authorizationDate: string
}

export type { FacilityAdmissionRecord }
