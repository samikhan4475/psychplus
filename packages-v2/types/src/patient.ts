import type { ContactDetails } from './contact'
import { DriversLicense } from './drivers-lisence'
import type { EmergencyContact, PatientGuardian } from './guardian'
import type { Metadata } from './metadata'
import type { LegalName } from './name'

interface PatientProfile {
  id: number
  userId: number
  metadata: Metadata
  legalName: LegalName
  birthdate: string
  preferredLanguage?: string
  contactDetails: ContactDetails
  gender?: string
  genderExpression?: string
  genderOrientation?: string
  genderPronoun?: string
  guardian?: PatientGuardian
  emergencyContact?: EmergencyContact
  socialSecurityNumber?: string
  hasPhoto?: boolean
  chargeKey?: string
  medicalRecordNumber?: string
  cmdId?: string
  status?: string
  driversLicense?: DriversLicense
  hasGuardian?: boolean
}

export type { PatientProfile }
