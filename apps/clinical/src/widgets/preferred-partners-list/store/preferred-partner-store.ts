'use client'

import { type StateCreator } from 'zustand'
import { createCodeSetStore } from '@psychplus/codeset'
import { GetDropdown } from './hooks'
import { PreferredPartnerState } from './types'

const preferredPartnerStore: StateCreator<PreferredPartnerState> = (
  set,
  get,
  store,
) => ({
  ...createCodeSetStore(set, get, store),
  preferredPartners: [],
  token: '',
  setToken: (token) => set({ token }),
  setPreferredPartners: (preferredPartners) => set({ preferredPartners }),
  getDropdowns: (key) => GetDropdown(key) || [],
})

export { preferredPartnerStore }
