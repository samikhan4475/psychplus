import { type StateCreator, type StoreApi, type UseBoundStore } from 'zustand'

interface PreferredPartnerFinancialState {
  preferredPartnerId: string
  setPreferredPartnerId: (preferredPartnerId: string) => void
}

type PreferredPartnerFinancialStoreType = UseBoundStore<
  StoreApi<PreferredPartnerFinancialState>
>

const preferredPartnerFinancialStore: StateCreator<
  PreferredPartnerFinancialState
> = (set, get, store) => ({
  preferredPartnerId: '',
  setPreferredPartnerId: (preferredPartnerId: string) =>
    set({ preferredPartnerId }),
})

export {
  preferredPartnerFinancialStore,
  type PreferredPartnerFinancialStoreType,
  type PreferredPartnerFinancialState,
}
