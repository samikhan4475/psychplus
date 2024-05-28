'use client'

import { type StateCreator } from 'zustand'
import { createCodeSetStore } from '@psychplus/codeset'
import { PatientState, PreferredPartnerIdState } from '.'
import { GetDropdown } from './hooks'

const patientStore: StateCreator<PatientState> = (set, get, store) => ({
  ...createCodeSetStore(set, get, store),
  patients: [],
  setPatients: (patients) => set({ patients }),
  getDropdowns: (key) => GetDropdown(key) || [],
})

const preferredPartnerStore: StateCreator<PreferredPartnerIdState> = (set) => ({
  preferredPartnerId: '',
  setPreferredPartnerId: (preferredPartnerId) => set({ preferredPartnerId }),
})

export { patientStore, preferredPartnerStore }
