'use client'

import { type StateCreator } from 'zustand'
import { AppointmentFiltersState } from './types'

const createAppointmentFiltersStore: StateCreator<AppointmentFiltersState> = (
  set,
) => ({
  filters: {
    providerType: '',
    appointmentType: '',
    zipCode: '',
    sortBy: '',
    language: '',
    startingDate: '',
  },

  handleFiltersChange: (newFilters) => {
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
    }))
  },
})

export { createAppointmentFiltersStore }
