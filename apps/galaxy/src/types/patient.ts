import type { ContactDetails } from './contact'
import type {
  GenderExpression,
  GenderOrientation,
  GenderPronoun,
} from './gender'
import type { PatientGuardian } from './guardian'
import type { Metadata } from './metadata'
import type { LegalName } from './name'

interface PatientProfileRaw {
  id: number
  userId: number
  metadata: Metadata
  legalName: LegalName
  birthdate: string
  contactDetails: ContactDetails
  genderExpression?: GenderExpression
  genderOrientation?: GenderOrientation
  genderPronoun?: GenderPronoun
  guardian?: PatientGuardian
}

export type { PatientProfileRaw }
