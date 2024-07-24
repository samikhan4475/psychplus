import { ClearingHouseReceiver, RaceAndEthnicityCodeSet } from '../types'

interface Filters {
  receiverIds: string[]
  clearingHouseName: string
  address1: string
  address2: string
  city: string
  state: string
  zip: string
  phone: string
  fax: string
  email: string
  receiverId: string
  receiverName: string
}

interface ClearingHouseReceiverFiltersState {
  filters: Filters
  handleFiltersChange: (newFilters: Partial<Filters>) => void
}

interface ClearingHouseReceiverState {
  clearingHouseReceivers: ClearingHouseReceiver[]
  setClearingHouseReceivers: (value: ClearingHouseReceiver[]) => void
}

export type {
  ClearingHouseReceiverFiltersState,
  ClearingHouseReceiverState,
  Filters,
  RaceAndEthnicityCodeSet,
}
