import { ContactDetails } from './contact'
import type { LegalName } from './name'

interface PatientGuardian {
  name?: LegalName
  contact?: ContactDetails
  relationship?: string
  isEmergencyContact?: boolean
}

type EmergencyContact = Omit<PatientGuardian, 'isEmergencyContact'>

export type { PatientGuardian, EmergencyContact }
