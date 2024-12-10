import { create } from 'zustand'
import { getAppointment } from '@/actions'
import { Appointment } from '@/types'
import { getPatientNotesAction, GetPatientNotesParams } from './actions'
import type { GetPatientNotesResponse, PatientNotes } from './types'

interface Store {
  patientId: string
  data?: GetPatientNotesResponse
  loading?: boolean
  error?: string
  appointment?: Appointment
  fetch: (
    payload: GetPatientNotesParams,
    page?: number,
    reset?: boolean,
  ) => void
  selectedRow: PatientNotes | undefined
  selectedRows: PatientNotes[]
  setPatientId: (id: string) => void
  setSelectedRow: (value: PatientNotes | undefined) => void
  setSelectedRows: (value: PatientNotes[]) => void
  isCreateNoteView: boolean
  setIsCreateNoteView: (value: boolean) => void
  errorMessage: string
  setErrorMessage: (value: string) => void
  isErrorAlertOpen: boolean
  setIsErrorAlertOpen: (value: boolean) => void
  fetchAppointment: (appointmentId: string) => void
}

const useStore = create<Store>((set, get) => ({
  patientId: '',
  data: undefined,
  loading: true,
  error: undefined,
  appointment: undefined,
  fetch: async (payload) => {
    set({
      error: undefined,
      loading: true,
    })

    const result = await getPatientNotesAction(payload)

    if (result.state === 'error') {
      return set({
        error: result.error,
        loading: false,
      })
    }

    set({
      data: result.data,
      loading: false,
    })
  },
  selectedRow: undefined,
  selectedRows: [],
  setPatientId: (patientId) => set({ patientId }),
  setSelectedRow: (selectedRow) => set({ selectedRow }),
  setSelectedRows: (selectedRows) => set({ selectedRows }),
  isCreateNoteView: false,
  setIsCreateNoteView: (isCreateNoteView) => set({ isCreateNoteView }),
  errorMessage: '',
  setErrorMessage: (errorMessage) => set({ errorMessage }),
  isErrorAlertOpen: false,
  setIsErrorAlertOpen: (isErrorAlertOpen) => set({ isErrorAlertOpen }),

  fetchAppointment: async (appointmentId: string) => {
    set({
      error: undefined,
      loading: true,
    })

    const appointment = await getAppointment(appointmentId)

    if (appointment.state === 'error') {
      return set({
        error: appointment.error,
        loading: false,
      })
    }

    set({
      appointment: appointment.data,
      loading: false,
    })
  },
}))

export { useStore }
