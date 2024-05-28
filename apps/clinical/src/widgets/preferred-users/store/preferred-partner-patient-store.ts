'use client'

import { type StateCreator } from 'zustand'
import { createCodeSetStore } from '@psychplus/codeset'
import { PreferredPartnerPatientState } from '.'
import { GetDropdown } from './hooks'

const preferredPartnertPatientStore: StateCreator<
  PreferredPartnerPatientState
> = (set, get, store) => ({
  ...createCodeSetStore(set, get, store),
  preferredPartnerPatient: [],
  setPreferredPartnerPatient: (preferredPartnerPatient) =>
    set({ preferredPartnerPatient }),
  getDropdowns: (key) => GetDropdown(key) || [],
})

export { preferredPartnertPatientStore }
