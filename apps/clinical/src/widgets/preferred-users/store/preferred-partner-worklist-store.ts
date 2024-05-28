'use client'

import { type StateCreator } from 'zustand'
import { PreferredPartnerIdState } from '@/widgets/link-user-dialog/store'
import { PreferredPartnerWorklistState } from './types'

const preferredPartnerWorklistStore: StateCreator<
  PreferredPartnerWorklistState
> = (set) => ({
  preferredPartnerWorklist: [],
  setPreferredPartnerWorklist: (preferredPartnerWorklist) =>
    set({ preferredPartnerWorklist }),
})

const preferredPartnerStore: StateCreator<PreferredPartnerIdState> = (set) => ({
  preferredPartnerId: '',
  setPreferredPartnerId: (preferredPartnerId) => set({ preferredPartnerId }),
})

export { preferredPartnerWorklistStore, preferredPartnerStore }
