import { PreferredPartner } from '@psychplus/preferred-partners/types'

interface PreferredPartnerState {
  preferredPartner: PreferredPartner[]
  setPreferredPartner: (value: PreferredPartner[]) => void
}

export type { PreferredPartnerState }
