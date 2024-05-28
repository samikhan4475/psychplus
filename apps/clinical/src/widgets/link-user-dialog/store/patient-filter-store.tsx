'use client'

import { type StateCreator } from 'zustand'
import { PatientFiltersState } from './types'

const initialPatientFilterState = {
  firstNameContains: '',
  lastNameContains: '',
  mrn: '',
  telephone: '',
  dateOfBirth: '',
}

const patientFilterStore: StateCreator<PatientFiltersState> = (set) => ({
  filters: initialPatientFilterState,
  handleFiltersChange: (newFilters) => {
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
    }))
  },
})

export { patientFilterStore, initialPatientFilterState }
