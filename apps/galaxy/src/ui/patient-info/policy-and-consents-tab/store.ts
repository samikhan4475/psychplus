import { create } from 'zustand'
import type { PatientConsent } from '@/types'

interface Store {
  consents: PatientConsent[]
  error?: string
  loading?: boolean
  filteredConsents: PatientConsent[]
  setFilteredConsents: (consents: PatientConsent[]) => void
  setConsents: (patientConsents: PatientConsent[]) => void
}

const useStore = create<Store>((set, get) => ({
  consents: [],
  filteredConsents: [],
  error: undefined,
  loading: undefined,
  setConsents: (patientConsents: PatientConsent[]) => {
    set({
      error: undefined,
      loading: true,
    })

    set({
      consents: patientConsents,
      filteredConsents: patientConsents,
      loading: false,
    })
  },
  setFilteredConsents: (consents: PatientConsent[]) => {
    set({ filteredConsents: consents })
  },
}))

export { useStore }
