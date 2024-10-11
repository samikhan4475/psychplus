import { ContactDetails } from './contact'
import type { LegalName } from './name'

interface PatientGuardian {
  name?: LegalName
  isEmergencyContact?: boolean
  relationship?: string
  contact?: Partial<ContactDetails>
}

export type { PatientGuardian }
