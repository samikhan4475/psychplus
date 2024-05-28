import { CodeSetState } from '@psychplus/codeset'
import {
  PreferredPartnerPatient,
  PreferredPartnerWorklist,
} from '@psychplus/preferred-partners'
import { type Dropdown } from './hooks'

interface PreferredPartnerPatientState extends CodeSetState {
  preferredPartnerPatient: PreferredPartnerPatient[]
  setPreferredPartnerPatient: (value: PreferredPartnerPatient[]) => void
  getDropdowns: (key: string) => Dropdown
}

interface PreferredPartnerWorklistState {
  preferredPartnerWorklist: PreferredPartnerWorklist[]
  setPreferredPartnerWorklist: (value: PreferredPartnerWorklist[]) => void
}

export type { PreferredPartnerPatientState, PreferredPartnerWorklistState }
