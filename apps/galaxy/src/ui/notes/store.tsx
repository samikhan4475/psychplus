import { create } from 'zustand'
import { getAppointment, getPatientProfileAction } from '@/actions'
import { Appointment, PatientProfile, StaffResource } from '@/types'
import { getPatientAllergiesAction } from '../allergy/patient-allergies-widget/actions'
import { Allergy } from '../quicknotes/actual-note-view/types'
import { getBookedAppointmentsAction } from '../schedule/actions'
import {
  getNoteDetailsAction,
  GetNoteDetailsParams,
  getPatientNotesAction,
  GetPatientNotesParams,
  getStaffAction,
} from './actions'
import { getNoteDocumentsAction } from './actions/get-note-documents'
import { getWidgetsArrayByVisitType } from './note-detail/utils'
import type {
  GetPatientNotesResponse,
  NoteDetail,
  NoteDocuments,
  PatientNotes,
  WidgetType,
} from './types'

interface Store {
  patientId: string
  appointmentId: string
  data?: GetPatientNotesResponse
  loading?: boolean
  loadingDetail?: boolean
  error?: string
  appointment?: Appointment
  appointments?: Appointment[]
  noteDetail?: NoteDetail
  allergies?: Allergy[]
  widgets: WidgetType[]
  patient?: PatientProfile
  documents?: NoteDocuments
  cosigner?: StaffResource
  provider?: StaffResource
  selectedRow: PatientNotes | undefined
  selectedRows: PatientNotes[]
  isCreateNoteView: boolean
  errorMessage: string
  isErrorAlertOpen: boolean
  setPatientId: (id: string) => void
  setAppointmentId: (id: string) => void
  setSelectedRow: (value: PatientNotes | undefined) => void
  setSelectedRows: (value: PatientNotes[]) => void
  setAppointment: (value: Appointment) => void
  setIsCreateNoteView: (value: boolean) => void
  setErrorMessage: (value: string) => void
  setIsErrorAlertOpen: (value: boolean) => void
  fetchAppointment: (appointmentId: string) => void
  fetchAppointments: (patientId: string, appointmentId: string) => void
  fetchDocuments: (patientId: string, appointmentId: string) => void
  fetchNoteDetail: (payload: GetNoteDetailsParams) => void
  fetchAllergies: (patientId: string) => void
  fetchPatient: (patientId: string) => void
  fetchStaff: (staffId: number) => void
  fetchProvider: (staffId: number) => void
  setLoadingDetail: (loadingDetail: boolean) => void
  fetch: (
    payload: GetPatientNotesParams,
    page?: number,
    reset?: boolean,
  ) => void
  fetchWidgets: (params: {
    visitType: string
    visitSequence: string
    providerType: string
  }) => void
}

const useStore = create<Store>((set, get) => ({
  patientId: '',
  appointmentId: '',
  data: undefined,
  loading: true,
  loadingDetail: false,
  error: undefined,
  appointment: undefined,
  appointments: undefined,
  allergies: undefined,
  widgets: [],
  selectedRow: undefined,
  selectedRows: [],
  isErrorAlertOpen: false,
  errorMessage: '',
  isCreateNoteView: false,
  setPatientId: (patientId) => set({ patientId }),
  setLoadingDetail: (loadingDetail) => set({ loadingDetail }),
  setAppointment: (appointment) => set({ appointment }),
  setAppointmentId: (appointmentId) => set({ appointmentId }),
  setSelectedRow: (selectedRow) => set({ selectedRow }),
  setSelectedRows: (selectedRows) => set({ selectedRows }),
  setIsCreateNoteView: (isCreateNoteView) => set({ isCreateNoteView }),
  setErrorMessage: (errorMessage) => set({ errorMessage }),
  setIsErrorAlertOpen: (isErrorAlertOpen) => set({ isErrorAlertOpen }),
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
  fetchAppointment: async (appointmentId: string) => {
    set({
      error: undefined,
    })

    const appointment = await getAppointment(appointmentId)

    if (appointment.state === 'error') {
      return set({
        error: appointment.error,
      })
    }

    set({
      appointment: appointment.data,
    })
  },
  fetchAppointments: async (patientId: string, appointmentId: string) => {
    set({
      error: undefined,
    })

    const appointments = await getBookedAppointmentsAction({
      patientIds: [Number(patientId)],
      appointmentIds: [Number(appointmentId)],
      isFollowUp: true,
    })

    if (appointments.state === 'error') {
      return set({
        error: appointments.error,
      })
    }

    set({
      appointments: appointments.data,
    })
  },
  fetchDocuments: async (patientId: string, appointmentId: string) => {
    set({
      error: undefined,
    })

    const appointments = await getNoteDocumentsAction({
      patientId: patientId,
      appointmentId: appointmentId,
    })

    if (appointments.state === 'error') {
      return set({
        error: appointments.error,
      })
    }

    set({
      documents: appointments.data,
    })
  },
  fetchNoteDetail: async (payload: GetNoteDetailsParams) => {
    set({
      error: undefined,
    })
    const response = await getNoteDetailsAction(payload)

    if (response.state === 'error') {
      return set({
        error: response.error,
      })
    }

    set({
      noteDetail: response.data,
    })
  },
  fetchAllergies: async (patientId: string) => {
    set({
      error: undefined,
    })
    const result = await getPatientAllergiesAction({
      payload: {
        patientIds: [patientId],
      },
    })
    if (result.state === 'error') {
      return set({
        error: result.error,
      })
    }
    set({
      allergies: result.data,
    })
  },

  fetchPatient: async (patientId: string) => {
    set({
      error: undefined,
    })
    const patient = await getPatientProfileAction(patientId)
    if (patient.state === 'error') {
      return set({
        error: patient.error,
      })
    }
    set({
      patient: patient.data,
    })
  },
  fetchStaff: async (staffId: number) => {
    set({
      error: undefined,
    })
    const staff = await getStaffAction(staffId)
    if (staff.state === 'error') {
      return set({
        error: staff.error,
      })
    }
    set({
      cosigner: staff.data,
    })
  },
  fetchProvider: async (staffId: number) => {
    set({
      error: undefined,
    })
    const staff = await getStaffAction(staffId)
    if (staff.state === 'error') {
      return set({
        error: staff.error,
      })
    }
    set({
      provider: staff.data,
    })
  },

  fetchWidgets: ({ visitType, visitSequence, providerType }) => {
    set({ loadingDetail: true, error: undefined })
    const widgetsArray = getWidgetsArrayByVisitType(
      visitType,
      visitSequence,
      providerType,
    )
    set({ widgets: widgetsArray })
  },
}))

export { useStore }
