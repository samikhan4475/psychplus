'use client'

import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'
import { createCodeSetStore, type CodeSetState } from '@psychplus/codeset'
import { createUserStore, type UserState } from '@psychplus/user'
import { combineStateCreators } from '@psychplus/utils/store'
import { PatientPreferredPartner } from './types'
import { StateCreator } from 'zustand'

interface PatientPreferredPartnerstate {
  patientPreferredPartners: PatientPreferredPartner[]
  setPatientPreferredPartners: (value: PatientPreferredPartner[]) => void
}

const createPatientPreferredPartnerStore: StateCreator<PatientPreferredPartnerstate> = (set) => ({
  patientPreferredPartners: [],
  setPatientPreferredPartners: (patientPreferredPartners) => set({ patientPreferredPartners }),
})

type PreferredPartnersStoreType = UserState & CodeSetState & PatientPreferredPartnerstate

const useStore = createWithEqualityFn<PreferredPartnersStoreType>(
  combineStateCreators(createUserStore, createCodeSetStore, createPatientPreferredPartnerStore),
  shallow,
)

export { useStore, type PreferredPartnersStoreType }
