import { Patient } from '@psychplus/patient'
import { PreferredPartner } from '@psychplus/preferred-partners'

interface PatientState {
  patients: Patient[]
  setPatients: (value: Patient[]) => void
}

interface PreferredPartnerState {
  preferredPartner: PreferredPartner[]
  setPreferredPartner: (value: PreferredPartner[]) => void
}

export type { PatientState, PreferredPartnerState }
