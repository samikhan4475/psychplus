import { CodeSetState } from '@psychplus/codeset'
import { PreferredPartner } from '../types'
import { type Dropdown } from './hooks'

interface Filters {
  name: string
  city: string
  subscriptionStatusList: string[]
  dateFrom: Date | null | string
  dateTo: Date | null | string
}

interface PreferredPartnerFiltersState {
  filters: Filters
  handleFiltersChange: (newFilters: Partial<Filters>) => void
}

interface PreferredPartnerState extends CodeSetState {
  preferredPartners: PreferredPartner[]
  setPreferredPartners: (value: PreferredPartner[]) => void
  setToken: (value: string) => void
  token: string
  getDropdowns: (key: string) => Dropdown
}

export type { PreferredPartnerFiltersState, PreferredPartnerState, Filters }
