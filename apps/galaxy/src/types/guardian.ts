import type { LegalName } from './name'

interface PatientGuardian {
  name?: LegalName
  isEmergencyContact: boolean
}

export type { PatientGuardian }
