import { AppointmentMinimalDetails } from '@psychplus-v2/types'
import { create } from 'zustand'
import { AppointmentsView } from '../constants'

interface Store {
  appointment: AppointmentMinimalDetails | undefined
  appointmentView: AppointmentsView
  setAppointment: (appointment: AppointmentMinimalDetails) => void
  setAppointmentView: (appointmentView: AppointmentsView) => void
}

const useStore = create<Store>()((set, get) => ({
  appointment: undefined,
  appointmentView: AppointmentsView.Confirmation,
  setAppointment: (appointment) => set({ appointment }),
  setAppointmentView: (appointmentView) => set({ appointmentView }),
}))

export { useStore }
