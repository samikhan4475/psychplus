import { create } from 'zustand'
import type { PatientConsent, PatientProfile } from '@/types'

interface Store {
  consents: PatientConsent[]
  error?: string
  loading?: boolean
  filteredConsents: PatientConsent[]
  patientProfile: PatientProfile | null
  setPatientProfile: (patientProfile: PatientProfile) => void
  setFilteredConsents: (consents: PatientConsent[]) => void
  setConsents: (
    patientConsents: PatientConsent[],
    filteredConsents?: PatientConsent[],
  ) => void
}

const useStore = create<Store>((set, get) => ({
  consents: [],
  filteredConsents: [],
  error: undefined,
  loading: undefined,
  patientProfile: null,
  setPatientProfile: (patientProfile) => {
    set({ patientProfile })
  },
  setConsents: (patientConsents, filteredConsents) => {
    set({
      error: undefined,
      loading: true,
    })

    set({
      consents: patientConsents,
      filteredConsents: filteredConsents ?? patientConsents,
      loading: false,
    })
  },
  setFilteredConsents: (consents: PatientConsent[]) => {
    set({ filteredConsents: consents })
  },
}))

export { useStore }
