'use client'

import { type StateCreator } from 'zustand'
import { type AppointmentState } from './types'

const createAppointmentsStore: StateCreator<AppointmentState> = (set) => ({
  bookedSlot: undefined,
  filteredStaffAppointmentAvailabilities: [],
  staffWithClinicsAndSlots: [],

  setBookedSlot: (bookedSlot) => set({ bookedSlot }),
  setFilteredStaffAppointmentAvailabilities: (
    filteredStaffAppointmentAvailabilities,
  ) => set({ filteredStaffAppointmentAvailabilities }),
  setStaffWithAvailableSlots: (staffWithClinicsAndSlots) =>
    set({ staffWithClinicsAndSlots }),
})

export { createAppointmentsStore }
