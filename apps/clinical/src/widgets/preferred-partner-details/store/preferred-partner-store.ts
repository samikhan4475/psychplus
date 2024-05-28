'use client'

import { type StateCreator } from 'zustand'
import { PreferredPartnerState } from './types'

const preferredPartnerStore: StateCreator<PreferredPartnerState> = (set) => ({
  preferredPartner: [],
  setPreferredPartner: (preferredPartner) => set({ preferredPartner }),
})

export { preferredPartnerStore }
