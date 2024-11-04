import { ContactDetails } from './contact'
import { Metadata } from './metadata'
import { LegalName } from './name'

interface ReleaseInformationHistory {
  metadata: Metadata
  isAllowedToReleaseInformation: boolean
}

interface Relationship {
  id: string
  metadata: Metadata
  patientId: number
  name: LegalName
  isEmergencyContact: boolean
  isGuardian: boolean
  guardianRelationshipCode: string
  contactDetails: ContactDetails
  isAllowedToReleaseInformation: boolean
  releaseInformationHistory?: ReleaseInformationHistory[]
}

export type { Relationship, ReleaseInformationHistory }
