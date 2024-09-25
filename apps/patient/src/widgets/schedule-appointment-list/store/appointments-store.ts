'use client'

import { type StateCreator } from 'zustand'
import { type AppointmentState } from './types'

const createAppointmentsStore: StateCreator<AppointmentState> = (set) => ({
  bookedSlot: undefined,
  filteredStaffAppointmentAvailabilities: [],
  staffWithClinicsAndSlots: [],
  currentWeekReel: 0,

  setBookedSlot: (bookedSlot) => set({ bookedSlot }),
  setCurrentWeekReel: (currentWeekReel) => set({ currentWeekReel }),
  setFilteredStaffAppointmentAvailabilities: (
    filteredStaffAppointmentAvailabilities,
  ) => set({ filteredStaffAppointmentAvailabilities }),
  setStaffWithAvailableSlots: (staffWithClinicsAndSlots) =>
    set({ staffWithClinicsAndSlots }),
})

export { createAppointmentsStore }
