'use client'

import { type StateCreator } from 'zustand'
import { PreferredPartnerIdState } from '@/widgets/link-user-dialog/store'
import { PatientState, PreferredPartnerState } from '.'

const patientStore: StateCreator<PatientState> = (set) => ({
  patients: [],
  setPatients: (patients) => set({ patients }),
})

const preferredPartnerDetailStore: StateCreator<PreferredPartnerState> = (
  set,
) => ({
  preferredPartner: [],
  setPreferredPartner: (preferredPartner) => set({ preferredPartner }),
})

const preferredPartnerStore: StateCreator<PreferredPartnerIdState> = (set) => ({
  preferredPartnerId: '',
  setPreferredPartnerId: (preferredPartnerId) => set({ preferredPartnerId }),
})

export { patientStore, preferredPartnerStore, preferredPartnerDetailStore }
